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
  }
  mounted() {
    this.loadConfig(this.widgetConfig);
  }
}
</script>
