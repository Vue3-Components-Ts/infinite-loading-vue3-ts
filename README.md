# infinite-loading-vue3-ts
While waiting `new version support vue 3` from: https://www.npmjs.com/package/vue-infinite-loading

I make a new one, is based on `the package above` for vue 3
## Install

```
npm i infinite-loading-vue3-ts
```


## API

`slots`
- spinner: loading here
- no-more: text no more
- no-results: text no results

`events`
- infinite: is call from the component

## Usage & Example

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

## Refs

This package gets ideas from https://www.npmjs.com/package/vue-infinite-loading
If you want to know in deep let's go and read their great document
