<template>
  <div class='fit'>
    frame viewer
    <v-chart :options="polar" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class FrameViewer extends Vue {
  data: any[] = [];
  polar: any = {};
  mounted() {
    console.log("frame 123 mounted");

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
}
</script>
