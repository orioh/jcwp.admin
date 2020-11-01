<template>
  <div :v-if="widgetClass" class="fit col">
    <div :key="aaa" class="header" @click="aa">{{ widgetName }}</div>
    <div class="full-width col-grow">
      <component
        ref="targetWidget"
        :is="widgetClass"
        :widgetConfig="widgetConfig"
      />
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
export default class WidgetWrapperEx extends Vue {
  @Prop({ type: Function }) widgetClass!: Vue;
  @Prop({ type: Object as () => def.WidgetConfig })
  widgetConfig!: def.WidgetConfig;

  instance: def.Widget;

  aaa=0;


  // @Prop({ type: Object as () => def.Widget })
  // widgetInstance!: def.Widget;

  mounted(){
    this.instance = this.$refs["targetWidget"] as def.Widget;
    console.log('widget wrapper mounted', this.instance);
    
    if(this.instance){
      console.log(`widget wrapper, do load config`);
      this.instance.loadConfig(this.widgetConfig);
    }
  }

  loading(): boolean {
    /**
     * 2020.11.01, binding this way not working ..
     */
    return this.$refs["targetWidget"]!==undefined && this.instance.isLoading;
  }

  get showHeader(): boolean {
    return this.instance && (this.instance.showHeader.value as boolean);
  }

  get widgetName(): string {
    if (this.instance) {
      return this.instance.name;
    }
    return "";
  }

  get viewReady():boolean {
    return this.instance && this.instance.isReady;
  }

  aa(){
    console.log('aa', this.instance);
    this.aaa +=1 ;  
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