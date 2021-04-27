import {DefineComponent, Plugin} from 'vue';

declare const InfiniteLoadingVue3Ts: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default InfiniteLoadingVue3Ts;

// export vue component
import InfiniteLoading from '@/infinite-loading-vue3-ts.vue';

export {InfiniteLoading};
