<template>
  <WidgetWrapper :widgetInstance="this">
    <div class="fit">basic widget la {{ name }}</div>
  </WidgetWrapper>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as def from "src/model";
import WidgetWrapper from "components/widget/WidgetWrapper.vue";

@Component({ components: { WidgetWrapper } })
export default class WidgetBasicComponent extends def.Widget {

  created() {
    console.log(`basic created, ${this.widgetConfig.name}`);
  }
  mounted() {
    console.log(`basic mounted, ${this.widgetConfig.name}`);
    this.loadConfig(this.widgetConfig);
  }
}
</script>
