<template>
  <div class='fit'>
    frame editor
    <FrameComponent :frameConfig="curFrame" :allowEdit="true"></FrameComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import FrameComponent from "components/frame/FrameComponent.vue";
import { Mock } from "src/model/mock";

@Component({
  components: { FrameComponent },
})
export default class FrameEditor extends Vue {
  curFrame = Mock.testFrame;
}
</script>
