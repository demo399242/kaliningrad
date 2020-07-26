<template lang="pug">
tree-items
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TreeItems from './components/TreeItems.vue';

@Component({
  components: { TreeItems },
})
export default class App extends Vue {}
</script>

<style>

</style>
