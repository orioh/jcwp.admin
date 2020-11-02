<template>
  <div class="fit">
    <!-- <WidgetWrapperEx
        v-if="targetComponent"
         :widgetClass="targetComponent"
         :widgetConfig="widgetConfig"
         >
    </WidgetWrapperEx> -->
     <component
        v-if="targetComponent"
        :is="targetComponent"
        :widgetConfig="widgetConfig"
      />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as def from "src/model";
import WidgetBasicComponent from "components/widget/WidgetBasicComponent.vue";
// import WidgetWrapper from "components/widget/WidgetWrapper.vue";

@Component({ components: { WidgetBasicComponent } })
export default class WidgetSelector extends Vue {
  @Prop({ type: Object as () => def.WidgetConfig })
  widgetConfig!: def.WidgetConfig;

  targetComponent: any;

  created() {
    this.targetComponent = WidgetBasicComponent;
  }

  mounted() {
  }
}
</script>
