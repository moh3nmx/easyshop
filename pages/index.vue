<template>
  <section class="container">
    <kpi :kpis="kpis" />

  </section>
</template>

<script>
import Kpi from '@/components/Kpi';

export default {
  components: {
    Kpi
  },
  middleware: 'auth',
  data: ()=>({
    kpis: [
      {
        title: 'ُSales (Week)',
        value: '127,879$',
        change: +0.73,
        class: 'green-card',
        icon: 'shopping_cart'
      },
      {
        title: 'ُUsers (Week)',
        value: '+89',
        change: -0.5,
        class: 'teal-card',
        icon: 'supervised_user_circle'
      },
      {
        title: 'Gross Profit (Week)',
        value: '4,209$',
        change: +0.23,
        class: 'purple-card',
        icon: 'money_off'
      },
      {
        title: 'Net Profit (Week)',
        value: '3,209$',
        change: +0.23,
        class: '',
        icon: 'attach_money'
      },
    ]
  }),
}
</script>

<style>
  
</style>
