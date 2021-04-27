import { defineComponent, ref, openBlock, createBlock, withDirectives, createVNode, renderSlot, vShow, createTextVNode } from 'vue';

const STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3
};
var script = defineComponent({
  name: 'InfiniteLoading',

  setup() {
    const stateChanger = ref();
    const scrollParent = ref();
    const isFirstLoad = ref(false);
    const status = ref(STATUS.READY);
    return {
      stateChanger,
      scrollParent,
      isFirstLoad,
      status
    };
  },

  computed: {
    isShowSpinner() {
      return this.status === STATUS.LOADING;
    },

    isShowError() {
      return this.status === STATUS.ERROR;
    },

    isShowNoResults() {
      return this.status === STATUS.COMPLETE && this.isFirstLoad;
    },

    isShowNoMore() {
      return this.status === STATUS.COMPLETE && !this.isFirstLoad;
    }

  },

  mounted() {
    this.scrollParent = this.getScrollParent(); // object pass to emit event

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
      }
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
    addEventListener() {
      if (this.scrollParent) {
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
      }
    },

    removeEventListener() {
      if (this.scrollParent) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },

    getCurrentDistance() {
      var _this$scrollParent;

      const infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
      const scrollElmOffsetTopFromBottom = this.scrollParent === window ? window.innerHeight : (_this$scrollParent = this.scrollParent) === null || _this$scrollParent === void 0 ? void 0 : _this$scrollParent.getBoundingClientRect().bottom;
      return infiniteElmOffsetTopFromBottom - (scrollElmOffsetTopFromBottom || 0);
    },

    isVisible(elm) {
      return elm.offsetWidth + elm.offsetHeight > 0;
    },

    getScrollParent(elm) {
      if (!elm) {
        elm = this.$el;
      }

      let result;

      if (elm.tagName === 'BODY') {
        result = window;
      } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
        result = elm;
      }

      return result || this.getScrollParent(elm.parentNode);
    },

    infinityLoad() {
      if (this.status !== STATUS.COMPLETE && this.isVisible(this.$el) && this.getCurrentDistance() <= 100) {
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
    }

  }
});

const _hoisted_1 = {
  class: "infinite-loading-container"
};
const _hoisted_2 = {
  class: "infinite-status-prompt"
};

const _hoisted_3 = /*#__PURE__*/createTextVNode(" Loading... ");

const _hoisted_4 = {
  class: "infinite-status-prompt"
};

const _hoisted_5 = /*#__PURE__*/createTextVNode(" No results :( ");

const _hoisted_6 = {
  class: "infinite-status-prompt"
};

const _hoisted_7 = /*#__PURE__*/createTextVNode(" No more data :) ");

const _hoisted_8 = {
  class: "infinite-status-prompt"
};

const _hoisted_9 = /*#__PURE__*/createTextVNode(" Opps, something went wrong :( ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [withDirectives(createVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "spinner", {}, () => [_hoisted_3])], 512), [[vShow, _ctx.isShowSpinner]]), withDirectives(createVNode("div", _hoisted_4, [renderSlot(_ctx.$slots, "no-results", {}, () => [_hoisted_5])], 512), [[vShow, _ctx.isShowNoResults]]), withDirectives(createVNode("div", _hoisted_6, [renderSlot(_ctx.$slots, "no-more", {}, () => [_hoisted_7])], 512), [[vShow, _ctx.isShowNoMore]]), withDirectives(createVNode("div", _hoisted_8, [renderSlot(_ctx.$slots, "error", {}, () => [_hoisted_9, createVNode("button", {
    class: "btn-try-infinite",
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.infinityLoad && _ctx.infinityLoad(...args))
  }, "Retry")])], 512), [[vShow, _ctx.isShowError]])]);
}

script.render = render;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Assign InstallableComponent type
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('InfiniteLoadingVue3Ts', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';

const InfiniteLoading = script;

export default entry_esm;
export { InfiniteLoading };
