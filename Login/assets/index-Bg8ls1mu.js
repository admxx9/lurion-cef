(function () {
  const cl = document.createElement("link").relList;
  if (cl && cl.supports && cl.supports("modulepreload")) return;
  for (const G of document.querySelectorAll('link[rel="modulepreload"]')) r(G);
  new MutationObserver((G) => {
    for (const K of G)
      if (K.type === "childList")
        for (const il of K.addedNodes)
          il.tagName === "LINK" && il.rel === "modulepreload" && r(il);
  }).observe(document, { childList: !0, subtree: !0 });
  function J(G) {
    const K = {};
    return (
      G.integrity && (K.integrity = G.integrity),
      G.referrerPolicy && (K.referrerPolicy = G.referrerPolicy),
      G.crossOrigin === "use-credentials"
        ? (K.credentials = "include")
        : G.crossOrigin === "anonymous"
          ? (K.credentials = "omit")
          : (K.credentials = "same-origin"),
      K
    );
  }
  function r(G) {
    if (G.ep) return;
    G.ep = !0;
    const K = J(G);
    fetch(G.href, K);
  }
})();
var Fc = { exports: {} },
  re = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var k1;
function Uv() {
  if (k1) return re;
  k1 = 1;
  var _ = Symbol.for("react.transitional.element"),
    cl = Symbol.for("react.fragment");
  function J(r, G, K) {
    var il = null;
    if (
      (K !== void 0 && (il = "" + K),
      G.key !== void 0 && (il = "" + G.key),
      "key" in G)
    ) {
      K = {};
      for (var Ol in G) Ol !== "key" && (K[Ol] = G[Ol]);
    } else K = G;
    return (
      (G = K.ref),
      { $$typeof: _, type: r, key: il, ref: G !== void 0 ? G : null, props: K }
    );
  }
  return ((re.Fragment = cl), (re.jsx = J), (re.jsxs = J), re);
}
var F1;
function Rv() {
  return (F1 || ((F1 = 1), (Fc.exports = Uv())), Fc.exports);
}
var H = Rv(),
  Ic = { exports: {} },
  ge = {},
  Pc = { exports: {} },
  li = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var I1;
function Nv() {
  return (
    I1 ||
      ((I1 = 1),
      (function (_) {
        function cl(S, O) {
          var Y = S.length;
          S.push(O);
          l: for (; 0 < Y;) {
            var al = (Y - 1) >>> 1,
              s = S[al];
            if (0 < G(s, O)) ((S[al] = O), (S[Y] = s), (Y = al));
            else break l;
          }
        }
        function J(S) {
          return S.length === 0 ? null : S[0];
        }
        function r(S) {
          if (S.length === 0) return null;
          var O = S[0],
            Y = S.pop();
          if (Y !== O) {
            S[0] = Y;
            l: for (var al = 0, s = S.length, A = s >>> 1; al < A;) {
              var M = 2 * (al + 1) - 1,
                z = S[M],
                p = M + 1,
                W = S[p];
              if (0 > G(z, Y))
                p < s && 0 > G(W, z)
                  ? ((S[al] = W), (S[p] = Y), (al = p))
                  : ((S[al] = z), (S[M] = Y), (al = M));
              else if (p < s && 0 > G(W, Y))
                ((S[al] = W), (S[p] = Y), (al = p));
              else break l;
            }
          }
          return O;
        }
        function G(S, O) {
          var Y = S.sortIndex - O.sortIndex;
          return Y !== 0 ? Y : S.id - O.id;
        }
        if (
          ((_.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var K = performance;
          _.unstable_now = function () {
            return K.now();
          };
        } else {
          var il = Date,
            Ol = il.now();
          _.unstable_now = function () {
            return il.now() - Ol;
          };
        }
        var R = [],
          E = [],
          U = 1,
          ul = null,
          nl = 3,
          ql = !1,
          Yl = !1,
          dt = !1,
          Bl = !1,
          du = typeof setTimeout == "function" ? setTimeout : null,
          zt = typeof clearTimeout == "function" ? clearTimeout : null,
          Ul = typeof setImmediate < "u" ? setImmediate : null;
        function yt(S) {
          for (var O = J(E); O !== null;) {
            if (O.callback === null) r(E);
            else if (O.startTime <= S)
              (r(E), (O.sortIndex = O.expirationTime), cl(R, O));
            else break;
            O = J(E);
          }
        }
        function w(S) {
          if (((dt = !1), yt(S), !Yl))
            if (J(R) !== null) ((Yl = !0), Vl || ((Vl = !0), Rl()));
            else {
              var O = J(E);
              O !== null && Nl(w, O.startTime - S);
            }
        }
        var Vl = !1,
          Ll = -1,
          Kl = 5,
          rt = -1;
        function pu() {
          return Bl ? !0 : !(_.unstable_now() - rt < Kl);
        }
        function Ot() {
          if (((Bl = !1), Vl)) {
            var S = _.unstable_now();
            rt = S;
            var O = !0;
            try {
              l: {
                ((Yl = !1), dt && ((dt = !1), zt(Ll), (Ll = -1)), (ql = !0));
                var Y = nl;
                try {
                  t: {
                    for (
                      yt(S), ul = J(R);
                      ul !== null && !(ul.expirationTime > S && pu());
                    ) {
                      var al = ul.callback;
                      if (typeof al == "function") {
                        ((ul.callback = null), (nl = ul.priorityLevel));
                        var s = al(ul.expirationTime <= S);
                        if (((S = _.unstable_now()), typeof s == "function")) {
                          ((ul.callback = s), yt(S), (O = !0));
                          break t;
                        }
                        (ul === J(R) && r(R), yt(S));
                      } else r(R);
                      ul = J(R);
                    }
                    if (ul !== null) O = !0;
                    else {
                      var A = J(E);
                      (A !== null && Nl(w, A.startTime - S), (O = !1));
                    }
                  }
                  break l;
                } finally {
                  ((ul = null), (nl = Y), (ql = !1));
                }
                O = void 0;
              }
            } finally {
              O ? Rl() : (Vl = !1);
            }
          }
        }
        var Rl;
        if (typeof Ul == "function")
          Rl = function () {
            Ul(Ot);
          };
        else if (typeof MessageChannel < "u") {
          var yu = new MessageChannel(),
            hu = yu.port2;
          ((yu.port1.onmessage = Ot),
            (Rl = function () {
              hu.postMessage(null);
            }));
        } else
          Rl = function () {
            du(Ot, 0);
          };
        function Nl(S, O) {
          Ll = du(function () {
            S(_.unstable_now());
          }, O);
        }
        ((_.unstable_IdlePriority = 5),
          (_.unstable_ImmediatePriority = 1),
          (_.unstable_LowPriority = 4),
          (_.unstable_NormalPriority = 3),
          (_.unstable_Profiling = null),
          (_.unstable_UserBlockingPriority = 2),
          (_.unstable_cancelCallback = function (S) {
            S.callback = null;
          }),
          (_.unstable_forceFrameRate = function (S) {
            0 > S || 125 < S
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Kl = 0 < S ? Math.floor(1e3 / S) : 5);
          }),
          (_.unstable_getCurrentPriorityLevel = function () {
            return nl;
          }),
          (_.unstable_next = function (S) {
            switch (nl) {
              case 1:
              case 2:
              case 3:
                var O = 3;
                break;
              default:
                O = nl;
            }
            var Y = nl;
            nl = O;
            try {
              return S();
            } finally {
              nl = Y;
            }
          }),
          (_.unstable_requestPaint = function () {
            Bl = !0;
          }),
          (_.unstable_runWithPriority = function (S, O) {
            switch (S) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                S = 3;
            }
            var Y = nl;
            nl = S;
            try {
              return O();
            } finally {
              nl = Y;
            }
          }),
          (_.unstable_scheduleCallback = function (S, O, Y) {
            var al = _.unstable_now();
            switch (
              (typeof Y == "object" && Y !== null
                ? ((Y = Y.delay),
                  (Y = typeof Y == "number" && 0 < Y ? al + Y : al))
                : (Y = al),
              S)
            ) {
              case 1:
                var s = -1;
                break;
              case 2:
                s = 250;
                break;
              case 5:
                s = 1073741823;
                break;
              case 4:
                s = 1e4;
                break;
              default:
                s = 5e3;
            }
            return (
              (s = Y + s),
              (S = {
                id: U++,
                callback: O,
                priorityLevel: S,
                startTime: Y,
                expirationTime: s,
                sortIndex: -1,
              }),
              Y > al
                ? ((S.sortIndex = Y),
                  cl(E, S),
                  J(R) === null &&
                    S === J(E) &&
                    (dt ? (zt(Ll), (Ll = -1)) : (dt = !0), Nl(w, Y - al)))
                : ((S.sortIndex = s),
                  cl(R, S),
                  Yl || ql || ((Yl = !0), Vl || ((Vl = !0), Rl()))),
              S
            );
          }),
          (_.unstable_shouldYield = pu),
          (_.unstable_wrapCallback = function (S) {
            var O = nl;
            return function () {
              var Y = nl;
              nl = O;
              try {
                return S.apply(this, arguments);
              } finally {
                nl = Y;
              }
            };
          }));
      })(li)),
    li
  );
}
var P1;
function Hv() {
  return (P1 || ((P1 = 1), (Pc.exports = Nv())), Pc.exports);
}
var ti = { exports: {} },
  j = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ls;
