<template>
  <div class="fit">
    frame la

    <power-drag
      ref="cyGridster"
      :your-list="list"
      :base-margin-left="baseMarginLeft"
      :base-margin-top="baseMarginTop"
      :base-width="baseWidth"
      :base-height="baseHeight"
    >
    </power-drag>
  </div>
</template>

<script lang="ts">
import drag from "vue-power-drag";
import { Vue, Component, Prop } from "vue-property-decorator";
Vue.component("power-drag", drag);

@Component({
  components: { drag },
})
export default class FrameComponent extends Vue {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  baseWidth = 90.8333 * (this.screenWidth / 1366);
  baseHeight = 100 * (this.screenHeight / 638);
  baseMarginLeft = 20 * (this.screenWidth / 1366);
  baseMarginTop = 20 * (this.screenHeight / 638);
  
  list = [
    {
      id: 1,
      x: 10,
      y: 1,
      sizex: 3,
      sizey: 2,
    },
    {
      id: 2,
      x: 8,
      y: 1,
      sizex: 2,
      sizey: 2,
    },
  ];
  mounted(){
    console.log('frame mounted');
    let gridster = this.$refs['cyGridster'] as any; //获取gridster实例
    gridster.init(); //在适当的时候初始化布局组件
  }
}
</script>
