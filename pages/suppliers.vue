<template>
  <div>
    <kpi :kpis="kpis" />
    <h2>Suppliers:</h2>

    <!-- Modal Content -->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title v-if="!newCarrier">Supplier Info</md-dialog-title>
      <md-dialog-title v-else>New Carrier</md-dialog-title>

      <!-- Supplier Info -->
      <form method="post" class="supplier-form md-scrollbar" v-if="!newCarrier">
        <div class="form-item">
          <md-field>
            <label>Name</label>
            <md-input v-model="form.name"></md-input>
          </md-field>
        </div>
        
        <div class="form-item">
          <md-field>
            <label for="term">Payment Term</label>
            <md-select v-model="form.paymentTerm" name="term" id="term">
              <md-option :value="pay" v-for="pay in paymentTerms" :key="pay">{{ pay }}</md-option>
            </md-select>
          </md-field>
        </div>
        
        <div class="form-item">
          <md-field>
            <label for="tax">Tax Rule</label>
            <md-select v-model="form.taxRule" name="tax" id="tax">
              <md-option :value="tax" v-for="tax in taxRules" :key="tax">{{ tax }}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="form-item">
          <md-field>
            <label>Code</label>
            <md-input v-model="form.code"></md-input>
          </md-field>
        </div>

        <div class="form-item">
          <md-field>
            <label for="account">Account Payable</label>
            <md-select v-model="form.accountPayable" name="account" id="account">
              <md-option :value="acc" v-for="acc in accountPayable" :key="acc">{{ acc }}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="form-item">
          <md-field>
            <label>Discount (%)</label>
            <md-input v-model="form.discount" type='number' min="0" max="100"></md-input>
          </md-field>
        </div>

        <div class="form-item">
          <md-field>
            <label for="carrier">Carrier</label>
            <md-select v-model="form.carrier" name="carrier" id="carrier">
              <md-option :value="car.id" v-for="car in carriers" :key="car.id">{{ car.name }}</md-option>
            </md-select>
          </md-field>
          <md-button class="md-icon-button" @click="newCarrier = true">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="right">Add new carrier</md-tooltip>
          </md-button>
        </div>

        <div class="form-item">
          <md-field>
            <label for="carrier">Currency</label>
            <md-select v-model="form.currency" name="carrier" id="carrier">
              <md-option :value="cur" v-for="cur in currencies" :key="cur">{{ cur }}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="form-item">
          <md-field>
            <label>Note</label>
            <md-textarea v-model="form.note"></md-textarea>
          </md-field>
        </div>
      </form>
      
      <!-- New Carrier Form -->
      <form method="post" v-else>
        <div class="form-item">
          <md-field>
            <label>Name</label>
            <md-input v-model="carrierForm.name"></md-input>
          </md-field>
        </div>
        
        <div class="form-item">
          <md-field>
            <label>Email</label>
            <md-input v-model="carrierForm.email" type="email"></md-input>
          </md-field>
        </div>
        
        <div class="form-item">
          <md-field>
            <label>Phone</label>
            <md-input v-model="carrierForm.phone"></md-input>
          </md-field>
        </div>
        
        <div class="form-item">
          <md-field>
            <label>Contact</label>
            <md-input v-model="carrierForm.contact"></md-input>
          </md-field>
        </div>

        <div class="form-item">
          <md-field>
            <label>Note</label>
            <md-textarea v-model="carrierForm.note"></md-textarea>
          </md-field>
        </div>
        <div class="form-item">
          <md-checkbox v-model="carrierForm.default">Default</md-checkbox>
        </div>
      </form>
      

      <md-dialog-actions v-if="!newCarrier">
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="editSupplier()">Save</md-button>
      </md-dialog-actions>
      <md-dialog-actions v-else>
        <md-button class="md-primary" @click="newCarrier = false">Cancel</md-button>
        <md-button class="md-primary" @click="addNewCarrier()">Add</md-button>
      </md-dialog-actions>
    </md-dialog>

    <!-- Supplier List -->
    <div class="supplier-list main-content">
      <div class="md-layout">
        <div class="md-layout-item md-size-25" v-for="(sup, index) in suppliers" :key="sup.name">
          <md-card>
            <md-card-media-cover md-solid>
              <md-card-media md-ratio="4:3">
                <img src="https://picsum.photos/400/400" alt="Supplier">
              </md-card-media>

              <md-card-area>
                <md-card-header>
                  <span class="md-title">{{sup.name}}</span>
                  <span class="md-subhead">Carrier: {{getCarrierDetails(sup.carrier)}}</span>
                </md-card-header>
                
                <md-card-actions>
                  <md-button class="md-icon-button" @click="showSupplierInfo(index)" title="Details">
                    <md-icon>open_in_new</md-icon>
                  </md-button>
                </md-card-actions>
              </md-card-area>
            </md-card-media-cover>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Kpi from '@/components/Kpi';

