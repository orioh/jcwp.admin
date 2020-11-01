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
        <div :key="index" class="dragHandleWrapper">
          <div class="tool">
            <!-- <span @click="deleteItem(index)">删除此框</span> -->
           <q-icon name="close" class="text-red" style="font-size: 1rem;" />
          </div>
          <div class="chart ">
            <!-- <v-chart :options="polar" autoresize="true"/> -->
            <WidgetSelector :widgetConfig="item.consfig"></WidgetSelector>
          </div>
          <div class="dragHandle">
          </div>
        </div>
      </template>
    </power-drag>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import  WidgetSelector from 'components/widget/WidgetSelector.vue';

@Component({
  components: { WidgetSelector },
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
      consfig: {id:1, name: 'w1'}
    },
    {
      id: 2,
      x: 8,
      y: 1,
      sizex: 2,
      sizey: 2,
      consfig: {id:2, name: 'w2'}
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

.dragAndResize {
  .resizeHandle {
    z-index: 1000 !important;
  }
}

.dragHandleWrapper {
  height: 100%; 
  position: relative;
}

.dragHandle {
  //拖动手柄样式
  // padding-top: 10px !important;
  height: 100%; //自定义内容样式
  position: absolute;
  z-index: 999;
  opacity: 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.tool {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2px;
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    font-weight: bold;
  }

.chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: default;
}

/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>