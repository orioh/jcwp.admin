<template>
  <div :v-if="widgetInstance" class="fit col">
    <div :v-if="showHeader()" class="header" @click="aa">{{ widgetName }}</div>
    <div class="full-width col-grow">
      <slot></slot>
    </div>

    <q-inner-loading :showing="loading()">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import * as def from "src/model";
import { watch } from "fs";

@Component
export default class WidgetWrapper extends Vue {
  @Prop({ type: Object as () => def.Widget }) widgetInstance!: def.Widget;


  loading(): boolean {
    return this.widgetInstance && this.widgetInstance.isLoading;
  }

  showHeader(): boolean {
    return this.widgetInstance && (this.widgetInstance.showHeader.value as boolean);
  }

  get widgetName(): string {
    if (this.widgetInstance) {
      return this.widgetInstance.name;
    }
    return "";
  }

  get viewReady():boolean {
    return this.widgetInstance && this.widgetInstance.isReady;
  }

  aa(){
    console.log('aa', this.widgetInstance);
  }
}
</script>


<style lang="scss" >
.header {
  width: 100%;
  height: 20px;
  background-color: lightblue;
}
</style>