function pv() {
  if (ls) return j;
  ls = 1;
  var _ = Symbol.for("react.transitional.element"),
    cl = Symbol.for("react.portal"),
    J = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    G = Symbol.for("react.profiler"),
    K = Symbol.for("react.consumer"),
    il = Symbol.for("react.context"),
    Ol = Symbol.for("react.forward_ref"),
    R = Symbol.for("react.suspense"),
    E = Symbol.for("react.memo"),
    U = Symbol.for("react.lazy"),
    ul = Symbol.iterator;
  function nl(s) {
    return s === null || typeof s != "object"
      ? null
      : ((s = (ul && s[ul]) || s["@@iterator"]),
        typeof s == "function" ? s : null);
  }
  var ql = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Yl = Object.assign,
    dt = {};
  function Bl(s, A, M) {
    ((this.props = s),
      (this.context = A),
      (this.refs = dt),
      (this.updater = M || ql));
  }
  ((Bl.prototype.isReactComponent = {}),
    (Bl.prototype.setState = function (s, A) {
      if (typeof s != "object" && typeof s != "function" && s != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, s, A, "setState");
    }),
    (Bl.prototype.forceUpdate = function (s) {
      this.updater.enqueueForceUpdate(this, s, "forceUpdate");
    }));
  function du() {}
  du.prototype = Bl.prototype;
  function zt(s, A, M) {
    ((this.props = s),
      (this.context = A),
      (this.refs = dt),
      (this.updater = M || ql));
  }
  var Ul = (zt.prototype = new du());
  ((Ul.constructor = zt), Yl(Ul, Bl.prototype), (Ul.isPureReactComponent = !0));
  var yt = Array.isArray,
    w = { H: null, A: null, T: null, S: null, V: null },
    Vl = Object.prototype.hasOwnProperty;
  function Ll(s, A, M, z, p, W) {
    return (
      (M = W.ref),
      { $$typeof: _, type: s, key: A, ref: M !== void 0 ? M : null, props: W }
    );
  }
  function Kl(s, A) {
    return Ll(s.type, A, void 0, void 0, void 0, s.props);
  }
  function rt(s) {
    return typeof s == "object" && s !== null && s.$$typeof === _;
  }
  function pu(s) {
    var A = { "=": "=0", ":": "=2" };
    return (
      "$" +
      s.replace(/[=:]/g, function (M) {
        return A[M];
      })
    );
  }
  var Ot = /\/+/g;
  function Rl(s, A) {
    return typeof s == "object" && s !== null && s.key != null
      ? pu("" + s.key)
      : A.toString(36);
  }
  function yu() {}
  function hu(s) {
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        throw s.reason;
      default:
        switch (
          (typeof s.status == "string"
            ? s.then(yu, yu)
            : ((s.status = "pending"),
              s.then(
                function (A) {
                  s.status === "pending" &&
                    ((s.status = "fulfilled"), (s.value = A));
                },
                function (A) {
                  s.status === "pending" &&
                    ((s.status = "rejected"), (s.reason = A));
                },
              )),
          s.status)
        ) {
          case "fulfilled":
            return s.value;
          case "rejected":
            throw s.reason;
        }
    }
    throw s;
  }
  function Nl(s, A, M, z, p) {
    var W = typeof s;
    (W === "undefined" || W === "boolean") && (s = null);
    var B = !1;
    if (s === null) B = !0;
    else
      switch (W) {
        case "bigint":
        case "string":
        case "number":
          B = !0;
          break;
        case "object":
          switch (s.$$typeof) {
            case _:
            case cl:
              B = !0;
              break;
            case U:
              return ((B = s._init), Nl(B(s._payload), A, M, z, p));
          }
      }
    if (B)
      return (
        (p = p(s)),
        (B = z === "" ? "." + Rl(s, 0) : z),
        yt(p)
          ? ((M = ""),
            B != null && (M = B.replace(Ot, "$&/") + "/"),
            Nl(p, A, M, "", function (Xt) {
              return Xt;
            }))
          : p != null &&
            (rt(p) &&
              (p = Kl(
                p,
                M +
                  (p.key == null || (s && s.key === p.key)
                    ? ""
                    : ("" + p.key).replace(Ot, "$&/") + "/") +
                  B,
              )),
            A.push(p)),
        1
      );
    B = 0;
    var Jl = z === "" ? "." : z + ":";
    if (yt(s))
      for (var sl = 0; sl < s.length; sl++)
        ((z = s[sl]), (W = Jl + Rl(z, sl)), (B += Nl(z, A, M, W, p)));
    else if (((sl = nl(s)), typeof sl == "function"))
      for (s = sl.call(s), sl = 0; !(z = s.next()).done;)
        ((z = z.value), (W = Jl + Rl(z, sl++)), (B += Nl(z, A, M, W, p)));
    else if (W === "object") {
      if (typeof s.then == "function") return Nl(hu(s), A, M, z, p);
      throw (
        (A = String(s)),
        Error(
          "Objects are not valid as a React child (found: " +
            (A === "[object Object]"
              ? "object with keys {" + Object.keys(s).join(", ") + "}"
              : A) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return B;
  }
  function S(s, A, M) {
    if (s == null) return s;
    var z = [],
      p = 0;
    return (
      Nl(s, z, "", "", function (W) {
        return A.call(M, W, p++);
      }),
      z
    );
  }
  function O(s) {
    if (s._status === -1) {
      var A = s._result;
      ((A = A()),
        A.then(
          function (M) {
            (s._status === 0 || s._status === -1) &&
              ((s._status = 1), (s._result = M));
          },
          function (M) {
            (s._status === 0 || s._status === -1) &&
              ((s._status = 2), (s._result = M));
          },
        ),
        s._status === -1 && ((s._status = 0), (s._result = A)));
    }
    if (s._status === 1) return s._result.default;
    throw s._result;
  }
  var Y =
    typeof reportError == "function"
      ? reportError
      : function (s) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var A = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof s == "object" &&
                s !== null &&
                typeof s.message == "string"
                  ? String(s.message)
                  : String(s),
              error: s,
            });
            if (!window.dispatchEvent(A)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", s);
            return;
          }
          console.error(s);
        };
  function al() {}
  return (
    (j.Children = {
      map: S,
      forEach: function (s, A, M) {
        S(
          s,
          function () {
            A.apply(this, arguments);
          },
          M,
        );
      },
      count: function (s) {
        var A = 0;
        return (
          S(s, function () {
            A++;
          }),
          A
        );
      },
      toArray: function (s) {
        return (
          S(s, function (A) {
            return A;
          }) || []
        );
      },
      only: function (s) {
        if (!rt(s))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return s;
      },
    }),
    (j.Component = Bl),
    (j.Fragment = J),
    (j.Profiler = G),
    (j.PureComponent = zt),
    (j.StrictMode = r),
    (j.Suspense = R),
    (j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w),
    (j.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (s) {
        return w.H.useMemoCache(s);
      },
    }),
    (j.cache = function (s) {
      return function () {
        return s.apply(null, arguments);
      };
    }),
    (j.cloneElement = function (s, A, M) {
      if (s == null)
        throw Error(
          "The argument must be a React element, but you passed " + s + ".",
        );
      var z = Yl({}, s.props),
        p = s.key,
        W = void 0;
      if (A != null)
        for (B in (A.ref !== void 0 && (W = void 0),
        A.key !== void 0 && (p = "" + A.key),
        A))
          !Vl.call(A, B) ||
            B === "key" ||
            B === "__self" ||
            B === "__source" ||
            (B === "ref" && A.ref === void 0) ||
            (z[B] = A[B]);
      var B = arguments.length - 2;
      if (B === 1) z.children = M;
      else if (1 < B) {
        for (var Jl = Array(B), sl = 0; sl < B; sl++)
          Jl[sl] = arguments[sl + 2];
        z.children = Jl;
      }
      return Ll(s.type, p, void 0, void 0, W, z);
    }),
    (j.createContext = function (s) {
      return (
        (s = {
          $$typeof: il,
          _currentValue: s,
          _currentValue2: s,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (s.Provider = s),
        (s.Consumer = { $$typeof: K, _context: s }),
        s
      );
    }),
    (j.createElement = function (s, A, M) {
      var z,
        p = {},
        W = null;
      if (A != null)
        for (z in (A.key !== void 0 && (W = "" + A.key), A))
          Vl.call(A, z) &&
            z !== "key" &&
            z !== "__self" &&
            z !== "__source" &&
            (p[z] = A[z]);
      var B = arguments.length - 2;
      if (B === 1) p.children = M;
      else if (1 < B) {
        for (var Jl = Array(B), sl = 0; sl < B; sl++)
          Jl[sl] = arguments[sl + 2];
        p.children = Jl;
      }
      if (s && s.defaultProps)
        for (z in ((B = s.defaultProps), B)) p[z] === void 0 && (p[z] = B[z]);
      return Ll(s, W, void 0, void 0, null, p);
    }),
    (j.createRef = function () {
      return { current: null };
    }),
    (j.forwardRef = function (s) {
      return { $$typeof: Ol, render: s };
    }),
    (j.isValidElement = rt),
    (j.lazy = function (s) {
      return { $$typeof: U, _payload: { _status: -1, _result: s }, _init: O };
    }),
    (j.memo = function (s, A) {
      return { $$typeof: E, type: s, compare: A === void 0 ? null : A };
    }),
    (j.startTransition = function (s) {
      var A = w.T,
        M = {};
      w.T = M;
      try {
        var z = s(),
          p = w.S;
        (p !== null && p(M, z),
          typeof z == "object" &&
            z !== null &&
            typeof z.then == "function" &&
            z.then(al, Y));
      } catch (W) {
        Y(W);
      } finally {
        w.T = A;
      }
    }),
    (j.unstable_useCacheRefresh = function () {
      return w.H.useCacheRefresh();
    }),
    (j.use = function (s) {
      return w.H.use(s);
    }),
    (j.useActionState = function (s, A, M) {
      return w.H.useActionState(s, A, M);
    }),
    (j.useCallback = function (s, A) {
      return w.H.useCallback(s, A);
    }),
    (j.useContext = function (s) {
      return w.H.useContext(s);
    }),
    (j.useDebugValue = function () {}),
    (j.useDeferredValue = function (s, A) {
      return w.H.useDeferredValue(s, A);
    }),
    (j.useEffect = function (s, A, M) {
      var z = w.H;
      if (typeof M == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return z.useEffect(s, A);
    }),
    (j.useId = function () {
      return w.H.useId();
    }),
    (j.useImperativeHandle = function (s, A, M) {
      return w.H.useImperativeHandle(s, A, M);
    }),
    (j.useInsertionEffect = function (s, A) {
      return w.H.useInsertionEffect(s, A);
    }),
    (j.useLayoutEffect = function (s, A) {
      return w.H.useLayoutEffect(s, A);
    }),
    (j.useMemo = function (s, A) {
      return w.H.useMemo(s, A);
    }),
    (j.useOptimistic = function (s, A) {
      return w.H.useOptimistic(s, A);
    }),
    (j.useReducer = function (s, A, M) {
      return w.H.useReducer(s, A, M);
    }),
    (j.useRef = function (s) {
      return w.H.useRef(s);
    }),
    (j.useState = function (s) {
      return w.H.useState(s);
    }),
    (j.useSyncExternalStore = function (s, A, M) {
      return w.H.useSyncExternalStore(s, A, M);
    }),
    (j.useTransition = function () {
      return w.H.useTransition();
    }),
    (j.version = "19.1.0"),
    j
  );
}
var ts;
function ai() {
  return (ts || ((ts = 1), (ti.exports = pv())), ti.exports);
}
var ui = { exports: {} },
  Cl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var us;
function Cv() {
  if (us) return Cl;
  us = 1;
  var _ = ai();
  function cl(R) {
    var E = "https://react.dev/errors/" + R;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        E += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return (
      "Minified React error #" +
      R +
      "; visit " +
      E +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function J() {}
  var r = {
      d: {
        f: J,
        r: function () {
          throw Error(cl(522));
        },
        D: J,
        C: J,
        L: J,
        m: J,
        X: J,
        S: J,
        M: J,
      },
      p: 0,
      findDOMNode: null,
    },
    G = Symbol.for("react.portal");
  function K(R, E, U) {
    var ul =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: G,
      key: ul == null ? null : "" + ul,
      children: R,
      containerInfo: E,
      implementation: U,
    };
  }
  var il = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Ol(R, E) {
    if (R === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (Cl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Cl.createPortal = function (R, E) {
      var U =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11))
        throw Error(cl(299));
      return K(R, E, null, U);
    }),
    (Cl.flushSync = function (R) {
      var E = il.T,
        U = r.p;
      try {
        if (((il.T = null), (r.p = 2), R)) return R();
      } finally {
        ((il.T = E), (r.p = U), r.d.f());
      }
    }),
    (Cl.preconnect = function (R, E) {
      typeof R == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E =
              typeof E == "string"
                ? E === "use-credentials"
                  ? E
                  : ""
                : void 0))
          : (E = null),
        r.d.C(R, E));
    }),
    (Cl.prefetchDNS = function (R) {
      typeof R == "string" && r.d.D(R);
    }),
    (Cl.preinit = function (R, E) {
      if (typeof R == "string" && E && typeof E.as == "string") {
        var U = E.as,
          ul = Ol(U, E.crossOrigin),
          nl = typeof E.integrity == "string" ? E.integrity : void 0,
          ql = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        U === "style"
          ? r.d.S(R, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: ul,
              integrity: nl,
              fetchPriority: ql,
            })
          : U === "script" &&
            r.d.X(R, {
              crossOrigin: ul,
              integrity: nl,
              fetchPriority: ql,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (Cl.preinitModule = function (R, E) {
      if (typeof R == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var U = Ol(E.as, E.crossOrigin);
            r.d.M(R, {
              crossOrigin: U,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
          }
        } else E == null && r.d.M(R);
    }),
    (Cl.preload = function (R, E) {
      if (
        typeof R == "string" &&
        typeof E == "object" &&
        E !== null &&
        typeof E.as == "string"
      ) {
        var U = E.as,
          ul = Ol(U, E.crossOrigin);
        r.d.L(R, U, {
          crossOrigin: ul,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0,
          type: typeof E.type == "string" ? E.type : void 0,
          fetchPriority:
            typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          referrerPolicy:
            typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
          imageSrcSet:
            typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
          imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
          media: typeof E.media == "string" ? E.media : void 0,
        });
      }
    }),
    (Cl.preloadModule = function (R, E) {
      if (typeof R == "string")
        if (E) {
          var U = Ol(E.as, E.crossOrigin);
          r.d.m(R, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: U,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          });
        } else r.d.m(R);
    }),
    (Cl.requestFormReset = function (R) {
      r.d.r(R);
    }),
    (Cl.unstable_batchedUpdates = function (R, E) {
      return R(E);
    }),
    (Cl.useFormState = function (R, E, U) {
      return il.H.useFormState(R, E, U);
    }),
    (Cl.useFormStatus = function () {
      return il.H.useHostTransitionStatus();
    }),
    (Cl.version = "19.1.0"),
    Cl
  );
}
var as;
function qv() {
  if (as) return ui.exports;
  as = 1;
  function _() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_);
      } catch (cl) {
        console.error(cl);
      }
  }
  return (_(), (ui.exports = Cv()), ui.exports);
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var es;
function Yv() {
  if (es) return ge;
  es = 1;
  var _ = Hv(),
    cl = ai(),
    J = qv();
  function r(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        t += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function G(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function K(l) {
    var t = l,
      u = l;
    if (l.alternate) for (; t.return;) t = t.return;
    else {
      l = t;
      do ((t = l), (t.flags & 4098) !== 0 && (u = t.return), (l = t.return));
      while (l);
    }
    return t.tag === 3 ? u : null;
  }
  function il(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Ol(l) {
    if (K(l) !== l) throw Error(r(188));
  }
  function R(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = K(l)), t === null)) throw Error(r(188));
      return t !== l ? null : l;
    }
    for (var u = l, a = t; ;) {
      var e = u.return;
      if (e === null) break;
      var n = e.alternate;
      if (n === null) {
        if (((a = e.return), a !== null)) {
          u = a;
          continue;
        }
        break;
      }
      if (e.child === n.child) {
        for (n = e.child; n;) {
          if (n === u) return (Ol(e), l);
          if (n === a) return (Ol(e), t);
          n = n.sibling;
        }
        throw Error(r(188));
      }
      if (u.return !== a.return) ((u = e), (a = n));
      else {
        for (var f = !1, c = e.child; c;) {
          if (c === u) {
            ((f = !0), (u = e), (a = n));
            break;
          }
          if (c === a) {
            ((f = !0), (a = e), (u = n));
            break;
          }
          c = c.sibling;
        }
        if (!f) {
          for (c = n.child; c;) {
            if (c === u) {
              ((f = !0), (u = n), (a = e));
              break;
            }
            if (c === a) {
              ((f = !0), (a = n), (u = e));
              break;
            }
            c = c.sibling;
          }
          if (!f) throw Error(r(189));
        }
      }
      if (u.alternate !== a) throw Error(r(190));
    }
    if (u.tag !== 3) throw Error(r(188));
    return u.stateNode.current === u ? l : t;
  }
  function E(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null;) {
      if (((t = E(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var U = Object.assign,
    ul = Symbol.for("react.element"),
    nl = Symbol.for("react.transitional.element"),
    ql = Symbol.for("react.portal"),
    Yl = Symbol.for("react.fragment"),
    dt = Symbol.for("react.strict_mode"),
    Bl = Symbol.for("react.profiler"),
    du = Symbol.for("react.provider"),
    zt = Symbol.for("react.consumer"),
    Ul = Symbol.for("react.context"),
    yt = Symbol.for("react.forward_ref"),
    w = Symbol.for("react.suspense"),
    Vl = Symbol.for("react.suspense_list"),
    Ll = Symbol.for("react.memo"),
    Kl = Symbol.for("react.lazy"),
    rt = Symbol.for("react.activity"),
    pu = Symbol.for("react.memo_cache_sentinel"),
    Ot = Symbol.iterator;
  function Rl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (Ot && l[Ot]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var yu = Symbol.for("react.client.reference");
  function hu(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === yu ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case Yl:
        return "Fragment";
      case Bl:
        return "Profiler";
      case dt:
        return "StrictMode";
      case w:
        return "Suspense";
      case Vl:
        return "SuspenseList";
      case rt:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case ql:
          return "Portal";
        case Ul:
          return (l.displayName || "Context") + ".Provider";
        case zt:
          return (l._context.displayName || "Context") + ".Consumer";
        case yt:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case Ll:
          return (
            (t = l.displayName || null),
            t !== null ? t : hu(l.type) || "Memo"
          );
        case Kl:
          ((t = l._payload), (l = l._init));
          try {
            return hu(l(t));
          } catch {}
      }
    return null;
  }
  var Nl = Array.isArray,
    S = cl.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    O = J.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = { pending: !1, data: null, method: null, action: null },
    al = [],
    s = -1;
  function A(l) {
    return { current: l };
  }
  function M(l) {
    0 > s || ((l.current = al[s]), (al[s] = null), s--);
  }
  function z(l, t) {
    (s++, (al[s] = l.current), (l.current = t));
  }
  var p = A(null),
    W = A(null),
    B = A(null),
    Jl = A(null);
  function sl(l, t) {
    switch ((z(B, t), z(W, l), z(p, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? O1(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          ((t = O1(t)), (l = M1(t, l)));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    (M(p), z(p, l));
  }
  function Xt() {
    (M(p), M(W), M(B));
  }
  function Yn(l) {
    l.memoizedState !== null && z(Jl, l);
    var t = p.current,
      u = M1(t, l.type);
    t !== u && (z(W, l), z(p, u));
  }
  function be(l) {
    (W.current === l && (M(p), M(W)),
      Jl.current === l && (M(Jl), (de._currentValue = Y)));
  }
  var xn = Object.prototype.hasOwnProperty,
    Bn = _.unstable_scheduleCallback,
    jn = _.unstable_cancelCallback,
    fs = _.unstable_shouldYield,
    cs = _.unstable_requestPaint,
    gt = _.unstable_now,
    is = _.unstable_getCurrentPriorityLevel,
    ei = _.unstable_ImmediatePriority,
    ni = _.unstable_UserBlockingPriority,
    Te = _.unstable_NormalPriority,
    ss = _.unstable_LowPriority,
    fi = _.unstable_IdlePriority,
    vs = _.log,
    ds = _.unstable_setDisableYieldValue,
    ba = null,
    wl = null;
  function Qt(l) {
    if (
      (typeof vs == "function" && ds(l),
      wl && typeof wl.setStrictMode == "function")
    )
      try {
        wl.setStrictMode(ba, l);
      } catch {}
  }
  var Wl = Math.clz32 ? Math.clz32 : os,
    ys = Math.log,
    hs = Math.LN2;
  function os(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - ((ys(l) / hs) | 0)) | 0);
  }
  var Ee = 256,
    Ae = 4194304;
  function ou(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function ze(l, t, u) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var e = 0,
      n = l.suspendedLanes,
      f = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return (
      c !== 0
        ? ((a = c & ~n),
          a !== 0
            ? (e = ou(a))
            : ((f &= c),
              f !== 0
                ? (e = ou(f))
                : u || ((u = c & ~l), u !== 0 && (e = ou(u)))))
        : ((c = a & ~n),
          c !== 0
            ? (e = ou(c))
            : f !== 0
              ? (e = ou(f))
              : u || ((u = a & ~l), u !== 0 && (e = ou(u)))),
      e === 0
        ? 0
        : t !== 0 &&
            t !== e &&
            (t & n) === 0 &&
            ((n = e & -e),
            (u = t & -t),
            n >= u || (n === 32 && (u & 4194048) !== 0))
          ? t
          : e
    );
  }
  function Ta(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function ms(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ci() {
    var l = Ee;
    return ((Ee <<= 1), (Ee & 4194048) === 0 && (Ee = 256), l);
  }
  function ii() {
    var l = Ae;
    return ((Ae <<= 1), (Ae & 62914560) === 0 && (Ae = 4194304), l);
  }
  function Gn(l) {
    for (var t = [], u = 0; 31 > u; u++) t.push(l);
    return t;
  }
  function Ea(l, t) {
    ((l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function rs(l, t, u, a, e, n) {
    var f = l.pendingLanes;
    ((l.pendingLanes = u),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= u),
      (l.entangledLanes &= u),
      (l.errorRecoveryDisabledLanes &= u),
      (l.shellSuspendCounter = 0));
    var c = l.entanglements,
      i = l.expirationTimes,
      h = l.hiddenUpdates;
    for (u = f & ~u; 0 < u;) {
      var g = 31 - Wl(u),
        T = 1 << g;
      ((c[g] = 0), (i[g] = -1));
      var o = h[g];
      if (o !== null)
        for (h[g] = null, g = 0; g < o.length; g++) {
          var m = o[g];
          m !== null && (m.lane &= -536870913);
        }
      u &= ~T;
    }
    (a !== 0 && si(l, a, 0),
      n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~t)));
  }
  function si(l, t, u) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var a = 31 - Wl(t);
    ((l.entangledLanes |= t),
      (l.entanglements[a] = l.entanglements[a] | 1073741824 | (u & 4194090)));
  }
  function vi(l, t) {
    var u = (l.entangledLanes |= t);
    for (l = l.entanglements; u;) {
      var a = 31 - Wl(u),
        e = 1 << a;
      ((e & t) | (l[a] & t) && (l[a] |= t), (u &= ~e));
    }
  }
  function Xn(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Qn(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function di() {
    var l = O.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : L1(l.type));
  }
  function gs(l, t) {
    var u = O.p;
    try {
      return ((O.p = l), t());
    } finally {
      O.p = u;
    }
  }
  var Zt = Math.random().toString(36).slice(2),
    Hl = "__reactFiber$" + Zt,
    jl = "__reactProps$" + Zt,
    Cu = "__reactContainer$" + Zt,
    Zn = "__reactEvents$" + Zt,
    Ss = "__reactListeners$" + Zt,
    bs = "__reactHandles$" + Zt,
    yi = "__reactResources$" + Zt,
    Aa = "__reactMarker$" + Zt;
  function Vn(l) {
    (delete l[Hl], delete l[jl], delete l[Zn], delete l[Ss], delete l[bs]);
  }
  function qu(l) {
    var t = l[Hl];
    if (t) return t;
    for (var u = l.parentNode; u;) {
      if ((t = u[Cu] || u[Hl])) {
        if (
          ((u = t.alternate),
          t.child !== null || (u !== null && u.child !== null))
        )
          for (l = R1(l); l !== null;) {
            if ((u = l[Hl])) return u;
            l = R1(l);
          }
        return t;
      }
      ((l = u), (u = l.parentNode));
    }
    return null;
  }
  function Yu(l) {
    if ((l = l[Hl] || l[Cu])) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function za(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(r(33));
  }
  function xu(l) {
    var t = l[yi];
    return (
      t ||
        (t = l[yi] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Tl(l) {
    l[Aa] = !0;
  }
  var hi = new Set(),
    oi = {};
  function mu(l, t) {
    (Bu(l, t), Bu(l + "Capture", t));
  }
  function Bu(l, t) {
    for (oi[l] = t, l = 0; l < t.length; l++) hi.add(t[l]);
  }
  var Ts = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    mi = {},
    ri = {};
  function Es(l) {
    return xn.call(ri, l)
      ? !0
      : xn.call(mi, l)
        ? !1
        : Ts.test(l)
          ? (ri[l] = !0)
          : ((mi[l] = !0), !1);
  }
  function Oe(l, t, u) {
    if (Es(t))
      if (u === null) l.removeAttribute(t);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + u);
      }
  }
  function Me(l, t, u) {
    if (u === null) l.removeAttribute(t);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + u);
    }
  }
  function Mt(l, t, u, a) {
    if (a === null) l.removeAttribute(u);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(t, u, "" + a);
    }
  }
  var Ln, gi;
  function ju(l) {
    if (Ln === void 0)
      try {
        throw Error();
      } catch (u) {
        var t = u.stack.trim().match(/\n( *(at )?)/);
        ((Ln = (t && t[1]) || ""),
          (gi =
            -1 <
            u.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < u.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Ln +
      l +
      gi
    );
  }
  var Kn = !1;
  function Jn(l, t) {
    if (!l || Kn) return "";
    Kn = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var T = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(T.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(T, []);
                } catch (m) {
                  var o = m;
                }
                Reflect.construct(l, [], T);
              } else {
                try {
                  T.call();
                } catch (m) {
                  o = m;
                }
                l.call(T.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (m) {
                o = m;
              }
              (T = l()) &&
                typeof T.catch == "function" &&
                T.catch(function () {});
            }
          } catch (m) {
            if (m && o && typeof m.stack == "string") return [m.stack, o.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var e = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      e &&
        e.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = a.DetermineComponentFrameRoot(),
        f = n[0],
        c = n[1];
      if (f && c) {
        var i = f.split(`
`),
          h = c.split(`
`);
        for (
          e = a = 0;
          a < i.length && !i[a].includes("DetermineComponentFrameRoot");
        )
          a++;
        for (; e < h.length && !h[e].includes("DetermineComponentFrameRoot");)
          e++;
        if (a === i.length || e === h.length)
          for (
            a = i.length - 1, e = h.length - 1;
            1 <= a && 0 <= e && i[a] !== h[e];
          )
            e--;
        for (; 1 <= a && 0 <= e; a--, e--)
          if (i[a] !== h[e]) {
            if (a !== 1 || e !== 1)
              do
                if ((a--, e--, 0 > e || i[a] !== h[e])) {
                  var g =
                    `
` + i[a].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      g.includes("<anonymous>") &&
                      (g = g.replace("<anonymous>", l.displayName)),
                    g
                  );
                }
              while (1 <= a && 0 <= e);
            break;
          }
      }
    } finally {
      ((Kn = !1), (Error.prepareStackTrace = u));
    }
    return (u = l ? l.displayName || l.name : "") ? ju(u) : "";
  }
  function As(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return ju(l.type);
      case 16:
        return ju("Lazy");
      case 13:
        return ju("Suspense");
      case 19:
        return ju("SuspenseList");
      case 0:
      case 15:
        return Jn(l.type, !1);
      case 11:
        return Jn(l.type.render, !1);
      case 1:
        return Jn(l.type, !0);
      case 31:
        return ju("Activity");
      default:
        return "";
    }
  }
  function Si(l) {
    try {
      var t = "";
      do ((t += As(l)), (l = l.return));
      while (l);
      return t;
    } catch (u) {
      return (
        `
Error generating stack: ` +
        u.message +
        `
` +
        u.stack
      );
    }
  }
  function ut(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function bi(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function zs(l) {
    var t = bi(l) ? "checked" : "value",
      u = Object.getOwnPropertyDescriptor(l.constructor.prototype, t),
      a = "" + l[t];
    if (
      !l.hasOwnProperty(t) &&
      typeof u < "u" &&
      typeof u.get == "function" &&
      typeof u.set == "function"
    ) {
      var e = u.get,
        n = u.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return e.call(this);
          },
          set: function (f) {
            ((a = "" + f), n.call(this, f));
          },
        }),
        Object.defineProperty(l, t, { enumerable: u.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (f) {
            a = "" + f;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function _e(l) {
    l._valueTracker || (l._valueTracker = zs(l));
  }
  function Ti(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var u = t.getValue(),
      a = "";
    return (
      l && (a = bi(l) ? (l.checked ? "true" : "false") : l.value),
      (l = a),
      l !== u ? (t.setValue(l), !0) : !1
    );
  }
  function De(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Os = /[\n"\\]/g;
  function at(l) {
    return l.replace(Os, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function wn(l, t, u, a, e, n, f, c) {
    ((l.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (l.type = f)
        : l.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + ut(t))
          : l.value !== "" + ut(t) && (l.value = "" + ut(t))
        : (f !== "submit" && f !== "reset") || l.removeAttribute("value"),
      t != null
        ? Wn(l, f, ut(t))
        : u != null
          ? Wn(l, f, ut(u))
          : a != null && l.removeAttribute("value"),
      e == null && n != null && (l.defaultChecked = !!n),
      e != null &&
        (l.checked = e && typeof e != "function" && typeof e != "symbol"),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.name = "" + ut(c))
        : l.removeAttribute("name"));
  }
  function Ei(l, t, u, a, e, n, f, c) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || u != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) return;
      ((u = u != null ? "" + ut(u) : ""),
        (t = t != null ? "" + ut(t) : u),
        c || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((a = a ?? e),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (l.checked = c ? l.checked : !!a),
      (l.defaultChecked = !!a),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (l.name = f));
  }
  function Wn(l, t, u) {
    (t === "number" && De(l.ownerDocument) === l) ||
      l.defaultValue === "" + u ||
      (l.defaultValue = "" + u);
  }
  function Gu(l, t, u, a) {
    if (((l = l.options), t)) {
      t = {};
      for (var e = 0; e < u.length; e++) t["$" + u[e]] = !0;
      for (u = 0; u < l.length; u++)
        ((e = t.hasOwnProperty("$" + l[u].value)),
          l[u].selected !== e && (l[u].selected = e),
          e && a && (l[u].defaultSelected = !0));
    } else {
      for (u = "" + ut(u), t = null, e = 0; e < l.length; e++) {
        if (l[e].value === u) {
          ((l[e].selected = !0), a && (l[e].defaultSelected = !0));
          return;
        }
        t !== null || l[e].disabled || (t = l[e]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Ai(l, t, u) {
    if (
      t != null &&
      ((t = "" + ut(t)), t !== l.value && (l.value = t), u == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = u != null ? "" + ut(u) : "";
  }
  function zi(l, t, u, a) {
    if (t == null) {
      if (a != null) {
        if (u != null) throw Error(r(92));
        if (Nl(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        u = a;
      }
      (u == null && (u = ""), (t = u));
    }
    ((u = ut(t)),
      (l.defaultValue = u),
      (a = l.textContent),
      a === u && a !== "" && a !== null && (l.value = a));
  }
  function Xu(l, t) {
    if (t) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var Ms = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Oi(l, t, u) {
    var a = t.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === ""
      ? a
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : a
        ? l.setProperty(t, u)
        : typeof u != "number" || u === 0 || Ms.has(t)
          ? t === "float"
            ? (l.cssFloat = u)
            : (l[t] = ("" + u).trim())
          : (l[t] = u + "px");
  }
  function Mi(l, t, u) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((l = l.style), u != null)) {
      for (var a in u)
        !u.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? l.setProperty(a, "")
            : a === "float"
              ? (l.cssFloat = "")
              : (l[a] = ""));
      for (var e in t)
        ((a = t[e]), t.hasOwnProperty(e) && u[e] !== a && Oi(l, e, a));
    } else for (var n in t) t.hasOwnProperty(n) && Oi(l, n, t[n]);
  }
  function $n(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var _s = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Ds =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ue(l) {
    return Ds.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  var kn = null;
  function Fn(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var Qu = null,
    Zu = null;
  function _i(l) {
    var t = Yu(l);
    if (t && (l = t.stateNode)) {
      var u = l[jl] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (wn(
              l,
              u.value,
              u.defaultValue,
              u.defaultValue,
              u.checked,
              u.defaultChecked,
              u.type,
              u.name,
            ),
            (t = u.name),
            u.type === "radio" && t != null)
          ) {
            for (u = l; u.parentNode;) u = u.parentNode;
            for (
              u = u.querySelectorAll(
                'input[name="' + at("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < u.length;
              t++
            ) {
              var a = u[t];
              if (a !== l && a.form === l.form) {
                var e = a[jl] || null;
                if (!e) throw Error(r(90));
                wn(
                  a,
                  e.value,
                  e.defaultValue,
                  e.defaultValue,
                  e.checked,
                  e.defaultChecked,
                  e.type,
                  e.name,
                );
              }
            }
            for (t = 0; t < u.length; t++)
              ((a = u[t]), a.form === l.form && Ti(a));
          }
          break l;
        case "textarea":
          Ai(l, u.value, u.defaultValue);
          break l;
        case "select":
          ((t = u.value), t != null && Gu(l, !!u.multiple, t, !1));
      }
    }
  }
  var In = !1;
  function Di(l, t, u) {
    if (In) return l(t, u);
    In = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (
        ((In = !1),
        (Qu !== null || Zu !== null) &&
          (on(), Qu && ((t = Qu), (l = Zu), (Zu = Qu = null), _i(t), l)))
      )
        for (t = 0; t < l.length; t++) _i(l[t]);
    }
  }
  function Oa(l, t) {
    var u = l.stateNode;
    if (u === null) return null;
    var a = u[jl] || null;
    if (a === null) return null;
    u = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((l = l.type),
          (a = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !a));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function") throw Error(r(231, t, typeof u));
    return u;
  }
  var _t = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Pn = !1;
  if (_t)
    try {
      var Ma = {};
      (Object.defineProperty(Ma, "passive", {
        get: function () {
          Pn = !0;
        },
      }),
        window.addEventListener("test", Ma, Ma),
        window.removeEventListener("test", Ma, Ma));
    } catch {
      Pn = !1;
    }
  var Vt = null,
    lf = null,
    Re = null;
  function Ui() {
    if (Re) return Re;
    var l,
      t = lf,
      u = t.length,
      a,
      e = "value" in Vt ? Vt.value : Vt.textContent,
      n = e.length;
    for (l = 0; l < u && t[l] === e[l]; l++);
    var f = u - l;
    for (a = 1; a <= f && t[u - a] === e[n - a]; a++);
    return (Re = e.slice(l, 1 < a ? 1 - a : void 0));
  }
  function Ne(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function He() {
    return !0;
  }
  function Ri() {
    return !1;
  }
  function Gl(l) {
    function t(u, a, e, n, f) {
      ((this._reactName = u),
        (this._targetInst = e),
        (this.type = a),
        (this.nativeEvent = n),
        (this.target = f),
        (this.currentTarget = null));
      for (var c in l)
        l.hasOwnProperty(c) && ((u = l[c]), (this[c] = u ? u(n) : n[c]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? He
          : Ri),
        (this.isPropagationStopped = Ri),
        this
      );
    }
    return (
      U(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var u = this.nativeEvent;
          u &&
            (u.preventDefault
              ? u.preventDefault()
              : typeof u.returnValue != "unknown" && (u.returnValue = !1),
            (this.isDefaultPrevented = He));
        },
        stopPropagation: function () {
          var u = this.nativeEvent;
          u &&
            (u.stopPropagation
              ? u.stopPropagation()
              : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0),
            (this.isPropagationStopped = He));
        },
        persist: function () {},
        isPersistent: He,
      }),
      t
    );
  }
  var ru = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    pe = Gl(ru),
    _a = U({}, ru, { view: 0, detail: 0 }),
    Us = Gl(_a),
    tf,
    uf,
    Da,
    Ce = U({}, _a, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ef,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Da &&
              (Da && l.type === "mousemove"
                ? ((tf = l.screenX - Da.screenX), (uf = l.screenY - Da.screenY))
                : (uf = tf = 0),
              (Da = l)),
            tf);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : uf;
      },
    }),
    Ni = Gl(Ce),
    Rs = U({}, Ce, { dataTransfer: 0 }),
    Ns = Gl(Rs),
    Hs = U({}, _a, { relatedTarget: 0 }),
    af = Gl(Hs),
    ps = U({}, ru, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Cs = Gl(ps),
    qs = U({}, ru, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    Ys = Gl(qs),
    xs = U({}, ru, { data: 0 }),
    Hi = Gl(xs),
    Bs = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    js = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Gs = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Xs(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = Gs[l])
        ? !!t[l]
        : !1;
  }
  function ef() {
    return Xs;
  }
  var Qs = U({}, _a, {
      key: function (l) {
        if (l.key) {
          var t = Bs[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Ne(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? js[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ef,
      charCode: function (l) {
        return l.type === "keypress" ? Ne(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? Ne(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    Zs = Gl(Qs),
    Vs = U({}, Ce, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    pi = Gl(Vs),
    Ls = U({}, _a, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ef,
    }),
    Ks = Gl(Ls),
    Js = U({}, ru, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ws = Gl(Js),
    Ws = U({}, Ce, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    $s = Gl(Ws),
    ks = U({}, ru, { newState: 0, oldState: 0 }),
    Fs = Gl(ks),
    Is = [9, 13, 27, 32],
    nf = _t && "CompositionEvent" in window,
    Ua = null;
  _t && "documentMode" in document && (Ua = document.documentMode);
  var Ps = _t && "TextEvent" in window && !Ua,
    Ci = _t && (!nf || (Ua && 8 < Ua && 11 >= Ua)),
    qi = " ",
    Yi = !1;
  function xi(l, t) {
    switch (l) {
      case "keyup":
        return Is.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Bi(l) {
    return (
      (l = l.detail),
      typeof l == "object" && "data" in l ? l.data : null
    );
  }
  var Vu = !1;
  function l3(l, t) {
    switch (l) {
      case "compositionend":
        return Bi(t);
      case "keypress":
        return t.which !== 32 ? null : ((Yi = !0), qi);
      case "textInput":
        return ((l = t.data), l === qi && Yi ? null : l);
      default:
        return null;
    }
  }
  function t3(l, t) {
    if (Vu)
      return l === "compositionend" || (!nf && xi(l, t))
        ? ((l = Ui()), (Re = lf = Vt = null), (Vu = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ci && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var u3 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ji(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!u3[l.type] : t === "textarea";
  }
  function Gi(l, t, u, a) {
    (Qu ? (Zu ? Zu.push(a) : (Zu = [a])) : (Qu = a),
      (t = Tn(t, "onChange")),
      0 < t.length &&
        ((u = new pe("onChange", "change", null, u, a)),
        l.push({ event: u, listeners: t })));
  }
  var Ra = null,
    Na = null;
  function a3(l) {
    b1(l, 0);
  }
  function qe(l) {
    var t = za(l);
    if (Ti(t)) return l;
  }
  function Xi(l, t) {
    if (l === "change") return t;
  }
  var Qi = !1;
  if (_t) {
    var ff;
    if (_t) {
      var cf = "oninput" in document;
      if (!cf) {
        var Zi = document.createElement("div");
        (Zi.setAttribute("oninput", "return;"),
          (cf = typeof Zi.oninput == "function"));
      }
      ff = cf;
    } else ff = !1;
    Qi = ff && (!document.documentMode || 9 < document.documentMode);
  }
  function Vi() {
    Ra && (Ra.detachEvent("onpropertychange", Li), (Na = Ra = null));
  }
  function Li(l) {
    if (l.propertyName === "value" && qe(Na)) {
      var t = [];
      (Gi(t, Na, l, Fn(l)), Di(a3, t));
    }
  }
  function e3(l, t, u) {
    l === "focusin"
      ? (Vi(), (Ra = t), (Na = u), Ra.attachEvent("onpropertychange", Li))
      : l === "focusout" && Vi();
  }
  function n3(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return qe(Na);
  }
  function f3(l, t) {
    if (l === "click") return qe(t);
  }
  function c3(l, t) {
    if (l === "input" || l === "change") return qe(t);
  }
  function i3(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var $l = typeof Object.is == "function" ? Object.is : i3;
  function Ha(l, t) {
    if ($l(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var u = Object.keys(l),
      a = Object.keys(t);
    if (u.length !== a.length) return !1;
    for (a = 0; a < u.length; a++) {
      var e = u[a];
      if (!xn.call(t, e) || !$l(l[e], t[e])) return !1;
    }
    return !0;
  }
  function Ki(l) {
    for (; l && l.firstChild;) l = l.firstChild;
    return l;
  }
  function Ji(l, t) {
    var u = Ki(l);
    l = 0;
    for (var a; u;) {
      if (u.nodeType === 3) {
        if (((a = l + u.textContent.length), l <= t && a >= t))
          return { node: u, offset: t - l };
        l = a;
      }
      l: {
        for (; u;) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break l;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Ki(u);
    }
  }
  function wi(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? wi(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Wi(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = De(l.document); t instanceof l.HTMLIFrameElement;) {
      try {
        var u = typeof t.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = t.contentWindow;
      else break;
      t = De(l.document);
    }
    return t;
  }
  function sf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var s3 = _t && "documentMode" in document && 11 >= document.documentMode,
    Lu = null,
    vf = null,
    pa = null,
    df = !1;
  function $i(l, t, u) {
    var a =
      u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    df ||
      Lu == null ||
      Lu !== De(a) ||
      ((a = Lu),
      "selectionStart" in a && sf(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (pa && Ha(pa, a)) ||
        ((pa = a),
        (a = Tn(vf, "onSelect")),
        0 < a.length &&
          ((t = new pe("onSelect", "select", null, t, u)),
          l.push({ event: t, listeners: a }),
          (t.target = Lu))));
  }
  function gu(l, t) {
    var u = {};
    return (
      (u[l.toLowerCase()] = t.toLowerCase()),
      (u["Webkit" + l] = "webkit" + t),
      (u["Moz" + l] = "moz" + t),
      u
    );
  }
  var Ku = {
      animationend: gu("Animation", "AnimationEnd"),
      animationiteration: gu("Animation", "AnimationIteration"),
      animationstart: gu("Animation", "AnimationStart"),
      transitionrun: gu("Transition", "TransitionRun"),
      transitionstart: gu("Transition", "TransitionStart"),
      transitioncancel: gu("Transition", "TransitionCancel"),
      transitionend: gu("Transition", "TransitionEnd"),
    },
    yf = {},
    ki = {};
  _t &&
    ((ki = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ku.animationend.animation,
      delete Ku.animationiteration.animation,
      delete Ku.animationstart.animation),
    "TransitionEvent" in window || delete Ku.transitionend.transition);
  function Su(l) {
    if (yf[l]) return yf[l];
    if (!Ku[l]) return l;
    var t = Ku[l],
      u;
    for (u in t) if (t.hasOwnProperty(u) && u in ki) return (yf[l] = t[u]);
    return l;
  }
  var Fi = Su("animationend"),
    Ii = Su("animationiteration"),
    Pi = Su("animationstart"),
    v3 = Su("transitionrun"),
    d3 = Su("transitionstart"),
    y3 = Su("transitioncancel"),
    l0 = Su("transitionend"),
    t0 = new Map(),
    hf =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  hf.push("scrollEnd");
  function ht(l, t) {
    (t0.set(l, t), mu(t, [l]));
  }
  var u0 = new WeakMap();
  function et(l, t) {
    if (typeof l == "object" && l !== null) {
      var u = u0.get(l);
      return u !== void 0
        ? u
        : ((t = { value: l, source: t, stack: Si(t) }), u0.set(l, t), t);
    }
    return { value: l, source: t, stack: Si(t) };
  }
  var nt = [],
    Ju = 0,
    of = 0;
  function Ye() {
    for (var l = Ju, t = (of = Ju = 0); t < l;) {
      var u = nt[t];
      nt[t++] = null;
      var a = nt[t];
      nt[t++] = null;
      var e = nt[t];
      nt[t++] = null;
      var n = nt[t];
      if (((nt[t++] = null), a !== null && e !== null)) {
        var f = a.pending;
        (f === null ? (e.next = e) : ((e.next = f.next), (f.next = e)),
          (a.pending = e));
      }
      n !== 0 && a0(u, e, n);
    }
  }
  function xe(l, t, u, a) {
    ((nt[Ju++] = l),
      (nt[Ju++] = t),
      (nt[Ju++] = u),
      (nt[Ju++] = a),
      (of |= a),
      (l.lanes |= a),
      (l = l.alternate),
      l !== null && (l.lanes |= a));
  }
  function mf(l, t, u, a) {
    return (xe(l, t, u, a), Be(l));
  }
  function wu(l, t) {
    return (xe(l, null, null, t), Be(l));
  }
  function a0(l, t, u) {
    l.lanes |= u;
    var a = l.alternate;
    a !== null && (a.lanes |= u);
    for (var e = !1, n = l.return; n !== null;)
      ((n.childLanes |= u),
        (a = n.alternate),
        a !== null && (a.childLanes |= u),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (e = !0)),
        (l = n),
        (n = n.return));
    return l.tag === 3
      ? ((n = l.stateNode),
        e &&
          t !== null &&
          ((e = 31 - Wl(u)),
          (l = n.hiddenUpdates),
          (a = l[e]),
          a === null ? (l[e] = [t]) : a.push(t),
          (t.lane = u | 536870912)),
        n)
      : null;
  }
  function Be(l) {
    if (50 < ae) throw ((ae = 0), (Ec = null), Error(r(185)));
    for (var t = l.return; t !== null;) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var Wu = {};
  function h3(l, t, u, a) {
    ((this.tag = l),
      (this.key = u),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function kl(l, t, u, a) {
    return new h3(l, t, u, a);
  }
  function rf(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function Dt(l, t) {
    var u = l.alternate;
    return (
      u === null
        ? ((u = kl(l.tag, t, l.key, l.mode)),
          (u.elementType = l.elementType),
          (u.type = l.type),
          (u.stateNode = l.stateNode),
          (u.alternate = l),
          (l.alternate = u))
        : ((u.pendingProps = t),
          (u.type = l.type),
          (u.flags = 0),
          (u.subtreeFlags = 0),
          (u.deletions = null)),
      (u.flags = l.flags & 65011712),
      (u.childLanes = l.childLanes),
      (u.lanes = l.lanes),
      (u.child = l.child),
      (u.memoizedProps = l.memoizedProps),
      (u.memoizedState = l.memoizedState),
      (u.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (u.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (u.sibling = l.sibling),
      (u.index = l.index),
      (u.ref = l.ref),
      (u.refCleanup = l.refCleanup),
      u
    );
  }
  function e0(l, t) {
    l.flags &= 65011714;
    var u = l.alternate;
    return (
      u === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = u.childLanes),
          (l.lanes = u.lanes),
          (l.child = u.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = u.memoizedProps),
          (l.memoizedState = u.memoizedState),
          (l.updateQueue = u.updateQueue),
          (l.type = u.type),
          (t = u.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function je(l, t, u, a, e, n) {
    var f = 0;
    if (((a = l), typeof l == "function")) rf(l) && (f = 1);
    else if (typeof l == "string")
      f = mv(l, u, p.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (l) {
        case rt:
          return (
            (l = kl(31, u, t, e)),
            (l.elementType = rt),
            (l.lanes = n),
            l
          );
        case Yl:
          return bu(u.children, e, n, t);
        case dt:
          ((f = 8), (e |= 24));
          break;
        case Bl:
          return (
            (l = kl(12, u, t, e | 2)),
            (l.elementType = Bl),
            (l.lanes = n),
            l
          );
        case w:
          return ((l = kl(13, u, t, e)), (l.elementType = w), (l.lanes = n), l);
        case Vl:
          return (
            (l = kl(19, u, t, e)),
            (l.elementType = Vl),
            (l.lanes = n),
            l
          );
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case du:
              case Ul:
                f = 10;
                break l;
              case zt:
                f = 9;
                break l;
              case yt:
                f = 11;
                break l;
              case Ll:
                f = 14;
                break l;
              case Kl:
                ((f = 16), (a = null));
                break l;
            }
          ((f = 29),
            (u = Error(r(130, l === null ? "null" : typeof l, ""))),
            (a = null));
      }
    return (
      (t = kl(f, u, t, e)),
      (t.elementType = l),
      (t.type = a),
      (t.lanes = n),
      t
    );
  }
  function bu(l, t, u, a) {
    return ((l = kl(7, l, a, t)), (l.lanes = u), l);
  }
  function gf(l, t, u) {
    return ((l = kl(6, l, null, t)), (l.lanes = u), l);
  }
  function Sf(l, t, u) {
    return (
      (t = kl(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = u),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var $u = [],
    ku = 0,
    Ge = null,
    Xe = 0,
    ft = [],
    ct = 0,
    Tu = null,
    Ut = 1,
    Rt = "";
  function Eu(l, t) {
    (($u[ku++] = Xe), ($u[ku++] = Ge), (Ge = l), (Xe = t));
  }
  function n0(l, t, u) {
    ((ft[ct++] = Ut), (ft[ct++] = Rt), (ft[ct++] = Tu), (Tu = l));
    var a = Ut;
    l = Rt;
    var e = 32 - Wl(a) - 1;
    ((a &= ~(1 << e)), (u += 1));
    var n = 32 - Wl(t) + e;
    if (30 < n) {
      var f = e - (e % 5);
      ((n = (a & ((1 << f) - 1)).toString(32)),
        (a >>= f),
        (e -= f),
        (Ut = (1 << (32 - Wl(t) + e)) | (u << e) | a),
        (Rt = n + l));
    } else ((Ut = (1 << n) | (u << e) | a), (Rt = l));
  }
  function bf(l) {
    l.return !== null && (Eu(l, 1), n0(l, 1, 0));
  }
  function Tf(l) {
    for (; l === Ge;)
      ((Ge = $u[--ku]), ($u[ku] = null), (Xe = $u[--ku]), ($u[ku] = null));
    for (; l === Tu;)
      ((Tu = ft[--ct]),
        (ft[ct] = null),
        (Rt = ft[--ct]),
        (ft[ct] = null),
        (Ut = ft[--ct]),
        (ft[ct] = null));
  }
  var xl = null,
    yl = null,
    k = !1,
    Au = null,
    St = !1,
    Ef = Error(r(519));
  function zu(l) {
    var t = Error(r(418, ""));
    throw (Ya(et(t, l)), Ef);
  }
  function f0(l) {
    var t = l.stateNode,
      u = l.type,
      a = l.memoizedProps;
    switch (((t[Hl] = l), (t[jl] = a), u)) {
      case "dialog":
        (V("cancel", t), V("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        V("load", t);
        break;
      case "video":
      case "audio":
        for (u = 0; u < ne.length; u++) V(ne[u], t);
        break;
      case "source":
        V("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (V("error", t), V("load", t));
        break;
      case "details":
        V("toggle", t);
        break;
      case "input":
        (V("invalid", t),
          Ei(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ),
          _e(t));
        break;
      case "select":
        V("invalid", t);
        break;
      case "textarea":
        (V("invalid", t), zi(t, a.value, a.defaultValue, a.children), _e(t));
    }
    ((u = a.children),
      (typeof u != "string" && typeof u != "number" && typeof u != "bigint") ||
      t.textContent === "" + u ||
      a.suppressHydrationWarning === !0 ||
      z1(t.textContent, u)
        ? (a.popover != null && (V("beforetoggle", t), V("toggle", t)),
          a.onScroll != null && V("scroll", t),
          a.onScrollEnd != null && V("scrollend", t),
          a.onClick != null && (t.onclick = En),
          (t = !0))
        : (t = !1),
      t || zu(l));
  }
  function c0(l) {
    for (xl = l.return; xl;)
      switch (xl.tag) {
        case 5:
        case 13:
          St = !1;
          return;
        case 27:
        case 3:
          St = !0;
          return;
        default:
          xl = xl.return;
      }
  }
  function Ca(l) {
    if (l !== xl) return !1;
    if (!k) return (c0(l), (k = !0), !1);
    var t = l.tag,
      u;
    if (
      ((u = t !== 3 && t !== 27) &&
        ((u = t === 5) &&
          ((u = l.type),
          (u =
            !(u !== "form" && u !== "button") || Bc(l.type, l.memoizedProps))),
        (u = !u)),
      u && yl && zu(l),
      c0(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(r(317));
      l: {
        for (l = l.nextSibling, t = 0; l;) {
          if (l.nodeType === 8)
            if (((u = l.data), u === "/$")) {
              if (t === 0) {
                yl = mt(l.nextSibling);
                break l;
              }
              t--;
            } else (u !== "$" && u !== "$!" && u !== "$?") || t++;
          l = l.nextSibling;
        }
        yl = null;
      }
    } else
      t === 27
        ? ((t = yl), nu(l.type) ? ((l = Qc), (Qc = null), (yl = l)) : (yl = t))
        : (yl = xl ? mt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function qa() {
    ((yl = xl = null), (k = !1));
  }
  function i0() {
    var l = Au;
    return (
      l !== null &&
        (Zl === null ? (Zl = l) : Zl.push.apply(Zl, l), (Au = null)),
      l
    );
  }
  function Ya(l) {
    Au === null ? (Au = [l]) : Au.push(l);
  }
  var Af = A(null),
    Ou = null,
    Nt = null;
  function Lt(l, t, u) {
    (z(Af, t._currentValue), (t._currentValue = u));
  }
  function Ht(l) {
    ((l._currentValue = Af.current), M(Af));
  }
  function zf(l, t, u) {
    for (; l !== null;) {
      var a = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        l === u)
      )
        break;
      l = l.return;
    }
  }
  function Of(l, t, u, a) {
    var e = l.child;
    for (e !== null && (e.return = l); e !== null;) {
      var n = e.dependencies;
      if (n !== null) {
        var f = e.child;
        n = n.firstContext;
        l: for (; n !== null;) {
          var c = n;
          n = e;
          for (var i = 0; i < t.length; i++)
            if (c.context === t[i]) {
              ((n.lanes |= u),
                (c = n.alternate),
                c !== null && (c.lanes |= u),
                zf(n.return, u, l),
                a || (f = null));
              break l;
            }
          n = c.next;
        }
      } else if (e.tag === 18) {
        if (((f = e.return), f === null)) throw Error(r(341));
        ((f.lanes |= u),
          (n = f.alternate),
          n !== null && (n.lanes |= u),
          zf(f, u, l),
          (f = null));
      } else f = e.child;
      if (f !== null) f.return = e;
      else
        for (f = e; f !== null;) {
          if (f === l) {
            f = null;
            break;
          }
          if (((e = f.sibling), e !== null)) {
            ((e.return = f.return), (f = e));
            break;
          }
          f = f.return;
        }
      e = f;
    }
  }
  function xa(l, t, u, a) {
    l = null;
    for (var e = t, n = !1; e !== null;) {
      if (!n) {
        if ((e.flags & 524288) !== 0) n = !0;
        else if ((e.flags & 262144) !== 0) break;
      }
      if (e.tag === 10) {
        var f = e.alternate;
        if (f === null) throw Error(r(387));
        if (((f = f.memoizedProps), f !== null)) {
          var c = e.type;
          $l(e.pendingProps.value, f.value) ||
            (l !== null ? l.push(c) : (l = [c]));
        }
      } else if (e === Jl.current) {
        if (((f = e.alternate), f === null)) throw Error(r(387));
        f.memoizedState.memoizedState !== e.memoizedState.memoizedState &&
          (l !== null ? l.push(de) : (l = [de]));
      }
      e = e.return;
    }
    (l !== null && Of(t, l, u, a), (t.flags |= 262144));
  }
  function Qe(l) {
    for (l = l.firstContext; l !== null;) {
      if (!$l(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function Mu(l) {
    ((Ou = l),
      (Nt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null));
  }
  function pl(l) {
    return s0(Ou, l);
  }
  function Ze(l, t) {
    return (Ou === null && Mu(l), s0(l, t));
  }
  function s0(l, t) {
    var u = t._currentValue;
    if (((t = { context: t, memoizedValue: u, next: null }), Nt === null)) {
      if (l === null) throw Error(r(308));
      ((Nt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288));
    } else Nt = Nt.next = t;
    return u;
  }
  var o3 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (u, a) {
                  l.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (u) {
                  return u();
                }));
            };
          },
    m3 = _.unstable_scheduleCallback,
    r3 = _.unstable_NormalPriority,
    Sl = {
      $$typeof: Ul,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Mf() {
    return { controller: new o3(), data: new Map(), refCount: 0 };
  }
  function Ba(l) {
    (l.refCount--,
      l.refCount === 0 &&
        m3(r3, function () {
          l.controller.abort();
        }));
  }
  var ja = null,
    _f = 0,
    Fu = 0,
    Iu = null;
  function g3(l, t) {
    if (ja === null) {
      var u = (ja = []);
      ((_f = 0),
        (Fu = Uc()),
        (Iu = {
          status: "pending",
          value: void 0,
          then: function (a) {
            u.push(a);
          },
        }));
    }
    return (_f++, t.then(v0, v0), t);
  }
  function v0() {
    if (--_f === 0 && ja !== null) {
      Iu !== null && (Iu.status = "fulfilled");
      var l = ja;
      ((ja = null), (Fu = 0), (Iu = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function S3(l, t) {
    var u = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (e) {
          u.push(e);
        },
      };
    return (
      l.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var e = 0; e < u.length; e++) (0, u[e])(t);
        },
        function (e) {
          for (a.status = "rejected", a.reason = e, e = 0; e < u.length; e++)
            (0, u[e])(void 0);
        },
      ),
      a
    );
  }
  var d0 = S.S;
  S.S = function (l, t) {
    (typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      g3(l, t),
      d0 !== null && d0(l, t));
  };
  var _u = A(null);
  function Df() {
    var l = _u.current;
    return l !== null ? l : fl.pooledCache;
  }
  function Ve(l, t) {
    t === null ? z(_u, _u.current) : z(_u, t.pool);
  }
  function y0() {
    var l = Df();
    return l === null ? null : { parent: Sl._currentValue, pool: l };
  }
  var Ga = Error(r(460)),
    h0 = Error(r(474)),
    Le = Error(r(542)),
    Uf = { then: function () {} };
  function o0(l) {
    return ((l = l.status), l === "fulfilled" || l === "rejected");
  }
  function Ke() {}
  function m0(l, t, u) {
    switch (
      ((u = l[u]),
      u === void 0 ? l.push(t) : u !== t && (t.then(Ke, Ke), (t = u)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), g0(l), l);
      default:
        if (typeof t.status == "string") t.then(Ke, Ke);
        else {
          if (((l = fl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(r(482));
          ((l = t),
            (l.status = "pending"),
            l.then(
              function (a) {
                if (t.status === "pending") {
                  var e = t;
                  ((e.status = "fulfilled"), (e.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var e = t;
                  ((e.status = "rejected"), (e.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), g0(l), l);
        }
        throw ((Xa = t), Ga);
    }
  }
  var Xa = null;
  function r0() {
    if (Xa === null) throw Error(r(459));
    var l = Xa;
    return ((Xa = null), l);
  }
  function g0(l) {
    if (l === Ga || l === Le) throw Error(r(483));
  }
  var Kt = !1;
  function Rf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Nf(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function Jt(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function wt(l, t, u) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (F & 2) !== 0)) {
      var e = a.pending;
      return (
        e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
        (a.pending = t),
        (t = Be(l)),
        a0(l, null, u),
        t
      );
    }
    return (xe(l, a, t, u), Be(l));
  }
  function Qa(l, t, u) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (u & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (u |= a), (t.lanes = u), vi(l, u));
    }
  }
  function Hf(l, t) {
    var u = l.updateQueue,
      a = l.alternate;
    if (a !== null && ((a = a.updateQueue), u === a)) {
      var e = null,
        n = null;
      if (((u = u.firstBaseUpdate), u !== null)) {
        do {
          var f = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null,
          };
          (n === null ? (e = n = f) : (n = n.next = f), (u = u.next));
        } while (u !== null);
        n === null ? (e = n = t) : (n = n.next = t);
      } else e = n = t;
      ((u = {
        baseState: a.baseState,
        firstBaseUpdate: e,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (l.updateQueue = u));
      return;
    }
    ((l = u.lastBaseUpdate),
      l === null ? (u.firstBaseUpdate = t) : (l.next = t),
      (u.lastBaseUpdate = t));
  }
  var pf = !1;
  function Za() {
    if (pf) {
      var l = Iu;
      if (l !== null) throw l;
    }
  }
  function Va(l, t, u, a) {
    pf = !1;
    var e = l.updateQueue;
    Kt = !1;
    var n = e.firstBaseUpdate,
      f = e.lastBaseUpdate,
      c = e.shared.pending;
    if (c !== null) {
      e.shared.pending = null;
      var i = c,
        h = i.next;
      ((i.next = null), f === null ? (n = h) : (f.next = h), (f = i));
      var g = l.alternate;
      g !== null &&
        ((g = g.updateQueue),
        (c = g.lastBaseUpdate),
        c !== f &&
          (c === null ? (g.firstBaseUpdate = h) : (c.next = h),
          (g.lastBaseUpdate = i)));
    }
    if (n !== null) {
      var T = e.baseState;
      ((f = 0), (g = h = i = null), (c = n));
      do {
        var o = c.lane & -536870913,
          m = o !== c.lane;
        if (m ? (L & o) === o : (a & o) === o) {
          (o !== 0 && o === Fu && (pf = !0),
            g !== null &&
              (g = g.next =
                {
                  lane: 0,
                  tag: c.tag,
                  payload: c.payload,
                  callback: null,
                  next: null,
                }));
          l: {
            var x = l,
              C = c;
            o = t;
            var tl = u;
            switch (C.tag) {
              case 1:
                if (((x = C.payload), typeof x == "function")) {
                  T = x.call(tl, T, o);
                  break l;
                }
                T = x;
                break l;
              case 3:
                x.flags = (x.flags & -65537) | 128;
              case 0:
                if (
                  ((x = C.payload),
                  (o = typeof x == "function" ? x.call(tl, T, o) : x),
                  o == null)
                )
                  break l;
                T = U({}, T, o);
                break l;
              case 2:
                Kt = !0;
            }
          }
          ((o = c.callback),
            o !== null &&
              ((l.flags |= 64),
              m && (l.flags |= 8192),
              (m = e.callbacks),
              m === null ? (e.callbacks = [o]) : m.push(o)));
        } else
          ((m = {
            lane: o,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null,
          }),
            g === null ? ((h = g = m), (i = T)) : (g = g.next = m),
            (f |= o));
        if (((c = c.next), c === null)) {
          if (((c = e.shared.pending), c === null)) break;
          ((m = c),
            (c = m.next),
            (m.next = null),
            (e.lastBaseUpdate = m),
            (e.shared.pending = null));
        }
      } while (!0);
      (g === null && (i = T),
        (e.baseState = i),
        (e.firstBaseUpdate = h),
        (e.lastBaseUpdate = g),
        n === null && (e.shared.lanes = 0),
        (tu |= f),
        (l.lanes = f),
        (l.memoizedState = T));
    }
  }
  function S0(l, t) {
    if (typeof l != "function") throw Error(r(191, l));
    l.call(t);
  }
  function b0(l, t) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++) S0(u[l], t);
  }
  var Pu = A(null),
    Je = A(0);
  function T0(l, t) {
    ((l = jt), z(Je, l), z(Pu, t), (jt = l | t.baseLanes));
  }
  function Cf() {
    (z(Je, jt), z(Pu, Pu.current));
  }
  function qf() {
    ((jt = Je.current), M(Pu), M(Je));
  }
  var Wt = 0,
    X = null,
    P = null,
    rl = null,
    we = !1,
    la = !1,
    Du = !1,
    We = 0,
    La = 0,
    ta = null,
    b3 = 0;
  function ol() {
    throw Error(r(321));
  }
  function Yf(l, t) {
    if (t === null) return !1;
    for (var u = 0; u < t.length && u < l.length; u++)
      if (!$l(l[u], t[u])) return !1;
    return !0;
  }
  function xf(l, t, u, a, e, n) {
    return (
      (Wt = n),
      (X = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (S.H = l === null || l.memoizedState === null ? a2 : e2),
      (Du = !1),
      (n = u(a, e)),
      (Du = !1),
      la && (n = A0(t, u, a, e)),
      E0(l),
      n
    );
  }
  function E0(l) {
    S.H = ln;
    var t = P !== null && P.next !== null;
    if (((Wt = 0), (rl = P = X = null), (we = !1), (La = 0), (ta = null), t))
      throw Error(r(300));
    l === null ||
      El ||
      ((l = l.dependencies), l !== null && Qe(l) && (El = !0));
  }
  function A0(l, t, u, a) {
    X = l;
    var e = 0;
    do {
      if ((la && (ta = null), (La = 0), (la = !1), 25 <= e))
        throw Error(r(301));
      if (((e += 1), (rl = P = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((S.H = _3), (n = t(u, a)));
    } while (la);
    return n;
  }
  function T3() {
    var l = S.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? Ka(t) : t),
      (l = l.useState()[0]),
      (P !== null ? P.memoizedState : null) !== l && (X.flags |= 1024),
      t
    );
  }
  function Bf() {
    var l = We !== 0;
    return ((We = 0), l);
  }
  function jf(l, t, u) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~u));
  }
  function Gf(l) {
    if (we) {
      for (l = l.memoizedState; l !== null;) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      we = !1;
    }
    ((Wt = 0), (rl = P = X = null), (la = !1), (La = We = 0), (ta = null));
  }
  function Xl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (rl === null ? (X.memoizedState = rl = l) : (rl = rl.next = l), rl);
  }
  function gl() {
    if (P === null) {
      var l = X.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = P.next;
    var t = rl === null ? X.memoizedState : rl.next;
    if (t !== null) ((rl = t), (P = l));
    else {
      if (l === null)
        throw X.alternate === null ? Error(r(467)) : Error(r(310));
      ((P = l),
        (l = {
          memoizedState: P.memoizedState,
          baseState: P.baseState,
          baseQueue: P.baseQueue,
          queue: P.queue,
          next: null,
        }),
        rl === null ? (X.memoizedState = rl = l) : (rl = rl.next = l));
    }
    return rl;
  }
  function Xf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ka(l) {
    var t = La;
    return (
      (La += 1),
      ta === null && (ta = []),
      (l = m0(ta, l, t)),
      (t = X),
      (rl === null ? t.memoizedState : rl.next) === null &&
        ((t = t.alternate),
        (S.H = t === null || t.memoizedState === null ? a2 : e2)),
      l
    );
  }
  function $e(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Ka(l);
      if (l.$$typeof === Ul) return pl(l);
    }
    throw Error(r(438, String(l)));
  }
  function Qf(l) {
    var t = null,
      u = X.updateQueue;
    if ((u !== null && (t = u.memoCache), t == null)) {
      var a = X.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (e) {
                return e.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      u === null && ((u = Xf()), (X.updateQueue = u)),
      (u.memoCache = t),
      (u = t.data[t.index]),
      u === void 0)
    )
      for (u = t.data[t.index] = Array(l), a = 0; a < l; a++) u[a] = pu;
    return (t.index++, u);
  }
  function pt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function ke(l) {
    var t = gl();
    return Zf(t, P, l);
  }
  function Zf(l, t, u) {
    var a = l.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = u;
    var e = l.baseQueue,
      n = a.pending;
    if (n !== null) {
      if (e !== null) {
        var f = e.next;
        ((e.next = n.next), (n.next = f));
      }
      ((t.baseQueue = e = n), (a.pending = null));
    }
    if (((n = l.baseState), e === null)) l.memoizedState = n;
    else {
      t = e.next;
      var c = (f = null),
        i = null,
        h = t,
        g = !1;
      do {
        var T = h.lane & -536870913;
        if (T !== h.lane ? (L & T) === T : (Wt & T) === T) {
          var o = h.revertLane;
          if (o === 0)
            (i !== null &&
              (i = i.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: h.action,
                  hasEagerState: h.hasEagerState,
                  eagerState: h.eagerState,
                  next: null,
                }),
              T === Fu && (g = !0));
          else if ((Wt & o) === o) {
            ((h = h.next), o === Fu && (g = !0));
            continue;
          } else
            ((T = {
              lane: 0,
              revertLane: h.revertLane,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null,
            }),
              i === null ? ((c = i = T), (f = n)) : (i = i.next = T),
              (X.lanes |= o),
              (tu |= o));
          ((T = h.action),
            Du && u(n, T),
            (n = h.hasEagerState ? h.eagerState : u(n, T)));
        } else
          ((o = {
            lane: T,
            revertLane: h.revertLane,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null,
          }),
            i === null ? ((c = i = o), (f = n)) : (i = i.next = o),
            (X.lanes |= T),
            (tu |= T));
        h = h.next;
      } while (h !== null && h !== t);
      if (
        (i === null ? (f = n) : (i.next = c),
        !$l(n, l.memoizedState) && ((El = !0), g && ((u = Iu), u !== null)))
      )
        throw u;
      ((l.memoizedState = n),
        (l.baseState = f),
        (l.baseQueue = i),
        (a.lastRenderedState = n));
    }
    return (e === null && (a.lanes = 0), [l.memoizedState, a.dispatch]);
  }
  function Vf(l) {
    var t = gl(),
      u = t.queue;
    if (u === null) throw Error(r(311));
    u.lastRenderedReducer = l;
    var a = u.dispatch,
      e = u.pending,
      n = t.memoizedState;
    if (e !== null) {
      u.pending = null;
      var f = (e = e.next);
      do ((n = l(n, f.action)), (f = f.next));
      while (f !== e);
      ($l(n, t.memoizedState) || (El = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (u.lastRenderedState = n));
    }
    return [n, a];
  }
  function z0(l, t, u) {
    var a = X,
      e = gl(),
      n = k;
    if (n) {
      if (u === void 0) throw Error(r(407));
      u = u();
    } else u = t();
    var f = !$l((P || e).memoizedState, u);
    (f && ((e.memoizedState = u), (El = !0)), (e = e.queue));
    var c = _0.bind(null, a, e, l);
    if (
      (Ja(2048, 8, c, [l]),
      e.getSnapshot !== t || f || (rl !== null && rl.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ua(9, Fe(), M0.bind(null, a, e, u, t), null),
        fl === null)
      )
        throw Error(r(349));
      n || (Wt & 124) !== 0 || O0(a, t, u);
    }
    return u;
  }
  function O0(l, t, u) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: u }),
      (t = X.updateQueue),
      t === null
        ? ((t = Xf()), (X.updateQueue = t), (t.stores = [l]))
        : ((u = t.stores), u === null ? (t.stores = [l]) : u.push(l)));
  }
  function M0(l, t, u, a) {
    ((t.value = u), (t.getSnapshot = a), D0(t) && U0(l));
  }
  function _0(l, t, u) {
    return u(function () {
      D0(t) && U0(l);
    });
  }
  function D0(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var u = t();
      return !$l(l, u);
    } catch {
      return !0;
    }
  }
  function U0(l) {
    var t = wu(l, 2);
    t !== null && tt(t, l, 2);
  }
  function Lf(l) {
    var t = Xl();
    if (typeof l == "function") {
      var u = l;
      if (((l = u()), Du)) {
        Qt(!0);
        try {
          u();
        } finally {
          Qt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function R0(l, t, u, a) {
    return ((l.baseState = u), Zf(l, P, typeof a == "function" ? a : pt));
  }
  function E3(l, t, u, a, e) {
    if (Pe(l)) throw Error(r(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: e,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          n.listeners.push(f);
        },
      };
      (S.T !== null ? u(!0) : (n.isTransition = !1),
        a(n),
        (u = t.pending),
        u === null
          ? ((n.next = t.pending = n), N0(t, n))
          : ((n.next = u.next), (t.pending = u.next = n)));
    }
  }
  function N0(l, t) {
    var u = t.action,
      a = t.payload,
      e = l.state;
    if (t.isTransition) {
      var n = S.T,
        f = {};
      S.T = f;
      try {
        var c = u(e, a),
          i = S.S;
        (i !== null && i(f, c), H0(l, t, c));
      } catch (h) {
        Kf(l, t, h);
      } finally {
        S.T = n;
      }
    } else
      try {
        ((n = u(e, a)), H0(l, t, n));
      } catch (h) {
        Kf(l, t, h);
      }
  }
  function H0(l, t, u) {
    u !== null && typeof u == "object" && typeof u.then == "function"
      ? u.then(
          function (a) {
            p0(l, t, a);
          },
          function (a) {
            return Kf(l, t, a);
          },
        )
      : p0(l, t, u);
  }
  function p0(l, t, u) {
    ((t.status = "fulfilled"),
      (t.value = u),
      C0(t),
      (l.state = u),
      (t = l.pending),
      t !== null &&
        ((u = t.next),
        u === t ? (l.pending = null) : ((u = u.next), (t.next = u), N0(l, u))));
  }
  function Kf(l, t, u) {
    var a = l.pending;
    if (((l.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = u), C0(t), (t = t.next));
      while (t !== a);
    }
    l.action = null;
  }
  function C0(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function q0(l, t) {
    return t;
  }
  function Y0(l, t) {
    if (k) {
      var u = fl.formState;
      if (u !== null) {
        l: {
          var a = X;
          if (k) {
            if (yl) {
              t: {
                for (var e = yl, n = St; e.nodeType !== 8;) {
                  if (!n) {
                    e = null;
                    break t;
                  }
                  if (((e = mt(e.nextSibling)), e === null)) {
                    e = null;
                    break t;
                  }
                }
                ((n = e.data), (e = n === "F!" || n === "F" ? e : null));
              }
              if (e) {
                ((yl = mt(e.nextSibling)), (a = e.data === "F!"));
                break l;
              }
            }
            zu(a);
          }
          a = !1;
        }
        a && (t = u[0]);
      }
    }
    return (
      (u = Xl()),
      (u.memoizedState = u.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: q0,
        lastRenderedState: t,
      }),
      (u.queue = a),
      (u = l2.bind(null, X, a)),
      (a.dispatch = u),
      (a = Lf(!1)),
      (n = kf.bind(null, X, !1, a.queue)),
      (a = Xl()),
      (e = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = e),
      (u = E3.bind(null, X, e, n, u)),
      (e.dispatch = u),
      (a.memoizedState = l),
      [t, u, !1]
    );
  }
  function x0(l) {
    var t = gl();
    return B0(t, P, l);
  }
  function B0(l, t, u) {
    if (
      ((t = Zf(l, t, q0)[0]),
      (l = ke(pt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = Ka(t);
      } catch (f) {
        throw f === Ga ? Le : f;
      }
    else a = t;
    t = gl();
    var e = t.queue,
      n = e.dispatch;
    return (
      u !== t.memoizedState &&
        ((X.flags |= 2048), ua(9, Fe(), A3.bind(null, e, u), null)),
      [a, n, l]
    );
  }
  function A3(l, t) {
    l.action = t;
  }
  function j0(l) {
    var t = gl(),
      u = P;
    if (u !== null) return B0(t, u, l);
    (gl(), (t = t.memoizedState), (u = gl()));
    var a = u.queue.dispatch;
    return ((u.memoizedState = l), [t, a, !1]);
  }
  function ua(l, t, u, a) {
    return (
      (l = { tag: l, create: u, deps: a, inst: t, next: null }),
      (t = X.updateQueue),
      t === null && ((t = Xf()), (X.updateQueue = t)),
      (u = t.lastEffect),
      u === null
        ? (t.lastEffect = l.next = l)
        : ((a = u.next), (u.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function Fe() {
    return { destroy: void 0, resource: void 0 };
  }
  function G0() {
    return gl().memoizedState;
  }
  function Ie(l, t, u, a) {
    var e = Xl();
    ((a = a === void 0 ? null : a),
      (X.flags |= l),
      (e.memoizedState = ua(1 | t, Fe(), u, a)));
  }
  function Ja(l, t, u, a) {
    var e = gl();
    a = a === void 0 ? null : a;
    var n = e.memoizedState.inst;
    P !== null && a !== null && Yf(a, P.memoizedState.deps)
      ? (e.memoizedState = ua(t, n, u, a))
      : ((X.flags |= l), (e.memoizedState = ua(1 | t, n, u, a)));
  }
  function X0(l, t) {
    Ie(8390656, 8, l, t);
  }
  function Q0(l, t) {
    Ja(2048, 8, l, t);
  }
  function Z0(l, t) {
    return Ja(4, 2, l, t);
  }
  function V0(l, t) {
    return Ja(4, 4, l, t);
  }
  function L0(l, t) {
    if (typeof t == "function") {
      l = l();
      var u = t(l);
      return function () {
        typeof u == "function" ? u() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function K0(l, t, u) {
    ((u = u != null ? u.concat([l]) : null), Ja(4, 4, L0.bind(null, t, l), u));
  }
  function Jf() {}
  function J0(l, t) {
    var u = gl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    return t !== null && Yf(t, a[1]) ? a[0] : ((u.memoizedState = [l, t]), l);
  }
  function w0(l, t) {
    var u = gl();
    t = t === void 0 ? null : t;
    var a = u.memoizedState;
    if (t !== null && Yf(t, a[1])) return a[0];
    if (((a = l()), Du)) {
      Qt(!0);
      try {
        l();
      } finally {
        Qt(!1);
      }
    }
    return ((u.memoizedState = [a, t]), a);
  }
  function wf(l, t, u) {
    return u === void 0 || (Wt & 1073741824) !== 0
      ? (l.memoizedState = t)
      : ((l.memoizedState = u), (l = k2()), (X.lanes |= l), (tu |= l), u);
  }
  function W0(l, t, u, a) {
    return $l(u, t)
      ? u
      : Pu.current !== null
        ? ((l = wf(l, u, a)), $l(l, t) || (El = !0), l)
        : (Wt & 42) === 0
          ? ((El = !0), (l.memoizedState = u))
          : ((l = k2()), (X.lanes |= l), (tu |= l), t);
  }
  function $0(l, t, u, a, e) {
    var n = O.p;
    O.p = n !== 0 && 8 > n ? n : 8;
    var f = S.T,
      c = {};
    ((S.T = c), kf(l, !1, t, u));
    try {
      var i = e(),
        h = S.S;
      if (
        (h !== null && h(c, i),
        i !== null && typeof i == "object" && typeof i.then == "function")
      ) {
        var g = S3(i, a);
        wa(l, t, g, lt(l));
      } else wa(l, t, a, lt(l));
    } catch (T) {
      wa(l, t, { then: function () {}, status: "rejected", reason: T }, lt());
    } finally {
      ((O.p = n), (S.T = f));
    }
  }
  function z3() {}
  function Wf(l, t, u, a) {
    if (l.tag !== 5) throw Error(r(476));
    var e = k0(l).queue;
    $0(
      l,
      e,
      t,
      Y,
      u === null
        ? z3
        : function () {
            return (F0(l), u(a));
          },
    );
  }
  function k0(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pt,
        lastRenderedState: Y,
      },
      next: null,
    };
    var u = {};
    return (
      (t.next = {
        memoizedState: u,
        baseState: u,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: pt,
          lastRenderedState: u,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function F0(l) {
    var t = k0(l).next.queue;
    wa(l, t, {}, lt());
  }
  function $f() {
    return pl(de);
  }
  function I0() {
    return gl().memoizedState;
  }
  function P0() {
    return gl().memoizedState;
  }
  function O3(l) {
    for (var t = l.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var u = lt();
          l = Jt(u);
          var a = wt(t, l, u);
          (a !== null && (tt(a, t, u), Qa(a, t, u)),
            (t = { cache: Mf() }),
            (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function M3(l, t, u) {
    var a = lt();
    ((u = {
      lane: a,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Pe(l)
        ? t2(t, u)
        : ((u = mf(l, t, u, a)), u !== null && (tt(u, l, a), u2(u, t, a))));
  }
  function l2(l, t, u) {
    var a = lt();
    wa(l, t, u, a);
  }
  function wa(l, t, u, a) {
    var e = {
      lane: a,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Pe(l)) t2(t, e);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var f = t.lastRenderedState,
            c = n(f, u);
          if (((e.hasEagerState = !0), (e.eagerState = c), $l(c, f)))
            return (xe(l, t, e, 0), fl === null && Ye(), !1);
        } catch {
        } finally {
        }
      if (((u = mf(l, t, e, a)), u !== null))
        return (tt(u, l, a), u2(u, t, a), !0);
    }
    return !1;
  }
  function kf(l, t, u, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Uc(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Pe(l))
    ) {
      if (t) throw Error(r(479));
    } else ((t = mf(l, u, a, 2)), t !== null && tt(t, l, 2));
  }
  function Pe(l) {
    var t = l.alternate;
    return l === X || (t !== null && t === X);
  }
  function t2(l, t) {
    la = we = !0;
    var u = l.pending;
    (u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
      (l.pending = t));
  }
  function u2(l, t, u) {
    if ((u & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (u |= a), (t.lanes = u), vi(l, u));
    }
  }
  var ln = {
      readContext: pl,
      use: $e,
      useCallback: ol,
      useContext: ol,
      useEffect: ol,
      useImperativeHandle: ol,
      useLayoutEffect: ol,
      useInsertionEffect: ol,
      useMemo: ol,
      useReducer: ol,
      useRef: ol,
      useState: ol,
      useDebugValue: ol,
      useDeferredValue: ol,
      useTransition: ol,
      useSyncExternalStore: ol,
      useId: ol,
      useHostTransitionStatus: ol,
      useFormState: ol,
      useActionState: ol,
      useOptimistic: ol,
      useMemoCache: ol,
      useCacheRefresh: ol,
    },
    a2 = {
      readContext: pl,
      use: $e,
      useCallback: function (l, t) {
        return ((Xl().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: pl,
      useEffect: X0,
      useImperativeHandle: function (l, t, u) {
        ((u = u != null ? u.concat([l]) : null),
          Ie(4194308, 4, L0.bind(null, t, l), u));
      },
      useLayoutEffect: function (l, t) {
        return Ie(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        Ie(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var u = Xl();
        t = t === void 0 ? null : t;
        var a = l();
        if (Du) {
          Qt(!0);
          try {
            l();
          } finally {
            Qt(!1);
          }
        }
        return ((u.memoizedState = [a, t]), a);
      },
      useReducer: function (l, t, u) {
        var a = Xl();
        if (u !== void 0) {
          var e = u(t);
          if (Du) {
            Qt(!0);
            try {
              u(t);
            } finally {
              Qt(!1);
            }
          }
        } else e = t;
        return (
          (a.memoizedState = a.baseState = e),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: e,
          }),
          (a.queue = l),
          (l = l.dispatch = M3.bind(null, X, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = Xl();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = Lf(l);
        var t = l.queue,
          u = l2.bind(null, X, t);
        return ((t.dispatch = u), [l.memoizedState, u]);
      },
      useDebugValue: Jf,
      useDeferredValue: function (l, t) {
        var u = Xl();
        return wf(u, l, t);
      },
      useTransition: function () {
        var l = Lf(!1);
        return (
          (l = $0.bind(null, X, l.queue, !0, !1)),
          (Xl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, u) {
        var a = X,
          e = Xl();
        if (k) {
          if (u === void 0) throw Error(r(407));
          u = u();
        } else {
          if (((u = t()), fl === null)) throw Error(r(349));
          (L & 124) !== 0 || O0(a, t, u);
        }
        e.memoizedState = u;
        var n = { value: u, getSnapshot: t };
        return (
          (e.queue = n),
          X0(_0.bind(null, a, n, l), [l]),
          (a.flags |= 2048),
          ua(9, Fe(), M0.bind(null, a, n, u, t), null),
          u
        );
      },
      useId: function () {
        var l = Xl(),
          t = fl.identifierPrefix;
        if (k) {
          var u = Rt,
            a = Ut;
          ((u = (a & ~(1 << (32 - Wl(a) - 1))).toString(32) + u),
            (t = "«" + t + "R" + u),
            (u = We++),
            0 < u && (t += "H" + u.toString(32)),
            (t += "»"));
        } else ((u = b3++), (t = "«" + t + "r" + u.toString(32) + "»"));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: $f,
      useFormState: Y0,
      useActionState: Y0,
      useOptimistic: function (l) {
        var t = Xl();
        t.memoizedState = t.baseState = l;
        var u = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = u),
          (t = kf.bind(null, X, !0, u)),
          (u.dispatch = t),
          [l, t]
        );
      },
      useMemoCache: Qf,
      useCacheRefresh: function () {
        return (Xl().memoizedState = O3.bind(null, X));
      },
    },
    e2 = {
      readContext: pl,
      use: $e,
      useCallback: J0,
      useContext: pl,
      useEffect: Q0,
      useImperativeHandle: K0,
      useInsertionEffect: Z0,
      useLayoutEffect: V0,
      useMemo: w0,
      useReducer: ke,
      useRef: G0,
      useState: function () {
        return ke(pt);
      },
      useDebugValue: Jf,
      useDeferredValue: function (l, t) {
        var u = gl();
        return W0(u, P.memoizedState, l, t);
      },
      useTransition: function () {
        var l = ke(pt)[0],
          t = gl().memoizedState;
        return [typeof l == "boolean" ? l : Ka(l), t];
      },
      useSyncExternalStore: z0,
      useId: I0,
      useHostTransitionStatus: $f,
      useFormState: x0,
      useActionState: x0,
      useOptimistic: function (l, t) {
        var u = gl();
        return R0(u, P, l, t);
      },
      useMemoCache: Qf,
      useCacheRefresh: P0,
    },
    _3 = {
      readContext: pl,
      use: $e,
      useCallback: J0,
      useContext: pl,
      useEffect: Q0,
      useImperativeHandle: K0,
      useInsertionEffect: Z0,
      useLayoutEffect: V0,
      useMemo: w0,
      useReducer: Vf,
      useRef: G0,
      useState: function () {
        return Vf(pt);
      },
      useDebugValue: Jf,
      useDeferredValue: function (l, t) {
        var u = gl();
        return P === null ? wf(u, l, t) : W0(u, P.memoizedState, l, t);
      },
      useTransition: function () {
        var l = Vf(pt)[0],
          t = gl().memoizedState;
        return [typeof l == "boolean" ? l : Ka(l), t];
      },
      useSyncExternalStore: z0,
      useId: I0,
      useHostTransitionStatus: $f,
      useFormState: j0,
      useActionState: j0,
      useOptimistic: function (l, t) {
        var u = gl();
        return P !== null
          ? R0(u, P, l, t)
          : ((u.baseState = l), [l, u.queue.dispatch]);
      },
      useMemoCache: Qf,
      useCacheRefresh: P0,
    },
    aa = null,
    Wa = 0;
  function tn(l) {
    var t = Wa;
    return ((Wa += 1), aa === null && (aa = []), m0(aa, l, t));
  }
  function $a(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function un(l, t) {
    throw t.$$typeof === ul
      ? Error(r(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l,
          ),
        ));
  }
  function n2(l) {
    var t = l._init;
    return t(l._payload);
  }
  function f2(l) {
    function t(d, v) {
      if (l) {
        var y = d.deletions;
        y === null ? ((d.deletions = [v]), (d.flags |= 16)) : y.push(v);
      }
    }
    function u(d, v) {
      if (!l) return null;
      for (; v !== null;) (t(d, v), (v = v.sibling));
      return null;
    }
    function a(d) {
      for (var v = new Map(); d !== null;)
        (d.key !== null ? v.set(d.key, d) : v.set(d.index, d), (d = d.sibling));
      return v;
    }
    function e(d, v) {
      return ((d = Dt(d, v)), (d.index = 0), (d.sibling = null), d);
    }
    function n(d, v, y) {
      return (
        (d.index = y),
        l
          ? ((y = d.alternate),
            y !== null
              ? ((y = y.index), y < v ? ((d.flags |= 67108866), v) : y)
              : ((d.flags |= 67108866), v))
          : ((d.flags |= 1048576), v)
      );
    }
    function f(d) {
      return (l && d.alternate === null && (d.flags |= 67108866), d);
    }
    function c(d, v, y, b) {
      return v === null || v.tag !== 6
        ? ((v = gf(y, d.mode, b)), (v.return = d), v)
        : ((v = e(v, y)), (v.return = d), v);
    }
    function i(d, v, y, b) {
      var D = y.type;
      return D === Yl
        ? g(d, v, y.props.children, b, y.key)
        : v !== null &&
            (v.elementType === D ||
              (typeof D == "object" &&
                D !== null &&
                D.$$typeof === Kl &&
                n2(D) === v.type))
          ? ((v = e(v, y.props)), $a(v, y), (v.return = d), v)
          : ((v = je(y.type, y.key, y.props, null, d.mode, b)),
            $a(v, y),
            (v.return = d),
            v);
    }
    function h(d, v, y, b) {
      return v === null ||
        v.tag !== 4 ||
        v.stateNode.containerInfo !== y.containerInfo ||
        v.stateNode.implementation !== y.implementation
        ? ((v = Sf(y, d.mode, b)), (v.return = d), v)
        : ((v = e(v, y.children || [])), (v.return = d), v);
    }
    function g(d, v, y, b, D) {
      return v === null || v.tag !== 7
        ? ((v = bu(y, d.mode, b, D)), (v.return = d), v)
        : ((v = e(v, y)), (v.return = d), v);
    }
    function T(d, v, y) {
      if (
        (typeof v == "string" && v !== "") ||
        typeof v == "number" ||
        typeof v == "bigint"
      )
        return ((v = gf("" + v, d.mode, y)), (v.return = d), v);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case nl:
            return (
              (y = je(v.type, v.key, v.props, null, d.mode, y)),
              $a(y, v),
              (y.return = d),
              y
            );
          case ql:
            return ((v = Sf(v, d.mode, y)), (v.return = d), v);
          case Kl:
            var b = v._init;
            return ((v = b(v._payload)), T(d, v, y));
        }
        if (Nl(v) || Rl(v))
          return ((v = bu(v, d.mode, y, null)), (v.return = d), v);
        if (typeof v.then == "function") return T(d, tn(v), y);
        if (v.$$typeof === Ul) return T(d, Ze(d, v), y);
        un(d, v);
      }
      return null;
    }
    function o(d, v, y, b) {
      var D = v !== null ? v.key : null;
      if (
        (typeof y == "string" && y !== "") ||
        typeof y == "number" ||
        typeof y == "bigint"
      )
        return D !== null ? null : c(d, v, "" + y, b);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case nl:
            return y.key === D ? i(d, v, y, b) : null;
          case ql:
            return y.key === D ? h(d, v, y, b) : null;
          case Kl:
            return ((D = y._init), (y = D(y._payload)), o(d, v, y, b));
        }
        if (Nl(y) || Rl(y)) return D !== null ? null : g(d, v, y, b, null);
        if (typeof y.then == "function") return o(d, v, tn(y), b);
        if (y.$$typeof === Ul) return o(d, v, Ze(d, y), b);
        un(d, y);
      }
      return null;
    }
    function m(d, v, y, b, D) {
      if (
        (typeof b == "string" && b !== "") ||
        typeof b == "number" ||
        typeof b == "bigint"
      )
        return ((d = d.get(y) || null), c(v, d, "" + b, D));
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case nl:
            return (
              (d = d.get(b.key === null ? y : b.key) || null),
              i(v, d, b, D)
            );
          case ql:
            return (
              (d = d.get(b.key === null ? y : b.key) || null),
              h(v, d, b, D)
            );
          case Kl:
            var Q = b._init;
            return ((b = Q(b._payload)), m(d, v, y, b, D));
        }
        if (Nl(b) || Rl(b))
          return ((d = d.get(y) || null), g(v, d, b, D, null));
        if (typeof b.then == "function") return m(d, v, y, tn(b), D);
        if (b.$$typeof === Ul) return m(d, v, y, Ze(v, b), D);
        un(v, b);
      }
      return null;
    }
    function x(d, v, y, b) {
      for (
        var D = null, Q = null, N = v, q = (v = 0), zl = null;
        N !== null && q < y.length;
        q++
      ) {
        N.index > q ? ((zl = N), (N = null)) : (zl = N.sibling);
        var $ = o(d, N, y[q], b);
        if ($ === null) {
          N === null && (N = zl);
          break;
        }
        (l && N && $.alternate === null && t(d, N),
          (v = n($, v, q)),
          Q === null ? (D = $) : (Q.sibling = $),
          (Q = $),
          (N = zl));
      }
      if (q === y.length) return (u(d, N), k && Eu(d, q), D);
      if (N === null) {
        for (; q < y.length; q++)
          ((N = T(d, y[q], b)),
            N !== null &&
              ((v = n(N, v, q)),
              Q === null ? (D = N) : (Q.sibling = N),
              (Q = N)));
        return (k && Eu(d, q), D);
      }
      for (N = a(N); q < y.length; q++)
        ((zl = m(N, d, q, y[q], b)),
          zl !== null &&
            (l &&
              zl.alternate !== null &&
              N.delete(zl.key === null ? q : zl.key),
            (v = n(zl, v, q)),
            Q === null ? (D = zl) : (Q.sibling = zl),
            (Q = zl)));
      return (
        l &&
          N.forEach(function (vu) {
            return t(d, vu);
          }),
        k && Eu(d, q),
        D
      );
    }
    function C(d, v, y, b) {
      if (y == null) throw Error(r(151));
      for (
        var D = null, Q = null, N = v, q = (v = 0), zl = null, $ = y.next();
        N !== null && !$.done;
        q++, $ = y.next()
      ) {
        N.index > q ? ((zl = N), (N = null)) : (zl = N.sibling);
        var vu = o(d, N, $.value, b);
        if (vu === null) {
          N === null && (N = zl);
          break;
        }
        (l && N && vu.alternate === null && t(d, N),
          (v = n(vu, v, q)),
          Q === null ? (D = vu) : (Q.sibling = vu),
          (Q = vu),
          (N = zl));
      }
      if ($.done) return (u(d, N), k && Eu(d, q), D);
      if (N === null) {
        for (; !$.done; q++, $ = y.next())
          (($ = T(d, $.value, b)),
            $ !== null &&
              ((v = n($, v, q)),
              Q === null ? (D = $) : (Q.sibling = $),
              (Q = $)));
        return (k && Eu(d, q), D);
      }
      for (N = a(N); !$.done; q++, $ = y.next())
        (($ = m(N, d, q, $.value, b)),
          $ !== null &&
            (l && $.alternate !== null && N.delete($.key === null ? q : $.key),
            (v = n($, v, q)),
            Q === null ? (D = $) : (Q.sibling = $),
            (Q = $)));
      return (
        l &&
          N.forEach(function (Dv) {
            return t(d, Dv);
          }),
        k && Eu(d, q),
        D
      );
    }
    function tl(d, v, y, b) {
      if (
        (typeof y == "object" &&
          y !== null &&
          y.type === Yl &&
          y.key === null &&
          (y = y.props.children),
        typeof y == "object" && y !== null)
      ) {
        switch (y.$$typeof) {
          case nl:
            l: {
              for (var D = y.key; v !== null;) {
                if (v.key === D) {
                  if (((D = y.type), D === Yl)) {
                    if (v.tag === 7) {
                      (u(d, v.sibling),
                        (b = e(v, y.props.children)),
                        (b.return = d),
                        (d = b));
                      break l;
                    }
                  } else if (
                    v.elementType === D ||
                    (typeof D == "object" &&
                      D !== null &&
                      D.$$typeof === Kl &&
                      n2(D) === v.type)
                  ) {
                    (u(d, v.sibling),
                      (b = e(v, y.props)),
                      $a(b, y),
                      (b.return = d),
                      (d = b));
                    break l;
                  }
                  u(d, v);
                  break;
                } else t(d, v);
                v = v.sibling;
              }
              y.type === Yl
                ? ((b = bu(y.props.children, d.mode, b, y.key)),
                  (b.return = d),
                  (d = b))
                : ((b = je(y.type, y.key, y.props, null, d.mode, b)),
                  $a(b, y),
                  (b.return = d),
                  (d = b));
            }
            return f(d);
          case ql:
            l: {
              for (D = y.key; v !== null;) {
                if (v.key === D)
                  if (
                    v.tag === 4 &&
                    v.stateNode.containerInfo === y.containerInfo &&
                    v.stateNode.implementation === y.implementation
                  ) {
                    (u(d, v.sibling),
                      (b = e(v, y.children || [])),
                      (b.return = d),
                      (d = b));
                    break l;
                  } else {
                    u(d, v);
                    break;
                  }
                else t(d, v);
                v = v.sibling;
              }
              ((b = Sf(y, d.mode, b)), (b.return = d), (d = b));
            }
            return f(d);
          case Kl:
            return ((D = y._init), (y = D(y._payload)), tl(d, v, y, b));
        }
        if (Nl(y)) return x(d, v, y, b);
        if (Rl(y)) {
          if (((D = Rl(y)), typeof D != "function")) throw Error(r(150));
          return ((y = D.call(y)), C(d, v, y, b));
        }
        if (typeof y.then == "function") return tl(d, v, tn(y), b);
        if (y.$$typeof === Ul) return tl(d, v, Ze(d, y), b);
        un(d, y);
      }
      return (typeof y == "string" && y !== "") ||
        typeof y == "number" ||
        typeof y == "bigint"
        ? ((y = "" + y),
          v !== null && v.tag === 6
            ? (u(d, v.sibling), (b = e(v, y)), (b.return = d), (d = b))
            : (u(d, v), (b = gf(y, d.mode, b)), (b.return = d), (d = b)),
          f(d))
        : u(d, v);
    }
    return function (d, v, y, b) {
      try {
        Wa = 0;
        var D = tl(d, v, y, b);
        return ((aa = null), D);
      } catch (N) {
        if (N === Ga || N === Le) throw N;
        var Q = kl(29, N, null, d.mode);
        return ((Q.lanes = b), (Q.return = d), Q);
      } finally {
      }
    };
  }
  var ea = f2(!0),
    c2 = f2(!1),
    it = A(null),
    bt = null;
  function $t(l) {
    var t = l.alternate;
    (z(bl, bl.current & 1),
      z(it, l),
      bt === null &&
        (t === null || Pu.current !== null || t.memoizedState !== null) &&
        (bt = l));
  }
  function i2(l) {
    if (l.tag === 22) {
      if ((z(bl, bl.current), z(it, l), bt === null)) {
        var t = l.alternate;
        t !== null && t.memoizedState !== null && (bt = l);
      }
    } else kt();
  }
  function kt() {
    (z(bl, bl.current), z(it, it.current));
  }
  function Ct(l) {
    (M(it), bt === l && (bt = null), M(bl));
  }
  var bl = A(0);
  function an(l) {
    for (var t = l; t !== null;) {
      if (t.tag === 13) {
        var u = t.memoizedState;
        if (
          u !== null &&
          ((u = u.dehydrated), u === null || u.data === "$?" || Xc(u))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  function Ff(l, t, u, a) {
    ((t = l.memoizedState),
      (u = u(a, t)),
      (u = u == null ? t : U({}, t, u)),
      (l.memoizedState = u),
      l.lanes === 0 && (l.updateQueue.baseState = u));
  }
  var If = {
    enqueueSetState: function (l, t, u) {
      l = l._reactInternals;
      var a = lt(),
        e = Jt(a);
      ((e.payload = t),
        u != null && (e.callback = u),
        (t = wt(l, e, a)),
        t !== null && (tt(t, l, a), Qa(t, l, a)));
    },
    enqueueReplaceState: function (l, t, u) {
      l = l._reactInternals;
      var a = lt(),
        e = Jt(a);
      ((e.tag = 1),
        (e.payload = t),
        u != null && (e.callback = u),
        (t = wt(l, e, a)),
        t !== null && (tt(t, l, a), Qa(t, l, a)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var u = lt(),
        a = Jt(u);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = wt(l, a, u)),
        t !== null && (tt(t, l, u), Qa(t, l, u)));
    },
  };
  function s2(l, t, u, a, e, n, f) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(a, n, f)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ha(u, a) || !Ha(e, n)
          : !0
    );
  }
  function v2(l, t, u, a) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(u, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(u, a),
      t.state !== l && If.enqueueReplaceState(t, t.state, null));
  }
  function Uu(l, t) {
    var u = t;
    if ("ref" in t) {
      u = {};
      for (var a in t) a !== "ref" && (u[a] = t[a]);
    }
    if ((l = l.defaultProps)) {
      u === t && (u = U({}, u));
      for (var e in l) u[e] === void 0 && (u[e] = l[e]);
    }
    return u;
  }
  var en =
    typeof reportError == "function"
      ? reportError
      : function (l) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof l == "object" &&
                l !== null &&
                typeof l.message == "string"
                  ? String(l.message)
                  : String(l),
              error: l,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", l);
            return;
          }
          console.error(l);
        };
  function d2(l) {
    en(l);
  }
  function y2(l) {
    console.error(l);
  }
  function h2(l) {
    en(l);
  }
  function nn(l, t) {
    try {
      var u = l.onUncaughtError;
      u(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function o2(l, t, u) {
    try {
      var a = l.onCaughtError;
      a(u.value, {
        componentStack: u.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Pf(l, t, u) {
    return (
      (u = Jt(u)),
      (u.tag = 3),
      (u.payload = { element: null }),
      (u.callback = function () {
        nn(l, t);
      }),
      u
    );
  }
  function m2(l) {
    return ((l = Jt(l)), (l.tag = 3), l);
  }
  function r2(l, t, u, a) {
    var e = u.type.getDerivedStateFromError;
    if (typeof e == "function") {
      var n = a.value;
      ((l.payload = function () {
        return e(n);
      }),
        (l.callback = function () {
          o2(t, u, a);
        }));
    }
    var f = u.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (l.callback = function () {
        (o2(t, u, a),
          typeof e != "function" &&
            (uu === null ? (uu = new Set([this])) : uu.add(this)));
        var c = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: c !== null ? c : "",
        });
      });
  }
  function D3(l, t, u, a, e) {
    if (
      ((u.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = u.alternate),
        t !== null && xa(t, u, e, !0),
        (u = it.current),
        u !== null)
      ) {
        switch (u.tag) {
          case 13:
            return (
              bt === null ? zc() : u.alternate === null && hl === 0 && (hl = 3),
              (u.flags &= -257),
              (u.flags |= 65536),
              (u.lanes = e),
              a === Uf
                ? (u.flags |= 16384)
                : ((t = u.updateQueue),
                  t === null ? (u.updateQueue = new Set([a])) : t.add(a),
                  Mc(l, a, e)),
              !1
            );
          case 22:
            return (
              (u.flags |= 65536),
              a === Uf
                ? (u.flags |= 16384)
                : ((t = u.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (u.updateQueue = t))
                    : ((u = t.retryQueue),
                      u === null ? (t.retryQueue = new Set([a])) : u.add(a)),
                  Mc(l, a, e)),
              !1
            );
        }
        throw Error(r(435, u.tag));
      }
      return (Mc(l, a, e), zc(), !1);
    }
    if (k)
      return (
        (t = it.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = e),
            a !== Ef && ((l = Error(r(422), { cause: a })), Ya(et(l, u))))
          : (a !== Ef && ((t = Error(r(423), { cause: a })), Ya(et(t, u))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (e &= -e),
            (l.lanes |= e),
            (a = et(a, u)),
            (e = Pf(l.stateNode, a, e)),
            Hf(l, e),
            hl !== 4 && (hl = 2)),
        !1
      );
    var n = Error(r(520), { cause: a });
    if (
      ((n = et(n, u)),
      ue === null ? (ue = [n]) : ue.push(n),
      hl !== 4 && (hl = 2),
      t === null)
    )
      return !0;
    ((a = et(a, u)), (u = t));
    do {
      switch (u.tag) {
        case 3:
          return (
            (u.flags |= 65536),
            (l = e & -e),
            (u.lanes |= l),
            (l = Pf(u.stateNode, a, l)),
            Hf(u, l),
            !1
          );
        case 1:
          if (
            ((t = u.type),
            (n = u.stateNode),
            (u.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (uu === null || !uu.has(n)))))
          )
            return (
              (u.flags |= 65536),
              (e &= -e),
              (u.lanes |= e),
              (e = m2(e)),
              r2(e, l, u, a),
              Hf(u, e),
              !1
            );
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var g2 = Error(r(461)),
    El = !1;
  function Ml(l, t, u, a) {
    t.child = l === null ? c2(t, null, u, a) : ea(t, l.child, u, a);
  }
  function S2(l, t, u, a, e) {
    u = u.render;
    var n = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var c in a) c !== "ref" && (f[c] = a[c]);
    } else f = a;
    return (
      Mu(t),
      (a = xf(l, t, u, f, n, e)),
      (c = Bf()),
      l !== null && !El
        ? (jf(l, t, e), qt(l, t, e))
        : (k && c && bf(t), (t.flags |= 1), Ml(l, t, a, e), t.child)
    );
  }
  function b2(l, t, u, a, e) {
    if (l === null) {
      var n = u.type;
      return typeof n == "function" &&
        !rf(n) &&
        n.defaultProps === void 0 &&
        u.compare === null
        ? ((t.tag = 15), (t.type = n), T2(l, t, n, a, e))
        : ((l = je(u.type, null, a, t, t.mode, e)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !cc(l, e))) {
      var f = n.memoizedProps;
      if (
        ((u = u.compare), (u = u !== null ? u : Ha), u(f, a) && l.ref === t.ref)
      )
        return qt(l, t, e);
    }
    return (
      (t.flags |= 1),
      (l = Dt(n, a)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function T2(l, t, u, a, e) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ha(n, a) && l.ref === t.ref)
        if (((El = !1), (t.pendingProps = a = n), cc(l, e)))
          (l.flags & 131072) !== 0 && (El = !0);
        else return ((t.lanes = l.lanes), qt(l, t, e));
    }
    return lc(l, t, u, a, e);
  }
  function E2(l, t, u) {
    var a = t.pendingProps,
      e = a.children,
      n = l !== null ? l.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((a = n !== null ? n.baseLanes | u : u), l !== null)) {
          for (e = t.child = l.child, n = 0; e !== null;)
            ((n = n | e.lanes | e.childLanes), (e = e.sibling));
          t.childLanes = n & ~a;
        } else ((t.childLanes = 0), (t.child = null));
        return A2(l, t, a, u);
      }
      if ((u & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && Ve(t, n !== null ? n.cachePool : null),
          n !== null ? T0(t, n) : Cf(),
          i2(t));
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          A2(l, t, n !== null ? n.baseLanes | u : u, u)
        );
    } else
      n !== null
        ? (Ve(t, n.cachePool), T0(t, n), kt(), (t.memoizedState = null))
        : (l !== null && Ve(t, null), Cf(), kt());
    return (Ml(l, t, e, u), t.child);
  }
  function A2(l, t, u, a) {
    var e = Df();
    return (
      (e = e === null ? null : { parent: Sl._currentValue, pool: e }),
      (t.memoizedState = { baseLanes: u, cachePool: e }),
      l !== null && Ve(t, null),
      Cf(),
      i2(t),
      l !== null && xa(l, t, a, !0),
      null
    );
  }
  function fn(l, t) {
    var u = t.ref;
    if (u === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object") throw Error(r(284));
      (l === null || l.ref !== u) && (t.flags |= 4194816);
    }
  }
  function lc(l, t, u, a, e) {
    return (
      Mu(t),
      (u = xf(l, t, u, a, void 0, e)),
      (a = Bf()),
      l !== null && !El
        ? (jf(l, t, e), qt(l, t, e))
        : (k && a && bf(t), (t.flags |= 1), Ml(l, t, u, e), t.child)
    );
  }
  function z2(l, t, u, a, e, n) {
    return (
      Mu(t),
      (t.updateQueue = null),
      (u = A0(t, a, u, e)),
      E0(l),
      (a = Bf()),
      l !== null && !El
        ? (jf(l, t, n), qt(l, t, n))
        : (k && a && bf(t), (t.flags |= 1), Ml(l, t, u, n), t.child)
    );
  }
  function O2(l, t, u, a, e) {
    if ((Mu(t), t.stateNode === null)) {
      var n = Wu,
        f = u.contextType;
      (typeof f == "object" && f !== null && (n = pl(f)),
        (n = new u(a, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = If),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = a),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Rf(t),
        (f = u.contextType),
        (n.context = typeof f == "object" && f !== null ? pl(f) : Wu),
        (n.state = t.memoizedState),
        (f = u.getDerivedStateFromProps),
        typeof f == "function" && (Ff(t, u, f, a), (n.state = t.memoizedState)),
        typeof u.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((f = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          f !== n.state && If.enqueueReplaceState(n, n.state, null),
          Va(t, a, n, e),
          Za(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps,
        i = Uu(u, c);
      n.props = i;
      var h = n.context,
        g = u.contextType;
      ((f = Wu), typeof g == "object" && g !== null && (f = pl(g)));
      var T = u.getDerivedStateFromProps;
      ((g =
        typeof T == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (c = t.pendingProps !== c),
        g ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c || h !== f) && v2(t, n, a, f)),
        (Kt = !1));
      var o = t.memoizedState;
      ((n.state = o),
        Va(t, a, n, e),
        Za(),
        (h = t.memoizedState),
        c || o !== h || Kt
          ? (typeof T == "function" && (Ff(t, u, T, a), (h = t.memoizedState)),
            (i = Kt || s2(t, u, i, a, o, h, f))
              ? (g ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = h)),
            (n.props = a),
            (n.state = h),
            (n.context = f),
            (a = i))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((n = t.stateNode),
        Nf(l, t),
        (f = t.memoizedProps),
        (g = Uu(u, f)),
        (n.props = g),
        (T = t.pendingProps),
        (o = n.context),
        (h = u.contextType),
        (i = Wu),
        typeof h == "object" && h !== null && (i = pl(h)),
        (c = u.getDerivedStateFromProps),
        (h =
          typeof c == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((f !== T || o !== i) && v2(t, n, a, i)),
        (Kt = !1),
        (o = t.memoizedState),
        (n.state = o),
        Va(t, a, n, e),
        Za());
      var m = t.memoizedState;
      f !== T ||
      o !== m ||
      Kt ||
      (l !== null && l.dependencies !== null && Qe(l.dependencies))
        ? (typeof c == "function" && (Ff(t, u, c, a), (m = t.memoizedState)),
          (g =
            Kt ||
            s2(t, u, g, a, o, m, i) ||
            (l !== null && l.dependencies !== null && Qe(l.dependencies)))
            ? (h ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(a, m, i),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(a, m, i)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (f === l.memoizedProps && o === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (f === l.memoizedProps && o === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = m)),
          (n.props = a),
          (n.state = m),
          (n.context = i),
          (a = g))
        : (typeof n.componentDidUpdate != "function" ||
            (f === l.memoizedProps && o === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (f === l.memoizedProps && o === l.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (n = a),
      fn(l, t),
      (a = (t.flags & 128) !== 0),
      n || a
        ? ((n = t.stateNode),
          (u =
            a && typeof u.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && a
            ? ((t.child = ea(t, l.child, null, e)),
              (t.child = ea(t, null, u, e)))
            : Ml(l, t, u, e),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = qt(l, t, e)),
      l
    );
  }
  function M2(l, t, u, a) {
    return (qa(), (t.flags |= 256), Ml(l, t, u, a), t.child);
  }
  var tc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function uc(l) {
    return { baseLanes: l, cachePool: y0() };
  }
  function ac(l, t, u) {
    return ((l = l !== null ? l.childLanes & ~u : 0), t && (l |= st), l);
  }
  function _2(l, t, u) {
    var a = t.pendingProps,
      e = !1,
      n = (t.flags & 128) !== 0,
      f;
    if (
      ((f = n) ||
        (f =
          l !== null && l.memoizedState === null ? !1 : (bl.current & 2) !== 0),
      f && ((e = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (k) {
        if ((e ? $t(t) : kt(), k)) {
          var c = yl,
            i;
          if ((i = c)) {
            l: {
              for (i = c, c = St; i.nodeType !== 8;) {
                if (!c) {
                  c = null;
                  break l;
                }
                if (((i = mt(i.nextSibling)), i === null)) {
                  c = null;
                  break l;
                }
              }
              c = i;
            }
            c !== null
              ? ((t.memoizedState = {
                  dehydrated: c,
                  treeContext: Tu !== null ? { id: Ut, overflow: Rt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (i = kl(18, null, null, 0)),
                (i.stateNode = c),
                (i.return = t),
                (t.child = i),
                (xl = t),
                (yl = null),
                (i = !0))
              : (i = !1);
          }
          i || zu(t);
        }
        if (
          ((c = t.memoizedState),
          c !== null && ((c = c.dehydrated), c !== null))
        )
          return (Xc(c) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        Ct(t);
      }
      return (
        (c = a.children),
        (a = a.fallback),
        e
          ? (kt(),
            (e = t.mode),
            (c = cn({ mode: "hidden", children: c }, e)),
            (a = bu(a, e, u, null)),
            (c.return = t),
            (a.return = t),
            (c.sibling = a),
            (t.child = c),
            (e = t.child),
            (e.memoizedState = uc(u)),
            (e.childLanes = ac(l, f, u)),
            (t.memoizedState = tc),
            a)
          : ($t(t), ec(t, c))
      );
    }
    if (
      ((i = l.memoizedState), i !== null && ((c = i.dehydrated), c !== null))
    ) {
      if (n)
        t.flags & 256
          ? ($t(t), (t.flags &= -257), (t = nc(l, t, u)))
          : t.memoizedState !== null
            ? (kt(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (kt(),
              (e = a.fallback),
              (c = t.mode),
              (a = cn({ mode: "visible", children: a.children }, c)),
              (e = bu(e, c, u, null)),
              (e.flags |= 2),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              ea(t, l.child, null, u),
              (a = t.child),
              (a.memoizedState = uc(u)),
              (a.childLanes = ac(l, f, u)),
              (t.memoizedState = tc),
              (t = e));
      else if (($t(t), Xc(c))) {
        if (((f = c.nextSibling && c.nextSibling.dataset), f)) var h = f.dgst;
        ((f = h),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = f),
          Ya({ value: a, source: null, stack: null }),
          (t = nc(l, t, u)));
      } else if (
        (El || xa(l, t, u, !1), (f = (u & l.childLanes) !== 0), El || f)
      ) {
        if (
          ((f = fl),
          f !== null &&
            ((a = u & -u),
            (a = (a & 42) !== 0 ? 1 : Xn(a)),
            (a = (a & (f.suspendedLanes | u)) !== 0 ? 0 : a),
            a !== 0 && a !== i.retryLane))
        )
          throw ((i.retryLane = a), wu(l, a), tt(f, l, a), g2);
        (c.data === "$?" || zc(), (t = nc(l, t, u)));
      } else
        c.data === "$?"
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = i.treeContext),
            (yl = mt(c.nextSibling)),
            (xl = t),
            (k = !0),
            (Au = null),
            (St = !1),
            l !== null &&
              ((ft[ct++] = Ut),
              (ft[ct++] = Rt),
              (ft[ct++] = Tu),
              (Ut = l.id),
              (Rt = l.overflow),
              (Tu = t)),
            (t = ec(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return e
      ? (kt(),
        (e = a.fallback),
        (c = t.mode),
        (i = l.child),
        (h = i.sibling),
        (a = Dt(i, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = i.subtreeFlags & 65011712),
        h !== null ? (e = Dt(h, e)) : ((e = bu(e, c, u, null)), (e.flags |= 2)),
        (e.return = t),
        (a.return = t),
        (a.sibling = e),
        (t.child = a),
        (a = e),
        (e = t.child),
        (c = l.child.memoizedState),
        c === null
          ? (c = uc(u))
          : ((i = c.cachePool),
            i !== null
              ? ((h = Sl._currentValue),
                (i = i.parent !== h ? { parent: h, pool: h } : i))
              : (i = y0()),
            (c = { baseLanes: c.baseLanes | u, cachePool: i })),
        (e.memoizedState = c),
        (e.childLanes = ac(l, f, u)),
        (t.memoizedState = tc),
        a)
      : ($t(t),
        (u = l.child),
        (l = u.sibling),
        (u = Dt(u, { mode: "visible", children: a.children })),
        (u.return = t),
        (u.sibling = null),
        l !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [l]), (t.flags |= 16)) : f.push(l)),
        (t.child = u),
        (t.memoizedState = null),
        u);
  }
  function ec(l, t) {
    return (
      (t = cn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function cn(l, t) {
    return (
      (l = kl(22, l, null, t)),
      (l.lanes = 0),
      (l.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      l
    );
  }
  function nc(l, t, u) {
    return (
      ea(t, l.child, null, u),
      (l = ec(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function D2(l, t, u) {
    l.lanes |= t;
    var a = l.alternate;
    (a !== null && (a.lanes |= t), zf(l.return, t, u));
  }
  function fc(l, t, u, a, e) {
    var n = l.memoizedState;
    n === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: u,
          tailMode: e,
        })
      : ((n.isBackwards = t),
        (n.rendering = null),
        (n.renderingStartTime = 0),
        (n.last = a),
        (n.tail = u),
        (n.tailMode = e));
  }
  function U2(l, t, u) {
    var a = t.pendingProps,
      e = a.revealOrder,
      n = a.tail;
    if ((Ml(l, t, a.children, u), (a = bl.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (t.flags |= 128));
    else {
      if (l !== null && (l.flags & 128) !== 0)
        l: for (l = t.child; l !== null;) {
          if (l.tag === 13) l.memoizedState !== null && D2(l, u, t);
          else if (l.tag === 19) D2(l, u, t);
          else if (l.child !== null) {
            ((l.child.return = l), (l = l.child));
            continue;
          }
          if (l === t) break l;
          for (; l.sibling === null;) {
            if (l.return === null || l.return === t) break l;
            l = l.return;
          }
          ((l.sibling.return = l.return), (l = l.sibling));
        }
      a &= 1;
    }
    switch ((z(bl, a), e)) {
      case "forwards":
        for (u = t.child, e = null; u !== null;)
          ((l = u.alternate),
            l !== null && an(l) === null && (e = u),
            (u = u.sibling));
        ((u = e),
          u === null
            ? ((e = t.child), (t.child = null))
            : ((e = u.sibling), (u.sibling = null)),
          fc(t, !1, e, u, n));
        break;
      case "backwards":
        for (u = null, e = t.child, t.child = null; e !== null;) {
          if (((l = e.alternate), l !== null && an(l) === null)) {
            t.child = e;
            break;
          }
          ((l = e.sibling), (e.sibling = u), (u = e), (e = l));
        }
        fc(t, !0, u, null, n);
        break;
      case "together":
        fc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function qt(l, t, u) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (tu |= t.lanes),
      (u & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((xa(l, t, u, !1), (u & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        l = t.child, u = Dt(l, l.pendingProps), t.child = u, u.return = t;
        l.sibling !== null;
      )
        ((l = l.sibling),
          (u = u.sibling = Dt(l, l.pendingProps)),
          (u.return = t));
      u.sibling = null;
    }
    return t.child;
  }
  function cc(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Qe(l)));
  }
  function U3(l, t, u) {
    switch (t.tag) {
      case 3:
        (sl(t, t.stateNode.containerInfo),
          Lt(t, Sl, l.memoizedState.cache),
          qa());
        break;
      case 27:
      case 5:
        Yn(t);
        break;
      case 4:
        sl(t, t.stateNode.containerInfo);
        break;
      case 10:
        Lt(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? ($t(t), (t.flags |= 128), null)
            : (u & t.child.childLanes) !== 0
              ? _2(l, t, u)
              : ($t(t), (l = qt(l, t, u)), l !== null ? l.sibling : null);
        $t(t);
        break;
      case 19:
        var e = (l.flags & 128) !== 0;
        if (
          ((a = (u & t.childLanes) !== 0),
          a || (xa(l, t, u, !1), (a = (u & t.childLanes) !== 0)),
          e)
        ) {
          if (a) return U2(l, t, u);
          t.flags |= 128;
        }
        if (
          ((e = t.memoizedState),
          e !== null &&
            ((e.rendering = null), (e.tail = null), (e.lastEffect = null)),
          z(bl, bl.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), E2(l, t, u));
      case 24:
        Lt(t, Sl, l.memoizedState.cache);
    }
    return qt(l, t, u);
  }
  function R2(l, t, u) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) El = !0;
      else {
        if (!cc(l, u) && (t.flags & 128) === 0) return ((El = !1), U3(l, t, u));
        El = (l.flags & 131072) !== 0;
      }
    else ((El = !1), k && (t.flags & 1048576) !== 0 && n0(t, Xe, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          l = t.pendingProps;
          var a = t.elementType,
            e = a._init;
          if (((a = e(a._payload)), (t.type = a), typeof a == "function"))
            rf(a)
              ? ((l = Uu(a, l)), (t.tag = 1), (t = O2(null, t, a, l, u)))
              : ((t.tag = 0), (t = lc(null, t, a, l, u)));
          else {
            if (a != null) {
              if (((e = a.$$typeof), e === yt)) {
                ((t.tag = 11), (t = S2(null, t, a, l, u)));
                break l;
              } else if (e === Ll) {
                ((t.tag = 14), (t = b2(null, t, a, l, u)));
                break l;
              }
            }
            throw ((t = hu(a) || a), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return lc(l, t, t.type, t.pendingProps, u);
      case 1:
        return ((a = t.type), (e = Uu(a, t.pendingProps)), O2(l, t, a, e, u));
      case 3:
        l: {
          if ((sl(t, t.stateNode.containerInfo), l === null))
            throw Error(r(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          ((e = n.element), Nf(l, t), Va(t, a, null, u));
          var f = t.memoizedState;
          if (
            ((a = f.cache),
            Lt(t, Sl, a),
            a !== n.cache && Of(t, [Sl], u, !0),
            Za(),
            (a = f.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: a, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = M2(l, t, a, u);
              break l;
            } else if (a !== e) {
              ((e = et(Error(r(424)), t)), Ya(e), (t = M2(l, t, a, u)));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (
                yl = mt(l.firstChild),
                  xl = t,
                  k = !0,
                  Au = null,
                  St = !0,
                  u = c2(t, null, a, u),
                  t.child = u;
                u;
              )
                ((u.flags = (u.flags & -3) | 4096), (u = u.sibling));
            }
          else {
            if ((qa(), a === e)) {
              t = qt(l, t, u);
              break l;
            }
            Ml(l, t, a, u);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          fn(l, t),
          l === null
            ? (u = C1(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = u)
              : k ||
                ((u = t.type),
                (l = t.pendingProps),
                (a = An(B.current).createElement(u)),
                (a[Hl] = t),
                (a[jl] = l),
                Dl(a, u, l),
                Tl(a),
                (t.stateNode = a))
            : (t.memoizedState = C1(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Yn(t),
          l === null &&
            k &&
            ((a = t.stateNode = N1(t.type, t.pendingProps, B.current)),
            (xl = t),
            (St = !0),
            (e = yl),
            nu(t.type) ? ((Qc = e), (yl = mt(a.firstChild))) : (yl = e)),
          Ml(l, t, t.pendingProps.children, u),
          fn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            k &&
            ((e = a = yl) &&
              ((a = uv(a, t.type, t.pendingProps, St)),
              a !== null
                ? ((t.stateNode = a),
                  (xl = t),
                  (yl = mt(a.firstChild)),
                  (St = !1),
                  (e = !0))
                : (e = !1)),
            e || zu(t)),
          Yn(t),
          (e = t.type),
          (n = t.pendingProps),
          (f = l !== null ? l.memoizedProps : null),
          (a = n.children),
          Bc(e, n) ? (a = null) : f !== null && Bc(e, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((e = xf(l, t, T3, null, null, u)), (de._currentValue = e)),
          fn(l, t),
          Ml(l, t, a, u),
          t.child
        );
      case 6:
        return (
          l === null &&
            k &&
            ((l = u = yl) &&
              ((u = av(u, t.pendingProps, St)),
              u !== null
                ? ((t.stateNode = u), (xl = t), (yl = null), (l = !0))
                : (l = !1)),
            l || zu(t)),
          null
        );
      case 13:
        return _2(l, t, u);
      case 4:
        return (
          sl(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = ea(t, null, a, u)) : Ml(l, t, a, u),
          t.child
        );
      case 11:
        return S2(l, t, t.type, t.pendingProps, u);
      case 7:
        return (Ml(l, t, t.pendingProps, u), t.child);
      case 8:
        return (Ml(l, t, t.pendingProps.children, u), t.child);
      case 12:
        return (Ml(l, t, t.pendingProps.children, u), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          Lt(t, t.type, a.value),
          Ml(l, t, a.children, u),
          t.child
        );
      case 9:
        return (
          (e = t.type._context),
          (a = t.pendingProps.children),
          Mu(t),
          (e = pl(e)),
          (a = a(e)),
          (t.flags |= 1),
          Ml(l, t, a, u),
          t.child
        );
      case 14:
        return b2(l, t, t.type, t.pendingProps, u);
      case 15:
        return T2(l, t, t.type, t.pendingProps, u);
      case 19:
        return U2(l, t, u);
      case 31:
        return (
          (a = t.pendingProps),
          (u = t.mode),
          (a = { mode: a.mode, children: a.children }),
          l === null
            ? ((u = cn(a, u)),
              (u.ref = t.ref),
              (t.child = u),
              (u.return = t),
              (t = u))
            : ((u = Dt(l.child, a)),
              (u.ref = t.ref),
              (t.child = u),
              (u.return = t),
              (t = u)),
          t
        );
      case 22:
        return E2(l, t, u);
      case 24:
        return (
          Mu(t),
          (a = pl(Sl)),
          l === null
            ? ((e = Df()),
              e === null &&
                ((e = fl),
                (n = Mf()),
                (e.pooledCache = n),
                n.refCount++,
                n !== null && (e.pooledCacheLanes |= u),
                (e = n)),
              (t.memoizedState = { parent: a, cache: e }),
              Rf(t),
              Lt(t, Sl, e))
            : ((l.lanes & u) !== 0 && (Nf(l, t), Va(t, null, null, u), Za()),
              (e = l.memoizedState),
              (n = t.memoizedState),
              e.parent !== a
                ? ((e = { parent: a, cache: a }),
                  (t.memoizedState = e),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = e),
                  Lt(t, Sl, a))
                : ((a = n.cache),
                  Lt(t, Sl, a),
                  a !== e.cache && Of(t, [Sl], u, !0))),
          Ml(l, t, t.pendingProps.children, u),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Yt(l) {
    l.flags |= 4;
  }
  function N2(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !j1(t))) {
      if (
        ((t = it.current),
        t !== null &&
          ((L & 4194048) === L
            ? bt !== null
            : ((L & 62914560) !== L && (L & 536870912) === 0) || t !== bt))
      )
        throw ((Xa = Uf), h0);
      l.flags |= 8192;
    }
  }
  function sn(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? ii() : 536870912), (l.lanes |= t), (ia |= t)));
  }
  function ka(l, t) {
    if (!k)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var u = null; t !== null;)
            (t.alternate !== null && (u = t), (t = t.sibling));
          u === null ? (l.tail = null) : (u.sibling = null);
          break;
        case "collapsed":
          u = l.tail;
          for (var a = null; u !== null;)
            (u.alternate !== null && (a = u), (u = u.sibling));
          a === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function dl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      u = 0,
      a = 0;
    if (t)
      for (var e = l.child; e !== null;)
        ((u |= e.lanes | e.childLanes),
          (a |= e.subtreeFlags & 65011712),
          (a |= e.flags & 65011712),
          (e.return = l),
          (e = e.sibling));
    else
      for (e = l.child; e !== null;)
        ((u |= e.lanes | e.childLanes),
          (a |= e.subtreeFlags),
          (a |= e.flags),
          (e.return = l),
          (e = e.sibling));
    return ((l.subtreeFlags |= a), (l.childLanes = u), t);
  }
  function R3(l, t, u) {
    var a = t.pendingProps;
    switch ((Tf(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (dl(t), null);
      case 1:
        return (dl(t), null);
      case 3:
        return (
          (u = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Ht(Sl),
          Xt(),
          u.pendingContext &&
            ((u.context = u.pendingContext), (u.pendingContext = null)),
          (l === null || l.child === null) &&
            (Ca(t)
              ? Yt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), i0())),
          dl(t),
          null
        );
      case 26:
        return (
          (u = t.memoizedState),
          l === null
            ? (Yt(t),
              u !== null ? (dl(t), N2(t, u)) : (dl(t), (t.flags &= -16777217)))
            : u
              ? u !== l.memoizedState
                ? (Yt(t), dl(t), N2(t, u))
                : (dl(t), (t.flags &= -16777217))
              : (l.memoizedProps !== a && Yt(t), dl(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        (be(t), (u = B.current));
        var e = t.type;
        if (l !== null && t.stateNode != null) l.memoizedProps !== a && Yt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (dl(t), null);
          }
          ((l = p.current),
            Ca(t) ? f0(t) : ((l = N1(e, a, u)), (t.stateNode = l), Yt(t)));
        }
        return (dl(t), null);
      case 5:
        if ((be(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Yt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (dl(t), null);
          }
          if (((l = p.current), Ca(t))) f0(t);
          else {
            switch (((e = An(B.current)), l)) {
              case 1:
                l = e.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                l = e.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    l = e.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    l = e.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u,
                    );
                    break;
                  case "script":
                    ((l = e.createElement("div")),
                      (l.innerHTML = "<script><\/script>"),
                      (l = l.removeChild(l.firstChild)));
                    break;
                  case "select":
                    ((l =
                      typeof a.is == "string"
                        ? e.createElement("select", { is: a.is })
                        : e.createElement("select")),
                      a.multiple
                        ? (l.multiple = !0)
                        : a.size && (l.size = a.size));
                    break;
                  default:
                    l =
                      typeof a.is == "string"
                        ? e.createElement(u, { is: a.is })
                        : e.createElement(u);
                }
            }
            ((l[Hl] = t), (l[jl] = a));
            l: for (e = t.child; e !== null;) {
              if (e.tag === 5 || e.tag === 6) l.appendChild(e.stateNode);
              else if (e.tag !== 4 && e.tag !== 27 && e.child !== null) {
                ((e.child.return = e), (e = e.child));
                continue;
              }
              if (e === t) break l;
              for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break l;
                e = e.return;
              }
              ((e.sibling.return = e.return), (e = e.sibling));
            }
            t.stateNode = l;
            l: switch ((Dl(l, u, a), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!a.autoFocus;
                break l;
              case "img":
                l = !0;
                break l;
              default:
                l = !1;
            }
            l && Yt(t);
          }
        }
        return (dl(t), (t.flags &= -16777217), null);
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Yt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
          if (((l = B.current), Ca(t))) {
            if (
              ((l = t.stateNode),
              (u = t.memoizedProps),
              (a = null),
              (e = xl),
              e !== null)
            )
              switch (e.tag) {
                case 27:
                case 5:
                  a = e.memoizedProps;
              }
            ((l[Hl] = t),
              (l = !!(
                l.nodeValue === u ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                z1(l.nodeValue, u)
              )),
              l || zu(t));
          } else
            ((l = An(l).createTextNode(a)), (l[Hl] = t), (t.stateNode = l));
        }
        return (dl(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((e = Ca(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!e) throw Error(r(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(r(317));
              e[Hl] = t;
            } else
              (qa(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (dl(t), (e = !1));
          } else
            ((e = i0()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = e),
              (e = !0));
          if (!e) return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        if ((Ct(t), (t.flags & 128) !== 0)) return ((t.lanes = u), t);
        if (
          ((u = a !== null), (l = l !== null && l.memoizedState !== null), u)
        ) {
          ((a = t.child),
            (e = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (e = a.alternate.memoizedState.cachePool.pool));
          var n = null;
          (a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (n = a.memoizedState.cachePool.pool),
            n !== e && (a.flags |= 2048));
        }
        return (
          u !== l && u && (t.child.flags |= 8192),
          sn(t, t.updateQueue),
          dl(t),
          null
        );
      case 4:
        return (Xt(), l === null && pc(t.stateNode.containerInfo), dl(t), null);
      case 10:
        return (Ht(t.type), dl(t), null);
      case 19:
        if ((M(bl), (e = t.memoizedState), e === null)) return (dl(t), null);
        if (((a = (t.flags & 128) !== 0), (n = e.rendering), n === null))
          if (a) ka(e, !1);
          else {
            if (hl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null;) {
                if (((n = an(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      ka(e, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      sn(t, l),
                      t.subtreeFlags = 0,
                      l = u,
                      u = t.child;
                    u !== null;
                  )
                    (e0(u, l), (u = u.sibling));
                  return (z(bl, (bl.current & 1) | 2), t.child);
                }
                l = l.sibling;
              }
            e.tail !== null &&
              gt() > yn &&
              ((t.flags |= 128), (a = !0), ka(e, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((l = an(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                sn(t, l),
                ka(e, !0),
                e.tail === null &&
                  e.tailMode === "hidden" &&
                  !n.alternate &&
                  !k)
              )
                return (dl(t), null);
            } else
              2 * gt() - e.renderingStartTime > yn &&
                u !== 536870912 &&
                ((t.flags |= 128), (a = !0), ka(e, !1), (t.lanes = 4194304));
          e.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = e.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (e.last = n));
        }
        return e.tail !== null
          ? ((t = e.tail),
            (e.rendering = t),
            (e.tail = t.sibling),
            (e.renderingStartTime = gt()),
            (t.sibling = null),
            (l = bl.current),
            z(bl, a ? (l & 1) | 2 : l & 1),
            t)
          : (dl(t), null);
      case 22:
      case 23:
        return (
          Ct(t),
          qf(),
          (a = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (u & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (dl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : dl(t),
          (u = t.updateQueue),
          u !== null && sn(t, u.retryQueue),
          (u = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (u = l.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== u && (t.flags |= 2048),
          l !== null && M(_u),
          null
        );
      case 24:
        return (
          (u = null),
          l !== null && (u = l.memoizedState.cache),
          t.memoizedState.cache !== u && (t.flags |= 2048),
          Ht(Sl),
          dl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function N3(l, t) {
    switch ((Tf(t), t.tag)) {
      case 1:
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Ht(Sl),
          Xt(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (be(t), null);
      case 13:
        if (
          (Ct(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          qa();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return (M(bl), null);
      case 4:
        return (Xt(), null);
      case 10:
        return (Ht(t.type), null);
      case 22:
      case 23:
        return (
          Ct(t),
          qf(),
          l !== null && M(_u),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (Ht(Sl), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function H2(l, t) {
    switch ((Tf(t), t.tag)) {
      case 3:
        (Ht(Sl), Xt());
        break;
      case 26:
      case 27:
      case 5:
        be(t);
        break;
      case 4:
        Xt();
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        M(bl);
        break;
      case 10:
        Ht(t.type);
        break;
      case 22:
      case 23:
        (Ct(t), qf(), l !== null && M(_u));
        break;
      case 24:
        Ht(Sl);
    }
  }
  function Fa(l, t) {
    try {
      var u = t.updateQueue,
        a = u !== null ? u.lastEffect : null;
      if (a !== null) {
        var e = a.next;
        u = e;
        do {
          if ((u.tag & l) === l) {
            a = void 0;
            var n = u.create,
              f = u.inst;
            ((a = n()), (f.destroy = a));
          }
          u = u.next;
        } while (u !== e);
      }
    } catch (c) {
      el(t, t.return, c);
    }
  }
  function Ft(l, t, u) {
    try {
      var a = t.updateQueue,
        e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var n = e.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var f = a.inst,
              c = f.destroy;
            if (c !== void 0) {
              ((f.destroy = void 0), (e = t));
              var i = u,
                h = c;
              try {
                h();
              } catch (g) {
                el(e, i, g);
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (g) {
      el(t, t.return, g);
    }
  }
  function p2(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var u = l.stateNode;
      try {
        b0(t, u);
      } catch (a) {
        el(l, l.return, a);
      }
    }
  }
  function C2(l, t, u) {
    ((u.props = Uu(l.type, l.memoizedProps)), (u.state = l.memoizedState));
    try {
      u.componentWillUnmount();
    } catch (a) {
      el(l, t, a);
    }
  }
  function Ia(l, t) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof u == "function" ? (l.refCleanup = u(a)) : (u.current = a);
      }
    } catch (e) {
      el(l, t, e);
    }
  }
  function Tt(l, t) {
    var u = l.ref,
      a = l.refCleanup;
    if (u !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (e) {
          el(l, t, e);
        } finally {
          ((l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null));
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (e) {
          el(l, t, e);
        }
      else u.current = null;
  }
  function q2(l) {
    var t = l.type,
      u = l.memoizedProps,
      a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && a.focus();
          break l;
        case "img":
          u.src ? (a.src = u.src) : u.srcSet && (a.srcset = u.srcSet);
      }
    } catch (e) {
      el(l, l.return, e);
    }
  }
  function ic(l, t, u) {
    try {
      var a = l.stateNode;
      (F3(a, l.type, u, t), (a[jl] = t));
    } catch (e) {
      el(l, l.return, e);
    }
  }
  function Y2(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && nu(l.type)) ||
      l.tag === 4
    );
  }
  function sc(l) {
    l: for (;;) {
      for (; l.sibling === null;) {
        if (l.return === null || Y2(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;
      ) {
        if (
          (l.tag === 27 && nu(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function vc(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6)
      ((l = l.stateNode),
        t
          ? (u.nodeType === 9
              ? u.body
              : u.nodeName === "HTML"
                ? u.ownerDocument.body
                : u
            ).insertBefore(l, t)
          : ((t =
              u.nodeType === 9
                ? u.body
                : u.nodeName === "HTML"
                  ? u.ownerDocument.body
                  : u),
            t.appendChild(l),
            (u = u._reactRootContainer),
            u != null || t.onclick !== null || (t.onclick = En)));
    else if (
      a !== 4 &&
      (a === 27 && nu(l.type) && ((u = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (vc(l, t, u), l = l.sibling; l !== null;)
        (vc(l, t, u), (l = l.sibling));
  }
  function vn(l, t, u) {
    var a = l.tag;
    if (a === 5 || a === 6)
      ((l = l.stateNode), t ? u.insertBefore(l, t) : u.appendChild(l));
    else if (
      a !== 4 &&
      (a === 27 && nu(l.type) && (u = l.stateNode), (l = l.child), l !== null)
    )
      for (vn(l, t, u), l = l.sibling; l !== null;)
        (vn(l, t, u), (l = l.sibling));
  }
  function x2(l) {
    var t = l.stateNode,
      u = l.memoizedProps;
    try {
      for (var a = l.type, e = t.attributes; e.length;)
        t.removeAttributeNode(e[0]);
      (Dl(t, a, u), (t[Hl] = l), (t[jl] = u));
    } catch (n) {
      el(l, l.return, n);
    }
  }
  var xt = !1,
    ml = !1,
    dc = !1,
    B2 = typeof WeakSet == "function" ? WeakSet : Set,
    Al = null;
  function H3(l, t) {
    if (((l = l.containerInfo), (Yc = Un), (l = Wi(l)), sf(l))) {
      if ("selectionStart" in l)
        var u = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          u = ((u = l.ownerDocument) && u.defaultView) || window;
          var a = u.getSelection && u.getSelection();
          if (a && a.rangeCount !== 0) {
            u = a.anchorNode;
            var e = a.anchorOffset,
              n = a.focusNode;
            a = a.focusOffset;
            try {
              (u.nodeType, n.nodeType);
            } catch {
              u = null;
              break l;
            }
            var f = 0,
              c = -1,
              i = -1,
              h = 0,
              g = 0,
              T = l,
              o = null;
            t: for (;;) {
              for (
                var m;
                T !== u || (e !== 0 && T.nodeType !== 3) || (c = f + e),
                  T !== n || (a !== 0 && T.nodeType !== 3) || (i = f + a),
                  T.nodeType === 3 && (f += T.nodeValue.length),
                  (m = T.firstChild) !== null;
              )
                ((o = T), (T = m));
              for (;;) {
                if (T === l) break t;
                if (
                  (o === u && ++h === e && (c = f),
                  o === n && ++g === a && (i = f),
                  (m = T.nextSibling) !== null)
                )
                  break;
                ((T = o), (o = T.parentNode));
              }
              T = m;
            }
            u = c === -1 || i === -1 ? null : { start: c, end: i };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (
      xc = { focusedElem: l, selectionRange: u }, Un = !1, Al = t;
      Al !== null;
    )
      if (
        ((t = Al), (l = t.child), (t.subtreeFlags & 1024) !== 0 && l !== null)
      )
        ((l.return = t), (Al = l));
      else
        for (; Al !== null;) {
          switch (((t = Al), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                ((l = void 0),
                  (u = t),
                  (e = n.memoizedProps),
                  (n = n.memoizedState),
                  (a = u.stateNode));
                try {
                  var x = Uu(u.type, e, u.elementType === u.type);
                  ((l = a.getSnapshotBeforeUpdate(x, n)),
                    (a.__reactInternalSnapshotBeforeUpdate = l));
                } catch (C) {
                  el(u, u.return, C);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (u = l.nodeType), u === 9)
                )
                  Gc(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Gc(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(r(163));
          }
          if (((l = t.sibling), l !== null)) {
            ((l.return = t.return), (Al = l));
            break;
          }
          Al = t.return;
        }
  }
  function j2(l, t, u) {
    var a = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        (It(l, u), a & 4 && Fa(5, u));
        break;
      case 1:
        if ((It(l, u), a & 4))
          if (((l = u.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (f) {
              el(u, u.return, f);
            }
          else {
            var e = Uu(u.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(e, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              el(u, u.return, f);
            }
          }
        (a & 64 && p2(u), a & 512 && Ia(u, u.return));
        break;
      case 3:
        if ((It(l, u), a & 64 && ((l = u.updateQueue), l !== null))) {
          if (((t = null), u.child !== null))
            switch (u.child.tag) {
              case 27:
              case 5:
                t = u.child.stateNode;
                break;
              case 1:
                t = u.child.stateNode;
            }
          try {
            b0(l, t);
          } catch (f) {
            el(u, u.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && x2(u);
      case 26:
      case 5:
        (It(l, u), t === null && a & 4 && q2(u), a & 512 && Ia(u, u.return));
        break;
      case 12:
        It(l, u);
        break;
      case 13:
        (It(l, u),
          a & 4 && Q2(l, u),
          a & 64 &&
            ((l = u.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((u = X3.bind(null, u)), ev(l, u)))));
        break;
      case 22:
        if (((a = u.memoizedState !== null || xt), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || ml), (e = xt));
          var n = ml;
          ((xt = a),
            (ml = t) && !n ? Pt(l, u, (u.subtreeFlags & 8772) !== 0) : It(l, u),
            (xt = e),
            (ml = n));
        }
        break;
      case 30:
        break;
      default:
        It(l, u);
    }
  }
  function G2(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), G2(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && Vn(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var vl = null,
    Ql = !1;
  function Bt(l, t, u) {
    for (u = u.child; u !== null;) (X2(l, t, u), (u = u.sibling));
  }
  function X2(l, t, u) {
    if (wl && typeof wl.onCommitFiberUnmount == "function")
      try {
        wl.onCommitFiberUnmount(ba, u);
      } catch {}
    switch (u.tag) {
      case 26:
        (ml || Tt(u, t),
          Bt(l, t, u),
          u.memoizedState
            ? u.memoizedState.count--
            : u.stateNode && ((u = u.stateNode), u.parentNode.removeChild(u)));
        break;
      case 27:
        ml || Tt(u, t);
        var a = vl,
          e = Ql;
        (nu(u.type) && ((vl = u.stateNode), (Ql = !1)),
          Bt(l, t, u),
          ce(u.stateNode),
          (vl = a),
          (Ql = e));
        break;
      case 5:
        ml || Tt(u, t);
      case 6:
        if (
          ((a = vl),
          (e = Ql),
          (vl = null),
          Bt(l, t, u),
          (vl = a),
          (Ql = e),
          vl !== null)
        )
          if (Ql)
            try {
              (vl.nodeType === 9
                ? vl.body
                : vl.nodeName === "HTML"
                  ? vl.ownerDocument.body
                  : vl
              ).removeChild(u.stateNode);
            } catch (n) {
              el(u, t, n);
            }
          else
            try {
              vl.removeChild(u.stateNode);
            } catch (n) {
              el(u, t, n);
            }
        break;
      case 18:
        vl !== null &&
          (Ql
            ? ((l = vl),
              U1(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                u.stateNode,
              ),
              me(l))
            : U1(vl, u.stateNode));
        break;
      case 4:
        ((a = vl),
          (e = Ql),
          (vl = u.stateNode.containerInfo),
          (Ql = !0),
          Bt(l, t, u),
          (vl = a),
          (Ql = e));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (ml || Ft(2, u, t), ml || Ft(4, u, t), Bt(l, t, u));
        break;
      case 1:
        (ml ||
          (Tt(u, t),
          (a = u.stateNode),
          typeof a.componentWillUnmount == "function" && C2(u, t, a)),
          Bt(l, t, u));
        break;
      case 21:
        Bt(l, t, u);
        break;
      case 22:
        ((ml = (a = ml) || u.memoizedState !== null), Bt(l, t, u), (ml = a));
        break;
      default:
        Bt(l, t, u);
    }
  }
  function Q2(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        me(l);
      } catch (u) {
        el(t, t.return, u);
      }
  }
  function p3(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new B2()), t);
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new B2()),
          t
        );
      default:
        throw Error(r(435, l.tag));
    }
  }
  function yc(l, t) {
    var u = p3(l);
    t.forEach(function (a) {
      var e = Q3.bind(null, l, a);
      u.has(a) || (u.add(a), a.then(e, e));
    });
  }
  function Fl(l, t) {
    var u = t.deletions;
    if (u !== null)
      for (var a = 0; a < u.length; a++) {
        var e = u[a],
          n = l,
          f = t,
          c = f;
        l: for (; c !== null;) {
          switch (c.tag) {
            case 27:
              if (nu(c.type)) {
                ((vl = c.stateNode), (Ql = !1));
                break l;
              }
              break;
            case 5:
              ((vl = c.stateNode), (Ql = !1));
              break l;
            case 3:
            case 4:
              ((vl = c.stateNode.containerInfo), (Ql = !0));
              break l;
          }
          c = c.return;
        }
        if (vl === null) throw Error(r(160));
        (X2(n, f, e),
          (vl = null),
          (Ql = !1),
          (n = e.alternate),
          n !== null && (n.return = null),
          (e.return = null));
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null;) (Z2(t, l), (t = t.sibling));
  }
  var ot = null;
  function Z2(l, t) {
    var u = l.alternate,
      a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Fl(t, l),
          Il(l),
          a & 4 && (Ft(3, l, l.return), Fa(3, l), Ft(5, l, l.return)));
        break;
      case 1:
        (Fl(t, l),
          Il(l),
          a & 512 && (ml || u === null || Tt(u, u.return)),
          a & 64 &&
            xt &&
            ((l = l.updateQueue),
            l !== null &&
              ((a = l.callbacks),
              a !== null &&
                ((u = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = u === null ? a : u.concat(a))))));
        break;
      case 26:
        var e = ot;
        if (
          (Fl(t, l),
          Il(l),
          a & 512 && (ml || u === null || Tt(u, u.return)),
          a & 4)
        ) {
          var n = u !== null ? u.memoizedState : null;
          if (((a = l.memoizedState), u === null))
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  ((a = l.type),
                    (u = l.memoizedProps),
                    (e = e.ownerDocument || e));
                  t: switch (a) {
                    case "title":
                      ((n = e.getElementsByTagName("title")[0]),
                        (!n ||
                          n[Aa] ||
                          n[Hl] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = e.createElement(a)),
                          e.head.insertBefore(
                            n,
                            e.querySelector("head > title"),
                          )),
                        Dl(n, a, u),
                        (n[Hl] = l),
                        Tl(n),
                        (a = n));
                      break l;
                    case "link":
                      var f = x1("link", "href", e).get(a + (u.href || ""));
                      if (f) {
                        for (var c = 0; c < f.length; c++)
                          if (
                            ((n = f[c]),
                            n.getAttribute("href") ===
                              (u.href == null || u.href === ""
                                ? null
                                : u.href) &&
                              n.getAttribute("rel") ===
                                (u.rel == null ? null : u.rel) &&
                              n.getAttribute("title") ===
                                (u.title == null ? null : u.title) &&
                              n.getAttribute("crossorigin") ===
                                (u.crossOrigin == null ? null : u.crossOrigin))
                          ) {
                            f.splice(c, 1);
                            break t;
                          }
                      }
                      ((n = e.createElement(a)),
                        Dl(n, a, u),
                        e.head.appendChild(n));
                      break;
                    case "meta":
                      if (
                        (f = x1("meta", "content", e).get(
                          a + (u.content || ""),
                        ))
                      ) {
                        for (c = 0; c < f.length; c++)
                          if (
                            ((n = f[c]),
                            n.getAttribute("content") ===
                              (u.content == null ? null : "" + u.content) &&
                              n.getAttribute("name") ===
                                (u.name == null ? null : u.name) &&
                              n.getAttribute("property") ===
                                (u.property == null ? null : u.property) &&
                              n.getAttribute("http-equiv") ===
                                (u.httpEquiv == null ? null : u.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (u.charSet == null ? null : u.charSet))
                          ) {
                            f.splice(c, 1);
                            break t;
                          }
                      }
                      ((n = e.createElement(a)),
                        Dl(n, a, u),
                        e.head.appendChild(n));
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  ((n[Hl] = l), Tl(n), (a = n));
                }
                l.stateNode = a;
              } else B1(e, l.type, l.stateNode);
            else l.stateNode = Y1(e, a, l.memoizedProps);
          else
            n !== a
              ? (n === null
                  ? u.stateNode !== null &&
                    ((u = u.stateNode), u.parentNode.removeChild(u))
                  : n.count--,
                a === null
                  ? B1(e, l.type, l.stateNode)
                  : Y1(e, a, l.memoizedProps))
              : a === null &&
                l.stateNode !== null &&
                ic(l, l.memoizedProps, u.memoizedProps);
        }
        break;
      case 27:
        (Fl(t, l),
          Il(l),
          a & 512 && (ml || u === null || Tt(u, u.return)),
          u !== null && a & 4 && ic(l, l.memoizedProps, u.memoizedProps));
        break;
      case 5:
        if (
          (Fl(t, l),
          Il(l),
          a & 512 && (ml || u === null || Tt(u, u.return)),
          l.flags & 32)
        ) {
          e = l.stateNode;
          try {
            Xu(e, "");
          } catch (m) {
            el(l, l.return, m);
          }
        }
        (a & 4 &&
          l.stateNode != null &&
          ((e = l.memoizedProps), ic(l, e, u !== null ? u.memoizedProps : e)),
          a & 1024 && (dc = !0));
        break;
      case 6:
        if ((Fl(t, l), Il(l), a & 4)) {
          if (l.stateNode === null) throw Error(r(162));
          ((a = l.memoizedProps), (u = l.stateNode));
          try {
            u.nodeValue = a;
          } catch (m) {
            el(l, l.return, m);
          }
        }
        break;
      case 3:
        if (
          ((Mn = null),
          (e = ot),
          (ot = zn(t.containerInfo)),
          Fl(t, l),
          (ot = e),
          Il(l),
          a & 4 && u !== null && u.memoizedState.isDehydrated)
        )
          try {
            me(t.containerInfo);
          } catch (m) {
            el(l, l.return, m);
          }
        dc && ((dc = !1), V2(l));
        break;
      case 4:
        ((a = ot),
          (ot = zn(l.stateNode.containerInfo)),
          Fl(t, l),
          Il(l),
          (ot = a));
        break;
      case 12:
        (Fl(t, l), Il(l));
        break;
      case 13:
        (Fl(t, l),
          Il(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (u !== null && u.memoizedState !== null) &&
            (Sc = gt()),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), yc(l, a))));
        break;
      case 22:
        e = l.memoizedState !== null;
        var i = u !== null && u.memoizedState !== null,
          h = xt,
          g = ml;
        if (
          ((xt = h || e),
          (ml = g || i),
          Fl(t, l),
          (ml = g),
          (xt = h),
          Il(l),
          a & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = e ? t._visibility & -2 : t._visibility | 1,
              e && (u === null || i || xt || ml || Ru(l)),
              u = null,
              t = l;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (u === null) {
                i = u = t;
                try {
                  if (((n = i.stateNode), e))
                    ((f = n.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none"));
                  else {
                    c = i.stateNode;
                    var T = i.memoizedProps.style,
                      o =
                        T != null && T.hasOwnProperty("display")
                          ? T.display
                          : null;
                    c.style.display =
                      o == null || typeof o == "boolean" ? "" : ("" + o).trim();
                  }
                } catch (m) {
                  el(i, i.return, m);
                }
              }
            } else if (t.tag === 6) {
              if (u === null) {
                i = t;
                try {
                  i.stateNode.nodeValue = e ? "" : i.memoizedProps;
                } catch (m) {
                  el(i, i.return, m);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null;) {
              if (t.return === null || t.return === l) break l;
              (u === t && (u = null), (t = t.return));
            }
            (u === t && (u = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = l.updateQueue),
          a !== null &&
            ((u = a.retryQueue),
            u !== null && ((a.retryQueue = null), yc(l, u))));
        break;
      case 19:
        (Fl(t, l),
          Il(l),
          a & 4 &&
            ((a = l.updateQueue),
            a !== null && ((l.updateQueue = null), yc(l, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Fl(t, l), Il(l));
    }
  }
  function Il(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var u, a = l.return; a !== null;) {
          if (Y2(a)) {
            u = a;
            break;
          }
          a = a.return;
        }
        if (u == null) throw Error(r(160));
        switch (u.tag) {
          case 27:
            var e = u.stateNode,
              n = sc(l);
            vn(l, n, e);
            break;
          case 5:
            var f = u.stateNode;
            u.flags & 32 && (Xu(f, ""), (u.flags &= -33));
            var c = sc(l);
            vn(l, c, f);
            break;
          case 3:
          case 4:
            var i = u.stateNode.containerInfo,
              h = sc(l);
            vc(l, h, i);
            break;
          default:
            throw Error(r(161));
        }
      } catch (g) {
        el(l, l.return, g);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function V2(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null;) {
        var t = l;
        (V2(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling));
      }
  }
  function It(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null;) (j2(l, t.alternate, t), (t = t.sibling));
  }
  function Ru(l) {
    for (l = l.child; l !== null;) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ft(4, t, t.return), Ru(t));
          break;
        case 1:
          Tt(t, t.return);
          var u = t.stateNode;
          (typeof u.componentWillUnmount == "function" && C2(t, t.return, u),
            Ru(t));
          break;
        case 27:
          ce(t.stateNode);
        case 26:
        case 5:
          (Tt(t, t.return), Ru(t));
          break;
        case 22:
          t.memoizedState === null && Ru(t);
          break;
        case 30:
          Ru(t);
          break;
        default:
          Ru(t);
      }
      l = l.sibling;
    }
  }
  function Pt(l, t, u) {
    for (u = u && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
      var a = t.alternate,
        e = l,
        n = t,
        f = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          (Pt(e, n, u), Fa(4, n));
          break;
        case 1:
          if (
            (Pt(e, n, u),
            (a = n),
            (e = a.stateNode),
            typeof e.componentDidMount == "function")
          )
            try {
              e.componentDidMount();
            } catch (h) {
              el(a, a.return, h);
            }
          if (((a = n), (e = a.updateQueue), e !== null)) {
            var c = a.stateNode;
            try {
              var i = e.shared.hiddenCallbacks;
              if (i !== null)
                for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                  S0(i[e], c);
            } catch (h) {
              el(a, a.return, h);
            }
          }
          (u && f & 64 && p2(n), Ia(n, n.return));
          break;
        case 27:
          x2(n);
        case 26:
        case 5:
          (Pt(e, n, u), u && a === null && f & 4 && q2(n), Ia(n, n.return));
          break;
        case 12:
          Pt(e, n, u);
          break;
        case 13:
          (Pt(e, n, u), u && f & 4 && Q2(e, n));
          break;
        case 22:
          (n.memoizedState === null && Pt(e, n, u), Ia(n, n.return));
          break;
        case 30:
          break;
        default:
          Pt(e, n, u);
      }
      t = t.sibling;
    }
  }
  function hc(l, t) {
    var u = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (u = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== u && (l != null && l.refCount++, u != null && Ba(u)));
  }
  function oc(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Ba(l)));
  }
  function Et(l, t, u, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) (L2(l, t, u, a), (t = t.sibling));
  }
  function L2(l, t, u, a) {
    var e = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Et(l, t, u, a), e & 2048 && Fa(9, t));
        break;
      case 1:
        Et(l, t, u, a);
        break;
      case 3:
        (Et(l, t, u, a),
          e & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ba(l))));
        break;
      case 12:
        if (e & 2048) {
          (Et(l, t, u, a), (l = t.stateNode));
          try {
            var n = t.memoizedProps,
              f = n.id,
              c = n.onPostCommit;
            typeof c == "function" &&
              c(
                f,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0,
              );
          } catch (i) {
            el(t, t.return, i);
          }
        } else Et(l, t, u, a);
        break;
      case 13:
        Et(l, t, u, a);
        break;
      case 23:
        break;
      case 22:
        ((n = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Et(l, t, u, a)
              : Pa(l, t)
            : n._visibility & 2
              ? Et(l, t, u, a)
              : ((n._visibility |= 2),
                na(l, t, u, a, (t.subtreeFlags & 10256) !== 0)),
          e & 2048 && hc(f, t));
        break;
      case 24:
        (Et(l, t, u, a), e & 2048 && oc(t.alternate, t));
        break;
      default:
        Et(l, t, u, a);
    }
  }
  function na(l, t, u, a, e) {
    for (e = e && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null;) {
      var n = l,
        f = t,
        c = u,
        i = a,
        h = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          (na(n, f, c, i, e), Fa(8, f));
          break;
        case 23:
          break;
        case 22:
          var g = f.stateNode;
          (f.memoizedState !== null
            ? g._visibility & 2
              ? na(n, f, c, i, e)
              : Pa(n, f)
            : ((g._visibility |= 2), na(n, f, c, i, e)),
            e && h & 2048 && hc(f.alternate, f));
          break;
        case 24:
          (na(n, f, c, i, e), e && h & 2048 && oc(f.alternate, f));
          break;
        default:
          na(n, f, c, i, e);
      }
      t = t.sibling;
    }
  }
  function Pa(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) {
        var u = l,
          a = t,
          e = a.flags;
        switch (a.tag) {
          case 22:
            (Pa(u, a), e & 2048 && hc(a.alternate, a));
            break;
          case 24:
            (Pa(u, a), e & 2048 && oc(a.alternate, a));
            break;
          default:
            Pa(u, a);
        }
        t = t.sibling;
      }
  }
  var le = 8192;
  function fa(l) {
    if (l.subtreeFlags & le)
      for (l = l.child; l !== null;) (K2(l), (l = l.sibling));
  }
  function K2(l) {
    switch (l.tag) {
      case 26:
        (fa(l),
          l.flags & le &&
            l.memoizedState !== null &&
            gv(ot, l.memoizedState, l.memoizedProps));
        break;
      case 5:
        fa(l);
        break;
      case 3:
      case 4:
        var t = ot;
        ((ot = zn(l.stateNode.containerInfo)), fa(l), (ot = t));
        break;
      case 22:
        l.memoizedState === null &&
          ((t = l.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = le), (le = 16777216), fa(l), (le = t))
            : fa(l));
        break;
      default:
        fa(l);
    }
  }
  function J2(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function te(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          ((Al = a), W2(a, l));
        }
      J2(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null;) (w2(l), (l = l.sibling));
  }
  function w2(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (te(l), l.flags & 2048 && Ft(9, l, l.return));
        break;
      case 3:
        te(l);
        break;
      case 12:
        te(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), dn(l))
          : te(l);
        break;
      default:
        te(l);
    }
  }
  function dn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          ((Al = a), W2(a, l));
        }
      J2(l);
    }
    for (l = l.child; l !== null;) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Ft(8, t, t.return), dn(t));
          break;
        case 22:
          ((u = t.stateNode),
            u._visibility & 2 && ((u._visibility &= -3), dn(t)));
          break;
        default:
          dn(t);
      }
      l = l.sibling;
    }
  }
  function W2(l, t) {
    for (; Al !== null;) {
      var u = Al;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ft(8, u, t);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var a = u.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ba(u.memoizedState.cache);
      }
      if (((a = u.child), a !== null)) ((a.return = u), (Al = a));
      else
        l: for (u = l; Al !== null;) {
          a = Al;
          var e = a.sibling,
            n = a.return;
          if ((G2(a), a === u)) {
            Al = null;
            break l;
          }
          if (e !== null) {
            ((e.return = n), (Al = e));
            break l;
          }
          Al = n;
        }
    }
  }
  var C3 = {
      getCacheForType: function (l) {
        var t = pl(Sl),
          u = t.data.get(l);
        return (u === void 0 && ((u = l()), t.data.set(l, u)), u);
      },
    },
    q3 = typeof WeakMap == "function" ? WeakMap : Map,
    F = 0,
    fl = null,
    Z = null,
    L = 0,
    I = 0,
    Pl = null,
    lu = !1,
    ca = !1,
    mc = !1,
    jt = 0,
    hl = 0,
    tu = 0,
    Nu = 0,
    rc = 0,
    st = 0,
    ia = 0,
    ue = null,
    Zl = null,
    gc = !1,
    Sc = 0,
    yn = 1 / 0,
    hn = null,
    uu = null,
    _l = 0,
    au = null,
    sa = null,
    va = 0,
    bc = 0,
    Tc = null,
    $2 = null,
    ae = 0,
    Ec = null;
  function lt() {
    if ((F & 2) !== 0 && L !== 0) return L & -L;
    if (S.T !== null) {
      var l = Fu;
      return l !== 0 ? l : Uc();
    }
    return di();
  }
  function k2() {
    st === 0 && (st = (L & 536870912) === 0 || k ? ci() : 536870912);
    var l = it.current;
    return (l !== null && (l.flags |= 32), st);
  }
  function tt(l, t, u) {
    (((l === fl && (I === 2 || I === 9)) || l.cancelPendingCommit !== null) &&
      (da(l, 0), eu(l, L, st, !1)),
      Ea(l, u),
      ((F & 2) === 0 || l !== fl) &&
        (l === fl && ((F & 2) === 0 && (Nu |= u), hl === 4 && eu(l, L, st, !1)),
        At(l)));
  }
  function F2(l, t, u) {
    if ((F & 6) !== 0) throw Error(r(327));
    var a = (!u && (t & 124) === 0 && (t & l.expiredLanes) === 0) || Ta(l, t),
      e = a ? B3(l, t) : Oc(l, t, !0),
      n = a;
    do {
      if (e === 0) {
        ca && !a && eu(l, t, 0, !1);
        break;
      } else {
        if (((u = l.current.alternate), n && !Y3(u))) {
          ((e = Oc(l, t, !1)), (n = !1));
          continue;
        }
        if (e === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var f = 0;
          else
            ((f = l.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0));
          if (f !== 0) {
            t = f;
            l: {
              var c = l;
              e = ue;
              var i = c.current.memoizedState.isDehydrated;
              if ((i && (da(c, f).flags |= 256), (f = Oc(c, f, !1)), f !== 2)) {
                if (mc && !i) {
                  ((c.errorRecoveryDisabledLanes |= n), (Nu |= n), (e = 4));
                  break l;
                }
                ((n = Zl),
                  (Zl = e),
                  n !== null &&
                    (Zl === null ? (Zl = n) : Zl.push.apply(Zl, n)));
              }
              e = f;
            }
            if (((n = !1), e !== 2)) continue;
          }
        }
        if (e === 1) {
          (da(l, 0), eu(l, t, 0, !0));
          break;
        }
        l: {
          switch (((a = l), (n = e), n)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              eu(a, t, st, !lu);
              break l;
            case 2:
              Zl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((e = Sc + 300 - gt()), 10 < e)) {
            if ((eu(a, t, st, !lu), ze(a, 0, !0) !== 0)) break l;
            a.timeoutHandle = _1(
              I2.bind(null, a, u, Zl, hn, gc, t, st, Nu, ia, lu, n, 2, -0, 0),
              e,
            );
            break l;
          }
          I2(a, u, Zl, hn, gc, t, st, Nu, ia, lu, n, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    At(l);
  }
  function I2(l, t, u, a, e, n, f, c, i, h, g, T, o, m) {
    if (
      ((l.timeoutHandle = -1),
      (T = t.subtreeFlags),
      (T & 8192 || (T & 16785408) === 16785408) &&
        ((ve = { stylesheets: null, count: 0, unsuspend: rv }),
        K2(t),
        (T = Sv()),
        T !== null))
    ) {
      ((l.cancelPendingCommit = T(
        n1.bind(null, l, t, n, u, a, e, f, c, i, g, 1, o, m),
      )),
        eu(l, n, f, !h));
      return;
    }
    n1(l, t, n, u, a, e, f, c, i);
  }
  function Y3(l) {
    for (var t = l; ;) {
      var u = t.tag;
      if (
        (u === 0 || u === 11 || u === 15) &&
        t.flags & 16384 &&
        ((u = t.updateQueue), u !== null && ((u = u.stores), u !== null))
      )
        for (var a = 0; a < u.length; a++) {
          var e = u[a],
            n = e.getSnapshot;
          e = e.value;
          try {
            if (!$l(n(), e)) return !1;
          } catch {
            return !1;
          }
        }
      if (((u = t.child), t.subtreeFlags & 16384 && u !== null))
        ((u.return = t), (t = u));
      else {
        if (t === l) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function eu(l, t, u, a) {
    ((t &= ~rc),
      (t &= ~Nu),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      a && (l.warmLanes |= t),
      (a = l.expirationTimes));
    for (var e = t; 0 < e;) {
      var n = 31 - Wl(e),
        f = 1 << n;
      ((a[n] = -1), (e &= ~f));
    }
    u !== 0 && si(l, u, t);
  }
  function on() {
    return (F & 6) === 0 ? (ee(0), !1) : !0;
  }
  function Ac() {
    if (Z !== null) {
      if (I === 0) var l = Z.return;
      else ((l = Z), (Nt = Ou = null), Gf(l), (aa = null), (Wa = 0), (l = Z));
      for (; l !== null;) (H2(l.alternate, l), (l = l.return));
      Z = null;
    }
  }
  function da(l, t) {
    var u = l.timeoutHandle;
    (u !== -1 && ((l.timeoutHandle = -1), P3(u)),
      (u = l.cancelPendingCommit),
      u !== null && ((l.cancelPendingCommit = null), u()),
      Ac(),
      (fl = l),
      (Z = u = Dt(l.current, null)),
      (L = t),
      (I = 0),
      (Pl = null),
      (lu = !1),
      (ca = Ta(l, t)),
      (mc = !1),
      (ia = st = rc = Nu = tu = hl = 0),
      (Zl = ue = null),
      (gc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a;) {
        var e = 31 - Wl(a),
          n = 1 << e;
        ((t |= l[e]), (a &= ~n));
      }
    return ((jt = t), Ye(), u);
  }
  function P2(l, t) {
    ((X = null),
      (S.H = ln),
      t === Ga || t === Le
        ? ((t = r0()), (I = 3))
        : t === h0
          ? ((t = r0()), (I = 4))
          : (I =
              t === g2
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Pl = t),
      Z === null && ((hl = 1), nn(l, et(t, l.current))));
  }
  function l1() {
    var l = S.H;
    return ((S.H = ln), l === null ? ln : l);
  }
  function t1() {
    var l = S.A;
    return ((S.A = C3), l);
  }
  function zc() {
    ((hl = 4),
      lu || ((L & 4194048) !== L && it.current !== null) || (ca = !0),
      ((tu & 134217727) === 0 && (Nu & 134217727) === 0) ||
        fl === null ||
        eu(fl, L, st, !1));
  }
  function Oc(l, t, u) {
    var a = F;
    F |= 2;
    var e = l1(),
      n = t1();
    ((fl !== l || L !== t) && ((hn = null), da(l, t)), (t = !1));
    var f = hl;
    l: do
      try {
        if (I !== 0 && Z !== null) {
          var c = Z,
            i = Pl;
          switch (I) {
            case 8:
              (Ac(), (f = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              it.current === null && (t = !0);
              var h = I;
              if (((I = 0), (Pl = null), ya(l, c, i, h), u && ca)) {
                f = 0;
                break l;
              }
              break;
            default:
              ((h = I), (I = 0), (Pl = null), ya(l, c, i, h));
          }
        }
        (x3(), (f = hl));
        break;
      } catch (g) {
        P2(l, g);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Nt = Ou = null),
      (F = a),
      (S.H = e),
      (S.A = n),
      Z === null && ((fl = null), (L = 0), Ye()),
      f
    );
  }
  function x3() {
    for (; Z !== null;) u1(Z);
  }
  function B3(l, t) {
    var u = F;
    F |= 2;
    var a = l1(),
      e = t1();
    fl !== l || L !== t
      ? ((hn = null), (yn = gt() + 500), da(l, t))
      : (ca = Ta(l, t));
    l: do
      try {
        if (I !== 0 && Z !== null) {
          t = Z;
          var n = Pl;
          t: switch (I) {
            case 1:
              ((I = 0), (Pl = null), ya(l, t, n, 1));
              break;
            case 2:
            case 9:
              if (o0(n)) {
                ((I = 0), (Pl = null), a1(t));
                break;
              }
              ((t = function () {
                ((I !== 2 && I !== 9) || fl !== l || (I = 7), At(l));
              }),
                n.then(t, t));
              break l;
            case 3:
              I = 7;
              break l;
            case 4:
              I = 5;
              break l;
            case 7:
              o0(n)
                ? ((I = 0), (Pl = null), a1(t))
                : ((I = 0), (Pl = null), ya(l, t, n, 7));
              break;
            case 5:
              var f = null;
              switch (Z.tag) {
                case 26:
                  f = Z.memoizedState;
                case 5:
                case 27:
                  var c = Z;
                  if (!f || j1(f)) {
                    ((I = 0), (Pl = null));
                    var i = c.sibling;
                    if (i !== null) Z = i;
                    else {
                      var h = c.return;
                      h !== null ? ((Z = h), mn(h)) : (Z = null);
                    }
                    break t;
                  }
              }
              ((I = 0), (Pl = null), ya(l, t, n, 5));
              break;
            case 6:
              ((I = 0), (Pl = null), ya(l, t, n, 6));
              break;
            case 8:
              (Ac(), (hl = 6));
              break l;
            default:
              throw Error(r(462));
          }
        }
        j3();
        break;
      } catch (g) {
        P2(l, g);
      }
    while (!0);
    return (
      (Nt = Ou = null),
      (S.H = a),
      (S.A = e),
      (F = u),
      Z !== null ? 0 : ((fl = null), (L = 0), Ye(), hl)
    );
  }
  function j3() {
    for (; Z !== null && !fs();) u1(Z);
  }
  function u1(l) {
    var t = R2(l.alternate, l, jt);
    ((l.memoizedProps = l.pendingProps), t === null ? mn(l) : (Z = t));
  }
  function a1(l) {
    var t = l,
      u = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = z2(u, t, t.pendingProps, t.type, void 0, L);
        break;
      case 11:
        t = z2(u, t, t.pendingProps, t.type.render, t.ref, L);
        break;
      case 5:
        Gf(t);
      default:
        (H2(u, t), (t = Z = e0(t, jt)), (t = R2(u, t, jt)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? mn(l) : (Z = t));
  }
  function ya(l, t, u, a) {
    ((Nt = Ou = null), Gf(t), (aa = null), (Wa = 0));
    var e = t.return;
    try {
      if (D3(l, e, t, u, L)) {
        ((hl = 1), nn(l, et(u, l.current)), (Z = null));
        return;
      }
    } catch (n) {
      if (e !== null) throw ((Z = e), n);
      ((hl = 1), nn(l, et(u, l.current)), (Z = null));
      return;
    }
    t.flags & 32768
      ? (k || a === 1
          ? (l = !0)
          : ca || (L & 536870912) !== 0
            ? (l = !1)
            : ((lu = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = it.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        e1(t, l))
      : mn(t);
  }
  function mn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        e1(t, lu);
        return;
      }
      l = t.return;
      var u = R3(t.alternate, t, jt);
      if (u !== null) {
        Z = u;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Z = t;
        return;
      }
      Z = t = l;
    } while (t !== null);
    hl === 0 && (hl = 5);
  }
  function e1(l, t) {
    do {
      var u = N3(l.alternate, l);
      if (u !== null) {
        ((u.flags &= 32767), (Z = u));
        return;
      }
      if (
        ((u = l.return),
        u !== null &&
          ((u.flags |= 32768), (u.subtreeFlags = 0), (u.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        Z = l;
        return;
      }
      Z = l = u;
    } while (l !== null);
    ((hl = 6), (Z = null));
  }
  function n1(l, t, u, a, e, n, f, c, i) {
    l.cancelPendingCommit = null;
    do rn();
    while (_l !== 0);
    if ((F & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === l.current) throw Error(r(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= of),
        rs(l, u, n, f, c, i),
        l === fl && ((Z = fl = null), (L = 0)),
        (sa = t),
        (au = l),
        (va = u),
        (bc = n),
        (Tc = e),
        ($2 = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            Z3(Te, function () {
              return (v1(), null);
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = S.T), (S.T = null), (e = O.p), (O.p = 2), (f = F), (F |= 4));
        try {
          H3(l, t, u);
        } finally {
          ((F = f), (O.p = e), (S.T = a));
        }
      }
      ((_l = 1), f1(), c1(), i1());
    }
  }
  function f1() {
    if (_l === 1) {
      _l = 0;
      var l = au,
        t = sa,
        u = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || u) {
        ((u = S.T), (S.T = null));
        var a = O.p;
        O.p = 2;
        var e = F;
        F |= 4;
        try {
          Z2(t, l);
          var n = xc,
            f = Wi(l.containerInfo),
            c = n.focusedElem,
            i = n.selectionRange;
          if (
            f !== c &&
            c &&
            c.ownerDocument &&
            wi(c.ownerDocument.documentElement, c)
          ) {
            if (i !== null && sf(c)) {
              var h = i.start,
                g = i.end;
              if ((g === void 0 && (g = h), "selectionStart" in c))
                ((c.selectionStart = h),
                  (c.selectionEnd = Math.min(g, c.value.length)));
              else {
                var T = c.ownerDocument || document,
                  o = (T && T.defaultView) || window;
                if (o.getSelection) {
                  var m = o.getSelection(),
                    x = c.textContent.length,
                    C = Math.min(i.start, x),
                    tl = i.end === void 0 ? C : Math.min(i.end, x);
                  !m.extend && C > tl && ((f = tl), (tl = C), (C = f));
                  var d = Ji(c, C),
                    v = Ji(c, tl);
                  if (
                    d &&
                    v &&
                    (m.rangeCount !== 1 ||
                      m.anchorNode !== d.node ||
                      m.anchorOffset !== d.offset ||
                      m.focusNode !== v.node ||
                      m.focusOffset !== v.offset)
                  ) {
                    var y = T.createRange();
                    (y.setStart(d.node, d.offset),
                      m.removeAllRanges(),
                      C > tl
                        ? (m.addRange(y), m.extend(v.node, v.offset))
                        : (y.setEnd(v.node, v.offset), m.addRange(y)));
                  }
                }
              }
            }
            for (T = [], m = c; (m = m.parentNode);)
              m.nodeType === 1 &&
                T.push({ element: m, left: m.scrollLeft, top: m.scrollTop });
            for (
              typeof c.focus == "function" && c.focus(), c = 0;
              c < T.length;
              c++
            ) {
              var b = T[c];
              ((b.element.scrollLeft = b.left), (b.element.scrollTop = b.top));
            }
          }
          ((Un = !!Yc), (xc = Yc = null));
        } finally {
          ((F = e), (O.p = a), (S.T = u));
        }
      }
      ((l.current = t), (_l = 2));
    }
  }
  function c1() {
    if (_l === 2) {
      _l = 0;
      var l = au,
        t = sa,
        u = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || u) {
        ((u = S.T), (S.T = null));
        var a = O.p;
        O.p = 2;
        var e = F;
        F |= 4;
        try {
          j2(l, t.alternate, t);
        } finally {
          ((F = e), (O.p = a), (S.T = u));
        }
      }
      _l = 3;
    }
  }
  function i1() {
    if (_l === 4 || _l === 3) {
      ((_l = 0), cs());
      var l = au,
        t = sa,
        u = va,
        a = $2;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (_l = 5)
        : ((_l = 0), (sa = au = null), s1(l, l.pendingLanes));
      var e = l.pendingLanes;
      if (
        (e === 0 && (uu = null),
        Qn(u),
        (t = t.stateNode),
        wl && typeof wl.onCommitFiberRoot == "function")
      )
        try {
          wl.onCommitFiberRoot(ba, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = S.T), (e = O.p), (O.p = 2), (S.T = null));
        try {
          for (var n = l.onRecoverableError, f = 0; f < a.length; f++) {
            var c = a[f];
            n(c.value, { componentStack: c.stack });
          }
        } finally {
          ((S.T = t), (O.p = e));
        }
      }
      ((va & 3) !== 0 && rn(),
        At(l),
        (e = l.pendingLanes),
        (u & 4194090) !== 0 && (e & 42) !== 0
          ? l === Ec
            ? ae++
            : ((ae = 0), (Ec = l))
          : (ae = 0),
        ee(0));
    }
  }
  function s1(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Ba(t)));
  }
  function rn(l) {
    return (f1(), c1(), i1(), v1());
  }
  function v1() {
    if (_l !== 5) return !1;
    var l = au,
      t = bc;
    bc = 0;
    var u = Qn(va),
      a = S.T,
      e = O.p;
    try {
      ((O.p = 32 > u ? 32 : u), (S.T = null), (u = Tc), (Tc = null));
      var n = au,
        f = va;
      if (((_l = 0), (sa = au = null), (va = 0), (F & 6) !== 0))
        throw Error(r(331));
      var c = F;
      if (
        ((F |= 4),
        w2(n.current),
        L2(n, n.current, f, u),
        (F = c),
        ee(0, !1),
        wl && typeof wl.onPostCommitFiberRoot == "function")
      )
        try {
          wl.onPostCommitFiberRoot(ba, n);
        } catch {}
      return !0;
    } finally {
      ((O.p = e), (S.T = a), s1(l, t));
    }
  }
  function d1(l, t, u) {
    ((t = et(u, t)),
      (t = Pf(l.stateNode, t, 2)),
      (l = wt(l, t, 2)),
      l !== null && (Ea(l, 2), At(l)));
  }
  function el(l, t, u) {
    if (l.tag === 3) d1(l, l, u);
    else
      for (; t !== null;) {
        if (t.tag === 3) {
          d1(t, l, u);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (uu === null || !uu.has(a)))
          ) {
            ((l = et(u, l)),
              (u = m2(2)),
              (a = wt(t, u, 2)),
              a !== null && (r2(u, a, t, l), Ea(a, 2), At(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Mc(l, t, u) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new q3();
      var e = new Set();
      a.set(t, e);
    } else ((e = a.get(t)), e === void 0 && ((e = new Set()), a.set(t, e)));
    e.has(u) ||
      ((mc = !0), e.add(u), (l = G3.bind(null, l, t, u)), t.then(l, l));
  }
  function G3(l, t, u) {
    var a = l.pingCache;
    (a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & u),
      (l.warmLanes &= ~u),
      fl === l &&
        (L & u) === u &&
        (hl === 4 || (hl === 3 && (L & 62914560) === L && 300 > gt() - Sc)
          ? (F & 2) === 0 && da(l, 0)
          : (rc |= u),
        ia === L && (ia = 0)),
      At(l));
  }
  function y1(l, t) {
    (t === 0 && (t = ii()), (l = wu(l, t)), l !== null && (Ea(l, t), At(l)));
  }
  function X3(l) {
    var t = l.memoizedState,
      u = 0;
    (t !== null && (u = t.retryLane), y1(l, u));
  }
  function Q3(l, t) {
    var u = 0;
    switch (l.tag) {
      case 13:
        var a = l.stateNode,
          e = l.memoizedState;
        e !== null && (u = e.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (a !== null && a.delete(t), y1(l, u));
  }
  function Z3(l, t) {
    return Bn(l, t);
  }
  var gn = null,
    ha = null,
    _c = !1,
    Sn = !1,
    Dc = !1,
    Hu = 0;
  function At(l) {
    (l !== ha &&
      l.next === null &&
      (ha === null ? (gn = ha = l) : (ha = ha.next = l)),
      (Sn = !0),
      _c || ((_c = !0), L3()));
  }
  function ee(l, t) {
    if (!Dc && Sn) {
      Dc = !0;
      do
        for (var u = !1, a = gn; a !== null;) {
          if (l !== 0) {
            var e = a.pendingLanes;
            if (e === 0) var n = 0;
            else {
              var f = a.suspendedLanes,
                c = a.pingedLanes;
              ((n = (1 << (31 - Wl(42 | l) + 1)) - 1),
                (n &= e & ~(f & ~c)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((u = !0), r1(a, n));
          } else
            ((n = L),
              (n = ze(
                a,
                a === fl ? n : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Ta(a, n) || ((u = !0), r1(a, n)));
          a = a.next;
        }
      while (u);
      Dc = !1;
    }
  }
  function V3() {
    h1();
  }
  function h1() {
    Sn = _c = !1;
    var l = 0;
    Hu !== 0 && (I3() && (l = Hu), (Hu = 0));
    for (var t = gt(), u = null, a = gn; a !== null;) {
      var e = a.next,
        n = o1(a, t);
      (n === 0
        ? ((a.next = null),
          u === null ? (gn = e) : (u.next = e),
          e === null && (ha = u))
        : ((u = a), (l !== 0 || (n & 3) !== 0) && (Sn = !0)),
        (a = e));
    }
    ee(l);
  }
  function o1(l, t) {
    for (
      var u = l.suspendedLanes,
        a = l.pingedLanes,
        e = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;
    ) {
      var f = 31 - Wl(n),
        c = 1 << f,
        i = e[f];
      (i === -1
        ? ((c & u) === 0 || (c & a) !== 0) && (e[f] = ms(c, t))
        : i <= t && (l.expiredLanes |= c),
        (n &= ~c));
    }
    if (
      ((t = fl),
      (u = L),
      (u = ze(
        l,
        l === t ? u : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      (a = l.callbackNode),
      u === 0 ||
        (l === t && (I === 2 || I === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && jn(a),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((u & 3) === 0 || Ta(l, u)) {
      if (((t = u & -u), t === l.callbackPriority)) return t;
      switch ((a !== null && jn(a), Qn(u))) {
        case 2:
        case 8:
          u = ni;
          break;
        case 32:
          u = Te;
          break;
        case 268435456:
          u = fi;
          break;
        default:
          u = Te;
      }
      return (
        (a = m1.bind(null, l)),
        (u = Bn(u, a)),
        (l.callbackPriority = t),
        (l.callbackNode = u),
        t
      );
    }
    return (
      a !== null && a !== null && jn(a),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function m1(l, t) {
    if (_l !== 0 && _l !== 5)
      return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var u = l.callbackNode;
    if (rn() && l.callbackNode !== u) return null;
    var a = L;
    return (
      (a = ze(
        l,
        l === fl ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (F2(l, a, t),
          o1(l, gt()),
          l.callbackNode != null && l.callbackNode === u
            ? m1.bind(null, l)
            : null)
    );
  }
  function r1(l, t) {
    if (rn()) return null;
    F2(l, t, !0);
  }
  function L3() {
    lv(function () {
      (F & 6) !== 0 ? Bn(ei, V3) : h1();
    });
  }
  function Uc() {
    return (Hu === 0 && (Hu = ci()), Hu);
  }
  function g1(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : Ue("" + l);
  }
  function S1(l, t) {
    var u = t.ownerDocument.createElement("input");
    return (
      (u.name = t.name),
      (u.value = t.value),
      l.id && u.setAttribute("form", l.id),
      t.parentNode.insertBefore(u, t),
      (l = new FormData(l)),
      u.parentNode.removeChild(u),
      l
    );
  }
  function K3(l, t, u, a, e) {
    if (t === "submit" && u && u.stateNode === e) {
      var n = g1((e[jl] || null).action),
        f = a.submitter;
      f &&
        ((t = (t = f[jl] || null)
          ? g1(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((n = t), (f = null)));
      var c = new pe("action", "action", null, a, e);
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Hu !== 0) {
                  var i = f ? S1(e, f) : new FormData(e);
                  Wf(
                    u,
                    { pending: !0, data: i, method: e.method, action: n },
                    null,
                    i,
                  );
                }
              } else
                typeof n == "function" &&
                  (c.preventDefault(),
                  (i = f ? S1(e, f) : new FormData(e)),
                  Wf(
                    u,
                    { pending: !0, data: i, method: e.method, action: n },
                    n,
                    i,
                  ));
            },
            currentTarget: e,
          },
        ],
      });
    }
  }
  for (var Rc = 0; Rc < hf.length; Rc++) {
    var Nc = hf[Rc],
      J3 = Nc.toLowerCase(),
      w3 = Nc[0].toUpperCase() + Nc.slice(1);
    ht(J3, "on" + w3);
  }
  (ht(Fi, "onAnimationEnd"),
    ht(Ii, "onAnimationIteration"),
    ht(Pi, "onAnimationStart"),
    ht("dblclick", "onDoubleClick"),
    ht("focusin", "onFocus"),
    ht("focusout", "onBlur"),
    ht(v3, "onTransitionRun"),
    ht(d3, "onTransitionStart"),
    ht(y3, "onTransitionCancel"),
    ht(l0, "onTransitionEnd"),
    Bu("onMouseEnter", ["mouseout", "mouseover"]),
    Bu("onMouseLeave", ["mouseout", "mouseover"]),
    Bu("onPointerEnter", ["pointerout", "pointerover"]),
    Bu("onPointerLeave", ["pointerout", "pointerover"]),
    mu(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    mu(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    mu("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    mu(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    mu(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    mu(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var ne =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    W3 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(ne),
    );
  function b1(l, t) {
    t = (t & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var a = l[u],
        e = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var c = a[f],
              i = c.instance,
              h = c.currentTarget;
            if (((c = c.listener), i !== n && e.isPropagationStopped()))
              break l;
            ((n = c), (e.currentTarget = h));
            try {
              n(e);
            } catch (g) {
              en(g);
            }
            ((e.currentTarget = null), (n = i));
          }
        else
          for (f = 0; f < a.length; f++) {
            if (
              ((c = a[f]),
              (i = c.instance),
              (h = c.currentTarget),
              (c = c.listener),
              i !== n && e.isPropagationStopped())
            )
              break l;
            ((n = c), (e.currentTarget = h));
            try {
              n(e);
            } catch (g) {
              en(g);
            }
            ((e.currentTarget = null), (n = i));
          }
      }
    }
  }
  function V(l, t) {
    var u = t[Zn];
    u === void 0 && (u = t[Zn] = new Set());
    var a = l + "__bubble";
    u.has(a) || (T1(t, l, 2, !1), u.add(a));
  }
  function Hc(l, t, u) {
    var a = 0;
    (t && (a |= 4), T1(u, l, a, t));
  }
  var bn = "_reactListening" + Math.random().toString(36).slice(2);
  function pc(l) {
    if (!l[bn]) {
      ((l[bn] = !0),
        hi.forEach(function (u) {
          u !== "selectionchange" && (W3.has(u) || Hc(u, !1, l), Hc(u, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[bn] || ((t[bn] = !0), Hc("selectionchange", !1, t));
    }
  }
  function T1(l, t, u, a) {
    switch (L1(t)) {
      case 2:
        var e = Ev;
        break;
      case 8:
        e = Av;
        break;
      default:
        e = Jc;
    }
    ((u = e.bind(null, t, u, l)),
      (e = void 0),
      !Pn ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (e = !0),
      a
        ? e !== void 0
          ? l.addEventListener(t, u, { capture: !0, passive: e })
          : l.addEventListener(t, u, !0)
        : e !== void 0
          ? l.addEventListener(t, u, { passive: e })
          : l.addEventListener(t, u, !1));
  }
  function Cc(l, t, u, a, e) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (;;) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var c = a.stateNode.containerInfo;
          if (c === e) break;
          if (f === 4)
            for (f = a.return; f !== null;) {
              var i = f.tag;
              if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
                return;
              f = f.return;
            }
          for (; c !== null;) {
            if (((f = qu(c)), f === null)) return;
            if (((i = f.tag), i === 5 || i === 6 || i === 26 || i === 27)) {
              a = n = f;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Di(function () {
      var h = n,
        g = Fn(u),
        T = [];
      l: {
        var o = t0.get(l);
        if (o !== void 0) {
          var m = pe,
            x = l;
          switch (l) {
            case "keypress":
              if (Ne(u) === 0) break l;
            case "keydown":
            case "keyup":
              m = Zs;
              break;
            case "focusin":
              ((x = "focus"), (m = af));
              break;
            case "focusout":
              ((x = "blur"), (m = af));
              break;
            case "beforeblur":
            case "afterblur":
              m = af;
              break;
            case "click":
              if (u.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              m = Ni;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              m = Ns;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              m = Ks;
              break;
            case Fi:
            case Ii:
            case Pi:
              m = Cs;
              break;
            case l0:
              m = ws;
              break;
            case "scroll":
            case "scrollend":
              m = Us;
              break;
            case "wheel":
              m = $s;
              break;
            case "copy":
            case "cut":
            case "paste":
              m = Ys;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              m = pi;
              break;
            case "toggle":
            case "beforetoggle":
              m = Fs;
          }
          var C = (t & 4) !== 0,
            tl = !C && (l === "scroll" || l === "scrollend"),
            d = C ? (o !== null ? o + "Capture" : null) : o;
          C = [];
          for (var v = h, y; v !== null;) {
            var b = v;
            if (
              ((y = b.stateNode),
              (b = b.tag),
              (b !== 5 && b !== 26 && b !== 27) ||
                y === null ||
                d === null ||
                ((b = Oa(v, d)), b != null && C.push(fe(v, b, y))),
              tl)
            )
              break;
            v = v.return;
          }
          0 < C.length &&
            ((o = new m(o, x, null, u, g)), T.push({ event: o, listeners: C }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((o = l === "mouseover" || l === "pointerover"),
            (m = l === "mouseout" || l === "pointerout"),
            o &&
              u !== kn &&
              (x = u.relatedTarget || u.fromElement) &&
              (qu(x) || x[Cu]))
          )
            break l;
          if (
            (m || o) &&
            ((o =
              g.window === g
                ? g
                : (o = g.ownerDocument)
                  ? o.defaultView || o.parentWindow
                  : window),
            m
              ? ((x = u.relatedTarget || u.toElement),
                (m = h),
                (x = x ? qu(x) : null),
                x !== null &&
                  ((tl = K(x)),
                  (C = x.tag),
                  x !== tl || (C !== 5 && C !== 27 && C !== 6)) &&
                  (x = null))
              : ((m = null), (x = h)),
            m !== x)
          ) {
            if (
              ((C = Ni),
              (b = "onMouseLeave"),
              (d = "onMouseEnter"),
              (v = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((C = pi),
                (b = "onPointerLeave"),
                (d = "onPointerEnter"),
                (v = "pointer")),
              (tl = m == null ? o : za(m)),
              (y = x == null ? o : za(x)),
              (o = new C(b, v + "leave", m, u, g)),
              (o.target = tl),
              (o.relatedTarget = y),
              (b = null),
              qu(g) === h &&
                ((C = new C(d, v + "enter", x, u, g)),
                (C.target = y),
                (C.relatedTarget = tl),
                (b = C)),
              (tl = b),
              m && x)
            )
              t: {
                for (C = m, d = x, v = 0, y = C; y; y = oa(y)) v++;
                for (y = 0, b = d; b; b = oa(b)) y++;
                for (; 0 < v - y;) ((C = oa(C)), v--);
                for (; 0 < y - v;) ((d = oa(d)), y--);
                for (; v--;) {
                  if (C === d || (d !== null && C === d.alternate)) break t;
                  ((C = oa(C)), (d = oa(d)));
                }
                C = null;
              }
            else C = null;
            (m !== null && E1(T, o, m, C, !1),
              x !== null && tl !== null && E1(T, tl, x, C, !0));
          }
        }
        l: {
          if (
            ((o = h ? za(h) : window),
            (m = o.nodeName && o.nodeName.toLowerCase()),
            m === "select" || (m === "input" && o.type === "file"))
          )
            var D = Xi;
          else if (ji(o))
            if (Qi) D = c3;
            else {
              D = n3;
              var Q = e3;
            }
          else
            ((m = o.nodeName),
              !m ||
              m.toLowerCase() !== "input" ||
              (o.type !== "checkbox" && o.type !== "radio")
                ? h && $n(h.elementType) && (D = Xi)
                : (D = f3));
          if (D && (D = D(l, h))) {
            Gi(T, D, u, g);
            break l;
          }
          (Q && Q(l, o, h),
            l === "focusout" &&
              h &&
              o.type === "number" &&
              h.memoizedProps.value != null &&
              Wn(o, "number", o.value));
        }
        switch (((Q = h ? za(h) : window), l)) {
          case "focusin":
            (ji(Q) || Q.contentEditable === "true") &&
              ((Lu = Q), (vf = h), (pa = null));
            break;
          case "focusout":
            pa = vf = Lu = null;
            break;
          case "mousedown":
            df = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((df = !1), $i(T, u, g));
            break;
          case "selectionchange":
            if (s3) break;
          case "keydown":
          case "keyup":
            $i(T, u, g);
        }
        var N;
        if (nf)
          l: {
            switch (l) {
              case "compositionstart":
                var q = "onCompositionStart";
                break l;
              case "compositionend":
                q = "onCompositionEnd";
                break l;
              case "compositionupdate":
                q = "onCompositionUpdate";
                break l;
            }
            q = void 0;
          }
        else
          Vu
            ? xi(l, u) && (q = "onCompositionEnd")
            : l === "keydown" &&
              u.keyCode === 229 &&
              (q = "onCompositionStart");
        (q &&
          (Ci &&
            u.locale !== "ko" &&
            (Vu || q !== "onCompositionStart"
              ? q === "onCompositionEnd" && Vu && (N = Ui())
              : ((Vt = g),
                (lf = "value" in Vt ? Vt.value : Vt.textContent),
                (Vu = !0))),
          (Q = Tn(h, q)),
          0 < Q.length &&
            ((q = new Hi(q, l, null, u, g)),
            T.push({ event: q, listeners: Q }),
            N ? (q.data = N) : ((N = Bi(u)), N !== null && (q.data = N)))),
          (N = Ps ? l3(l, u) : t3(l, u)) &&
            ((q = Tn(h, "onBeforeInput")),
            0 < q.length &&
              ((Q = new Hi("onBeforeInput", "beforeinput", null, u, g)),
              T.push({ event: Q, listeners: q }),
              (Q.data = N))),
          K3(T, l, h, u, g));
      }
      b1(T, t);
    });
  }
  function fe(l, t, u) {
    return { instance: l, listener: t, currentTarget: u };
  }
  function Tn(l, t) {
    for (var u = t + "Capture", a = []; l !== null;) {
      var e = l,
        n = e.stateNode;
      if (
        ((e = e.tag),
        (e !== 5 && e !== 26 && e !== 27) ||
          n === null ||
          ((e = Oa(l, u)),
          e != null && a.unshift(fe(l, e, n)),
          (e = Oa(l, t)),
          e != null && a.push(fe(l, e, n))),
        l.tag === 3)
      )
        return a;
      l = l.return;
    }
    return [];
  }
  function oa(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function E1(l, t, u, a, e) {
    for (var n = t._reactName, f = []; u !== null && u !== a;) {
      var c = u,
        i = c.alternate,
        h = c.stateNode;
      if (((c = c.tag), i !== null && i === a)) break;
      ((c !== 5 && c !== 26 && c !== 27) ||
        h === null ||
        ((i = h),
        e
          ? ((h = Oa(u, n)), h != null && f.unshift(fe(u, h, i)))
          : e || ((h = Oa(u, n)), h != null && f.push(fe(u, h, i)))),
        (u = u.return));
    }
    f.length !== 0 && l.push({ event: t, listeners: f });
  }
  var $3 = /\r\n?/g,
    k3 = /\u0000|\uFFFD/g;
  function A1(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        $3,
        `
`,
      )
      .replace(k3, "");
  }
  function z1(l, t) {
    return ((t = A1(t)), A1(l) === t);
  }
  function En() {}
  function ll(l, t, u, a, e, n) {
    switch (u) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || Xu(l, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            Xu(l, "" + a);
        break;
      case "className":
        Me(l, "class", a);
        break;
      case "tabIndex":
        Me(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Me(l, u, a);
        break;
      case "style":
        Mi(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Me(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          l.removeAttribute(u);
          break;
        }
        ((a = Ue("" + a)), l.setAttribute(u, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (u === "formAction"
              ? (t !== "input" && ll(l, t, "name", e.name, e, null),
                ll(l, t, "formEncType", e.formEncType, e, null),
                ll(l, t, "formMethod", e.formMethod, e, null),
                ll(l, t, "formTarget", e.formTarget, e, null))
              : (ll(l, t, "encType", e.encType, e, null),
                ll(l, t, "method", e.method, e, null),
                ll(l, t, "target", e.target, e, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(u);
          break;
        }
        ((a = Ue("" + a)), l.setAttribute(u, a));
        break;
      case "onClick":
        a != null && (l.onclick = En);
        break;
      case "onScroll":
        a != null && V("scroll", l);
        break;
      case "onScrollEnd":
        a != null && V("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((u = a.__html), u != null)) {
            if (e.children != null) throw Error(r(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        ((u = Ue("" + a)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", u));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(u, "" + a)
          : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(u, "")
          : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        a === !0
          ? l.setAttribute(u, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? l.setAttribute(u, a)
            : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? l.setAttribute(u, a)
          : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? l.removeAttribute(u)
          : l.setAttribute(u, a);
        break;
      case "popover":
        (V("beforetoggle", l), V("toggle", l), Oe(l, "popover", a));
        break;
      case "xlinkActuate":
        Mt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Mt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Mt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Mt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Mt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Mt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Mt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Mt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Mt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Oe(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) ||
          (u[0] !== "o" && u[0] !== "O") ||
          (u[1] !== "n" && u[1] !== "N")) &&
          ((u = _s.get(u) || u), Oe(l, u, a));
    }
  }
  function qc(l, t, u, a, e, n) {
    switch (u) {
      case "style":
        Mi(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((u = a.__html), u != null)) {
            if (e.children != null) throw Error(r(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? Xu(l, a)
          : (typeof a == "number" || typeof a == "bigint") && Xu(l, "" + a);
        break;
      case "onScroll":
        a != null && V("scroll", l);
        break;
      case "onScrollEnd":
        a != null && V("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = En);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!oi.hasOwnProperty(u))
          l: {
            if (
              u[0] === "o" &&
              u[1] === "n" &&
              ((e = u.endsWith("Capture")),
              (t = u.slice(2, e ? u.length - 7 : void 0)),
              (n = l[jl] || null),
              (n = n != null ? n[u] : null),
              typeof n == "function" && l.removeEventListener(t, n, e),
              typeof a == "function")
            ) {
              (typeof n != "function" &&
                n !== null &&
                (u in l
                  ? (l[u] = null)
                  : l.hasAttribute(u) && l.removeAttribute(u)),
                l.addEventListener(t, a, e));
              break l;
            }
            u in l
              ? (l[u] = a)
              : a === !0
                ? l.setAttribute(u, "")
                : Oe(l, u, a);
          }
    }
  }
  function Dl(l, t, u) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (V("error", l), V("load", l));
        var a = !1,
          e = !1,
          n;
        for (n in u)
          if (u.hasOwnProperty(n)) {
            var f = u[n];
            if (f != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  e = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  ll(l, t, n, f, u, null);
              }
          }
        (e && ll(l, t, "srcSet", u.srcSet, u, null),
          a && ll(l, t, "src", u.src, u, null));
        return;
      case "input":
        V("invalid", l);
        var c = (n = f = e = null),
          i = null,
          h = null;
        for (a in u)
          if (u.hasOwnProperty(a)) {
            var g = u[a];
            if (g != null)
              switch (a) {
                case "name":
                  e = g;
                  break;
                case "type":
                  f = g;
                  break;
                case "checked":
                  i = g;
                  break;
                case "defaultChecked":
                  h = g;
                  break;
                case "value":
                  n = g;
                  break;
                case "defaultValue":
                  c = g;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (g != null) throw Error(r(137, t));
                  break;
                default:
                  ll(l, t, a, g, u, null);
              }
          }
        (Ei(l, n, c, i, h, f, e, !1), _e(l));
        return;
      case "select":
        (V("invalid", l), (a = f = n = null));
        for (e in u)
          if (u.hasOwnProperty(e) && ((c = u[e]), c != null))
            switch (e) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                f = c;
                break;
              case "multiple":
                a = c;
              default:
                ll(l, t, e, c, u, null);
            }
        ((t = n),
          (u = f),
          (l.multiple = !!a),
          t != null ? Gu(l, !!a, t, !1) : u != null && Gu(l, !!a, u, !0));
        return;
      case "textarea":
        (V("invalid", l), (n = e = a = null));
        for (f in u)
          if (u.hasOwnProperty(f) && ((c = u[f]), c != null))
            switch (f) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                e = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(r(91));
                break;
              default:
                ll(l, t, f, c, u, null);
            }
        (zi(l, a, e, n), _e(l));
        return;
      case "option":
        for (i in u)
          if (u.hasOwnProperty(i) && ((a = u[i]), a != null))
            switch (i) {
              case "selected":
                l.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                ll(l, t, i, a, u, null);
            }
        return;
      case "dialog":
        (V("beforetoggle", l), V("toggle", l), V("cancel", l), V("close", l));
        break;
      case "iframe":
      case "object":
        V("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ne.length; a++) V(ne[a], l);
        break;
      case "image":
        (V("error", l), V("load", l));
        break;
      case "details":
        V("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        (V("error", l), V("load", l));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (h in u)
          if (u.hasOwnProperty(h) && ((a = u[h]), a != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                ll(l, t, h, a, u, null);
            }
        return;
      default:
        if ($n(t)) {
          for (g in u)
            u.hasOwnProperty(g) &&
              ((a = u[g]), a !== void 0 && qc(l, t, g, a, u, void 0));
          return;
        }
    }
    for (c in u)
      u.hasOwnProperty(c) && ((a = u[c]), a != null && ll(l, t, c, a, u, null));
  }
  function F3(l, t, u, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var e = null,
          n = null,
          f = null,
          c = null,
          i = null,
          h = null,
          g = null;
        for (m in u) {
          var T = u[m];
          if (u.hasOwnProperty(m) && T != null)
            switch (m) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                i = T;
              default:
                a.hasOwnProperty(m) || ll(l, t, m, null, a, T);
            }
        }
        for (var o in a) {
          var m = a[o];
          if (((T = u[o]), a.hasOwnProperty(o) && (m != null || T != null)))
            switch (o) {
              case "type":
                n = m;
                break;
              case "name":
                e = m;
                break;
              case "checked":
                h = m;
                break;
              case "defaultChecked":
                g = m;
                break;
              case "value":
                f = m;
                break;
              case "defaultValue":
                c = m;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(r(137, t));
                break;
              default:
                m !== T && ll(l, t, o, m, a, T);
            }
        }
        wn(l, f, c, i, h, g, n, e);
        return;
      case "select":
        m = f = c = o = null;
        for (n in u)
          if (((i = u[n]), u.hasOwnProperty(n) && i != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                m = i;
              default:
                a.hasOwnProperty(n) || ll(l, t, n, null, a, i);
            }
        for (e in a)
          if (
            ((n = a[e]),
            (i = u[e]),
            a.hasOwnProperty(e) && (n != null || i != null))
          )
            switch (e) {
              case "value":
                o = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                f = n;
              default:
                n !== i && ll(l, t, e, n, a, i);
            }
        ((t = c),
          (u = f),
          (a = m),
          o != null
            ? Gu(l, !!u, o, !1)
            : !!a != !!u &&
              (t != null ? Gu(l, !!u, t, !0) : Gu(l, !!u, u ? [] : "", !1)));
        return;
      case "textarea":
        m = o = null;
        for (c in u)
          if (
            ((e = u[c]),
            u.hasOwnProperty(c) && e != null && !a.hasOwnProperty(c))
          )
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                ll(l, t, c, null, a, e);
            }
        for (f in a)
          if (
            ((e = a[f]),
            (n = u[f]),
            a.hasOwnProperty(f) && (e != null || n != null))
          )
            switch (f) {
              case "value":
                o = e;
                break;
              case "defaultValue":
                m = e;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (e != null) throw Error(r(91));
                break;
              default:
                e !== n && ll(l, t, f, e, a, n);
            }
        Ai(l, o, m);
        return;
      case "option":
        for (var x in u)
          if (
            ((o = u[x]),
            u.hasOwnProperty(x) && o != null && !a.hasOwnProperty(x))
          )
            switch (x) {
              case "selected":
                l.selected = !1;
                break;
              default:
                ll(l, t, x, null, a, o);
            }
        for (i in a)
          if (
            ((o = a[i]),
            (m = u[i]),
            a.hasOwnProperty(i) && o !== m && (o != null || m != null))
          )
            switch (i) {
              case "selected":
                l.selected =
                  o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                ll(l, t, i, o, a, m);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var C in u)
          ((o = u[C]),
            u.hasOwnProperty(C) &&
              o != null &&
              !a.hasOwnProperty(C) &&
              ll(l, t, C, null, a, o));
        for (h in a)
          if (
            ((o = a[h]),
            (m = u[h]),
            a.hasOwnProperty(h) && o !== m && (o != null || m != null))
          )
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(r(137, t));
                break;
              default:
                ll(l, t, h, o, a, m);
            }
        return;
      default:
        if ($n(t)) {
          for (var tl in u)
            ((o = u[tl]),
              u.hasOwnProperty(tl) &&
                o !== void 0 &&
                !a.hasOwnProperty(tl) &&
                qc(l, t, tl, void 0, a, o));
          for (g in a)
            ((o = a[g]),
              (m = u[g]),
              !a.hasOwnProperty(g) ||
                o === m ||
                (o === void 0 && m === void 0) ||
                qc(l, t, g, o, a, m));
          return;
        }
    }
    for (var d in u)
      ((o = u[d]),
        u.hasOwnProperty(d) &&
          o != null &&
          !a.hasOwnProperty(d) &&
          ll(l, t, d, null, a, o));
    for (T in a)
      ((o = a[T]),
        (m = u[T]),
        !a.hasOwnProperty(T) ||
          o === m ||
          (o == null && m == null) ||
          ll(l, t, T, o, a, m));
  }
  var Yc = null,
    xc = null;
  function An(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function O1(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function M1(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Bc(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var jc = null;
  function I3() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === jc
        ? !1
        : ((jc = l), !0)
      : ((jc = null), !1);
  }
  var _1 = typeof setTimeout == "function" ? setTimeout : void 0,
    P3 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    D1 = typeof Promise == "function" ? Promise : void 0,
    lv =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof D1 < "u"
          ? function (l) {
              return D1.resolve(null).then(l).catch(tv);
            }
          : _1;
  function tv(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function nu(l) {
    return l === "head";
  }
  function U1(l, t) {
    var u = t,
      a = 0,
      e = 0;
    do {
      var n = u.nextSibling;
      if ((l.removeChild(u), n && n.nodeType === 8))
        if (((u = n.data), u === "/$")) {
          if (0 < a && 8 > a) {
            u = a;
            var f = l.ownerDocument;
            if ((u & 1 && ce(f.documentElement), u & 2 && ce(f.body), u & 4))
              for (u = f.head, ce(u), f = u.firstChild; f;) {
                var c = f.nextSibling,
                  i = f.nodeName;
                (f[Aa] ||
                  i === "SCRIPT" ||
                  i === "STYLE" ||
                  (i === "LINK" && f.rel.toLowerCase() === "stylesheet") ||
                  u.removeChild(f),
                  (f = c));
              }
          }
          if (e === 0) {
            (l.removeChild(n), me(t));
            return;
          }
          e--;
        } else
          u === "$" || u === "$?" || u === "$!"
            ? e++
            : (a = u.charCodeAt(0) - 48);
      else a = 0;
      u = n;
    } while (u);
    me(t);
  }
  function Gc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var u = t;
      switch (((t = t.nextSibling), u.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Gc(u), Vn(u));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function uv(l, t, u, a) {
    for (; l.nodeType === 1;) {
      var e = u;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Aa])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== e.rel ||
                l.getAttribute("href") !==
                  (e.href == null || e.href === "" ? null : e.href) ||
                l.getAttribute("crossorigin") !==
                  (e.crossOrigin == null ? null : e.crossOrigin) ||
                l.getAttribute("title") !== (e.title == null ? null : e.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (e.src == null ? null : e.src) ||
                  l.getAttribute("type") !== (e.type == null ? null : e.type) ||
                  l.getAttribute("crossorigin") !==
                    (e.crossOrigin == null ? null : e.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = e.name == null ? null : "" + e.name;
        if (e.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = mt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function av(l, t, u) {
    if (t === "") return null;
    for (; l.nodeType !== 3;)
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !u) ||
        ((l = mt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Xc(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState === "complete")
    );
  }
  function ev(l, t) {
    var u = l.ownerDocument;
    if (l.data !== "$?" || u.readyState === "complete") t();
    else {
      var a = function () {
        (t(), u.removeEventListener("DOMContentLoaded", a));
      };
      (u.addEventListener("DOMContentLoaded", a), (l._reactRetry = a));
    }
  }
  function mt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return l;
  }
  var Qc = null;
  function R1(l) {
    l = l.previousSibling;
    for (var t = 0; l;) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (t === 0) return l;
          t--;
        } else u === "/$" && t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function N1(l, t, u) {
    switch (((t = An(u)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(r(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(r(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(r(454));
        return l;
      default:
        throw Error(r(451));
    }
  }
  function ce(l) {
    for (var t = l.attributes; t.length;) l.removeAttributeNode(t[0]);
    Vn(l);
  }
  var vt = new Map(),
    H1 = new Set();
  function zn(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var Gt = O.d;
  O.d = { f: nv, r: fv, D: cv, C: iv, L: sv, m: vv, X: yv, S: dv, M: hv };
  function nv() {
    var l = Gt.f(),
      t = on();
    return l || t;
  }
  function fv(l) {
    var t = Yu(l);
    t !== null && t.tag === 5 && t.type === "form" ? F0(t) : Gt.r(l);
  }
  var ma = typeof document > "u" ? null : document;
  function p1(l, t, u) {
    var a = ma;
    if (a && typeof t == "string" && t) {
      var e = at(t);
      ((e = 'link[rel="' + l + '"][href="' + e + '"]'),
        typeof u == "string" && (e += '[crossorigin="' + u + '"]'),
        H1.has(e) ||
          (H1.add(e),
          (l = { rel: l, crossOrigin: u, href: t }),
          a.querySelector(e) === null &&
            ((t = a.createElement("link")),
            Dl(t, "link", l),
            Tl(t),
            a.head.appendChild(t))));
    }
  }
  function cv(l) {
    (Gt.D(l), p1("dns-prefetch", l, null));
  }
  function iv(l, t) {
    (Gt.C(l, t), p1("preconnect", l, t));
  }
  function sv(l, t, u) {
    Gt.L(l, t, u);
    var a = ma;
    if (a && l && t) {
      var e = 'link[rel="preload"][as="' + at(t) + '"]';
      t === "image" && u && u.imageSrcSet
        ? ((e += '[imagesrcset="' + at(u.imageSrcSet) + '"]'),
          typeof u.imageSizes == "string" &&
            (e += '[imagesizes="' + at(u.imageSizes) + '"]'))
        : (e += '[href="' + at(l) + '"]');
      var n = e;
      switch (t) {
        case "style":
          n = ra(l);
          break;
        case "script":
          n = ga(l);
      }
      vt.has(n) ||
        ((l = U(
          {
            rel: "preload",
            href: t === "image" && u && u.imageSrcSet ? void 0 : l,
            as: t,
          },
          u,
        )),
        vt.set(n, l),
        a.querySelector(e) !== null ||
          (t === "style" && a.querySelector(ie(n))) ||
          (t === "script" && a.querySelector(se(n))) ||
          ((t = a.createElement("link")),
          Dl(t, "link", l),
          Tl(t),
          a.head.appendChild(t)));
    }
  }
  function vv(l, t) {
    Gt.m(l, t);
    var u = ma;
    if (u && l) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        e =
          'link[rel="modulepreload"][as="' + at(a) + '"][href="' + at(l) + '"]',
        n = e;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = ga(l);
      }
      if (
        !vt.has(n) &&
        ((l = U({ rel: "modulepreload", href: l }, t)),
        vt.set(n, l),
        u.querySelector(e) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(se(n))) return;
        }
        ((a = u.createElement("link")),
          Dl(a, "link", l),
          Tl(a),
          u.head.appendChild(a));
      }
    }
  }
  function dv(l, t, u) {
    Gt.S(l, t, u);
    var a = ma;
    if (a && l) {
      var e = xu(a).hoistableStyles,
        n = ra(l);
      t = t || "default";
      var f = e.get(n);
      if (!f) {
        var c = { loading: 0, preload: null };
        if ((f = a.querySelector(ie(n)))) c.loading = 5;
        else {
          ((l = U({ rel: "stylesheet", href: l, "data-precedence": t }, u)),
            (u = vt.get(n)) && Zc(l, u));
          var i = (f = a.createElement("link"));
          (Tl(i),
            Dl(i, "link", l),
            (i._p = new Promise(function (h, g) {
              ((i.onload = h), (i.onerror = g));
            })),
            i.addEventListener("load", function () {
              c.loading |= 1;
            }),
            i.addEventListener("error", function () {
              c.loading |= 2;
            }),
            (c.loading |= 4),
            On(f, t, a));
        }
        ((f = { type: "stylesheet", instance: f, count: 1, state: c }),
          e.set(n, f));
      }
    }
  }
  function yv(l, t) {
    Gt.X(l, t);
    var u = ma;
    if (u && l) {
      var a = xu(u).hoistableScripts,
        e = ga(l),
        n = a.get(e);
      n ||
        ((n = u.querySelector(se(e))),
        n ||
          ((l = U({ src: l, async: !0 }, t)),
          (t = vt.get(e)) && Vc(l, t),
          (n = u.createElement("script")),
          Tl(n),
          Dl(n, "link", l),
          u.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(e, n));
    }
  }
  function hv(l, t) {
    Gt.M(l, t);
    var u = ma;
    if (u && l) {
      var a = xu(u).hoistableScripts,
        e = ga(l),
        n = a.get(e);
      n ||
        ((n = u.querySelector(se(e))),
        n ||
          ((l = U({ src: l, async: !0, type: "module" }, t)),
          (t = vt.get(e)) && Vc(l, t),
          (n = u.createElement("script")),
          Tl(n),
          Dl(n, "link", l),
          u.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        a.set(e, n));
    }
  }
  function C1(l, t, u, a) {
    var e = (e = B.current) ? zn(e) : null;
    if (!e) throw Error(r(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string"
          ? ((t = ra(u.href)),
            (u = xu(e).hoistableStyles),
            (a = u.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              u.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          u.rel === "stylesheet" &&
          typeof u.href == "string" &&
          typeof u.precedence == "string"
        ) {
          l = ra(u.href);
          var n = xu(e).hoistableStyles,
            f = n.get(l);
          if (
            (f ||
              ((e = e.ownerDocument || e),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, f),
              (n = e.querySelector(ie(l))) &&
                !n._p &&
                ((f.instance = n), (f.state.loading = 5)),
              vt.has(l) ||
                ((u = {
                  rel: "preload",
                  as: "style",
                  href: u.href,
                  crossOrigin: u.crossOrigin,
                  integrity: u.integrity,
                  media: u.media,
                  hrefLang: u.hrefLang,
                  referrerPolicy: u.referrerPolicy,
                }),
                vt.set(l, u),
                n || ov(e, l, u, f.state))),
            t && a === null)
          )
            throw Error(r(528, ""));
          return f;
        }
        if (t && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = u.async),
          (u = u.src),
          typeof u == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = ga(u)),
              (u = xu(e).hoistableScripts),
              (a = u.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                u.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, l));
    }
  }
  function ra(l) {
    return 'href="' + at(l) + '"';
  }
  function ie(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function q1(l) {
    return U({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function ov(l, t, u, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = l.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Dl(t, "link", u),
        Tl(t),
        l.head.appendChild(t));
  }
  function ga(l) {
    return '[src="' + at(l) + '"]';
  }
  function se(l) {
    return "script[async]" + l;
  }
  function Y1(l, t, u) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = l.querySelector('style[data-href~="' + at(u.href) + '"]');
          if (a) return ((t.instance = a), Tl(a), a);
          var e = U({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (l.ownerDocument || l).createElement("style")),
            Tl(a),
            Dl(a, "style", e),
            On(a, u.precedence, l),
            (t.instance = a)
          );
        case "stylesheet":
          e = ra(u.href);
          var n = l.querySelector(ie(e));
          if (n) return ((t.state.loading |= 4), (t.instance = n), Tl(n), n);
          ((a = q1(u)),
            (e = vt.get(e)) && Zc(a, e),
            (n = (l.ownerDocument || l).createElement("link")),
            Tl(n));
          var f = n;
          return (
            (f._p = new Promise(function (c, i) {
              ((f.onload = c), (f.onerror = i));
            })),
            Dl(n, "link", a),
            (t.state.loading |= 4),
            On(n, u.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = ga(u.src)),
            (e = l.querySelector(se(n)))
              ? ((t.instance = e), Tl(e), e)
              : ((a = u),
                (e = vt.get(n)) && ((a = U({}, u)), Vc(a, e)),
                (l = l.ownerDocument || l),
                (e = l.createElement("script")),
                Tl(e),
                Dl(e, "link", a),
                l.head.appendChild(e),
                (t.instance = e))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), On(a, u.precedence, l));
    return t.instance;
  }
  function On(l, t, u) {
    for (
      var a = u.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        e = a.length ? a[a.length - 1] : null,
        n = e,
        f = 0;
      f < a.length;
      f++
    ) {
      var c = a[f];
      if (c.dataset.precedence === t) n = c;
      else if (n !== e) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = u.nodeType === 9 ? u.head : u), t.insertBefore(l, t.firstChild));
  }
  function Zc(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function Vc(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var Mn = null;
  function x1(l, t, u) {
    if (Mn === null) {
      var a = new Map(),
        e = (Mn = new Map());
      e.set(u, a);
    } else ((e = Mn), (a = e.get(u)), a || ((a = new Map()), e.set(u, a)));
    if (a.has(l)) return a;
    for (
      a.set(l, null), u = u.getElementsByTagName(l), e = 0;
      e < u.length;
      e++
    ) {
      var n = u[e];
      if (
        !(
          n[Aa] ||
          n[Hl] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = n.getAttribute(t) || "";
        f = l + f;
        var c = a.get(f);
        c ? c.push(n) : a.set(f, [n]);
      }
    }
    return a;
  }
  function B1(l, t, u) {
    ((l = l.ownerDocument || l),
      l.head.insertBefore(
        u,
        t === "title" ? l.querySelector("head > title") : null,
      ));
  }
  function mv(l, t, u) {
    if (u === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (l = t.disabled),
              typeof t.precedence == "string" && l == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function j1(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  var ve = null;
  function rv() {}
  function gv(l, t, u) {
    if (ve === null) throw Error(r(475));
    var a = ve;
    if (
      t.type === "stylesheet" &&
      (typeof u.media != "string" || matchMedia(u.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var e = ra(u.href),
          n = l.querySelector(ie(e));
        if (n) {
          ((l = n._p),
            l !== null &&
              typeof l == "object" &&
              typeof l.then == "function" &&
              (a.count++, (a = _n.bind(a)), l.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = n),
            Tl(n));
          return;
        }
        ((n = l.ownerDocument || l),
          (u = q1(u)),
          (e = vt.get(e)) && Zc(u, e),
          (n = n.createElement("link")),
          Tl(n));
        var f = n;
        ((f._p = new Promise(function (c, i) {
          ((f.onload = c), (f.onerror = i));
        })),
          Dl(n, "link", u),
          (t.instance = n));
      }
      (a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, l),
        (l = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = _n.bind(a)),
          l.addEventListener("load", t),
          l.addEventListener("error", t)));
    }
  }
  function Sv() {
    if (ve === null) throw Error(r(475));
    var l = ve;
    return (
      l.stylesheets && l.count === 0 && Lc(l, l.stylesheets),
      0 < l.count
        ? function (t) {
            var u = setTimeout(function () {
              if ((l.stylesheets && Lc(l, l.stylesheets), l.unsuspend)) {
                var a = l.unsuspend;
                ((l.unsuspend = null), a());
              }
            }, 6e4);
            return (
              (l.unsuspend = t),
              function () {
                ((l.unsuspend = null), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function _n() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Lc(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        ((this.unsuspend = null), l());
      }
    }
  }
  var Dn = null;
  function Lc(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Dn = new Map()),
        t.forEach(bv, l),
        (Dn = null),
        _n.call(l)));
  }
  function bv(l, t) {
    if (!(t.state.loading & 4)) {
      var u = Dn.get(l);
      if (u) var a = u.get(null);
      else {
        ((u = new Map()), Dn.set(l, u));
        for (
          var e = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            n = 0;
          n < e.length;
          n++
        ) {
          var f = e[n];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (u.set(f.dataset.precedence, f), (a = f));
        }
        a && u.set(null, a);
      }
      ((e = t.instance),
        (f = e.getAttribute("data-precedence")),
        (n = u.get(f) || a),
        n === a && u.set(null, e),
        u.set(f, e),
        this.count++,
        (a = _n.bind(this)),
        e.addEventListener("load", a),
        e.addEventListener("error", a),
        n
          ? n.parentNode.insertBefore(e, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(e, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var de = {
    $$typeof: Ul,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0,
  };
  function Tv(l, t, u, a, e, n, f, c) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Gn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Gn(0)),
      (this.hiddenUpdates = Gn(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = e),
      (this.onCaughtError = n),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = c),
      (this.incompleteTransitions = new Map()));
  }
  function G1(l, t, u, a, e, n, f, c, i, h, g, T) {
    return (
      (l = new Tv(l, t, u, f, c, i, h, T)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = kl(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Mf()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: a, isDehydrated: u, cache: t }),
      Rf(n),
      l
    );
  }
  function X1(l) {
    return l ? ((l = Wu), l) : Wu;
  }
  function Q1(l, t, u, a, e, n) {
    ((e = X1(e)),
      a.context === null ? (a.context = e) : (a.pendingContext = e),
      (a = Jt(t)),
      (a.payload = { element: u }),
      (n = n === void 0 ? null : n),
      n !== null && (a.callback = n),
      (u = wt(l, a, t)),
      u !== null && (tt(u, l, t), Qa(u, l, t)));
  }
  function Z1(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < t ? u : t;
    }
  }
  function Kc(l, t) {
    (Z1(l, t), (l = l.alternate) && Z1(l, t));
  }
  function V1(l) {
    if (l.tag === 13) {
      var t = wu(l, 67108864);
      (t !== null && tt(t, l, 67108864), Kc(l, 67108864));
    }
  }
  var Un = !0;
  function Ev(l, t, u, a) {
    var e = S.T;
    S.T = null;
    var n = O.p;
    try {
      ((O.p = 2), Jc(l, t, u, a));
    } finally {
      ((O.p = n), (S.T = e));
    }
  }
  function Av(l, t, u, a) {
    var e = S.T;
    S.T = null;
    var n = O.p;
    try {
      ((O.p = 8), Jc(l, t, u, a));
    } finally {
      ((O.p = n), (S.T = e));
    }
  }
  function Jc(l, t, u, a) {
    if (Un) {
      var e = wc(a);
      if (e === null) (Cc(l, t, a, Rn, u), K1(l, a));
      else if (Ov(e, l, t, u, a)) a.stopPropagation();
      else if ((K1(l, a), t & 4 && -1 < zv.indexOf(l))) {
        for (; e !== null;) {
          var n = Yu(e);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var f = ou(n.pendingLanes);
                  if (f !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; f;) {
                      var i = 1 << (31 - Wl(f));
                      ((c.entanglements[1] |= i), (f &= ~i));
                    }
                    (At(n), (F & 6) === 0 && ((yn = gt() + 500), ee(0)));
                  }
                }
                break;
              case 13:
                ((c = wu(n, 2)), c !== null && tt(c, n, 2), on(), Kc(n, 2));
            }
          if (((n = wc(a)), n === null && Cc(l, t, a, Rn, u), n === e)) break;
          e = n;
        }
        e !== null && a.stopPropagation();
      } else Cc(l, t, a, null, u);
    }
  }
  function wc(l) {
    return ((l = Fn(l)), Wc(l));
  }
  var Rn = null;
  function Wc(l) {
    if (((Rn = null), (l = qu(l)), l !== null)) {
      var t = K(l);
      if (t === null) l = null;
      else {
        var u = t.tag;
        if (u === 13) {
          if (((l = il(t)), l !== null)) return l;
          l = null;
        } else if (u === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Rn = l), null);
  }
  function L1(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (is()) {
          case ei:
            return 2;
          case ni:
            return 8;
          case Te:
          case ss:
            return 32;
          case fi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var $c = !1,
    fu = null,
    cu = null,
    iu = null,
    ye = new Map(),
    he = new Map(),
    su = [],
    zv =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function K1(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        fu = null;
        break;
      case "dragenter":
      case "dragleave":
        cu = null;
        break;
      case "mouseover":
      case "mouseout":
        iu = null;
        break;
      case "pointerover":
      case "pointerout":
        ye.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        he.delete(t.pointerId);
    }
  }
  function oe(l, t, u, a, e, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: u,
          eventSystemFlags: a,
          nativeEvent: n,
          targetContainers: [e],
        }),
        t !== null && ((t = Yu(t)), t !== null && V1(t)),
        l)
      : ((l.eventSystemFlags |= a),
        (t = l.targetContainers),
        e !== null && t.indexOf(e) === -1 && t.push(e),
        l);
  }
  function Ov(l, t, u, a, e) {
    switch (t) {
      case "focusin":
        return ((fu = oe(fu, l, t, u, a, e)), !0);
      case "dragenter":
        return ((cu = oe(cu, l, t, u, a, e)), !0);
      case "mouseover":
        return ((iu = oe(iu, l, t, u, a, e)), !0);
      case "pointerover":
        var n = e.pointerId;
        return (ye.set(n, oe(ye.get(n) || null, l, t, u, a, e)), !0);
      case "gotpointercapture":
        return (
          (n = e.pointerId),
          he.set(n, oe(he.get(n) || null, l, t, u, a, e)),
          !0
        );
    }
    return !1;
  }
  function J1(l) {
    var t = qu(l.target);
    if (t !== null) {
      var u = K(t);
      if (u !== null) {
        if (((t = u.tag), t === 13)) {
          if (((t = il(u)), t !== null)) {
            ((l.blockedOn = t),
              gs(l.priority, function () {
                if (u.tag === 13) {
                  var a = lt();
                  a = Xn(a);
                  var e = wu(u, a);
                  (e !== null && tt(e, u, a), Kc(u, a));
                }
              }));
            return;
          }
        } else if (t === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Nn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length;) {
      var u = wc(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var a = new u.constructor(u.type, u);
        ((kn = a), u.target.dispatchEvent(a), (kn = null));
      } else return ((t = Yu(u)), t !== null && V1(t), (l.blockedOn = u), !1);
      t.shift();
    }
    return !0;
  }
  function w1(l, t, u) {
    Nn(l) && u.delete(t);
  }
  function Mv() {
    (($c = !1),
      fu !== null && Nn(fu) && (fu = null),
      cu !== null && Nn(cu) && (cu = null),
      iu !== null && Nn(iu) && (iu = null),
      ye.forEach(w1),
      he.forEach(w1));
  }
  function Hn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      $c ||
        (($c = !0),
        _.unstable_scheduleCallback(_.unstable_NormalPriority, Mv)));
  }
  var pn = null;
  function W1(l) {
    pn !== l &&
      ((pn = l),
      _.unstable_scheduleCallback(_.unstable_NormalPriority, function () {
        pn === l && (pn = null);
        for (var t = 0; t < l.length; t += 3) {
          var u = l[t],
            a = l[t + 1],
            e = l[t + 2];
          if (typeof a != "function") {
            if (Wc(a || u) === null) continue;
            break;
          }
          var n = Yu(u);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            Wf(n, { pending: !0, data: e, method: u.method, action: a }, a, e));
        }
      }));
  }
  function me(l) {
    function t(i) {
      return Hn(i, l);
    }
    (fu !== null && Hn(fu, l),
      cu !== null && Hn(cu, l),
      iu !== null && Hn(iu, l),
      ye.forEach(t),
      he.forEach(t));
    for (var u = 0; u < su.length; u++) {
      var a = su[u];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < su.length && ((u = su[0]), u.blockedOn === null);)
      (J1(u), u.blockedOn === null && su.shift());
    if (((u = (l.ownerDocument || l).$$reactFormReplay), u != null))
      for (a = 0; a < u.length; a += 3) {
        var e = u[a],
          n = u[a + 1],
          f = e[jl] || null;
        if (typeof n == "function") f || W1(u);
        else if (f) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (((e = n), (f = n[jl] || null))) c = f.formAction;
            else if (Wc(e) !== null) continue;
          } else c = f.action;
          (typeof c == "function" ? (u[a + 1] = c) : (u.splice(a, 3), (a -= 3)),
            W1(u));
        }
      }
  }
  function kc(l) {
    this._internalRoot = l;
  }
  ((Cn.prototype.render = kc.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var u = t.current,
        a = lt();
      Q1(u, a, l, t, null, null);
    }),
    (Cn.prototype.unmount = kc.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (Q1(l.current, 2, null, l, null, null), on(), (t[Cu] = null));
        }
      }));
  function Cn(l) {
    this._internalRoot = l;
  }
  Cn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = di();
      l = { blockedOn: null, target: l, priority: t };
      for (var u = 0; u < su.length && t !== 0 && t < su[u].priority; u++);
      (su.splice(u, 0, l), u === 0 && J1(l));
    }
  };
  var $1 = cl.version;
  if ($1 !== "19.1.0") throw Error(r(527, $1, "19.1.0"));
  O.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(r(188))
        : ((l = Object.keys(l).join(",")), Error(r(268, l)));
    return (
      (l = R(t)),
      (l = l !== null ? E(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var _v = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: S,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qn.isDisabled && qn.supportsFiber)
      try {
        ((ba = qn.inject(_v)), (wl = qn));
      } catch {}
  }
  return (
    (ge.createRoot = function (l, t) {
      if (!G(l)) throw Error(r(299));
      var u = !1,
        a = "",
        e = d2,
        n = y2,
        f = h2,
        c = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (u = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (e = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (c = t.unstable_transitionCallbacks)),
        (t = G1(l, 1, !1, null, null, u, a, e, n, f, c, null)),
        (l[Cu] = t.current),
        pc(l),
        new kc(t)
      );
    }),
    (ge.hydrateRoot = function (l, t, u) {
      if (!G(l)) throw Error(r(299));
      var a = !1,
        e = "",
        n = d2,
        f = y2,
        c = h2,
        i = null,
        h = null;
      return (
        u != null &&
          (u.unstable_strictMode === !0 && (a = !0),
          u.identifierPrefix !== void 0 && (e = u.identifierPrefix),
          u.onUncaughtError !== void 0 && (n = u.onUncaughtError),
          u.onCaughtError !== void 0 && (f = u.onCaughtError),
          u.onRecoverableError !== void 0 && (c = u.onRecoverableError),
          u.unstable_transitionCallbacks !== void 0 &&
            (i = u.unstable_transitionCallbacks),
          u.formState !== void 0 && (h = u.formState)),
        (t = G1(l, 1, !0, t, u ?? null, a, e, n, f, c, i, h)),
        (t.context = X1(null)),
        (u = t.current),
        (a = lt()),
        (a = Xn(a)),
        (e = Jt(a)),
        (e.callback = null),
        wt(u, e, a),
        (u = a),
        (t.current.lanes = u),
        Ea(t, u),
        At(t),
        (l[Cu] = t.current),
        pc(l),
        new Cn(t)
      );
    }),
    (ge.version = "19.1.0"),
    ge
  );
}
var ns;
function xv() {
  if (ns) return Ic.exports;
  ns = 1;
  function _() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_);
      } catch (cl) {
        console.error(cl);
      }
  }
  return (_(), (Ic.exports = Yv()), Ic.exports);
}
var Bv = xv(),
  Sa = ai();
const jv = "" + new URL("avatar-VTkG9mpl.svg", import.meta.url).href,
  Se =
    "data:image/svg+xml,%3csvg%20width='42'%20height='58'%20viewBox='0%200%2042%2058'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20opacity='0.16'%20d='M41.2737%2057.9851H2.27368V31.2996L25.9338%207.98511H41.2737V57.9851Z'%20fill='%23D0AF51'/%3e%3cpath%20d='M8.23699%208.05517L22.5156%208.38557L8.24868%2022.3376L8.23699%208.05517Z'%20fill='%23E5BA40'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12.8237%2034.285C12.8237%2033.4496%2013.1556%2032.6484%2013.7463%2032.0576C14.3371%2031.4669%2015.1383%2031.135%2015.9737%2031.135H28.5737C29.4092%2031.135%2030.2104%2031.4669%2030.8011%2032.0576C31.3919%2032.6484%2031.7237%2033.4496%2031.7237%2034.285V42.685C31.7237%2043.5204%2031.3919%2044.3217%2030.8011%2044.9124C30.2104%2045.5031%2029.4092%2045.835%2028.5737%2045.835H15.9737C15.1383%2045.835%2014.3371%2045.5031%2013.7463%2044.9124C13.1556%2044.3217%2012.8237%2043.5204%2012.8237%2042.685V34.285ZM17.0237%2035.86C17.0237%2035.3031%2017.245%2034.7689%2017.6388%2034.3751C18.0326%2033.9813%2018.5668%2033.76%2019.1237%2033.76C19.6807%2033.76%2020.2148%2033.9813%2020.6087%2034.3751C21.0025%2034.7689%2021.2237%2035.3031%2021.2237%2035.86C21.2237%2036.417%2021.0025%2036.9511%2020.6087%2037.3449C20.2148%2037.7388%2019.6807%2037.96%2019.1237%2037.96C18.5668%2037.96%2018.0326%2037.7388%2017.6388%2037.3449C17.245%2036.9511%2017.0237%2036.417%2017.0237%2035.86ZM19.1237%2039.01C18.3073%2039.0098%2017.5085%2039.2475%2016.825%2039.6941C16.1415%2040.1408%2015.6031%2040.7769%2015.2755%2041.5248C15.2329%2041.6221%2015.2104%2041.727%2015.2094%2041.8333C15.2085%2041.9395%2015.229%2042.0449%2015.2698%2042.143C15.3106%2042.2411%2015.3709%2042.3299%2015.4469%2042.4041C15.5229%2042.4783%2015.6132%2042.5364%2015.7123%2042.5748C16.8005%2042.9953%2017.9571%2043.2106%2019.1237%2043.21C20.2903%2043.211%2021.4469%2042.996%2022.5352%2042.5758C22.6344%2042.5374%2022.7248%2042.4793%2022.8009%2042.405C22.877%2042.3308%2022.9373%2042.2418%2022.9781%2042.1436C23.019%2042.0454%2023.0395%2041.9399%2023.0384%2041.8336C23.0373%2041.7272%2023.0147%2041.6221%2022.972%2041.5248C22.6444%2040.7769%2022.1059%2040.1408%2021.4225%2039.6941C20.739%2039.2475%2019.9402%2039.0098%2019.1237%2039.01ZM24.3737%2035.0725C24.3737%2034.8637%2024.4567%2034.6633%2024.6044%2034.5157C24.7521%2034.368%2024.9524%2034.285%2025.1612%2034.285H27.7862C27.9951%2034.285%2028.1954%2034.368%2028.3431%2034.5157C28.4908%2034.6633%2028.5737%2034.8637%2028.5737%2035.0725C28.5737%2035.2814%2028.4908%2035.4817%2028.3431%2035.6294C28.1954%2035.777%2027.9951%2035.86%2027.7862%2035.86H25.1612C24.9524%2035.86%2024.7521%2035.777%2024.6044%2035.6294C24.4567%2035.4817%2024.3737%2035.2814%2024.3737%2035.0725ZM24.3737%2041.8975C24.3737%2041.6887%2024.4567%2041.4883%2024.6044%2041.3407C24.7521%2041.193%2024.9524%2041.11%2025.1612%2041.11H27.7862C27.9951%2041.11%2028.1954%2041.193%2028.3431%2041.3407C28.4908%2041.4883%2028.5737%2041.6887%2028.5737%2041.8975C28.5737%2042.1064%2028.4908%2042.3067%2028.3431%2042.4544C28.1954%2042.602%2027.9951%2042.685%2027.7862%2042.685H25.1612C24.9524%2042.685%2024.7521%2042.602%2024.6044%2042.4544C24.4567%2042.3067%2024.3737%2042.1064%2024.3737%2041.8975ZM25.1612%2037.6975C24.9524%2037.6975%2024.7521%2037.7805%2024.6044%2037.9282C24.4567%2038.0758%2024.3737%2038.2762%2024.3737%2038.485C24.3737%2038.6939%2024.4567%2038.8942%2024.6044%2039.0419C24.7521%2039.1895%2024.9524%2039.2725%2025.1612%2039.2725H27.7862C27.9951%2039.2725%2028.1954%2039.1895%2028.3431%2039.0419C28.4908%2038.8942%2028.5737%2038.6939%2028.5737%2038.485C28.5737%2038.2762%2028.4908%2038.0758%2028.3431%2037.9282C28.1954%2037.7805%2027.9951%2037.6975%2027.7862%2037.6975H25.1612Z'%20fill='%23E5BA40'/%3e%3c/svg%3e",
  Gv =
    "data:image/svg+xml,%3csvg%20width='35'%20height='35'%20viewBox='0%200%2035%2035'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M17.5001%2024.7915C17.9133%2024.7915%2018.2599%2024.6515%2018.5399%2024.3715C18.8199%2024.0915%2018.9594%2023.7454%2018.9584%2023.3332V17.4998C18.9584%2017.0866%2018.8184%2016.7405%2018.5384%2016.4615C18.2584%2016.1825%2017.9123%2016.0425%2017.5001%2016.0415C17.0879%2016.0405%2016.7417%2016.1805%2016.4617%2016.4615C16.1817%2016.7425%2016.0417%2017.0886%2016.0417%2017.4998V23.3332C16.0417%2023.7464%2016.1817%2024.093%2016.4617%2024.373C16.7417%2024.653%2017.0879%2024.7925%2017.5001%2024.7915ZM17.5001%2013.1248C17.9133%2013.1248%2018.2599%2012.9848%2018.5399%2012.7048C18.8199%2012.4248%2018.9594%2012.0787%2018.9584%2011.6665C18.9574%2011.2543%2018.8174%2010.9082%2018.5384%2010.6282C18.2594%2010.3482%2017.9133%2010.2082%2017.5001%2010.2082C17.0869%2010.2082%2016.7408%2010.3482%2016.4617%2010.6282C16.1827%2010.9082%2016.0427%2011.2543%2016.0417%2011.6665C16.0408%2012.0787%2016.1808%2012.4253%2016.4617%2012.7063C16.7427%2012.9873%2017.0888%2013.1268%2017.5001%2013.1248ZM17.5001%2032.0832C15.4827%2032.0832%2013.5869%2031.7001%2011.8126%2030.934C10.0383%2030.1679%208.49487%2029.1291%207.18237%2027.8175C5.86987%2026.506%204.83106%2024.9626%204.06592%2023.1873C3.30078%2021.4121%202.91772%2019.5162%202.91675%2017.4998C2.91578%2015.4834%203.29883%2013.5876%204.06592%2011.8123C4.833%2010.0371%205.87182%208.49366%207.18237%207.18213C8.49293%205.8706%2010.0363%204.83178%2011.8126%204.06567C13.5888%203.29956%2015.4847%202.9165%2017.5001%202.9165C19.5155%202.9165%2021.4113%203.29956%2023.1876%204.06567C24.9638%204.83178%2026.5072%205.8706%2027.8178%207.18213C29.1283%208.49366%2030.1677%2010.0371%2030.9357%2011.8123C31.7038%2013.5876%2032.0863%2015.4834%2032.0834%2017.4998C32.0805%2019.5162%2031.6974%2021.4121%2030.9342%2023.1873C30.1711%2024.9626%2029.1322%2026.506%2027.8178%2027.8175C26.5033%2029.1291%2024.9599%2030.1684%2023.1876%2030.9355C21.4152%2031.7025%2019.5194%2032.0851%2017.5001%2032.0832Z'%20fill='%23E5BA40'/%3e%3c/svg%3e";
function Xv() {
  const [_, cl] = Sa.useState(0),
    [J, r] = Sa.useState(!1),
    [G, K] = Sa.useState(""),
    [il, Ol] = Sa.useState(""),
    [R, E] = Sa.useState("");
  return (
    Sa.useEffect(() => {
      if (J) {
        const U = setTimeout(() => {
          r(!1);
        }, 3e3);
        return () => clearTimeout(U);
      }
    }, [J]),
    cef.on("login:mode", (U, ul) => {
      (cl(U), K(ul));
    }),
    cef.on("login:password", () => {
      r(!0);
    }),
    H.jsxs("div", {
      className: "body",
      children: [
        H.jsx("div", { className: "background-left" }),
        H.jsx("img", { src: jv, alt: "Avatar" }),
        H.jsxs("div", {
          className: "background-right",
          children: [
            H.jsxs("header", {
              children: [
                H.jsx("div", {
                  className: _ == 0 ? "option active" : "option",
                  onClick: () => {
                    _ != 0 && cl(0);
                  },
                  children: "login",
                }),
                H.jsx("hr", {}),
                H.jsx("div", {
                  className: _ == 1 ? "option active" : "option",
                  onClick: () => {
                    _ != 1 && cl(1);
                  },
                  children: "sign",
                }),
              ],
            }),
            H.jsxs("main", {
              children: [
                _ == 0
                  ? H.jsxs(H.Fragment, {
                      children: [
                        H.jsx("span", {
                          className: "character",
                          children: "Carachter",
                        }),
                        H.jsx("h1", { children: "FAZER LOGIN" }),
                        H.jsx("span", {
                          className: "description",
                          children:
                            "Faça login e comece sua trajetória no maior e melhor servidor de Roleplay. Seu mundo, suas regras, sua história.",
                        }),
                        H.jsxs("div", {
                          className: "form",
                          children: [
                            H.jsxs("div", {
                              className: "input",
                              children: [
                                H.jsx("img", { src: Se, alt: "Icon" }),
                                H.jsxs("div", {
                                  className: "input",
                                  children: [
                                    H.jsx("div", {
                                      className: "label",
                                      children: "Usuario",
                                    }),
                                    H.jsx("input", {
                                      type: "text",
                                      placeholder: "nickname...",
                                      value: G,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            H.jsxs("div", {
                              className: "input",
                              children: [
                                H.jsx("img", { src: Se, alt: "Icon" }),
                                H.jsxs("div", {
                                  className: "input",
                                  children: [
                                    H.jsx("div", {
                                      className: "label",
                                      children: "Senha",
                                    }),
                                    H.jsx("input", {
                                      type: "password",
                                      placeholder: "******",
                                      value: R,
                                      onChange: (U) => E(U.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        H.jsx("div", {
                          className: "forgot",
                          children: H.jsx("span", {
                            children: "Recuperar Senha",
                          }),
                        }),
                        H.jsx("button", {
                          onClick: () => {
                            if (!R) return 1;
                            cef.emit("login:login", R);
                          },
                          children: "CONFIRMAR",
                        }),
                      ],
                    })
                  : H.jsxs(H.Fragment, {
                      children: [
                        H.jsx("span", {
                          className: "character",
                          children: "Carachter",
                        }),
                        H.jsx("h1", { children: "FAZER LOGIN" }),
                        H.jsx("span", {
                          className: "description",
                          children:
                            "Faça login e comece sua trajetória no maior e melhor servidor de Roleplay. Seu mundo, suas regras, sua história.",
                        }),
                        H.jsxs("div", {
                          className: "form",
                          children: [
                            H.jsxs("div", {
                              className: "input",
                              children: [
                                H.jsx("img", { src: Se, alt: "Icon" }),
                                H.jsxs("div", {
                                  className: "input",
                                  children: [
                                    H.jsx("div", {
                                      className: "label",
                                      children: "Usuario",
                                    }),
                                    H.jsx("input", {
                                      type: "text",
                                      placeholder: "nickname...",
                                      value: G,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            H.jsxs("div", {
                              className: "input",
                              children: [
                                H.jsx("img", { src: Se, alt: "Icon" }),
                                H.jsxs("div", {
                                  className: "input",
                                  children: [
                                    H.jsx("div", {
                                      className: "label",
                                      children: "Email",
                                    }),
                                    H.jsx("input", {
                                      type: "text",
                                      placeholder: "exemple@workbestgames.com",
                                      value: il,
                                      onChange: (U) => Ol(U.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            H.jsxs("div", {
                              className: "input",
                              children: [
                                H.jsx("img", { src: Se, alt: "Icon" }),
                                H.jsxs("div", {
                                  className: "input",
                                  children: [
                                    H.jsx("div", {
                                      className: "label",
                                      children: "Senha",
                                    }),
                                    H.jsx("input", {
                                      type: "password",
                                      placeholder: "******",
                                      value: R,
                                      onChange: (U) => E(U.target.value),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        H.jsx("button", {
                          onClick: () => {
                            if (!il && !R) return 1;
                            cef.emit("login:register", il, R);
                          },
                          children: "CONFIRMAR",
                        }),
                      ],
                    }),
                H.jsxs("div", {
                  className: `notification ${J ? "show" : "hide"}`,
                  children: [
                    H.jsx("img", { src: Gv, alt: "Info" }),
                    H.jsxs("div", {
                      children: [
                        H.jsx("div", {
                          className: "title",
                          children: "Atenção",
                        }),
                        H.jsx("span", {
                          children: "Senha ou usuário incorretos!",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
Bv.createRoot(document.getElementById("root")).render(H.jsx(Xv, {}));
