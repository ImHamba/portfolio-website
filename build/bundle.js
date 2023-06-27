
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function stop_propagation(fn) {
        return function (event) {
            event.stopPropagation();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { ownerNode } = info.stylesheet;
                // there is no ownerNode if it runs on jsdom.
                if (ownerNode)
                    detach(ownerNode);
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        const options = { direction: 'in' };
        let config = fn(node, params, options);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config(options);
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        const options = { direction: 'out' };
        let config = fn(node, params, options);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config(options);
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        const options = { direction: 'both' };
        let config = fn(node, params, options);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config(options);
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\lib\components\generic\PageSegment.svelte generated by Svelte v3.59.1 */

    const file$l = "src\\lib\\components\\generic\\PageSegment.svelte";

    function create_fragment$n(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "panel svelte-1apkeaa");
    			attr_dev(div, "id", /*id*/ ctx[0]);
    			add_location(div, file$l, 4, 0, 43);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(div, "id", /*id*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PageSegment', slots, ['default']);
    	let { id } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console.warn("<PageSegment> was created without expected prop 'id'");
    		}
    	});

    	const writable_props = ['id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PageSegment> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ id });

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, $$scope, slots];
    }

    class PageSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PageSegment",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get id() {
    		throw new Error("<PageSegment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<PageSegment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const rotate = (x, y, deg) => {
        const rad = deg * (Math.PI / 180);
        const newX = x * Math.cos(rad) - y * Math.sin(rad);
        const newY = x * Math.sin(rad) + y * Math.cos(rad);
        return { x: newX, y: newY };
    };

    const translate = (x, y, xshift, yshift) => {
        return { x: x + xshift, y: y + yshift };
    };

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    /* src\lib\components\app\Waves.svelte generated by Svelte v3.59.1 */
    const file$k = "src\\lib\\components\\app\\Waves.svelte";

    function create_fragment$m(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let canvas_1;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowresize*/ ctx[13]);
    	add_render_callback(/*onwindowscroll*/ ctx[14]);

    	const block = {
    		c: function create() {
    			canvas_1 = element("canvas");
    			add_location(canvas_1, file$k, 220, 0, 7355);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, canvas_1, anchor);
    			/*canvas_1_binding*/ ctx[15](canvas_1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "resize", /*onwindowresize*/ ctx[13]),
    					listen_dev(window, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[14]();
    					})
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scroll*/ 8 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*scroll*/ ctx[3]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(canvas_1);
    			/*canvas_1_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const segmentThickness = 10;
    const translateX = 0;

    function instance$m($$self, $$props, $$invalidate) {
    	let distortedElapsed1;
    	let distortedElapsed2;
    	let scrollLimit;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Waves', slots, []);
    	let canvas = null;
    	let pageHeight;
    	let pageWidth;
    	let ctx;
    	const startTime = Date.now();
    	let time = startTime;
    	let elapsed;

    	// used to speed up elapsed time at when page is first opened and then approach a 1:1 time count to slow down the animation
    	// parameters s and t - function compresses s seconds of animation into t seconds upon page load.
    	const distortElapsed = (elapsed, s, t) => {
    		// scale to milliseconds
    		s *= 1000;

    		t *= 1000;
    		const a = t ** 2 * s / (s - t);
    		return elapsed + s - a / (elapsed + a / s);
    	};

    	onMount(() => {
    		$$invalidate(4, ctx = canvas.getContext("2d"));

    		const interval = setInterval(
    			() => {
    				$$invalidate(5, time = Date.now());
    			},
    			10
    		);

    		return () => {
    			clearInterval(interval);
    		};
    	});

    	// t: seconds to phase shift curve by
    	// amp: amplitude of wave
    	// period: width of 1 period of wave
    	// timePeriod: seconds taken for wave to travel 1 period
    	const waveCurve = (t, amp, period, timePeriod) => x => {
    		return amp * Math.sin(2 * Math.PI * (x / period + t / (timePeriod * 1000)));
    	};

    	// update the curve definition as time passes
    	let waves;

    	let scroll;
    	let wavePoints;
    	let gradientPoints;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Waves> was created with unknown prop '${key}'`);
    	});

    	function onwindowresize() {
    		$$invalidate(2, pageWidth = window.innerWidth);
    		$$invalidate(1, pageHeight = window.innerHeight);
    	}

    	function onwindowscroll() {
    		$$invalidate(3, scroll = window.pageYOffset);
    	}

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			canvas = $$value;
    			(($$invalidate(0, canvas), $$invalidate(2, pageWidth)), $$invalidate(1, pageHeight));
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		rotate,
    		translate,
    		canvas,
    		pageHeight,
    		pageWidth,
    		ctx,
    		startTime,
    		time,
    		elapsed,
    		distortElapsed,
    		waveCurve,
    		waves,
    		scroll,
    		segmentThickness,
    		translateX,
    		wavePoints,
    		gradientPoints,
    		scrollLimit,
    		distortedElapsed2,
    		distortedElapsed1
    	});

    	$$self.$inject_state = $$props => {
    		if ('canvas' in $$props) $$invalidate(0, canvas = $$props.canvas);
    		if ('pageHeight' in $$props) $$invalidate(1, pageHeight = $$props.pageHeight);
    		if ('pageWidth' in $$props) $$invalidate(2, pageWidth = $$props.pageWidth);
    		if ('ctx' in $$props) $$invalidate(4, ctx = $$props.ctx);
    		if ('time' in $$props) $$invalidate(5, time = $$props.time);
    		if ('elapsed' in $$props) $$invalidate(6, elapsed = $$props.elapsed);
    		if ('waves' in $$props) $$invalidate(7, waves = $$props.waves);
    		if ('scroll' in $$props) $$invalidate(3, scroll = $$props.scroll);
    		if ('wavePoints' in $$props) $$invalidate(8, wavePoints = $$props.wavePoints);
    		if ('gradientPoints' in $$props) $$invalidate(9, gradientPoints = $$props.gradientPoints);
    		if ('scrollLimit' in $$props) $$invalidate(10, scrollLimit = $$props.scrollLimit);
    		if ('distortedElapsed2' in $$props) $$invalidate(11, distortedElapsed2 = $$props.distortedElapsed2);
    		if ('distortedElapsed1' in $$props) $$invalidate(12, distortedElapsed1 = $$props.distortedElapsed1);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*time*/ 32) {
    			// update ms elapsed since page was opened when time updates from interval
    			$$invalidate(6, elapsed = time - startTime);
    		}

    		if ($$self.$$.dirty & /*elapsed*/ 64) {
    			$$invalidate(12, distortedElapsed1 = distortElapsed(elapsed, 100, 6));
    		}

    		if ($$self.$$.dirty & /*elapsed*/ 64) {
    			$$invalidate(11, distortedElapsed2 = distortElapsed(elapsed, 40, 3));
    		}

    		if ($$self.$$.dirty & /*canvas, pageWidth*/ 5) {
    			// keep canvas width updated if window size changes
    			if (canvas != null) $$invalidate(0, canvas.width = pageWidth, canvas);
    		}

    		if ($$self.$$.dirty & /*canvas, pageHeight*/ 3) {
    			if (canvas != null) $$invalidate(0, canvas.height = pageHeight, canvas);
    		}

    		if ($$self.$$.dirty & /*scroll, pageHeight*/ 10) {
    			$$invalidate(10, scrollLimit = Math.min(1, scroll / pageHeight));
    		}

    		if ($$self.$$.dirty & /*distortedElapsed1, pageWidth, pageHeight, scrollLimit, distortedElapsed2*/ 7174) {
    			$$invalidate(7, waves = [
    				{
    					mainWave: waveCurve(distortedElapsed1, 0.03 * pageWidth, 0.3 * pageWidth, 40),
    					addlWave: waveCurve(distortedElapsed1, 0.015 * pageWidth, 0.5 * pageWidth, 30),
    					color1: "#edf9e2ff",
    					color2: "#edf9e200",
    					rotation: 4,
    					gradientThickness: 0.03 * pageHeight * scrollLimit,
    					translateY: 0.91 * pageHeight
    				},
    				{
    					mainWave: waveCurve(distortedElapsed2, 0.014 * pageWidth, 0.25 * pageWidth, 25),
    					addlWave: waveCurve(distortedElapsed2, 0.014 * pageWidth, 0.5 * pageWidth, 20),
    					color1: "#e5edcbff",
    					color2: "#e5edcb00",
    					rotation: 4,
    					gradientThickness: 0.03 * pageHeight * scrollLimit,
    					translateY: 0.89 * pageHeight
    				}
    			]);
    		}

    		if ($$self.$$.dirty & /*waves, pageWidth*/ 132) {
    			{
    				$$invalidate(
    					8,
    					[wavePoints, gradientPoints] = waves.map(wave => {
    						let thisWavePoints = [];
    						let thisGradientPoints = [];

    						for (let x = -10; x < 1.1 * pageWidth; x += segmentThickness) {
    							let wavePoint = {
    								x,
    								y: wave.mainWave(x) + wave.addlWave(x)
    							};

    							let gradientPoint = {
    								x,
    								y: wavePoint.y + wave.gradientThickness
    							};

    							wavePoint = rotate(wavePoint.x, wavePoint.y, -wave.rotation);
    							wavePoint = translate(wavePoint.x, wavePoint.y, translateX, wave.translateY);
    							gradientPoint = rotate(gradientPoint.x, gradientPoint.y, -wave.rotation);
    							gradientPoint = translate(gradientPoint.x, gradientPoint.y, translateX, wave.translateY);
    							thisWavePoints.push(wavePoint);
    							thisGradientPoints.push(gradientPoint);
    						}

    						return [thisWavePoints, thisGradientPoints];
    					}).reduce(
    						([a, b], [ac, bc]) => {
    							a.push(ac);
    							b.push(bc);
    							return [a, b];
    						},
    						[[], []]
    					),
    					wavePoints,
    					((((((((($$invalidate(9, gradientPoints), $$invalidate(7, waves)), $$invalidate(2, pageWidth)), $$invalidate(12, distortedElapsed1)), $$invalidate(1, pageHeight)), $$invalidate(10, scrollLimit)), $$invalidate(11, distortedElapsed2)), $$invalidate(6, elapsed)), $$invalidate(3, scroll)), $$invalidate(5, time))
    				);
    			}
    		}

    		if ($$self.$$.dirty & /*canvas, ctx, waves, wavePoints, gradientPoints, pageWidth*/ 917) {
    			// update canvas as curves change
    			{
    				if (canvas != null) {
    					ctx.clearRect(0, 0, canvas.width, canvas.height);

    					for (let i = 0; i < waves.length; i++) {
    						let thisWavePoints = wavePoints[i];
    						let thisGradientPoints = gradientPoints[i];
    						ctx.beginPath();
    						ctx.moveTo(pageWidth, 0);
    						ctx.lineTo(0, 0);

    						for (const point of thisWavePoints) {
    							ctx.lineTo(point.x, point.y);
    						}

    						$$invalidate(4, ctx.fillStyle = waves[i].color1, ctx);
    						ctx.fill();

    						for (let j = 0; j < thisWavePoints.length - 1; j++) {
    							const p1 = thisWavePoints[j];
    							const p2 = thisWavePoints[j + 1];
    							const p3 = thisGradientPoints[j + 1];
    							const p4 = thisGradientPoints[j];
    							ctx.beginPath();
    							ctx.moveTo(p1.x, p1.y);
    							ctx.lineTo(p2.x, p2.y);
    							ctx.lineTo(p3.x, p3.y);
    							ctx.lineTo(p4.x, p4.y);
    							const grd_x1 = p1.x;
    							const grd_y1 = p1.y;
    							const t = [(p1.x - p4.x) * (p3.x - p4.x) + (p1.y - p4.y) * (p3.y - p4.y)] / [(p3.x - p4.x) ** 2 + (p3.y - p4.y) ** 2];
    							const grd_x2 = p4.x + t * (p3.x - p4.x);
    							const grd_y2 = p4.y + t * (p3.y - p4.y);
    							const gradient = ctx.createLinearGradient(grd_x1, grd_y1, grd_x2, grd_y2);
    							gradient.addColorStop(0, waves[i].color1);
    							gradient.addColorStop(1, waves[i].color2);
    							$$invalidate(4, ctx.fillStyle = gradient, ctx);
    							ctx.fill();
    						}
    					}
    				}
    			}
    		}
    	};

    	return [
    		canvas,
    		pageHeight,
    		pageWidth,
    		scroll,
    		ctx,
    		time,
    		elapsed,
    		waves,
    		wavePoints,
    		gradientPoints,
    		scrollLimit,
    		distortedElapsed2,
    		distortedElapsed1,
    		onwindowresize,
    		onwindowscroll,
    		canvas_1_binding
    	];
    }

    class Waves extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Waves",
    			options,
    			id: create_fragment$m.name
    		});
    	}
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }

    /* src\lib\components\generic\CreateOnScrollWrapper.svelte generated by Svelte v3.59.1 */

    const file$j = "src\\lib\\components\\generic\\CreateOnScrollWrapper.svelte";

    // (44:4) {#if visible || alwaysVisible}
    function create_if_block$4(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(44:4) {#if visible || alwaysVisible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[13]);
    	add_render_callback(/*onwindowresize*/ ctx[14]);
    	let if_block = (/*visible*/ ctx[2] || /*alwaysVisible*/ ctx[0]) && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "panel svelte-np6kx4");
    			add_location(div, file$j, 42, 0, 1666);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			/*div_binding*/ ctx[15](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[13]();
    					}),
    					listen_dev(window, "resize", /*onwindowresize*/ ctx[14])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scroll*/ 8 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*scroll*/ ctx[3]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (/*visible*/ ctx[2] || /*alwaysVisible*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*visible, alwaysVisible*/ 5) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			/*div_binding*/ ctx[15](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CreateOnScrollWrapper', slots, ['default']);
    	let { topLimitCreate = 0 } = $$props;
    	let { topLimitDestroy = 0 } = $$props;
    	let { btmLimitCreate = 0 } = $$props;
    	let { btmLimitDestroy = 0 } = $$props;
    	let { rectBtmOverride = null } = $$props;
    	let { rectTopOverride = null } = $$props;
    	let { alwaysVisible = false } = $$props;
    	let panel = null;
    	let visible = false;
    	let scroll;
    	let windowHeight;

    	const writable_props = [
    		'topLimitCreate',
    		'topLimitDestroy',
    		'btmLimitCreate',
    		'btmLimitDestroy',
    		'rectBtmOverride',
    		'rectTopOverride',
    		'alwaysVisible'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CreateOnScrollWrapper> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(3, scroll = window.pageYOffset);
    	}

    	function onwindowresize() {
    		$$invalidate(4, windowHeight = window.innerHeight);
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			panel = $$value;
    			$$invalidate(1, panel);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('topLimitCreate' in $$props) $$invalidate(5, topLimitCreate = $$props.topLimitCreate);
    		if ('topLimitDestroy' in $$props) $$invalidate(6, topLimitDestroy = $$props.topLimitDestroy);
    		if ('btmLimitCreate' in $$props) $$invalidate(7, btmLimitCreate = $$props.btmLimitCreate);
    		if ('btmLimitDestroy' in $$props) $$invalidate(8, btmLimitDestroy = $$props.btmLimitDestroy);
    		if ('rectBtmOverride' in $$props) $$invalidate(9, rectBtmOverride = $$props.rectBtmOverride);
    		if ('rectTopOverride' in $$props) $$invalidate(10, rectTopOverride = $$props.rectTopOverride);
    		if ('alwaysVisible' in $$props) $$invalidate(0, alwaysVisible = $$props.alwaysVisible);
    		if ('$$scope' in $$props) $$invalidate(11, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		topLimitCreate,
    		topLimitDestroy,
    		btmLimitCreate,
    		btmLimitDestroy,
    		rectBtmOverride,
    		rectTopOverride,
    		alwaysVisible,
    		panel,
    		visible,
    		scroll,
    		windowHeight
    	});

    	$$self.$inject_state = $$props => {
    		if ('topLimitCreate' in $$props) $$invalidate(5, topLimitCreate = $$props.topLimitCreate);
    		if ('topLimitDestroy' in $$props) $$invalidate(6, topLimitDestroy = $$props.topLimitDestroy);
    		if ('btmLimitCreate' in $$props) $$invalidate(7, btmLimitCreate = $$props.btmLimitCreate);
    		if ('btmLimitDestroy' in $$props) $$invalidate(8, btmLimitDestroy = $$props.btmLimitDestroy);
    		if ('rectBtmOverride' in $$props) $$invalidate(9, rectBtmOverride = $$props.rectBtmOverride);
    		if ('rectTopOverride' in $$props) $$invalidate(10, rectTopOverride = $$props.rectTopOverride);
    		if ('alwaysVisible' in $$props) $$invalidate(0, alwaysVisible = $$props.alwaysVisible);
    		if ('panel' in $$props) $$invalidate(1, panel = $$props.panel);
    		if ('visible' in $$props) $$invalidate(2, visible = $$props.visible);
    		if ('scroll' in $$props) $$invalidate(3, scroll = $$props.scroll);
    		if ('windowHeight' in $$props) $$invalidate(4, windowHeight = $$props.windowHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*scroll, panel, rectBtmOverride, rectTopOverride, windowHeight, visible, topLimitDestroy, btmLimitDestroy, topLimitCreate, btmLimitCreate*/ 2046) {
    			// update position of panel relative to viewport when user scrolls
    			// sets visible to true when the centre of panel is visible on screen
    			{

    				if (panel != null) {
    					const rect = panel.getBoundingClientRect();
    					let rectHeight;

    					// use either rectangle btm/top or the override values
    					const rectBtm = rectBtmOverride != null ? rectBtmOverride : rect.bottom;

    					const rectTop = rectTopOverride != null ? rectTopOverride : rect.top;
    					rectHeight = rectBtm - rect.top;
    					const midScreenPos = windowHeight / 2;
    					let topLimit;
    					let btmLimit;

    					// if element is already visible, determine when its visibility based on the destroy limit proportions
    					if (visible) {
    						topLimit = rectTop + rectHeight * topLimitDestroy;
    						btmLimit = rectBtm - rectHeight * btmLimitDestroy;
    					} else // otherwise determine its visibility based on the creation limit proportions
    					{
    						topLimit = rectTop + rectHeight * topLimitCreate;
    						btmLimit = rectBtm - rectHeight * btmLimitCreate;
    					}

    					$$invalidate(2, visible = btmLimit > midScreenPos && topLimit < midScreenPos);
    				}
    			}
    		}
    	};

    	return [
    		alwaysVisible,
    		panel,
    		visible,
    		scroll,
    		windowHeight,
    		topLimitCreate,
    		topLimitDestroy,
    		btmLimitCreate,
    		btmLimitDestroy,
    		rectBtmOverride,
    		rectTopOverride,
    		$$scope,
    		slots,
    		onwindowscroll,
    		onwindowresize,
    		div_binding
    	];
    }

    class CreateOnScrollWrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$l, create_fragment$l, safe_not_equal, {
    			topLimitCreate: 5,
    			topLimitDestroy: 6,
    			btmLimitCreate: 7,
    			btmLimitDestroy: 8,
    			rectBtmOverride: 9,
    			rectTopOverride: 10,
    			alwaysVisible: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CreateOnScrollWrapper",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get topLimitCreate() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topLimitCreate(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get topLimitDestroy() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set topLimitDestroy(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get btmLimitCreate() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set btmLimitCreate(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get btmLimitDestroy() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set btmLimitDestroy(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rectBtmOverride() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rectBtmOverride(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rectTopOverride() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rectTopOverride(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alwaysVisible() {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alwaysVisible(value) {
    		throw new Error("<CreateOnScrollWrapper>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\app\WavesContainer.svelte generated by Svelte v3.59.1 */
    const file$i = "src\\lib\\components\\app\\WavesContainer.svelte";

    function create_fragment$k(ctx) {
    	let div1;
    	let div0;
    	let waves;
    	let current;
    	waves = new Waves({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			create_component(waves.$$.fragment);
    			add_location(div0, file$i, 7, 8, 226);
    			attr_dev(div1, "class", "container svelte-1rri5vl");
    			add_location(div1, file$i, 6, 0, 193);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			mount_component(waves, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(waves.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(waves.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(waves);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WavesContainer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WavesContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fade, Waves, CreateOnScrollWrapper });
    	return [];
    }

    class WavesContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WavesContainer",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src\lib\components\app\segments\LandingSegment.svelte generated by Svelte v3.59.1 */
    const file$h = "src\\lib\\components\\app\\segments\\LandingSegment.svelte";

    // (7:0) <PageSegment id="home">
    function create_default_slot$5(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let h3;
    	let t3;
    	let h1;
    	let t5;
    	let wavescontainer;
    	let current;
    	wavescontainer = new WavesContainer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Hello!";
    			t1 = space();
    			h3 = element("h3");
    			h3.textContent = "My name is";
    			t3 = space();
    			h1 = element("h1");
    			h1.textContent = "Dennis Rigon";
    			t5 = space();
    			create_component(wavescontainer.$$.fragment);
    			add_location(h2, file$h, 8, 8, 248);
    			add_location(h3, file$h, 9, 8, 273);
    			add_location(h1, file$h, 10, 8, 302);
    			attr_dev(div, "class", "panel svelte-xzd965");
    			add_location(div, file$h, 7, 4, 219);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, h3);
    			append_dev(div, t3);
    			append_dev(div, h1);
    			append_dev(div, t5);
    			mount_component(wavescontainer, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wavescontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wavescontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(wavescontainer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(7:0) <PageSegment id=\\\"home\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let pagesegment;
    	let current;

    	pagesegment = new PageSegment({
    			props: {
    				id: "home",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(pagesegment.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(pagesegment, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pagesegment_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				pagesegment_changes.$$scope = { dirty, ctx };
    			}

    			pagesegment.$set(pagesegment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagesegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagesegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(pagesegment, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LandingSegment', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LandingSegment> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PageSegment, Waves, WavesContainer });
    	return [];
    }

    class LandingSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LandingSegment",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    function redact(
        node,
        {
            delay = 0,
            coverDuration = 300,
            holdDuration = 200,
            uncoverDuration = 300,
            color = null,
        }
    ) {
        let duration = coverDuration + holdDuration + uncoverDuration;

        // if color property not provided, set color as the text color
        if (color == null) {
            color = document.defaultView.getComputedStyle(node, null)["color"];
        }

        function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
        }

        // animation to cover text from left to right with a coloured rectangle
        const coverState = (timer) => {
            return `
            background:
                linear-gradient(
                    to right,
                    ${color} ${easeOutCubic(timer) * 100}%,
                    rgb(0, 0, 0, 0) 0%
                    );
            color: rgb(0, 0, 0, 0)
            `;
        };

        const holdState = () => {
            return coverState(1);
        };

        // animation to uncover text from left to right
        const uncoverState = (timer) => {
            return `
            background:
                linear-gradient(
                    to right, 
                    rgb(0, 0, 0, 0) ${easeOutCubic(timer) * 100}%,
                    ${color} 0%
                    );
            color: ${color}
            `;
        };

        return {
            delay,
            duration,
            css: (proportion) => {
                let elapsedTime = proportion * duration;

                // check if timer is within the cover, hold or uncover duration
                if (elapsedTime < coverDuration) {
                    return coverState(elapsedTime / coverDuration);
                } else if (elapsedTime < coverDuration + holdDuration) {
                    return holdState();
                } else {
                    return uncoverState(
                        (elapsedTime - (coverDuration + holdDuration)) /
                            uncoverDuration
                    );
                }
            },
        };
    }

    /* src\lib\components\generic\OverlayPanel.svelte generated by Svelte v3.59.1 */
    const file$g = "src\\lib\\components\\generic\\OverlayPanel.svelte";

    // (12:0) <CreateOnScrollWrapper {...$$restProps}>
    function create_default_slot$4(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let div0_intro;
    	let div0_outro;
    	let t1;
    	let div1;
    	let div1_outro;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(/*number*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "number svelte-nj4fnf");
    			add_location(div0, file$g, 13, 8, 416);
    			attr_dev(div1, "class", "title svelte-nj4fnf");
    			add_location(div1, file$g, 16, 8, 512);
    			attr_dev(div2, "class", "overlay-wrapper svelte-nj4fnf");
    			add_location(div2, file$g, 12, 4, 377);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*number*/ 1) set_data_dev(t0, /*number*/ ctx[0]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!current) return;
    				if (div0_outro) div0_outro.end(1);
    				div0_intro = create_in_transition(div0, redact, {});
    				div0_intro.start();
    			});

    			transition_in(default_slot, local);
    			if (div1_outro) div1_outro.end(1);
    			current = true;
    		},
    		o: function outro(local) {
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, /*transitionOut*/ ctx[1], {});
    			transition_out(default_slot, local);
    			div1_outro = create_out_transition(div1, /*transitionOut*/ ctx[1], {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching && div0_outro) div0_outro.end();
    			if (default_slot) default_slot.d(detaching);
    			if (detaching && div1_outro) div1_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(12:0) <CreateOnScrollWrapper {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let createonscrollwrapper;
    	let current;
    	const createonscrollwrapper_spread_levels = [/*$$restProps*/ ctx[2]];

    	let createonscrollwrapper_props = {
    		$$slots: { default: [create_default_slot$4] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < createonscrollwrapper_spread_levels.length; i += 1) {
    		createonscrollwrapper_props = assign(createonscrollwrapper_props, createonscrollwrapper_spread_levels[i]);
    	}

    	createonscrollwrapper = new CreateOnScrollWrapper({
    			props: createonscrollwrapper_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(createonscrollwrapper.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(createonscrollwrapper, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const createonscrollwrapper_changes = (dirty & /*$$restProps*/ 4)
    			? get_spread_update(createonscrollwrapper_spread_levels, [get_spread_object(/*$$restProps*/ ctx[2])])
    			: {};

    			if (dirty & /*$$scope, number*/ 17) {
    				createonscrollwrapper_changes.$$scope = { dirty, ctx };
    			}

    			createonscrollwrapper.$set(createonscrollwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(createonscrollwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(createonscrollwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(createonscrollwrapper, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	const omit_props_names = ["number"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('OverlayPanel', slots, ['default']);
    	let { number = "undefined page number" } = $$props;
    	const transitionOut = node => fade(node, { duration: 150 });

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('number' in $$new_props) $$invalidate(0, number = $$new_props.number);
    		if ('$$scope' in $$new_props) $$invalidate(4, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		redact,
    		fade,
    		CreateOnScrollWrapper,
    		number,
    		transitionOut
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('number' in $$props) $$invalidate(0, number = $$new_props.number);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [number, transitionOut, $$restProps, slots, $$scope];
    }

    class OverlayPanel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { number: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "OverlayPanel",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get number() {
    		throw new Error("<OverlayPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set number(value) {
    		throw new Error("<OverlayPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\generic\SplitPageSegment.svelte generated by Svelte v3.59.1 */
    const file$f = "src\\lib\\components\\generic\\SplitPageSegment.svelte";
    const get_content_slot_changes = dirty => ({});
    const get_content_slot_context = ctx => ({});
    const get_title_slot_changes = dirty => ({});
    const get_title_slot_context = ctx => ({});

    // (24:12) <OverlayPanel                  {...$$restProps}                  rectBtmOverride={rowBottom}                  rectTopOverride={rowTop}              >
    function create_default_slot$3(ctx) {
    	let current;
    	const title_slot_template = /*#slots*/ ctx[8].title;
    	const title_slot = create_slot(title_slot_template, ctx, /*$$scope*/ ctx[11], get_title_slot_context);

    	const block = {
    		c: function create() {
    			if (title_slot) title_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (title_slot) {
    				title_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (title_slot) {
    				if (title_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						title_slot,
    						title_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(title_slot_template, /*$$scope*/ ctx[11], dirty, get_title_slot_changes),
    						get_title_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (title_slot) title_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(24:12) <OverlayPanel                  {...$$restProps}                  rectBtmOverride={rowBottom}                  rectTopOverride={rowTop}              >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div3;
    	let div1;
    	let div0;
    	let overlaypanel;
    	let t;
    	let div2;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[9]);

    	const overlaypanel_spread_levels = [
    		/*$$restProps*/ ctx[6],
    		{ rectBtmOverride: /*rowBottom*/ ctx[3] },
    		{ rectTopOverride: /*rowTop*/ ctx[4] }
    	];

    	let overlaypanel_props = {
    		$$slots: { default: [create_default_slot$3] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < overlaypanel_spread_levels.length; i += 1) {
    		overlaypanel_props = assign(overlaypanel_props, overlaypanel_spread_levels[i]);
    	}

    	overlaypanel = new OverlayPanel({
    			props: overlaypanel_props,
    			$$inline: true
    		});

    	const content_slot_template = /*#slots*/ ctx[8].content;
    	const content_slot = create_slot(content_slot_template, ctx, /*$$scope*/ ctx[11], get_content_slot_context);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(overlaypanel.$$.fragment);
    			t = space();
    			div2 = element("div");
    			if (content_slot) content_slot.c();
    			attr_dev(div0, "class", "svelte-1qetcjf");
    			add_location(div0, file$f, 22, 8, 572);
    			attr_dev(div1, "class", "column svelte-1qetcjf");
    			add_location(div1, file$f, 21, 4, 542);
    			attr_dev(div2, "class", "column svelte-1qetcjf");
    			add_location(div2, file$f, 33, 4, 844);
    			attr_dev(div3, "class", "row svelte-1qetcjf");
    			attr_dev(div3, "id", /*id*/ ctx[0]);
    			set_style(div3, "min-height", /*finalSpecifiedHeight*/ ctx[5]);
    			add_location(div3, file$f, 20, 0, 458);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			mount_component(overlaypanel, div0, null);
    			append_dev(div3, t);
    			append_dev(div3, div2);

    			if (content_slot) {
    				content_slot.m(div2, null);
    			}

    			/*div3_binding*/ ctx[10](div3);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[9]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scroll*/ 2 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*scroll*/ ctx[1]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			const overlaypanel_changes = (dirty & /*$$restProps, rowBottom, rowTop*/ 88)
    			? get_spread_update(overlaypanel_spread_levels, [
    					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6]),
    					dirty & /*rowBottom*/ 8 && { rectBtmOverride: /*rowBottom*/ ctx[3] },
    					dirty & /*rowTop*/ 16 && { rectTopOverride: /*rowTop*/ ctx[4] }
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2048) {
    				overlaypanel_changes.$$scope = { dirty, ctx };
    			}

    			overlaypanel.$set(overlaypanel_changes);

    			if (content_slot) {
    				if (content_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot_base(
    						content_slot,
    						content_slot_template,
    						ctx,
    						/*$$scope*/ ctx[11],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
    						: get_slot_changes(content_slot_template, /*$$scope*/ ctx[11], dirty, get_content_slot_changes),
    						get_content_slot_context
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(div3, "id", /*id*/ ctx[0]);
    			}

    			if (dirty & /*finalSpecifiedHeight*/ 32) {
    				set_style(div3, "min-height", /*finalSpecifiedHeight*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(overlaypanel.$$.fragment, local);
    			transition_in(content_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(overlaypanel.$$.fragment, local);
    			transition_out(content_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_component(overlaypanel);
    			if (content_slot) content_slot.d(detaching);
    			/*div3_binding*/ ctx[10](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let finalSpecifiedHeight;
    	const omit_props_names = ["id","specifiedHeight"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SplitPageSegment', slots, ['title','content']);
    	let { id } = $$props;
    	let { specifiedHeight = 0 } = $$props;
    	let scroll;
    	let row;
    	let rowBottom;
    	let rowTop;

    	$$self.$$.on_mount.push(function () {
    		if (id === undefined && !('id' in $$props || $$self.$$.bound[$$self.$$.props['id']])) {
    			console.warn("<SplitPageSegment> was created without expected prop 'id'");
    		}
    	});

    	function onwindowscroll() {
    		$$invalidate(1, scroll = window.pageYOffset);
    	}

    	function div3_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			row = $$value;
    			$$invalidate(2, row);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('id' in $$new_props) $$invalidate(0, id = $$new_props.id);
    		if ('specifiedHeight' in $$new_props) $$invalidate(7, specifiedHeight = $$new_props.specifiedHeight);
    		if ('$$scope' in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		OverlayPanel,
    		id,
    		specifiedHeight,
    		scroll,
    		row,
    		rowBottom,
    		rowTop,
    		finalSpecifiedHeight
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('id' in $$props) $$invalidate(0, id = $$new_props.id);
    		if ('specifiedHeight' in $$props) $$invalidate(7, specifiedHeight = $$new_props.specifiedHeight);
    		if ('scroll' in $$props) $$invalidate(1, scroll = $$new_props.scroll);
    		if ('row' in $$props) $$invalidate(2, row = $$new_props.row);
    		if ('rowBottom' in $$props) $$invalidate(3, rowBottom = $$new_props.rowBottom);
    		if ('rowTop' in $$props) $$invalidate(4, rowTop = $$new_props.rowTop);
    		if ('finalSpecifiedHeight' in $$props) $$invalidate(5, finalSpecifiedHeight = $$new_props.finalSpecifiedHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*specifiedHeight*/ 128) {
    			$$invalidate(5, finalSpecifiedHeight = `${Math.max(specifiedHeight, 100)}vh`);
    		}

    		if ($$self.$$.dirty & /*scroll, row*/ 6) {
    			{

    				if (row != null) {
    					const rect = row.getBoundingClientRect();
    					$$invalidate(3, rowBottom = rect.bottom);
    					$$invalidate(4, rowTop = rect.top);
    				}
    			}
    		}
    	};

    	return [
    		id,
    		scroll,
    		row,
    		rowBottom,
    		rowTop,
    		finalSpecifiedHeight,
    		$$restProps,
    		specifiedHeight,
    		slots,
    		onwindowscroll,
    		div3_binding,
    		$$scope
    	];
    }

    class SplitPageSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { id: 0, specifiedHeight: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SplitPageSegment",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get id() {
    		throw new Error("<SplitPageSegment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<SplitPageSegment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get specifiedHeight() {
    		throw new Error("<SplitPageSegment>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set specifiedHeight(value) {
    		throw new Error("<SplitPageSegment>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\app\segments\AboutSegment.svelte generated by Svelte v3.59.1 */
    const file$e = "src\\lib\\components\\app\\segments\\AboutSegment.svelte";

    // (7:4) 
    function create_content_slot$3(ctx) {
    	let div;
    	let p;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			p.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\r\n            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim\r\n            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\r\n            aliquip ex ea commodo consequat. Duis aute irure dolor in\r\n            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\r\n            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\r\n            culpa qui officia deserunt mollit anim id est laborum.";
    			add_location(p, file$e, 7, 8, 247);
    			attr_dev(div, "slot", "content");
    			add_location(div, file$e, 6, 4, 217);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$3.name,
    		type: "slot",
    		source: "(7:4) ",
    		ctx
    	});

    	return block;
    }

    // (19:4) 
    function create_title_slot$3(ctx) {
    	let div;
    	let h1;
    	let h1_intro;
    	let t1;
    	let h3;
    	let h3_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "About Me";
    			t1 = space();
    			h3 = element("h3");
    			h3.textContent = "Dennis Rigon";
    			attr_dev(h1, "class", "shrink svelte-1ovqw5c");
    			add_location(h1, file$e, 19, 8, 849);
    			attr_dev(h3, "class", "shrink svelte-1ovqw5c");
    			add_location(h3, file$e, 20, 8, 901);
    			attr_dev(div, "slot", "title");
    			add_location(div, file$e, 18, 4, 821);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, h3);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, redact, {});
    					h1_intro.start();
    				});
    			}

    			if (!h3_intro) {
    				add_render_callback(() => {
    					h3_intro = create_in_transition(h3, redact, {});
    					h3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot$3.name,
    		type: "slot",
    		source: "(19:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let splitpagesegment;
    	let current;
    	const splitpagesegment_spread_levels = [/*$$restProps*/ ctx[0], { id: "about" }];

    	let splitpagesegment_props = {
    		$$slots: {
    			title: [create_title_slot$3],
    			content: [create_content_slot$3]
    		},
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < splitpagesegment_spread_levels.length; i += 1) {
    		splitpagesegment_props = assign(splitpagesegment_props, splitpagesegment_spread_levels[i]);
    	}

    	splitpagesegment = new SplitPageSegment({
    			props: splitpagesegment_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(splitpagesegment.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(splitpagesegment, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const splitpagesegment_changes = (dirty & /*$$restProps*/ 1)
    			? get_spread_update(splitpagesegment_spread_levels, [
    					get_spread_object(/*$$restProps*/ ctx[0]),
    					splitpagesegment_spread_levels[1]
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2) {
    				splitpagesegment_changes.$$scope = { dirty, ctx };
    			}

    			splitpagesegment.$set(splitpagesegment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(splitpagesegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(splitpagesegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(splitpagesegment, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AboutSegment', slots, []);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({ redact, SplitPageSegment });
    	return [$$restProps];
    }

    class AboutSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutSegment",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    const EMAIL_KEY = "79765aae-2721-4638-86ee-aa83b5c334e7";

    /* src\lib\components\app\ContactContainer.svelte generated by Svelte v3.59.1 */

    const file$d = "src\\lib\\components\\app\\ContactContainer.svelte";

    // (78:4) {:else}
    function create_else_block$1(ctx) {
    	let div0;
    	let h1;
    	let t0;
    	let br;
    	let t1;
    	let h1_intro;
    	let t2;
    	let div1;
    	let img;
    	let img_src_value;
    	let img_intro;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h1 = element("h1");
    			t0 = text("Thanks for the message.\r\n                ");
    			br = element("br");
    			t1 = text("\r\n                I'll get back to you soon.");
    			t2 = space();
    			div1 = element("div");
    			img = element("img");
    			attr_dev(br, "class", "svelte-spl74o");
    			add_location(br, file$d, 81, 16, 2320);
    			attr_dev(h1, "class", "svelte-spl74o");
    			add_location(h1, file$d, 79, 12, 2249);
    			attr_dev(div0, "class", "response svelte-spl74o");
    			add_location(div0, file$d, 78, 8, 2213);
    			attr_dev(img, "class", "icon svelte-spl74o");
    			if (!src_url_equal(img.src, img_src_value = "./images/back-icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "embed pdf");
    			add_location(img, file$d, 91, 12, 2555);
    			attr_dev(div1, "class", "icon-wrapper svelte-spl74o");
    			add_location(div1, file$d, 86, 8, 2417);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h1);
    			append_dev(h1, t0);
    			append_dev(h1, br);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", /*resetSubmit*/ ctx[5], false, false, false, false),
    					listen_dev(div1, "keypress", /*resetSubmit*/ ctx[5], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, fade, {});
    					h1_intro.start();
    				});
    			}

    			if (!img_intro) {
    				add_render_callback(() => {
    					img_intro = create_in_transition(img, fade, {});
    					img_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(78:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (34:4) {#if !submitted}
    function create_if_block$3(ctx) {
    	let h1;
    	let h1_intro;
    	let t1;
    	let form;
    	let div;
    	let input0;
    	let t2;
    	let input1;
    	let t3;
    	let textarea;
    	let t4;
    	let button;
    	let t6;
    	let input2;
    	let t7;
    	let input3;
    	let input3_value_value;
    	let form_intro;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Contact Me";
    			t1 = space();
    			form = element("form");
    			div = element("div");
    			input0 = element("input");
    			t2 = space();
    			input1 = element("input");
    			t3 = space();
    			textarea = element("textarea");
    			t4 = space();
    			button = element("button");
    			button.textContent = "Submit";
    			t6 = space();
    			input2 = element("input");
    			t7 = space();
    			input3 = element("input");
    			attr_dev(h1, "class", "svelte-spl74o");
    			add_location(h1, file$d, 34, 8, 791);
    			attr_dev(input0, "name", "name");
    			attr_dev(input0, "class", "name input svelte-spl74o");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "Name*");
    			input0.required = true;
    			add_location(input0, file$d, 44, 16, 1118);
    			attr_dev(input1, "name", "email");
    			attr_dev(input1, "class", "email input svelte-spl74o");
    			attr_dev(input1, "type", "email");
    			attr_dev(input1, "placeholder", "Email*");
    			input1.required = true;
    			add_location(input1, file$d, 52, 16, 1378);
    			attr_dev(div, "class", "small-fields svelte-spl74o");
    			add_location(div, file$d, 43, 12, 1074);
    			attr_dev(textarea, "class", "message input svelte-spl74o");
    			attr_dev(textarea, "placeholder", "Leave your message here");
    			attr_dev(textarea, "name", "message");
    			textarea.required = true;
    			add_location(textarea, file$d, 61, 12, 1659);
    			attr_dev(button, "class", "submit-btn svelte-spl74o");
    			add_location(button, file$d, 68, 12, 1895);
    			attr_dev(input2, "type", "hidden");
    			attr_dev(input2, "name", "accessKey");
    			input2.value = EMAIL_KEY;
    			attr_dev(input2, "class", "svelte-spl74o");
    			add_location(input2, file$d, 70, 12, 1953);
    			attr_dev(input3, "type", "hidden");
    			attr_dev(input3, "name", "subject");
    			input3.value = input3_value_value = "Portfolio website message from " + /*name*/ ctx[0];
    			attr_dev(input3, "class", "svelte-spl74o");
    			add_location(input3, file$d, 71, 12, 2025);
    			attr_dev(form, "class", "form svelte-spl74o");
    			attr_dev(form, "action", "https://api.staticforms.xyz/submit");
    			attr_dev(form, "method", "post");
    			attr_dev(form, "target", "container");
    			add_location(form, file$d, 35, 8, 828);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, form, anchor);
    			append_dev(form, div);
    			append_dev(div, input0);
    			set_input_value(input0, /*name*/ ctx[0]);
    			append_dev(div, t2);
    			append_dev(div, input1);
    			set_input_value(input1, /*email*/ ctx[1]);
    			append_dev(form, t3);
    			append_dev(form, textarea);
    			set_input_value(textarea, /*contactMessage*/ ctx[2]);
    			append_dev(form, t4);
    			append_dev(form, button);
    			append_dev(form, t6);
    			append_dev(form, input2);
    			append_dev(form, t7);
    			append_dev(form, input3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[7]),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[8]),
    					listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[4]), false, true, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
    				set_input_value(input0, /*name*/ ctx[0]);
    			}

    			if (dirty & /*email*/ 2 && input1.value !== /*email*/ ctx[1]) {
    				set_input_value(input1, /*email*/ ctx[1]);
    			}

    			if (dirty & /*contactMessage*/ 4) {
    				set_input_value(textarea, /*contactMessage*/ ctx[2]);
    			}

    			if (dirty & /*name*/ 1 && input3_value_value !== (input3_value_value = "Portfolio website message from " + /*name*/ ctx[0])) {
    				prop_dev(input3, "value", input3_value_value);
    			}
    		},
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, fade, {});
    					h1_intro.start();
    				});
    			}

    			if (!form_intro) {
    				add_render_callback(() => {
    					form_intro = create_in_transition(form, fade, {});
    					form_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(form);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(34:4) {#if !submitted}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (!/*submitted*/ ctx[3]) return create_if_block$3;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "container svelte-spl74o");
    			add_location(div, file$d, 32, 0, 736);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactContainer', slots, []);
    	let name;
    	let email;
    	let contactMessage;
    	let submitted = false;

    	const handleSubmit = async e => {
    		const ACTION_URL = e.target.action;
    		const formData = new FormData(e.target);
    		const data = new URLSearchParams();

    		for (let field of formData) {
    			data.append(field[0], field[1]);
    		}

    		fetch(ACTION_URL, { method: "POST", body: data });
    		$$invalidate(3, submitted = true);
    	};

    	const resetSubmit = () => {
    		$$invalidate(3, submitted = false);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactContainer> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	function input1_input_handler() {
    		email = this.value;
    		$$invalidate(1, email);
    	}

    	function textarea_input_handler() {
    		contactMessage = this.value;
    		$$invalidate(2, contactMessage);
    	}

    	$$self.$capture_state = () => ({
    		fade,
    		EMAIL_KEY,
    		name,
    		email,
    		contactMessage,
    		submitted,
    		handleSubmit,
    		resetSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('email' in $$props) $$invalidate(1, email = $$props.email);
    		if ('contactMessage' in $$props) $$invalidate(2, contactMessage = $$props.contactMessage);
    		if ('submitted' in $$props) $$invalidate(3, submitted = $$props.submitted);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		email,
    		contactMessage,
    		submitted,
    		handleSubmit,
    		resetSubmit,
    		input0_input_handler,
    		input1_input_handler,
    		textarea_input_handler
    	];
    }

    class ContactContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactContainer",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src\lib\components\app\segments\ContactSegment.svelte generated by Svelte v3.59.1 */
    const file$c = "src\\lib\\components\\app\\segments\\ContactSegment.svelte";

    // (6:0) <PageSegment id="contact">
    function create_default_slot$2(ctx) {
    	let div;
    	let contactcontainer;
    	let current;
    	contactcontainer = new ContactContainer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(contactcontainer.$$.fragment);
    			attr_dev(div, "class", "panel svelte-1840jwu");
    			add_location(div, file$c, 6, 4, 184);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(contactcontainer, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contactcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contactcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(contactcontainer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(6:0) <PageSegment id=\\\"contact\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let pagesegment;
    	let current;

    	pagesegment = new PageSegment({
    			props: {
    				id: "contact",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(pagesegment.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(pagesegment, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pagesegment_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				pagesegment_changes.$$scope = { dirty, ctx };
    			}

    			pagesegment.$set(pagesegment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagesegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagesegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(pagesegment, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContactSegment', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContactSegment> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PageSegment, ContactContainer });
    	return [];
    }

    class ContactSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContactSegment",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\lib\components\app\NavBar.svelte generated by Svelte v3.59.1 */
    const file$b = "src\\lib\\components\\app\\NavBar.svelte";

    function create_fragment$d(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let header;
    	let a0;
    	let img;
    	let img_src_value;
    	let t0;
    	let nav;
    	let ul;
    	let li0;
    	let a1;
    	let t2;
    	let li1;
    	let a2;
    	let t4;
    	let li2;
    	let a3;
    	let t6;
    	let li3;
    	let a4;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[3]);

    	const block = {
    		c: function create() {
    			header = element("header");
    			a0 = element("a");
    			img = element("img");
    			t0 = space();
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "About";
    			t2 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "Portfolio";
    			t4 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "Resume";
    			t6 = space();
    			li3 = element("li");
    			a4 = element("a");
    			a4.textContent = "Contact";
    			if (!src_url_equal(img.src, img_src_value = "./images/DR-icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "logo");
    			attr_dev(img, "class", "svelte-167c3en");
    			add_location(img, file$b, 16, 8, 464);
    			attr_dev(a0, "class", "logo svelte-167c3en");
    			attr_dev(a0, "href", "#home");
    			add_location(a0, file$b, 15, 4, 425);
    			attr_dev(a1, "href", "#about");
    			attr_dev(a1, "class", "svelte-167c3en");
    			add_location(a1, file$b, 21, 16, 581);
    			attr_dev(li0, "class", "svelte-167c3en");
    			add_location(li0, file$b, 21, 12, 577);
    			attr_dev(a2, "href", "#portfolio");
    			attr_dev(a2, "class", "svelte-167c3en");
    			add_location(a2, file$b, 22, 16, 630);
    			attr_dev(li1, "class", "svelte-167c3en");
    			add_location(li1, file$b, 22, 12, 626);
    			attr_dev(a3, "href", "#resume");
    			attr_dev(a3, "class", "svelte-167c3en");
    			add_location(a3, file$b, 23, 16, 687);
    			attr_dev(li2, "class", "svelte-167c3en");
    			add_location(li2, file$b, 23, 12, 683);
    			attr_dev(a4, "href", "#contact");
    			attr_dev(a4, "class", "svelte-167c3en");
    			add_location(a4, file$b, 24, 16, 738);
    			attr_dev(li3, "class", "svelte-167c3en");
    			add_location(li3, file$b, 24, 12, 734);
    			attr_dev(ul, "class", "nav_link svelte-167c3en");
    			add_location(ul, file$b, 20, 8, 542);
    			attr_dev(nav, "class", "svelte-167c3en");
    			add_location(nav, file$b, 19, 4, 527);
    			attr_dev(header, "class", "navbar svelte-167c3en");
    			set_style(header, "top", `${/*navShift*/ ctx[1]}px`);
    			add_location(header, file$b, 14, 0, 368);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, a0);
    			append_dev(a0, img);
    			append_dev(header, t0);
    			append_dev(header, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a1);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			append_dev(li1, a2);
    			append_dev(ul, t4);
    			append_dev(ul, li2);
    			append_dev(li2, a3);
    			append_dev(ul, t6);
    			append_dev(ul, li3);
    			append_dev(li3, a4);

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[3]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scroll*/ 1 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*scroll*/ ctx[0]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			if (dirty & /*navShift*/ 2) {
    				set_style(header, "top", `${/*navShift*/ ctx[1]}px`);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavBar', slots, []);
    	let scroll = 0;
    	let scrollHistory = [0, 0];
    	let navShift = 0;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavBar> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(0, scroll = window.pageYOffset);
    	}

    	$$self.$capture_state = () => ({ clamp, scroll, scrollHistory, navShift });

    	$$self.$inject_state = $$props => {
    		if ('scroll' in $$props) $$invalidate(0, scroll = $$props.scroll);
    		if ('scrollHistory' in $$props) $$invalidate(2, scrollHistory = $$props.scrollHistory);
    		if ('navShift' in $$props) $$invalidate(1, navShift = $$props.navShift);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*scrollHistory, scroll*/ 5) {
    			$$invalidate(2, scrollHistory = [scrollHistory[1], scroll]);
    		}

    		if ($$self.$$.dirty & /*navShift, scrollHistory*/ 6) {
    			{
    				$$invalidate(1, navShift += scrollHistory[0] - scrollHistory[1]);
    				$$invalidate(1, navShift = clamp(navShift, -50, 0));
    			}
    		}
    	};

    	return [scroll, navShift, scrollHistory, onwindowscroll];
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\lib\components\generic\SkillIcon.svelte generated by Svelte v3.59.1 */

    const file$a = "src\\lib\\components\\generic\\SkillIcon.svelte";

    function create_fragment$c(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "icon svelte-hv3fo8");
    			if (!src_url_equal(img.src, img_src_value = /*imgPath*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "icon");
    			set_style(img, "visibility", /*dummy*/ ctx[1] ? "hidden" : null);
    			add_location(img, file$a, 5, 0, 86);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imgPath*/ 1 && !src_url_equal(img.src, img_src_value = /*imgPath*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*dummy*/ 2) {
    				set_style(img, "visibility", /*dummy*/ ctx[1] ? "hidden" : null);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillIcon', slots, []);
    	let { imgPath = null } = $$props;
    	let { dummy = false } = $$props;
    	const writable_props = ['imgPath', 'dummy'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SkillIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('imgPath' in $$props) $$invalidate(0, imgPath = $$props.imgPath);
    		if ('dummy' in $$props) $$invalidate(1, dummy = $$props.dummy);
    	};

    	$$self.$capture_state = () => ({ imgPath, dummy });

    	$$self.$inject_state = $$props => {
    		if ('imgPath' in $$props) $$invalidate(0, imgPath = $$props.imgPath);
    		if ('dummy' in $$props) $$invalidate(1, dummy = $$props.dummy);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imgPath, dummy];
    }

    class SkillIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { imgPath: 0, dummy: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillIcon",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get imgPath() {
    		throw new Error("<SkillIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgPath(value) {
    		throw new Error("<SkillIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dummy() {
    		throw new Error("<SkillIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dummy(value) {
    		throw new Error("<SkillIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function flipTransition(
        node,
        { delay = 0, flipDuration1 = 1000, flipDuration2 = 1000, ease = (x) => x }
    ) {
        let duration = flipDuration1 + flipDuration2;

        // animation to flip element until it's perpendicular to the screen
        const state1 = (timer) => {
            return `
            transform: rotateY(${-180 + timer * 90}deg);
            perspective: 50rem;
            `;
        };

        // animation to complete flipping element to reveal the content
        const state2 = (timer) => {
            return `
            transform: rotateY(${-90 + timer * 90}deg);
            `;
        };

        return {
            delay,
            duration,
            css: (proportion) => {
                let elapsedTime = ease(proportion) * duration;

                // check if timer is within the first or second part of the animation
                if (elapsedTime < flipDuration1) {
                    return state1(elapsedTime / flipDuration1);
                } else {
                    return state2((elapsedTime - flipDuration1) / flipDuration2);
                }
            },
        };
    }

    /* src\lib\components\app\SkillIcons.svelte generated by Svelte v3.59.1 */
    const file$9 = "src\\lib\\components\\app\\SkillIcons.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (43:20) {#each iconSegment as icon, col}
    function create_each_block_1(ctx) {
    	let div1;
    	let skillicon;
    	let t0;
    	let div0;
    	let t1_value = /*icon*/ ctx[9].name + "";
    	let t1;
    	let div1_intro;
    	let div1_outro;
    	let current;

    	skillicon = new SkillIcon({
    			props: { imgPath: /*icon*/ ctx[9].path },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(skillicon.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			t1 = text(t1_value);
    			attr_dev(div0, "class", "svelte-1d6kl86");
    			add_location(div0, file$9, 54, 28, 2184);
    			attr_dev(div1, "class", "tile svelte-1d6kl86");
    			add_location(div1, file$9, 43, 24, 1675);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(skillicon, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skillicon.$$.fragment, local);

    			add_render_callback(() => {
    				if (!current) return;
    				if (div1_outro) div1_outro.end(1);

    				div1_intro = create_in_transition(div1, flipTransition, {
    					delay: 200 * /*row*/ ctx[8] + 100 * /*col*/ ctx[11],
    					flipDuration1: 400,
    					flipDuration2: 400,
    					ease: easeInOutQuad
    				});

    				div1_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skillicon.$$.fragment, local);
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fade, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(skillicon);
    			if (detaching && div1_outro) div1_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(43:20) {#each iconSegment as icon, col}",
    		ctx
    	});

    	return block;
    }

    // (41:12) {#each iconPaths as iconSegment, row}
    function create_each_block$1(ctx) {
    	let div;
    	let t;
    	let div_transition;
    	let current;
    	let each_value_1 = /*iconSegment*/ ctx[6];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(div, "class", "segment scroll svelte-1d6kl86");
    			add_location(div, file$9, 41, 16, 1531);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div, null);
    				}
    			}

    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*iconPaths*/ 4) {
    				each_value_1 = /*iconSegment*/ ctx[6];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, t);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			add_render_callback(() => {
    				if (!current) return;
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 100 }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 100 }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(41:12) {#each iconPaths as iconSegment, row}",
    		ctx
    	});

    	return block;
    }

    // (38:0) <CreateOnScrollWrapper {...$$restProps} alwaysVisible={pageWidth <= 500}>
    function create_default_slot$1(ctx) {
    	let div1;
    	let div0;
    	let current;
    	let each_value = /*iconPaths*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "wrapper2 svelte-1d6kl86");
    			add_location(div0, file$9, 39, 8, 1440);
    			attr_dev(div1, "class", "wrapper1 svelte-1d6kl86");
    			add_location(div1, file$9, 38, 4, 1408);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div0, null);
    				}
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*iconPaths*/ 4) {
    				each_value = /*iconPaths*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(38:0) <CreateOnScrollWrapper {...$$restProps} alwaysVisible={pageWidth <= 500}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let createonscrollwrapper;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[4]);
    	add_render_callback(/*onwindowresize*/ ctx[5]);

    	const createonscrollwrapper_spread_levels = [
    		/*$$restProps*/ ctx[3],
    		{
    			alwaysVisible: /*pageWidth*/ ctx[0] <= 500
    		}
    	];

    	let createonscrollwrapper_props = {
    		$$slots: { default: [create_default_slot$1] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < createonscrollwrapper_spread_levels.length; i += 1) {
    		createonscrollwrapper_props = assign(createonscrollwrapper_props, createonscrollwrapper_spread_levels[i]);
    	}

    	createonscrollwrapper = new CreateOnScrollWrapper({
    			props: createonscrollwrapper_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(createonscrollwrapper.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(createonscrollwrapper, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[4]();
    					}),
    					listen_dev(window, "resize", /*onwindowresize*/ ctx[5])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scroll*/ 2 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*scroll*/ ctx[1]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			const createonscrollwrapper_changes = (dirty & /*$$restProps, pageWidth*/ 9)
    			? get_spread_update(createonscrollwrapper_spread_levels, [
    					dirty & /*$$restProps*/ 8 && get_spread_object(/*$$restProps*/ ctx[3]),
    					dirty & /*pageWidth*/ 1 && {
    						alwaysVisible: /*pageWidth*/ ctx[0] <= 500
    					}
    				])
    			: {};

    			if (dirty & /*$$scope*/ 4096) {
    				createonscrollwrapper_changes.$$scope = { dirty, ctx };
    			}

    			createonscrollwrapper.$set(createonscrollwrapper_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(createonscrollwrapper.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(createonscrollwrapper.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(createonscrollwrapper, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function easeInOutQuad(x) {
    	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillIcons', slots, []);
    	let pageWidth;
    	let scroll;

    	// paths to icons for technologies
    	let iconPaths = [
    		[
    			{
    				name: "Python",
    				path: "./images/technologies/python-icon.svg"
    			},
    			{
    				name: "Javascript",
    				path: "./images/technologies/javascript-icon.svg"
    			},
    			{
    				name: "Typescript",
    				path: "./images/technologies/typescript-icon.svg"
    			},
    			{
    				name: "Java",
    				path: "./images/technologies/java-icon.svg"
    			}
    		],
    		[
    			{
    				name: "Html",
    				path: "./images/technologies/html-icon.svg"
    			},
    			{
    				name: "CSS",
    				path: "./images/technologies/css-icon.svg"
    			},
    			{
    				name: "Svelte",
    				path: "./images/technologies/svelte-icon.svg"
    			}
    		],
    		[
    			{
    				name: "Git",
    				path: "./images/technologies/git-icon.svg"
    			},
    			{
    				name: "Github",
    				path: "./images/technologies/github-icon.svg"
    			}
    		]
    	];

    	function onwindowscroll() {
    		$$invalidate(1, scroll = window.pageYOffset);
    	}

    	function onwindowresize() {
    		$$invalidate(0, pageWidth = window.innerWidth);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		SkillIcon,
    		flipTransition,
    		CreateOnScrollWrapper,
    		pageWidth,
    		scroll,
    		iconPaths,
    		easeInOutQuad
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('pageWidth' in $$props) $$invalidate(0, pageWidth = $$new_props.pageWidth);
    		if ('scroll' in $$props) $$invalidate(1, scroll = $$new_props.scroll);
    		if ('iconPaths' in $$props) $$invalidate(2, iconPaths = $$new_props.iconPaths);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pageWidth, scroll, iconPaths, $$restProps, onwindowscroll, onwindowresize];
    }

    class SkillIcons extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillIcons",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\lib\components\app\segments\SkillsSegment.svelte generated by Svelte v3.59.1 */
    const file$8 = "src\\lib\\components\\app\\segments\\SkillsSegment.svelte";

    // (30:8) 
    function create_content_slot$2(ctx) {
    	let skillicons;
    	let current;

    	skillicons = new SkillIcons({
    			props: {
    				slot: "content",
    				rectBtmOverride: /*rowBottom*/ ctx[4],
    				rectTopOverride: /*rowTop*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(skillicons.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skillicons, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skillicons_changes = {};
    			if (dirty & /*rowBottom*/ 16) skillicons_changes.rectBtmOverride = /*rowBottom*/ ctx[4];
    			if (dirty & /*rowTop*/ 32) skillicons_changes.rectTopOverride = /*rowTop*/ ctx[5];
    			skillicons.$set(skillicons_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skillicons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skillicons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skillicons, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$2.name,
    		type: "slot",
    		source: "(30:8) ",
    		ctx
    	});

    	return block;
    }

    // (36:8) 
    function create_title_slot$2(ctx) {
    	let div;
    	let h1;
    	let h1_intro;
    	let t1;
    	let h3;
    	let h3_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Skills and Technologies";
    			t1 = space();
    			h3 = element("h3");
    			h3.textContent = "Languages and tools I use";
    			attr_dev(h1, "class", "shrink svelte-1mqwwr6");
    			add_location(h1, file$8, 36, 12, 954);
    			attr_dev(h3, "class", "shrink svelte-1mqwwr6");
    			add_location(h3, file$8, 37, 12, 1025);
    			attr_dev(div, "slot", "title");
    			add_location(div, file$8, 35, 8, 922);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, h3);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, redact, {});
    					h1_intro.start();
    				});
    			}

    			if (!h3_intro) {
    				add_render_callback(() => {
    					h3_intro = create_in_transition(h3, redact, {});
    					h3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot$2.name,
    		type: "slot",
    		source: "(36:8) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div;
    	let splitpagesegment;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[7]);
    	add_render_callback(/*onwindowresize*/ ctx[8]);

    	const splitpagesegment_spread_levels = [
    		/*$$restProps*/ ctx[6],
    		{ id: "skills" },
    		{ rectTopOverride: 100 },
    		{
    			specifiedHeight: /*specifiedHeight*/ ctx[3]
    		}
    	];

    	let splitpagesegment_props = {
    		$$slots: {
    			title: [create_title_slot$2],
    			content: [create_content_slot$2]
    		},
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < splitpagesegment_spread_levels.length; i += 1) {
    		splitpagesegment_props = assign(splitpagesegment_props, splitpagesegment_spread_levels[i]);
    	}

    	splitpagesegment = new SplitPageSegment({
    			props: splitpagesegment_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(splitpagesegment.$$.fragment);
    			attr_dev(div, "class", "outer svelte-1mqwwr6");
    			add_location(div, file$8, 22, 0, 598);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(splitpagesegment, div, null);
    			/*div_binding*/ ctx[9](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[7]();
    					}),
    					listen_dev(window, "resize", /*onwindowresize*/ ctx[8])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*scroll*/ 1 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*scroll*/ ctx[0]);
    				scrolling_timeout = setTimeout(clear_scrolling, 100);
    			}

    			const splitpagesegment_changes = (dirty & /*$$restProps, specifiedHeight*/ 72)
    			? get_spread_update(splitpagesegment_spread_levels, [
    					dirty & /*$$restProps*/ 64 && get_spread_object(/*$$restProps*/ ctx[6]),
    					splitpagesegment_spread_levels[1],
    					splitpagesegment_spread_levels[2],
    					dirty & /*specifiedHeight*/ 8 && {
    						specifiedHeight: /*specifiedHeight*/ ctx[3]
    					}
    				])
    			: {};

    			if (dirty & /*$$scope, rowBottom, rowTop*/ 1072) {
    				splitpagesegment_changes.$$scope = { dirty, ctx };
    			}

    			splitpagesegment.$set(splitpagesegment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(splitpagesegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(splitpagesegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(splitpagesegment);
    			/*div_binding*/ ctx[9](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SkillsSegment', slots, []);
    	let scroll;
    	let pageWidth;
    	let specifiedHeight;
    	let outer;
    	let rowBottom;
    	let rowTop;

    	function onwindowscroll() {
    		$$invalidate(0, scroll = window.pageYOffset);
    	}

    	function onwindowresize() {
    		$$invalidate(1, pageWidth = window.innerWidth);
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			outer = $$value;
    			$$invalidate(2, outer);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({
    		redact,
    		SplitPageSegment,
    		SkillIcons,
    		scroll,
    		pageWidth,
    		specifiedHeight,
    		outer,
    		rowBottom,
    		rowTop
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('scroll' in $$props) $$invalidate(0, scroll = $$new_props.scroll);
    		if ('pageWidth' in $$props) $$invalidate(1, pageWidth = $$new_props.pageWidth);
    		if ('specifiedHeight' in $$props) $$invalidate(3, specifiedHeight = $$new_props.specifiedHeight);
    		if ('outer' in $$props) $$invalidate(2, outer = $$new_props.outer);
    		if ('rowBottom' in $$props) $$invalidate(4, rowBottom = $$new_props.rowBottom);
    		if ('rowTop' in $$props) $$invalidate(5, rowTop = $$new_props.rowTop);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*pageWidth*/ 2) {
    			$$invalidate(3, specifiedHeight = pageWidth <= 900 ? 100 : 100);
    		}

    		if ($$self.$$.dirty & /*scroll, outer*/ 5) {
    			{

    				if (outer != null) {
    					const rect = outer.getBoundingClientRect();
    					$$invalidate(4, rowBottom = rect.bottom);
    					$$invalidate(5, rowTop = rect.top);
    				}
    			}
    		}
    	};

    	return [
    		scroll,
    		pageWidth,
    		outer,
    		specifiedHeight,
    		rowBottom,
    		rowTop,
    		$$restProps,
    		onwindowscroll,
    		onwindowresize,
    		div_binding
    	];
    }

    class SkillsSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillsSegment",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\lib\components\app\segments\ResumeSegment.svelte generated by Svelte v3.59.1 */
    const file$7 = "src\\lib\\components\\app\\segments\\ResumeSegment.svelte";

    // (18:4) 
    function create_title_slot$1(ctx) {
    	let div1;
    	let div0;
    	let h1;
    	let h1_intro;
    	let t1;
    	let h3;
    	let h3_intro;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Resume";
    			t1 = space();
    			h3 = element("h3");
    			h3.textContent = "References available upon request";
    			attr_dev(h1, "class", "shrink svelte-134jown");
    			add_location(h1, file$7, 19, 12, 521);
    			attr_dev(h3, "class", "shrink svelte-134jown");
    			add_location(h3, file$7, 20, 12, 575);
    			attr_dev(div0, "class", "svelte-134jown");
    			add_location(div0, file$7, 18, 8, 502);
    			attr_dev(div1, "class", "title svelte-134jown");
    			attr_dev(div1, "slot", "title");
    			add_location(div1, file$7, 17, 4, 460);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, h3);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, redact, {});
    					h1_intro.start();
    				});
    			}

    			if (!h3_intro) {
    				add_render_callback(() => {
    					h3_intro = create_in_transition(h3, redact, {});
    					h3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot$1.name,
    		type: "slot",
    		source: "(18:4) ",
    		ctx
    	});

    	return block;
    }

    // (52:8) {:else}
    function create_else_block(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_intro;
    	let t;
    	let object;
    	let object_intro;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t = space();
    			object = element("object");
    			attr_dev(img, "class", "icon svelte-134jown");
    			if (!src_url_equal(img.src, img_src_value = "./images/back-icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "embed pdf");
    			set_style(img, "transform", `scale(0.65)`);
    			add_location(img, file$7, 58, 20, 1899);
    			attr_dev(div0, "class", "icon-wrapper svelte-134jown");
    			add_location(div0, file$7, 53, 16, 1723);
    			attr_dev(object, "class", "embed-pdf svelte-134jown");
    			attr_dev(object, "data", "./resume/Test pdf.pdf#zoom=75");
    			attr_dev(object, "type", "application/pdf");
    			attr_dev(object, "title", "Resume");
    			add_location(object, file$7, 67, 16, 2192);
    			attr_dev(div1, "class", "pdf-wrapper svelte-134jown");
    			add_location(div1, file$7, 52, 12, 1680);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div1, t);
    			append_dev(div1, object);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*toggleMode*/ ctx[1], false, false, false, false),
    					listen_dev(div0, "keypress", /*toggleMode*/ ctx[1], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!img_intro) {
    				add_render_callback(() => {
    					img_intro = create_in_transition(img, fade, {});
    					img_intro.start();
    				});
    			}

    			if (!object_intro) {
    				add_render_callback(() => {
    					object_intro = create_in_transition(object, fade, {});
    					object_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(52:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {#if iconMode}
    function create_if_block$2(ctx) {
    	let div1;
    	let a;
    	let img0;
    	let img0_src_value;
    	let img0_intro;
    	let t0;
    	let p0;
    	let t2;
    	let div0;
    	let img1;
    	let img1_src_value;
    	let img1_intro;
    	let t3;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			a = element("a");
    			img0 = element("img");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Download";
    			t2 = space();
    			div0 = element("div");
    			img1 = element("img");
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Embed";
    			attr_dev(img0, "class", "icon svelte-134jown");
    			if (!src_url_equal(img0.src, img0_src_value = "./images/pdf-icon.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "resume");
    			add_location(img0, file$7, 28, 20, 892);
    			attr_dev(p0, "class", "icon-label svelte-134jown");
    			add_location(p0, file$7, 34, 20, 1104);
    			attr_dev(a, "class", "icon-wrapper svelte-134jown");
    			attr_dev(a, "href", "./resume/Test pdf.pdf");
    			attr_dev(a, "download", "");
    			add_location(a, file$7, 27, 16, 808);
    			attr_dev(img1, "class", "icon svelte-134jown");
    			if (!src_url_equal(img1.src, img1_src_value = "./images/expand-icon.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "embed pdf");
    			add_location(img1, file$7, 42, 20, 1356);
    			attr_dev(p1, "class", "icon-label svelte-134jown");
    			add_location(p1, file$7, 48, 20, 1574);
    			attr_dev(div0, "class", "icon-wrapper svelte-134jown");
    			add_location(div0, file$7, 37, 16, 1180);
    			attr_dev(div1, "class", "icon-container svelte-134jown");
    			add_location(div1, file$7, 26, 12, 762);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, a);
    			append_dev(a, img0);
    			append_dev(a, t0);
    			append_dev(a, p0);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, img1);
    			append_dev(div0, t3);
    			append_dev(div0, p1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*toggleMode*/ ctx[1], false, false, false, false),
    					listen_dev(div0, "keypress", /*toggleMode*/ ctx[1], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!img0_intro) {
    				add_render_callback(() => {
    					img0_intro = create_in_transition(img0, fade, {});
    					img0_intro.start();
    				});
    			}

    			if (!img1_intro) {
    				add_render_callback(() => {
    					img1_intro = create_in_transition(img1, fade, {});
    					img1_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(26:8) {#if iconMode}",
    		ctx
    	});

    	return block;
    }

    // (25:4) 
    function create_content_slot$1(ctx) {
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*iconMode*/ ctx[0]) return create_if_block$2;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "content-container svelte-134jown");
    			attr_dev(div, "slot", "content");
    			add_location(div, file$7, 24, 4, 678);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			transition_in(if_block);
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot$1.name,
    		type: "slot",
    		source: "(25:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let splitpagesegment;
    	let current;

    	const splitpagesegment_spread_levels = [
    		/*$$restProps*/ ctx[2],
    		{ id: "resume" },
    		{ topLimitDestroy: 0.1 },
    		{ topLimitCreate: 0.1 },
    		{ btmLimitDestroy: 0.2 },
    		{ btmLimitCreate: 0.2 }
    	];

    	let splitpagesegment_props = {
    		$$slots: {
    			content: [create_content_slot$1],
    			title: [create_title_slot$1]
    		},
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < splitpagesegment_spread_levels.length; i += 1) {
    		splitpagesegment_props = assign(splitpagesegment_props, splitpagesegment_spread_levels[i]);
    	}

    	splitpagesegment = new SplitPageSegment({
    			props: splitpagesegment_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(splitpagesegment.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(splitpagesegment, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const splitpagesegment_changes = (dirty & /*$$restProps*/ 4)
    			? get_spread_update(splitpagesegment_spread_levels, [
    					get_spread_object(/*$$restProps*/ ctx[2]),
    					splitpagesegment_spread_levels[1],
    					splitpagesegment_spread_levels[2],
    					splitpagesegment_spread_levels[3],
    					splitpagesegment_spread_levels[4],
    					splitpagesegment_spread_levels[5]
    				])
    			: {};

    			if (dirty & /*$$scope, iconMode*/ 9) {
    				splitpagesegment_changes.$$scope = { dirty, ctx };
    			}

    			splitpagesegment.$set(splitpagesegment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(splitpagesegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(splitpagesegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(splitpagesegment, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ResumeSegment', slots, []);
    	let iconMode = true;

    	const toggleMode = () => {
    		$$invalidate(0, iconMode = !iconMode);
    	};

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		redact,
    		SplitPageSegment,
    		iconMode,
    		toggleMode
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('iconMode' in $$props) $$invalidate(0, iconMode = $$new_props.iconMode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [iconMode, toggleMode, $$restProps];
    }

    class ResumeSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ResumeSegment",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\lib\components\generic\Modal.svelte generated by Svelte v3.59.1 */

    const file$6 = "src\\lib\\components\\generic\\Modal.svelte";

    // (5:0) {#if visible}
    function create_if_block$1(ctx) {
    	let div1;
    	let div0;
    	let img;
    	let img_src_value;
    	let t;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t = space();
    			if (default_slot) default_slot.c();
    			if (!src_url_equal(img.src, img_src_value = "./images/close-icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "close");
    			attr_dev(img, "class", "close-btn svelte-bln8q3");
    			add_location(img, file$6, 7, 12, 140);
    			attr_dev(div0, "class", "modal svelte-bln8q3");
    			add_location(div0, file$6, 6, 8, 107);
    			attr_dev(div1, "class", "backdrop svelte-bln8q3");
    			add_location(div1, file$6, 5, 4, 75);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, img);
    			append_dev(div0, t);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(img, "click", /*click_handler*/ ctx[3], false, false, false, false),
    					listen_dev(img, "keypress", /*keypress_handler*/ ctx[4], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(5:0) {#if visible}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*visible*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*visible*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*visible*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default']);
    	let { visible = false } = $$props;
    	const writable_props = ['visible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ visible });

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible, $$scope, slots, click_handler, keypress_handler];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { visible: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get visible() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\generic\PortfolioModal.svelte generated by Svelte v3.59.1 */
    const file$5 = "src\\lib\\components\\generic\\PortfolioModal.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (19:16) {#each tags as tag}
    function create_each_block(ctx) {
    	let div;
    	let t_value = /*tag*/ ctx[8] + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "svelte-14f2u0d");
    			add_location(div, file$5, 19, 20, 594);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tags*/ 32 && t_value !== (t_value = /*tag*/ ctx[8] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(19:16) {#each tags as tag}",
    		ctx
    	});

    	return block;
    }

    // (10:0) <Modal {...$$restProps} on:click>
    function create_default_slot(ctx) {
    	let div5;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div4;
    	let h2;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let h3;
    	let t5;
    	let div2;
    	let t6;
    	let t7;
    	let div3;
    	let a0;
    	let button0;
    	let img1;
    	let img1_src_value;
    	let t8;
    	let p0;
    	let t10;
    	let a1;
    	let button1;
    	let img2;
    	let img2_src_value;
    	let t11;
    	let p1;
    	let each_value = /*tags*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div4 = element("div");
    			h2 = element("h2");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			h3 = element("h3");
    			h3.textContent = "About";
    			t5 = space();
    			div2 = element("div");
    			t6 = text(/*description*/ ctx[1]);
    			t7 = space();
    			div3 = element("div");
    			a0 = element("a");
    			button0 = element("button");
    			img1 = element("img");
    			t8 = space();
    			p0 = element("p");
    			p0.textContent = "Code";
    			t10 = space();
    			a1 = element("a");
    			button1 = element("button");
    			img2 = element("img");
    			t11 = space();
    			p1 = element("p");
    			p1.textContent = "Live Demo";
    			attr_dev(img0, "class", "modal-visual svelte-14f2u0d");
    			if (!src_url_equal(img0.src, img0_src_value = /*modalVisualPath*/ ctx[2])) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "portfolio");
    			add_location(img0, file$5, 12, 12, 339);
    			attr_dev(div0, "class", "modal-visual-wrapper svelte-14f2u0d");
    			add_location(div0, file$5, 11, 8, 291);
    			attr_dev(h2, "class", "title svelte-14f2u0d");
    			add_location(h2, file$5, 15, 12, 471);
    			attr_dev(div1, "class", "tags svelte-14f2u0d");
    			add_location(div1, file$5, 17, 12, 517);
    			attr_dev(h3, "class", "about svelte-14f2u0d");
    			add_location(h3, file$5, 23, 12, 671);
    			attr_dev(div2, "class", "description scroll svelte-14f2u0d");
    			add_location(div2, file$5, 25, 12, 715);
    			if (!src_url_equal(img1.src, img1_src_value = "./images/code-icon.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "code icon");
    			attr_dev(img1, "class", "svelte-14f2u0d");
    			add_location(img1, file$5, 32, 24, 969);
    			attr_dev(p0, "class", "svelte-14f2u0d");
    			add_location(p0, file$5, 33, 24, 1047);
    			attr_dev(button0, "class", "svelte-14f2u0d");
    			add_location(button0, file$5, 31, 20, 935);
    			attr_dev(a0, "class", "button-wrapper svelte-14f2u0d");
    			attr_dev(a0, "href", /*githubLink*/ ctx[4]);
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$5, 30, 16, 853);
    			if (!src_url_equal(img2.src, img2_src_value = "./images/live-icon.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "code icon");
    			attr_dev(img2, "class", "svelte-14f2u0d");
    			add_location(img2, file$5, 38, 24, 1243);
    			attr_dev(p1, "class", "svelte-14f2u0d");
    			add_location(p1, file$5, 39, 24, 1321);
    			attr_dev(button1, "class", "svelte-14f2u0d");
    			add_location(button1, file$5, 37, 20, 1209);
    			attr_dev(a1, "class", "button-wrapper svelte-14f2u0d");
    			attr_dev(a1, "href", /*liveLink*/ ctx[3]);
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$5, 36, 16, 1129);
    			attr_dev(div3, "class", "buttons svelte-14f2u0d");
    			add_location(div3, file$5, 29, 12, 814);
    			attr_dev(div4, "class", "text-wrapper svelte-14f2u0d");
    			add_location(div4, file$5, 14, 8, 431);
    			attr_dev(div5, "class", "modal-wrapper svelte-14f2u0d");
    			add_location(div5, file$5, 10, 4, 254);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, img0);
    			append_dev(div5, t0);
    			append_dev(div5, div4);
    			append_dev(div4, h2);
    			append_dev(h2, t1);
    			append_dev(div4, t2);
    			append_dev(div4, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(div1, null);
    				}
    			}

    			append_dev(div4, t3);
    			append_dev(div4, h3);
    			append_dev(div4, t5);
    			append_dev(div4, div2);
    			append_dev(div2, t6);
    			append_dev(div4, t7);
    			append_dev(div4, div3);
    			append_dev(div3, a0);
    			append_dev(a0, button0);
    			append_dev(button0, img1);
    			append_dev(button0, t8);
    			append_dev(button0, p0);
    			append_dev(div3, t10);
    			append_dev(div3, a1);
    			append_dev(a1, button1);
    			append_dev(button1, img2);
    			append_dev(button1, t11);
    			append_dev(button1, p1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*modalVisualPath*/ 4 && !src_url_equal(img0.src, img0_src_value = /*modalVisualPath*/ ctx[2])) {
    				attr_dev(img0, "src", img0_src_value);
    			}

    			if (dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);

    			if (dirty & /*tags*/ 32) {
    				each_value = /*tags*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*description*/ 2) set_data_dev(t6, /*description*/ ctx[1]);

    			if (dirty & /*githubLink*/ 16) {
    				attr_dev(a0, "href", /*githubLink*/ ctx[4]);
    			}

    			if (dirty & /*liveLink*/ 8) {
    				attr_dev(a1, "href", /*liveLink*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(10:0) <Modal {...$$restProps} on:click>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let modal;
    	let current;
    	const modal_spread_levels = [/*$$restProps*/ ctx[6]];

    	let modal_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < modal_spread_levels.length; i += 1) {
    		modal_props = assign(modal_props, modal_spread_levels[i]);
    	}

    	modal = new Modal({ props: modal_props, $$inline: true });
    	modal.$on("click", /*click_handler*/ ctx[7]);

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const modal_changes = (dirty & /*$$restProps*/ 64)
    			? get_spread_update(modal_spread_levels, [get_spread_object(/*$$restProps*/ ctx[6])])
    			: {};

    			if (dirty & /*$$scope, liveLink, githubLink, description, tags, title, modalVisualPath*/ 2111) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const omit_props_names = ["title","description","modalVisualPath","liveLink","githubLink","tags"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PortfolioModal', slots, []);
    	let { title } = $$props;
    	let { description } = $$props;
    	let { modalVisualPath = "" } = $$props;
    	let { liveLink } = $$props;
    	let { githubLink } = $$props;
    	let { tags = [] } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (title === undefined && !('title' in $$props || $$self.$$.bound[$$self.$$.props['title']])) {
    			console.warn("<PortfolioModal> was created without expected prop 'title'");
    		}

    		if (description === undefined && !('description' in $$props || $$self.$$.bound[$$self.$$.props['description']])) {
    			console.warn("<PortfolioModal> was created without expected prop 'description'");
    		}

    		if (liveLink === undefined && !('liveLink' in $$props || $$self.$$.bound[$$self.$$.props['liveLink']])) {
    			console.warn("<PortfolioModal> was created without expected prop 'liveLink'");
    		}

    		if (githubLink === undefined && !('githubLink' in $$props || $$self.$$.bound[$$self.$$.props['githubLink']])) {
    			console.warn("<PortfolioModal> was created without expected prop 'githubLink'");
    		}
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('title' in $$new_props) $$invalidate(0, title = $$new_props.title);
    		if ('description' in $$new_props) $$invalidate(1, description = $$new_props.description);
    		if ('modalVisualPath' in $$new_props) $$invalidate(2, modalVisualPath = $$new_props.modalVisualPath);
    		if ('liveLink' in $$new_props) $$invalidate(3, liveLink = $$new_props.liveLink);
    		if ('githubLink' in $$new_props) $$invalidate(4, githubLink = $$new_props.githubLink);
    		if ('tags' in $$new_props) $$invalidate(5, tags = $$new_props.tags);
    	};

    	$$self.$capture_state = () => ({
    		Modal,
    		title,
    		description,
    		modalVisualPath,
    		liveLink,
    		githubLink,
    		tags
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('title' in $$props) $$invalidate(0, title = $$new_props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$new_props.description);
    		if ('modalVisualPath' in $$props) $$invalidate(2, modalVisualPath = $$new_props.modalVisualPath);
    		if ('liveLink' in $$props) $$invalidate(3, liveLink = $$new_props.liveLink);
    		if ('githubLink' in $$props) $$invalidate(4, githubLink = $$new_props.githubLink);
    		if ('tags' in $$props) $$invalidate(5, tags = $$new_props.tags);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		description,
    		modalVisualPath,
    		liveLink,
    		githubLink,
    		tags,
    		$$restProps,
    		click_handler
    	];
    }

    class PortfolioModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			title: 0,
    			description: 1,
    			modalVisualPath: 2,
    			liveLink: 3,
    			githubLink: 4,
    			tags: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PortfolioModal",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get title() {
    		throw new Error("<PortfolioModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<PortfolioModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<PortfolioModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<PortfolioModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get modalVisualPath() {
    		throw new Error("<PortfolioModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set modalVisualPath(value) {
    		throw new Error("<PortfolioModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get liveLink() {
    		throw new Error("<PortfolioModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set liveLink(value) {
    		throw new Error("<PortfolioModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get githubLink() {
    		throw new Error("<PortfolioModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set githubLink(value) {
    		throw new Error("<PortfolioModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tags() {
    		throw new Error("<PortfolioModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tags(value) {
    		throw new Error("<PortfolioModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\generic\PortfolioTile.svelte generated by Svelte v3.59.1 */
    const file$4 = "src\\lib\\components\\generic\\PortfolioTile.svelte";

    // (40:16) {#if githubLink != null}
    function create_if_block_1(ctx) {
    	let a;
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			attr_dev(img, "class", "link-img svelte-bduu48");
    			if (!src_url_equal(img.src, img_src_value = "./images/github-white-icon.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "github");
    			add_location(img, file$4, 45, 24, 1133);
    			attr_dev(a, "href", /*githubLink*/ ctx[3]);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "svelte-bduu48");
    			add_location(a, file$4, 40, 20, 948);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", stop_propagation(/*click_handler*/ ctx[10]), false, false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*githubLink*/ 8) {
    				attr_dev(a, "href", /*githubLink*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(40:16) {#if githubLink != null}",
    		ctx
    	});

    	return block;
    }

    // (54:16) {#if liveLink != null}
    function create_if_block(ctx) {
    	let a;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			a = element("a");
    			button = element("button");
    			button.textContent = "Live Demo";
    			attr_dev(button, "class", "svelte-bduu48");
    			add_location(button, file$4, 60, 24, 1663);
    			attr_dev(a, "class", "button-wrapper svelte-bduu48");
    			attr_dev(a, "href", /*liveLink*/ ctx[4]);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$4, 54, 20, 1432);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, button);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", stop_propagation(/*click_handler_1*/ ctx[9]), false, false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*liveLink*/ 16) {
    				attr_dev(a, "href", /*liveLink*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(54:16) {#if liveLink != null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let portfoliomodal;
    	let t0;
    	let div4;
    	let div3;
    	let img;
    	let img_src_value;
    	let t1;
    	let div2;
    	let div0;
    	let h3;
    	let t2;
    	let t3;
    	let div1;
    	let t4;
    	let current;
    	let mounted;
    	let dispose;

    	const portfoliomodal_spread_levels = [
    		{ visible: /*showModal*/ ctx[5] },
    		{ title: /*title*/ ctx[0] },
    		{ description: /*description*/ ctx[1] },
    		{ liveLink: /*liveLink*/ ctx[4] },
    		{ githubLink: /*githubLink*/ ctx[3] },
    		/*$$restProps*/ ctx[8]
    	];

    	let portfoliomodal_props = {};

    	for (let i = 0; i < portfoliomodal_spread_levels.length; i += 1) {
    		portfoliomodal_props = assign(portfoliomodal_props, portfoliomodal_spread_levels[i]);
    	}

    	portfoliomodal = new PortfolioModal({
    			props: portfoliomodal_props,
    			$$inline: true
    		});

    	portfoliomodal.$on("click", /*closeModal*/ ctx[7]);
    	let if_block0 = /*githubLink*/ ctx[3] != null && create_if_block_1(ctx);
    	let if_block1 = /*liveLink*/ ctx[4] != null && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			create_component(portfoliomodal.$$.fragment);
    			t0 = space();
    			div4 = element("div");
    			div3 = element("div");
    			img = element("img");
    			t1 = space();
    			div2 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			t2 = text(/*title*/ ctx[0]);
    			t3 = space();
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(img, "class", "image svelte-bduu48");
    			if (!src_url_equal(img.src, img_src_value = /*imagePath*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "portfolio");
    			add_location(img, file$4, 27, 8, 568);
    			attr_dev(h3, "class", "svelte-bduu48");
    			add_location(h3, file$4, 35, 16, 813);
    			attr_dev(div0, "class", "title svelte-bduu48");
    			add_location(div0, file$4, 34, 12, 776);
    			attr_dev(div1, "class", "links svelte-bduu48");
    			add_location(div1, file$4, 38, 12, 865);
    			attr_dev(div2, "class", "text-container dimmer svelte-bduu48");
    			add_location(div2, file$4, 29, 8, 633);
    			attr_dev(div3, "class", "tile svelte-bduu48");
    			add_location(div3, file$4, 26, 4, 540);
    			attr_dev(div4, "class", "tile-wrapper svelte-bduu48");
    			add_location(div4, file$4, 25, 0, 508);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(portfoliomodal, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, img);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, h3);
    			append_dev(h3, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t4);
    			if (if_block1) if_block1.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div2, "click", /*openModal*/ ctx[6], false, false, false, false),
    					listen_dev(div2, "keypress", /*openModal*/ ctx[6], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const portfoliomodal_changes = (dirty & /*showModal, title, description, liveLink, githubLink, $$restProps*/ 315)
    			? get_spread_update(portfoliomodal_spread_levels, [
    					dirty & /*showModal*/ 32 && { visible: /*showModal*/ ctx[5] },
    					dirty & /*title*/ 1 && { title: /*title*/ ctx[0] },
    					dirty & /*description*/ 2 && { description: /*description*/ ctx[1] },
    					dirty & /*liveLink*/ 16 && { liveLink: /*liveLink*/ ctx[4] },
    					dirty & /*githubLink*/ 8 && { githubLink: /*githubLink*/ ctx[3] },
    					dirty & /*$$restProps*/ 256 && get_spread_object(/*$$restProps*/ ctx[8])
    				])
    			: {};

    			portfoliomodal.$set(portfoliomodal_changes);

    			if (!current || dirty & /*imagePath*/ 4 && !src_url_equal(img.src, img_src_value = /*imagePath*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*title*/ 1) set_data_dev(t2, /*title*/ ctx[0]);

    			if (/*githubLink*/ ctx[3] != null) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					if_block0.m(div1, t4);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*liveLink*/ ctx[4] != null) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(portfoliomodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(portfoliomodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(portfoliomodal, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div4);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	const omit_props_names = ["title","description","imagePath","githubLink","liveLink"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PortfolioTile', slots, []);
    	let { title = "" } = $$props;
    	let { description = "" } = $$props;
    	let { imagePath } = $$props;
    	let { githubLink } = $$props;
    	let { liveLink } = $$props;
    	let showModal = false;

    	const openModal = e => {
    		$$invalidate(5, showModal = true);
    	};

    	const closeModal = e => {
    		$$invalidate(5, showModal = false);
    	};

    	$$self.$$.on_mount.push(function () {
    		if (imagePath === undefined && !('imagePath' in $$props || $$self.$$.bound[$$self.$$.props['imagePath']])) {
    			console.warn("<PortfolioTile> was created without expected prop 'imagePath'");
    		}

    		if (githubLink === undefined && !('githubLink' in $$props || $$self.$$.bound[$$self.$$.props['githubLink']])) {
    			console.warn("<PortfolioTile> was created without expected prop 'githubLink'");
    		}

    		if (liveLink === undefined && !('liveLink' in $$props || $$self.$$.bound[$$self.$$.props['liveLink']])) {
    			console.warn("<PortfolioTile> was created without expected prop 'liveLink'");
    		}
    	});

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('title' in $$new_props) $$invalidate(0, title = $$new_props.title);
    		if ('description' in $$new_props) $$invalidate(1, description = $$new_props.description);
    		if ('imagePath' in $$new_props) $$invalidate(2, imagePath = $$new_props.imagePath);
    		if ('githubLink' in $$new_props) $$invalidate(3, githubLink = $$new_props.githubLink);
    		if ('liveLink' in $$new_props) $$invalidate(4, liveLink = $$new_props.liveLink);
    	};

    	$$self.$capture_state = () => ({
    		PortfolioModal,
    		title,
    		description,
    		imagePath,
    		githubLink,
    		liveLink,
    		showModal,
    		openModal,
    		closeModal
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('title' in $$props) $$invalidate(0, title = $$new_props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$new_props.description);
    		if ('imagePath' in $$props) $$invalidate(2, imagePath = $$new_props.imagePath);
    		if ('githubLink' in $$props) $$invalidate(3, githubLink = $$new_props.githubLink);
    		if ('liveLink' in $$props) $$invalidate(4, liveLink = $$new_props.liveLink);
    		if ('showModal' in $$props) $$invalidate(5, showModal = $$new_props.showModal);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		title,
    		description,
    		imagePath,
    		githubLink,
    		liveLink,
    		showModal,
    		openModal,
    		closeModal,
    		$$restProps,
    		click_handler_1,
    		click_handler
    	];
    }

    class PortfolioTile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			title: 0,
    			description: 1,
    			imagePath: 2,
    			githubLink: 3,
    			liveLink: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PortfolioTile",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get title() {
    		throw new Error("<PortfolioTile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<PortfolioTile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<PortfolioTile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<PortfolioTile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get imagePath() {
    		throw new Error("<PortfolioTile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imagePath(value) {
    		throw new Error("<PortfolioTile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get githubLink() {
    		throw new Error("<PortfolioTile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set githubLink(value) {
    		throw new Error("<PortfolioTile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get liveLink() {
    		throw new Error("<PortfolioTile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set liveLink(value) {
    		throw new Error("<PortfolioTile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\app\PortfolioTiles\FroggerTile.svelte generated by Svelte v3.59.1 */

    function create_fragment$5(ctx) {
    	let portfoliotile;
    	let current;

    	portfoliotile = new PortfolioTile({
    			props: {
    				title: "Observables Frogger",
    				description: description$1,
    				imagePath: "./images/portfolio/frogger.png",
    				githubLink: "https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin",
    				liveLink: "https://youtube.com",
    				modalVisualPath: "./images/portfolio/frogger.png",
    				tags: /*tags*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(portfoliotile.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(portfoliotile, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(portfoliotile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(portfoliotile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(portfoliotile, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const description$1 = "A recreation of the classic arcade game Frogger. This project was implemented using a functional reactive programming (FRP) style, focusing heavily on the use of RxJS observables to trigger and react to game events such as spawning cars using pure functions and all side effects centralised in a single location in the code.";

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FroggerTile', slots, []);
    	const tags = ["Typescript", "Javascript", "RxJS", "Observables"];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FroggerTile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PortfolioTile, description: description$1, tags });
    	return [tags];
    }

    class FroggerTile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FroggerTile",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\lib\components\app\PortfolioTiles\PlantumlTile.svelte generated by Svelte v3.59.1 */

    function create_fragment$4(ctx) {
    	let portfoliotile;
    	let current;

    	portfoliotile = new PortfolioTile({
    			props: {
    				title: "IntelliJ IDEA PlantUML Generator Plugin",
    				description,
    				imagePath: "./images/portfolio/frogger.png",
    				modalVisualPath: "./images/portfolio/frogger.png",
    				githubLink: "https://github.com/ImHamba/Intellij-Plantuml-Generator-Plugin",
    				liveLink: "https://youtube.com",
    				tags: /*tags*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(portfoliotile.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(portfoliotile, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(portfoliotile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(portfoliotile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(portfoliotile, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const description = "An IntelliJ IDE plugin to automatically generate PlantUML syntax from a Java project.";

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PlantumlTile', slots, []);
    	const tags = ["Java", "OOP", "Plugin"];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PlantumlTile> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PortfolioTile, description, tags });
    	return [tags];
    }

    class PlantumlTile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PlantumlTile",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\lib\components\app\segments\PortfolioSegment.svelte generated by Svelte v3.59.1 */
    const file$3 = "src\\lib\\components\\app\\segments\\PortfolioSegment.svelte";

    // (10:4) 
    function create_content_slot(ctx) {
    	let div;
    	let froggertile;
    	let t0;
    	let plantumltile0;
    	let t1;
    	let plantumltile1;
    	let t2;
    	let plantumltile2;
    	let current;
    	froggertile = new FroggerTile({ $$inline: true });
    	plantumltile0 = new PlantumlTile({ $$inline: true });
    	plantumltile1 = new PlantumlTile({ $$inline: true });
    	plantumltile2 = new PlantumlTile({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(froggertile.$$.fragment);
    			t0 = space();
    			create_component(plantumltile0.$$.fragment);
    			t1 = space();
    			create_component(plantumltile1.$$.fragment);
    			t2 = space();
    			create_component(plantumltile2.$$.fragment);
    			attr_dev(div, "class", "tile-container svelte-1t5qzwl");
    			attr_dev(div, "slot", "content");
    			add_location(div, file$3, 9, 4, 430);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(froggertile, div, null);
    			append_dev(div, t0);
    			mount_component(plantumltile0, div, null);
    			append_dev(div, t1);
    			mount_component(plantumltile1, div, null);
    			append_dev(div, t2);
    			mount_component(plantumltile2, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(froggertile.$$.fragment, local);
    			transition_in(plantumltile0.$$.fragment, local);
    			transition_in(plantumltile1.$$.fragment, local);
    			transition_in(plantumltile2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(froggertile.$$.fragment, local);
    			transition_out(plantumltile0.$$.fragment, local);
    			transition_out(plantumltile1.$$.fragment, local);
    			transition_out(plantumltile2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(froggertile);
    			destroy_component(plantumltile0);
    			destroy_component(plantumltile1);
    			destroy_component(plantumltile2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_content_slot.name,
    		type: "slot",
    		source: "(10:4) ",
    		ctx
    	});

    	return block;
    }

    // (17:4) 
    function create_title_slot(ctx) {
    	let div;
    	let h1;
    	let h1_intro;
    	let t1;
    	let h3;
    	let h3_intro;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Portfolio";
    			t1 = space();
    			h3 = element("h3");
    			h3.textContent = "All project source code can be found on Github";
    			attr_dev(h1, "class", "shrink svelte-1t5qzwl");
    			add_location(h1, file$3, 17, 8, 624);
    			attr_dev(h3, "class", "shrink svelte-1t5qzwl");
    			add_location(h3, file$3, 18, 8, 677);
    			attr_dev(div, "slot", "title");
    			add_location(div, file$3, 16, 4, 596);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, h3);
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, redact, {});
    					h1_intro.start();
    				});
    			}

    			if (!h3_intro) {
    				add_render_callback(() => {
    					h3_intro = create_in_transition(h3, redact, {});
    					h3_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot.name,
    		type: "slot",
    		source: "(17:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let splitpagesegment;
    	let current;
    	const splitpagesegment_spread_levels = [/*$$restProps*/ ctx[0], { id: "portfolio" }];

    	let splitpagesegment_props = {
    		$$slots: {
    			title: [create_title_slot],
    			content: [create_content_slot]
    		},
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < splitpagesegment_spread_levels.length; i += 1) {
    		splitpagesegment_props = assign(splitpagesegment_props, splitpagesegment_spread_levels[i]);
    	}

    	splitpagesegment = new SplitPageSegment({
    			props: splitpagesegment_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(splitpagesegment.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(splitpagesegment, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const splitpagesegment_changes = (dirty & /*$$restProps*/ 1)
    			? get_spread_update(splitpagesegment_spread_levels, [
    					get_spread_object(/*$$restProps*/ ctx[0]),
    					splitpagesegment_spread_levels[1]
    				])
    			: {};

    			if (dirty & /*$$scope*/ 2) {
    				splitpagesegment_changes.$$scope = { dirty, ctx };
    			}

    			splitpagesegment.$set(splitpagesegment_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(splitpagesegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(splitpagesegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(splitpagesegment, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PortfolioSegment', slots, []);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({
    		redact,
    		PortfolioTile,
    		SplitPageSegment,
    		FroggerTile,
    		PlantumlTile
    	});

    	return [$$restProps];
    }

    class PortfolioSegment extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PortfolioSegment",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\lib\components\generic\IconLink.svelte generated by Svelte v3.59.1 */

    const file$2 = "src\\lib\\components\\generic\\IconLink.svelte";

    function create_fragment$2(ctx) {
    	let a;
    	let img;
    	let img_src_value;
    	let a_target_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*imgPath*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "icon");
    			attr_dev(img, "class", "svelte-oqm9cn");
    			add_location(img, file$2, 13, 4, 273);
    			attr_dev(a, "class", "icon svelte-oqm9cn");
    			attr_dev(a, "href", /*link*/ ctx[1]);
    			attr_dev(a, "target", a_target_value = /*openInNewTab*/ ctx[2] ? "_blank" : null);
    			attr_dev(a, "title", /*description*/ ctx[3]);
    			add_location(a, file$2, 7, 0, 157);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imgPath*/ 1 && !src_url_equal(img.src, img_src_value = /*imgPath*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*link*/ 2) {
    				attr_dev(a, "href", /*link*/ ctx[1]);
    			}

    			if (dirty & /*openInNewTab*/ 4 && a_target_value !== (a_target_value = /*openInNewTab*/ ctx[2] ? "_blank" : null)) {
    				attr_dev(a, "target", a_target_value);
    			}

    			if (dirty & /*description*/ 8) {
    				attr_dev(a, "title", /*description*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconLink', slots, []);
    	let { imgPath = null } = $$props;
    	let { link = null } = $$props;
    	let { openInNewTab = true } = $$props;
    	let { description = null } = $$props;
    	const writable_props = ['imgPath', 'link', 'openInNewTab', 'description'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconLink> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('imgPath' in $$props) $$invalidate(0, imgPath = $$props.imgPath);
    		if ('link' in $$props) $$invalidate(1, link = $$props.link);
    		if ('openInNewTab' in $$props) $$invalidate(2, openInNewTab = $$props.openInNewTab);
    		if ('description' in $$props) $$invalidate(3, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({ imgPath, link, openInNewTab, description });

    	$$self.$inject_state = $$props => {
    		if ('imgPath' in $$props) $$invalidate(0, imgPath = $$props.imgPath);
    		if ('link' in $$props) $$invalidate(1, link = $$props.link);
    		if ('openInNewTab' in $$props) $$invalidate(2, openInNewTab = $$props.openInNewTab);
    		if ('description' in $$props) $$invalidate(3, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imgPath, link, openInNewTab, description];
    }

    class IconLink extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			imgPath: 0,
    			link: 1,
    			openInNewTab: 2,
    			description: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconLink",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get imgPath() {
    		throw new Error("<IconLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgPath(value) {
    		throw new Error("<IconLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<IconLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<IconLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get openInNewTab() {
    		throw new Error("<IconLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set openInNewTab(value) {
    		throw new Error("<IconLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<IconLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<IconLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\lib\components\app\IconLinks.svelte generated by Svelte v3.59.1 */
    const file$1 = "src\\lib\\components\\app\\IconLinks.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let iconlink0;
    	let t0;
    	let iconlink1;
    	let t1;
    	let iconlink2;
    	let t2;
    	let iconlink3;
    	let t3;
    	let iconlink4;
    	let current;

    	iconlink0 = new IconLink({
    			props: {
    				imgPath: "./images/up-icon.svg",
    				link: "#home",
    				openInNewTab: false
    			},
    			$$inline: true
    		});

    	iconlink1 = new IconLink({
    			props: {
    				imgPath: "./images/github-mark.svg",
    				link: "https://github.com/ImHamba",
    				description: "Github"
    			},
    			$$inline: true
    		});

    	iconlink2 = new IconLink({
    			props: {
    				imgPath: "./images/linkedin-icon.svg",
    				link: "https://www.linkedin.com/in/dennis-rigon-68aa521a5/",
    				description: "LinkedIn"
    			},
    			$$inline: true
    		});

    	iconlink3 = new IconLink({
    			props: {
    				imgPath: "./images/email-icon.svg",
    				link: "mailto:dennisrigondr@gmail.com",
    				description: "Email"
    			},
    			$$inline: true
    		});

    	iconlink4 = new IconLink({
    			props: {
    				imgPath: "./images/document-icon.svg",
    				link: "./resume/Test pdf.pdf",
    				description: "Resume"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(iconlink0.$$.fragment);
    			t0 = space();
    			create_component(iconlink1.$$.fragment);
    			t1 = space();
    			create_component(iconlink2.$$.fragment);
    			t2 = space();
    			create_component(iconlink3.$$.fragment);
    			t3 = space();
    			create_component(iconlink4.$$.fragment);
    			attr_dev(div, "class", "icon-links svelte-wpusdv");
    			add_location(div, file$1, 4, 0, 79);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(iconlink0, div, null);
    			append_dev(div, t0);
    			mount_component(iconlink1, div, null);
    			append_dev(div, t1);
    			mount_component(iconlink2, div, null);
    			append_dev(div, t2);
    			mount_component(iconlink3, div, null);
    			append_dev(div, t3);
    			mount_component(iconlink4, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconlink0.$$.fragment, local);
    			transition_in(iconlink1.$$.fragment, local);
    			transition_in(iconlink2.$$.fragment, local);
    			transition_in(iconlink3.$$.fragment, local);
    			transition_in(iconlink4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconlink0.$$.fragment, local);
    			transition_out(iconlink1.$$.fragment, local);
    			transition_out(iconlink2.$$.fragment, local);
    			transition_out(iconlink3.$$.fragment, local);
    			transition_out(iconlink4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(iconlink0);
    			destroy_component(iconlink1);
    			destroy_component(iconlink2);
    			destroy_component(iconlink3);
    			destroy_component(iconlink4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconLinks', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconLinks> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ IconLink });
    	return [];
    }

    class IconLinks extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconLinks",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.1 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let meta;
    	let t0;
    	let main;
    	let div;
    	let navbar;
    	let t1;
    	let iconlinks;
    	let t2;
    	let landingsegment;
    	let t3;
    	let aboutsegment;
    	let t4;
    	let skillssegment;
    	let t5;
    	let portfoliosegment;
    	let t6;
    	let resumesegment;
    	let t7;
    	let contactsegment;
    	let current;
    	navbar = new NavBar({ $$inline: true });
    	iconlinks = new IconLinks({ $$inline: true });
    	landingsegment = new LandingSegment({ $$inline: true });
    	aboutsegment = new AboutSegment({ props: { number: "01" }, $$inline: true });
    	skillssegment = new SkillsSegment({ props: { number: "02" }, $$inline: true });
    	portfoliosegment = new PortfolioSegment({ props: { number: "03" }, $$inline: true });
    	resumesegment = new ResumeSegment({ props: { number: "04" }, $$inline: true });
    	contactsegment = new ContactSegment({ $$inline: true });

    	const block = {
    		c: function create() {
    			meta = element("meta");
    			t0 = space();
    			main = element("main");
    			div = element("div");
    			create_component(navbar.$$.fragment);
    			t1 = space();
    			create_component(iconlinks.$$.fragment);
    			t2 = space();
    			create_component(landingsegment.$$.fragment);
    			t3 = space();
    			create_component(aboutsegment.$$.fragment);
    			t4 = space();
    			create_component(skillssegment.$$.fragment);
    			t5 = space();
    			create_component(portfoliosegment.$$.fragment);
    			t6 = space();
    			create_component(resumesegment.$$.fragment);
    			t7 = space();
    			create_component(contactsegment.$$.fragment);
    			attr_dev(meta, "name", "viewport");
    			attr_dev(meta, "content", "width=device-width, initial-scale=1.0");
    			add_location(meta, file, 15, 0, 796);
    			attr_dev(div, "class", "navbar-bound svelte-n3ppvq");
    			add_location(div, file, 17, 4, 882);
    			attr_dev(main, "class", "svelte-n3ppvq");
    			add_location(main, file, 16, 0, 870);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, meta, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			mount_component(navbar, div, null);
    			append_dev(main, t1);
    			mount_component(iconlinks, main, null);
    			append_dev(main, t2);
    			mount_component(landingsegment, main, null);
    			append_dev(main, t3);
    			mount_component(aboutsegment, main, null);
    			append_dev(main, t4);
    			mount_component(skillssegment, main, null);
    			append_dev(main, t5);
    			mount_component(portfoliosegment, main, null);
    			append_dev(main, t6);
    			mount_component(resumesegment, main, null);
    			append_dev(main, t7);
    			mount_component(contactsegment, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(iconlinks.$$.fragment, local);
    			transition_in(landingsegment.$$.fragment, local);
    			transition_in(aboutsegment.$$.fragment, local);
    			transition_in(skillssegment.$$.fragment, local);
    			transition_in(portfoliosegment.$$.fragment, local);
    			transition_in(resumesegment.$$.fragment, local);
    			transition_in(contactsegment.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(iconlinks.$$.fragment, local);
    			transition_out(landingsegment.$$.fragment, local);
    			transition_out(aboutsegment.$$.fragment, local);
    			transition_out(skillssegment.$$.fragment, local);
    			transition_out(portfoliosegment.$$.fragment, local);
    			transition_out(resumesegment.$$.fragment, local);
    			transition_out(contactsegment.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(meta);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			destroy_component(iconlinks);
    			destroy_component(landingsegment);
    			destroy_component(aboutsegment);
    			destroy_component(skillssegment);
    			destroy_component(portfoliosegment);
    			destroy_component(resumesegment);
    			destroy_component(contactsegment);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let showContactModal = false;

    	const toggleContactModal = () => {
    		$$invalidate(0, showContactModal = !showContactModal);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		LandingSegment,
    		AboutSegment,
    		ContactSegment,
    		NavBar,
    		SkillsSegment,
    		ResumeSegment,
    		PortfolioSegment,
    		IconLinks,
    		showContactModal,
    		toggleContactModal
    	});

    	$$self.$inject_state = $$props => {
    		if ('showContactModal' in $$props) $$invalidate(0, showContactModal = $$props.showContactModal);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*showContactModal*/ 1) {
    			console.log(showContactModal);
    		}
    	};

    	return [showContactModal];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map