export default {
  name: 'Suppliers',
  components: {
    Kpi
  },
  data: ()=>({
    showDialog: false,
    newCarrier: false,
    form: {
      name: null,
      taxRule: null,
      accountPayable: null,
      carrier: null,
      currency: null,
      paymentTerm: null,
      code: null,
      discount: null,
      note: null
    },
    carrierForm: {
      name: null,
      phone: null,
      contact: null,
      email: null,
      note: null,
      default: false
    },
    taxRules: [
      'Rule 1',
      'Rule 2'
    ],
    accountPayable: [
      'Account 1',
      'Account 2'
    ],
    carriers: [
      {
        id: 1,
        name: 'John Doe',
        phone: 1231234,
        contact: 1234356,
        email: 'john@doe.com',
        note: 'Fast and Smart'
      },
      {
        id: 2,
        name: 'Mike Doe',
        phone: 1231234,
        contact: 1234356,
        email: 'john@doe.com',
        note: 'Fast and Smart'
      },
      {
        id: 3,
        name: 'Jack Doe',
        phone: 1231234,
        contact: 1234356,
        email: 'john@doe.com',
        note: 'Fast and Smart'
      }
    ],
    currencies: [
      'EUR',
      'USD',
      'IRR'
    ],
    paymentTerms: [
      'Term 1',
      'Term 2'
    ],
    suppliers: [
      {
        id:1,
        name: 'Supplier #1',
        taxRule: 'Rule 1',
        accountPayable: 'Account 1',
        carrier: 1,
        currency: 'IRR',
        paymentTerm: 'Term 1',
        code: '123',
        discount: '10',
        note: 'Some words'
      },
      {
        id: 2,
        name: 'Supplier #2',
        taxRule: 'Rule 2',
        accountPayable: 'Account 2',
        carrier: 3,
        currency: 'USD',
        paymentTerm: 'Term 2',
        code: '133',
        discount: '5',
        note: 'Some words'
      }
    ],
    kpis: [
      {
        title: 'Orders (Week)',
        value: '763',
        change: +0.73,
        class: 'green-card',
        icon: 'shopping_cart'
      },
      {
        title: 'Joined Suppliers (Week)',
        value: '89',
        change: -0.5,
        class: 'teal-card',
        icon: 'supervised_user_circle'
      },
      {
        title: 'Returns (Week)',
        value: '21',
        change: -0.23,
        class: 'purple-card',
        icon: 'money_off'
      },
      {
        title: 'Delivered (Week)',
        value: '32',
        change: +0.13,
        class: '',
        icon: 'attach_money'
      },
    ]
  }),
  methods: {
    getCarrierDetails(id){
      let car = this.carriers.find(el => el.id == id )
      return car.name
    },
    showSupplierInfo(index){
      this.form = Object.assign({}, this.suppliers[index])
      this.showDialog = true
    },
    addNewCarrier(){
      this.carrierForm.id = this.carriers.length + 1
      this.carriers.push(this.carrierForm)
      if(this.carrierForm.default)
        this.form.carrier = this.carrierForm.id
      this.newCarrier = false
    },
    editSupplier(){
      let obj = this.suppliers.find(el => el.id == this.form.id)
      this.suppliers[this.suppliers.indexOf(obj)] = this.form
      this.showDialog = false
    }
  },
}
</script>

<style lang="scss" scoped>
  .md-dialog {
    min-width: 800px;
  }
  form { 
    overflow-y: scroll; 
    display: grid;
    grid-template-columns: auto auto;
    .form-item {
      padding: 10px 24px;
      position: relative;
      .md-icon-button {
        position: absolute;
        right: -27px;
        top: 26px;
      }
    }
  }
  .supplier-list {
    
  }
  
</style>