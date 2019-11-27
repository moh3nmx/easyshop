<template>
  <div class="kpi-holder">
    <div class="md-layout">
      <div class="md-layout-item" v-for="kpi in kpis" :key="kpi.title">
        <md-card class="md-primary" :md-theme="kpi.class">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ kpi.title }}</div>
              <div class="md-subhead">{{ kpi.value }}
                <span>
                  ({{ kpi.change > 0 ? '+' : '' }}{{ kpi.change*100 }}%)
                </span>
              </div>
            </md-card-header-text>

            <md-card-media>
              <md-icon class="md-size-3x">{{kpi.icon}}</md-icon>
            </md-card-media>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Kpi',
  props: ['kpis']
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine"; // Import the theme engine
  
  @include md-register-theme("green-card", (
    primary: md-get-palette-color(green, 700)
  ));

  @include md-register-theme("black-card", (
    primary: md-get-palette-color(black, 500)
  ));

  @include md-register-theme("purple-card", (
    primary: md-get-palette-color(purple, 500)
  ));

  @include md-register-theme("teal-card", (
    primary: md-get-palette-color(teal, 700)
  ));

  @import "~vue-material/dist/theme/all";

  .kpi-holder {
    padding-bottom: 15px;
    .md-title {
      font-size: 1em
    }
  }

</style>