<script lang="ts">
import { defineComponent } from 'vue';
import InfiniteLoading from '@/infinite-loading-vue3-ts.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    InfiniteLoading
  }
});
</script>

<template>
  <div id="app">
    <infinite-loading />
  </div>
</template>
