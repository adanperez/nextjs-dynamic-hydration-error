import I, { jsx as b, jsxs as M } from "react/jsx-runtime";
import S from "react";
function k() {
  return /* @__PURE__ */ b("h1", { children: "Header" });
}
const x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: k
}, Symbol.toStringTag, { value: "Module" }));
function $({ children: r }) {
  return /* @__PURE__ */ M("div", { children: [
    /* @__PURE__ */ b("h3", { children: "DynamicDiv" }),
    r
  ] });
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $
}, Symbol.toStringTag, { value: "Module" }));
function N(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var E = { exports: {} }, g = {};
g._ = g._interop_require_default = V;
function V(r) {
  return r && r.__esModule ? r : { default: r };
}
function F(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var q = {}, C = {}, P;
function H() {
  return P || (P = 1, function(r) {
    "use client";
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), Object.defineProperty(r, "LoadableContext", {
      enumerable: !0,
      get: function() {
        return _;
      }
    });
    const _ = (/* @__PURE__ */ g._(S)).default.createContext(null);
    process.env.NODE_ENV !== "production" && (_.displayName = "LoadableContext");
  }(C)), C;
}
var O;
function G() {
  return O || (O = 1, function(r) {
    Object.defineProperty(r, "__esModule", {
      value: !0
    }), Object.defineProperty(r, "default", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const c = /* @__PURE__ */ g._(S), _ = H();
    function m(t) {
      return t && t.default ? t.default : t;
    }
    const v = [], w = [];
    let h = !1;
    function L(t) {
      let n = t(), e = {
        loading: !0,
        loaded: null,
        error: null
      };
      return e.promise = n.then((o) => (e.loading = !1, e.loaded = o, o)).catch((o) => {
        throw e.loading = !1, e.error = o, o;
      }), e;
    }
    function D(t, n) {
      let e = Object.assign({
        loader: null,
        loading: null,
        delay: 200,
        timeout: null,
        webpack: null,
        modules: null
      }, n), o = null;
      function p() {
        if (!o) {
          const u = new a(t, e);
          o = {
            getCurrentValue: u.getCurrentValue.bind(u),
            subscribe: u.subscribe.bind(u),
            retry: u.retry.bind(u),
            promise: u.promise.bind(u)
          };
        }
        return o.promise();
      }
      if (typeof window > "u" && v.push(p), !h && typeof window < "u") {
        const u = e.webpack && typeof F.resolveWeak == "function" ? e.webpack() : e.modules;
        u && w.push((y) => {
          for (const f of u)
            if (y.includes(f))
              return p();
        });
      }
      function R() {
        p();
        const u = c.default.useContext(_.LoadableContext);
        u && Array.isArray(e.modules) && e.modules.forEach((y) => {
          u(y);
        });
      }
      function j(u, y) {
        R();
        const f = c.default.useSyncExternalStore(o.subscribe, o.getCurrentValue, o.getCurrentValue);
        return c.default.useImperativeHandle(y, () => ({
          retry: o.retry
        }), []), c.default.useMemo(() => f.loading || f.error ? /* @__PURE__ */ c.default.createElement(e.loading, {
          isLoading: f.loading,
          pastDelay: f.pastDelay,
          timedOut: f.timedOut,
          error: f.error,
          retry: o.retry
        }) : f.loaded ? /* @__PURE__ */ c.default.createElement(m(f.loaded), u) : null, [
          u,
          f
        ]);
      }
      return j.preload = () => p(), j.displayName = "LoadableComponent", /* @__PURE__ */ c.default.forwardRef(j);
    }
    class a {
      promise() {
        return this._res.promise;
      }
      retry() {
        this._clearTimeouts(), this._res = this._loadFn(this._opts.loader), this._state = {
          pastDelay: !1,
          timedOut: !1
        };
        const { _res: n, _opts: e } = this;
        n.loading && (typeof e.delay == "number" && (e.delay === 0 ? this._state.pastDelay = !0 : this._delay = setTimeout(() => {
          this._update({
            pastDelay: !0
          });
        }, e.delay)), typeof e.timeout == "number" && (this._timeout = setTimeout(() => {
          this._update({
            timedOut: !0
          });
        }, e.timeout))), this._res.promise.then(() => {
          this._update({}), this._clearTimeouts();
        }).catch((o) => {
          this._update({}), this._clearTimeouts();
        }), this._update({});
      }
      _update(n) {
        this._state = {
          ...this._state,
          error: this._res.error,
          loaded: this._res.loaded,
          loading: this._res.loading,
          ...n
        }, this._callbacks.forEach((e) => e());
      }
      _clearTimeouts() {
        clearTimeout(this._delay), clearTimeout(this._timeout);
      }
      getCurrentValue() {
        return this._state;
      }
      subscribe(n) {
        return this._callbacks.add(n), () => {
          this._callbacks.delete(n);
        };
      }
      constructor(n, e) {
        this._loadFn = n, this._opts = e, this._callbacks = /* @__PURE__ */ new Set(), this._delay = null, this._timeout = null, this.retry();
      }
    }
    function i(t) {
      return D(L, t);
    }
    function s(t, n) {
      let e = [];
      for (; t.length; ) {
        let o = t.pop();
        e.push(o(n));
      }
      return Promise.all(e).then(() => {
        if (t.length)
          return s(t, n);
      });
    }
    i.preloadAll = () => new Promise((t, n) => {
      s(v).then(t, n);
    }), i.preloadReady = (t) => (t === void 0 && (t = []), new Promise((n) => {
      const e = () => (h = !0, n());
      s(w, t).then(e, e);
    })), typeof window < "u" && (window.__NEXT_PRELOADREADY = i.preloadReady);
    const l = i;
  }(q)), q;
}
(function(r, d) {
  Object.defineProperty(d, "__esModule", {
    value: !0
  });
  function c(a, i) {
    for (var s in i) Object.defineProperty(a, s, {
      enumerable: !0,
      get: i[s]
    });
  }
  c(d, {
    /**
    * This function lets you dynamically import a component.
    * It uses [React.lazy()](https://react.dev/reference/react/lazy) with [Suspense](https://react.dev/reference/react/Suspense) under the hood.
    *
    * Read more: [Next.js Docs: `next/dynamic`](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
    */
    default: function() {
      return D;
    },
    noSSR: function() {
      return L;
    }
  });
  const _ = g, m = I, v = /* @__PURE__ */ _._(G()), w = typeof window > "u";
  function h(a) {
    return {
      default: (a == null ? void 0 : a.default) || a
    };
  }
  function L(a, i) {
    if (delete i.webpack, delete i.modules, !w)
      return a(i);
    const s = i.loading;
    return () => /* @__PURE__ */ (0, m.jsx)(s, {
      error: null,
      isLoading: !0,
      pastDelay: !1,
      timedOut: !1
    });
  }
  function D(a, i) {
    let s = v.default, l = {
      // A loading component is not required, so we default it
      loading: (e) => {
        let { error: o, isLoading: p, pastDelay: R } = e;
        if (!R) return null;
        if (process.env.NODE_ENV !== "production") {
          if (p)
            return null;
          if (o)
            return /* @__PURE__ */ (0, m.jsxs)("p", {
              children: [
                o.message,
                /* @__PURE__ */ (0, m.jsx)("br", {}),
                o.stack
              ]
            });
        }
        return null;
      }
    };
    a instanceof Promise ? l.loader = () => a : typeof a == "function" ? l.loader = a : typeof a == "object" && (l = {
      ...l,
      ...a
    }), l = {
      ...l,
      ...i
    };
    const t = l.loader, n = () => t != null ? t().then(h) : Promise.resolve(h(() => null));
    return l.loadableGenerated && (l = {
      ...l,
      ...l.loadableGenerated
    }, delete l.loadableGenerated), typeof l.ssr == "boolean" && !l.ssr ? (delete l.webpack, delete l.modules, L(s, l)) : s({
      ...l,
      loader: n
    });
  }
  (typeof d.default == "function" || typeof d.default == "object" && d.default !== null) && typeof d.default.__esModule > "u" && (Object.defineProperty(d.default, "__esModule", { value: !0 }), Object.assign(d.default, d), r.exports = d.default);
})(E, E.exports);
var Y = E.exports, Z = Y;
const T = /* @__PURE__ */ N(Z), z = T(() => Promise.resolve().then(() => x), {
  // loading: () => <p>Loading...</p>,
}), W = T(() => Promise.resolve().then(() => A), {
  // loading: () => <p>Loading...</p>,
});
function J() {
  return /* @__PURE__ */ b("div", { children: /* @__PURE__ */ b(W, { children: /* @__PURE__ */ b(z, {}) }) });
}
export {
  $ as Div,
  z as DynamicHeader,
  J as Everything,
  k as Header
};
