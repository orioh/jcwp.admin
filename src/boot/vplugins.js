import Vue from 'vue'

import ECharts from "vue-echarts";
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'


import drag from "vue-power-drag";
import MonacoEditor from "vue-monaco";

Vue.component("v-chart", ECharts);
Vue.component("power-drag", drag);
Vue.component("monaco-editor", MonacoEditor);
