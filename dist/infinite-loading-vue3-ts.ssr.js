'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3
};
var script = vue.defineComponent({
  name: 'InfiniteLoading',
  setup: function setup() {
    var stateChanger = vue.ref();
    var scrollParent = vue.ref();
    var isFirstLoad = vue.ref(false);
    var status = vue.ref(STATUS.READY);
    return {
      stateChanger: stateChanger,
      scrollParent: scrollParent,
      isFirstLoad: isFirstLoad,
      status: status
    };
  },
  computed: {
    isShowSpinner: function isShowSpinner() {
      return this.status === STATUS.LOADING;
    },
    isShowError: function isShowError() {
      return this.status === STATUS.ERROR;
    },
    isShowNoResults: function isShowNoResults() {
      return this.status === STATUS.COMPLETE && this.isFirstLoad;
    },
    isShowNoMore: function isShowNoMore() {
      return this.status === STATUS.COMPLETE && !this.isFirstLoad;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.scrollParent = this.getScrollParent(); // object pass to emit event

    this.stateChanger = {
      loaded: function loaded() {
        _this.isFirstLoad = false;

        _this.infinityLoad();
      },
      complete: function complete() {
        _this.status = STATUS.COMPLETE;

        _this.removeEventListener();
      },
      reset: function reset() {
        _this.status = STATUS.READY;
        _this.isFirstLoad = true;

        _this.addEventListener();

        setTimeout(function () {
          _this.infinityLoad();
        }, 1);
      },
      error: function error() {
        _this.status = STATUS.ERROR;
      }
    };
    setTimeout(function () {
      _this.infinityLoad();

      _this.addEventListener();
    });
  },
  beforeUnmount: function beforeUnmount() {
    this.removeEventListener();
  },
  methods: {
    addEventListener: function addEventListener() {
      if (this.scrollParent) {
        this.scrollParent.addEventListener('scroll', this.scrollHandler);
      }
    },
    removeEventListener: function removeEventListener() {
      if (this.scrollParent) {
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
      }
    },
    getCurrentDistance: function getCurrentDistance() {
      var _this$scrollParent;

      var infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
      var scrollElmOffsetTopFromBottom = this.scrollParent === window ? window.innerHeight : (_this$scrollParent = this.scrollParent) === null || _this$scrollParent === void 0 ? void 0 : _this$scrollParent.getBoundingClientRect().bottom;
      return infiniteElmOffsetTopFromBottom - (scrollElmOffsetTopFromBottom || 0);
    },
    isVisible: function isVisible(elm) {
      return elm.offsetWidth + elm.offsetHeight > 0;
    },
    getScrollParent: function getScrollParent(elm) {
      if (!elm) {
        elm = this.$el;
      }

      var result;

      if (elm.tagName === 'BODY') {
        result = window;
      } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
        result = elm;
      }

      return result || this.getScrollParent(elm.parentNode);
    },
    infinityLoad: function infinityLoad() {
      if (this.status !== STATUS.COMPLETE && this.isVisible(this.$el) && this.getCurrentDistance() <= 100) {
        this.status = STATUS.LOADING;
        this.$emit('infinite', this.stateChanger);
      } else {
        if (this.status === STATUS.LOADING) {
          this.status = STATUS.READY;
        }
      }
    },
    scrollHandler: function scrollHandler() {
      if (this.status === STATUS.READY) {
        this.infinityLoad();
      }
    }
  }
});var _hoisted_1 = {
  class: "infinite-loading-container"
};
var _hoisted_2 = {
  class: "infinite-status-prompt"
};

var _hoisted_3 = /*#__PURE__*/vue.createTextVNode(" Loading... ");

var _hoisted_4 = {
  class: "infinite-status-prompt"
};

var _hoisted_5 = /*#__PURE__*/vue.createTextVNode(" No results :( ");

var _hoisted_6 = {
  class: "infinite-status-prompt"
};

var _hoisted_7 = /*#__PURE__*/vue.createTextVNode(" No more data :) ");

var _hoisted_8 = {
  class: "infinite-status-prompt"
};

var _hoisted_9 = /*#__PURE__*/vue.createTextVNode(" Opps, something went wrong :( ");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [vue.withDirectives(vue.createVNode("div", _hoisted_2, [vue.renderSlot(_ctx.$slots, "spinner", {}, function () {
    return [_hoisted_3];
  })], 512), [[vue.vShow, _ctx.isShowSpinner]]), vue.withDirectives(vue.createVNode("div", _hoisted_4, [vue.renderSlot(_ctx.$slots, "no-results", {}, function () {
    return [_hoisted_5];
  })], 512), [[vue.vShow, _ctx.isShowNoResults]]), vue.withDirectives(vue.createVNode("div", _hoisted_6, [vue.renderSlot(_ctx.$slots, "no-more", {}, function () {
    return [_hoisted_7];
  })], 512), [[vue.vShow, _ctx.isShowNoMore]]), vue.withDirectives(vue.createVNode("div", _hoisted_8, [vue.renderSlot(_ctx.$slots, "error", {}, function () {
    return [_hoisted_9, vue.createVNode("button", {
      class: "btn-try-infinite",
      onClick: _cache[1] || (_cache[1] = function () {
        return _ctx.infinityLoad && _ctx.infinityLoad.apply(_ctx, arguments);
      })
    }, "Retry")];
  })], 512), [[vue.vShow, _ctx.isShowError]])]);
}script.render = render;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Assign InstallableComponent type
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('InfiniteLoadingVue3Ts', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';

var InfiniteLoading = script;var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component,InfiniteLoading: InfiniteLoading});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;