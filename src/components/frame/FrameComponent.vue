<template>
  <div class="container row">
    <div :key="widgetPanelKey + 10" class="widget-panel full-height col-grow">
      <power-drag
        ref="cyGridster"
        :your-list="frameConfig.widgets"
        :base-margin-left="baseMarginLeft"
        :base-margin-top="baseMarginTop"
        :base-width="baseWidth"
        :base-height="baseHeight"
        :draggable="allowEdit"
        :resizable="allowEdit"
      >
        <template
          v-for="(item, index) in frameConfig.widgets"
          :slot="'slot' + index"
        >
          <div :key="index" class="dragHandleWrapper">
            <div v-if="showEdit(item)" class="tool">
              <q-icon
                name="format_list_bulleted"
                class="text-yellow"
                style="font-size: 1rem"
              >
                <q-menu>
                  <q-list dense style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <div class="row items-center">
                        <q-icon name="edit" size="xs" />
                        <div class="q-ml-md">Edit</div>
                      </div>
                    </q-item>
                    <q-item clickable v-close-popup @click="deleteItem(item)">
                      <div class="row items-center">
                        <q-icon name="close" class="text-red" size="xs" />
                        <div class="q-ml-md">Remove</div>
                      </div>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </div>
            <div class="chart">
              <WidgetSelector :widgetConfig="item"></WidgetSelector>
            </div>
            <div class="dragHandle" @click="widgetSelected(item)"></div>
          </div>
        </template>
      </power-drag>

      <q-inner-loading :showing="isLoading">
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
    </div>
    <div :key="propKey" class="prop-panel">
      <WidgetPropEditorComponent :entity="getSelectedWidget()">
      </WidgetPropEditorComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import WidgetSelector from "components/widget/WidgetSelector.vue";
import WidgetPropEditorComponent from "components/frame/WidgetPropEditorComponent.vue";
import * as def from "src/model";
import { MsgService } from "src/service/msgService";

@Component({
  components: { WidgetSelector, WidgetPropEditorComponent },
})
export default class FrameComponent extends def.Frame {
  @Prop({ type: Object as () => def.FrameConfig })
  frameConfig!: def.FrameConfig;

  @Prop({ type: Boolean, default: false }) allowEdit!: boolean;

  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  // baseWidth = 90.8333 * (this.screenWidth / 1366);
  // baseHeight = 100 * (this.screenHeight / 638);
  baseWidth = 30;
  baseHeight = 30;
  baseMarginLeft = 20 * (this.screenWidth / 1366);
  baseMarginTop = 20 * (this.screenHeight / 638);

  propKey = 0;
  widgetPanelKey = 0;
  selectedWidget: def.Entity;

  created() {
    console.log("frame created");
    this.doInit();
  }

  doInit() {
    this.selectedWidget = undefined as any;
    this.init(this.frameConfig);
  }

  afterLoadConfig() {
    console.log("frame afterLoadConfig");
    this.relaodGridster();
  }

  relaodGridster() {
    this.propKey = (this.propKey + 1) % 2;
    this.widgetPanelKey = (this.widgetPanelKey + 1) % 2;
    setTimeout(() => {
      let gridster = this.$refs["cyGridster"] as any; //获取gridster实例
      gridster.init(); //在适当的时候初始化布局组件
    }, 30);
  }

  deleteItem(item: def.WidgetConfig) {
    this.removeWidget(item);
  }

  isNullSelect() {
    return this.selectedWidget === undefined || this.selectedWidget === null;
  }
  showEdit(item: def.WidgetConfig) {
    return (
      this.allowEdit &&
      !this.isNullSelect() &&
      this.selectedWidget.id === item.id
    );
  }

  getSelectedWidget() {
    return this.selectedWidget;
  }
  widgetSelected(item: def.WidgetConfig) {
    if (this.allowEdit && item !== undefined) {
      if (
        this.isNullSelect() ||
        (this.selectedWidget.id !== item.id && this.widgetMap.has(item.id))
      ) {
        MsgService.info(`select widget ${item.name}`);
        this.selectedWidget = this.widgetMap.get(item.id) as any;
        this.propKey = (this.propKey + 1) % 2;
      }
    }
  }

  saveFrame() {
    this.frameConfig.widgets = [];

    this.widgetMap.forEach((v, k) => {
      let save: { [key: string]: any } = {};
      let props = Array.from(v.getProps().values());
      props.forEach((x) => (save[x.name] = x.value));
      v.config.props = save;
      this.frameConfig.widgets.push(v.config as any);
    });

    this.doInit();
  }
  /**
   * destroyed only work in .vue file .. ?
   */
  destroyed() {
    MsgService.debug(`frame '${this.name}' destroyed called`);
    this.destroy();
  }
}
</script>


<style lang="scss" >
.container {
  width: 100vw;
  height: calc(100vh - 100px);
}
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
  z-index: 1001;
}

.chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: default;
}

.prop-panel {
  min-width: 200px;
  height: 100%;
  border-left: 1px solid lightgrey;
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