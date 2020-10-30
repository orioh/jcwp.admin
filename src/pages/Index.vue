<template>
  <q-page class="row items-center justify-evenly">
    <template>
      <monaco-editor class="editor" v-model="code" language="javascript" />
    </template>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from "components/models";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { },
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