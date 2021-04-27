<template>
  <div class="infinite-loading-container">
    <div class="infinite-status-prompt" v-show="isShowSpinner">
      <slot name="spinner">
        Loading...
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="isShowNoResults">
      <slot name="no-results">
        No results :(
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="isShowNoMore">
      <slot name="no-more">
        No more data :)
      </slot>
    </div>
    <div class="infinite-status-prompt" v-show="isShowError">
      <slot name="error">
        Opps, something went wrong :(
        <button class="btn-try-infinite" @click="infinityLoad">Retry</button>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

const STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3,
};

export default defineComponent({
  name: 'InfiniteLoading',
  setup() {
    const stateChanger = ref<any>();
    const scrollParent = ref<Element>();
    const isFirstLoad = ref(false);
    const status = ref(STATUS.READY);

    return {
      stateChanger,
      scrollParent,
      isFirstLoad,
      status,
    };
  },
  computed: {
    isShowSpinner(): boolean {
      return this.status === STATUS.LOADING;
    },
    isShowError(): boolean {
      return this.status === STATUS.ERROR;
    },
    isShowNoResults(): boolean {
      return this.status === STATUS.COMPLETE && this.isFirstLoad;
    },
    isShowNoMore(): boolean {
      return this.status === STATUS.COMPLETE && !this.isFirstLoad;
    },
  },
  mounted() {
    this.scrollParent = this.getScrollParent();

    // object pass to emit event
    this.stateChanger = {
      loaded: () => {
        this.isFirstLoad = false;

        this.infinityLoad();
      },
      complete: () => {
        this.status = STATUS.COMPLETE;
        this.removeEventListener();
      },
      reset: () => {
        this.status = STATUS.READY;
        this.isFirstLoad = true;
        this.addEventListener();

        setTimeout(() => {
          this.infinityLoad();
        }, 1);
      },
      error: () => {
        this.status = STATUS.ERROR;
      },
    };

    setTimeout(() => {
      this.infinityLoad();
      this.addEventListener();
    });
  },
  beforeUnmount() {
    this.removeEventListener();
  },
  methods: {
    addEventListener(): void {
      if (this.scrollParent) {
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
      }
    },
    removeEventListener(): void {
      if (this.scrollParent) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },
    getCurrentDistance(): number {
      const infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect()
        .top;
      const scrollElmOffsetTopFromBottom =
        this.scrollParent === (window as any)
          ? window.innerHeight
          : this.scrollParent?.getBoundingClientRect().bottom;

      return (
        infiniteElmOffsetTopFromBottom - (scrollElmOffsetTopFromBottom || 0)
      );
    },
    isVisible(elm: HTMLElement): boolean {
      return elm.offsetWidth + elm.offsetHeight > 0;
    },
    getScrollParent(elm?: any): any {
      if (!elm) {
        elm = this.$el;
      }

      let result;

      if (elm.tagName === 'BODY') {
        result = window;
      } else if (
        elm.hasAttribute('infinite-wrapper') ||
        elm.hasAttribute('data-infinite-wrapper')
      ) {
        result = elm;
      }

      return result || this.getScrollParent(elm.parentNode);
    },
    infinityLoad() {
      if (
        this.status !== STATUS.COMPLETE &&
        this.isVisible(this.$el) &&
        this.getCurrentDistance() <= 100
      ) {
        this.status = STATUS.LOADING;

        this.$emit('infinite', this.stateChanger);
      } else {
        if (this.status === STATUS.LOADING) {
          this.status = STATUS.READY;
        }
      }
    },
    scrollHandler() {
      if (this.status === STATUS.READY) {
        this.infinityLoad();
      }
    },
  },
});
</script>
