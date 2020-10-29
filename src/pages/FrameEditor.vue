<template>
  <div class='fit'>
    frame editor
    <FrameComponent></FrameComponent>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import FrameComponent from "components/frame/FrameComponent.vue";

@Component({
  components: { FrameComponent },
})
export default class FrameEditor extends Vue {

}
</script>
