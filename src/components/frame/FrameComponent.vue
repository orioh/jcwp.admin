<template>
  <div class="fit">
    <power-drag
      ref="cyGridster"
      :your-list="list"
      :base-margin-left="baseMarginLeft"
      :base-margin-top="baseMarginTop"
      :base-width="baseWidth"
      :base-height="baseHeight"
    >
      <template v-for="(item, index) in list" :slot="'slot' + index">
        <div :key="index" class="dragHandle">
          <div class="tool">
            <span @click="deleteItem(index)">删除此框</span>
          </div>
          <div class="chart">
            <v-chart :options="polar" />
          </div>
          <!-- <div class="chart" :ref="'chart' + index"></div> -->
        </div>
      </template>
    </power-drag>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: { },
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
  chartOptions: {
    series: [
      {
        data: [1, 2, 3]; // sample data
      }
    ];
  };

  mounted() {
    console.log("frame mounted");
    let gridster = this.$refs["cyGridster"] as any; //获取gridster实例
    gridster.init(); //在适当的时候初始化布局组件

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      this.data.push([r, i]);
    }

    this.polar = {
      title: {
        text: "极坐标双数值轴",
      },
      legend: {
        data: ["line"],
      },
      polar: {
        center: ["50%", "54%"],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      angleAxis: {
        type: "value",
        startAngle: 0,
      },
      radiusAxis: {
        min: 0,
      },
      series: [
        {
          coordinateSystem: "polar",
          name: "line",
          type: "line",
          showSymbol: false,
          data: this.data,
        },
      ],
      animationDuration: 2000,
    };
  }
  deleteItem(index: number) {}

  data: any[] = [];
  polar: any = {};
}
</script>


<style lang="scss" >
.dragHandle {
  //拖动手柄样式
  padding: 1.5rem !important;
  height: 100%; //自定义内容样式
  .tool {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
    font-weight: bold;
  }
  .chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: default;
  }
}
</style>