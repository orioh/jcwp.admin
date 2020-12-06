<template>
  <div class="fit col">
    <div class="func-panel row justify-between">
      <div class="row items-center">
        <q-select class='q-ml-sm'
          outlined
          dense
          v-model="selectedFrameName"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="frameSelectOptions"
          @filter="filterFn"
          @input="frameSelectChanged"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No Results </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-btn color="primary" class="q-ml-sm" label="Save" @click="saveFrameConfig" />
      </div>
    </div>
    <div :key="frameKey" class="col-grow">
      <FrameComponent ref="frame"
        v-if="curFrame"
        :frameConfig="curFrame"
        :allowEdit="true"
      ></FrameComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FrameComponent from "components/frame/FrameComponent.vue";
import { Mock } from "src/model/mock";
import * as def from "src/model";
import { MsgService } from "src/service/msgService";

@Component({
  components: { FrameComponent },
})
export default class FrameEditor extends Vue {
  curFrame: def.FrameConfig | any = null;
  selectedFrameName = "";
  frameList: string[] = [];
  frameSelectOptions: string[] = [];
  frameKey = 0;

  mounted() {
    this.frameSelectOptions = this.frameList = Mock.frameList.map(
      (x) => x.name
    );
  }

  filterFn(val: any, update: any, abort: any) {
    update(() => {
      const needle = val.toLowerCase();
      this.frameSelectOptions = this.frameList.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    });
  }

  frameSelectChanged(val: any) {
    console.log("frame selected", val);
    let idx = Mock.frameList.findIndex((x) => x.name === val);
    if (idx >= 0) {
      // this.curFrame = Mock.frameList[idx];
      // this.frameKey = (this.frameKey + 1) % 2;
      this.reloadFrame(Mock.frameList[idx]);
    } else {
      MsgService.error(`frame '${val}' not exist`);
    }
  }

  reloadFrame(frame: def.FrameConfig){
    if(frame){
      this.curFrame = null;
      setTimeout(() => {
        this.curFrame = frame;
        this.frameKey = (this.frameKey + 1) % 2;
      }, 50);
    }
  }

  saveFrameConfig(){
    if(this.curFrame){
      (this.$refs.frame as any).saveFrame();
    }
  }
}
</script>

<style lang="scss" scoped>
.func-panel {
  height: 50px;
  width: 100%;
  border-bottom: 1px solid lightgrey; 
}
</style>
