# infinite-loading-vue3-ts

## Installation

```
npm i infinite-loading-vue3-ts
```

## Usage

Then, import and using the component in `.vue` file.

Here is an example how using the component:
```vue
<template>
  ...
  <infinite-loading
    @infinite="infiniteHandler"
  >
    <template #spinner>
      // loading here
    </template>
    <template #no-more>
      // text no more
    </template>
    <template #no-results>
      // text no results
    </template>
  </infinite-loading>
</template>

<script lang="ts">
import InfiniteLoading from 'infinite-loading-vue3-ts';

export default defineComponent({
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      page: 1,
      list: [],
    };
  },
  methods: {
    infiniteHandler($state: any):void {
      axios.get(api, {
        params: {
          page: this.page,
        },
      }).then(({ data }) => {
        if (data.hits.length) {
          this.page += 1;
          this.list.push(...data.hits);
          
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
});
</script>
```

