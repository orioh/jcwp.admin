<template>
  <q-page class="row items-center justify-evenly">
    <template>
      <MonacoEditor class="editor" v-model="code" language="javascript" />
    </template>
  </q-page>
</template>

<script lang="ts">
import MonacoEditor from "vue-monaco";
import { Todo, Meta } from "components/models";
import ExampleComponent from "components/ClassComponent.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { ExampleComponent, MonacoEditor },
})
export default class PageIndex extends Vue {
  code: string = "const noop = () => {}";
}
</script>

<style lang="scss" scoped>
.editor {
  width: 600px;
  height: 800px;
}
</style>