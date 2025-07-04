var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  "use strict";
  /**
  * @vue/shared v3.5.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend$1 = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  const hasOwn$1 = (val, key) => hasOwnProperty$3.call(val, key);
  const isArray$3 = Array.isArray;
  const isMap = (val) => toTypeString$1(val) === "[object Map]";
  const isSet = (val) => toTypeString$1(val) === "[object Set]";
  const isFunction$3 = (val) => typeof val === "function";
  const isString$3 = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject$3 = (val) => val !== null && typeof val === "object";
  const isPromise$1 = (val) => {
    return (isObject$3(val) || isFunction$3(val)) && isFunction$3(val.then) && isFunction$3(val.catch);
  };
  const objectToString$1 = Object.prototype.toString;
  const toTypeString$1 = (value) => objectToString$1.call(value);
  const toRawType = (value) => {
    return toTypeString$1(value).slice(8, -1);
  };
  const isPlainObject$3 = (val) => toTypeString$1(val) === "[object Object]";
  const isIntegerKey = (key) => isString$3(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const cacheStringFunction = (fn) => {
    const cache2 = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache2[str];
      return hit || (cache2[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize$1 = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s = str ? `on${capitalize$1(str)}` : ``;
      return s;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  const toNumber = (val) => {
    const n = isString$3(val) ? Number(val) : NaN;
    return isNaN(n) ? val : n;
  };
  let _globalThis$1;
  const getGlobalThis$1 = () => {
    return _globalThis$1 || (_globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray$3(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString$3(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString$3(value) || isObject$3(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString$3(value)) {
      res = value;
    } else if (isArray$3(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject$3(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  const isRef$1 = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  const toDisplayString$1 = (val) => {
    return isString$3(val) ? val : val == null ? "" : isArray$3(val) || isObject$3(val) && (val.toString === objectToString$1 || !isFunction$3(val.toString)) ? isRef$1(val) ? toDisplayString$1(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (isRef$1(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i) => {
            entries[stringifySymbol(key, i) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject$3(val) && !isArray$3(val) && !isPlainObject$3(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i = "") => {
    var _a;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
    );
  };
  /**
  * @vue/reactivity v3.5.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let activeEffectScope;
  class EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
          this
        ) - 1;
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].pause();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].pause();
        }
      }
    }
    /**
     * Resumes the effect scope, including all child scopes and effects.
     */
    resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i, l;
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].resume();
            }
          }
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
    /**
     * This should only be called on non-detached scopes
     * @internal
     */
    off() {
      if (this._on > 0 && --this._on === 0) {
        activeEffectScope = this.prevScope;
        this.prevScope = void 0;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i, l;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].stop();
        }
        this.effects.length = 0;
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn, failSilently = false) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    }
  }
  let activeSub;
  const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 1 | 4;
      this.next = void 0;
      this.cleanup = void 0;
      this.scheduler = void 0;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    /**
     * @internal
     */
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps; link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = void 0;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    /**
     * @internal
     */
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  let batchDepth = 0;
  let batchedSub;
  let batchedComputed;
  function batch(sub, isComputed2 = false) {
    sub.flags |= 8;
    if (isComputed2) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = void 0;
      while (e) {
        const next = e.next;
        e.next = void 0;
        e.flags &= -9;
        if (e.flags & 1) {
          try {
            ;
            e.trigger();
          } catch (err) {
            if (!error) error = err;
          }
        }
        e = next;
      }
    }
    if (error) throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev = link.prevDep;
      if (link.version === -1) {
        if (link === tail) tail = prev;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = void 0;
      link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps; link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed2) {
    if (computed2.flags & 4 && !(computed2.flags & 16)) {
      return;
    }
    computed2.flags &= -17;
    if (computed2.globalVersion === globalVersion) {
      return;
    }
    computed2.globalVersion = globalVersion;
    if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
      return;
    }
    computed2.flags |= 2;
    const dep = computed2.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed2;
    shouldTrack = true;
    try {
      prepareDeps(computed2);
      const value = computed2.fn(computed2._value);
      if (dep.version === 0 || hasChanged(value, computed2._value)) {
        computed2.flags |= 128;
        computed2._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed2);
      computed2.flags &= -3;
    }
  }
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = void 0;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = void 0;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps; l; l = l.nextDep) {
          removeSub(l, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = void 0;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = void 0;
    }
  }
  let shouldTrack = true;
  const trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = void 0;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = void 0;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  let globalVersion = 0;
  class Link {
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  }
  class Dep {
    constructor(computed2) {
      this.computed = computed2;
      this.version = 0;
      this.activeLink = void 0;
      this.subs = void 0;
      this.map = void 0;
      this.key = void 0;
      this.sc = 0;
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === void 0 || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next = link.nextDep;
          next.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = void 0;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next;
          }
        }
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (false) ;
        for (let link = this.subs; link; link = link.prevSub) {
          if (link.sub.notify()) {
            ;
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed2 = link.dep.computed;
      if (computed2 && !link.dep.subs) {
        computed2.flags |= 4 | 16;
        for (let l = computed2.deps; l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail) currentTail.nextSub = link;
      }
      link.dep.subs = link;
    }
  }
  const targetMap = /* @__PURE__ */ new WeakMap();
  const ITERATE_KEY = Symbol(
    ""
  );
  const MAP_KEY_ITERATE_KEY = Symbol(
    ""
  );
  const ARRAY_ITERATE_KEY = Symbol(
    ""
  );
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep());
        dep.map = depsMap;
        dep.key = key;
      }
      {
        dep.track();
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        {
          dep.trigger();
        }
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray$3(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== void 0 || depsMap.has(void 0)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function getDepFromReactive(object, key) {
    const depMap = targetMap.get(object);
    return depMap && depMap.get(key);
  }
  function reactiveReadArray(array) {
    const raw = toRaw(array);
    if (raw === array) return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  const arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator$1(this, Symbol.iterator, toReactive);
    },
    concat(...args) {
      return reactiveReadArray(this).concat(
        ...args.map((x) => isArray$3(x) ? reactiveReadArray(x) : x)
      );
    },
    entries() {
      return iterator$1(this, "entries", (value) => {
        value[1] = toReactive(value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply$1(this, "every", fn, thisArg, void 0, arguments);
    },
    filter(fn, thisArg) {
      return apply$1(this, "filter", fn, thisArg, (v) => v.map(toReactive), arguments);
    },
    find(fn, thisArg) {
      return apply$1(this, "find", fn, thisArg, toReactive, arguments);
    },
    findIndex(fn, thisArg) {
      return apply$1(this, "findIndex", fn, thisArg, void 0, arguments);
    },
    findLast(fn, thisArg) {
      return apply$1(this, "findLast", fn, thisArg, toReactive, arguments);
    },
    findLastIndex(fn, thisArg) {
      return apply$1(this, "findLastIndex", fn, thisArg, void 0, arguments);
    },
    // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
    forEach(fn, thisArg) {
      return apply$1(this, "forEach", fn, thisArg, void 0, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    // keys() iterator only reads `length`, no optimisation required
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply$1(this, "map", fn, thisArg, void 0, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    // slice could use ARRAY_ITERATE but also seems to beg for range tracking
    some(fn, thisArg) {
      return apply$1(this, "some", fn, thisArg, void 0, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator$1(this, "values", toReactive);
    }
  };
  function iterator$1(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (result.value) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  const arrayProto = Array.prototype;
  function apply$1(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index2) {
          return fn.call(this, toReactive(item), index2, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index2) {
          return fn.call(this, item, index2, self2);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    let wrappedFn = fn;
    if (arr !== self2) {
      if (!isShallow(self2)) {
        wrappedFn = function(acc, item, index2) {
          return fn.call(this, acc, toReactive(item), index2, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index2) {
          return fn.call(this, acc, item, index2, self2);
        };
      }
    }
    return arr[method](wrappedFn, ...args);
  }
  function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && isProxy(args[0])) {
      args[0] = toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = toRaw(self2)[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  const builtInSymbols = new Set(
    /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
  );
  function hasOwnProperty$2(key) {
    if (!isSymbol(key)) key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }
  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip") return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
        // this means the receiver is a user proxy of the reactive proxy
        Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray$3(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty$2;
        }
      }
      const res = Reflect.get(
        target,
        key,
        // if this is a proxy wrapping a ref, return methods using the raw ref
        // as receiver so that we don't have to call `toRaw` on the ref in all
        // its class methods
        isRef(target) ? target : receiver
      );
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef(res)) {
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject$3(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }
  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray$3(target) && isRef(oldValue) && !isRef(value)) {
          if (isOldValueReadonly) {
            return false;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArray$3(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
      const result = Reflect.set(
        target,
        key,
        value,
        isRef(target) ? target : receiver
      );
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn$1(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(
        target,
        "iterate",
        isArray$3(target) ? "length" : ITERATE_KEY
      );
      return Reflect.ownKeys(target);
    }
  }
  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      return true;
    }
    deleteProperty(target, key) {
      return true;
    }
  }
  const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
  const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
  const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  const toShallow = (value) => value;
  const getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(
        rawTarget,
        "iterate",
        isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
      );
      return {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        // iterable protocol
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      return type === "delete" ? false : type === "clear" ? void 0 : this;
    };
  }
  function createInstrumentations(readonly2, shallow) {
    const instrumentations = {
      get(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
        return Reflect.get(target, "size", target);
      },
      has(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly2) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
        !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend$1(
      instrumentations,
      readonly2 ? {
        add: createReadonlyMethod("add"),
        set: createReadonlyMethod("set"),
        delete: createReadonlyMethod("delete"),
        clear: createReadonlyMethod("clear")
      } : {
        add(value) {
          if (!shallow && !isShallow(value) && !isReadonly(value)) {
            value = toRaw(value);
          }
          const target = toRaw(this);
          const proto = getProto(target);
          const hadKey = proto.has.call(target, value);
          if (!hadKey) {
            target.add(value);
            trigger(target, "add", value, value);
          }
          return this;
        },
        set(key, value) {
          if (!shallow && !isShallow(value) && !isReadonly(value)) {
            value = toRaw(value);
          }
          const target = toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
          }
          const oldValue = get.call(target, key);
          target.set(key, value);
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value);
          }
          return this;
        },
        delete(key) {
          const target = toRaw(this);
          const { has, get } = getProto(target);
          let hadKey = has.call(target, key);
          if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
          }
          get ? get.call(target, key) : void 0;
          const result = target.delete(key);
          if (hadKey) {
            trigger(target, "delete", key, void 0);
          }
          return result;
        },
        clear() {
          const target = toRaw(this);
          const hadItems = target.size !== 0;
          const result = target.clear();
          if (hadItems) {
            trigger(
              target,
              "clear",
              void 0,
              void 0
            );
          }
          return result;
        }
      }
    );
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly2, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(
        hasOwn$1(instrumentations, key) && key in target ? instrumentations : target,
        key,
        receiver
      );
    };
  }
  const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  const shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  const readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  const shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  const reactiveMap = /* @__PURE__ */ new WeakMap();
  const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  const readonlyMap = /* @__PURE__ */ new WeakMap();
  const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(
      target,
      false,
      mutableHandlers,
      mutableCollectionHandlers,
      reactiveMap
    );
  }
  function shallowReactive(target) {
    return createReactiveObject(
      target,
      false,
      shallowReactiveHandlers,
      shallowCollectionHandlers,
      shallowReactiveMap
    );
  }
  function readonly(target) {
    return createReactiveObject(
      target,
      true,
      readonlyHandlers,
      readonlyCollectionHandlers,
      readonlyMap
    );
  }
  function shallowReadonly(target) {
    return createReactiveObject(
      target,
      true,
      shallowReadonlyHandlers,
      shallowReadonlyCollectionHandlers,
      shallowReadonlyMap
    );
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$3(target)) {
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(
      target,
      targetType === 2 ? collectionHandlers : baseHandlers
    );
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn$1(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  const toReactive = (value) => isObject$3(value) ? reactive(value) : value;
  const toReadonly = (value) => isObject$3(value) ? readonly(value) : value;
  function isRef(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  function ref(value) {
    return createRef(value, false);
  }
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep();
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      {
        this.dep.track();
      }
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
      newValue = useDirectValue ? newValue : toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        {
          this.dep.trigger();
        }
      }
    }
  }
  function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
  }
  const shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  function toRefs(object) {
    const ret = isArray$3(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = propertyToRef(object, key);
    }
    return ret;
  }
  class ObjectRefImpl {
    constructor(_object, _key, _defaultValue) {
      this._object = _object;
      this._key = _key;
      this._defaultValue = _defaultValue;
      this["__v_isRef"] = true;
      this._value = void 0;
    }
    get value() {
      const val = this._object[this._key];
      return this._value = val === void 0 ? this._defaultValue : val;
    }
    set value(newVal) {
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(toRaw(this._object), this._key);
    }
  }
  function propertyToRef(source, key, defaultValue) {
    const val = source[key];
    return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
  }
  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = void 0;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = void 0;
      this.depsTail = void 0;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = void 0;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
    /**
     * @internal
     */
    notify() {
      this.flags |= 16;
      if (!(this.flags & 8) && // avoid infinite self recursion
      activeSub !== this) {
        batch(this, true);
        return true;
      }
    }
    get value() {
      const link = this.dep.track();
      refreshComputed(this);
      if (link) {
        link.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      }
    }
  }
  function computed$1(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction$3(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    return cRef;
  }
  const INITIAL_WATCHER_VALUE = {};
  const cleanupMap = /* @__PURE__ */ new WeakMap();
  let activeWatcher = void 0;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups) cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    }
  }
  function watch$1(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const reactiveGetter = (source2) => {
      if (deep) return source2;
      if (isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect2;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray$3(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction$3(s)) {
          return call ? call(s, 2) : s();
        } else ;
      });
    } else if (isFunction$3(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup) {
            pauseTracking();
            try {
              cleanup();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect2;
          try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect2.stop();
      if (scope && scope.active) {
        remove(scope.effects, effect2);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect2.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
          if (cleanup) {
            cleanup();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect2;
          try {
            const args = [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call ? call(cb, 3, args) : (
              // @ts-expect-error
              cb(...args)
            );
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect2.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect2 = new ReactiveEffect(getter);
    effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
    cleanup = effect2.onStop = () => {
      const cleanups = cleanupMap.get(effect2);
      if (cleanups) {
        if (call) {
          call(cleanups, 4);
        } else {
          for (const cleanup2 of cleanups) cleanup2();
        }
        cleanupMap.delete(effect2);
      }
    };
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect2.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect2.run();
    }
    watchHandle.pause = effect2.pause.bind(effect2);
    watchHandle.resume = effect2.resume.bind(effect2);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen2) {
    if (depth <= 0 || !isObject$3(value) || value["__v_skip"]) {
      return value;
    }
    seen2 = seen2 || /* @__PURE__ */ new Set();
    if (seen2.has(value)) {
      return value;
    }
    seen2.add(value);
    depth--;
    if (isRef(value)) {
      traverse(value.value, depth, seen2);
    } else if (isArray$3(value)) {
      for (let i = 0; i < value.length; i++) {
        traverse(value[i], depth, seen2);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen2);
      });
    } else if (isPlainObject$3(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen2);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen2);
        }
      }
    }
    return value;
  }
  /**
  * @vue/runtime-core v3.5.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  const stack = [];
  let isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning) return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(
        appWarnHandler,
        instance,
        11,
        [
          // eslint-disable-next-line no-restricted-syntax
          msg + args.map((a) => {
            var _a, _b;
            return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
          }).join(""),
          instance && instance.proxy,
          trace.map(
            ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
          ).join("\n"),
          trace
        ]
      );
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && // avoid spamming console during tests
      true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(
      vnode.component,
      vnode.type,
      isRoot
    )}`;
    const close = `>` + postfix;
    return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString$3(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction$3(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction$3(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise$1(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray$3(fn)) {
      const values = [];
      for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    }
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
    if (throwInProd) {
      throw err;
    } else {
      console.error(err);
    }
  }
  const queue = [];
  let flushIndex = -1;
  const pendingPostFlushCbs = [];
  let activePostFlushCbs = null;
  let postFlushIndex = 0;
  const resolvedPromise = /* @__PURE__ */ Promise.resolve();
  let currentFlushPromise = null;
  function nextTick(fn) {
    const p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
  }
  function findInsertionIndex$1(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId$1(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId$1(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob || // fast path when the job id is larger than the tail
      !(job.flags & 2) && jobId >= getId$1(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex$1(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray$3(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen2, i = flushIndex + 1) {
    for (; i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen2) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort(
        (a, b) => getId$1(a) - getId$1(b)
      );
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8)) cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  const getId$1 = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen2) {
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (false) ;
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(
            job,
            job.i,
            job.i ? 15 : 14
          );
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (; flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs();
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs();
      }
    }
  }
  let currentRenderingInstance = null;
  let currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx) return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function withDirectives(vnode, directives) {
    if (currentRenderingInstance === null) {
      return vnode;
    }
    const instance = getComponentPublicInstance(currentRenderingInstance);
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
      let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
      if (dir) {
        if (isFunction$3(dir)) {
          dir = {
            mounted: dir,
            updated: dir
          };
        }
        if (dir.deep) {
          traverse(value);
        }
        bindings.push({
          dir,
          instance,
          value,
          oldValue: void 0,
          arg,
          modifiers
        });
      }
    }
    return vnode;
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  const TeleportEndKey = Symbol("_vte");
  const isTeleport = (type) => type.__isTeleport;
  const leaveCbKey = Symbol("_leaveCb");
  const enterCbKey$1 = Symbol("_enterCb");
  function useTransitionState() {
    const state = {
      isMounted: false,
      isLeaving: false,
      isUnmounting: false,
      leavingVNodes: /* @__PURE__ */ new Map()
    };
    onMounted(() => {
      state.isMounted = true;
    });
    onBeforeUnmount(() => {
      state.isUnmounting = true;
    });
    return state;
  }
  const TransitionHookValidator = [Function, Array];
  const BaseTransitionPropsValidators = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: TransitionHookValidator,
    onEnter: TransitionHookValidator,
    onAfterEnter: TransitionHookValidator,
    onEnterCancelled: TransitionHookValidator,
    // leave
    onBeforeLeave: TransitionHookValidator,
    onLeave: TransitionHookValidator,
    onAfterLeave: TransitionHookValidator,
    onLeaveCancelled: TransitionHookValidator,
    // appear
    onBeforeAppear: TransitionHookValidator,
    onAppear: TransitionHookValidator,
    onAfterAppear: TransitionHookValidator,
    onAppearCancelled: TransitionHookValidator
  };
  function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
      leavingVNodesCache = /* @__PURE__ */ Object.create(null);
      leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
  }
  function resolveTransitionHooks(vnode, props, state, instance, postClone) {
    const {
      appear,
      mode,
      persisted = false,
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onEnterCancelled,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
      onLeaveCancelled,
      onBeforeAppear,
      onAppear,
      onAfterAppear,
      onAppearCancelled
    } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook2 = (hook, args) => {
      hook && callWithAsyncErrorHandling(
        hook,
        instance,
        9,
        args
      );
    };
    const callAsyncHook = (hook, args) => {
      const done = args[1];
      callHook2(hook, args);
      if (isArray$3(hook)) {
        if (hook.every((hook2) => hook2.length <= 1)) done();
      } else if (hook.length <= 1) {
        done();
      }
    };
    const hooks = {
      mode,
      persisted,
      beforeEnter(el) {
        let hook = onBeforeEnter;
        if (!state.isMounted) {
          if (appear) {
            hook = onBeforeAppear || onBeforeEnter;
          } else {
            return;
          }
        }
        if (el[leaveCbKey]) {
          el[leaveCbKey](
            true
            /* cancelled */
          );
        }
        const leavingVNode = leavingVNodesCache[key];
        if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
          leavingVNode.el[leaveCbKey]();
        }
        callHook2(hook, [el]);
      },
      enter(el) {
        let hook = onEnter;
        let afterHook = onAfterEnter;
        let cancelHook = onEnterCancelled;
        if (!state.isMounted) {
          if (appear) {
            hook = onAppear || onEnter;
            afterHook = onAfterAppear || onAfterEnter;
            cancelHook = onAppearCancelled || onEnterCancelled;
          } else {
            return;
          }
        }
        let called = false;
        const done = el[enterCbKey$1] = (cancelled) => {
          if (called) return;
          called = true;
          if (cancelled) {
            callHook2(cancelHook, [el]);
          } else {
            callHook2(afterHook, [el]);
          }
          if (hooks.delayedLeave) {
            hooks.delayedLeave();
          }
          el[enterCbKey$1] = void 0;
        };
        if (hook) {
          callAsyncHook(hook, [el, done]);
        } else {
          done();
        }
      },
      leave(el, remove2) {
        const key2 = String(vnode.key);
        if (el[enterCbKey$1]) {
          el[enterCbKey$1](
            true
            /* cancelled */
          );
        }
        if (state.isUnmounting) {
          return remove2();
        }
        callHook2(onBeforeLeave, [el]);
        let called = false;
        const done = el[leaveCbKey] = (cancelled) => {
          if (called) return;
          called = true;
          remove2();
          if (cancelled) {
            callHook2(onLeaveCancelled, [el]);
          } else {
            callHook2(onAfterLeave, [el]);
          }
          el[leaveCbKey] = void 0;
          if (leavingVNodesCache[key2] === vnode) {
            delete leavingVNodesCache[key2];
          }
        };
        leavingVNodesCache[key2] = vnode;
        if (onLeave) {
          callAsyncHook(onLeave, [el, done]);
        } else {
          done();
        }
      },
      clone(vnode2) {
        const hooks2 = resolveTransitionHooks(
          vnode2,
          props,
          state,
          instance
        );
        return hooks2;
      }
    };
    return hooks;
  }
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function getTransitionRawChildren(children, keepComment = false, parentKey) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
      if (child.type === Fragment) {
        if (child.patchFlag & 128) keyedFragmentCount++;
        ret = ret.concat(
          getTransitionRawChildren(child.children, keepComment, key)
        );
      } else if (keepComment || child.type !== Comment) {
        ret.push(key != null ? cloneVNode(child, { key }) : child);
      }
    }
    if (keyedFragmentCount > 1) {
      for (let i = 0; i < ret.length; i++) {
        ret[i].patchFlag = -2;
      }
    }
    return ret;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineComponent(options, extraOptions) {
    return isFunction$3(options) ? (
      // #8236: extend call and options.name access are considered side-effects
      // by Rollup, so we have to wrap it in a pure-annotated IIFE.
      /* @__PURE__ */ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))()
    ) : options;
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray$3(rawRef)) {
      rawRef.forEach(
        (r, i) => setRef(
          r,
          oldRawRef && (isArray$3(oldRawRef) ? oldRawRef[i] : oldRawRef),
          parentSuspense,
          vnode,
          isUnmount
        )
      );
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref3 } = rawRef;
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? () => false : (key) => {
      return hasOwn$1(rawSetupState, key);
    };
    if (oldRef != null && oldRef !== ref3) {
      if (isString$3(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction$3(ref3)) {
      callWithErrorHandling(ref3, owner, 12, [value, refs]);
    } else {
      const _isString = isString$3(ref3);
      const _isRef = isRef(ref3);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : ref3.value;
            if (isUnmount) {
              isArray$3(existing) && remove(existing, refValue);
            } else {
              if (!isArray$3(existing)) {
                if (_isString) {
                  refs[ref3] = [refValue];
                  if (canSetSetupRef(ref3)) {
                    setupState[ref3] = refs[ref3];
                  }
                } else {
                  ref3.value = [refValue];
                  if (rawRef.k) refs[rawRef.k] = ref3.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref3] = value;
            if (canSetSetupRef(ref3)) {
              setupState[ref3] = value;
            }
          } else if (_isRef) {
            ref3.value = value;
            if (rawRef.k) refs[rawRef.k] = value;
          } else ;
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      }
    }
  }
  getGlobalThis$1().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  getGlobalThis$1().cancelIdleCallback || ((id) => clearTimeout(id));
  const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(
      type,
      hook,
      keepAliveRoot,
      true
      /* prepend */
    );
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    }
  }
  const createHook = (lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
  const onBeforeMount = createHook("bm");
  const onMounted = createHook("m");
  const onBeforeUpdate = createHook(
    "bu"
  );
  const onUpdated = createHook("u");
  const onBeforeUnmount = createHook(
    "bum"
  );
  const onUnmounted = createHook("um");
  const onServerPrefetch = createHook(
    "sp"
  );
  const onRenderTriggered = createHook("rtg");
  const onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  const COMPONENTS = "components";
  const DIRECTIVES = "directives";
  function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
  }
  const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
  function resolveDynamicComponent(component) {
    if (isString$3(component)) {
      return resolveAsset(COMPONENTS, component, false) || component;
    } else {
      return component || NULL_DYNAMIC_COMPONENT;
    }
  }
  function resolveDirective(name) {
    return resolveAsset(DIRECTIVES, name);
  }
  function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
      const Component = instance.type;
      if (type === COMPONENTS) {
        const selfName = getComponentName(
          Component,
          false
        );
        if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize$1(camelize(name)))) {
          return Component;
        }
      }
      const res = (
        // local registration
        // check instance[type] first which is resolved for options API
        resolve(instance[type] || Component[type], name) || // global registration
        resolve(instance.appContext[type], name)
      );
      if (!res && maybeSelfReference) {
        return Component;
      }
      return res;
    }
  }
  function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize$1(camelize(name))]);
  }
  function renderList(source, renderItem, cache2, index2) {
    let ret;
    const cached = cache2;
    const sourceIsArray = isArray$3(source);
    if (sourceIsArray || isString$3(source)) {
      const sourceIsReactiveArray = sourceIsArray && isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = !isShallow(source);
        isReadonlySource = isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i = 0, l = source.length; i < l; i++) {
        ret[i] = renderItem(
          needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
          i,
          void 0,
          cached
        );
      }
    } else if (typeof source === "number") {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached);
      }
    } else if (isObject$3(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(
          source,
          (item, i) => renderItem(item, i, void 0, cached)
        );
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length; i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached);
        }
      }
    } else {
      ret = [];
    }
    return ret;
  }
  function renderSlot(slots, name, props = {}, fallback, noSlotted) {
    if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
      return openBlock(), createBlock(
        Fragment,
        null,
        [createVNode("slot", props, fallback)],
        64
      );
    }
    let slot = slots[name];
    if (slot && slot._c) {
      slot._d = false;
    }
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
    // key attached in the `createSlots` helper, respect that
    validSlotContent && validSlotContent.key;
    const rendered = createBlock(
      Fragment,
      {
        key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
        ""
      },
      validSlotContent || [],
      validSlotContent && slots._ === 1 ? 64 : -2
    );
    if (!noSlotted && rendered.scopeId) {
      rendered.slotScopeIds = [rendered.scopeId + "-s"];
    }
    if (slot && slot._c) {
      slot._d = true;
    }
    return rendered;
  }
  function ensureValidVNode(vnodes) {
    return vnodes.some((child) => {
      if (!isVNode$1(child)) return true;
      if (child.type === Comment) return false;
      if (child.type === Fragment && !ensureValidVNode(child.children))
        return false;
      return true;
    }) ? vnodes : null;
  }
  function toHandlers(obj, preserveCaseIfNecessary) {
    const ret = {};
    for (const key in obj) {
      ret[toHandlerKey(key)] = obj[key];
    }
    return ret;
  }
  const getPublicInstance = (i) => {
    if (!i) return null;
    if (isStatefulComponent(i)) return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
  };
  const publicPropertiesMap = (
    // Move PURE marker to new line to workaround compiler discarding it
    // due to type annotation
    /* @__PURE__ */ extend$1(/* @__PURE__ */ Object.create(null), {
      $: (i) => i,
      $el: (i) => i.vnode.el,
      $data: (i) => i.data,
      $props: (i) => i.props,
      $attrs: (i) => i.attrs,
      $slots: (i) => i.slots,
      $refs: (i) => i.refs,
      $parent: (i) => getPublicInstance(i.parent),
      $root: (i) => getPublicInstance(i.root),
      $host: (i) => i.ce,
      $emit: (i) => i.emit,
      $options: (i) => resolveMergedOptions(i),
      $forceUpdate: (i) => i.f || (i.f = () => {
        queueJob(i.update);
      }),
      $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
      $watch: (i) => instanceWatch.bind(i)
    })
  );
  const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
  const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      let normalizedProps;
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== void 0) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
        ) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance.attrs, "get", "");
        }
        return publicGetter(instance);
      } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])
      ) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
      ) {
        {
          return globalProperties[key];
        }
      } else ;
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn$1(instance.props, key)) {
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        return false;
      } else {
        {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, propsOptions }
    }, key) {
      let normalizedProps;
      return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn$1(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  function normalizePropsOrEmits(props) {
    return isArray$3(props) ? props.reduce(
      (normalized, p2) => (normalized[p2] = null, normalized),
      {}
    ) : props;
  }
  let shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook$1(options.beforeCreate, instance, "bc");
    }
    const {
      // state
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      // lifecycle
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render: render11,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      // public API
      expose,
      inheritAttrs,
      // assets
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = null;
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction$3(methodHandler)) {
          {
            ctx[key] = methodHandler.bind(publicThis);
          }
        }
      }
    }
    if (dataOptions) {
      const data = dataOptions.call(publicThis, publicThis);
      if (!isObject$3(data)) ;
      else {
        instance.data = reactive(data);
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get = isFunction$3(opt) ? opt.bind(publicThis, publicThis) : isFunction$3(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        const set = !isFunction$3(opt) && isFunction$3(opt.set) ? opt.set.bind(publicThis) : NOOP;
        const c = computed({
          get,
          set
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction$3(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook$1(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray$3(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$3(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render11 && instance.render === NOOP) {
      instance.render = render11;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray$3(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject$3(opt)) {
        if ("default" in opt) {
          injected = inject(
            opt.from || key,
            opt.default,
            true
          );
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
    }
  }
  function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(
      isArray$3(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
      instance,
      type
    );
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString$3(raw)) {
      const handler = ctx[raw];
      if (isFunction$3(handler)) {
        {
          watch(getter, handler);
        }
      }
    } else if (isFunction$3(raw)) {
      {
        watch(getter, raw.bind(publicThis));
      }
    } else if (isObject$3(raw)) {
      if (isArray$3(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction$3(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction$3(handler)) {
          watch(getter, handler, raw);
        }
      }
    } else ;
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache2,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache2.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(
          (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
        );
      }
      mergeOptions$1(resolved, base, optionMergeStrategies);
    }
    if (isObject$3(base)) {
      cache2.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions$1(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions$1(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(
        (m) => mergeOptions$1(to, m, strats, true)
      );
    }
    for (const key in from) {
      if (asMixin && key === "expose") ;
      else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  const internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend$1(
        isFunction$3(to) ? to.call(this, this) : to,
        isFunction$3(from) ? from.call(this, this) : from
      );
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$3(raw)) {
      const res = {};
      for (let i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend$1(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray$3(to) && isArray$3(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend$1(
        /* @__PURE__ */ Object.create(null),
        normalizePropsOrEmits(to),
        normalizePropsOrEmits(from != null ? from : {})
      );
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    const merged = extend$1(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap(),
      propsCache: /* @__PURE__ */ new WeakMap(),
      emitsCache: /* @__PURE__ */ new WeakMap()
    };
  }
  let uid$1 = 0;
  function createAppAPI(render11, hydrate) {
    return function createApp2(rootComponent, rootProps = null) {
      if (!isFunction$3(rootComponent)) {
        rootComponent = extend$1({}, rootComponent);
      }
      if (rootProps != null && !isObject$3(rootProps)) {
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet();
      const pluginCleanupFns = [];
      let isMounted = false;
      const app2 = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) ;
          else if (plugin && isFunction$3(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app2, ...options);
          } else if (isFunction$3(plugin)) {
            installedPlugins.add(plugin);
            plugin(app2, ...options);
          } else ;
          return app2;
        },
        mixin(mixin) {
          {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            }
          }
          return app2;
        },
        component(name, component) {
          if (!component) {
            return context.components[name];
          }
          context.components[name] = component;
          return app2;
        },
        directive(name, directive) {
          if (!directive) {
            return context.directives[name];
          }
          context.directives[name] = directive;
          return app2;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            const vnode = app2._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = void 0;
            }
            {
              render11(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app2._container = rootContainer;
            rootContainer.__vue_app__ = app2;
            return getComponentPublicInstance(vnode.component);
          }
        },
        onUnmount(cleanupFn) {
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(
              pluginCleanupFns,
              app2._instance,
              16
            );
            render11(null, app2._container);
            delete app2._container.__vue_app__;
          }
        },
        provide(key, value) {
          context.provides[key] = value;
          return app2;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app2;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app2;
    };
  }
  let currentApp = null;
  function provide(key, value) {
    if (!currentInstance) ;
    else {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = currentInstance || currentRenderingInstance;
    if (instance || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction$3(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else ;
    }
  }
  function hasInjectionContext() {
    return !!(currentInstance || currentRenderingInstance || currentApp);
  }
  const internalObjectProto = {};
  const createInternalObject = () => Object.create(internalObjectProto);
  const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = void 0;
      }
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (
      // always force full diff in dev
      // - #1942 if hmr is enabled with sfc component
      // - vite#872 non-sfc component used by sfc component
      (optimized || patchFlag > 0) && !(patchFlag & 16)
    ) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0; i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn$1(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(
                options,
                rawCurrentProps,
                camelizedKey,
                value,
                instance,
                false
              );
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || // for camelCase
        !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && // for camelCase
            (rawPrevProps[key] !== void 0 || // for kebab-case
            rawPrevProps[kebabKey] !== void 0)) {
              props[key] = resolvePropValue(
                options,
                rawCurrentProps,
                key,
                void 0,
                instance,
                true
              );
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn$1(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn$1(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0; i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(
          options,
          rawCurrentProps,
          key,
          castValues[key],
          instance,
          !hasOwn$1(castValues, key)
        );
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn$1(opt, "default");
      if (hasDefault && value === void 0) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction$3(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(
              null,
              props
            );
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance.ce) {
          instance.ce._setProp(key, value);
        }
      }
      if (opt[
        0
        /* shouldCast */
      ]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[
          1
          /* shouldCastTrue */
        ] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  const mixinPropsCache = /* @__PURE__ */ new WeakMap();
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache2 = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache2.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction$3(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend$1(normalized, props);
        if (keys) needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject$3(comp)) {
        cache2.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray$3(raw)) {
      for (let i = 0; i < raw.length; i++) {
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray$3(opt) || isFunction$3(opt) ? { type: opt } : extend$1({}, opt);
          const propType = prop.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray$3(propType)) {
            for (let index2 = 0; index2 < propType.length; ++index2) {
              const type = propType[index2];
              const typeName = isFunction$3(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction$3(propType) && propType.name === "Boolean";
          }
          prop[
            0
            /* shouldCast */
          ] = shouldCast;
          prop[
            1
            /* shouldCastTrue */
          ] = shouldCastTrue;
          if (shouldCast || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject$3(comp)) {
      cache2.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    }
    return false;
  }
  const isInternalKey = (key) => key[0] === "_" || key === "$stable";
  const normalizeSlotValue = (value) => isArray$3(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  const normalizeSlot$1 = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (false) ;
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  const normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key)) continue;
      const value = rawSlots[key];
      if (isFunction$3(value)) {
        slots[key] = normalizeSlot$1(key, value, ctx);
      } else if (value != null) {
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  const normalizeVNodeSlots = (instance, children) => {
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  const assignSlots = (slots, children, optimized) => {
    for (const key in children) {
      if (optimized || !isInternalKey(key)) {
        slots[key] = children[key];
      }
    }
  };
  const initSlots = (instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  };
  const updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  const queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    const target = getGlobalThis$1();
    target.__VUE__ = true;
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref3, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          }
          break;
        case Fragment:
          processFragment(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          break;
        default:
          if (shapeFlag & 1) {
            processElement(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 6) {
            processComponent(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (shapeFlag & 64) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else if (shapeFlag & 128) {
            type.process(
              n1,
              n2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized,
              internals
            );
          } else ;
      }
      if (ref3 != null && parentComponent) {
        setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateText(n2.children),
          container,
          anchor
        );
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(
          n2.el = hostCreateComment(n2.children || ""),
          container,
          anchor
        );
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace,
        n2.el,
        n2.anchor
      );
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(
        vnode.type,
        namespace,
        props && props.is,
        props
      );
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(vnode, namespace),
          slotScopeIds,
          optimized
        );
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(
            el,
            parentVNode,
            parentVNode.scopeId,
            parentVNode.slotScopeIds,
            parentComponent.parent
          );
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start; i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(
          null,
          child,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          el,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds
        );
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          el,
          null,
          parentComponent,
          parentSuspense,
          resolveChildrenNamespace(n2, namespace),
          slotScopeIds,
          false
        );
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0; i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = (
          // oldVNode may be an errored async setup() component inside Suspense
          // which will not have a mounted element
          oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
          // of the Fragment itself so it can move its children.
          (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
          // which also requires the correct parent container
          !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
          oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
            // In other cases, the parent container is not actually used so we
            // just pass the block element here to avoid a DOM parentNode call.
            fallbackContainer
          )
        );
        patch(
          oldVNode,
          newVNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          true
        );
      }
    };
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(
                el,
                key,
                oldProps[key],
                null,
                namespace,
                parentComponent
              );
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key)) continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(
          // #10007
          // such fragment like `<></>` will be compiled into
          // a fragment which doesn't have a children.
          // In this case fallback to an empty array
          n2.children || [],
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          patchBlockChildren(
            n1.dynamicChildren,
            dynamicChildren,
            container,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds
          );
          if (
            // #2080 if the stable fragment has a key, it's a <template v-for> that may
            //  get moved around. Make sure all root level vnodes inherit el.
            // #2134 or if it's a component root, it may also get moved around
            // as the component is being moved.
            n2.key != null || parentComponent && n2 === parentComponent.subTree
          ) {
            traverseStaticChildren(
              n1,
              n2,
              true
              /* shallow */
            );
          }
        } else {
          patchChildren(
            n1,
            n2,
            container,
            fragmentEndAnchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(
            n2,
            container,
            anchor,
            namespace,
            optimized
          );
        } else {
          mountComponent(
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            optimized
          );
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      );
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        setupComponent(instance, false, optimized);
      }
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
      } else {
        setupRenderEffect(
          instance,
          initialVNode,
          container,
          anchor,
          parentSuspense,
          namespace,
          optimized
        );
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          updateComponentPreRender(instance, n2, optimized);
          return;
        } else {
          instance.next = n2;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent, root, type } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          {
            if (root.ce) {
              root.ce._injectChildStyle(type);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            patch(
              null,
              subTree,
              container,
              anchor,
              instance,
              parentSuspense,
              namespace
            );
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
              parentSuspense
            );
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                if (!instance.isUnmounted) {
                  componentUpdateFn();
                }
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          const nextTree = renderComponentRoot(instance);
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          patch(
            prevTree,
            nextTree,
            // parent may have changed if it's in a teleport
            hostParentNode(prevTree.el),
            // anchor may have changed if it's in a fragment
            getNextHostNode(prevTree),
            instance,
            parentSuspense,
            namespace
          );
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(
              () => invokeVNodeHook(vnodeHook, parent, next, vnode),
              parentSuspense
            );
          }
        }
      };
      instance.scope.on();
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
      instance.scope.off();
      const update = instance.update = effect2.run.bind(effect2);
      const job = instance.job = effect2.runIfDirty.bind(effect2);
      job.i = instance;
      job.id = instance.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance, true);
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(
              c1,
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(
              c2,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0; i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(
          c1[i],
          nextChild,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
      if (oldLength > newLength) {
        unmountChildren(
          c1,
          parentComponent,
          parentSuspense,
          true,
          false,
          commonLength
        );
      } else {
        mountChildren(
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized,
          commonLength
        );
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(
            n1,
            n2,
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(
              null,
              c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (i = s2; i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === void 0) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(
              prevChild,
              c2[newIndex],
              container,
              null,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1; i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(
              null,
              nextChild,
              container,
              anchor,
              parentComponent,
              parentSuspense,
              namespace,
              slotScopeIds,
              optimized
            );
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el);
            } else {
              hostInsert(el, container, anchor);
            }
          };
          const performLeave = () => {
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref3,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref3 != null) {
        pauseTracking();
        setRef(ref3, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = void 0;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(
            vnode,
            parentComponent,
            parentSuspense,
            internals,
            doRemove
          );
        } else if (dynamicChildren && // #5154
        // when v-once is used inside a block, setBlockTracking(-1) marks the
        // parent block with hasOnce: true
        // so that it doesn't take the fast path during unmount - otherwise
        // components nested in v-once are never unmounted.
        !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
        (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(
            dynamicChildren,
            parentComponent,
            parentSuspense,
            false,
            true
          );
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      const {
        bum,
        scope,
        job,
        subTree,
        um,
        m,
        a,
        parent,
        slots: { __: slotCacheKeys }
      } = instance;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      if (parent && isArray$3(slotCacheKeys)) {
        slotCacheKeys.forEach((v) => {
          parent.renderCache[v] = void 0;
        });
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    };
    let isFlushing = false;
    const render11 = (vnode, container, namespace) => {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(
          container._vnode || null,
          vnode,
          container,
          null,
          null,
          null,
          namespace
        );
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs();
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    return {
      render: render11,
      hydrate,
      createApp: createAppAPI(render11)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray$3(ch1) && isArray$3(ch2)) {
      for (let i = 0; i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  function getSequence(arr) {
    const p2 = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p2[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p2[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p2[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i = 0; i < hooks.length; i++)
        hooks[i].flags |= 8;
    }
  }
  const ssrContextKey = Symbol.for("v-scx");
  const useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      return ctx;
    }
  };
  function watch(source, cb, options) {
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    const baseWatchOptions = extend$1({}, options);
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {
        };
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance) {
          job.id = instance.uid;
          job.i = instance;
        }
      }
    };
    const watchHandle = watch$1(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString$3(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction$3(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  const getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted) return;
    const props = instance.vnode.props || EMPTY_OBJ;
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString$3(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(
        handler,
        instance,
        6,
        args
      );
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(
        onceHandler,
        instance,
        6,
        args
      );
    }
  }
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache2 = appContext.emitsCache;
    const cached = cache2.get(comp);
    if (cached !== void 0) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction$3(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend$1(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject$3(comp)) {
        cache2.set(comp, null);
      }
      return null;
    }
    if (isArray$3(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend$1(normalized, raw);
    }
    if (isObject$3(comp)) {
      cache2.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
  }
  function markAttrsAccessed() {
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render: render11,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = false ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(
              `Property '${String(
                key
              )}' was accessed via 'this'. Avoid using 'this' in templates.`
            );
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(
          render11.call(
            thisProxy,
            proxyToUse,
            renderCache,
            false ? shallowReadonly(props) : props,
            setupState,
            data,
            ctx
          )
        );
        fallthroughAttrs = attrs;
      } else {
        const render22 = Component;
        if (false) ;
        result = normalizeVNode(
          render22.length > 1 ? render22(
            false ? shallowReadonly(props) : props,
            false ? {
              get attrs() {
                markAttrsAccessed();
                return shallowReadonly(attrs);
              },
              slots,
              emit: emit2
            } : { attrs, slots, emit: emit2 }
          ) : render22(
            false ? shallowReadonly(props) : props,
            null
          )
        );
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(
              fallthroughAttrs,
              propsOptions
            );
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        }
      }
    }
    if (vnode.dirs) {
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      setTransitionHooks(root, vnode.transition);
    }
    {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0; i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl({ vnode, parent }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.el = vnode.el;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
  }
  const isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$3(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  const Fragment = Symbol.for("v-fgt");
  const Text = Symbol.for("v-txt");
  const Comment = Symbol.for("v-cmt");
  const Static = Symbol.for("v-stc");
  const blockStack = [];
  let currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  let isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(
      createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
      )
    );
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(
      createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
      )
    );
  }
  function isVNode$1(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    return n1.type === n2.type && n1.key === n2.key;
  }
  const normalizeKey = ({ key }) => key != null ? key : null;
  const normalizeRef = ({
    ref: ref3,
    ref_key,
    ref_for
  }) => {
    if (typeof ref3 === "number") {
      ref3 = "" + ref3;
    }
    return ref3 != null ? isString$3(ref3) || isRef(ref3) || isFunction$3(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString$3(children) ? 8 : 16;
    }
    if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
    !isBlockNode && // has current parent block
    currentBlock && // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  const createVNode = _createVNode;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      type = Comment;
    }
    if (isVNode$1(type)) {
      const cloned = cloneVNode(
        type,
        props,
        true
        /* mergeRef: true */
      );
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString$3(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject$3(style)) {
        if (isProxy(style) && !isArray$3(style)) {
          style = extend$1({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString$3(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$3(type) ? 4 : isFunction$3(type) ? 2 : 0;
    return createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      isBlockNode,
      true
    );
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return isProxy(props) || isInternalObject(props) ? extend$1({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref3, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? (
        // #2078 in the case of <component :is="vnode" ref="extra"/>
        // if the vnode itself already has a ref, cloneVNode will need to merge
        // the refs so the single vnode can be set on multiple refs
        mergeRef && ref3 ? isArray$3(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
      ) : ref3,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(
        cloned,
        transition.clone(cloned)
      );
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray$3(child)) {
      return createVNode(
        Fragment,
        null,
        // #3666, avoid reference pollution when reusing vnode
        child.slice()
      );
    } else if (isVNode$1(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray$3(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction$3(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0; i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray$3(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  const emptyAppContext = createAppContext();
  let uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      // to be immediately set
      next: null,
      subTree: null,
      // will be set synchronously right after creation
      effect: null,
      update: null,
      // will be set synchronously right after creation
      job: null,
      scope: new EffectScope(
        true
        /* detached */
      ),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      // to be set immediately
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    {
      instance.ctx = { _: instance };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  let currentInstance = null;
  const getCurrentInstance = () => currentInstance || currentRenderingInstance;
  let internalSetCurrentInstance;
  let setInSSRSetupState;
  {
    const g = getGlobalThis$1();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key])) setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1) setters.forEach((set) => set(v));
        else setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(
      `__VUE_INSTANCE_SETTERS__`,
      (v) => currentInstance = v
    );
    setInSSRSetupState = registerGlobalSetter(
      `__VUE_SSR_SETTERS__`,
      (v) => isInSSRComponentSetup = v
    );
  }
  const setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  const unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  let isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      const setupResult = callWithErrorHandling(
        setup,
        instance,
        0,
        [
          instance.props,
          setupContext
        ]
      );
      const isAsyncSetup = isPromise$1(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
        markAsyncBoundary(instance);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
        }
      } else {
        handleSetupResult(instance, setupResult);
      }
    } else {
      finishComponentSetup(instance);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction$3(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject$3(setupResult)) {
      instance.setupState = proxyRefs(setupResult);
    } else ;
    finishComponentSetup(instance);
  }
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      instance.render = Component.render || NOOP;
    }
    {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
  }
  const attrsProxyHandlers = {
    get(target, key) {
      track(target, "get", "");
      return target[key];
    }
  };
  function createSetupContext(instance) {
    const expose = (exposed) => {
      instance.exposed = exposed || {};
    };
    {
      return {
        attrs: new Proxy(instance.attrs, attrsProxyHandlers),
        slots: instance.slots,
        emit: instance.emit,
        expose
      };
    }
  }
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  const classifyRE = /(?:^|[-_])(\w)/g;
  const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction$3(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(
        instance.components || instance.parent.type.components
      ) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction$3(value) && "__vccOpts" in value;
  }
  const computed = (getterOrOptions, debugOptions) => {
    const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    return c;
  };
  function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject$3(propsOrChildren) && !isArray$3(propsOrChildren)) {
        if (isVNode$1(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode$1(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  const version = "3.5.15";
  /**
  * @vue/runtime-dom v3.5.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  let policy = void 0;
  const tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = /* @__PURE__ */ tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e) {
    }
  }
  const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  const svgNS = "http://www.w3.org/2000/svg";
  const mathmlNS = "http://www.w3.org/1998/Math/MathML";
  const doc = typeof document !== "undefined" ? document : null;
  const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  const nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(
          namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
        );
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        // first
        before ? before.nextSibling : parent.firstChild,
        // last
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  const TRANSITION$1 = "transition";
  const ANIMATION = "animation";
  const vtcKey = Symbol("_vtc");
  const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
      type: Boolean,
      default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
  };
  const TransitionPropsValidators = /* @__PURE__ */ extend$1(
    {},
    BaseTransitionPropsValidators,
    DOMTransitionPropsValidators
  );
  const callHook = (hook, args = []) => {
    if (isArray$3(hook)) {
      hook.forEach((h2) => h2(...args));
    } else if (hook) {
      hook(...args);
    }
  };
  const hasExplicitCallback = (hook) => {
    return hook ? isArray$3(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
  };
  function resolveTransitionProps(rawProps) {
    const baseProps = {};
    for (const key in rawProps) {
      if (!(key in DOMTransitionPropsValidators)) {
        baseProps[key] = rawProps[key];
      }
    }
    if (rawProps.css === false) {
      return baseProps;
    }
    const {
      name = "v",
      type,
      duration,
      enterFromClass = `${name}-enter-from`,
      enterActiveClass = `${name}-enter-active`,
      enterToClass = `${name}-enter-to`,
      appearFromClass = enterFromClass,
      appearActiveClass = enterActiveClass,
      appearToClass = enterToClass,
      leaveFromClass = `${name}-leave-from`,
      leaveActiveClass = `${name}-leave-active`,
      leaveToClass = `${name}-leave-to`
    } = rawProps;
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const {
      onBeforeEnter,
      onEnter,
      onEnterCancelled,
      onLeave,
      onLeaveCancelled,
      onBeforeAppear = onBeforeEnter,
      onAppear = onEnter,
      onAppearCancelled = onEnterCancelled
    } = baseProps;
    const finishEnter = (el, isAppear, done, isCancelled) => {
      el._enterCancelled = isCancelled;
      removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
      removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
      done && done();
    };
    const finishLeave = (el, done) => {
      el._isLeaving = false;
      removeTransitionClass(el, leaveFromClass);
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
      done && done();
    };
    const makeEnterHook = (isAppear) => {
      return (el, done) => {
        const hook = isAppear ? onAppear : onEnter;
        const resolve2 = () => finishEnter(el, isAppear, done);
        callHook(hook, [el, resolve2]);
        nextFrame(() => {
          removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
          addTransitionClass(el, isAppear ? appearToClass : enterToClass);
          if (!hasExplicitCallback(hook)) {
            whenTransitionEnds(el, type, enterDuration, resolve2);
          }
        });
      };
    };
    return extend$1(baseProps, {
      onBeforeEnter(el) {
        callHook(onBeforeEnter, [el]);
        addTransitionClass(el, enterFromClass);
        addTransitionClass(el, enterActiveClass);
      },
      onBeforeAppear(el) {
        callHook(onBeforeAppear, [el]);
        addTransitionClass(el, appearFromClass);
        addTransitionClass(el, appearActiveClass);
      },
      onEnter: makeEnterHook(false),
      onAppear: makeEnterHook(true),
      onLeave(el, done) {
        el._isLeaving = true;
        const resolve2 = () => finishLeave(el, done);
        addTransitionClass(el, leaveFromClass);
        if (!el._enterCancelled) {
          forceReflow();
          addTransitionClass(el, leaveActiveClass);
        } else {
          addTransitionClass(el, leaveActiveClass);
          forceReflow();
        }
        nextFrame(() => {
          if (!el._isLeaving) {
            return;
          }
          removeTransitionClass(el, leaveFromClass);
          addTransitionClass(el, leaveToClass);
          if (!hasExplicitCallback(onLeave)) {
            whenTransitionEnds(el, type, leaveDuration, resolve2);
          }
        });
        callHook(onLeave, [el, resolve2]);
      },
      onEnterCancelled(el) {
        finishEnter(el, false, void 0, true);
        callHook(onEnterCancelled, [el]);
      },
      onAppearCancelled(el) {
        finishEnter(el, true, void 0, true);
        callHook(onAppearCancelled, [el]);
      },
      onLeaveCancelled(el) {
        finishLeave(el);
        callHook(onLeaveCancelled, [el]);
      }
    });
  }
  function normalizeDuration(duration) {
    if (duration == null) {
      return null;
    } else if (isObject$3(duration)) {
      return [NumberOf(duration.enter), NumberOf(duration.leave)];
    } else {
      const n = NumberOf(duration);
      return [n, n];
    }
  }
  function NumberOf(val) {
    const res = toNumber(val);
    return res;
  }
  function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
    (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
  }
  function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.delete(cls);
      if (!_vtc.size) {
        el[vtcKey] = void 0;
      }
    }
  }
  function nextFrame(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
  let endId = 0;
  function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
    const id = el._endId = ++endId;
    const resolveIfNotStale = () => {
      if (id === el._endId) {
        resolve2();
      }
    };
    if (explicitTimeout != null) {
      return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
      return resolve2();
    }
    const endEvent = type + "end";
    let ended = 0;
    const end = () => {
      el.removeEventListener(endEvent, onEnd);
      resolveIfNotStale();
    };
    const onEnd = (e) => {
      if (e.target === el && ++ended >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
  }
  function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    const getStyleProperties = (key) => (styles[key] || "").split(", ");
    const transitionDelays = getStyleProperties(`${TRANSITION$1}Delay`);
    const transitionDurations = getStyleProperties(`${TRANSITION$1}Duration`);
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
    const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    if (expectedType === TRANSITION$1) {
      if (transitionTimeout > 0) {
        type = TRANSITION$1;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION$1 : ANIMATION : null;
      propCount = type ? type === TRANSITION$1 ? transitionDurations.length : animationDurations.length : 0;
    }
    const hasTransform = type === TRANSITION$1 && /\b(transform|all)(,|$)/.test(
      getStyleProperties(`${TRANSITION$1}Property`).toString()
    );
    return {
      type,
      timeout,
      propCount,
      hasTransform
    };
  }
  function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
  }
  function toMs(s) {
    if (s === "auto") return 0;
    return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function forceReflow() {
    return document.body.offsetHeight;
  }
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  const vShowOriginalDisplay = Symbol("_vod");
  const vShowHidden = Symbol("_vsh");
  const vShow = {
    beforeMount(el, { value }, { transition }) {
      el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
      if (transition && value) {
        transition.beforeEnter(el);
      } else {
        setDisplay(el, value);
      }
    },
    mounted(el, { value }, { transition }) {
      if (transition && value) {
        transition.enter(el);
      }
    },
    updated(el, { value, oldValue }, { transition }) {
      if (!value === !oldValue) return;
      if (transition) {
        if (value) {
          transition.beforeEnter(el);
          setDisplay(el, true);
          transition.enter(el);
        } else {
          transition.leave(el, () => {
            setDisplay(el, false);
          });
        }
      } else {
        setDisplay(el, value);
      }
    },
    beforeUnmount(el, { value }) {
      setDisplay(el, value);
    }
  };
  function setDisplay(el, value) {
    el.style.display = value ? el[vShowOriginalDisplay] : "none";
    el[vShowHidden] = !value;
  }
  const CSS_VAR_TEXT = Symbol("");
  const displayRE = /(^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString$3(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString$3(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  const importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$3(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null) val = "";
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(
            hyphenate(prefixed),
            val.replace(importantRE, ""),
            "important"
          );
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  const prefixes = ["Webkit", "Moz", "ms"];
  const prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize$1(name);
    for (let i = 0; i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  const xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(
          key,
          isBoolean2 ? "" : isSymbol(value) ? String(value) : value
        );
      }
    }
  }
  function patchDOMProp(el, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      if (value != null) {
        el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
    !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? (
        // #11647: value should be set as empty string for null and undefined,
        // but <input type="checkbox"> should be set as 'on'.
        el.type === "checkbox" ? "on" : ""
      ) : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
    }
    needRemove && el.removeAttribute(attrName || key);
  }
  function addEventListener$1(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener$1(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  const veiKey = Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = nextValue;
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(
          nextValue,
          instance
        );
        addEventListener$1(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener$1(el, name, existingInvoker, options);
        invokers[rawName] = void 0;
      }
    }
  }
  const optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  let cachedNow = 0;
  const p = /* @__PURE__ */ Promise.resolve();
  const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(
        patchStopImmediatePropagation(e, invoker.value),
        instance,
        5,
        [e]
      );
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$3(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map(
        (fn) => (e2) => !e2._stopped && fn && fn(e2)
      );
    } else {
      return value;
    }
  }
  const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
  key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue);
      if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else if (
      // #11081 force set props for possible async custom element
      el._isVueCE && (/[A-Z]/.test(key) || !isString$3(nextValue))
    ) {
      patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction$3(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString$3(value)) {
      return false;
    }
    return key in el;
  }
  const positionMap = /* @__PURE__ */ new WeakMap();
  const newPositionMap = /* @__PURE__ */ new WeakMap();
  const moveCbKey = Symbol("_moveCb");
  const enterCbKey = Symbol("_enterCb");
  const decorate = (t2) => {
    delete t2.props.mode;
    return t2;
  };
  const TransitionGroupImpl = /* @__PURE__ */ decorate({
    name: "TransitionGroup",
    props: /* @__PURE__ */ extend$1({}, TransitionPropsValidators, {
      tag: String,
      moveClass: String
    }),
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const state = useTransitionState();
      let prevChildren;
      let children;
      onUpdated(() => {
        if (!prevChildren.length) {
          return;
        }
        const moveClass = props.moveClass || `${props.name || "v"}-move`;
        if (!hasCSSTransform(
          prevChildren[0].el,
          instance.vnode.el,
          moveClass
        )) {
          prevChildren = [];
          return;
        }
        prevChildren.forEach(callPendingCbs);
        prevChildren.forEach(recordPosition);
        const movedChildren = prevChildren.filter(applyTranslation);
        forceReflow();
        movedChildren.forEach((c) => {
          const el = c.el;
          const style = el.style;
          addTransitionClass(el, moveClass);
          style.transform = style.webkitTransform = style.transitionDuration = "";
          const cb = el[moveCbKey] = (e) => {
            if (e && e.target !== el) {
              return;
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener("transitionend", cb);
              el[moveCbKey] = null;
              removeTransitionClass(el, moveClass);
            }
          };
          el.addEventListener("transitionend", cb);
        });
        prevChildren = [];
      });
      return () => {
        const rawProps = toRaw(props);
        const cssTransitionProps = resolveTransitionProps(rawProps);
        let tag = rawProps.tag || Fragment;
        prevChildren = [];
        if (children) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.el && child.el instanceof Element) {
              prevChildren.push(child);
              setTransitionHooks(
                child,
                resolveTransitionHooks(
                  child,
                  cssTransitionProps,
                  state,
                  instance
                )
              );
              positionMap.set(
                child,
                child.el.getBoundingClientRect()
              );
            }
          }
        }
        children = slots.default ? getTransitionRawChildren(slots.default()) : [];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child.key != null) {
            setTransitionHooks(
              child,
              resolveTransitionHooks(child, cssTransitionProps, state, instance)
            );
          }
        }
        return createVNode(tag, null, children);
      };
    }
  });
  const TransitionGroup = TransitionGroupImpl;
  function callPendingCbs(c) {
    const el = c.el;
    if (el[moveCbKey]) {
      el[moveCbKey]();
    }
    if (el[enterCbKey]) {
      el[enterCbKey]();
    }
  }
  function recordPosition(c) {
    newPositionMap.set(c, c.el.getBoundingClientRect());
  }
  function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
      const s = c.el.style;
      s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
      s.transitionDuration = "0s";
      return c;
    }
  }
  function hasCSSTransform(el, root, moveClass) {
    const clone = el.cloneNode();
    const _vtc = el[vtcKey];
    if (_vtc) {
      _vtc.forEach((cls) => {
        cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
      });
    }
    moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
    clone.style.display = "none";
    const container = root.nodeType === 1 ? root : root.parentNode;
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
  }
  const getModelAssigner = (vnode) => {
    const fn = vnode.props["onUpdate:modelValue"] || false;
    return isArray$3(fn) ? (value) => invokeArrayFns(fn, value) : fn;
  };
  function onCompositionStart(e) {
    e.target.composing = true;
  }
  function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
      target.composing = false;
      target.dispatchEvent(new Event("input"));
    }
  }
  const assignKey = Symbol("_assign");
  const vModelText = {
    created(el, { modifiers: { lazy, trim: trim2, number: number2 } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      const castToNumber = number2 || vnode.props && vnode.props.type === "number";
      addEventListener$1(el, lazy ? "change" : "input", (e) => {
        if (e.target.composing) return;
        let domValue = el.value;
        if (trim2) {
          domValue = domValue.trim();
        }
        if (castToNumber) {
          domValue = looseToNumber(domValue);
        }
        el[assignKey](domValue);
      });
      if (trim2) {
        addEventListener$1(el, "change", () => {
          el.value = el.value.trim();
        });
      }
      if (!lazy) {
        addEventListener$1(el, "compositionstart", onCompositionStart);
        addEventListener$1(el, "compositionend", onCompositionEnd);
        addEventListener$1(el, "change", onCompositionEnd);
      }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el, { value }) {
      el.value = value == null ? "" : value;
    },
    beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim: trim2, number: number2 } }, vnode) {
      el[assignKey] = getModelAssigner(vnode);
      if (el.composing) return;
      const elValue = (number2 || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
      const newValue = value == null ? "" : value;
      if (elValue === newValue) {
        return;
      }
      if (document.activeElement === el && el.type !== "range") {
        if (lazy && value === oldValue) {
          return;
        }
        if (trim2 && el.value.trim() === newValue) {
          return;
        }
      }
      el.value = newValue;
    }
  };
  const systemModifiers = ["ctrl", "shift", "alt", "meta"];
  const modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
  };
  const withModifiers = (fn, modifiers) => {
    const cache2 = fn._withMods || (fn._withMods = {});
    const cacheKey = modifiers.join(".");
    return cache2[cacheKey] || (cache2[cacheKey] = (event, ...args) => {
      for (let i = 0; i < modifiers.length; i++) {
        const guard = modifierGuards[modifiers[i]];
        if (guard && guard(event, modifiers)) return;
      }
      return fn(event, ...args);
    });
  };
  const rendererOptions = /* @__PURE__ */ extend$1({ patchProp }, nodeOps);
  let renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  const createApp = (...args) => {
    const app2 = ensureRenderer().createApp(...args);
    const { mount } = app2;
    app2.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container) return;
      const component = app2._component;
      if (!isFunction$3(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app2;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function normalizeContainer(container) {
    if (isString$3(container)) {
      const res = document.querySelector(container);
      return res;
    }
    return container;
  }
  /*!
    * vue-router v4.5.1
    * (c) 2025 Eduardo San Martin Morote
    * @license MIT
    */
  const isBrowser$1 = typeof document !== "undefined";
  function isRouteComponent(component) {
    return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
  }
  function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === "Module" || // support CF with dynamic imports that do not
    // add the Module string tag
    obj.default && isRouteComponent(obj.default);
  }
  const assign$2 = Object.assign;
  function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
      const value = params[key];
      newParams[key] = isArray$2(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  const noop$2 = () => {
  };
  const isArray$2 = Array.isArray;
  const HASH_RE = /#/g;
  const AMPERSAND_RE = /&/g;
  const SLASH_RE = /\//g;
  const EQUAL_RE = /=/g;
  const IM_RE = /\?/g;
  const PLUS_RE = /\+/g;
  const ENC_BRACKET_OPEN_RE = /%5B/g;
  const ENC_BRACKET_CLOSE_RE = /%5D/g;
  const ENC_CARET_RE = /%5E/g;
  const ENC_BACKTICK_RE = /%60/g;
  const ENC_CURLY_OPEN_RE = /%7B/g;
  const ENC_PIPE_RE = /%7C/g;
  const ENC_CURLY_CLOSE_RE = /%7D/g;
  const ENC_SPACE_RE = /%20/g;
  function commonEncode(text) {
    return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
  }
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryValue(text) {
    return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
  }
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
  }
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
  }
  function encodeParam(text) {
    return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
  }
  function decode(text) {
    try {
      return decodeURIComponent("" + text);
    } catch (err) {
    }
    return "" + text;
  }
  const TRAILING_SLASH_RE = /\/$/;
  const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
  function parseURL(parseQuery2, location2, currentLocation = "/") {
    let path, query = {}, searchString = "", hash = "";
    const hashPos = location2.indexOf("#");
    let searchPos = location2.indexOf("?");
    if (hashPos < searchPos && hashPos >= 0) {
      searchPos = -1;
    }
    if (searchPos > -1) {
      path = location2.slice(0, searchPos);
      searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
      query = parseQuery2(searchString);
    }
    if (hashPos > -1) {
      path = path || location2.slice(0, hashPos);
      hash = location2.slice(hashPos, location2.length);
    }
    path = resolveRelativePath(path != null ? path : location2, currentLocation);
    return {
      fullPath: path + (searchString && "?") + searchString + hash,
      path,
      query,
      hash: decode(hash)
    };
  }
  function stringifyURL(stringifyQuery2, location2) {
    const query = location2.query ? stringifyQuery2(location2.query) : "";
    return location2.path + (query && "?") + query + (location2.hash || "");
  }
  function stripBase(pathname, base) {
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
      return pathname;
    return pathname.slice(base.length) || "/";
  }
  function isSameRouteLocation(stringifyQuery2, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
  }
  function isSameRouteRecord(a, b) {
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false;
    for (const key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key]))
        return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return isArray$2(a) ? isEquivalentArray(a, b) : isArray$2(b) ? isEquivalentArray(b, a) : a === b;
  }
  function isEquivalentArray(a, b) {
    return isArray$2(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
  }
  function resolveRelativePath(to, from) {
    if (to.startsWith("/"))
      return to;
    if (!to)
      return from;
    const fromSegments = from.split("/");
    const toSegments = to.split("/");
    const lastToSegment = toSegments[toSegments.length - 1];
    if (lastToSegment === ".." || lastToSegment === ".") {
      toSegments.push("");
    }
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      if (segment === ".")
        continue;
      if (segment === "..") {
        if (position > 1)
          position--;
      } else
        break;
    }
    return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
  }
  const START_LOCATION_NORMALIZED = {
    path: "/",
    // TODO: could we use a symbol in the future?
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
  };
  var NavigationType;
  (function(NavigationType2) {
    NavigationType2["pop"] = "pop";
    NavigationType2["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function(NavigationDirection2) {
    NavigationDirection2["back"] = "back";
    NavigationDirection2["forward"] = "forward";
    NavigationDirection2["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  function normalizeBase(base) {
    if (!base) {
      if (isBrowser$1) {
        const baseEl = document.querySelector("base");
        base = baseEl && baseEl.getAttribute("href") || "/";
        base = base.replace(/^\w+:\/\/[^\/]+/, "");
      } else {
        base = "/";
      }
    }
    if (base[0] !== "/" && base[0] !== "#")
      base = "/" + base;
    return removeTrailingSlash(base);
  }
  const BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location2) {
    return base.replace(BEFORE_HASH_RE, "#") + location2;
  }
  function getElementPosition(el, offset) {
    const docRect = document.documentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      behavior: offset.behavior,
      left: elRect.left - docRect.left - (offset.left || 0),
      top: elRect.top - docRect.top - (offset.top || 0)
    };
  }
  const computeScrollPosition = () => ({
    left: window.scrollX,
    top: window.scrollY
  });
  function scrollToPosition(position) {
    let scrollToOptions;
    if ("el" in position) {
      const positionEl = position.el;
      const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
      const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
      if (!el) {
        return;
      }
      scrollToOptions = getElementPosition(el, position);
    } else {
      scrollToOptions = position;
    }
    if ("scrollBehavior" in document.documentElement.style)
      window.scrollTo(scrollToOptions);
    else {
      window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
    }
  }
  function getScrollKey(path, delta) {
    const position = history.state ? history.state.position - delta : -1;
    return position + path;
  }
  const scrollPositions = /* @__PURE__ */ new Map();
  function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
  }
  function getSavedScrollPosition(key) {
    const scroll = scrollPositions.get(key);
    scrollPositions.delete(key);
    return scroll;
  }
  let createBaseLocation = () => location.protocol + "//" + location.host;
  function createCurrentLocation(base, location2) {
    const { pathname, search, hash } = location2;
    const hashPos = base.indexOf("#");
    if (hashPos > -1) {
      let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      let pathFromHash = hash.slice(slicePos);
      if (pathFromHash[0] !== "/")
        pathFromHash = "/" + pathFromHash;
      return stripBase(pathFromHash, "");
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    let pauseState = null;
    const popStateHandler = ({ state }) => {
      const to = createCurrentLocation(base, location);
      const from = currentLocation.value;
      const fromState = historyState.value;
      let delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      listeners.forEach((listener) => {
        listener(currentLocation.value, from, {
          delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      listeners.push(callback);
      const teardown = () => {
        const index2 = listeners.indexOf(callback);
        if (index2 > -1)
          listeners.splice(index2, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      const { history: history2 } = window;
      if (!history2.state)
        return;
      history2.replaceState(assign$2({}, history2.state, { scroll: computeScrollPosition() }), "");
    }
    function destroy() {
      for (const teardown of teardowns)
        teardown();
      teardowns = [];
      window.removeEventListener("popstate", popStateHandler);
      window.removeEventListener("beforeunload", beforeUnloadListener);
    }
    window.addEventListener("popstate", popStateHandler);
    window.addEventListener("beforeunload", beforeUnloadListener, {
      passive: true
    });
    return {
      pauseListeners,
      listen,
      destroy
    };
  }
  function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    const { history: history2, location: location2 } = window;
    const currentLocation = {
      value: createCurrentLocation(base, location2)
    };
    const historyState = { value: history2.state };
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        // the length is off by one, we need to decrease it
        position: history2.length - 1,
        replaced: true,
        // don't add a scroll as the user may have an anchor, and we want
        // scrollBehavior to be triggered without a saved position
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace2) {
      const hashIndex = base.indexOf("#");
      const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        history2[replace2 ? "replaceState" : "pushState"](state, "", url);
        historyState.value = state;
      } catch (err) {
        {
          console.error(err);
        }
        location2[replace2 ? "replace" : "assign"](url);
      }
    }
    function replace(to, data) {
      const state = assign$2({}, history2.state, buildState(
        historyState.value.back,
        // keep back and forward entries but override current position
        to,
        historyState.value.forward,
        true
      ), data, { position: historyState.value.position });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      const currentState = assign$2(
        {},
        // use current history state to gracefully handle a wrong call to
        // history.replaceState
        // https://github.com/vuejs/router/issues/366
        historyState.value,
        history2.state,
        {
          forward: to,
          scroll: computeScrollPosition()
        }
      );
      changeLocation(currentState.current, currentState, true);
      const state = assign$2({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push,
      replace
    };
  }
  function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
      if (!triggerListeners)
        historyListeners.pauseListeners();
      history.go(delta);
    }
    const routerHistory = assign$2({
      // it's overridden right after
      location: "",
      base,
      go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, "location", {
      enumerable: true,
      get: () => historyNavigation.location.value
    });
    Object.defineProperty(routerHistory, "state", {
      enumerable: true,
      get: () => historyNavigation.state.value
    });
    return routerHistory;
  }
  function isRouteLocation(route) {
    return typeof route === "string" || route && typeof route === "object";
  }
  function isRouteName(name) {
    return typeof name === "string" || typeof name === "symbol";
  }
  const NavigationFailureSymbol = Symbol("");
  var NavigationFailureType;
  (function(NavigationFailureType2) {
    NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
    NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
    NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  function createRouterError(type, params) {
    {
      return assign$2(new Error(), {
        type,
        [NavigationFailureSymbol]: true
      }, params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  const BASE_PARAM_PATTERN = "[^/]+?";
  const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  function tokensToParser(segments, extraOptions) {
    const options = assign$2({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    const score = [];
    let pattern = options.start ? "^" : "";
    const keys = [];
    for (const segment of segments) {
      const segmentScores = segment.length ? [] : [
        90
        /* PathScore.Root */
      ];
      if (options.strict && !segment.length)
        pattern += "/";
      for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
        const token = segment[tokenIndex];
        let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
        if (token.type === 0) {
          if (!tokenIndex)
            pattern += "/";
          pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
          subSegmentScore += 40;
        } else if (token.type === 1) {
          const { value, repeatable, optional, regexp } = token;
          keys.push({
            name: value,
            repeatable,
            optional
          });
          const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
          if (re2 !== BASE_PARAM_PATTERN) {
            subSegmentScore += 10;
            try {
              new RegExp(`(${re2})`);
            } catch (err) {
              throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
            }
          }
          let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
          if (!tokenIndex)
            subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
            // or /:p?-:p2
            optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
          if (optional)
            subPattern += "?";
          pattern += subPattern;
          subSegmentScore += 20;
          if (optional)
            subSegmentScore += -8;
          if (repeatable)
            subSegmentScore += -20;
          if (re2 === ".*")
            subSegmentScore += -50;
        }
        segmentScores.push(subSegmentScore);
      }
      score.push(segmentScores);
    }
    if (options.strict && options.end) {
      const i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001;
    }
    if (!options.strict)
      pattern += "/?";
    if (options.end)
      pattern += "$";
    else if (options.strict && !pattern.endsWith("/"))
      pattern += "(?:/|$)";
    const re = new RegExp(pattern, options.sensitive ? "" : "i");
    function parse2(path) {
      const match = path.match(re);
      const params = {};
      if (!match)
        return null;
      for (let i = 1; i < match.length; i++) {
        const value = match[i] || "";
        const key = keys[i - 1];
        params[key.name] = value && key.repeatable ? value.split("/") : value;
      }
      return params;
    }
    function stringify(params) {
      let path = "";
      let avoidDuplicatedSlash = false;
      for (const segment of segments) {
        if (!avoidDuplicatedSlash || !path.endsWith("/"))
          path += "/";
        avoidDuplicatedSlash = false;
        for (const token of segment) {
          if (token.type === 0) {
            path += token.value;
          } else if (token.type === 1) {
            const { value, repeatable, optional } = token;
            const param = value in params ? params[value] : "";
            if (isArray$2(param) && !repeatable) {
              throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
            }
            const text = isArray$2(param) ? param.join("/") : param;
            if (!text) {
              if (optional) {
                if (segment.length < 2) {
                  if (path.endsWith("/"))
                    path = path.slice(0, -1);
                  else
                    avoidDuplicatedSlash = true;
                }
              } else
                throw new Error(`Missing required param "${value}"`);
            }
            path += text;
          }
        }
      }
      return path || "/";
    }
    return {
      re,
      score,
      keys,
      parse: parse2,
      stringify
    };
  }
  function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
      const diff = b[i] - a[i];
      if (diff)
        return diff;
      i++;
    }
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
    }
    return 0;
  }
  function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      const comp = compareScoreArray(aScore[i], bScore[i]);
      if (comp)
        return comp;
      i++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
      if (isLastScoreNegative(aScore))
        return 1;
      if (isLastScoreNegative(bScore))
        return -1;
    }
    return bScore.length - aScore.length;
  }
  function isLastScoreNegative(score) {
    const last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
  }
  const ROOT_TOKEN = {
    type: 0,
    value: ""
  };
  const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  function tokenizePath(path) {
    if (!path)
      return [[]];
    if (path === "/")
      return [[ROOT_TOKEN]];
    if (!path.startsWith("/")) {
      throw new Error(`Invalid path "${path}"`);
    }
    function crash(message) {
      throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0;
    let previousState = state;
    const tokens = [];
    let segment;
    function finalizeSegment() {
      if (segment)
        tokens.push(segment);
      segment = [];
    }
    let i = 0;
    let char;
    let buffer = "";
    let customRe = "";
    function consumeBuffer() {
      if (!buffer)
        return;
      if (state === 0) {
        segment.push({
          type: 0,
          value: buffer
        });
      } else if (state === 1 || state === 2 || state === 3) {
        if (segment.length > 1 && (char === "*" || char === "+"))
          crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
        segment.push({
          type: 1,
          value: buffer,
          regexp: customRe,
          repeatable: char === "*" || char === "+",
          optional: char === "*" || char === "?"
        });
      } else {
        crash("Invalid state to consume buffer");
      }
      buffer = "";
    }
    function addCharToBuffer() {
      buffer += char;
    }
    while (i < path.length) {
      char = path[i++];
      if (char === "\\" && state !== 2) {
        previousState = state;
        state = 4;
        continue;
      }
      switch (state) {
        case 0:
          if (char === "/") {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (char === ":") {
            consumeBuffer();
            state = 1;
          } else {
            addCharToBuffer();
          }
          break;
        case 4:
          addCharToBuffer();
          state = previousState;
          break;
        case 1:
          if (char === "(") {
            state = 2;
          } else if (VALID_PARAM_RE.test(char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0;
            if (char !== "*" && char !== "?" && char !== "+")
              i--;
          }
          break;
        case 2:
          if (char === ")") {
            if (customRe[customRe.length - 1] == "\\")
              customRe = customRe.slice(0, -1) + char;
            else
              state = 3;
          } else {
            customRe += char;
          }
          break;
        case 3:
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
          customRe = "";
          break;
        default:
          crash("Unknown state");
          break;
      }
    }
    if (state === 2)
      crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    const matcher = assign$2(parser, {
      record,
      parent,
      // these needs to be populated by the parent
      children: [],
      alias: []
    });
    if (parent) {
      if (!matcher.record.aliasOf === !parent.record.aliasOf)
        parent.children.push(matcher);
    }
    return matcher;
  }
  function createRouterMatcher(routes, globalOptions) {
    const matchers = [];
    const matcherMap = /* @__PURE__ */ new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      const isRootAdd = !originalRecord;
      const mainNormalizedRecord = normalizeRouteRecord(record);
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      const options = mergeOptions(globalOptions, record);
      const normalizedRecords = [mainNormalizedRecord];
      if ("alias" in record) {
        const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
        for (const alias of aliases) {
          normalizedRecords.push(
            // we need to normalize again to ensure the `mods` property
            // being non enumerable
            normalizeRouteRecord(assign$2({}, mainNormalizedRecord, {
              // this allows us to hold a copy of the `components` option
              // so that async components cache is hold on the original record
              components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
              path: alias,
              // we might be the child of an alias
              aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
              // the aliases are always of the same kind as the original since they
              // are defined on the same record
            }))
          );
        }
      }
      let matcher;
      let originalMatcher;
      for (const normalizedRecord of normalizedRecords) {
        const { path } = normalizedRecord;
        if (parent && path[0] !== "/") {
          const parentPath = parent.record.path;
          const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (originalRecord) {
          originalRecord.alias.push(matcher);
        } else {
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher)
            originalMatcher.alias.push(matcher);
          if (isRootAdd && record.name && !isAliasRecord(matcher)) {
            removeRoute(record.name);
          }
        }
        if (isMatchable(matcher)) {
          insertMatcher(matcher);
        }
        if (mainNormalizedRecord.children) {
          const children = mainNormalizedRecord.children;
          for (let i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        originalRecord = originalRecord || matcher;
      }
      return originalMatcher ? () => {
        removeRoute(originalMatcher);
      } : noop$2;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        const matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap.delete(matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        const index2 = matchers.indexOf(matcherRef);
        if (index2 > -1) {
          matchers.splice(index2, 1);
          if (matcherRef.record.name)
            matcherMap.delete(matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      const index2 = findInsertionIndex(matcher, matchers);
      matchers.splice(index2, 0, matcher);
      if (matcher.record.name && !isAliasRecord(matcher))
        matcherMap.set(matcher.record.name, matcher);
    }
    function resolve2(location2, currentLocation) {
      let matcher;
      let params = {};
      let path;
      let name;
      if ("name" in location2 && location2.name) {
        matcher = matcherMap.get(location2.name);
        if (!matcher)
          throw createRouterError(1, {
            location: location2
          });
        name = matcher.record.name;
        params = assign$2(
          // paramsFromLocation is a new object
          paramsFromLocation(
            currentLocation.params,
            // only keep params that exist in the resolved location
            // only keep optional params coming from a parent record
            matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)
          ),
          // discard any existing params in the current location that do not exist here
          // #1497 this ensures better active/exact matching
          location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
        );
        path = matcher.stringify(params);
      } else if (location2.path != null) {
        path = location2.path;
        matcher = matchers.find((m) => m.re.test(path));
        if (matcher) {
          params = matcher.parse(path);
          name = matcher.record.name;
        }
      } else {
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
        if (!matcher)
          throw createRouterError(1, {
            location: location2,
            currentLocation
          });
        name = matcher.record.name;
        params = assign$2({}, currentLocation.params, location2.params);
        path = matcher.stringify(params);
      }
      const matched = [];
      let parentMatcher = matcher;
      while (parentMatcher) {
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name,
        path,
        params,
        matched,
        meta: mergeMetaFields(matched)
      };
    }
    routes.forEach((route) => addRoute(route));
    function clearRoutes() {
      matchers.length = 0;
      matcherMap.clear();
    }
    return {
      addRoute,
      resolve: resolve2,
      removeRoute,
      clearRoutes,
      getRoutes,
      getRecordMatcher
    };
  }
  function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
      if (key in params)
        newParams[key] = params[key];
    }
    return newParams;
  }
  function normalizeRouteRecord(record) {
    const normalized = {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: record.aliasOf,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: /* @__PURE__ */ new Set(),
      updateGuards: /* @__PURE__ */ new Set(),
      enterCallbacks: {},
      // must be declared afterwards
      // mods: {},
      components: "components" in record ? record.components || null : record.component && { default: record.component }
    };
    Object.defineProperty(normalized, "mods", {
      value: {}
    });
    return normalized;
  }
  function normalizeRecordProps(record) {
    const propsObject = {};
    const props = record.props || false;
    if ("component" in record) {
      propsObject.default = props;
    } else {
      for (const name in record.components)
        propsObject[name] = typeof props === "object" ? props[name] : props;
    }
    return propsObject;
  }
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf)
        return true;
      record = record.parent;
    }
    return false;
  }
  function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign$2(meta, record.meta), {});
  }
  function mergeOptions(defaults2, partialOptions) {
    const options = {};
    for (const key in defaults2) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
    }
    return options;
  }
  function findInsertionIndex(matcher, matchers) {
    let lower = 0;
    let upper = matchers.length;
    while (lower !== upper) {
      const mid = lower + upper >> 1;
      const sortOrder = comparePathParserScore(matcher, matchers[mid]);
      if (sortOrder < 0) {
        upper = mid;
      } else {
        lower = mid + 1;
      }
    }
    const insertionAncestor = getInsertionAncestor(matcher);
    if (insertionAncestor) {
      upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    }
    return upper;
  }
  function getInsertionAncestor(matcher) {
    let ancestor = matcher;
    while (ancestor = ancestor.parent) {
      if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
        return ancestor;
      }
    }
    return;
  }
  function isMatchable({ record }) {
    return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
  }
  function parseQuery(search) {
    const query = {};
    if (search === "" || search === "?")
      return query;
    const hasLeadingIM = search[0] === "?";
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
    for (let i = 0; i < searchParams.length; ++i) {
      const searchParam = searchParams[i].replace(PLUS_RE, " ");
      const eqPos = searchParam.indexOf("=");
      const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        let currentValue = query[key];
        if (!isArray$2(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  function stringifyQuery(query) {
    let search = "";
    for (let key in query) {
      const value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        if (value !== void 0) {
          search += (search.length ? "&" : "") + key;
        }
        continue;
      }
      const values = isArray$2(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
      values.forEach((value2) => {
        if (value2 !== void 0) {
          search += (search.length ? "&" : "") + key;
          if (value2 != null)
            search += "=" + value2;
        }
      });
    }
    return search;
  }
  function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
      const value = query[key];
      if (value !== void 0) {
        normalizedQuery[key] = isArray$2(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
      }
    }
    return normalizedQuery;
  }
  const matchedRouteKey = Symbol("");
  const viewDepthKey = Symbol("");
  const routerKey = Symbol("");
  const routeLocationKey = Symbol("");
  const routerViewLocationKey = Symbol("");
  function useCallbacks() {
    let handlers = [];
    function add(handler) {
      handlers.push(handler);
      return () => {
        const i = handlers.indexOf(handler);
        if (i > -1)
          handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add,
      list: () => handlers.slice(),
      reset
    };
  }
  function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
    const enterCallbackArray = record && // name is defined if record is because of the function overload
    (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve2, reject) => {
      const next = (valid) => {
        if (valid === false) {
          reject(createRouterError(4, {
            from,
            to
          }));
        } else if (valid instanceof Error) {
          reject(valid);
        } else if (isRouteLocation(valid)) {
          reject(createRouterError(2, {
            from: to,
            to: valid
          }));
        } else {
          if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
          record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
            enterCallbackArray.push(valid);
          }
          resolve2();
        }
      };
      const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
      let guardCall = Promise.resolve(guardReturn);
      if (guard.length < 3)
        guardCall = guardCall.then(next);
      guardCall.catch((err) => reject(err));
    });
  }
  function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
    const guards = [];
    for (const record of matched) {
      for (const name in record.components) {
        let rawComponent = record.components[name];
        if (guardType !== "beforeRouteEnter" && !record.instances[name])
          continue;
        if (isRouteComponent(rawComponent)) {
          const options = rawComponent.__vccOpts || rawComponent;
          const guard = options[guardType];
          guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
        } else {
          let componentPromise = rawComponent();
          guards.push(() => componentPromise.then((resolved) => {
            if (!resolved)
              throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
            const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
            record.mods[name] = resolved;
            record.components[name] = resolvedComponent;
            const options = resolvedComponent.__vccOpts || resolvedComponent;
            const guard = options[guardType];
            return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
          }));
        }
      }
    }
    return guards;
  }
  function useLink(props) {
    const router2 = inject(routerKey);
    const currentRoute = inject(routeLocationKey);
    const route = computed(() => {
      const to = unref(props.to);
      return router2.resolve(to);
    });
    const activeRecordIndex = computed(() => {
      const { matched } = route.value;
      const { length } = matched;
      const routeMatched = matched[length - 1];
      const currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length)
        return -1;
      const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index2 > -1)
        return index2;
      const parentRecordPath = getOriginalPath(matched[length - 2]);
      return (
        // we are dealing with nested routes
        length > 1 && // if the parent and matched route have the same path, this link is
        // referring to the empty child. Or we currently are on a different
        // child of the same parent
        getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
        currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2
      );
    });
    const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
    const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
      if (guardEvent(e)) {
        const p2 = router2[unref(props.replace) ? "replace" : "push"](
          unref(props.to)
          // avoid uncaught errors are they are logged anyway
        ).catch(noop$2);
        if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) {
          document.startViewTransition(() => p2);
        }
        return p2;
      }
      return Promise.resolve();
    }
    return {
      route,
      href: computed(() => route.value.href),
      isActive,
      isExactActive,
      navigate
    };
  }
  function preferSingleVNode(vnodes) {
    return vnodes.length === 1 ? vnodes[0] : vnodes;
  }
  const RouterLinkImpl = /* @__PURE__ */ defineComponent({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      // inactiveClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: "page"
      },
      viewTransition: Boolean
    },
    useLink,
    setup(props, { slots }) {
      const link = reactive(useLink(props));
      const { options } = inject(routerKey);
      const elClass = computed(() => ({
        [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
        // [getLinkClass(
        //   props.inactiveClass,
        //   options.linkInactiveClass,
        //   'router-link-inactive'
        // )]: !link.isExactActive,
        [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
      }));
      return () => {
        const children = slots.default && preferSingleVNode(slots.default(link));
        return props.custom ? children : h("a", {
          "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          // this would override user added attrs but Vue will still add
          // the listener, so we end up triggering both
          onClick: link.navigate,
          class: elClass.value
        }, children);
      };
    }
  });
  const RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
      return;
    if (e.defaultPrevented)
      return;
    if (e.button !== void 0 && e.button !== 0)
      return;
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const target = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(target))
        return;
    }
    if (e.preventDefault)
      e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    for (const key in inner) {
      const innerValue = inner[key];
      const outerValue = outer[key];
      if (typeof innerValue === "string") {
        if (innerValue !== outerValue)
          return false;
      } else {
        if (!isArray$2(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
          return false;
      }
    }
    return true;
  }
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
  }
  const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  const RouterViewImpl = /* @__PURE__ */ defineComponent({
    name: "RouterView",
    // #674 we manually inherit them
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        default: "default"
      },
      route: Object
    },
    // Better compat for @vue/compat users
    // https://github.com/vuejs/router/issues/1315
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
      const injectedRoute = inject(routerViewLocationKey);
      const routeToDisplay = computed(() => props.route || injectedRoute.value);
      const injectedDepth = inject(viewDepthKey, 0);
      const depth = computed(() => {
        let initialDepth = unref(injectedDepth);
        const { matched } = routeToDisplay.value;
        let matchedRoute;
        while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
          initialDepth++;
        }
        return initialDepth;
      });
      const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
      provide(viewDepthKey, computed(() => depth.value + 1));
      provide(matchedRouteKey, matchedRouteRef);
      provide(routerViewLocationKey, routeToDisplay);
      const viewRef = ref();
      watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        if (instance && to && // if there is no instance but to and from are the same this might be
        // the first visit
        (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
        }
      }, { flush: "post" });
      return () => {
        const route = routeToDisplay.value;
        const currentName = props.name;
        const matchedRoute = matchedRouteRef.value;
        const ViewComponent = matchedRoute && matchedRoute.components[currentName];
        if (!ViewComponent) {
          return normalizeSlot(slots.default, { Component: ViewComponent, route });
        }
        const routePropsOption = matchedRoute.props[currentName];
        const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
        const onVnodeUnmounted = (vnode) => {
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        const component = h(ViewComponent, assign$2({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef
        }));
        return (
          // pass the vnode to the slot as a prop.
          // h and <component :is="..."> both accept vnodes
          normalizeSlot(slots.default, { Component: component, route }) || component
        );
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot)
      return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  const RouterView = RouterViewImpl;
  function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    if (isBrowser$1 && options.scrollBehavior && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = (
      // @ts-expect-error: intentionally avoid the type check
      applyToParams.bind(null, decode)
    );
    function addRoute(parentOrRoute, route) {
      let parent;
      let record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      const recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve2(rawLocation, currentLocation) {
      currentLocation = assign$2({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === "string") {
        const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
        const href2 = routerHistory.createHref(locationNormalized.fullPath);
        return assign$2(locationNormalized, matchedRoute2, {
          params: decodeParams(matchedRoute2.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: void 0,
          href: href2
        });
      }
      let matcherLocation;
      if (rawLocation.path != null) {
        matcherLocation = assign$2({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        const targetParams = assign$2({}, rawLocation.params);
        for (const key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        matcherLocation = assign$2({}, rawLocation, {
          params: encodeParams(targetParams)
        });
        currentLocation.params = encodeParams(currentLocation.params);
      }
      const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      const hash = rawLocation.hash || "";
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      const fullPath = stringifyURL(stringifyQuery$1, assign$2({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      const href = routerHistory.createHref(fullPath);
      return assign$2({
        fullPath,
        // keep the hash encoded so fullPath is effectively path + encodedQuery +
        // hash
        hash,
        query: (
          // if the user is using a custom query lib like qs, we might have
          // nested objects, so we keep the query as is, meaning it can contain
          // numbers at `$route.query`, but at the point, the user will have to
          // use their own type anyway.
          // https://github.com/vuejs/router/issues/328#issuecomment-649481567
          stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
        )
      }, matchedRoute, {
        redirectedFrom: void 0,
        href
      });
    }
    function locationAsObject(to) {
      return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign$2({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8, {
          from,
          to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign$2(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
      const lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        const { redirect } = lastMatched;
        let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
        if (typeof newTargetLocation === "string") {
          newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
            // force empty params
            { path: newTargetLocation }
          );
          newTargetLocation.params = {};
        }
        return assign$2({
          query: to.query,
          hash: to.hash,
          // avoid transferring params if the redirect has a path
          params: newTargetLocation.path != null ? {} : to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      const targetLocation = pendingLocation = resolve2(to);
      const from = currentRoute.value;
      const data = to.state;
      const force = to.force;
      const replace2 = to.replace === true;
      const shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect)
        return pushWithRedirect(
          assign$2(locationAsObject(shouldRedirect), {
            state: typeof shouldRedirect === "object" ? assign$2({}, data, shouldRedirect.state) : data,
            force,
            replace: replace2
          }),
          // keep original redirectedFrom if it exists
          redirectedFrom || targetLocation
        );
      const toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      let failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16, { to: toLocation, from });
        handleScroll(
          from,
          from,
          // this is a push, the only way for it to be triggered from a
          // history.listen is with a redirect, which makes it become a push
          true,
          // This cannot be the first navigation because the initial location
          // cannot be manually navigated to
          false
        );
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
        // navigation redirects still mark the router as ready
        isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ) ? error : markAsReady(error)
      ) : (
        // reject any unknown error
        triggerError(error, toLocation, from)
      )).then((failure2) => {
        if (failure2) {
          if (isNavigationFailure(
            failure2,
            2
            /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
          )) {
            return pushWithRedirect(
              // keep options
              assign$2({
                // preserve an existing replacement but allow the redirect to override it
                replace: replace2
              }, locationAsObject(failure2.to), {
                state: typeof failure2.to === "object" ? assign$2({}, data, failure2.to.state) : data,
                force
              }),
              // preserve the original redirectedFrom if any
              redirectedFrom || toLocation
            );
          }
        } else {
          failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
        }
        triggerAfterEach(toLocation, from, failure2);
        return failure2;
      });
    }
    function checkCanceledNavigationAndReject(to, from) {
      const error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    function runWithContext(fn) {
      const app2 = installedApps.values().next().value;
      return app2 && typeof app2.runWithContext === "function" ? app2.runWithContext(fn) : fn();
    }
    function navigate(to, from) {
      let guards;
      const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
      guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
      for (const record of leavingRecords) {
        record.leaveGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards).then(() => {
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const record of enteringRecords) {
          if (record.beforeEnter) {
            if (isArray$2(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        to.matched.forEach((record) => record.enterCallbacks = {});
        guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(() => {
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).catch((err) => isNavigationFailure(
        err,
        8
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? err : Promise.reject(err));
    }
    function triggerAfterEach(to, from, failure) {
      afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
    }
    function finalizeNavigation(toLocation, from, isPush, replace2, data) {
      const error = checkCanceledNavigation(toLocation, from);
      if (error)
        return error;
      const isFirstNavigation = from === START_LOCATION_NORMALIZED;
      const state = !isBrowser$1 ? {} : history.state;
      if (isPush) {
        if (replace2 || isFirstNavigation)
          routerHistory.replace(toLocation.fullPath, assign$2({
            scroll: isFirstNavigation && state && state.scroll
          }, data));
        else
          routerHistory.push(toLocation.fullPath, data);
      }
      currentRoute.value = toLocation;
      handleScroll(toLocation, from, isPush, isFirstNavigation);
      markAsReady();
    }
    let removeHistoryListener;
    function setupListeners() {
      if (removeHistoryListener)
        return;
      removeHistoryListener = routerHistory.listen((to, _from, info) => {
        if (!router2.listening)
          return;
        const toLocation = resolve2(to);
        const shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign$2(shouldRedirect, { replace: true, force: true }), toLocation).catch(noop$2);
          return;
        }
        pendingLocation = toLocation;
        const from = currentRoute.value;
        if (isBrowser$1) {
          saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
        }
        navigate(toLocation, from).catch((error) => {
          if (isNavigationFailure(
            error,
            4 | 8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            return error;
          }
          if (isNavigationFailure(
            error,
            2
            /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
          )) {
            pushWithRedirect(
              assign$2(locationAsObject(error.to), {
                force: true
              }),
              toLocation
              // avoid an uncaught rejection, let push call triggerError
            ).then((failure) => {
              if (isNavigationFailure(
                failure,
                4 | 16
                /* ErrorTypes.NAVIGATION_DUPLICATED */
              ) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            }).catch(noop$2);
            return Promise.reject();
          }
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          }
          return triggerError(error, toLocation, from);
        }).then((failure) => {
          failure = failure || finalizeNavigation(
            // after navigation, all matched components are resolved
            toLocation,
            from,
            false
          );
          if (failure) {
            if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
            // entry while a different route is displayed
            !isNavigationFailure(
              failure,
              8
              /* ErrorTypes.NAVIGATION_CANCELLED */
            )) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            )) {
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        }).catch(noop$2);
      });
    }
    let readyHandlers = useCallbacks();
    let errorListeners = useCallbacks();
    let ready;
    function triggerError(error, to, from) {
      markAsReady(error);
      const list = errorListeners.list();
      if (list.length) {
        list.forEach((handler) => handler(error, to, from));
      } else {
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
        return Promise.resolve();
      return new Promise((resolve22, reject) => {
        readyHandlers.add([resolve22, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(([resolve22, reject]) => err ? reject(err) : resolve22());
        readyHandlers.reset();
      }
      return err;
    }
    function handleScroll(to, from, isPush, isFirstNavigation) {
      const { scrollBehavior } = options;
      if (!isBrowser$1 || !scrollBehavior)
        return Promise.resolve();
      const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
      return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
    }
    const go = (delta) => routerHistory.go(delta);
    let started;
    const installedApps = /* @__PURE__ */ new Set();
    const router2 = {
      currentRoute,
      listening: true,
      addRoute,
      removeRoute,
      clearRoutes: matcher.clearRoutes,
      hasRoute,
      getRoutes,
      resolve: resolve2,
      options,
      push,
      replace,
      go,
      back: () => go(-1),
      forward: () => go(1),
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorListeners.add,
      isReady,
      install(app2) {
        const router22 = this;
        app2.component("RouterLink", RouterLink);
        app2.component("RouterView", RouterView);
        app2.config.globalProperties.$router = router22;
        Object.defineProperty(app2.config.globalProperties, "$route", {
          enumerable: true,
          get: () => unref(currentRoute)
        });
        if (isBrowser$1 && // used for the initial navigation client side to avoid pushing
        // multiple times when the router is used in multiple apps
        !started && currentRoute.value === START_LOCATION_NORMALIZED) {
          started = true;
          push(routerHistory.location).catch((err) => {
          });
        }
        const reactiveRoute = {};
        for (const key in START_LOCATION_NORMALIZED) {
          Object.defineProperty(reactiveRoute, key, {
            get: () => currentRoute.value[key],
            enumerable: true
          });
        }
        app2.provide(routerKey, router22);
        app2.provide(routeLocationKey, shallowReactive(reactiveRoute));
        app2.provide(routerViewLocationKey, currentRoute);
        const unmountApp = app2.unmount;
        installedApps.add(app2);
        app2.unmount = function() {
          installedApps.delete(app2);
          if (installedApps.size < 1) {
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            started = false;
            ready = false;
          }
          unmountApp();
        };
      }
    };
    function runGuardQueue(guards) {
      return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
    }
    return router2;
  }
  function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
          updatingRecords.push(recordFrom);
        else
          leavingRecords.push(recordFrom);
      }
      const recordTo = to.matched[i];
      if (recordTo) {
        if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
          enteringRecords.push(recordTo);
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }
  function useRouter() {
    return inject(routerKey);
  }
  function useRoute(_name) {
    return inject(routeLocationKey);
  }
  const _sfc_main$o = {
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createBlock(unref(RouterView));
      };
    }
  };
  var __defProp2 = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp2(a, prop, b[prop]);
      }
    return a;
  };
  var isFunction$2 = (value) => typeof value === "function";
  var isString$2 = (value) => typeof value === "string";
  var isNonEmptyString = (value) => isString$2(value) && value.trim().length > 0;
  var isNumber$2 = (value) => typeof value === "number";
  var isUndefined$1 = (value) => typeof value === "undefined";
  var isObject$2 = (value) => typeof value === "object" && value !== null;
  var isJSX = (obj) => hasProp(obj, "tag") && isNonEmptyString(obj.tag);
  var isTouchEvent = (event) => window.TouchEvent && event instanceof TouchEvent;
  var isToastComponent = (obj) => hasProp(obj, "component") && isToastContent(obj.component);
  var isVueComponent = (c) => isFunction$2(c) || isObject$2(c);
  var isToastContent = (obj) => !isUndefined$1(obj) && (isString$2(obj) || isVueComponent(obj) || isToastComponent(obj));
  var isDOMRect = (obj) => isObject$2(obj) && ["height", "width", "right", "left", "top", "bottom"].every((p2) => isNumber$2(obj[p2]));
  var hasProp = (obj, propKey) => (isObject$2(obj) || isFunction$2(obj)) && propKey in obj;
  var getId = /* @__PURE__ */ ((i) => () => i++)(0);
  function getX(event) {
    return isTouchEvent(event) ? event.targetTouches[0].clientX : event.clientX;
  }
  function getY(event) {
    return isTouchEvent(event) ? event.targetTouches[0].clientY : event.clientY;
  }
  var removeElement = (el) => {
    if (!isUndefined$1(el.remove)) {
      el.remove();
    } else if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  };
  var getVueComponentFromObj = (obj) => {
    if (isToastComponent(obj)) {
      return getVueComponentFromObj(obj.component);
    }
    if (isJSX(obj)) {
      return /* @__PURE__ */ defineComponent({
        render() {
          return obj;
        }
      });
    }
    return typeof obj === "string" ? obj : toRaw(unref(obj));
  };
  var normalizeToastComponent = (obj) => {
    if (typeof obj === "string") {
      return obj;
    }
    const props = hasProp(obj, "props") && isObject$2(obj.props) ? obj.props : {};
    const listeners = hasProp(obj, "listeners") && isObject$2(obj.listeners) ? obj.listeners : {};
    return { component: getVueComponentFromObj(obj), props, listeners };
  };
  var isBrowser = () => typeof window !== "undefined";
  var EventBus = class {
    constructor() {
      this.allHandlers = {};
    }
    getHandlers(eventType) {
      return this.allHandlers[eventType] || [];
    }
    on(eventType, handler) {
      const handlers = this.getHandlers(eventType);
      handlers.push(handler);
      this.allHandlers[eventType] = handlers;
    }
    off(eventType, handler) {
      const handlers = this.getHandlers(eventType);
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }
    emit(eventType, event) {
      const handlers = this.getHandlers(eventType);
      handlers.forEach((handler) => handler(event));
    }
  };
  var isEventBusInterface = (e) => ["on", "off", "emit"].every((f) => hasProp(e, f) && isFunction$2(e[f]));
  var TYPE;
  (function(TYPE2) {
    TYPE2["SUCCESS"] = "success";
    TYPE2["ERROR"] = "error";
    TYPE2["WARNING"] = "warning";
    TYPE2["INFO"] = "info";
    TYPE2["DEFAULT"] = "default";
  })(TYPE || (TYPE = {}));
  var POSITION;
  (function(POSITION2) {
    POSITION2["TOP_LEFT"] = "top-left";
    POSITION2["TOP_CENTER"] = "top-center";
    POSITION2["TOP_RIGHT"] = "top-right";
    POSITION2["BOTTOM_LEFT"] = "bottom-left";
    POSITION2["BOTTOM_CENTER"] = "bottom-center";
    POSITION2["BOTTOM_RIGHT"] = "bottom-right";
  })(POSITION || (POSITION = {}));
  var EVENTS;
  (function(EVENTS2) {
    EVENTS2["ADD"] = "add";
    EVENTS2["DISMISS"] = "dismiss";
    EVENTS2["UPDATE"] = "update";
    EVENTS2["CLEAR"] = "clear";
    EVENTS2["UPDATE_DEFAULTS"] = "update_defaults";
  })(EVENTS || (EVENTS = {}));
  var VT_NAMESPACE = "Vue-Toastification";
  var COMMON = {
    type: {
      type: String,
      default: TYPE.DEFAULT
    },
    classNames: {
      type: [String, Array],
      default: () => []
    },
    trueBoolean: {
      type: Boolean,
      default: true
    }
  };
  var ICON = {
    type: COMMON.type,
    customIcon: {
      type: [String, Boolean, Object, Function],
      default: true
    }
  };
  var CLOSE_BUTTON = {
    component: {
      type: [String, Object, Function, Boolean],
      default: "button"
    },
    classNames: COMMON.classNames,
    showOnHover: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: "close"
    }
  };
  var PROGRESS_BAR = {
    timeout: {
      type: [Number, Boolean],
      default: 5e3
    },
    hideProgressBar: {
      type: Boolean,
      default: false
    },
    isRunning: {
      type: Boolean,
      default: false
    }
  };
  var TRANSITION = {
    transition: {
      type: [Object, String],
      default: `${VT_NAMESPACE}__bounce`
    }
  };
  var CORE_TOAST = {
    position: {
      type: String,
      default: POSITION.TOP_RIGHT
    },
    draggable: COMMON.trueBoolean,
    draggablePercent: {
      type: Number,
      default: 0.6
    },
    pauseOnFocusLoss: COMMON.trueBoolean,
    pauseOnHover: COMMON.trueBoolean,
    closeOnClick: COMMON.trueBoolean,
    timeout: PROGRESS_BAR.timeout,
    hideProgressBar: PROGRESS_BAR.hideProgressBar,
    toastClassName: COMMON.classNames,
    bodyClassName: COMMON.classNames,
    icon: ICON.customIcon,
    closeButton: CLOSE_BUTTON.component,
    closeButtonClassName: CLOSE_BUTTON.classNames,
    showCloseButtonOnHover: CLOSE_BUTTON.showOnHover,
    accessibility: {
      type: Object,
      default: () => ({
        toastRole: "alert",
        closeButtonLabel: "close"
      })
    },
    rtl: {
      type: Boolean,
      default: false
    },
    eventBus: {
      type: Object,
      required: false,
      default: () => new EventBus()
    }
  };
  var TOAST = {
    id: {
      type: [String, Number],
      required: true,
      default: 0
    },
    type: COMMON.type,
    content: {
      type: [String, Object, Function],
      required: true,
      default: ""
    },
    onClick: {
      type: Function,
      default: void 0
    },
    onClose: {
      type: Function,
      default: void 0
    }
  };
  var CONTAINER = {
    container: {
      type: [
        Object,
        Function
      ],
      default: () => document.body
    },
    newestOnTop: COMMON.trueBoolean,
    maxToasts: {
      type: Number,
      default: 20
    },
    transition: TRANSITION.transition,
    toastDefaults: Object,
    filterBeforeCreate: {
      type: Function,
      default: (toast) => toast
    },
    filterToasts: {
      type: Function,
      default: (toasts) => toasts
    },
    containerClassName: COMMON.classNames,
    onMounted: Function,
    shareAppContext: [Boolean, Object]
  };
  var propValidators_default = {
    CORE_TOAST,
    TOAST,
    CONTAINER,
    PROGRESS_BAR,
    ICON,
    TRANSITION,
    CLOSE_BUTTON
  };
  var VtProgressBar_default = /* @__PURE__ */ defineComponent({
    name: "VtProgressBar",
    props: propValidators_default.PROGRESS_BAR,
    data() {
      return {
        hasClass: true
      };
    },
    computed: {
      style() {
        return {
          animationDuration: `${this.timeout}ms`,
          animationPlayState: this.isRunning ? "running" : "paused",
          opacity: this.hideProgressBar ? 0 : 1
        };
      },
      cpClass() {
        return this.hasClass ? `${VT_NAMESPACE}__progress-bar` : "";
      }
    },
    watch: {
      timeout() {
        this.hasClass = false;
        this.$nextTick(() => this.hasClass = true);
      }
    },
    mounted() {
      this.$el.addEventListener("animationend", this.animationEnded);
    },
    beforeUnmount() {
      this.$el.removeEventListener("animationend", this.animationEnded);
    },
    methods: {
      animationEnded() {
        this.$emit("close-toast");
      }
    }
  });
  function render(_ctx, _cache) {
    return openBlock(), createElementBlock("div", {
      style: normalizeStyle(_ctx.style),
      class: normalizeClass(_ctx.cpClass)
    }, null, 6);
  }
  VtProgressBar_default.render = render;
  var VtProgressBar_default2 = VtProgressBar_default;
  var VtCloseButton_default = /* @__PURE__ */ defineComponent({
    name: "VtCloseButton",
    props: propValidators_default.CLOSE_BUTTON,
    computed: {
      buttonComponent() {
        if (this.component !== false) {
          return getVueComponentFromObj(this.component);
        }
        return "button";
      },
      classes() {
        const classes = [`${VT_NAMESPACE}__close-button`];
        if (this.showOnHover) {
          classes.push("show-on-hover");
        }
        return classes.concat(this.classNames);
      }
    }
  });
  var _hoisted_1$o = /* @__PURE__ */ createTextVNode(" × ");
  function render2(_ctx, _cache) {
    return openBlock(), createBlock(resolveDynamicComponent(_ctx.buttonComponent), mergeProps({
      "aria-label": _ctx.ariaLabel,
      class: _ctx.classes
    }, _ctx.$attrs), {
      default: withCtx(() => [
        _hoisted_1$o
      ]),
      _: 1
    }, 16, ["aria-label", "class"]);
  }
  VtCloseButton_default.render = render2;
  var VtCloseButton_default2 = VtCloseButton_default;
  var VtSuccessIcon_default = {};
  var _hoisted_12$3 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "check-circle",
    class: "svg-inline--fa fa-check-circle fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  };
  var _hoisted_2$9 = /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
  }, null, -1);
  var _hoisted_3$9 = [
    _hoisted_2$9
  ];
  function render3(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_12$3, _hoisted_3$9);
  }
  VtSuccessIcon_default.render = render3;
  var VtSuccessIcon_default2 = VtSuccessIcon_default;
  var VtInfoIcon_default = {};
  var _hoisted_13$3 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "info-circle",
    class: "svg-inline--fa fa-info-circle fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  };
  var _hoisted_22$1 = /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
  }, null, -1);
  var _hoisted_32$1 = [
    _hoisted_22$1
  ];
  function render4(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_13$3, _hoisted_32$1);
  }
  VtInfoIcon_default.render = render4;
  var VtInfoIcon_default2 = VtInfoIcon_default;
  var VtWarningIcon_default = {};
  var _hoisted_14$3 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "exclamation-circle",
    class: "svg-inline--fa fa-exclamation-circle fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512"
  };
  var _hoisted_23$1 = /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
  }, null, -1);
  var _hoisted_33$1 = [
    _hoisted_23$1
  ];
  function render5(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_14$3, _hoisted_33$1);
  }
  VtWarningIcon_default.render = render5;
  var VtWarningIcon_default2 = VtWarningIcon_default;
  var VtErrorIcon_default = {};
  var _hoisted_15$3 = {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "fas",
    "data-icon": "exclamation-triangle",
    class: "svg-inline--fa fa-exclamation-triangle fa-w-18",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 576 512"
  };
  var _hoisted_24$1 = /* @__PURE__ */ createBaseVNode("path", {
    fill: "currentColor",
    d: "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
  }, null, -1);
  var _hoisted_34$1 = [
    _hoisted_24$1
  ];
  function render6(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_15$3, _hoisted_34$1);
  }
  VtErrorIcon_default.render = render6;
  var VtErrorIcon_default2 = VtErrorIcon_default;
  var VtIcon_default = /* @__PURE__ */ defineComponent({
    name: "VtIcon",
    props: propValidators_default.ICON,
    computed: {
      customIconChildren() {
        return hasProp(this.customIcon, "iconChildren") ? this.trimValue(this.customIcon.iconChildren) : "";
      },
      customIconClass() {
        if (isString$2(this.customIcon)) {
          return this.trimValue(this.customIcon);
        } else if (hasProp(this.customIcon, "iconClass")) {
          return this.trimValue(this.customIcon.iconClass);
        }
        return "";
      },
      customIconTag() {
        if (hasProp(this.customIcon, "iconTag")) {
          return this.trimValue(this.customIcon.iconTag, "i");
        }
        return "i";
      },
      hasCustomIcon() {
        return this.customIconClass.length > 0;
      },
      component() {
        if (this.hasCustomIcon) {
          return this.customIconTag;
        }
        if (isToastContent(this.customIcon)) {
          return getVueComponentFromObj(this.customIcon);
        }
        return this.iconTypeComponent;
      },
      iconTypeComponent() {
        const types = {
          [TYPE.DEFAULT]: VtInfoIcon_default2,
          [TYPE.INFO]: VtInfoIcon_default2,
          [TYPE.SUCCESS]: VtSuccessIcon_default2,
          [TYPE.ERROR]: VtErrorIcon_default2,
          [TYPE.WARNING]: VtWarningIcon_default2
        };
        return types[this.type];
      },
      iconClasses() {
        const classes = [`${VT_NAMESPACE}__icon`];
        if (this.hasCustomIcon) {
          return classes.concat(this.customIconClass);
        }
        return classes;
      }
    },
    methods: {
      trimValue(value, empty = "") {
        return isNonEmptyString(value) ? value.trim() : empty;
      }
    }
  });
  function render7(_ctx, _cache) {
    return openBlock(), createBlock(resolveDynamicComponent(_ctx.component), {
      class: normalizeClass(_ctx.iconClasses)
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString$1(_ctx.customIconChildren), 1)
      ]),
      _: 1
    }, 8, ["class"]);
  }
  VtIcon_default.render = render7;
  var VtIcon_default2 = VtIcon_default;
  var VtToast_default = /* @__PURE__ */ defineComponent({
    name: "VtToast",
    components: { ProgressBar: VtProgressBar_default2, CloseButton: VtCloseButton_default2, Icon: VtIcon_default2 },
    inheritAttrs: false,
    props: Object.assign({}, propValidators_default.CORE_TOAST, propValidators_default.TOAST),
    data() {
      const data = {
        isRunning: true,
        disableTransitions: false,
        beingDragged: false,
        dragStart: 0,
        dragPos: { x: 0, y: 0 },
        dragRect: {}
      };
      return data;
    },
    computed: {
      classes() {
        const classes = [
          `${VT_NAMESPACE}__toast`,
          `${VT_NAMESPACE}__toast--${this.type}`,
          `${this.position}`
        ].concat(this.toastClassName);
        if (this.disableTransitions) {
          classes.push("disable-transition");
        }
        if (this.rtl) {
          classes.push(`${VT_NAMESPACE}__toast--rtl`);
        }
        return classes;
      },
      bodyClasses() {
        const classes = [
          `${VT_NAMESPACE}__toast-${isString$2(this.content) ? "body" : "component-body"}`
        ].concat(this.bodyClassName);
        return classes;
      },
      draggableStyle() {
        if (this.dragStart === this.dragPos.x) {
          return {};
        } else if (this.beingDragged) {
          return {
            transform: `translateX(${this.dragDelta}px)`,
            opacity: 1 - Math.abs(this.dragDelta / this.removalDistance)
          };
        } else {
          return {
            transition: "transform 0.2s, opacity 0.2s",
            transform: "translateX(0)",
            opacity: 1
          };
        }
      },
      dragDelta() {
        return this.beingDragged ? this.dragPos.x - this.dragStart : 0;
      },
      removalDistance() {
        if (isDOMRect(this.dragRect)) {
          return (this.dragRect.right - this.dragRect.left) * this.draggablePercent;
        }
        return 0;
      }
    },
    mounted() {
      if (this.draggable) {
        this.draggableSetup();
      }
      if (this.pauseOnFocusLoss) {
        this.focusSetup();
      }
    },
    beforeUnmount() {
      if (this.draggable) {
        this.draggableCleanup();
      }
      if (this.pauseOnFocusLoss) {
        this.focusCleanup();
      }
    },
    methods: {
      hasProp,
      getVueComponentFromObj,
      closeToast() {
        this.eventBus.emit(EVENTS.DISMISS, this.id);
      },
      clickHandler() {
        if (this.onClick) {
          this.onClick(this.closeToast);
        }
        if (this.closeOnClick) {
          if (!this.beingDragged || this.dragStart === this.dragPos.x) {
            this.closeToast();
          }
        }
      },
      timeoutHandler() {
        this.closeToast();
      },
      hoverPause() {
        if (this.pauseOnHover) {
          this.isRunning = false;
        }
      },
      hoverPlay() {
        if (this.pauseOnHover) {
          this.isRunning = true;
        }
      },
      focusPause() {
        this.isRunning = false;
      },
      focusPlay() {
        this.isRunning = true;
      },
      focusSetup() {
        addEventListener("blur", this.focusPause);
        addEventListener("focus", this.focusPlay);
      },
      focusCleanup() {
        removeEventListener("blur", this.focusPause);
        removeEventListener("focus", this.focusPlay);
      },
      draggableSetup() {
        const element = this.$el;
        element.addEventListener("touchstart", this.onDragStart, {
          passive: true
        });
        element.addEventListener("mousedown", this.onDragStart);
        addEventListener("touchmove", this.onDragMove, { passive: false });
        addEventListener("mousemove", this.onDragMove);
        addEventListener("touchend", this.onDragEnd);
        addEventListener("mouseup", this.onDragEnd);
      },
      draggableCleanup() {
        const element = this.$el;
        element.removeEventListener("touchstart", this.onDragStart);
        element.removeEventListener("mousedown", this.onDragStart);
        removeEventListener("touchmove", this.onDragMove);
        removeEventListener("mousemove", this.onDragMove);
        removeEventListener("touchend", this.onDragEnd);
        removeEventListener("mouseup", this.onDragEnd);
      },
      onDragStart(event) {
        this.beingDragged = true;
        this.dragPos = { x: getX(event), y: getY(event) };
        this.dragStart = getX(event);
        this.dragRect = this.$el.getBoundingClientRect();
      },
      onDragMove(event) {
        if (this.beingDragged) {
          event.preventDefault();
          if (this.isRunning) {
            this.isRunning = false;
          }
          this.dragPos = { x: getX(event), y: getY(event) };
        }
      },
      onDragEnd() {
        if (this.beingDragged) {
          if (Math.abs(this.dragDelta) >= this.removalDistance) {
            this.disableTransitions = true;
            this.$nextTick(() => this.closeToast());
          } else {
            setTimeout(() => {
              this.beingDragged = false;
              if (isDOMRect(this.dragRect) && this.pauseOnHover && this.dragRect.bottom >= this.dragPos.y && this.dragPos.y >= this.dragRect.top && this.dragRect.left <= this.dragPos.x && this.dragPos.x <= this.dragRect.right) {
                this.isRunning = false;
              } else {
                this.isRunning = true;
              }
            });
          }
        }
      }
    }
  });
  var _hoisted_16$2 = ["role"];
  function render8(_ctx, _cache) {
    const _component_Icon = resolveComponent("Icon");
    const _component_CloseButton = resolveComponent("CloseButton");
    const _component_ProgressBar = resolveComponent("ProgressBar");
    return openBlock(), createElementBlock("div", {
      class: normalizeClass(_ctx.classes),
      style: normalizeStyle(_ctx.draggableStyle),
      onClick: _cache[0] || (_cache[0] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
      onMouseenter: _cache[1] || (_cache[1] = (...args) => _ctx.hoverPause && _ctx.hoverPause(...args)),
      onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.hoverPlay && _ctx.hoverPlay(...args))
    }, [
      _ctx.icon ? (openBlock(), createBlock(_component_Icon, {
        key: 0,
        "custom-icon": _ctx.icon,
        type: _ctx.type
      }, null, 8, ["custom-icon", "type"])) : createCommentVNode("v-if", true),
      createBaseVNode("div", {
        role: _ctx.accessibility.toastRole || "alert",
        class: normalizeClass(_ctx.bodyClasses)
      }, [
        typeof _ctx.content === "string" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createTextVNode(toDisplayString$1(_ctx.content), 1)
        ], 2112)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.getVueComponentFromObj(_ctx.content)), mergeProps({
          key: 1,
          "toast-id": _ctx.id
        }, _ctx.hasProp(_ctx.content, "props") ? _ctx.content.props : {}, toHandlers(_ctx.hasProp(_ctx.content, "listeners") ? _ctx.content.listeners : {}), { onCloseToast: _ctx.closeToast }), null, 16, ["toast-id", "onCloseToast"]))
      ], 10, _hoisted_16$2),
      !!_ctx.closeButton ? (openBlock(), createBlock(_component_CloseButton, {
        key: 1,
        component: _ctx.closeButton,
        "class-names": _ctx.closeButtonClassName,
        "show-on-hover": _ctx.showCloseButtonOnHover,
        "aria-label": _ctx.accessibility.closeButtonLabel,
        onClick: withModifiers(_ctx.closeToast, ["stop"])
      }, null, 8, ["component", "class-names", "show-on-hover", "aria-label", "onClick"])) : createCommentVNode("v-if", true),
      _ctx.timeout ? (openBlock(), createBlock(_component_ProgressBar, {
        key: 2,
        "is-running": _ctx.isRunning,
        "hide-progress-bar": _ctx.hideProgressBar,
        timeout: _ctx.timeout,
        onCloseToast: _ctx.timeoutHandler
      }, null, 8, ["is-running", "hide-progress-bar", "timeout", "onCloseToast"])) : createCommentVNode("v-if", true)
    ], 38);
  }
  VtToast_default.render = render8;
  var VtToast_default2 = VtToast_default;
  var VtTransition_default = /* @__PURE__ */ defineComponent({
    name: "VtTransition",
    props: propValidators_default.TRANSITION,
    emits: ["leave"],
    methods: {
      hasProp,
      leave(el) {
        if (el instanceof HTMLElement) {
          el.style.left = el.offsetLeft + "px";
          el.style.top = el.offsetTop + "px";
          el.style.width = getComputedStyle(el).width;
          el.style.position = "absolute";
        }
      }
    }
  });
  function render9(_ctx, _cache) {
    return openBlock(), createBlock(TransitionGroup, {
      tag: "div",
      "enter-active-class": _ctx.transition.enter ? _ctx.transition.enter : `${_ctx.transition}-enter-active`,
      "move-class": _ctx.transition.move ? _ctx.transition.move : `${_ctx.transition}-move`,
      "leave-active-class": _ctx.transition.leave ? _ctx.transition.leave : `${_ctx.transition}-leave-active`,
      onLeave: _ctx.leave
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "default")
      ]),
      _: 3
    }, 8, ["enter-active-class", "move-class", "leave-active-class", "onLeave"]);
  }
  VtTransition_default.render = render9;
  var VtTransition_default2 = VtTransition_default;
  var VtToastContainer_default = /* @__PURE__ */ defineComponent({
    name: "VueToastification",
    devtools: {
      hide: true
    },
    components: { Toast: VtToast_default2, VtTransition: VtTransition_default2 },
    props: Object.assign({}, propValidators_default.CORE_TOAST, propValidators_default.CONTAINER, propValidators_default.TRANSITION),
    data() {
      const data = {
        count: 0,
        positions: Object.values(POSITION),
        toasts: {},
        defaults: {}
      };
      return data;
    },
    computed: {
      toastArray() {
        return Object.values(this.toasts);
      },
      filteredToasts() {
        return this.defaults.filterToasts(this.toastArray);
      }
    },
    beforeMount() {
      const events = this.eventBus;
      events.on(EVENTS.ADD, this.addToast);
      events.on(EVENTS.CLEAR, this.clearToasts);
      events.on(EVENTS.DISMISS, this.dismissToast);
      events.on(EVENTS.UPDATE, this.updateToast);
      events.on(EVENTS.UPDATE_DEFAULTS, this.updateDefaults);
      this.defaults = this.$props;
    },
    mounted() {
      this.setup(this.container);
    },
    methods: {
      async setup(container) {
        if (isFunction$2(container)) {
          container = await container();
        }
        removeElement(this.$el);
        container.appendChild(this.$el);
      },
      setToast(props) {
        if (!isUndefined$1(props.id)) {
          this.toasts[props.id] = props;
        }
      },
      addToast(params) {
        params.content = normalizeToastComponent(params.content);
        const props = Object.assign({}, this.defaults, params.type && this.defaults.toastDefaults && this.defaults.toastDefaults[params.type], params);
        const toast = this.defaults.filterBeforeCreate(props, this.toastArray);
        toast && this.setToast(toast);
      },
      dismissToast(id) {
        const toast = this.toasts[id];
        if (!isUndefined$1(toast) && !isUndefined$1(toast.onClose)) {
          toast.onClose();
        }
        delete this.toasts[id];
      },
      clearToasts() {
        Object.keys(this.toasts).forEach((id) => {
          this.dismissToast(id);
        });
      },
      getPositionToasts(position) {
        const toasts = this.filteredToasts.filter((toast) => toast.position === position).slice(0, this.defaults.maxToasts);
        return this.defaults.newestOnTop ? toasts.reverse() : toasts;
      },
      updateDefaults(update) {
        if (!isUndefined$1(update.container)) {
          this.setup(update.container);
        }
        this.defaults = Object.assign({}, this.defaults, update);
      },
      updateToast({
        id,
        options,
        create: create2
      }) {
        if (this.toasts[id]) {
          if (options.timeout && options.timeout === this.toasts[id].timeout) {
            options.timeout++;
          }
          this.setToast(Object.assign({}, this.toasts[id], options));
        } else if (create2) {
          this.addToast(Object.assign({}, { id }, options));
        }
      },
      getClasses(position) {
        const classes = [`${VT_NAMESPACE}__container`, position];
        return classes.concat(this.defaults.containerClassName);
      }
    }
  });
  function render10(_ctx, _cache) {
    const _component_Toast = resolveComponent("Toast");
    const _component_VtTransition = resolveComponent("VtTransition");
    return openBlock(), createElementBlock("div", null, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.positions, (pos) => {
        return openBlock(), createElementBlock("div", { key: pos }, [
          createVNode(_component_VtTransition, {
            transition: _ctx.defaults.transition,
            class: normalizeClass(_ctx.getClasses(pos))
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getPositionToasts(pos), (toast) => {
                return openBlock(), createBlock(_component_Toast, mergeProps({
                  key: toast.id
                }, toast), null, 16);
              }), 128))
            ]),
            _: 2
          }, 1032, ["transition", "class"])
        ]);
      }), 128))
    ]);
  }
  VtToastContainer_default.render = render10;
  var VtToastContainer_default2 = VtToastContainer_default;
  var buildInterface = (globalOptions = {}, mountContainer = true) => {
    const events = globalOptions.eventBus = globalOptions.eventBus || new EventBus();
    if (mountContainer) {
      nextTick(() => {
        const app2 = createApp(VtToastContainer_default2, __spreadValues({}, globalOptions));
        const component = app2.mount(document.createElement("div"));
        const onMounted2 = globalOptions.onMounted;
        if (!isUndefined$1(onMounted2)) {
          onMounted2(component, app2);
        }
        if (globalOptions.shareAppContext) {
          const baseApp = globalOptions.shareAppContext;
          if (baseApp === true) {
            console.warn(`[${VT_NAMESPACE}] App to share context with was not provided.`);
          } else {
            app2._context.components = baseApp._context.components;
            app2._context.directives = baseApp._context.directives;
            app2._context.mixins = baseApp._context.mixins;
            app2._context.provides = baseApp._context.provides;
            app2.config.globalProperties = baseApp.config.globalProperties;
          }
        }
      });
    }
    const toast = (content, options) => {
      const props = Object.assign({}, { id: getId(), type: TYPE.DEFAULT }, options, {
        content
      });
      events.emit(EVENTS.ADD, props);
      return props.id;
    };
    toast.clear = () => events.emit(EVENTS.CLEAR, void 0);
    toast.updateDefaults = (update) => {
      events.emit(EVENTS.UPDATE_DEFAULTS, update);
    };
    toast.dismiss = (id) => {
      events.emit(EVENTS.DISMISS, id);
    };
    function updateToast(id, { content, options }, create2 = false) {
      const opt = Object.assign({}, options, { content });
      events.emit(EVENTS.UPDATE, {
        id,
        options: opt,
        create: create2
      });
    }
    toast.update = updateToast;
    toast.success = (content, options) => toast(content, Object.assign({}, options, { type: TYPE.SUCCESS }));
    toast.info = (content, options) => toast(content, Object.assign({}, options, { type: TYPE.INFO }));
    toast.error = (content, options) => toast(content, Object.assign({}, options, { type: TYPE.ERROR }));
    toast.warning = (content, options) => toast(content, Object.assign({}, options, { type: TYPE.WARNING }));
    return toast;
  };
  var createMockToastInterface = () => {
    const toast = () => console.warn(`[${VT_NAMESPACE}] This plugin does not support SSR!`);
    return new Proxy(toast, {
      get() {
        return toast;
      }
    });
  };
  function createToastInterface(optionsOrEventBus) {
    if (!isBrowser()) {
      return createMockToastInterface();
    }
    if (isEventBusInterface(optionsOrEventBus)) {
      return buildInterface({ eventBus: optionsOrEventBus }, false);
    }
    return buildInterface(optionsOrEventBus, true);
  }
  var toastInjectionKey = Symbol("VueToastification");
  var globalEventBus = new EventBus();
  var VueToastificationPlugin = (App, options) => {
    if ((options == null ? void 0 : options.shareAppContext) === true) {
      options.shareAppContext = App;
    }
    const inter = createToastInterface(__spreadValues({
      eventBus: globalEventBus
    }, options));
    App.provide(toastInjectionKey, inter);
  };
  var useToast = (eventBus) => {
    const toast = getCurrentInstance() ? inject(toastInjectionKey, void 0) : void 0;
    return toast ? toast : createToastInterface(globalEventBus);
  };
  var src_default = VueToastificationPlugin;
  useToast();
  const scriptRel = "modulepreload";
  const assetsURL = function(dep) {
    return "/stan-webapp/" + dep;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (false) {
      let allSettled2 = function(promises) {
        return Promise.all(
          promises.map(
            (p2) => Promise.resolve(p2).then(
              (value) => ({ status: "fulfilled", value }),
              (reason) => ({ status: "rejected", reason })
            )
          )
        );
      };
      document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector(
        "meta[property=csp-nonce]"
      );
      const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
      promise = allSettled2(
        deps.map((dep) => {
          dep = assetsURL(dep);
          if (dep in seen) return;
          seen[dep] = true;
          const isCss = dep.endsWith(".css");
          const cssSelector = isCss ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
          }
          const link = document.createElement("link");
          link.rel = isCss ? "stylesheet" : scriptRel;
          if (!isCss) {
            link.as = "script";
          }
          link.crossOrigin = "";
          link.href = dep;
          if (cspNonce) {
            link.setAttribute("nonce", cspNonce);
          }
          document.head.appendChild(link);
          if (isCss) {
            return new Promise((res, rej) => {
              link.addEventListener("load", res);
              link.addEventListener(
                "error",
                () => rej(new Error(`Unable to preload CSS for ${dep}`))
              );
            });
          }
        })
      );
    }
    function handlePreloadError(err) {
      const e = new Event("vite:preloadError", {
        cancelable: true
      });
      e.payload = err;
      window.dispatchEvent(e);
      if (!e.defaultPrevented) {
        throw err;
      }
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  const router = createRouter({
    history: createWebHistory("/stan-webapp/"),
    routes: [
      {
        name: "root",
        path: "/",
        redirect: () => {
          const preferences = localStorage.getItem("preferences");
          if (!preferences) {
            localStorage.setItem("preferences", JSON.stringify({ home: "accueil", language: "fr" }));
          }
          const savedPreferences = JSON.parse(localStorage.getItem("preferences"));
          const savedHome = savedPreferences && savedPreferences.home ? savedPreferences.home : null;
          return { name: savedHome || "accueil" };
        }
      },
      {
        name: "accueil",
        path: "/home",
        component: () => __vitePreload(() => Promise.resolve().then(() => HomeView$1), false ? __VITE_PRELOAD__ : void 0)
      },
      {
        name: "ligne-detail",
        path: "/ligne/:osmid_ligne",
        component: () => __vitePreload(() => Promise.resolve().then(() => LigneDetailView), false ? __VITE_PRELOAD__ : void 0)
      },
      {
        name: "favorites",
        path: "/favorites",
        component: () => __vitePreload(() => Promise.resolve().then(() => FavoritesView), false ? __VITE_PRELOAD__ : void 0)
      },
      {
        name: "settings",
        path: "/settings",
        component: () => __vitePreload(() => Promise.resolve().then(() => SettingsView$1), false ? __VITE_PRELOAD__ : void 0)
      }
    ],
    scrollBehavior() {
      return { top: 0, behavior: "smooth" };
    }
  });
  router.beforeEach((to, _, next) => {
    const query = to.query;
    if (query && query.vrrp) {
      const vrrp = query.vrrp;
      const matchedRoute = router.resolve(vrrp);
      if (matchedRoute && matchedRoute.matched.length > 0) {
        to.query = {};
        router.push(vrrp);
        return;
      }
    }
    next();
  });
  router.beforeEach((to, _, next) => {
    if (to.matched.length === 0) {
      next({ name: "accueil" });
    } else {
      next();
    }
  });
  /*!
   * pinia v2.3.1
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia2) => activePinia = pinia2;
  const piniaSymbol = (
    /* istanbul ignore next */
    Symbol()
  );
  function isPlainObject$2(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  function createPinia() {
    const scope = effectScope(true);
    const state = scope.run(() => ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia2 = markRaw({
      install(app2) {
        setActivePinia(pinia2);
        {
          pinia2._a = app2;
          app2.provide(piniaSymbol, pinia2);
          app2.config.globalProperties.$pinia = pinia2;
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && true) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    return pinia2;
  }
  const noop$1 = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && getCurrentScope()) {
      onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  const ACTION_MARKER = Symbol();
  const ACTION_NAME = Symbol();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    } else if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$2(targetValue) && isPlainObject$2(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = (
    /* istanbul ignore next */
    Symbol()
  );
  function shouldHydrate(obj) {
    return !isPlainObject$2(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign: assign$1 } = Object;
  function isComputed(o) {
    return !!(isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia2, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia2.state.value[id];
    let store;
    function setup() {
      if (!initialState && true) {
        {
          pinia2.state.value[id] = state ? state() : {};
        }
      }
      const localState = toRefs(pinia2.state.value[id]);
      return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = markRaw(computed(() => {
          setActivePinia(pinia2);
          const store2 = pinia2._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia2, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia2, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign$1({ actions: {} }, options);
    const $subscribeOptions = { deep: true };
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia2.state.value[$id];
    if (!isOptionsStore && !initialState && true) {
      {
        pinia2.state.value[$id] = {};
      }
    }
    ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia2.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia2.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia2.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign$1($state, newState);
      });
    } : (
      /* istanbul ignore next */
      noop$1
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia2._s.delete($id);
    }
    const action = (fn, name = "") => {
      if (ACTION_MARKER in fn) {
        fn[ACTION_NAME] = name;
        return fn;
      }
      const wrappedAction = function() {
        setActivePinia(pinia2);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name: wrappedAction[ACTION_NAME],
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = fn.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
      wrappedAction[ACTION_MARKER] = true;
      wrappedAction[ACTION_NAME] = name;
      return wrappedAction;
    };
    const partialStore = {
      _p: pinia2,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => watch(() => pinia2.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign$1({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = reactive(partialStore);
    pinia2._s.set($id, store);
    const runWithContext = pinia2._a && pinia2._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia2._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
        if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia2.state.value[$id][key] = prop;
          }
        }
      } else if (typeof prop === "function") {
        const actionValue = action(prop, key);
        {
          setupStore[key] = actionValue;
        }
        optionsForPlugin.actions[key] = prop;
      } else ;
    }
    {
      assign$1(store, setupStore);
      assign$1(toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => pinia2.state.value[$id],
      set: (state) => {
        $patch(($state) => {
          assign$1($state, state);
        });
      }
    });
    pinia2._p.forEach((extender) => {
      {
        assign$1(store, scope.run(() => extender({
          store,
          app: pinia2._a,
          pinia: pinia2,
          options: optionsForPlugin
        })));
      }
    });
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    }
    function useStore(pinia2, hot) {
      const hasContext = hasInjectionContext();
      pinia2 = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia2 || (hasContext ? inject(piniaSymbol, null) : null);
      if (pinia2)
        setActivePinia(pinia2);
      pinia2 = activePinia;
      if (!pinia2._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia2);
        } else {
          createOptionsStore(id, options, pinia2);
        }
      }
      const store = pinia2._s.get(id);
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const updateStorage = (strategy, store) => {
    const storage = strategy.storage || sessionStorage;
    const storeKey = strategy.key || store.$id;
    if (strategy.paths) {
      const partialState = strategy.paths.reduce((finalObj, key) => {
        finalObj[key] = store.$state[key];
        return finalObj;
      }, {});
      storage.setItem(storeKey, JSON.stringify(partialState));
    } else {
      storage.setItem(storeKey, JSON.stringify(store.$state));
    }
  };
  var index = ({ options, store }) => {
    var _a, _b, _c, _d;
    if ((_a = options.persist) == null ? void 0 : _a.enabled) {
      const defaultStrat = [{
        key: store.$id,
        storage: sessionStorage
      }];
      const strategies = ((_c = (_b = options.persist) == null ? void 0 : _b.strategies) == null ? void 0 : _c.length) ? (_d = options.persist) == null ? void 0 : _d.strategies : defaultStrat;
      strategies.forEach((strategy) => {
        const storage = strategy.storage || sessionStorage;
        const storeKey = strategy.key || store.$id;
        const storageResult = storage.getItem(storeKey);
        if (storageResult) {
          store.$patch(JSON.parse(storageResult));
          updateStorage(strategy, store);
        }
      });
      store.$subscribe(() => {
        strategies.forEach((strategy) => {
          updateStorage(strategy, store);
        });
      });
    }
  };
  const pinia = createPinia();
  pinia.use(index);
  /*!
    * shared v11.1.5
    * (c) 2025 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber$1 = (val) => typeof val === "number" && isFinite(val);
  const isDate$1 = (val) => toTypeString(val) === "[object Date]";
  const isRegExp$1 = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject$1(val) && Object.keys(val).length === 0;
  const assign = Object.assign;
  const _create = Object.create;
  const create = (obj = null) => _create(obj);
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : create());
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray$1 = Array.isArray;
  const isFunction$1 = (val) => typeof val === "function";
  const isString$1 = (val) => typeof val === "string";
  const isBoolean$1 = (val) => typeof val === "boolean";
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray$1(val) || isPlainObject$1(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  function join(items, separator = "") {
    return items.reduce((str, item, index2) => index2 === 0 ? str + item : str + separator + item, "");
  }
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray$1(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw new Error("Invalid value");
    }
    const stack2 = [{ src, des }];
    while (stack2.length) {
      const { src: src2, des: des2 } = stack2.pop();
      Object.keys(src2).forEach((key) => {
        if (key === "__proto__") {
          return;
        }
        if (isObject$1(src2[key]) && !isObject$1(des2[key])) {
          des2[key] = Array.isArray(src2[key]) ? [] : create();
        }
        if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
          des2[key] = src2[key];
        } else {
          stack2.push({ src: src2[key], des: des2[key] });
        }
      });
    }
  }
  /*!
    * message-compiler v11.1.5
    * (c) 2025 kazuya kawaguchi
    * Released under the MIT License.
    */
  function createPosition(line, column, offset) {
    return { line, column, offset };
  }
  function createLocation(start, end, source) {
    const loc = { start, end };
    return loc;
  }
  const CompileErrorCodes = {
    // tokenizer error codes
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    // parser error codes
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14
  };
  const COMPILE_ERROR_CODES_EXTEND_POINT = 17;
  function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = code;
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
      error.location = loc;
    }
    error.domain = domain;
    return error;
  }
  function defaultOnError(error) {
    throw error;
  }
  const CHAR_SP = " ";
  const CHAR_CR = "\r";
  const CHAR_LF = "\n";
  const CHAR_LS = String.fromCharCode(8232);
  const CHAR_PS = String.fromCharCode(8233);
  function createScanner(str) {
    const _buf = str;
    let _index = 0;
    let _line = 1;
    let _column = 1;
    let _peekOffset = 0;
    const isCRLF = (index22) => _buf[index22] === CHAR_CR && _buf[index22 + 1] === CHAR_LF;
    const isLF = (index22) => _buf[index22] === CHAR_LF;
    const isPS = (index22) => _buf[index22] === CHAR_PS;
    const isLS = (index22) => _buf[index22] === CHAR_LS;
    const isLineEnd = (index22) => isCRLF(index22) || isLF(index22) || isPS(index22) || isLS(index22);
    const index2 = () => _index;
    const line = () => _line;
    const column = () => _column;
    const peekOffset = () => _peekOffset;
    const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
    const currentChar = () => charAt(_index);
    const currentPeek = () => charAt(_index + _peekOffset);
    function next() {
      _peekOffset = 0;
      if (isLineEnd(_index)) {
        _line++;
        _column = 0;
      }
      if (isCRLF(_index)) {
        _index++;
      }
      _index++;
      _column++;
      return _buf[_index];
    }
    function peek() {
      if (isCRLF(_index + _peekOffset)) {
        _peekOffset++;
      }
      _peekOffset++;
      return _buf[_index + _peekOffset];
    }
    function reset() {
      _index = 0;
      _line = 1;
      _column = 1;
      _peekOffset = 0;
    }
    function resetPeek(offset = 0) {
      _peekOffset = offset;
    }
    function skipToPeek() {
      const target = _index + _peekOffset;
      while (target !== _index) {
        next();
      }
      _peekOffset = 0;
    }
    return {
      index: index2,
      line,
      column,
      peekOffset,
      charAt,
      currentChar,
      currentPeek,
      next,
      peek,
      reset,
      resetPeek,
      skipToPeek
    };
  }
  const EOF = void 0;
  const DOT = ".";
  const LITERAL_DELIMITER = "'";
  const ERROR_DOMAIN$3 = "tokenizer";
  function createTokenizer(source, options = {}) {
    const location2 = options.location !== false;
    const _scnr = createScanner(source);
    const currentOffset = () => _scnr.index();
    const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
    const _initLoc = currentPosition();
    const _initOffset = currentOffset();
    const _context = {
      currentType: 13,
      offset: _initOffset,
      startLoc: _initLoc,
      endLoc: _initLoc,
      lastType: 13,
      lastOffset: _initOffset,
      lastStartLoc: _initLoc,
      lastEndLoc: _initLoc,
      braceNest: 0,
      inLinked: false,
      text: ""
    };
    const context = () => _context;
    const { onError } = options;
    function emitError(code, pos, offset, ...args) {
      const ctx = context();
      pos.column += offset;
      pos.offset += offset;
      if (onError) {
        const loc = location2 ? createLocation(ctx.startLoc, pos) : null;
        const err = createCompileError(code, loc, {
          domain: ERROR_DOMAIN$3,
          args
        });
        onError(err);
      }
    }
    function getToken(context2, type, value) {
      context2.endLoc = currentPosition();
      context2.currentType = type;
      const token = { type };
      if (location2) {
        token.loc = createLocation(context2.startLoc, context2.endLoc);
      }
      if (value != null) {
        token.value = value;
      }
      return token;
    }
    const getEndToken = (context2) => getToken(
      context2,
      13
      /* TokenTypes.EOF */
    );
    function eat(scnr, ch) {
      if (scnr.currentChar() === ch) {
        scnr.next();
        return ch;
      } else {
        emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
        return "";
      }
    }
    function peekSpaces(scnr) {
      let buf = "";
      while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
        buf += scnr.currentPeek();
        scnr.peek();
      }
      return buf;
    }
    function skipSpaces(scnr) {
      const buf = peekSpaces(scnr);
      scnr.skipToPeek();
      return buf;
    }
    function isIdentifierStart(ch) {
      if (ch === EOF) {
        return false;
      }
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || // a-z
      cc >= 65 && cc <= 90 || // A-Z
      cc === 95;
    }
    function isNumberStart(ch) {
      if (ch === EOF) {
        return false;
      }
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    }
    function isNamedIdentifierStart(scnr, context2) {
      const { currentType } = context2;
      if (currentType !== 2) {
        return false;
      }
      peekSpaces(scnr);
      const ret = isIdentifierStart(scnr.currentPeek());
      scnr.resetPeek();
      return ret;
    }
    function isListIdentifierStart(scnr, context2) {
      const { currentType } = context2;
      if (currentType !== 2) {
        return false;
      }
      peekSpaces(scnr);
      const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
      const ret = isNumberStart(ch);
      scnr.resetPeek();
      return ret;
    }
    function isLiteralStart(scnr, context2) {
      const { currentType } = context2;
      if (currentType !== 2) {
        return false;
      }
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === LITERAL_DELIMITER;
      scnr.resetPeek();
      return ret;
    }
    function isLinkedDotStart(scnr, context2) {
      const { currentType } = context2;
      if (currentType !== 7) {
        return false;
      }
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === ".";
      scnr.resetPeek();
      return ret;
    }
    function isLinkedModifierStart(scnr, context2) {
      const { currentType } = context2;
      if (currentType !== 8) {
        return false;
      }
      peekSpaces(scnr);
      const ret = isIdentifierStart(scnr.currentPeek());
      scnr.resetPeek();
      return ret;
    }
    function isLinkedDelimiterStart(scnr, context2) {
      const { currentType } = context2;
      if (!(currentType === 7 || currentType === 11)) {
        return false;
      }
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === ":";
      scnr.resetPeek();
      return ret;
    }
    function isLinkedReferStart(scnr, context2) {
      const { currentType } = context2;
      if (currentType !== 9) {
        return false;
      }
      const fn = () => {
        const ch = scnr.currentPeek();
        if (ch === "{") {
          return isIdentifierStart(scnr.peek());
        } else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
          return false;
        } else if (ch === CHAR_LF) {
          scnr.peek();
          return fn();
        } else {
          return isTextStart(scnr, false);
        }
      };
      const ret = fn();
      scnr.resetPeek();
      return ret;
    }
    function isPluralStart(scnr) {
      peekSpaces(scnr);
      const ret = scnr.currentPeek() === "|";
      scnr.resetPeek();
      return ret;
    }
    function isTextStart(scnr, reset = true) {
      const fn = (hasSpace = false, prev = "") => {
        const ch = scnr.currentPeek();
        if (ch === "{") {
          return hasSpace;
        } else if (ch === "@" || !ch) {
          return hasSpace;
        } else if (ch === "|") {
          return !(prev === CHAR_SP || prev === CHAR_LF);
        } else if (ch === CHAR_SP) {
          scnr.peek();
          return fn(true, CHAR_SP);
        } else if (ch === CHAR_LF) {
          scnr.peek();
          return fn(true, CHAR_LF);
        } else {
          return true;
        }
      };
      const ret = fn();
      reset && scnr.resetPeek();
      return ret;
    }
    function takeChar(scnr, fn) {
      const ch = scnr.currentChar();
      if (ch === EOF) {
        return EOF;
      }
      if (fn(ch)) {
        scnr.next();
        return ch;
      }
      return null;
    }
    function isIdentifier(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || // a-z
      cc >= 65 && cc <= 90 || // A-Z
      cc >= 48 && cc <= 57 || // 0-9
      cc === 95 || // _
      cc === 36;
    }
    function takeIdentifierChar(scnr) {
      return takeChar(scnr, isIdentifier);
    }
    function isNamedIdentifier(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 97 && cc <= 122 || // a-z
      cc >= 65 && cc <= 90 || // A-Z
      cc >= 48 && cc <= 57 || // 0-9
      cc === 95 || // _
      cc === 36 || // $
      cc === 45;
    }
    function takeNamedIdentifierChar(scnr) {
      return takeChar(scnr, isNamedIdentifier);
    }
    function isDigit(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57;
    }
    function takeDigit(scnr) {
      return takeChar(scnr, isDigit);
    }
    function isHexDigit(ch) {
      const cc = ch.charCodeAt(0);
      return cc >= 48 && cc <= 57 || // 0-9
      cc >= 65 && cc <= 70 || // A-F
      cc >= 97 && cc <= 102;
    }
    function takeHexDigit(scnr) {
      return takeChar(scnr, isHexDigit);
    }
    function getDigits(scnr) {
      let ch = "";
      let num = "";
      while (ch = takeDigit(scnr)) {
        num += ch;
      }
      return num;
    }
    function readText(scnr) {
      let buf = "";
      while (true) {
        const ch = scnr.currentChar();
        if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
          break;
        } else if (ch === CHAR_SP || ch === CHAR_LF) {
          if (isTextStart(scnr)) {
            buf += ch;
            scnr.next();
          } else if (isPluralStart(scnr)) {
            break;
          } else {
            buf += ch;
            scnr.next();
          }
        } else {
          buf += ch;
          scnr.next();
        }
      }
      return buf;
    }
    function readNamedIdentifier(scnr) {
      skipSpaces(scnr);
      let ch = "";
      let name = "";
      while (ch = takeNamedIdentifierChar(scnr)) {
        name += ch;
      }
      if (scnr.currentChar() === EOF) {
        emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
      }
      return name;
    }
    function readListIdentifier(scnr) {
      skipSpaces(scnr);
      let value = "";
      if (scnr.currentChar() === "-") {
        scnr.next();
        value += `-${getDigits(scnr)}`;
      } else {
        value += getDigits(scnr);
      }
      if (scnr.currentChar() === EOF) {
        emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
      }
      return value;
    }
    function isLiteral2(ch) {
      return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
    }
    function readLiteral(scnr) {
      skipSpaces(scnr);
      eat(scnr, `'`);
      let ch = "";
      let literal = "";
      while (ch = takeChar(scnr, isLiteral2)) {
        if (ch === "\\") {
          literal += readEscapeSequence(scnr);
        } else {
          literal += ch;
        }
      }
      const current = scnr.currentChar();
      if (current === CHAR_LF || current === EOF) {
        emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
        if (current === CHAR_LF) {
          scnr.next();
          eat(scnr, `'`);
        }
        return literal;
      }
      eat(scnr, `'`);
      return literal;
    }
    function readEscapeSequence(scnr) {
      const ch = scnr.currentChar();
      switch (ch) {
        case "\\":
        case `'`:
          scnr.next();
          return `\\${ch}`;
        case "u":
          return readUnicodeEscapeSequence(scnr, ch, 4);
        case "U":
          return readUnicodeEscapeSequence(scnr, ch, 6);
        default:
          emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
          return "";
      }
    }
    function readUnicodeEscapeSequence(scnr, unicode, digits) {
      eat(scnr, unicode);
      let sequence = "";
      for (let i = 0; i < digits; i++) {
        const ch = takeHexDigit(scnr);
        if (!ch) {
          emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
          break;
        }
        sequence += ch;
      }
      return `\\${unicode}${sequence}`;
    }
    function isInvalidIdentifier(ch) {
      return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
    }
    function readInvalidIdentifier(scnr) {
      skipSpaces(scnr);
      let ch = "";
      let identifiers = "";
      while (ch = takeChar(scnr, isInvalidIdentifier)) {
        identifiers += ch;
      }
      return identifiers;
    }
    function readLinkedModifier(scnr) {
      let ch = "";
      let name = "";
      while (ch = takeIdentifierChar(scnr)) {
        name += ch;
      }
      return name;
    }
    function readLinkedRefer(scnr) {
      const fn = (buf) => {
        const ch = scnr.currentChar();
        if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
          return buf;
        } else if (ch === CHAR_SP) {
          return buf;
        } else if (ch === CHAR_LF || ch === DOT) {
          buf += ch;
          scnr.next();
          return fn(buf);
        } else {
          buf += ch;
          scnr.next();
          return fn(buf);
        }
      };
      return fn("");
    }
    function readPlural(scnr) {
      skipSpaces(scnr);
      const plural = eat(
        scnr,
        "|"
        /* TokenChars.Pipe */
      );
      skipSpaces(scnr);
      return plural;
    }
    function readTokenInPlaceholder(scnr, context2) {
      let token = null;
      const ch = scnr.currentChar();
      switch (ch) {
        case "{":
          if (context2.braceNest >= 1) {
            emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
          }
          scnr.next();
          token = getToken(
            context2,
            2,
            "{"
            /* TokenChars.BraceLeft */
          );
          skipSpaces(scnr);
          context2.braceNest++;
          return token;
        case "}":
          if (context2.braceNest > 0 && context2.currentType === 2) {
            emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
          }
          scnr.next();
          token = getToken(
            context2,
            3,
            "}"
            /* TokenChars.BraceRight */
          );
          context2.braceNest--;
          context2.braceNest > 0 && skipSpaces(scnr);
          if (context2.inLinked && context2.braceNest === 0) {
            context2.inLinked = false;
          }
          return token;
        case "@":
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = readTokenInLinked(scnr, context2) || getEndToken(context2);
          context2.braceNest = 0;
          return token;
        default: {
          let validNamedIdentifier = true;
          let validListIdentifier = true;
          let validLiteral = true;
          if (isPluralStart(scnr)) {
            if (context2.braceNest > 0) {
              emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
            }
            token = getToken(context2, 1, readPlural(scnr));
            context2.braceNest = 0;
            context2.inLinked = false;
            return token;
          }
          if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
            context2.braceNest = 0;
            return readToken(scnr, context2);
          }
          if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
            token = getToken(context2, 4, readNamedIdentifier(scnr));
            skipSpaces(scnr);
            return token;
          }
          if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
            token = getToken(context2, 5, readListIdentifier(scnr));
            skipSpaces(scnr);
            return token;
          }
          if (validLiteral = isLiteralStart(scnr, context2)) {
            token = getToken(context2, 6, readLiteral(scnr));
            skipSpaces(scnr);
            return token;
          }
          if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
            token = getToken(context2, 12, readInvalidIdentifier(scnr));
            emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
            skipSpaces(scnr);
            return token;
          }
          break;
        }
      }
      return token;
    }
    function readTokenInLinked(scnr, context2) {
      const { currentType } = context2;
      let token = null;
      const ch = scnr.currentChar();
      if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) {
        emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
      }
      switch (ch) {
        case "@":
          scnr.next();
          token = getToken(
            context2,
            7,
            "@"
            /* TokenChars.LinkedAlias */
          );
          context2.inLinked = true;
          return token;
        case ".":
          skipSpaces(scnr);
          scnr.next();
          return getToken(
            context2,
            8,
            "."
            /* TokenChars.LinkedDot */
          );
        case ":":
          skipSpaces(scnr);
          scnr.next();
          return getToken(
            context2,
            9,
            ":"
            /* TokenChars.LinkedDelimiter */
          );
        default:
          if (isPluralStart(scnr)) {
            token = getToken(context2, 1, readPlural(scnr));
            context2.braceNest = 0;
            context2.inLinked = false;
            return token;
          }
          if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
            skipSpaces(scnr);
            return readTokenInLinked(scnr, context2);
          }
          if (isLinkedModifierStart(scnr, context2)) {
            skipSpaces(scnr);
            return getToken(context2, 11, readLinkedModifier(scnr));
          }
          if (isLinkedReferStart(scnr, context2)) {
            skipSpaces(scnr);
            if (ch === "{") {
              return readTokenInPlaceholder(scnr, context2) || token;
            } else {
              return getToken(context2, 10, readLinkedRefer(scnr));
            }
          }
          if (currentType === 7) {
            emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
          }
          context2.braceNest = 0;
          context2.inLinked = false;
          return readToken(scnr, context2);
      }
    }
    function readToken(scnr, context2) {
      let token = {
        type: 13
        /* TokenTypes.EOF */
      };
      if (context2.braceNest > 0) {
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      }
      if (context2.inLinked) {
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      }
      const ch = scnr.currentChar();
      switch (ch) {
        case "{":
          return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
        case "}":
          emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
          scnr.next();
          return getToken(
            context2,
            3,
            "}"
            /* TokenChars.BraceRight */
          );
        case "@":
          return readTokenInLinked(scnr, context2) || getEndToken(context2);
        default: {
          if (isPluralStart(scnr)) {
            token = getToken(context2, 1, readPlural(scnr));
            context2.braceNest = 0;
            context2.inLinked = false;
            return token;
          }
          if (isTextStart(scnr)) {
            return getToken(context2, 0, readText(scnr));
          }
          break;
        }
      }
      return token;
    }
    function nextToken() {
      const { currentType, offset, startLoc, endLoc } = _context;
      _context.lastType = currentType;
      _context.lastOffset = offset;
      _context.lastStartLoc = startLoc;
      _context.lastEndLoc = endLoc;
      _context.offset = currentOffset();
      _context.startLoc = currentPosition();
      if (_scnr.currentChar() === EOF) {
        return getToken(
          _context,
          13
          /* TokenTypes.EOF */
        );
      }
      return readToken(_scnr, _context);
    }
    return {
      nextToken,
      currentOffset,
      currentPosition,
      context
    };
  }
  const ERROR_DOMAIN$2 = "parser";
  const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
  function fromEscapeSequence(match, codePoint4, codePoint6) {
    switch (match) {
      case `\\\\`:
        return `\\`;
      // eslint-disable-next-line no-useless-escape
      case `\\'`:
        return `'`;
      default: {
        const codePoint = parseInt(codePoint4 || codePoint6, 16);
        if (codePoint <= 55295 || codePoint >= 57344) {
          return String.fromCodePoint(codePoint);
        }
        return "�";
      }
    }
  }
  function createParser(options = {}) {
    const location2 = options.location !== false;
    const { onError } = options;
    function emitError(tokenzer, code, start, offset, ...args) {
      const end = tokenzer.currentPosition();
      end.offset += offset;
      end.column += offset;
      if (onError) {
        const loc = location2 ? createLocation(start, end) : null;
        const err = createCompileError(code, loc, {
          domain: ERROR_DOMAIN$2,
          args
        });
        onError(err);
      }
    }
    function startNode(type, offset, loc) {
      const node = { type };
      if (location2) {
        node.start = offset;
        node.end = offset;
        node.loc = { start: loc, end: loc };
      }
      return node;
    }
    function endNode(node, offset, pos, type) {
      if (location2) {
        node.end = offset;
        if (node.loc) {
          node.loc.end = pos;
        }
      }
    }
    function parseText(tokenizer, value) {
      const context = tokenizer.context();
      const node = startNode(3, context.offset, context.startLoc);
      node.value = value;
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    function parseList(tokenizer, index2) {
      const context = tokenizer.context();
      const { lastOffset: offset, lastStartLoc: loc } = context;
      const node = startNode(5, offset, loc);
      node.index = parseInt(index2, 10);
      tokenizer.nextToken();
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    function parseNamed(tokenizer, key) {
      const context = tokenizer.context();
      const { lastOffset: offset, lastStartLoc: loc } = context;
      const node = startNode(4, offset, loc);
      node.key = key;
      tokenizer.nextToken();
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    function parseLiteral(tokenizer, value) {
      const context = tokenizer.context();
      const { lastOffset: offset, lastStartLoc: loc } = context;
      const node = startNode(9, offset, loc);
      node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
      tokenizer.nextToken();
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    function parseLinkedModifier(tokenizer) {
      const token = tokenizer.nextToken();
      const context = tokenizer.context();
      const { lastOffset: offset, lastStartLoc: loc } = context;
      const node = startNode(8, offset, loc);
      if (token.type !== 11) {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
        node.value = "";
        endNode(node, offset, loc);
        return {
          nextConsumeToken: token,
          node
        };
      }
      if (token.value == null) {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
      }
      node.value = token.value || "";
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return {
        node
      };
    }
    function parseLinkedKey(tokenizer, value) {
      const context = tokenizer.context();
      const node = startNode(7, context.offset, context.startLoc);
      node.value = value;
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    function parseLinked(tokenizer) {
      const context = tokenizer.context();
      const linkedNode = startNode(6, context.offset, context.startLoc);
      let token = tokenizer.nextToken();
      if (token.type === 8) {
        const parsed = parseLinkedModifier(tokenizer);
        linkedNode.modifier = parsed.node;
        token = parsed.nextConsumeToken || tokenizer.nextToken();
      }
      if (token.type !== 9) {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
      }
      token = tokenizer.nextToken();
      if (token.type === 2) {
        token = tokenizer.nextToken();
      }
      switch (token.type) {
        case 10:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
          break;
        case 4:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          linkedNode.key = parseNamed(tokenizer, token.value || "");
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          linkedNode.key = parseList(tokenizer, token.value || "");
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          linkedNode.key = parseLiteral(tokenizer, token.value || "");
          break;
        default: {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
          const nextContext = tokenizer.context();
          const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
          emptyLinkedKeyNode.value = "";
          endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
          linkedNode.key = emptyLinkedKeyNode;
          endNode(linkedNode, nextContext.offset, nextContext.startLoc);
          return {
            nextConsumeToken: token,
            node: linkedNode
          };
        }
      }
      endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
      return {
        node: linkedNode
      };
    }
    function parseMessage(tokenizer) {
      const context = tokenizer.context();
      const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
      const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
      const node = startNode(2, startOffset, startLoc);
      node.items = [];
      let nextToken = null;
      do {
        const token = nextToken || tokenizer.nextToken();
        nextToken = null;
        switch (token.type) {
          case 0:
            if (token.value == null) {
              emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
            }
            node.items.push(parseText(tokenizer, token.value || ""));
            break;
          case 5:
            if (token.value == null) {
              emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
            }
            node.items.push(parseList(tokenizer, token.value || ""));
            break;
          case 4:
            if (token.value == null) {
              emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
            }
            node.items.push(parseNamed(tokenizer, token.value || ""));
            break;
          case 6:
            if (token.value == null) {
              emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
            }
            node.items.push(parseLiteral(tokenizer, token.value || ""));
            break;
          case 7: {
            const parsed = parseLinked(tokenizer);
            node.items.push(parsed.node);
            nextToken = parsed.nextConsumeToken || null;
            break;
          }
        }
      } while (context.currentType !== 13 && context.currentType !== 1);
      const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
      const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
      endNode(node, endOffset, endLoc);
      return node;
    }
    function parsePlural(tokenizer, offset, loc, msgNode) {
      const context = tokenizer.context();
      let hasEmptyMessage = msgNode.items.length === 0;
      const node = startNode(1, offset, loc);
      node.cases = [];
      node.cases.push(msgNode);
      do {
        const msg = parseMessage(tokenizer);
        if (!hasEmptyMessage) {
          hasEmptyMessage = msg.items.length === 0;
        }
        node.cases.push(msg);
      } while (context.currentType !== 13);
      if (hasEmptyMessage) {
        emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
      }
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    function parseResource(tokenizer) {
      const context = tokenizer.context();
      const { offset, startLoc } = context;
      const msgNode = parseMessage(tokenizer);
      if (context.currentType === 13) {
        return msgNode;
      } else {
        return parsePlural(tokenizer, offset, startLoc, msgNode);
      }
    }
    function parse2(source) {
      const tokenizer = createTokenizer(source, assign({}, options));
      const context = tokenizer.context();
      const node = startNode(0, context.offset, context.startLoc);
      if (location2 && node.loc) {
        node.loc.source = source;
      }
      node.body = parseResource(tokenizer);
      if (options.onCacheKey) {
        node.cacheKey = options.onCacheKey(source);
      }
      if (context.currentType !== 13) {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
      }
      endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
      return node;
    }
    return { parse: parse2 };
  }
  function getTokenCaption(token) {
    if (token.type === 13) {
      return "EOF";
    }
    const name = (token.value || "").replace(/\r?\n/gu, "\\n");
    return name.length > 10 ? name.slice(0, 9) + "…" : name;
  }
  function createTransformer(ast, options = {}) {
    const _context = {
      ast,
      helpers: /* @__PURE__ */ new Set()
    };
    const context = () => _context;
    const helper = (name) => {
      _context.helpers.add(name);
      return name;
    };
    return { context, helper };
  }
  function traverseNodes(nodes, transformer) {
    for (let i = 0; i < nodes.length; i++) {
      traverseNode(nodes[i], transformer);
    }
  }
  function traverseNode(node, transformer) {
    switch (node.type) {
      case 1:
        traverseNodes(node.cases, transformer);
        transformer.helper(
          "plural"
          /* HelperNameMap.PLURAL */
        );
        break;
      case 2:
        traverseNodes(node.items, transformer);
        break;
      case 6: {
        const linked = node;
        traverseNode(linked.key, transformer);
        transformer.helper(
          "linked"
          /* HelperNameMap.LINKED */
        );
        transformer.helper(
          "type"
          /* HelperNameMap.TYPE */
        );
        break;
      }
      case 5:
        transformer.helper(
          "interpolate"
          /* HelperNameMap.INTERPOLATE */
        );
        transformer.helper(
          "list"
          /* HelperNameMap.LIST */
        );
        break;
      case 4:
        transformer.helper(
          "interpolate"
          /* HelperNameMap.INTERPOLATE */
        );
        transformer.helper(
          "named"
          /* HelperNameMap.NAMED */
        );
        break;
    }
  }
  function transform(ast, options = {}) {
    const transformer = createTransformer(ast);
    transformer.helper(
      "normalize"
      /* HelperNameMap.NORMALIZE */
    );
    ast.body && traverseNode(ast.body, transformer);
    const context = transformer.context();
    ast.helpers = Array.from(context.helpers);
  }
  function optimize(ast) {
    const body = ast.body;
    if (body.type === 2) {
      optimizeMessageNode(body);
    } else {
      body.cases.forEach((c) => optimizeMessageNode(c));
    }
    return ast;
  }
  function optimizeMessageNode(message) {
    if (message.items.length === 1) {
      const item = message.items[0];
      if (item.type === 3 || item.type === 9) {
        message.static = item.value;
        delete item.value;
      }
    } else {
      const values = [];
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (!(item.type === 3 || item.type === 9)) {
          break;
        }
        if (item.value == null) {
          break;
        }
        values.push(item.value);
      }
      if (values.length === message.items.length) {
        message.static = join(values);
        for (let i = 0; i < message.items.length; i++) {
          const item = message.items[i];
          if (item.type === 3 || item.type === 9) {
            delete item.value;
          }
        }
      }
    }
  }
  function minify(node) {
    node.t = node.type;
    switch (node.type) {
      case 0: {
        const resource = node;
        minify(resource.body);
        resource.b = resource.body;
        delete resource.body;
        break;
      }
      case 1: {
        const plural = node;
        const cases = plural.cases;
        for (let i = 0; i < cases.length; i++) {
          minify(cases[i]);
        }
        plural.c = cases;
        delete plural.cases;
        break;
      }
      case 2: {
        const message = node;
        const items = message.items;
        for (let i = 0; i < items.length; i++) {
          minify(items[i]);
        }
        message.i = items;
        delete message.items;
        if (message.static) {
          message.s = message.static;
          delete message.static;
        }
        break;
      }
      case 3:
      case 9:
      case 8:
      case 7: {
        const valueNode = node;
        if (valueNode.value) {
          valueNode.v = valueNode.value;
          delete valueNode.value;
        }
        break;
      }
      case 6: {
        const linked = node;
        minify(linked.key);
        linked.k = linked.key;
        delete linked.key;
        if (linked.modifier) {
          minify(linked.modifier);
          linked.m = linked.modifier;
          delete linked.modifier;
        }
        break;
      }
      case 5: {
        const list = node;
        list.i = list.index;
        delete list.index;
        break;
      }
      case 4: {
        const named = node;
        named.k = named.key;
        delete named.key;
        break;
      }
    }
    delete node.type;
  }
  function createCodeGenerator(ast, options) {
    const { filename, breakLineCode, needIndent: _needIndent } = options;
    const location2 = options.location !== false;
    const _context = {
      filename,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode,
      needIndent: _needIndent,
      indentLevel: 0
    };
    if (location2 && ast.loc) {
      _context.source = ast.loc.source;
    }
    const context = () => _context;
    function push(code, node) {
      _context.code += code;
    }
    function _newline(n, withBreakLine = true) {
      const _breakLineCode = withBreakLine ? breakLineCode : "";
      push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
    }
    function indent(withNewLine = true) {
      const level = ++_context.indentLevel;
      withNewLine && _newline(level);
    }
    function deindent(withNewLine = true) {
      const level = --_context.indentLevel;
      withNewLine && _newline(level);
    }
    function newline() {
      _newline(_context.indentLevel);
    }
    const helper = (key) => `_${key}`;
    const needIndent = () => _context.needIndent;
    return {
      context,
      push,
      indent,
      deindent,
      newline,
      helper,
      needIndent
    };
  }
  function generateLinkedNode(generator, node) {
    const { helper } = generator;
    generator.push(`${helper(
      "linked"
      /* HelperNameMap.LINKED */
    )}(`);
    generateNode(generator, node.key);
    if (node.modifier) {
      generator.push(`, `);
      generateNode(generator, node.modifier);
      generator.push(`, _type`);
    } else {
      generator.push(`, undefined, _type`);
    }
    generator.push(`)`);
  }
  function generateMessageNode(generator, node) {
    const { helper, needIndent } = generator;
    generator.push(`${helper(
      "normalize"
      /* HelperNameMap.NORMALIZE */
    )}([`);
    generator.indent(needIndent());
    const length = node.items.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.items[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push("])");
  }
  function generatePluralNode(generator, node) {
    const { helper, needIndent } = generator;
    if (node.cases.length > 1) {
      generator.push(`${helper(
        "plural"
        /* HelperNameMap.PLURAL */
      )}([`);
      generator.indent(needIndent());
      const length = node.cases.length;
      for (let i = 0; i < length; i++) {
        generateNode(generator, node.cases[i]);
        if (i === length - 1) {
          break;
        }
        generator.push(", ");
      }
      generator.deindent(needIndent());
      generator.push(`])`);
    }
  }
  function generateResource(generator, node) {
    if (node.body) {
      generateNode(generator, node.body);
    } else {
      generator.push("null");
    }
  }
  function generateNode(generator, node) {
    const { helper } = generator;
    switch (node.type) {
      case 0:
        generateResource(generator, node);
        break;
      case 1:
        generatePluralNode(generator, node);
        break;
      case 2:
        generateMessageNode(generator, node);
        break;
      case 6:
        generateLinkedNode(generator, node);
        break;
      case 8:
        generator.push(JSON.stringify(node.value), node);
        break;
      case 7:
        generator.push(JSON.stringify(node.value), node);
        break;
      case 5:
        generator.push(`${helper(
          "interpolate"
          /* HelperNameMap.INTERPOLATE */
        )}(${helper(
          "list"
          /* HelperNameMap.LIST */
        )}(${node.index}))`, node);
        break;
      case 4:
        generator.push(`${helper(
          "interpolate"
          /* HelperNameMap.INTERPOLATE */
        )}(${helper(
          "named"
          /* HelperNameMap.NAMED */
        )}(${JSON.stringify(node.key)}))`, node);
        break;
      case 9:
        generator.push(JSON.stringify(node.value), node);
        break;
      case 3:
        generator.push(JSON.stringify(node.value), node);
        break;
    }
  }
  const generate = (ast, options = {}) => {
    const mode = isString$1(options.mode) ? options.mode : "normal";
    const filename = isString$1(options.filename) ? options.filename : "message.intl";
    !!options.sourceMap;
    const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
    const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
    const helpers = ast.helpers || [];
    const generator = createCodeGenerator(ast, {
      filename,
      breakLineCode,
      needIndent
    });
    generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
    generator.indent(needIndent);
    if (helpers.length > 0) {
      generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
      generator.newline();
    }
    generator.push(`return `);
    generateNode(generator, ast);
    generator.deindent(needIndent);
    generator.push(`}`);
    delete ast.helpers;
    const { code, map } = generator.context();
    return {
      ast,
      code,
      map: map ? map.toJSON() : void 0
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
  };
  function baseCompile$1(source, options = {}) {
    const assignedOptions = assign({}, options);
    const jit = !!assignedOptions.jit;
    const enalbeMinify = !!assignedOptions.minify;
    const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
    const parser = createParser(assignedOptions);
    const ast = parser.parse(source);
    if (!jit) {
      transform(ast, assignedOptions);
      return generate(ast, assignedOptions);
    } else {
      enambeOptimize && optimize(ast);
      enalbeMinify && minify(ast);
      return { ast, code: "" };
    }
  }
  /*!
    * core-base v11.1.5
    * (c) 2025 kazuya kawaguchi
    * Released under the MIT License.
    */
  function initFeatureFlags$1() {
    if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
      getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
    }
    if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
      getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
    }
  }
  function isMessageAST(val) {
    return isObject$1(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
  }
  const PROPS_BODY = ["b", "body"];
  function resolveBody(node) {
    return resolveProps(node, PROPS_BODY);
  }
  const PROPS_CASES = ["c", "cases"];
  function resolveCases(node) {
    return resolveProps(node, PROPS_CASES, []);
  }
  const PROPS_STATIC = ["s", "static"];
  function resolveStatic(node) {
    return resolveProps(node, PROPS_STATIC);
  }
  const PROPS_ITEMS = ["i", "items"];
  function resolveItems(node) {
    return resolveProps(node, PROPS_ITEMS, []);
  }
  const PROPS_TYPE = ["t", "type"];
  function resolveType(node) {
    return resolveProps(node, PROPS_TYPE);
  }
  const PROPS_VALUE = ["v", "value"];
  function resolveValue$1(node, type) {
    const resolved = resolveProps(node, PROPS_VALUE);
    if (resolved != null) {
      return resolved;
    } else {
      throw createUnhandleNodeError(type);
    }
  }
  const PROPS_MODIFIER = ["m", "modifier"];
  function resolveLinkedModifier(node) {
    return resolveProps(node, PROPS_MODIFIER);
  }
  const PROPS_KEY = ["k", "key"];
  function resolveLinkedKey(node) {
    const resolved = resolveProps(node, PROPS_KEY);
    if (resolved) {
      return resolved;
    } else {
      throw createUnhandleNodeError(
        6
        /* NodeTypes.Linked */
      );
    }
  }
  function resolveProps(node, props, defaultValue) {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (hasOwn(node, prop) && node[prop] != null) {
        return node[prop];
      }
    }
    return defaultValue;
  }
  const AST_NODE_PROPS_KEYS = [
    ...PROPS_BODY,
    ...PROPS_CASES,
    ...PROPS_STATIC,
    ...PROPS_ITEMS,
    ...PROPS_KEY,
    ...PROPS_MODIFIER,
    ...PROPS_VALUE,
    ...PROPS_TYPE
  ];
  function createUnhandleNodeError(type) {
    return new Error(`unhandled node type: ${type}`);
  }
  function format(ast) {
    const msg = (ctx) => formatParts(ctx, ast);
    return msg;
  }
  function formatParts(ctx, ast) {
    const body = resolveBody(ast);
    if (body == null) {
      throw createUnhandleNodeError(
        0
        /* NodeTypes.Resource */
      );
    }
    const type = resolveType(body);
    if (type === 1) {
      const plural = body;
      const cases = resolveCases(plural);
      return ctx.plural(cases.reduce((messages, c) => [
        ...messages,
        formatMessageParts(ctx, c)
      ], []));
    } else {
      return formatMessageParts(ctx, body);
    }
  }
  function formatMessageParts(ctx, node) {
    const static_ = resolveStatic(node);
    if (static_ != null) {
      return ctx.type === "text" ? static_ : ctx.normalize([static_]);
    } else {
      const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
      return ctx.normalize(messages);
    }
  }
  function formatMessagePart(ctx, node) {
    const type = resolveType(node);
    switch (type) {
      case 3: {
        return resolveValue$1(node, type);
      }
      case 9: {
        return resolveValue$1(node, type);
      }
      case 4: {
        const named = node;
        if (hasOwn(named, "k") && named.k) {
          return ctx.interpolate(ctx.named(named.k));
        }
        if (hasOwn(named, "key") && named.key) {
          return ctx.interpolate(ctx.named(named.key));
        }
        throw createUnhandleNodeError(type);
      }
      case 5: {
        const list = node;
        if (hasOwn(list, "i") && isNumber$1(list.i)) {
          return ctx.interpolate(ctx.list(list.i));
        }
        if (hasOwn(list, "index") && isNumber$1(list.index)) {
          return ctx.interpolate(ctx.list(list.index));
        }
        throw createUnhandleNodeError(type);
      }
      case 6: {
        const linked = node;
        const modifier = resolveLinkedModifier(linked);
        const key = resolveLinkedKey(linked);
        return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
      }
      case 7: {
        return resolveValue$1(node, type);
      }
      case 8: {
        return resolveValue$1(node, type);
      }
      default:
        throw new Error(`unhandled node on format message part: ${type}`);
    }
  }
  const defaultOnCacheKey = (message) => message;
  let compileCache = create();
  function baseCompile(message, options = {}) {
    let detectError = false;
    const onError = options.onError || defaultOnError;
    options.onError = (err) => {
      detectError = true;
      onError(err);
    };
    return { ...baseCompile$1(message, options), detectError };
  }
  // @__NO_SIDE_EFFECTS__
  function compile(message, context) {
    if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && isString$1(message)) {
      isBoolean$1(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
      const onCacheKey = context.onCacheKey || defaultOnCacheKey;
      const cacheKey = onCacheKey(message);
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      const { ast, detectError } = baseCompile(message, {
        ...context,
        location: false,
        jit: true
      });
      const msg = format(ast);
      return !detectError ? compileCache[cacheKey] = msg : msg;
    } else {
      const cacheKey = message.cacheKey;
      if (cacheKey) {
        const cached = compileCache[cacheKey];
        if (cached) {
          return cached;
        }
        return compileCache[cacheKey] = format(message);
      } else {
        return format(message);
      }
    }
  }
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n2, version2, meta) {
    devtools && devtools.emit("i18n:init", {
      timestamp: Date.now(),
      i18n: i18n2,
      version: version2,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook("function:translate");
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const CoreErrorCodes = {
    INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
    // 17
    INVALID_DATE_ARGUMENT: 18,
    INVALID_ISO_DATE_ARGUMENT: 19,
    NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
    NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
    NOT_SUPPORT_LOCALE_TYPE: 23
  };
  const CORE_ERROR_CODES_EXTEND_POINT = 24;
  function createCoreError(code) {
    return createCompileError(code, null, void 0);
  }
  function getLocale$1(context, options) {
    return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
  }
  let _resolveLocale;
  function resolveLocale(locale) {
    if (isString$1(locale)) {
      return locale;
    } else {
      if (isFunction$1(locale)) {
        if (locale.resolvedOnce && _resolveLocale != null) {
          return _resolveLocale;
        } else if (locale.constructor.name === "Function") {
          const resolve2 = locale();
          if (isPromise(resolve2)) {
            throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
          }
          return _resolveLocale = resolve2;
        } else {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
        }
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
      }
    }
  }
  function fallbackWithSimple(ctx, fallback, start) {
    return [.../* @__PURE__ */ new Set([
      start,
      ...isArray$1(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString$1(fallback) ? [fallback] : [start]
    ])];
  }
  function fallbackWithLocaleChain(ctx, fallback, start) {
    const startLocale = isString$1(start) ? start : DEFAULT_LOCALE;
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(startLocale);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray$1(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults2 = isArray$1(fallback) || !isPlainObject$1(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
      block = isString$1(defaults2) ? [defaults2] : defaults2;
      if (isArray$1(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(startLocale, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean$1(follow); i++) {
      const locale = block[i];
      if (isString$1(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray$1(blocks) || isPlainObject$1(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  const pathStateMachine = [];
  pathStateMachine[
    0
    /* States.BEFORE_PATH */
  ] = {
    [
      "w"
      /* PathCharTypes.WORKSPACE */
    ]: [
      0
      /* States.BEFORE_PATH */
    ],
    [
      "i"
      /* PathCharTypes.IDENT */
    ]: [
      3,
      0
      /* Actions.APPEND */
    ],
    [
      "["
      /* PathCharTypes.LEFT_BRACKET */
    ]: [
      4
      /* States.IN_SUB_PATH */
    ],
    [
      "o"
      /* PathCharTypes.END_OF_FAIL */
    ]: [
      7
      /* States.AFTER_PATH */
    ]
  };
  pathStateMachine[
    1
    /* States.IN_PATH */
  ] = {
    [
      "w"
      /* PathCharTypes.WORKSPACE */
    ]: [
      1
      /* States.IN_PATH */
    ],
    [
      "."
      /* PathCharTypes.DOT */
    ]: [
      2
      /* States.BEFORE_IDENT */
    ],
    [
      "["
      /* PathCharTypes.LEFT_BRACKET */
    ]: [
      4
      /* States.IN_SUB_PATH */
    ],
    [
      "o"
      /* PathCharTypes.END_OF_FAIL */
    ]: [
      7
      /* States.AFTER_PATH */
    ]
  };
  pathStateMachine[
    2
    /* States.BEFORE_IDENT */
  ] = {
    [
      "w"
      /* PathCharTypes.WORKSPACE */
    ]: [
      2
      /* States.BEFORE_IDENT */
    ],
    [
      "i"
      /* PathCharTypes.IDENT */
    ]: [
      3,
      0
      /* Actions.APPEND */
    ],
    [
      "0"
      /* PathCharTypes.ZERO */
    ]: [
      3,
      0
      /* Actions.APPEND */
    ]
  };
  pathStateMachine[
    3
    /* States.IN_IDENT */
  ] = {
    [
      "i"
      /* PathCharTypes.IDENT */
    ]: [
      3,
      0
      /* Actions.APPEND */
    ],
    [
      "0"
      /* PathCharTypes.ZERO */
    ]: [
      3,
      0
      /* Actions.APPEND */
    ],
    [
      "w"
      /* PathCharTypes.WORKSPACE */
    ]: [
      1,
      1
      /* Actions.PUSH */
    ],
    [
      "."
      /* PathCharTypes.DOT */
    ]: [
      2,
      1
      /* Actions.PUSH */
    ],
    [
      "["
      /* PathCharTypes.LEFT_BRACKET */
    ]: [
      4,
      1
      /* Actions.PUSH */
    ],
    [
      "o"
      /* PathCharTypes.END_OF_FAIL */
    ]: [
      7,
      1
      /* Actions.PUSH */
    ]
  };
  pathStateMachine[
    4
    /* States.IN_SUB_PATH */
  ] = {
    [
      "'"
      /* PathCharTypes.SINGLE_QUOTE */
    ]: [
      5,
      0
      /* Actions.APPEND */
    ],
    [
      '"'
      /* PathCharTypes.DOUBLE_QUOTE */
    ]: [
      6,
      0
      /* Actions.APPEND */
    ],
    [
      "["
      /* PathCharTypes.LEFT_BRACKET */
    ]: [
      4,
      2
      /* Actions.INC_SUB_PATH_DEPTH */
    ],
    [
      "]"
      /* PathCharTypes.RIGHT_BRACKET */
    ]: [
      1,
      3
      /* Actions.PUSH_SUB_PATH */
    ],
    [
      "o"
      /* PathCharTypes.END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* PathCharTypes.ELSE */
    ]: [
      4,
      0
      /* Actions.APPEND */
    ]
  };
  pathStateMachine[
    5
    /* States.IN_SINGLE_QUOTE */
  ] = {
    [
      "'"
      /* PathCharTypes.SINGLE_QUOTE */
    ]: [
      4,
      0
      /* Actions.APPEND */
    ],
    [
      "o"
      /* PathCharTypes.END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* PathCharTypes.ELSE */
    ]: [
      5,
      0
      /* Actions.APPEND */
    ]
  };
  pathStateMachine[
    6
    /* States.IN_DOUBLE_QUOTE */
  ] = {
    [
      '"'
      /* PathCharTypes.DOUBLE_QUOTE */
    ]: [
      4,
      0
      /* Actions.APPEND */
    ],
    [
      "o"
      /* PathCharTypes.END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* PathCharTypes.ELSE */
    ]: [
      6,
      0
      /* Actions.APPEND */
    ]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code = ch.charCodeAt(0);
    switch (code) {
      case 91:
      // [
      case 93:
      // ]
      case 46:
      // .
      case 34:
      // "
      case 39:
        return ch;
      case 95:
      // _
      case 36:
      // $
      case 45:
        return "i";
      case 9:
      // Tab (HT)
      case 10:
      // Newline (LF)
      case 13:
      // Return (CR)
      case 160:
      // No-break space (NBSP)
      case 65279:
      // Byte Order Mark (BOM)
      case 8232:
      // Line Separator (LS)
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index2 = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[
      0
      /* Actions.APPEND */
    ] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[
      1
      /* Actions.PUSH */
    ] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[
      2
      /* Actions.INC_SUB_PATH_DEPTH */
    ] = () => {
      actions[
        0
        /* Actions.APPEND */
      ]();
      subPathDepth++;
    };
    actions[
      3
      /* Actions.PUSH_SUB_PATH */
    ] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[
          0
          /* Actions.APPEND */
        ]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[
            1
            /* Actions.PUSH */
          ]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index2 + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index2++;
        newChar = "\\" + nextChar;
        actions[
          0
          /* Actions.APPEND */
        ]();
        return true;
      }
    }
    while (mode !== null) {
      index2++;
      c = path[index2];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap[
        "l"
        /* PathCharTypes.ELSE */
      ] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveWithKeyValue(obj, path) {
    return isObject$1(obj) ? obj[path] : null;
  }
  function resolveValue(obj, path) {
    if (!isObject$1(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const key = hit[i];
      if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) {
        return null;
      }
      const val = last[key];
      if (val === void 0) {
        return null;
      }
      if (isFunction$1(last)) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  const VERSION$3 = "11.1.5";
  const NOT_REOSLVED = -1;
  const DEFAULT_LOCALE = "en-US";
  const MISSING_RESOLVE_VALUE = "";
  const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
  function getDefaultLinkedModifiers() {
    return {
      upper: (val, type) => {
        return type === "text" && isString$1(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
      },
      lower: (val, type) => {
        return type === "text" && isString$1(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
      },
      capitalize: (val, type) => {
        return type === "text" && isString$1(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
      }
    };
  }
  let _compiler;
  function registerMessageCompiler(compiler) {
    _compiler = compiler;
  }
  let _resolver;
  function registerMessageResolver(resolver) {
    _resolver = resolver;
  }
  let _fallbacker;
  function registerLocaleFallbacker(fallbacker) {
    _fallbacker = fallbacker;
  }
  let _additionalMeta = null;
  const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ () => _additionalMeta;
  let _fallbackContext = null;
  const setFallbackContext = (context) => {
    _fallbackContext = context;
  };
  const getFallbackContext = () => _fallbackContext;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const onWarn = isFunction$1(options.onWarn) ? options.onWarn : warn;
    const version2 = isString$1(options.version) ? options.version : VERSION$3;
    const locale = isString$1(options.locale) || isFunction$1(options.locale) ? options.locale : DEFAULT_LOCALE;
    const _locale = isFunction$1(locale) ? DEFAULT_LOCALE : locale;
    const fallbackLocale = isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || isString$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
    const messages = isPlainObject$1(options.messages) ? options.messages : createResources(_locale);
    const datetimeFormats = isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
    const numberFormats = isPlainObject$1(options.numberFormats) ? options.numberFormats : createResources(_locale);
    const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || create();
    const missing = isFunction$1(options.missing) ? options.missing : null;
    const missingWarn = isBoolean$1(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean$1(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject$1(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction$1(options.messageCompiler) ? options.messageCompiler : _compiler;
    const messageResolver = isFunction$1(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
    const localeFallbacker = isFunction$1(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
    const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
    const internalOptions = options;
    const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version: version2,
      cid: _cid,
      locale,
      fallbackLocale,
      messages,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      messageResolver,
      localeFallbacker,
      fallbackContext,
      onWarn,
      __meta
    };
    {
      context.datetimeFormats = datetimeFormats;
      context.numberFormats = numberFormats;
      context.__datetimeFormatters = __datetimeFormatters;
      context.__numberFormatters = __numberFormatters;
    }
    if (__INTLIFY_PROD_DEVTOOLS__) {
      initI18nDevTools(context, version2, __meta);
    }
    return context;
  }
  const createResources = (locale) => ({ [locale]: create() });
  function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString$1(ret) ? ret : key;
    } else {
      return key;
    }
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    ctx.localeFallbacker(ctx, fallback, locale);
  }
  function isAlmostSameLocale(locale, compareLocale) {
    if (locale === compareLocale)
      return false;
    return locale.split("-")[0] === compareLocale.split("-")[0];
  }
  function isImplicitFallback(targetLocale, locales) {
    const index2 = locales.indexOf(targetLocale);
    if (index2 === -1) {
      return false;
    }
    for (let i = index2 + 1; i < locales.length; i++) {
      if (isAlmostSameLocale(targetLocale, locales[i])) {
        return true;
      }
    }
    return false;
  }
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
    const { __datetimeFormatters } = context;
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
    isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = getLocale$1(context, options);
    const locales = localeFallbacker(
      context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      fallbackLocale,
      locale
    );
    if (!isString$1(key) || key === "") {
      return new Intl.DateTimeFormat(locale, overrides).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = locales[i];
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject$1(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
    }
    if (!isPlainObject$1(format2) || !isString$1(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  const DATETIME_FORMAT_OPTIONS_KEYS = [
    "localeMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName",
    "formatMatcher",
    "hour12",
    "timeZone",
    "dateStyle",
    "timeStyle",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "hourCycle",
    "fractionalSecondDigits"
  ];
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    const options = create();
    let overrides = create();
    let value;
    if (isString$1(arg1)) {
      const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
      if (!matches) {
        throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
      }
      const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
      value = new Date(dateTime);
      try {
        value.toISOString();
      } catch {
        throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
      }
    } else if (isDate$1(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
      }
      value = arg1;
    } else if (isNumber$1(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    }
    if (isString$1(arg2)) {
      options.key = arg2;
    } else if (isPlainObject$1(arg2)) {
      Object.keys(arg2).forEach((key) => {
        if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
          overrides[key] = arg2[key];
        } else {
          options[key] = arg2[key];
        }
      });
    }
    if (isString$1(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject$1(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject$1(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
    const { __numberFormatters } = context;
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
    isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = getLocale$1(context, options);
    const locales = localeFallbacker(
      context,
      // eslint-disable-line @typescript-eslint/no-explicit-any
      fallbackLocale,
      locale
    );
    if (!isString$1(key) || key === "") {
      return new Intl.NumberFormat(locale, overrides).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = locales[i];
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject$1(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
    }
    if (!isPlainObject$1(format2) || !isString$1(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  const NUMBER_FORMAT_OPTIONS_KEYS = [
    "localeMatcher",
    "style",
    "currency",
    "currencyDisplay",
    "currencySign",
    "useGrouping",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "compactDisplay",
    "notation",
    "signDisplay",
    "unit",
    "unitDisplay",
    "roundingMode",
    "roundingPriority",
    "roundingIncrement",
    "trailingZeroDisplay"
  ];
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    const options = create();
    let overrides = create();
    if (!isNumber$1(arg1)) {
      throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    }
    const value = arg1;
    if (isString$1(arg2)) {
      options.key = arg2;
    } else if (isPlainObject$1(arg2)) {
      Object.keys(arg2).forEach((key) => {
        if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
          overrides[key] = arg2[key];
        } else {
          options[key] = arg2[key];
        }
      });
    }
    if (isString$1(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject$1(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject$1(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index2 = isNumber$1(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber$1(options.named.count) || isNumber$1(options.named.n)) ? isNumber$1(options.named.count) ? options.named.count : isNumber$1(options.named.n) ? options.named.n : index2 : index2;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction$1(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$1(options.pluralRules) && isString$1(locale) && isFunction$1(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages) => {
      return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    };
    const _list = options.list || [];
    const list = (index2) => _list[index2];
    const _named = options.named || create();
    isNumber$1(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key, useLinked) {
      const msg = isFunction$1(options.messages) ? options.messages(key, !!useLinked) : isObject$1(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject$1(options.processor) && isFunction$1(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject$1(options.processor) && isFunction$1(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject$1(options.processor) && isString$1(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const linked = (key, ...args) => {
      const [arg1, arg2] = args;
      let type2 = "text";
      let modifier = "";
      if (args.length === 1) {
        if (isObject$1(arg1)) {
          modifier = arg1.modifier || modifier;
          type2 = arg1.type || type2;
        } else if (isString$1(arg1)) {
          modifier = arg1 || modifier;
        }
      } else if (args.length === 2) {
        if (isString$1(arg1)) {
          modifier = arg1 || modifier;
        }
        if (isString$1(arg2)) {
          type2 = arg2 || type2;
        }
      }
      const ret = message(key, true)(ctx);
      const msg = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        type2 === "vnode" && isArray$1(ret) && modifier ? ret[0] : ret
      );
      return modifier ? _modifier(modifier)(msg, type2) : msg;
    };
    const ctx = {
      [
        "list"
        /* HelperNameMap.LIST */
      ]: list,
      [
        "named"
        /* HelperNameMap.NAMED */
      ]: named,
      [
        "plural"
        /* HelperNameMap.PLURAL */
      ]: plural,
      [
        "linked"
        /* HelperNameMap.LINKED */
      ]: linked,
      [
        "message"
        /* HelperNameMap.MESSAGE */
      ]: message,
      [
        "type"
        /* HelperNameMap.TYPE */
      ]: type,
      [
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ]: interpolate,
      [
        "normalize"
        /* HelperNameMap.NORMALIZE */
      ]: normalize,
      [
        "values"
        /* HelperNameMap.VALUES */
      ]: assign(create(), _list, _named)
    };
    return ctx;
  }
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction$1(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean$1(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean$1(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean$1(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString$1(options.default) || isBoolean$1(options.default) ? !isBoolean$1(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString$1(defaultMsgOrKey) || isFunction$1(defaultMsgOrKey));
    const locale = getLocale$1(context, options);
    escapeParameter && escapeParams(options);
    let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages[locale] || create()
    ];
    let format2 = formatScope;
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString$1(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let occurred = false;
    const onError = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged, key) : messaged;
    if (__INTLIFY_PROD_DEVTOOLS__) {
      const payloads = {
        timestamp: Date.now(),
        key: isString$1(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString$1(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, /* @__PURE__ */ getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray$1(options.list)) {
      options.list = options.list.map((item) => isString$1(item) ? escapeHtml(item) : item);
    } else if (isObject$1(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString$1(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
    const locales = localeFallbacker(context, fallbackLocale, locale);
    let message = create();
    let targetLocale;
    let format2 = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = locales[i];
      message = messages[targetLocale] || create();
      if ((format2 = resolveValue2(message, key)) === null) {
        format2 = message[key];
      }
      if (isString$1(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
        break;
      }
      if (!isImplicitFallback(targetLocale, locales)) {
        const missingRet = handleMissing(
          context,
          // eslint-disable-line @typescript-eslint/no-explicit-any
          key,
          targetLocale,
          missingWarn,
          type
        );
        if (missingRet !== key) {
          format2 = missingRet;
        }
      }
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    if (messageCompiler == null) {
      const msg2 = () => format2;
      msg2.locale = targetLocale;
      msg2.key = key;
      return msg2;
    }
    const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    const messaged = msg(msgCtx);
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = create();
    if (!isString$1(arg1) && !isNumber$1(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
      throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
    }
    const key = isNumber$1(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber$1(arg2)) {
      options.plural = arg2;
    } else if (isString$1(arg2)) {
      options.default = arg2;
    } else if (isPlainObject$1(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray$1(arg2)) {
      options.list = arg2;
    }
    if (isNumber$1(arg3)) {
      options.plural = arg3;
    } else if (isString$1(arg3)) {
      options.default = arg3;
    } else if (isPlainObject$1(arg3)) {
      assign(options, arg3);
    }
    return [key, options];
  }
  function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
    return {
      locale,
      key,
      warnHtmlMessage,
      onError: (err) => {
        onError && onError(err);
        {
          throw err;
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
    const resolveMessage = (key, useLinked) => {
      let val = resolveValue2(message, key);
      if (val == null && (fallbackContext || useLinked)) {
        const [, , message2] = resolveMessageFormat(
          fallbackContext || context,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          key,
          locale,
          fallbackLocale,
          fallbackWarn,
          missingWarn
        );
        val = resolveValue2(message2, key);
      }
      if (isString$1(val) || isMessageAST(val)) {
        let occurred = false;
        const onError = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, onError);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber$1(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  {
    initFeatureFlags$1();
  }
  /*!
    * vue-i18n v11.1.5
    * (c) 2025 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION$2 = "11.1.5";
  function initFeatureFlags() {
    if (typeof __VUE_I18N_FULL_INSTALL__ !== "boolean") {
      getGlobalThis().__VUE_I18N_FULL_INSTALL__ = true;
    }
    if (typeof __VUE_I18N_LEGACY_API__ !== "boolean") {
      getGlobalThis().__VUE_I18N_LEGACY_API__ = true;
    }
    if (typeof __INTLIFY_DROP_MESSAGE_COMPILER__ !== "boolean") {
      getGlobalThis().__INTLIFY_DROP_MESSAGE_COMPILER__ = false;
    }
    if (typeof __INTLIFY_PROD_DEVTOOLS__ !== "boolean") {
      getGlobalThis().__INTLIFY_PROD_DEVTOOLS__ = false;
    }
  }
  const I18nErrorCodes = {
    // composer module errors
    UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
    // 24
    // legacy module errors
    INVALID_ARGUMENT: 25,
    // i18n module errors
    MUST_BE_CALL_SETUP_TOP: 26,
    NOT_INSTALLED: 27,
    // directive module errors
    REQUIRED_VALUE: 28,
    INVALID_VALUE: 29,
    NOT_INSTALLED_WITH_PROVIDE: 31,
    // unexpected error
    UNEXPECTED_ERROR: 32
  };
  function createI18nError(code, ...args) {
    return createCompileError(code, null, void 0);
  }
  const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
  const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
  const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
  const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
  function handleFlatJson(obj) {
    if (!isObject$1(obj)) {
      return obj;
    }
    if (isMessageAST(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(".")) {
        if (isObject$1(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(".");
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        let hasStringValue = false;
        for (let i = 0; i < lastIndex; i++) {
          if (subKeys[i] === "__proto__") {
            throw new Error(`unsafe key: ${subKeys[i]}`);
          }
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = create();
          }
          if (!isObject$1(currentObj[subKeys[i]])) {
            hasStringValue = true;
            break;
          }
          currentObj = currentObj[subKeys[i]];
        }
        if (!hasStringValue) {
          if (!isMessageAST(currentObj)) {
            currentObj[subKeys[lastIndex]] = obj[key];
            delete obj[key];
          } else {
            if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
              delete obj[key];
            }
          }
        }
        if (!isMessageAST(currentObj)) {
          const target = currentObj[subKeys[lastIndex]];
          if (isObject$1(target)) {
            handleFlatJson(target);
          }
        }
      }
    }
    return obj;
  }
  function getLocaleMessages(locale, options) {
    const { messages, __i18n, messageResolver, flatJson } = options;
    const ret = isPlainObject$1(messages) ? messages : isArray$1(__i18n) ? create() : { [locale]: create() };
    if (isArray$1(__i18n)) {
      __i18n.forEach((custom) => {
        if ("locale" in custom && "resource" in custom) {
          const { locale: locale2, resource } = custom;
          if (locale2) {
            ret[locale2] = ret[locale2] || create();
            deepCopy(resource, ret[locale2]);
          } else {
            deepCopy(resource, ret);
          }
        } else {
          isString$1(custom) && deepCopy(JSON.parse(custom), ret);
        }
      });
    }
    if (messageResolver == null && flatJson) {
      for (const key in ret) {
        if (hasOwn(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  function getComponentOptions(instance) {
    return instance.type;
  }
  function adjustI18nResources(gl, options, componentOptions) {
    let messages = isObject$1(options.messages) ? options.messages : create();
    if ("__i18nGlobal" in componentOptions) {
      messages = getLocaleMessages(gl.locale.value, {
        messages,
        __i18n: componentOptions.__i18nGlobal
      });
    }
    const locales = Object.keys(messages);
    if (locales.length) {
      locales.forEach((locale) => {
        gl.mergeLocaleMessage(locale, messages[locale]);
      });
    }
    {
      if (isObject$1(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$1(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            gl.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
    }
  }
  function createTextNode(key) {
    return createVNode(Text, null, key, 0);
  }
  const DEVTOOLS_META = "__INTLIFY_META__";
  const NOOP_RETURN_ARRAY = () => [];
  const NOOP_RETURN_FALSE = () => false;
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, getCurrentInstance() || void 0, type);
    };
  }
  const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
    const instance = getCurrentInstance();
    let meta = null;
    return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
  };
  function createComposer(options = {}) {
    const { __root, __injectWithOption } = options;
    const _isGlobal = __root === void 0;
    const flatJson = options.flatJson;
    const _ref = inBrowser ? ref : shallowRef;
    let _inheritLocale = isBoolean$1(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = _ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString$1(options.locale) ? options.locale : DEFAULT_LOCALE
    );
    const _fallbackLocale = _ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
    );
    const _messages = _ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = _ref(isPlainObject$1(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = _ref(isPlainObject$1(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean$1(options.missingWarn) || isRegExp$1(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean$1(options.fallbackWarn) || isRegExp$1(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction$1(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction$1(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean$1(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject$1(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    const getCoreContext = () => {
      _isGlobal && setFallbackContext(null);
      const ctxOptions = {
        version: VERSION$2,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        messageResolver: options.messageResolver,
        messageCompiler: options.messageCompiler,
        __meta: { framework: "vue" }
      };
      {
        ctxOptions.datetimeFormats = _datetimeFormats.value;
        ctxOptions.numberFormats = _numberFormats.value;
        ctxOptions.__datetimeFormatters = isPlainObject$1(_context) ? _context.__datetimeFormatters : void 0;
        ctxOptions.__numberFormatters = isPlainObject$1(_context) ? _context.__numberFormatters : void 0;
      }
      const ctx = createCoreContext(ctxOptions);
      _isGlobal && setFallbackContext(ctx);
      return ctx;
    };
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = computed({
      get: () => _locale.value,
      set: (val) => {
        _context.locale = val;
        _locale.value = val;
      }
    });
    const fallbackLocale = computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _context.fallbackLocale = val;
        _fallbackLocale.value = val;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages = computed(() => _messages.value);
    const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
    const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction$1(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
      trackReactivityValues();
      let ret;
      try {
        if (__INTLIFY_PROD_DEVTOOLS__) {
          /* @__PURE__ */ setAdditionalMeta(/* @__PURE__ */ getMetaInfo());
        }
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        if (__INTLIFY_PROD_DEVTOOLS__) ;
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
      if (warnType !== "translate exists" && // for not `te` (e.g `t`)
      isNumber$1(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
        const [key, arg2] = argumentParser();
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
      }
    };
    function t2(...args) {
      return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString$1(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$1(arg3)) {
        throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
      }
      return t2(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray$1(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString$1(val) || isArray$1(val));
    }
    function normalize(values) {
      return values.map((val) => isString$1(val) || isNumber$1(val) || isBoolean$1(val) ? createTextNode(String(val)) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function translateVNode(...args) {
      return wrapWithDeps((context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray$1(val));
    }
    function numberParts(...args) {
      return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray$1(val));
    }
    function datetimeParts(...args) {
      return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString$1(val) || isArray$1(val));
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      return wrapWithDeps(() => {
        if (!key) {
          return false;
        }
        const targetLocale = isString$1(locale2) ? locale2 : _locale.value;
        const message = getLocaleMessage(targetLocale);
        const resolved = _context.messageResolver(message, key);
        return isMessageAST(resolved) || isMessageFunction(resolved) || isString$1(resolved);
      }, () => [key], "translate exists", (root) => {
        return Reflect.apply(root.te, root, [key, locale2]);
      }, NOOP_RETURN_FALSE, (val) => isBoolean$1(val));
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = _context.messageResolver(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      if (flatJson) {
        const _message = { [locale2]: message };
        for (const key in _message) {
          if (hasOwn(_message, key)) {
            handleFlatJson(_message[key]);
          }
        }
        message = _message[locale2];
      }
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      const _message = { [locale2]: message };
      if (flatJson) {
        for (const key in _message) {
          if (hasOwn(_message, key)) {
            handleFlatJson(_message[key]);
          }
        }
      }
      message = _message[locale2];
      deepCopy(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root && inBrowser) {
      watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t: t2,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [SetPluralRulesSymbol]: setPluralRules
    };
    {
      composer.datetimeFormats = datetimeFormats;
      composer.numberFormats = numberFormats;
      composer.rt = rt;
      composer.te = te;
      composer.tm = tm;
      composer.d = d;
      composer.n = n;
      composer.getDateTimeFormat = getDateTimeFormat;
      composer.setDateTimeFormat = setDateTimeFormat;
      composer.mergeDateTimeFormat = mergeDateTimeFormat;
      composer.getNumberFormat = getNumberFormat;
      composer.setNumberFormat = setNumberFormat;
      composer.mergeNumberFormat = mergeNumberFormat;
      composer[InejctWithOptionSymbol] = __injectWithOption;
      composer[TranslateVNodeSymbol] = translateVNode;
      composer[DatetimePartsSymbol] = datetimeParts;
      composer[NumberPartsSymbol] = numberParts;
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale = isString$1(options.locale) ? options.locale : DEFAULT_LOCALE;
    const fallbackLocale = isString$1(options.fallbackLocale) || isArray$1(options.fallbackLocale) || isPlainObject$1(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction$1(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean$1(options.silentTranslationWarn) || isRegExp$1(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean$1(options.silentFallbackWarn) || isRegExp$1(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean$1(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject$1(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction$1(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString$1(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean$1(options.sync) ? options.sync : true;
    let messages = options.messages;
    if (isPlainObject$1(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages = locales.reduce((messages2, locale2) => {
        const message = messages2[locale2] || (messages2[locale2] = {});
        assign(message, sharedMessages[locale2]);
        return messages2;
      }, messages || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      messageResolver: options.messageResolver,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const { __extender } = options;
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean$1(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean$1(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean$1(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean$1(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        return Reflect.apply(composer.t, composer, [...args]);
      },
      // rt
      rt(...args) {
        return Reflect.apply(composer.rt, composer, [...args]);
      },
      // te
      te(key, locale) {
        return composer.te(key, locale);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      // setLocaleMessage
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      // d
      d(...args) {
        return Reflect.apply(composer.d, composer, [...args]);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      // n
      n(...args) {
        return Reflect.apply(composer.n, composer, [...args]);
      },
      // getNumberFormat
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      // setNumberFormat
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      }
    };
    vueI18n.__extender = __extender;
    return vueI18n;
  }
  function defineMixin(vuei18n, composer, i18n2) {
    return {
      beforeCreate() {
        const instance = getCurrentInstance();
        if (!instance) {
          throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToGlobal(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            optionsI18n.__extender = i18n2.__vueI18nExtend;
            this.$i18n = createVueI18n(optionsI18n);
            const _vueI18n = this.$i18n;
            if (_vueI18n.__extender) {
              _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
            }
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToGlobal(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __extender: i18n2.__vueI18nExtend,
              __root: composer
            });
            const _vueI18n = this.$i18n;
            if (_vueI18n.__extender) {
              _vueI18n.__disposer = _vueI18n.__extender(this.$i18n);
            }
          }
        } else {
          this.$i18n = vuei18n;
        }
        if (options.__i18nGlobal) {
          adjustI18nResources(composer, options, options);
        }
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
        i18n2.__setInstance(instance, this.$i18n);
      },
      mounted() {
      },
      unmounted() {
        const instance = getCurrentInstance();
        if (!instance) {
          throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
        }
        const _vueI18n = this.$i18n;
        delete this.$t;
        delete this.$rt;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        if (_vueI18n.__disposer) {
          _vueI18n.__disposer();
          delete _vueI18n.__disposer;
          delete _vueI18n.__extender;
        }
        i18n2.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToGlobal(g, options) {
    g.locale = options.locale || g.locale;
    g.fallbackLocale = options.fallbackLocale || g.fallbackLocale;
    g.missing = options.missing || g.missing;
    g.silentTranslationWarn = options.silentTranslationWarn || g.silentFallbackWarn;
    g.silentFallbackWarn = options.silentFallbackWarn || g.silentFallbackWarn;
    g.formatFallbackMessages = options.formatFallbackMessages || g.formatFallbackMessages;
    g.postTranslation = options.postTranslation || g.postTranslation;
    g.warnHtmlInMessage = options.warnHtmlInMessage || g.warnHtmlInMessage;
    g.escapeParameterHtml = options.escapeParameterHtml || g.escapeParameterHtml;
    g.sync = options.sync || g.sync;
    g.__composer[SetPluralRulesSymbol](options.pluralizationRules || g.pluralizationRules);
    const messages = getLocaleMessages(g.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale) => g.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => g.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => g.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return g;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
      /* ComponentI18nScope */
    },
    i18n: {
      type: Object
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      const ret = slots.default ? slots.default() : [];
      return ret.reduce((slot, current) => {
        return [
          ...slot,
          // prettier-ignore
          ...current.type === Fragment ? current.children : [current]
        ];
      }, []);
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, create());
    }
  }
  function getFragmentableTag() {
    return Fragment;
  }
  const TranslationImpl = /* @__PURE__ */ defineComponent({
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        validator: (val) => isNumber$1(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      return () => {
        const keys = Object.keys(slots).filter((key) => key[0] !== "_");
        const options = create();
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString$1(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n2[TranslateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign(create(), attrs);
        const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
        return h(tag, assignedAttrs, children);
      };
    }
  });
  const Translation = TranslationImpl;
  function isVNode(target) {
    return isArray$1(target) && !isString$1(target[0]);
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString$1(props.format)) {
        options.key = props.format;
      } else if (isObject$1(props.format)) {
        if (isString$1(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
        }, create());
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray$1(parts)) {
        children = parts.map((part, index2) => {
          const slot = slots[part.type];
          const node = slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
          if (isVNode(node)) {
            node[0].key = `${part.type}-${index2}`;
          }
          return node;
        });
      } else if (isString$1(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign(create(), attrs);
      const tag = isString$1(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
  const NumberFormatImpl = /* @__PURE__ */ defineComponent({
    /* eslint-disable */
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[NumberPartsSymbol](...args)
      ));
    }
  });
  const NumberFormat = NumberFormatImpl;
  function getComposer$1(i18n2, instance) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n2.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
    }
  }
  function vTDirective(i18n2) {
    const _process = (binding) => {
      const { instance, value } = binding;
      if (!instance || !instance.$) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const composer = getComposer$1(i18n2, instance.$);
      const parsedValue = parseValue(value);
      return [
        Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
        composer
      ];
    };
    const register = (el, binding) => {
      const [textContent, composer] = _process(binding);
      if (inBrowser && i18n2.global === composer) {
        el.__i18nWatcher = watch(composer.locale, () => {
          binding.instance && binding.instance.$forceUpdate();
        });
      }
      el.__composer = composer;
      el.textContent = textContent;
    };
    const unregister = (el) => {
      if (inBrowser && el.__i18nWatcher) {
        el.__i18nWatcher();
        el.__i18nWatcher = void 0;
        delete el.__i18nWatcher;
      }
      if (el.__composer) {
        el.__composer = void 0;
        delete el.__composer;
      }
    };
    const update = (el, { value }) => {
      if (el.__composer) {
        const composer = el.__composer;
        const parsedValue = parseValue(value);
        el.textContent = Reflect.apply(composer.t, composer, [
          ...makeParams(parsedValue)
        ]);
      }
    };
    const getSSRProps = (binding) => {
      const [textContent] = _process(binding);
      return { textContent };
    };
    return {
      created: register,
      unmounted: unregister,
      beforeUpdate: update,
      getSSRProps
    };
  }
  function parseValue(value) {
    if (isString$1(value)) {
      return { path: value };
    } else if (isPlainObject$1(value)) {
      if (!("path" in value)) {
        throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
      }
      return value;
    } else {
      throw createI18nError(I18nErrorCodes.INVALID_VALUE);
    }
  }
  function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString$1(locale)) {
      options.locale = locale;
    }
    if (isNumber$1(choice)) {
      options.plural = choice;
    }
    if (isNumber$1(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app2, i18n2, ...options) {
    const pluginOptions = isPlainObject$1(options[0]) ? options[0] : {};
    const globalInstall = isBoolean$1(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall) {
      [Translation.name, "I18nT"].forEach((name) => app2.component(name, Translation));
      [NumberFormat.name, "I18nN"].forEach((name) => app2.component(name, NumberFormat));
      [DatetimeFormat.name, "I18nD"].forEach((name) => app2.component(name, DatetimeFormat));
    }
    {
      app2.directive("t", vTDirective(i18n2));
    }
  }
  const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
  function createI18n(options = {}) {
    const __legacyMode = __VUE_I18N_LEGACY_API__ && isBoolean$1(options.legacy) ? options.legacy : __VUE_I18N_LEGACY_API__;
    const __globalInjection = isBoolean$1(options.globalInjection) ? options.globalInjection : true;
    const __instances = /* @__PURE__ */ new Map();
    const [globalScope, __global] = createGlobal(options, __legacyMode);
    const symbol = /* @__PURE__ */ makeSymbol("");
    function __getInstance(component) {
      return __instances.get(component) || null;
    }
    function __setInstance(component, instance) {
      __instances.set(component, instance);
    }
    function __deleteInstance(component) {
      __instances.delete(component);
    }
    const i18n2 = {
      // mode
      get mode() {
        return __VUE_I18N_LEGACY_API__ && __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      async install(app2, ...options2) {
        app2.__VUE_I18N_SYMBOL__ = symbol;
        app2.provide(app2.__VUE_I18N_SYMBOL__, i18n2);
        if (isPlainObject$1(options2[0])) {
          const opts = options2[0];
          i18n2.__composerExtend = opts.__composerExtend;
          i18n2.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (!__legacyMode && __globalInjection) {
          globalReleaseHandler = injectGlobalFields(app2, i18n2.global);
        }
        if (__VUE_I18N_FULL_INSTALL__) {
          apply(app2, i18n2, ...options2);
        }
        if (__VUE_I18N_LEGACY_API__ && __legacyMode) {
          app2.mixin(defineMixin(__global, __global.__composer, i18n2));
        }
        const unmountApp = app2.unmount;
        app2.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n2.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n2;
  }
  function useI18n(options = {}) {
    const instance = getCurrentInstance();
    if (instance == null) {
      throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
    }
    if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
    }
    const i18n2 = getI18nInstance(instance);
    const gl = getGlobalComposer(i18n2);
    const componentOptions = getComponentOptions(instance);
    const scope = getScope(options, componentOptions);
    if (scope === "global") {
      adjustI18nResources(gl, options, componentOptions);
      return gl;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n2, instance, options.__useComponent);
      if (composer2 == null) {
        composer2 = gl;
      }
      return composer2;
    }
    const i18nInternal = i18n2;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const composerOptions = assign({}, options);
      if ("__i18n" in componentOptions) {
        composerOptions.__i18n = componentOptions.__i18n;
      }
      if (gl) {
        composerOptions.__root = gl;
      }
      composer = createComposer(composerOptions);
      if (i18nInternal.__composerExtend) {
        composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
      }
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function createGlobal(options, legacyMode) {
    const scope = effectScope();
    const obj = __VUE_I18N_LEGACY_API__ && legacyMode ? scope.run(() => createVueI18n(options)) : scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
  function getI18nInstance(instance) {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
  function getScope(options, componentOptions) {
    return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
  }
  function getGlobalComposer(i18n2) {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  }
  function getComposer(i18n2, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = getParentComponentInstance(target, useComponent);
    while (current != null) {
      const i18nInternal = i18n2;
      if (i18n2.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        if (__VUE_I18N_LEGACY_API__) {
          const vueI18n = i18nInternal.__getInstance(current);
          if (vueI18n != null) {
            composer = vueI18n.__composer;
            if (useComponent && composer && !composer[InejctWithOptionSymbol]) {
              composer = null;
            }
          }
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function getParentComponentInstance(target, useComponent = false) {
    if (target == null) {
      return null;
    }
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
  function setupLifeCycle(i18n2, target, composer) {
    onMounted(() => {
    }, target);
    onUnmounted(() => {
      const _composer = composer;
      i18n2.__deleteInstance(target);
      const dispose = _composer[DisposeSymbol];
      if (dispose) {
        dispose();
        delete _composer[DisposeSymbol];
      }
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
  function injectGlobalFields(app2, composer) {
    const i18n2 = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      const wrap = isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n2, prop, wrap);
    });
    app2.config.globalProperties.$i18n = i18n2;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
      }
      Object.defineProperty(app2.config.globalProperties, `$${method}`, desc);
    });
    const dispose = () => {
      delete app2.config.globalProperties.$i18n;
      globalExportMethods.forEach((method) => {
        delete app2.config.globalProperties[`$${method}`];
      });
    };
    return dispose;
  }
  const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
    /* eslint-disable */
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setup(props, context) {
      const i18n2 = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n2[DatetimePartsSymbol](...args)
      ));
    }
  });
  const DatetimeFormat = DatetimeFormatImpl;
  {
    initFeatureFlags();
  }
  registerMessageCompiler(compile);
  registerMessageResolver(resolveValue);
  registerLocaleFallbacker(fallbackWithLocaleChain);
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const fr = {
    settings: {
      title: "Paramètres",
      cache: {
        title: "Gestion du cache",
        description: "L'application stocke les données des lignes et arrêts en cache pendant 2 semaines pour améliorer les performances. Vous pouvez vider le cache si vous rencontrez des problèmes ou si vous souhaitez forcer un rafraîchissement complet.",
        clearButton: "Vider le cache",
        clearing: "Suppression en cours...",
        cleared: "Cache vidé avec succès !"
      },
      preferences: {
        title: "Préférences",
        language: "Langue",
        homePage: "Page d'accueil",
        homeOptions: {
          home: "Accueil",
          favorites: "Favoris"
        }
      },
      about: {
        title: "À propos",
        version: "Version",
        description: "Cette application web non officielle vous permet d'accéder aux horaires du réseau STAN en temps réel.",
        dataSource: "Les données sont récupérées depuis le site"
      },
      legal: {
        title: "Mentions légales",
        copyright: "Droits d'auteur",
        copyrightText: "Tous les éléments, marques et propriétés intellectuelles présentés dans cette application sont la propriété de KGN et du réseau STAN, et sont protégés par les lois sur les droits d'auteur.",
        reproduction: "Reproduction",
        reproductionText: "Cette application utilise des données publiques mises à disposition par le réseau STAN. Les informations sont présentées dans leur intégrité, sans modification ni altération, et ne sont pas utilisées à des fins commerciales ou publicitaires.",
        liability: "Limitation de responsabilité",
        liabilityText: "Cette application non-officielle est proposée à titre informatif uniquement. Toutes les données et horaires sont fournis à titre indicatif et ne sauraient engager la responsabilité des créateurs de cette application ou du réseau STAN. Les informations peuvent contenir des erreurs ou omissions.",
        externalLinks: "Liens externes",
        externalLinksText: "Les liens externes présents dans cette application peuvent vous diriger vers des sites tiers dont le contenu n'engage pas la responsabilité des créateurs de cette application.",
        disclaimer: "Cette application n'est ni affiliée ni endossée par KGN ou toute société impliquée dans la gestion du réseau STAN."
      },
      support: {
        title: "Assistance",
        description: "Si vous rencontrez des problèmes avec l'application, vous pouvez effectuer les actions suivantes :",
        actions: {
          clearCache: "Vider le cache de l'application (option ci-dessus)",
          refresh: "Rafraîchir la page",
          checkConnection: "Vérifier votre connexion internet"
        }
      }
    },
    favorites: {
      title: "Favoris",
      empty: "Vous n'avez pas encore d'arrêts favoris.",
      emptyDescription: "Ajoutez des arrêts à vos favoris pour les retrouver ici."
    },
    home: {
      search: "Trouver une ligne",
      notFound: "Aucune ligne ne correspond à votre recherche."
    },
    arret: {
      title: "Arrêts",
      passageImediat: "À l'approche",
      loading: "Chargement des passages...",
      noPassages: "Aucun passage prévu prochainement."
    },
    ligne: {
      title: "Ligne",
      search: "Rechercher...",
      notFound: "Aucune ligne trouvée.",
      detail: "Voir détails"
    }
  };
  const en = {
    settings: {
      title: "Settings",
      cache: {
        title: "Cache Management",
        description: "The application stores line and stop data in cache for 2 weeks to improve performance. You can clear the cache if you encounter issues or if you want to force a complete refresh.",
        clearButton: "Clear cache",
        clearing: "Clearing...",
        cleared: "Cache cleared successfully!"
      },
      preferences: {
        title: "Preferences",
        language: "Language",
        homePage: "Home page",
        homeOptions: {
          home: "Home",
          favorites: "Favorites"
        }
      },
      about: {
        title: "About",
        version: "Version",
        description: "This unofficial web application allows you to access the STAN network schedules in real time.",
        dataSource: "Data is retrieved from the website"
      },
      legal: {
        title: "Legal Notice",
        copyright: "Copyright",
        copyrightText: "All elements, trademarks, and intellectual properties presented in this application are the property of KGN and the STAN network, and are protected by copyright laws.",
        reproduction: "Reproduction",
        reproductionText: "This application uses public data made available by the STAN network. The information is presented in its integrity, without modification or alteration, and is not used for commercial or advertising purposes.",
        liability: "Limitation of Liability",
        liabilityText: "This unofficial application is provided for informational purposes only. All data and schedules are provided for information purposes and shall not engage the responsibility of the creators of this application or the STAN network. Information may contain errors or omissions.",
        externalLinks: "External Links",
        externalLinksText: "External links in this application may direct you to third-party sites whose content is not the responsibility of the creators of this application.",
        disclaimer: "This application is neither affiliated with nor endorsed by KGN or any company involved in the management of the STAN network."
      },
      support: {
        title: "Support",
        description: "If you encounter problems with the application, you can perform the following actions:",
        actions: {
          clearCache: "Clear the application cache (option above)",
          refresh: "Refresh the page",
          checkConnection: "Check your internet connection"
        }
      }
    },
    favorites: {
      title: "Favorites",
      empty: "You don't have any favorite stops yet.",
      emptyDescription: "Add stops to your favorites to find them here."
    },
    home: {
      search: "Find a line",
      notFound: "No lines match your search."
    },
    arret: {
      title: "Stops",
      passageImediat: "Approaching",
      loading: "Loading arrivals...",
      noPassages: "No upcoming arrivals scheduled."
    },
    ligne: {
      title: "Line",
      search: "Search...",
      notFound: "No line found.",
      detail: "View details"
    }
  };
  const getLocale = () => {
    const preferences = localStorage.getItem("preferences");
    if (preferences) {
      const { language } = JSON.parse(preferences);
      return language || "fr";
    }
    return "fr";
  };
  const i18n = createI18n({
    legacy: false,
    locale: getLocale(),
    fallbackLocale: "fr",
    messages: {
      fr,
      en
    }
  });
  const { t } = i18n.global;
  const clickOutside = {
    beforeMount(el, binding) {
      el.clickOutsideEvent = (event) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event);
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted(el) {
      document.removeEventListener("click", el.clickOutsideEvent);
    }
  };
  const app = createApp(_sfc_main$o);
  app.use(router);
  app.use(src_default, { position: "bottom-right" });
  app.use(pinia);
  app.use(i18n);
  app.directive("click-outside", clickOutside);
  app.mount("#app");
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  const { toString } = Object.prototype;
  const { getPrototypeOf } = Object;
  const { iterator, toStringTag } = Symbol;
  const kindOf = /* @__PURE__ */ ((cache2) => (thing) => {
    const str = toString.call(thing);
    return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  const kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  const typeOfTest = (type) => (thing) => typeof thing === type;
  const { isArray } = Array;
  const isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  const isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  const isString = typeOfTest("string");
  const isFunction = typeOfTest("function");
  const isNumber = typeOfTest("number");
  const isObject = (thing) => thing !== null && typeof thing === "object";
  const isBoolean = (thing) => thing === true || thing === false;
  const isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype2 = getPrototypeOf(val);
    return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
  };
  const isDate = kindOfTest("Date");
  const isFile = kindOfTest("File");
  const isBlob = kindOfTest("Blob");
  const isFileList = kindOfTest("FileList");
  const isStream = (val) => isObject(val) && isFunction(val.pipe);
  const isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  const isURLSearchParams = kindOfTest("URLSearchParams");
  const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
  const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  const _global = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  const isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  const stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  const inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  const endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  const toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  const forEachEntry = (obj, fn) => {
    const generator = obj && obj[iterator];
    const _iterator = generator.call(obj);
    let result;
    while ((result = _iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  const matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  const isHTMLForm = kindOfTest("HTMLFormElement");
  const toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer2(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  const isRegExp = kindOfTest("RegExp");
  const reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  const freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  const toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  const noop = () => {
  };
  const toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
  }
  const toJSONObject = (obj) => {
    const stack2 = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack2.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack2[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack2[i] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  const isAsyncFn = kindOfTest("AsyncFunction");
  const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }
    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);
      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      };
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(
    typeof setImmediate === "function",
    isFunction(_global.postMessage)
  );
  const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
  const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
  const utils$1 = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable
  };
  function AxiosError$1(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }
  utils$1.inherits(AxiosError$1, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils$1.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });
  const prototype$1 = AxiosError$1.prototype;
  const descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError$1, descriptors);
  Object.defineProperty(prototype$1, "isAxiosError", { value: true });
  AxiosError$1.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype$1);
    utils$1.toFlatObject(error, axiosError, function filter(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError$1.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  const httpAdapter = null;
  function isVisitable(thing) {
    return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
  }
  function removeBrackets(key) {
    return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils$1.isArray(arr) && !arr.some(isVisitable);
  }
  const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData$1(obj, formData, options) {
    if (!utils$1.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new FormData();
    options = utils$1.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils$1.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
    if (!utils$1.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null) return "";
      if (utils$1.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils$1.isBlob(value)) {
        throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
      }
      if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils$1.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index2) {
            !(utils$1.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index2, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack2 = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils$1.isUndefined(value)) return;
      if (stack2.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack2.push(value);
      utils$1.forEach(value, function each(el, key) {
        const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils$1.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack2.pop();
    }
    if (!utils$1.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  function encode$1(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer2(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData$1(params, this, options);
  }
  const prototype = AxiosURLSearchParams.prototype;
  prototype.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode$1);
    } : encode$1;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode;
    if (utils$1.isFunction(options)) {
      options = {
        serialize: options
      };
    }
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  class InterceptorManager {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils$1.forEach(this.handlers, function forEachHandler(h2) {
        if (h2 !== null) {
          fn(h2);
        }
      });
    }
  }
  const transitionalDefaults = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };
  const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
  const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
  const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
  const platform$1 = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };
  const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
  const _navigator = typeof navigator === "object" && navigator || void 0;
  const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
  const hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  const origin = hasBrowserEnv && window.location.href || "http://localhost";
  const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    hasBrowserEnv,
    hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv,
    navigator: _navigator,
    origin
  }, Symbol.toStringTag, { value: "Module" }));
  const platform = {
    ...utils,
    ...platform$1
  };
  function toURLEncodedForm(data, options) {
    return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform.isNode && utils$1.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  function parsePropPath(name) {
    return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index2) {
      let name = path[index2++];
      if (name === "__proto__") return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index2 >= path.length;
      name = !name && utils$1.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils$1.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils$1.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index2);
      if (result && utils$1.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
      const obj = {};
      utils$1.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  function stringifySafely(rawValue, parser, encoder) {
    if (utils$1.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils$1.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  const defaults = {
    transitional: transitionalDefaults,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$1.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData$1(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional && transitional.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform.classes.FormData,
      Blob: platform.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
    defaults.headers[method] = {};
  });
  const ignoreDuplicateOf = utils$1.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  const parseHeaders = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };
  const $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils$1.isFunction(filter)) {
      return filter.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils$1.isString(value)) return;
    if (utils$1.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }
    if (utils$1.isRegExp(filter)) {
      return filter.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils$1.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  let AxiosHeaders$1 = class AxiosHeaders {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils$1.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders(header), valueOrRewrite);
      } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
        let obj = {}, dest, key;
        for (const entry of header) {
          if (!utils$1.isArray(entry)) {
            throw TypeError("Object iterator must return a key-value pair");
          }
          obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
        }
        setHeaders(obj, valueOrRewrite);
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils$1.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils$1.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils$1.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils$1.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils$1.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format2) {
      const self2 = this;
      const headers = {};
      utils$1.forEach(this, (value, header) => {
        const key = utils$1.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format2 ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils$1.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    getSetCookie() {
      return this.get("set-cookie") || [];
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed2 = new this(first);
      targets.forEach((target) => computed2.set(target));
      return computed2;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype2 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype2, _header);
          accessors[lHeader] = true;
        }
      }
      utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils$1.freezeMethods(AxiosHeaders$1);
  function transformData(fns, response) {
    const config = this || defaults;
    const context = response || config;
    const headers = AxiosHeaders$1.from(context.headers);
    let data = context.data;
    utils$1.forEach(fns, function transform2(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  function isCancel$1(value) {
    return !!(value && value.__CANCEL__);
  }
  function CanceledError$1(message, config, request) {
    AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils$1.inherits(CanceledError$1, AxiosError$1, {
    __CANCEL__: true
  });
  function settle(resolve2, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve2(response);
    } else {
      reject(new AxiosError$1(
        "Request failed with status code " + response.status,
        [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1e3 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };
    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    const flush = () => lastArgs && invoke(lastArgs);
    return [throttled, flush];
  }
  const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer(50, 250);
    return throttle((e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? "download" : "upload"]: true
      };
      listener(data);
    }, freq);
  };
  const progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;
    return [(loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };
  const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
  const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
    url = new URL(url, platform.origin);
    return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
  })(
    new URL(platform.origin),
    platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
  ) : () => true;
  const cookies = platform.hasStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + "=" + encodeURIComponent(value)];
        utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
        utils$1.isString(path) && cookie.push("path=" + path);
        utils$1.isString(domain) && cookie.push("domain=" + domain);
        secure === true && cookie.push("secure");
        document.cookie = cookie.join("; ");
      },
      read(name) {
        const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    }
  ) : (
    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {
      },
      read() {
        return null;
      },
      remove() {
      }
    }
  );
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
  function mergeConfig$1(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, prop, caseless) {
      if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
        return utils$1.merge.call({ caseless }, target, source);
      } else if (utils$1.isPlainObject(source)) {
        return utils$1.merge({}, source);
      } else if (utils$1.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a, prop, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils$1.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils$1.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
    };
    utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }
  const resolveConfig = (config) => {
    const newConfig = mergeConfig$1({}, config);
    let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
    newConfig.headers = headers = AxiosHeaders$1.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
    if (auth) {
      headers.set(
        "Authorization",
        "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
      );
    }
    let contentType;
    if (utils$1.isFormData(data)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(void 0);
      } else if ((contentType = headers.getContentType()) !== false) {
        const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
      }
    }
    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  };
  const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  const xhrAdapter = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve2, reject) {
      const _config = resolveConfig(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;
      function done() {
        flushUpload && flushUpload();
        flushDownload && flushDownload();
        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
        _config.signal && _config.signal.removeEventListener("abort", onCanceled);
      }
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve2(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError2() {
        reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional = _config.transitional || transitionalDefaults;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError$1(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils$1.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = _config.responseType;
      }
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
        request.addEventListener("progress", downloadThrottled);
      }
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
        request.upload.addEventListener("progress", uploadThrottled);
        request.upload.addEventListener("loadend", flushUpload);
      }
      if (_config.cancelToken || _config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };
  const composeSignals = (signals, timeout) => {
    const { length } = signals = signals ? signals.filter(Boolean) : [];
    if (timeout || length) {
      let controller = new AbortController();
      let aborted;
      const onabort = function(reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
        }
      };
      let timer = timeout && setTimeout(() => {
        timer = null;
        onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
      }, timeout);
      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach((signal2) => {
            signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
          });
          signals = null;
        }
      };
      signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
      const { signal } = controller;
      signal.unsubscribe = () => utils$1.asap(unsubscribe);
      return signal;
    }
  };
  const streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };
  const readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };
  const readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }
    const reader = stream.getReader();
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };
  const trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator2 = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };
    return new ReadableStream({
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    }, {
      highWaterMark: 2
    });
  };
  const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
  const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
  const test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false;
    }
  };
  const supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const DEFAULT_CHUNK_SIZE = 64 * 1024;
  const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && ((res) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  const fetchAdapter = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = "credentials" in Request.prototype;
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      });
      let response = await fetch(request);
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve2, reject) => {
        settle(resolve2, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  });
  const knownAdapters = {
    http: httpAdapter,
    xhr: xhrAdapter,
    fetch: fetchAdapter
  };
  utils$1.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  const renderReason = (reason) => `- ${reason}`;
  const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
  const adapters = {
    getAdapter: (adapters2) => {
      adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
      const { length } = adapters2;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters2[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === void 0) {
            throw new AxiosError$1(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || "#" + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
        );
        let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
        throw new AxiosError$1(
          `There is no suitable adapter to dispatch the request ` + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return adapter;
    },
    adapters: knownAdapters
  };
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError$1(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders$1.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }
  const VERSION$1 = "1.9.0";
  const validators$1 = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators$1[type] = function validator2(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  const deprecatedWarnings = {};
  validators$1.transitional = function transitional(validator2, version2, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator2 === false) {
        throw new AxiosError$1(
          formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
          AxiosError$1.ERR_DEPRECATED
        );
      }
      if (version2 && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version2 + " and will be removed in the near future"
          )
        );
      }
      return validator2 ? validator2(value, opt, opts) : true;
    };
  };
  validators$1.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator2 = schema[opt];
      if (validator2) {
        const value = options[opt];
        const result = value === void 0 || validator2(value, opt, options);
        if (result !== true) {
          throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
      }
    }
  }
  const validator = {
    assertOptions,
    validators: validators$1
  };
  const validators = validator.validators;
  let Axios$1 = class Axios {
    constructor(instanceConfig) {
      this.defaults = instanceConfig || {};
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};
          Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
          const stack2 = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
          try {
            if (!err.stack) {
              err.stack = stack2;
            } else if (stack2 && !String(err.stack).endsWith(stack2.replace(/^.+\n.+\n/, ""))) {
              err.stack += "\n" + stack2;
            }
          } catch (e) {
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig$1(this.defaults, config);
      const { transitional, paramsSerializer, headers } = config;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils$1.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator.assertOptions(paramsSerializer, {
            encode: validators.function,
            serialize: validators.function
          }, true);
        }
      }
      if (config.allowAbsoluteUrls !== void 0) ;
      else if (this.defaults.allowAbsoluteUrls !== void 0) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }
      validator.assertOptions(config, {
        baseUrl: validators.spelling("baseURL"),
        withXsrfToken: validators.spelling("withXSRFToken")
      }, true);
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils$1.merge(
        headers.common,
        headers[config.method]
      );
      headers && utils$1.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig$1(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios$1.prototype[method] = function(url, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios$1.prototype[method] = generateHTTPMethod();
    Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  let CancelToken$1 = class CancelToken2 {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve2) {
        resolvePromise = resolve2;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve2) => {
          token.subscribe(resolve2);
          _resolve = resolve2;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError$1(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index2 = this._listeners.indexOf(listener);
      if (index2 !== -1) {
        this._listeners.splice(index2, 1);
      }
    }
    toAbortSignal() {
      const controller = new AbortController();
      const abort = (err) => {
        controller.abort(err);
      };
      this.subscribe(abort);
      controller.signal.unsubscribe = () => this.unsubscribe(abort);
      return controller.signal;
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new CancelToken2(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };
  function spread$1(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  function isAxiosError$1(payload) {
    return utils$1.isObject(payload) && payload.isAxiosError === true;
  }
  const HttpStatusCode$1 = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
    HttpStatusCode$1[value] = key;
  });
  function createInstance(defaultConfig) {
    const context = new Axios$1(defaultConfig);
    const instance = bind(Axios$1.prototype.request, context);
    utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
    utils$1.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create2(instanceConfig) {
      return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
    };
    return instance;
  }
  const axios = createInstance(defaults);
  axios.Axios = Axios$1;
  axios.CanceledError = CanceledError$1;
  axios.CancelToken = CancelToken$1;
  axios.isCancel = isCancel$1;
  axios.VERSION = VERSION$1;
  axios.toFormData = toFormData$1;
  axios.AxiosError = AxiosError$1;
  axios.Cancel = axios.CanceledError;
  axios.all = function all2(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread$1;
  axios.isAxiosError = isAxiosError$1;
  axios.mergeConfig = mergeConfig$1;
  axios.AxiosHeaders = AxiosHeaders$1;
  axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters.getAdapter;
  axios.HttpStatusCode = HttpStatusCode$1;
  axios.default = axios;
  const {
    Axios,
    AxiosError,
    CanceledError,
    isCancel,
    CancelToken,
    VERSION,
    all,
    Cancel,
    isAxiosError,
    spread,
    toFormData,
    AxiosHeaders,
    HttpStatusCode,
    formToJSON,
    getAdapter,
    mergeConfig
  } = axios;
  const _Stan = class _Stan {
    // HTTP client
    static getInstance() {
      return axios.create({
        baseURL: "https://www.reseau-stan.com/?type=476",
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
    }
    // Cache management methods
    static saveToCache(key, data) {
      try {
        const cacheItem = {
          timestamp: Date.now(),
          data
        };
        localStorage.setItem(key, JSON.stringify(cacheItem));
      } catch (error) {
        console.error("Error saving to cache:", error);
      }
    }
    static getFromCache(key) {
      try {
        const cacheItem = localStorage.getItem(key);
        if (!cacheItem) return null;
        const { timestamp, data } = JSON.parse(cacheItem);
        return Date.now() - timestamp < this.CACHE_DURATION ? data : null;
      } catch (error) {
        console.error("Error reading from cache:", error);
        return null;
      }
    }
    static clearCache() {
      try {
        localStorage.removeItem("stan_lignes");
        Object.keys(localStorage).filter((key) => key.startsWith("stan_arrets_")).forEach((key) => localStorage.removeItem(key));
      } catch (error) {
        console.error("Error clearing cache:", error);
      }
    }
    // Data fetch methods
    static async getLignes(forceRefresh = false) {
      if (!forceRefresh) {
        const cachedLignes = this.getFromCache("stan_lignes");
        if (cachedLignes) return cachedLignes;
      }
      const response = await _Stan.getInstance().get("https://www.reseau-stan.com/");
      const htmlContent = response.data;
      const ligneRegex = /data-ligne="(\d+)" data-numlignepublic="([^"]+)" data-osmid="(line[^"+]+)" data-libelle="([^"]+)" value="[^"]+">/g;
      const lignes = [];
      for (const match of htmlContent.matchAll(ligneRegex)) {
        const [_, id, numPublic, osmId, rawLibelle] = match;
        lignes.push({
          id: parseInt(id),
          numlignepublic: numPublic,
          osmid: osmId,
          libelle: this._decodeHtmlEntities(rawLibelle),
          image: `https://www.reseau-stan.com/typo3conf/ext/kg_package/Resources/Public/images/pictolignes/${numPublic.replace(" ", "_")}.png`
        });
      }
      this.saveToCache("stan_lignes", lignes);
      return lignes;
    }
    static async getLigne(osmid, forceRefresh = false) {
      const lignes = await this.getLignes(forceRefresh);
      return lignes.find((ligne) => ligne.osmid === osmid) || null;
    }
    static async getArrets(ligne, forceRefresh = false) {
      const cacheKey = `stan_arrets_${ligne.id}`;
      if (!forceRefresh) {
        const cachedArrets = this.getFromCache(cacheKey);
        if (cachedArrets) return cachedArrets;
      }
      const formData = new FormData();
      formData.append("requete", "tempsreel_arrets");
      formData.append("requete_val[ligne]", ligne.id);
      formData.append("requete_val[numlignepublic]", ligne.numlignepublic);
      const response = await this.getInstance().request({
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
      const arretRegex = /data-libelle="([^"]+)" data-ligne="(\d+)" data-numlignepublic="([^"]+)" value="([^"]+)">([^<]+)<\/option>/g;
      const arrets = [];
      for (const match of response.data.matchAll(arretRegex)) {
        const [_, libelle, , , osmid] = match;
        arrets.push({
          ligne,
          libelle,
          osmid
        });
      }
      this.saveToCache(cacheKey, arrets);
      return arrets;
    }
    static async getProchainsPassages(arret) {
      var _a;
      const formData = new FormData();
      formData.append("requete", "tempsreel_submit");
      formData.append("requete_val[arret]", arret.osmid);
      formData.append("requete_val[ligne_omsid]", ((_a = arret.ligne) == null ? void 0 : _a.osmid) || "");
      const response = await this.getInstance().request({
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
      const passageItems = response.data.split("<li>").slice(1);
      const passages = [];
      for (const item of passageItems) {
        const directionMatch = item.match(/<span>([^"]+)<\/span><\/span>/);
        const ligneMatch = item.match(/<span id="ui-ligne-(\d+)".*\/pictolignes\/([^"]+).png'/);
        if (!directionMatch || !ligneMatch) continue;
        const direction = directionMatch[1];
        const ligneId = parseInt(ligneMatch[1], 10);
        const ligneNumPublic = ligneMatch[2];
        const basePassage = {
          arret: {
            ligne: {
              ...arret.ligne,
              id: ligneId,
              numlignepublic: ligneNumPublic
            },
            ...arret
          },
          direction
        };
        this._processNowPassages(item, basePassage, passages);
        this._processMinutePassages(item, basePassage, passages);
        this._processHourPassages(item, basePassage, passages);
      }
      return passages;
    }
    static getPlan(ligne) {
      if (!ligne || !ligne.osmid) return null;
      return this.plans[ligne.osmid] || null;
    }
    // Helper methods
    static _decodeHtmlEntities(text) {
      return text.replace("&lt;", "<").replace("&gt;", ">").replace(/&#039;/g, "'");
    }
    static _processNowPassages(html, basePassage, passages) {
      const nowRegex = /class="tpsreel-temps-item large-1 "><i class="icon-car1"><\/i><i title="Temps Réel" class="icon-wifi2"><\/i>/g;
      for (const _ of html.matchAll(nowRegex)) {
        passages.push({
          ...basePassage,
          temps_min: 0,
          temps_theorique: false
        });
      }
    }
    static _processMinutePassages(html, basePassage, passages) {
      const minutesRegex = /class="tpsreel-temps-item large-1 ">(\d+) min/g;
      for (const match of html.matchAll(minutesRegex)) {
        passages.push({
          ...basePassage,
          temps_min: parseInt(match[1]),
          temps_theorique: false
        });
      }
    }
    static _processHourPassages(html, basePassage, passages) {
      const hoursRegex = /temps-item-heure">(\d+)h(\d+)(.*)<\/a>/g;
      for (const match of html.matchAll(hoursRegex)) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        passages.push({
          ...basePassage,
          temps_min: hours * 60 + minutes,
          temps_theorique: match[0].includes("tpsreel-temps-item-tpstheorique")
        });
      }
    }
  };
  // Constants
  __publicField(_Stan, "CACHE_DURATION", 14 * 24 * 60 * 60 * 1e3);
  // 2 semaines en millisecondes
  __publicField(_Stan, "plans", {
    "line:GST:1-97": "https://tim.reseau-stan.com/tim/data/pdf/2283_Ligne Tempo 1.pdf",
    "line:GST:2-97": "https://tim.reseau-stan.com/tim/data/pdf/1372_Ligne Tempo 2.pdf",
    "line:GST:3-97": "https://tim.reseau-stan.com/tim/data/pdf/2312_Ligne Tempo 3.pdf",
    "line:GST:4-97": "https://tim.reseau-stan.com/tim/data/pdf/2215_Ligne Tempo 4.pdf",
    "line:GST:5-97": "https://tim.reseau-stan.com/tim/data/pdf/2216_Ligne Corol.pdf",
    "line:GST:18-97": "https://tim.reseau-stan.com/tim/data/pdf/2219_Brabois Express.pdf",
    "line:GST:14-97": "https://tim.reseau-stan.com/tim/data/pdf/1315_Ligne 14ex-14sept23.pdf",
    "line:SUB:10": "https://tim.reseau-stan.com/tim/data/pdf/2217_Ligne 10.pdf",
    "line:GST:11-97": "https://tim.reseau-stan.com/tim/data/pdf/2218_Ligne 11.pdf",
    "line:GST:12-97": "https://tim.reseau-stan.com/tim/data/pdf/2109_Ligne 12.pdf",
    "line:GST:13-97": "https://tim.reseau-stan.com/tim/data/pdf/1868_Ligne 13.pdf",
    "line:GST:15-97": "https://tim.reseau-stan.com/tim/data/pdf/2309_Ligne 15.pdf",
    "line:GST:16-97": "https://tim.reseau-stan.com/tim/data/pdf/2310_Ligne 16.pdf",
    "line:GST:17-97": "https://tim.reseau-stan.com/tim/data/pdf/2112_Ligne 17.pdf",
    "ine:GST:20-97": "https://tim.reseau-stan.com/tim/data/pdf/2113_Ligne 20.pdf",
    "line:GST:21-97": "https://tim.reseau-stan.com/tim/data/pdf/2118_Ligne 21.pdf",
    "line:GST:22-97": "https://tim.reseau-stan.com/tim/data/pdf/1321_Ligne 22.pdf",
    "line:SUB:23": "https://tim.reseau-stan.com/tim/data/pdf/2115_Ligne 23.pdf",
    "line:SUB:24": "https://tim.reseau-stan.com/tim/data/pdf/1323_Ligne 24.pdf",
    "line:GST:30-97": "https://tim.reseau-stan.com/tim/data/pdf/1324_Ligne 30.pdf",
    "line:GST:31-97": "https://tim.reseau-stan.com/tim/data/pdf/1870_Ligne 31.pdf",
    "line:GST:32-97": "https://tim.reseau-stan.com/tim/data/pdf/1327_Plan -ligne 32-sept 23.pdf",
    "line:GST:33-97": "https://tim.reseau-stan.com/tim/data/pdf/2116_Ligne 33.pdf",
    "line:GST:50-97": "https://tim.reseau-stan.com/tim/data/pdf/2119_Ligne 50.pdf",
    "line:GST:51-97": "https://tim.reseau-stan.com/tim/data/pdf/2027_Ligne 51.pdf",
    "line:GST:52-97": "https://tim.reseau-stan.com/tim/data/pdf/2120_Ligne 52.pdf",
    "line:GST:53-97": "https://tim.reseau-stan.com/tim/data/pdf/2028_Ligne 53.pdf",
    "line:GST:54-97": "https://tim.reseau-stan.com/tim/data/pdf/2121_Ligne 54.pdf",
    "line:GST:55-97": "https://tim.reseau-stan.com/tim/data/pdf/1640_Plan -55 - 2 oct 23.pdf",
    "line:GST:56-97": "https://tim.reseau-stan.com/tim/data/pdf/1333_Ligne 56.pdf",
    "line:GST:57-97": "https://tim.reseau-stan.com/tim/data/pdf/2023_Ligne 57.pdf",
    "line:GST:58-97": "https://tim.reseau-stan.com/tim/data/pdf/2029_Ligne 58.pdf",
    "line:GST:59-97": "https://tim.reseau-stan.com/tim/data/pdf/2122_Ligne 59.pdf",
    "line:GST:60-97": "https://tim.reseau-stan.com/tim/data/pdf/1388_Ligne 60-V2.pdf",
    "line:GST:61-97": "https://tim.reseau-stan.com/tim/data/pdf/2123_Ligne 61.pdf",
    "line:GST:62-97": "https://tim.reseau-stan.com/tim/data/pdf/2124_Ligne 62 - 02.09",
    "line:GST:63-97": "https://tim.reseau-stan.com/tim/data/pdf/2125_Ligne 63.pdf",
    "line:GST:64-97": "https://tim.reseau-stan.com/tim/data/pdf/2126_Ligne 64.pdf",
    "line:GST:65-97": "https://tim.reseau-stan.com/tim/data/pdf/2026_Ligne 65.pdf",
    "line:GST:66-97": "https://tim.reseau-stan.com/tim/data/pdf/2127_Ligne 66.pdf",
    "line:GST:67-97": "https://tim.reseau-stan.com/tim/data/pdf/2128_Ligne 67.pdf",
    "line:GST:41-97": "https://tim.reseau-stan.com/tim/data/pdf/2299_Citadine Nancy.pdf",
    "line:GST:42-97": "https://tim.reseau-stan.com/tim/data/pdf/1484_Citadine Vandoeuvre.pdf"
  });
  let Stan = _Stan;
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$n = {};
  const _hoisted_1$n = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-bus-side",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$d(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$n, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M3,6C1.89,6 1,6.89 1,8V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V8C23,6.89 22.11,6 21,6H3M2.5,7.5H6.5V10H2.5V7.5M8,7.5H12V10H8V7.5M13.5,7.5H17.5V10H13.5V7.5M19,7.5H21.5V13L19,11V7.5M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z" }, null, -1)
    ]));
  }
  const BusIcon = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$d]]);
  const _sfc_main$m = {};
  const _hoisted_1$m = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-chevron-down",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$c(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$m, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }, null, -1)
    ]));
  }
  const ChevronDownIcon = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$c]]);
  const _sfc_main$l = {};
  const _hoisted_1$l = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-chevron-left",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$b(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$l, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" }, null, -1)
    ]));
  }
  const ChevronLeftIcon = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$b]]);
  const _sfc_main$k = {};
  const _hoisted_1$k = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-chevron-right",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$a(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$k, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }, null, -1)
    ]));
  }
  const ChevronRightIcon = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$a]]);
  const _sfc_main$j = {};
  const _hoisted_1$j = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-chevron-up",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$9(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$j, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" }, null, -1)
    ]));
  }
  const ChevronUpIcon = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$9]]);
  const _sfc_main$i = {};
  const _hoisted_1$i = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-close",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$8(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$i, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }, null, -1)
    ]));
  }
  const CloseIcon = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$8]]);
  const _sfc_main$h = {};
  const _hoisted_1$h = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-home",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$7(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$h, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" }, null, -1)
    ]));
  }
  const HomeIcon = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$7]]);
  const _sfc_main$g = {};
  const _hoisted_1$g = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-map",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$6(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$g, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" }, null, -1)
    ]));
  }
  const MapIcon = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$6]]);
  const _sfc_main$f = {};
  const _hoisted_1$f = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-refresh",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$5(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$f, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" }, null, -1)
    ]));
  }
  const RefreshIcon = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$5]]);
  const _sfc_main$e = {};
  const _hoisted_1$e = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-emoticon-sad-outline",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$4(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$e, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z" }, null, -1)
    ]));
  }
  const SadIcon = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$4]]);
  const _sfc_main$d = {};
  const _hoisted_1$d = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-magnify",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$3(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$d, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" }, null, -1)
    ]));
  }
  const SearchIcon = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$3]]);
  const _sfc_main$c = {};
  const _hoisted_1$c = {
    xmlns: "http://www.w3.org/2000/svg",
    id: "mdi-cog",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };
  function _sfc_render$2(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$c, _cache[0] || (_cache[0] = [
      createBaseVNode("path", { d: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" }, null, -1)
    ]));
  }
  const SettingsIcon = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$2]]);
  const _sfc_main$b = {};
  const _hoisted_1$b = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  };
  function _sfc_render$1(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$b, _cache[0] || (_cache[0] = [
      createBaseVNode("path", {
        "fill-rule": "evenodd",
        d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
        "clip-rule": "evenodd"
      }, null, -1)
    ]));
  }
  const StarIcon = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$1]]);
  const _sfc_main$a = {};
  const _hoisted_1$a = {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "stroke-width": "1.5",
    stroke: "currentColor"
  };
  function _sfc_render(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$a, _cache[0] || (_cache[0] = [
      createBaseVNode("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      }, null, -1)
    ]));
  }
  const StarOutlineIcon = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render]]);
  const _hoisted_1$9 = { class: "sticky bottom-0 left-0 w-full max-w-3xl bg-white border rounded-t-xl mx-auto h-16 flex items-center justify-around" };
  const _sfc_main$9 = {
    __name: "AppMenu",
    setup(__props) {
      const router2 = useRouter();
      const navigateTo = (route) => {
        router2.push(route);
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("footer", _hoisted_1$9, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("/favorites"))
          }, [
            createVNode(unref(StarIcon), { class: "size-6" })
          ]),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => navigateTo("/home"))
          }, [
            createVNode(unref(HomeIcon), { class: "size-6" })
          ]),
          createBaseVNode("button", {
            onClick: _cache[2] || (_cache[2] = ($event) => navigateTo("/settings"))
          }, [
            createVNode(unref(SettingsIcon), { class: "size-6" })
          ])
        ]);
      };
    }
  };
  const useFavoritesStore = /* @__PURE__ */ defineStore("favorites", {
    state: () => ({
      favoriteArrets: []
    }),
    actions: {
      addFavorite(arret) {
        if (!this.isFavorite(arret.osmid)) {
          this.favoriteArrets.push({
            ...arret,
            addedAt: /* @__PURE__ */ new Date()
          });
        }
      },
      removeFavorite(arretId) {
        this.favoriteArrets = this.favoriteArrets.filter((arret) => arret.osmid !== arretId);
      },
      toggleFavorite(arret) {
        if (this.isFavorite(arret.osmid)) {
          this.removeFavorite(arret.osmid);
          return false;
        } else {
          this.addFavorite(arret);
          return true;
        }
      }
    },
    getters: {
      isFavorite: (state) => (arretId) => {
        return state.favoriteArrets.some((arret) => arret.osmid === arretId);
      },
      getFavorites: (state) => {
        return state.favoriteArrets;
      }
    },
    persist: {
      enabled: true,
      strategies: [
        { storage: localStorage, paths: ["favoriteArrets"] }
      ]
    }
  });
  const _hoisted_1$8 = ["src"];
  const _hoisted_2$8 = { class: "flex-grow" };
  const _hoisted_3$8 = { class: "font-medium" };
  const _hoisted_4$6 = { class: "text-gray-500" };
  const _hoisted_5$6 = {
    key: 0,
    class: "px-4 py-4 bg-gray-50"
  };
  const _hoisted_6$6 = {
    key: 0,
    class: "py-3"
  };
  const _hoisted_7$6 = { class: "loader-container" };
  const _hoisted_8$6 = { class: "loader-line" };
  const _hoisted_9$6 = { class: "mt-2 text-center text-sm text-gray-600" };
  const _hoisted_10$6 = { key: 1 };
  const _hoisted_11$5 = {
    key: 0,
    class: "text-sm text-gray-500 py-2"
  };
  const _hoisted_12$2 = {
    key: 1,
    class: "space-y-6"
  };
  const _hoisted_13$2 = { class: "font-semibold text-sm text-gray-700 mb-2" };
  const _hoisted_14$2 = { class: "relative h-[30px] ml-[20px]" };
  const _hoisted_15$2 = { class: "absolute top-[7px] left-[-10px] w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center z-10" };
  const _hoisted_16$1 = {
    key: 0,
    class: "absolute top-0 left-[30%] flex flex-col items-center transform -translate-x-1/2"
  };
  const _hoisted_17$1 = {
    key: 1,
    class: "absolute top-0 left-[70%] flex flex-col items-center transform -translate-x-1/2"
  };
  const _sfc_main$8 = {
    __name: "Arret",
    props: {
      arret: {
        type: Object,
        required: true
      },
      color: {
        type: String,
        default: "bg-gray-700"
      },
      passages: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      isSelected: {
        type: Boolean,
        default: false
      },
      isFavorite: {
        type: Boolean,
        default: false
      }
    },
    emits: ["selectArret", "toggleFavorite"],
    setup(__props, { emit: __emit }) {
      const favorites = useFavoritesStore();
      const props = __props;
      const emit2 = __emit;
      const formatPassageTime = (passage) => {
        if (passage.temps_min === 0) {
          return t("arret.passageImediat");
        } else if (passage.temps_min < 60) {
          return `${passage.temps_min} min`;
        } else {
          const hours = Math.floor(passage.temps_min / 60);
          const minutes = passage.temps_min % 60;
          return `${hours}h${minutes < 10 ? "0" + minutes : minutes}`;
        }
      };
      computed(() => {
        var _a;
        return ((_a = props.color) == null ? void 0 : _a.replace("bg-", "border-")) || "border-gray-700";
      });
      const passagesByDirection = computed(() => {
        const grouped = {};
        if (props.passages && props.passages.length > 0) {
          props.passages.forEach((passage) => {
            if (!grouped[passage.direction]) {
              grouped[passage.direction] = [];
            }
            grouped[passage.direction].push(passage);
          });
          Object.keys(grouped).forEach((direction) => {
            grouped[direction].sort((a, b) => a.temps_min - b.temps_min);
            grouped[direction] = grouped[direction].slice(0, 2);
          });
        }
        return grouped;
      });
      const isFavoriteArret = computed(() => {
        return props.isFavorite || favorites.isFavorite(props.arret.osmid);
      });
      const handleToggleFavorite = (e) => {
        e.stopPropagation();
        emit2("toggleFavorite", props.arret);
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("li", {
          key: __props.arret.osmid
        }, [
          createBaseVNode("div", {
            class: "p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("selectArret", __props.arret))
          }, [
            createBaseVNode("img", {
              src: __props.arret.ligne.image,
              class: "size-6 mr-3"
            }, null, 8, _hoisted_1$8),
            createBaseVNode("div", _hoisted_2$8, [
              createBaseVNode("h3", _hoisted_3$8, toDisplayString$1(__props.arret.libelle), 1)
            ]),
            createBaseVNode("button", {
              class: "text-yellow-400 mr-2 p-1",
              onClick: handleToggleFavorite
            }, [
              isFavoriteArret.value ? (openBlock(), createBlock(unref(StarIcon), {
                key: 0,
                class: "size-5"
              })) : (openBlock(), createBlock(unref(StarOutlineIcon), {
                key: 1,
                class: "size-5 text-gray-400"
              }))
            ]),
            createBaseVNode("div", _hoisted_4$6, [
              !__props.isSelected ? (openBlock(), createBlock(unref(ChevronDownIcon), {
                key: 0,
                class: "size-5"
              })) : (openBlock(), createBlock(unref(ChevronUpIcon), {
                key: 1,
                class: "size-5"
              }))
            ])
          ]),
          __props.isSelected ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
            __props.loading ? (openBlock(), createElementBlock("div", _hoisted_6$6, [
              createBaseVNode("div", _hoisted_7$6, [
                createBaseVNode("div", _hoisted_8$6, [
                  createBaseVNode("div", {
                    class: normalizeClass([__props.color, "loader-highlight"])
                  }, null, 2)
                ])
              ]),
              createBaseVNode("p", _hoisted_9$6, toDisplayString$1(unref(t)("arret.loading")), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_10$6, [
              Object.keys(passagesByDirection.value).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_11$5, toDisplayString$1(unref(t)("arret.noPassages")), 1)) : (openBlock(), createElementBlock("div", _hoisted_12$2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(passagesByDirection.value, (passages, direction) => {
                  return openBlock(), createElementBlock("div", {
                    key: direction,
                    class: "py-4 relative"
                  }, [
                    createBaseVNode("div", _hoisted_13$2, toDisplayString$1(direction), 1),
                    createBaseVNode("div", _hoisted_14$2, [
                      createBaseVNode("div", {
                        class: normalizeClass(["absolute top-[15px] left-0 right-[30px] h-1 dotted-line", __props.color])
                      }, null, 2),
                      createBaseVNode("div", _hoisted_15$2, [
                        createBaseVNode("div", {
                          class: normalizeClass(["w-2 h-2 rounded-full", __props.color])
                        }, null, 2)
                      ]),
                      passages.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_16$1, [
                        createVNode(unref(BusIcon), { class: "w-5 h-5" }),
                        createBaseVNode("div", {
                          class: normalizeClass(["px-1.5 py-0.5 bg-white text-xs font-semibold rounded-full shadow-sm", { "text-amber-500": passages[0].temps_theorique }])
                        }, toDisplayString$1(formatPassageTime(passages[0])), 3)
                      ])) : createCommentVNode("", true),
                      passages.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
                        createVNode(unref(BusIcon), { class: "w-5 h-5" }),
                        createBaseVNode("div", {
                          class: normalizeClass(["px-1.5 py-0.5 bg-white text-xs font-semibold rounded-full shadow-sm", { "text-amber-500": passages[1].temps_theorique }])
                        }, toDisplayString$1(formatPassageTime(passages[1])), 3)
                      ])) : createCommentVNode("", true)
                    ])
                  ]);
                }), 128))
              ]))
            ]))
          ])) : createCommentVNode("", true)
        ]);
      };
    }
  };
  const Arret = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a498f2f5"]]);
  const _hoisted_1$7 = {
    key: 0,
    id: "fancy-modal",
    class: "fixed inset-0 z-50 flex items-center justify-center"
  };
  const _hoisted_2$7 = { class: "w-full h-full bg-black/70 relative overflow-auto" };
  const _hoisted_3$7 = {
    id: "modal-content",
    class: "py-[40px] md:px-[40px] w-full h-full flex flex-col"
  };
  const _sfc_main$7 = {
    __name: "FancyModal",
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return __props.show ? (openBlock(), createElementBlock("div", _hoisted_1$7, [
          createBaseVNode("div", _hoisted_2$7, [
            createBaseVNode("div", _hoisted_3$7, [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
              class: "absolute top-0 right-0 text-white bg-black/70 size-[40px] flex items-center justify-center z-10"
            }, [
              createVNode(unref(CloseIcon), { class: "size-6" })
            ])
          ])
        ])) : createCommentVNode("", true);
      };
    }
  };
  const FancyModal = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-8b1ef9f4"]]);
  const _hoisted_1$6 = { class: "custom-dropdown relative" };
  const _hoisted_2$6 = { class: "text-gray-900 text-base" };
  const _hoisted_3$6 = {
    key: 0,
    class: "absolute left-0 right-0 z-50 mt-1 bg-stone-50 shadow-lg max-h-60 text-base overflow-auto border border-gray-500 dropdown-menu rounded-md transition-all duration-200 animate-dropdown"
  };
  const _hoisted_4$5 = { class: "sticky top-0 px-3 py-2 bg-stone-50 border-b border-gray-700" };
  const _hoisted_5$5 = { class: "relative" };
  const _hoisted_6$5 = { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" };
  const _hoisted_7$5 = ["placeholder"];
  const _hoisted_8$5 = ["onClick"];
  const _hoisted_9$5 = ["src", "alt"];
  const _hoisted_10$5 = { class: "text-black text-base truncate" };
  const _hoisted_11$4 = {
    key: 0,
    class: "px-4 py-4 text-center text-gray-500"
  };
  const _sfc_main$6 = {
    __name: "ItemSelector",
    props: {
      items: {
        type: Array,
        required: true
      },
      label: {
        type: String,
        default: null
      }
    },
    emits: ["select"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit2 = __emit;
      const isOpen = ref(false);
      const searchQuery = ref("");
      const searchInput = ref(null);
      const sortedItems = computed(() => {
        return [...props.items].sort((a, b) => {
          return a.numlignepublic.localeCompare(b.numlignepublic);
        });
      });
      const filteredItems = computed(() => {
        if (!searchQuery.value) return sortedItems.value;
        const query = searchQuery.value.toLowerCase();
        return sortedItems.value.filter(
          (item) => item.libelle.toLowerCase().includes(query) || item.numlignepublic.toLowerCase().includes(query)
        );
      });
      const toggleDropdown = () => {
        isOpen.value = !isOpen.value;
        if (isOpen.value) {
          nextTick(() => {
            var _a;
            (_a = searchInput.value) == null ? void 0 : _a.focus();
          });
        } else {
          searchQuery.value = "";
        }
      };
      const selectItem = (item) => {
        emit2("select", item);
        isOpen.value = false;
        searchQuery.value = "";
      };
      const handleClickOutside = (event) => {
        if (!event.target.closest(".custom-dropdown")) {
          isOpen.value = false;
          searchQuery.value = "";
        }
      };
      const preventZoom = (event) => {
        var _a;
        event.preventDefault();
        (_a = searchInput.value) == null ? void 0 : _a.focus();
      };
      return (_ctx, _cache) => {
        const _directive_click_outside = resolveDirective("click-outside");
        return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$6, [
          createBaseVNode("button", {
            type: "button",
            onClick: toggleDropdown,
            class: "w-full bg-stone-50 border border-gray-600 rounded-md px-4 py-3 text-white flex items-center justify-between transition-all duration-200 hover:bg-stone-100"
          }, [
            createBaseVNode("span", _hoisted_2$6, toDisplayString$1(props.label || "Sélectionner une ligne"), 1),
            createVNode(unref(ChevronDownIcon), {
              class: normalizeClass(["size-5 text-gray-500 transition-transform duration-200", { "transform rotate-180": isOpen.value }])
            }, null, 8, ["class"])
          ]),
          isOpen.value ? (openBlock(), createElementBlock("div", _hoisted_3$6, [
            createBaseVNode("div", _hoisted_4$5, [
              createBaseVNode("div", _hoisted_5$5, [
                createBaseVNode("div", _hoisted_6$5, [
                  createVNode(unref(SearchIcon), { class: "size-5 text-gray-400" })
                ]),
                withDirectives(createBaseVNode("input", {
                  ref_key: "searchInput",
                  ref: searchInput,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                  type: "text",
                  autocomplete: "off",
                  autocorrect: "off",
                  autocapitalize: "off",
                  spellcheck: "false",
                  class: "w-full pl-10 pr-3 py-2.5 bg-stone-200 border border-gray-600 rounded-md text-base text-black font-normal",
                  placeholder: unref(t)("ligne.search"),
                  onClick: withModifiers(preventZoom, ["stop"]),
                  onTouchstart: withModifiers(preventZoom, ["stop"])
                }, null, 40, _hoisted_7$5), [
                  [vModelText, searchQuery.value]
                ])
              ])
            ]),
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredItems.value, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.id,
                onClick: ($event) => selectItem(item),
                class: "flex items-center px-4 py-3 cursor-pointer hover:bg-stone-300 transition-colors duration-150"
              }, [
                createBaseVNode("img", {
                  src: item.image,
                  alt: item.libelle,
                  class: "w-8 h-8 mr-3 object-contain"
                }, null, 8, _hoisted_9$5),
                createBaseVNode("span", _hoisted_10$5, toDisplayString$1(item.libelle), 1)
              ], 8, _hoisted_8$5);
            }), 128)),
            filteredItems.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_11$4, toDisplayString$1(unref(t)("ligne.notFound")), 1)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])), [
          [_directive_click_outside, handleClickOutside]
        ]);
      };
    }
  };
  const ItemSelector = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-4e68b0a7"]]);
  const getColor = (ligne) => {
    if (!ligne || !ligne.numlignepublic) return "bg-gray-500";
    if (ligne.numlignepublic.startsWith("T")) {
      return "bg-gradient-to-r from-red-500 to-red-600";
    } else if (ligne.numlignepublic === "Corol") {
      return "bg-gradient-to-r from-purple-500 to-purple-600";
    } else if (ligne.libelle.includes("Express") || ligne.numlignepublic === "Brabois Express") {
      return "bg-gradient-to-r from-blue-500 to-blue-600";
    } else if (ligne.numlignepublic.startsWith("Citadine")) {
      return "bg-gradient-to-r from-green-500 to-green-600";
    } else if (!isNaN(ligne.numlignepublic)) {
      return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    } else {
      return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };
  const _hoisted_1$5 = { class: "flex items-center justify-between" };
  const _hoisted_2$5 = { class: "text-white font-bold text-lg" };
  const _hoisted_3$5 = { class: "h-6 w-6 flex items-center justify-center rounded-full bg-white bg-opacity-20" };
  const _hoisted_4$4 = { class: "px-4 py-4" };
  const _hoisted_5$4 = { class: "flex items-center" };
  const _hoisted_6$4 = ["src"];
  const _hoisted_7$4 = { class: "flex-1" };
  const _hoisted_8$4 = { class: "font-medium text-gray-900 line-clamp-1" };
  const _hoisted_9$4 = { class: "px-4 py-3 bg-gray-50 flex items-center justify-between" };
  const _hoisted_10$4 = { class: "text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-200 flex items-center" };
  const _sfc_main$5 = {
    __name: "Ligne",
    props: {
      ligne: {
        type: Object,
        required: true
      }
    },
    emits: ["lineSelected"],
    setup(__props, { emit: __emit }) {
      const emit2 = __emit;
      const goToLineDetail = (ligne) => {
        emit2("lineSelected", ligne);
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          key: __props.ligne.id,
          class: "line-card relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white",
          onClick: _cache[0] || (_cache[0] = ($event) => goToLineDetail(__props.ligne))
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["px-4 py-2", unref(getColor)(__props.ligne)])
          }, [
            createBaseVNode("div", _hoisted_1$5, [
              createBaseVNode("span", _hoisted_2$5, toDisplayString$1(__props.ligne.numlignepublic), 1),
              createBaseVNode("div", _hoisted_3$5, [
                createVNode(unref(BusIcon), { class: "size-4 text-white" })
              ])
            ])
          ], 2),
          createBaseVNode("div", _hoisted_4$4, [
            createBaseVNode("div", _hoisted_5$4, [
              createBaseVNode("img", {
                src: __props.ligne.image,
                alt: "Ligne Icon",
                class: "w-12 h-12 object-contain mr-3 flex-shrink-0"
              }, null, 8, _hoisted_6$4),
              createBaseVNode("div", _hoisted_7$4, [
                createBaseVNode("p", _hoisted_8$4, toDisplayString$1(__props.ligne.libelle), 1)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_9$4, [
            createBaseVNode("span", _hoisted_10$4, toDisplayString$1(unref(t)("ligne.detail")), 1),
            createVNode(unref(ChevronRightIcon), { class: "size-5 text-blue-600" })
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-opacity duration-300" }, null, -1))
        ]);
      };
    }
  };
  const Ligne = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-59d90450"]]);
  const _hoisted_1$4 = { class: "flex justify-center items-center min-h-screen" };
  const _hoisted_2$4 = { class: "loader-container" };
  const _hoisted_3$4 = { class: "loader-line" };
  const _sfc_main$4 = {
    __name: "LineLoader",
    props: {
      color: {
        type: String,
        default: "bg-blue-600"
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$4, [
            createBaseVNode("div", _hoisted_3$4, [
              createBaseVNode("div", {
                class: normalizeClass([__props.color, "loader-highlight"])
              }, null, 2)
            ])
          ])
        ]);
      };
    }
  };
  const LineLoader = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-eae6b13f"]]);
  const _hoisted_1$3 = { class: "min-h-screen bg-gray-100" };
  const _hoisted_2$3 = { class: "sticky top-0 z-20 shadow-md bg-white py-3 px-4 border-t" };
  const _hoisted_3$3 = { class: "pl-10 max-w-7xl mx-auto relative" };
  const _hoisted_4$3 = {
    key: 1,
    class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
  };
  const _hoisted_5$3 = {
    id: "lignes",
    class: "space-y-16"
  };
  const _hoisted_6$3 = { class: "category-header mb-6 relative" };
  const _hoisted_7$3 = { class: "text-2xl font-bold text-gray-800 inline-block pb-2 border-b-4 border-blue-500" };
  const _hoisted_8$3 = { class: "lines-container" };
  const _hoisted_9$3 = { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" };
  const _hoisted_10$3 = {
    key: 0,
    class: "text-center py-16"
  };
  const _hoisted_11$3 = { class: "text-gray-500 text-lg" };
  const _sfc_main$3 = {
    __name: "HomeView",
    setup(__props) {
      const loading = ref(true);
      const lignes = ref([]);
      const router2 = useRouter();
      ref(false);
      ref(false);
      onMounted(async () => {
        await loadData();
      });
      const loadData = async (forceRefresh = false) => {
        loading.value = true;
        try {
          lignes.value = await Stan.getLignes(forceRefresh);
        } catch (error) {
          console.error("Error loading lignes:", error);
        } finally {
          loading.value = false;
        }
      };
      const categorizedLignes = computed(() => {
        const categories = {
          "Tempo": [],
          "Corol": [],
          "Express": [],
          "Standard": [],
          "Citadine": [],
          "Autres": []
        };
        lignes.value.forEach((ligne) => {
          if (ligne.numlignepublic.startsWith("T")) {
            categories["Tempo"].push(ligne);
          } else if (ligne.numlignepublic === "Corol") {
            categories["Corol"].push(ligne);
          } else if (ligne.libelle.includes("Express") || ligne.numlignepublic === "Brabois Express") {
            categories["Express"].push(ligne);
          } else if (ligne.numlignepublic.startsWith("Citadine")) {
            categories["Citadine"].push(ligne);
          } else if (!isNaN(ligne.numlignepublic)) {
            categories["Standard"].push(ligne);
          } else {
            categories["Autres"].push(ligne);
          }
        });
        categories["Standard"].sort((a, b) => Number(a.numlignepublic) - Number(b.numlignepublic));
        return categories;
      });
      const goToLigneDetail = (ligne) => {
        router2.push(`/ligne/${ligne.osmid}`);
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(Fragment, null, [
          createBaseVNode("main", _hoisted_1$3, [
            createBaseVNode("header", _hoisted_2$3, [
              createBaseVNode("div", _hoisted_3$3, [
                createVNode(unref(SearchIcon), { class: "h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }),
                createVNode(unref(ItemSelector), {
                  class: "w-full shadow-sm z-10",
                  items: lignes.value,
                  label: unref(t)("home.search"),
                  onSelect: goToLigneDetail
                }, null, 8, ["items", "label"])
              ])
            ]),
            loading.value ? (openBlock(), createBlock(unref(LineLoader), { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_4$3, [
              createBaseVNode("div", _hoisted_5$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(categorizedLignes.value, (lines, category) => {
                  return withDirectives((openBlock(), createElementBlock("div", {
                    key: category,
                    class: "category-section"
                  }, [
                    createBaseVNode("div", _hoisted_6$3, [
                      createBaseVNode("h2", _hoisted_7$3, toDisplayString$1(category), 1),
                      _cache[0] || (_cache[0] = createBaseVNode("div", { class: "absolute bottom-0 left-0 w-full h-px bg-gray-200" }, null, -1))
                    ]),
                    createBaseVNode("div", _hoisted_8$3, [
                      createBaseVNode("div", _hoisted_9$3, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(lines, (ligne) => {
                          return openBlock(), createBlock(unref(Ligne), {
                            key: ligne.id,
                            ligne,
                            onLineSelected: ($event) => goToLigneDetail(ligne),
                            class: "transform transition-all duration-300 hover:-translate-y-2"
                          }, null, 8, ["ligne", "onLineSelected"]);
                        }), 128))
                      ])
                    ])
                  ])), [
                    [vShow, lines.length > 0]
                  ]);
                }), 128)),
                Object.values(categorizedLignes.value).every((arr) => arr.length === 0) ? (openBlock(), createElementBlock("div", _hoisted_10$3, [
                  createVNode(unref(SadIcon), { class: "h-16 w-16 mx-auto text-gray-400 mb-4" }),
                  createBaseVNode("p", _hoisted_11$3, toDisplayString$1(unref(t)("home.notFound")), 1)
                ])) : createCommentVNode("", true)
              ])
            ]))
          ]),
          createVNode(unref(_sfc_main$9))
        ], 64);
      };
    }
  };
  const HomeView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c294407f"]]);
  const HomeView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: HomeView
  }, Symbol.toStringTag, { value: "Module" }));
  const _hoisted_1$2 = { class: "min-h-screen bg-gray-100" };
  const _hoisted_2$2 = {
    key: 1,
    class: "pb-20"
  };
  const _hoisted_3$2 = { class: "flex items-center justify-between h-20 px-4" };
  const _hoisted_4$2 = { class: "text-xl font-bold text-white" };
  const _hoisted_5$2 = ["disabled"];
  const _hoisted_6$2 = ["disabled"];
  const _hoisted_7$2 = { class: "container mx-auto px-4 mt-4" };
  const _hoisted_8$2 = { class: "bg-white rounded-lg shadow-md p-4 flex items-center" };
  const _hoisted_9$2 = ["src"];
  const _hoisted_10$2 = { class: "font-bold text-lg" };
  const _hoisted_11$2 = { class: "container mx-auto px-4 mt-6" };
  const _hoisted_12$1 = { class: "text-xl font-semibold mb-3" };
  const _hoisted_13$1 = { class: "bg-white rounded-lg shadow-md" };
  const _hoisted_14$1 = { class: "divide-y divide-gray-200" };
  const _hoisted_15$1 = ["src"];
  const _sfc_main$2 = {
    __name: "LigneDetailView",
    setup(__props) {
      const route = useRoute();
      const router2 = useRouter();
      const favoritesStore = useFavoritesStore();
      const showFancyModal = ref(false);
      const arrets = ref([]);
      const ligne = ref(null);
      const loading = ref(true);
      const refreshing = ref(false);
      const selectedArret = ref(null);
      const arretPassages = ref({});
      const loadingArretId = ref(null);
      const autoRefreshInterval = ref(null);
      onMounted(async () => {
        await loadData();
      });
      onBeforeUnmount(() => {
        clearAutoRefresh();
      });
      const clearAutoRefresh = () => {
        if (autoRefreshInterval.value) {
          clearInterval(autoRefreshInterval.value);
          autoRefreshInterval.value = null;
        }
      };
      const loadData = async (forceRefresh = false) => {
        loading.value = true;
        try {
          ligne.value = await Stan.getLigne(route.params.osmid_ligne, forceRefresh);
          arrets.value = await Stan.getArrets(ligne.value, forceRefresh);
        } catch (error) {
          router2.push("/home");
        } finally {
          loading.value = false;
        }
      };
      const refreshData = async () => {
        refreshing.value = true;
        await loadData(true);
        setTimeout(() => {
          refreshing.value = false;
        }, 1e3);
      };
      const hasSoonArrival = (passages) => {
        return passages == null ? void 0 : passages.some((passage) => passage.temps_min < 5);
      };
      const updateSelectedArretPassages = async () => {
        if (!selectedArret.value || loadingArretId.value) return;
        try {
          const arret = arrets.value.find((a) => a.osmid === selectedArret.value);
          if (arret) {
            const passages = await Stan.getProchainsPassages(arret);
            arretPassages.value = { ...arretPassages.value, [selectedArret.value]: passages };
            setupAutoRefreshIfNeeded(passages);
          }
        } catch (error) {
          console.error("Error updating passages:", error);
        }
      };
      const setupAutoRefreshIfNeeded = (passages) => {
        clearAutoRefresh();
        if (hasSoonArrival(passages)) {
          autoRefreshInterval.value = setInterval(updateSelectedArretPassages, 6e4);
        } else if (passages && passages.length > 0) {
          const closestBusTime = Math.min(...passages.map((p2) => p2.temps_min));
          if (closestBusTime > 5) {
            const timeUntilRefresh = (closestBusTime - 5) * 60 * 1e3;
            autoRefreshInterval.value = setTimeout(() => {
              autoRefreshInterval.value = setInterval(updateSelectedArretPassages, 6e4);
              updateSelectedArretPassages();
            }, timeUntilRefresh);
          }
        }
      };
      const handleSelectArret = async (arret) => {
        if (selectedArret.value === arret.osmid) {
          selectedArret.value = null;
          clearAutoRefresh();
          return;
        }
        clearAutoRefresh();
        selectedArret.value = arret.osmid;
        loadingArretId.value = arret.osmid;
        try {
          const passages = await Stan.getProchainsPassages(arret);
          arretPassages.value = { ...arretPassages.value, [arret.osmid]: passages };
          setupAutoRefreshIfNeeded(passages);
        } catch (error) {
          console.error("Error loading passages:", error);
        } finally {
          loadingArretId.value = null;
        }
      };
      const getPassagesForArret = (arret) => {
        return selectedArret.value === arret.osmid ? arretPassages.value[arret.osmid] || [] : [];
      };
      const isArretLoading = (arret) => {
        return loadingArretId.value === arret.osmid;
      };
      const handleToggleFavorite = (arret) => {
        favoritesStore.toggleFavorite(arret);
      };
      watch(() => route.path, () => {
        clearAutoRefresh();
      });
      return (_ctx, _cache) => {
        var _a, _b;
        return openBlock(), createElementBlock(Fragment, null, [
          createBaseVNode("div", _hoisted_1$2, [
            loading.value ? (openBlock(), createBlock(unref(LineLoader), { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_2$2, [
              createBaseVNode("header", {
                class: normalizeClass([unref(getColor)(ligne.value), "sticky top-0 z-10 shadow-md"])
              }, [
                createBaseVNode("div", _hoisted_3$2, [
                  createBaseVNode("button", {
                    onClick: _cache[0] || (_cache[0] = ($event) => unref(router2).back()),
                    class: "text-white p-2"
                  }, [
                    createVNode(unref(ChevronLeftIcon), { class: "size-6" })
                  ]),
                  createBaseVNode("h1", _hoisted_4$2, toDisplayString$1(unref(t)("ligne.title")) + " " + toDisplayString$1(ligne.value.numlignepublic), 1),
                  createBaseVNode("div", null, [
                    createBaseVNode("button", {
                      onClick: refreshData,
                      class: "text-white p-2",
                      disabled: refreshing.value
                    }, [
                      createVNode(unref(RefreshIcon), {
                        class: normalizeClass([{ "animate-spin": refreshing.value }, "size-6"])
                      }, null, 8, ["class"])
                    ], 8, _hoisted_5$2),
                    createBaseVNode("button", {
                      onClick: _cache[1] || (_cache[1] = ($event) => showFancyModal.value = true),
                      class: "text-white p-2",
                      disabled: !ligne.value
                    }, [
                      createVNode(unref(MapIcon), { class: "size-6" })
                    ], 8, _hoisted_6$2)
                  ])
                ])
              ], 2),
              createBaseVNode("div", _hoisted_7$2, [
                createBaseVNode("div", _hoisted_8$2, [
                  ((_a = ligne.value) == null ? void 0 : _a.image) ? (openBlock(), createElementBlock("img", {
                    key: 0,
                    src: ligne.value.image,
                    alt: "Line icon",
                    class: "h-12 mr-4"
                  }, null, 8, _hoisted_9$2)) : createCommentVNode("", true),
                  createBaseVNode("div", null, [
                    createBaseVNode("h2", _hoisted_10$2, toDisplayString$1((_b = ligne.value) == null ? void 0 : _b.libelle), 1)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_11$2, [
                createBaseVNode("h2", _hoisted_12$1, toDisplayString$1(unref(t)("arret.title")), 1),
                createBaseVNode("div", _hoisted_13$1, [
                  createBaseVNode("ul", _hoisted_14$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(arrets.value, (arret, index2) => {
                      return openBlock(), createBlock(unref(Arret), {
                        key: arret.osmid,
                        color: unref(getColor)(ligne.value),
                        arret,
                        index: index2,
                        passages: getPassagesForArret(arret),
                        loading: isArretLoading(arret),
                        "is-selected": selectedArret.value === arret.osmid,
                        onSelectArret: handleSelectArret,
                        onToggleFavorite: handleToggleFavorite
                      }, null, 8, ["color", "arret", "index", "passages", "loading", "is-selected"]);
                    }), 128))
                  ])
                ])
              ])
            ]))
          ]),
          createVNode(unref(_sfc_main$9)),
          createVNode(unref(FancyModal), {
            show: showFancyModal.value,
            onClose: _cache[2] || (_cache[2] = ($event) => showFancyModal.value = false)
          }, {
            default: withCtx(() => [
              ligne.value ? (openBlock(), createElementBlock("iframe", {
                key: 0,
                src: unref(Stan).getPlan(ligne.value),
                class: "size-full",
                frameborder: "0",
                allowfullscreen: ""
              }, null, 8, _hoisted_15$1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["show"])
        ], 64);
      };
    }
  };
  const LigneDetailView = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: _sfc_main$2
  }, Symbol.toStringTag, { value: "Module" }));
  const _hoisted_1$1 = { class: "min-h-screen bg-gray-100" };
  const _hoisted_2$1 = {
    key: 1,
    class: "pb-20"
  };
  const _hoisted_3$1 = { class: "sticky top-0 z-10 shadow-md bg-gray-700" };
  const _hoisted_4$1 = { class: "flex items-center justify-center h-20 px-4" };
  const _hoisted_5$1 = { class: "text-xl font-bold text-white" };
  const _hoisted_6$1 = { class: "container mx-auto px-4 mt-6" };
  const _hoisted_7$1 = {
    key: 0,
    class: "bg-white rounded-lg shadow-md p-8 text-center"
  };
  const _hoisted_8$1 = { class: "text-gray-500" };
  const _hoisted_9$1 = { class: "text-gray-500 mt-2" };
  const _hoisted_10$1 = {
    key: 1,
    class: "bg-white rounded-lg shadow-md"
  };
  const _hoisted_11$1 = { class: "divide-y divide-gray-200" };
  const _sfc_main$1 = {
    __name: "FavoritesView",
    setup(__props) {
      useRouter();
      const favorites = useFavoritesStore();
      const favoriteArrets = computed(() => favorites.getFavorites);
      const loading = ref(true);
      const selectedArret = ref(null);
      const arretPassages = ref({});
      const loadingArretId = ref(null);
      onMounted(async () => {
        loading.value = false;
      });
      const handleSelectArret = async (arret) => {
        if (selectedArret.value === arret.osmid) {
          selectedArret.value = null;
          return;
        }
        selectedArret.value = arret.osmid;
        loadingArretId.value = arret.osmid;
        try {
          const passages = await Stan.getProchainsPassages(arret);
          arretPassages.value = { ...arretPassages.value, [arret.osmid]: passages };
        } catch (error) {
          console.error("Error loading passages:", error);
        } finally {
          loadingArretId.value = null;
        }
      };
      const getPassagesForArret = (arret) => {
        return selectedArret.value === arret.osmid ? arretPassages.value[arret.osmid] || [] : [];
      };
      const isArretLoading = (arret) => {
        return loadingArretId.value === arret.osmid;
      };
      const handleRemoveFavorite = (arretId) => {
        favorites.removeFavorite(arretId);
        if (selectedArret.value === arretId) {
          selectedArret.value = null;
        }
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(Fragment, null, [
          createBaseVNode("div", _hoisted_1$1, [
            loading.value ? (openBlock(), createBlock(unref(LineLoader), { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_2$1, [
              createBaseVNode("header", _hoisted_3$1, [
                createBaseVNode("div", _hoisted_4$1, [
                  createBaseVNode("h1", _hoisted_5$1, toDisplayString$1(unref(t)("favorites.title")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_6$1, [
                favoriteArrets.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
                  createBaseVNode("p", _hoisted_8$1, toDisplayString$1(unref(t)("favorites.empty")), 1),
                  createBaseVNode("p", _hoisted_9$1, toDisplayString$1(unref(t)("favorites.emptyDescription")), 1)
                ])) : (openBlock(), createElementBlock("div", _hoisted_10$1, [
                  createBaseVNode("ul", _hoisted_11$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(favoriteArrets.value, (arret, index2) => {
                      return openBlock(), createBlock(unref(Arret), {
                        key: arret.osmid,
                        color: unref(getColor)(arret.ligne),
                        arret,
                        index: index2,
                        passages: getPassagesForArret(arret),
                        loading: isArretLoading(arret),
                        "is-selected": selectedArret.value === arret.osmid,
                        "is-favorite": true,
                        onSelectArret: handleSelectArret,
                        onToggleFavorite: ($event) => handleRemoveFavorite(arret.osmid)
                      }, null, 8, ["color", "arret", "index", "passages", "loading", "is-selected", "onToggleFavorite"]);
                    }), 128))
                  ])
                ]))
              ])
            ]))
          ]),
          createVNode(unref(_sfc_main$9))
        ], 64);
      };
    }
  };
  const FavoritesView = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: _sfc_main$1
  }, Symbol.toStringTag, { value: "Module" }));
  const _hoisted_1 = { class: "min-h-screen bg-gray-100 pb-20" };
  const _hoisted_2 = { class: "sticky top-0 z-10 shadow-md bg-gray-700" };
  const _hoisted_3 = { class: "flex items-center justify-center h-20 px-4" };
  const _hoisted_4 = { class: "text-xl font-bold text-white" };
  const _hoisted_5 = { class: "container mx-auto px-4 mt-6" };
  const _hoisted_6 = { class: "bg-white rounded-lg shadow-md p-6 mb-6" };
  const _hoisted_7 = { class: "text-xl font-semibold mb-4" };
  const _hoisted_8 = { class: "mb-4" };
  const _hoisted_9 = { class: "text-gray-700 font-medium mb-2" };
  const _hoisted_10 = { class: "flex gap-3" };
  const _hoisted_11 = { class: "text-gray-700 font-medium mb-2" };
  const _hoisted_12 = { class: "flex gap-3" };
  const _hoisted_13 = { class: "bg-white rounded-lg shadow-md p-6 mb-6" };
  const _hoisted_14 = { class: "text-xl font-semibold mb-4" };
  const _hoisted_15 = { class: "text-gray-600 mb-4" };
  const _hoisted_16 = { class: "flex flex-col" };
  const _hoisted_17 = ["disabled"];
  const _hoisted_18 = { key: 0 };
  const _hoisted_19 = { key: 1 };
  const _hoisted_20 = {
    key: 0,
    class: "mt-4 bg-green-100 text-green-700 p-3 rounded-md flex items-center"
  };
  const _hoisted_21 = { class: "bg-white rounded-lg shadow-md p-6 mb-6" };
  const _hoisted_22 = { class: "text-xl font-semibold mb-4" };
  const _hoisted_23 = { class: "text-gray-600" };
  const _hoisted_24 = { class: "mb-2" };
  const _hoisted_25 = { class: "mb-2" };
  const _hoisted_26 = { class: "mb-2" };
  const _hoisted_27 = { class: "bg-white rounded-lg shadow-md p-6 mb-6" };
  const _hoisted_28 = { class: "text-xl font-semibold mb-4" };
  const _hoisted_29 = { class: "text-gray-600 text-sm" };
  const _hoisted_30 = { class: "mb-2" };
  const _hoisted_31 = { class: "mb-2" };
  const _hoisted_32 = { class: "mb-2" };
  const _hoisted_33 = { class: "mb-2" };
  const _hoisted_34 = { class: "mb-2" };
  const _hoisted_35 = { class: "bg-white rounded-lg shadow-md p-6" };
  const _hoisted_36 = { class: "text-xl font-semibold mb-4" };
  const _hoisted_37 = { class: "text-gray-600 mb-4" };
  const _hoisted_38 = { class: "list-disc pl-5 text-gray-600 mb-2" };
  const _hoisted_39 = { class: "mb-2" };
  const _hoisted_40 = { class: "mb-2" };
  const _hoisted_41 = { class: "mb-2" };
  const _sfc_main = {
    __name: "SettingsView",
    setup(__props) {
      useRouter();
      const { t: t2, locale } = useI18n();
      const cacheCleared = ref(false);
      const appVersion = ref("1.0.2");
      const clearingCache = ref(false);
      const preferences = ref({
        language: "fr",
        home: "accueil"
      });
      onMounted(() => {
        const savedPreferences = localStorage.getItem("preferences");
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          preferences.value = {
            language: parsed.language || "fr",
            home: parsed.home || "accueil"
          };
        }
      });
      const clearCache = async () => {
        clearingCache.value = true;
        await new Promise((resolve2) => setTimeout(resolve2, 500));
        Stan.clearCache();
        cacheCleared.value = true;
        clearingCache.value = false;
        setTimeout(() => {
          cacheCleared.value = false;
        }, 3e3);
      };
      const savePreferences = () => {
        localStorage.setItem("preferences", JSON.stringify(preferences.value));
        locale.value = preferences.value.language;
      };
      const changeLanguage = (lang) => {
        preferences.value.language = lang;
        savePreferences();
      };
      const changeHomePage = (page) => {
        preferences.value.home = page;
        savePreferences();
      };
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock(Fragment, null, [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("header", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("h1", _hoisted_4, toDisplayString$1(unref(t2)("settings.title")), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("h2", _hoisted_7, toDisplayString$1(unref(t2)("settings.preferences.title")), 1),
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("h3", _hoisted_9, toDisplayString$1(unref(t2)("settings.preferences.language")), 1),
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("button", {
                      onClick: _cache[0] || (_cache[0] = ($event) => changeLanguage("fr")),
                      class: normalizeClass(["flex-1 py-2 px-4 rounded-md transition duration-200", preferences.value.language === "fr" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"])
                    }, " Français ", 2),
                    createBaseVNode("button", {
                      onClick: _cache[1] || (_cache[1] = ($event) => changeLanguage("en")),
                      class: normalizeClass(["flex-1 py-2 px-4 rounded-md transition duration-200", preferences.value.language === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"])
                    }, " English ", 2)
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("h3", _hoisted_11, toDisplayString$1(unref(t2)("settings.preferences.homePage")), 1),
                  createBaseVNode("div", _hoisted_12, [
                    createBaseVNode("button", {
                      onClick: _cache[2] || (_cache[2] = ($event) => changeHomePage("accueil")),
                      class: normalizeClass(["flex-1 py-2 px-4 rounded-md transition duration-200", preferences.value.home === "accueil" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"])
                    }, toDisplayString$1(unref(t2)("settings.preferences.homeOptions.home")), 3),
                    createBaseVNode("button", {
                      onClick: _cache[3] || (_cache[3] = ($event) => changeHomePage("favorites")),
                      class: normalizeClass(["flex-1 py-2 px-4 rounded-md transition duration-200", preferences.value.home === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"])
                    }, toDisplayString$1(unref(t2)("settings.preferences.homeOptions.favorites")), 3)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("h2", _hoisted_14, toDisplayString$1(unref(t2)("settings.cache.title")), 1),
                createBaseVNode("p", _hoisted_15, toDisplayString$1(unref(t2)("settings.cache.description")), 1),
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("button", {
                    onClick: clearCache,
                    disabled: clearingCache.value,
                    class: normalizeClass(["bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200", { "opacity-70 cursor-not-allowed": clearingCache.value }])
                  }, [
                    clearingCache.value ? (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString$1(unref(t2)("settings.cache.clearing")), 1)) : (openBlock(), createElementBlock("span", _hoisted_19, toDisplayString$1(unref(t2)("settings.cache.clearButton")), 1))
                  ], 10, _hoisted_17),
                  cacheCleared.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
                    _cache[4] || (_cache[4] = createBaseVNode("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-5 w-5 mr-2",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)),
                    createTextVNode(" " + toDisplayString$1(unref(t2)("settings.cache.cleared")), 1)
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("h2", _hoisted_22, toDisplayString$1(unref(t2)("settings.about.title")), 1),
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("p", _hoisted_24, toDisplayString$1(unref(t2)("settings.about.version")) + ": " + toDisplayString$1(appVersion.value), 1),
                  createBaseVNode("p", _hoisted_25, toDisplayString$1(unref(t2)("settings.about.description")), 1),
                  createBaseVNode("p", _hoisted_26, [
                    createTextVNode(toDisplayString$1(unref(t2)("settings.about.dataSource")) + " ", 1),
                    _cache[5] || (_cache[5] = createBaseVNode("a", {
                      href: "https://reseau-stan.com",
                      class: "text-blue-500 hover:underline",
                      target: "_blank"
                    }, "reseau-stan.com", -1))
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_27, [
                createBaseVNode("h2", _hoisted_28, toDisplayString$1(unref(t2)("settings.legal.title")), 1),
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("p", _hoisted_30, [
                    createBaseVNode("strong", null, toDisplayString$1(unref(t2)("settings.legal.copyright")), 1),
                    createTextVNode(" : " + toDisplayString$1(unref(t2)("settings.legal.copyrightText")), 1)
                  ]),
                  createBaseVNode("p", _hoisted_31, [
                    createBaseVNode("strong", null, toDisplayString$1(unref(t2)("settings.legal.reproduction")), 1),
                    createTextVNode(" : " + toDisplayString$1(unref(t2)("settings.legal.reproductionText")), 1)
                  ]),
                  createBaseVNode("p", _hoisted_32, [
                    createBaseVNode("strong", null, toDisplayString$1(unref(t2)("settings.legal.liability")), 1),
                    createTextVNode(" : " + toDisplayString$1(unref(t2)("settings.legal.liabilityText")), 1)
                  ]),
                  createBaseVNode("p", _hoisted_33, [
                    createBaseVNode("strong", null, toDisplayString$1(unref(t2)("settings.legal.externalLinks")), 1),
                    createTextVNode(" : " + toDisplayString$1(unref(t2)("settings.legal.externalLinksText")), 1)
                  ]),
                  createBaseVNode("p", _hoisted_34, toDisplayString$1(unref(t2)("settings.legal.disclaimer")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_35, [
                createBaseVNode("h2", _hoisted_36, toDisplayString$1(unref(t2)("settings.support.title")), 1),
                createBaseVNode("p", _hoisted_37, toDisplayString$1(unref(t2)("settings.support.description")), 1),
                createBaseVNode("ul", _hoisted_38, [
                  createBaseVNode("li", _hoisted_39, toDisplayString$1(unref(t2)("settings.support.actions.clearCache")), 1),
                  createBaseVNode("li", _hoisted_40, toDisplayString$1(unref(t2)("settings.support.actions.refresh")), 1),
                  createBaseVNode("li", _hoisted_41, toDisplayString$1(unref(t2)("settings.support.actions.checkConnection")), 1)
                ])
              ])
            ])
          ]),
          createVNode(unref(_sfc_main$9))
        ], 64);
      };
    }
  };
  const SettingsView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31ba9430"]]);
  const SettingsView$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: SettingsView
  }, Symbol.toStringTag, { value: "Module" }));
})();
