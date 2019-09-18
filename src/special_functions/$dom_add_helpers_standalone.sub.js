/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* $dom *//* global $dom */
/* standalone= "standalone"; */
/**
 * In generall, all methods from {@link $dom.types.Component} don't do anything. Also during "mounting" there are some changes see method {@link $dom.types.ComponentEmpty.mount}.
 * @typedef ComponentEmpty
 * @memberof $dom.types
 * @type {$dom.types.Component}
 */
const $dom_emptyPseudoComponent= (function(){
    const share= { mount, update, destroy, isStatic };
    const component_out= { add, component, mount, update, share };
    return component_out;
    /**
     * The same syntax as {@link $dom.types.Component.mount}. But only "replace"/"replaceContent" types makes sence (deleting/replacing by "empty space").
     * @method mount
     * @memberof $dom.types.ComponentEmpty
     */
    function mount(element, type= "childLast"){
        // let temp_el;
        switch ( type ) {
            case "replace":
                element.remove();
                break;
            case "replaceContent":
                $dom.empty(element);
                break;
            // case "before":
            //     temp_el= element.previousElementSibling;
            //     if(temp_el) temp_el.remove();
            //     break;
            // case "after":
            //     temp_el= element.nextElementSibling;
            //     if(temp_el) temp_el.remove();
            //     break;
            // default:
            //     if(element.childNodes.length) element.childNodes[type==="childFirst" ? 0 : element.childNodes.length-1].remove();
            //     break;
        }
        return null;
    }
    function add(){ return component_out; }
    function component(){ return component_out; }
    function update(){ return true; }
    function isStatic(){ return true; }
    function destroy(){ return null; }
})();
/**
 * Just virtual key!!! This is overwiev of all internal types for better description.
 * @namespace types
 * @private
 * @memberof $dom
 */
/**
 * This 'functional class' is syntax sugar around [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) for creating DOM components and their adding to live DOM in performance friendly way.
 * @method component
 * @memberof $dom
 * @version 1.0.0
 * @param {String} [el_name="EMPTY"] Name of element (for example `LI`, `P`, `A`, …). This is parent element of component. By default the "empty" element is generated.
 * @param {$dom.types.DomAssignObject} attrs The second argument for {@link $dom.assign}
 * @param {Object} [params= {}] Parameters
 * @param {Function|Undefined} [params.mapUpdate=Undefined] This function (if defined) remap `update(DATA)` to varibales used in keys `attrs.onupdate` … see method {@link $dom.types.Component.add}
 * @return {$dom.types.Component__Add|$dom.types.ComponentEmpty} Returns `ComponentEmpty` when `el_name` is **"EMPTY"**!
 */
$dom.component= function(el_name, attrs, { mapUpdate }={}){
    if(typeof el_name==="undefined" || el_name.toUpperCase()==="EMPTY") return $dom_emptyPseudoComponent;
    let /* holds `initStorage()` if `onupdate` was registered */
        internal_storage= null;
    const /* 'drawer' (container) for component elements */
        fragment= document.createDocumentFragment();
    let /* main parent (wrapper), container for children elements */
        container,
        /* store for all registered elements */
        els= [], all_els_counter= 0,
        /* current elements deep which holds indicies of elements:
            - add(...);add(...); = final deep=[0,1];
            - add(...);add(...,-1);add(...) = final deep=[1,2]; (by steps: [0], [0,1], [1,2])
            - see `shift` in `add`
        */
        deep= [];
    const share= { mount, update, destroy, isStatic };
    const component_out= { add, addText, component, setShift, mount, update, share };
    /**
     * Its purpose is to make easy transfering methods somewhere else (like for using in another component, see {@link $dom.types.Component.component} method).
     * @typedef share
     * @memberof $dom.types.Component
     * @borrows $dom.types.Component.mount as mount
     * @borrows $dom.types.Component.update as update
     * @type {Object}
     */
    /**
     * This is minimal export of "functional class" {@link $dom.component} and its methods (if they are chainable).
     * @typedef Component
     * @memberof $dom.types
     * @type {Object}
     */
    return add(el_name, attrs);
    /**
     * This is `Component` with aditional methods
     * @typedef Component__Add
     * @memberof $dom.types
     * @type $dom.types.Component
     */
    /**
     * This add element to component
     * @method add
     * @memberof $dom.types.Component
     * @public
     * @chainable
     * @param {String} el_name Name of element (for example `LI`, `P`, `A`, ...).
     * @param {$dom.types.DomAssignObject} attrs Internally uses {@link $dom.assign}, `null`\|`undefined` is also supported (`null` is probably better for readability).
     * @param {Number} [shift= 0] Modify nesting behaviour. By default (`shift= 0`), new element is child of previus element. Every `-1` means moving to the upper level against current one - see example.
     * @returns {$dom.types.Component__Add}
     * @example
     * const UL= document.getElementById('SOME UL');
     * const { add }= $dom.component("LI", { className: "list_item" });
     * //result: <li class="list_item">...</li>
     * add("DIV", { textContent: "Child of .list_item", className: "deep1" });
     * //result: <li class="list_item"><div class="deep1">...</div></li>
     *     add("DIV", { textContent: "Child of div.deep1", className: "deep2" });
     *     //result: ...<div class="deep1"><div class="deep2">...</div></div>...
     *         add("DIV", { textContent: "Child of div.deep2", className: "deep3" });
     *         //result: ...<div class="deep1"><div class="deep2"><div class="deep3">...</div></div></div>...
     *         add("DIV", { textContent: "Child of div.deep2", className: "deep3 mark" }, -1);
     *         //result: ...<div class="deep2"><div class="deep3">...</div><div class="deep3">...</div></div>...
     * //next add(*) schoul be child of div.deep3.mark, by -1 it is ch.of div.deep2, by -2 ch.of div.deep1, by -3 ch.of li.list_item because div.deep3.mark is on 3rd level
     *     add("DIV", { textContent: "Child of div.deep1", className: "deep2 nextone" }, -2);
     *     //result: this is on 2nd level
     * add("DIV", { textContent: "Child of div.deep1", className: "deep2 nextone" }, -2);
     * //result: this is on 0 level
     *     add("DIV", null);
     *     //just DIV without attributes
     */
    function add(el_name, attrs, shift= 0){
        recalculateDeep(shift);
        attrs= attrs || {};
        const prepare_el= document.createElement(el_name);
        if(!all_els_counter) container= els[0]= fragment.appendChild(prepare_el);
        else els[all_els_counter]= getParentElement().appendChild(prepare_el);
        let el= els[all_els_counter];
        all_els_counter+= 1;
        $dom.assign(el, attrs);
        return Object.assign({
            /**
             * Returns reference of currently added element
             * @method getReference
             * @memberof $dom.types.Component__Add
             * @returns {NodeElement}
             */
            getReference: ()=> el,
            /**
             * This procedure allows to call given function `fn` during registering element.
             * @method oninit
             * @memberof $dom.types.Component__Add
             * @param {Function} fn
             * @returns {$dom.types.Component}
             */
            oninit: function(fn){ fn(el); return component_out; },
            /**
             * This method allows to register function ({@link $dom.types.onUpdateFunction}) which shoul be invoke when given **keys** in `data` will be changed (see {@link $dom.types.Component.update}).
             * @method onupdate
             * @memberof $dom.types.Component__Add
             * @param {Object} data This allows register listener for given **keys** of Object `data`. For `data= { a: "A", b: "B" }` it means that when `a` or `b` will be changed the `onUpdateFunction` is called.
             * @param {$dom.types.onUpdateFunction} onUpdateFunction This register function, which should be called when any key od `data` will be changed in future. It is also called during creating element.
             * @returns {$dom.types.Component}
             * @example
             * const c= $dom.component("DIV", null);
             * …
             * c.add("P", null).onupdate({ key: "This is init value" }, ({ key })=> ({ textContent: key }));//=> <p>This is init value</p>
             * …
             * c.update({ key: "Value changed" });//=> <p>Value changed</p>
             * @example
             * const c= $dom.component("DIV", null);
             * …
             * c.add("P", null).onupdate({ A: "A", B: "b" }, ({ A, B })=> ({ textContent: A+B }));//=> <p>Ab</p>
             * …
             * c.update({ B: "B" });//=> <p>AB</p>
             */
            /**
             * @callback onUpdateFunction
             * @memberof $dom.types
             * @param {Object} data Includes all subsribed keys from `data` see method {@link $dom.types.Component__Add.onupdate}
             * @returns {*|$dom.types.DomAssignObject} Primary should use `DomAssignObject`, but in generall this can do anything what make sence when method {@link $dom.types.Component.update} is called. This callback can be registered when element is created (see method {@link $dom.types.Component.add}) see {@link $dom.types.Component__Add}.
             */
            onupdate: function(data, onUpdateFunction){
                if(!data) return component_out;
                if(!internal_storage) internal_storage= initStorage();
                $dom.assign(el, internal_storage.register(el, data, onUpdateFunction));
                return component_out;
            }
        }, component_out);
    }
    
    /**
     * This is `Component` with aditional methods
     * @typedef Component__AddText
     * @memberof $dom.types
     * @type {Component}
     */
    /**
     * This add element to component
     * @method addText
     * @memberof $dom.types.Component
     * @public
     * @chainable
     * @param {String} text Argument for `document.createTextNode`
     * @param {Number} [shift= 0] see {@link $dom.types.Component.add}
     * @returns {$dom.types.Component__AddText}
     * @example
     * const c1= $dom.component("P", { textContent: "TEXT" });
     * const c2= $dom.component("P", null);
     *     c2.addText("TEXT");
     * //c1-> <p>TEXT</p>  ===  <p>TEXT</p> <-c2
     * @example
     * function testTextLi({ href= "https://www.seznam.cz" }= {}){
     *     const c= $dom.component("LI", null);
     *         c.add("P", { textContent: "Link test: " });
     *             c.add("A", { textContent: "link ", href });
     *                 c.add("STRONG", { textContent: `(${href.replace("https://www.", "")})` });
     *             c.addText("!", -2);
     *             c.add("BR", null, -1);
     *             c.addText("Test new line.", -1);
     *     return c.share;
     * }
     * //result: '<p>Link test: <a href="...">link <strong>...</strong></a>!<br>Test new line.</p>'
     */
    function addText(text, shift= 0){
        recalculateDeep(shift);
        const text_node= document.createTextNode(text);
        let el= els[all_els_counter]= getParentElement().appendChild(text_node);
        all_els_counter+= 1;
        return Object.assign({
            /**
             * This procedure allows to call given function `fn` during registering element.
             * @method oninit
             * @memberof $dom.types.Component__AddText
             * @param {Function} fn
             * @returns {$dom.types.Component}
             */
            oninit: function(fn){ fn(el); return component_out; }
        }, component_out);
    }
    
    /**
     * Method for including another component by usint its `share` key.
     * @method component
     * @memberof $dom.types.Component
     * @public
     * @chainable
     * @param {$dom.types.Component.share} share
     * @param {Number} [shift= 0] see {@link $dom.types.Component.add}
     * @return {$dom.types.Component}
     * @example
     * function p({ textContent }){
     *      const cP= $dom.component("P", { textContent });
     *      return cP.share;
     * }
     * const c= $dom.component("DIV", null);
     * for(let i=0; i<3; i++){ c.component(p({ textContent: i })); }
     * c.mount(document.body, "replaceContent");
     * //= <body><div><p>0</p><p>1</p><p>2</p></div></body>
     */
    function component({ mount, update, isStatic }, shift= 0){
        recalculateDeep(shift);
        els[all_els_counter]= mount(getParentElement());
        if(!isStatic()){
            if(!internal_storage) internal_storage= initStorage();
            internal_storage.registerComponent(update);
        }
        all_els_counter+= 1;
        return component_out;
    }
    
    /**
     * Add element to live DOM
     * @method mount
     * @memberof $dom.types.Component
     * @public
     * @param {NodeElement} element Element where to places this component
     * @param {String} [type= "childLast"]
     *  <br/>- Change type of mounting
     *  <br/>- `childLast` places component as last child
     *  <br/>- `childFirst` places component as first child
     *  <br/>- `replaceContent` removes content of `element` and places component as child (uses `$dom.empty`)
     *  <br/>- `replace` replaces `element` by component
     *  <br/>- `before` places component before `element`
     *  <br/>- `after` places component after `element` (uses `$dom.insertAfter`)
     * @returns {NodeElement} `container`
     */
    function mount(element, type= "childLast"){
        switch ( type ) {
            case "replace":
                $dom.replace(element, fragment);
                break;
            case "replaceContent":
                $dom.empty(element);
                element.appendChild(fragment);
                break;
            case "before":
                element.parentNode.insertBefore(fragment, element);
                break;
            case "after":
                $dom.insertAfter(fragment, element);
                break;
            default:
                if(type==="childFirst" && element.childNodes.length) element.insertBefore(fragment, element.childNodes[0]);
                else element.appendChild(fragment);
                break;
        }
        return container;
    }
    
    /**
     * Method remove element form live DOM and returns null
     * @method destroy
     * @memberof $dom.types.Component.share
     * @public
     * @returns {Null}
     * @example
     * let c= $dom.component("DIV", null);
     * c.mount(document.body, "replaceContent");
     * c= c.share.destroy();
     * //=> c===null AND <body></body>
     */
    function destroy(){
        container.remove();
        return null;
    }
    
    /**
     * Updates `deep`
     * @private
     * @method recalculateDeep
     * @memberof $dom.types.Component
     * @param {Number} shift see {@link $dom.types.Component.add}
     */
    function recalculateDeep(shift){
        if(!shift) deep.push(all_els_counter);
        else { deep.splice(deep.length+1+shift); deep[deep.length-1]= all_els_counter; }
    }
    
    /**
     * Returns parent element (or "fragment pseudo element")
     * @method getParentElement
     * @memberof $dom.types.Component
     * @private
     * @returns {NodeElement} Returns parent element (i. e. `DocumenFragment` if component is empty)
     */
    function getParentElement(){
        return els[deep[deep.length-2]] || fragment;
    }
    
    /**
     * Method provide way to change nesting behaviour. It can be helpful for loops
     * @method setShift
     * @memberof $dom.types.Component
     * @public
     * @chainable
     * @param {Number} [shift= 0] see {@link $dom.types.Component.add}
     * @returns {$dom.types.Component}
     * @example
     * function testNesting(){
     *     const c= $dom.component("DIV", null);
     *         c.setShift(0);
     *     for(let i= 0; i<5; i++){
     *         c.add("P", { textContent: `Paragraph no. ${i}.` }, -1);
     *     }
     *     return c.share;
     * }
     * //=> div> 5*p
     * @example
     * function testNesting(){
     *     const c= $dom.component("DIV", null);
     *     for(let i= 0; i<5; i++){
     *         c.add("P", { textContent: `Paragraph no. ${i}.` });
     *          //c.setShift();//or 0 => div> p> p> p> …
     *       //c.setShift(-1); => div> p> p> p> …
     *     c.setShift(-2);
     *     }
     *     return c.share;
     * }
     * //=> div> 5*p
     */
    function setShift(shift= 0){
        let last;
        if(!shift){ last= deep.pop(); deep.push(last, last); }
        else deep.splice(deep.length+1+shift);
        return component_out;
    }
    
    /**
     * Initialize internal storage
     * @method initStorage
     * @memberof $dom.types.Component
     * @private
     * @returns {Object} `{ register, registerComponent, update, unregister}`
     */
    function initStorage(){
        const /* storage for component, functions for updates and mapping data keys and corresponding elements */
            data= {},
            components= [], els= new Map(),
            functions= new Map(),
            listeners= new Map();
        let 
            els_counter= 0;
        return {
            register: function(el, init_data, fun){
                Object.assign(data, init_data);
                const el_id= els_counter++; els.set(el_id,el);
                const init_data_keys= Object.keys(init_data);
                for(let i=0, i_key, i_length= init_data_keys.length; i<i_length; i++){
                    i_key= init_data_keys[i];
                    if(!listeners.has(i_key)) listeners.set(i_key, [ el_id ]);
                    else listeners.set(i_key, [ ...listeners.get(i_key), el_id ]);
                }
                functions.set(el_id, fun);
                return fun.call(el, init_data) || {};
            },
            registerComponent: function(update){
                if(components.indexOf(update)===-1) components.push(update);
            },
            update: function(new_data_input){
                const new_data= typeof mapUpdate==="function" ? mapUpdate(new_data_input) : new_data_input;
                let out= false;
                for(let i=0, i_length= components.length; i<i_length; i++){ if(components[i](new_data)&&!out){out=true;} }
                if(!listeners.size) return out;
                const /* keys to update (subscribers exits and was changed) */
                    new_data_keys= Object.keys(new_data)
                        .filter(key=>listeners.has(key)&&data[key]!==new_data[key]),
                    new_data_keys_length= new_data_keys.length;
                if(!new_data_keys_length) return out;
                Object.assign(data, new_data);
                const els_for_redraw= [];
                for(let i=0, i_listeners; i<new_data_keys_length; i++){
                    i_listeners= listeners.get(new_data_keys[i]);
                    for(let j=0, ji_listener, j_length= i_listeners.length; j<j_length; j++){
                        ji_listener= i_listeners[j];
                        if(els_for_redraw.indexOf(ji_listener)===-1) els_for_redraw.push(ji_listener);
                    }
                }
                for(let i=0, i_length= els_for_redraw.length; i<i_length; i++){ processChanges(els_for_redraw[i]); }
                return true;
                
                function processChanges(el_id){
                    const new_attrs= functions.get(el_id).call(els.get(el_id), data) || {};
                    const el= els.get(el_id);
                    if(el.parentNode===null) return unregister(el_id, new_data_keys);
                    else $dom.assign(el, new_attrs);
                }
            },
            getData: function(){
                return data;
            },
            unregister
        };
        function unregister(el_id, data_keys){
            functions.delete(el_id);
            els.delete(el_id);
            for(let i=0, i_key, listener, i_length= data_keys.length; i<i_length; i++){
                i_key= data_keys[i];
                listener= listeners.get(i_key);
                if(listener.length===1) listeners.delete(i_key);
                else listeners.set(i_key, listener.filter(el_idFilter));
            }
            function el_idFilter(v){ return v!==el_id; }
        }
    }
    
    /**
     * Method updates all registered varibles by keys `onupdates` and calls follower functions
     * @method update
     * @memberof $dom.types.Component
     * @public
     * @param {Object|Function} new_data
     * <br/>- When `$dom.component` is initialized, it is possible to register `mapUpdate`
     * <br/>- **It's because internally, it is used `Object.assign` (no deep copy) to merge new data with older one!!!**
     * <br/>- It is also possible to register function to detect changes itself see examples
     * @returns {Boolean} If success `1`, else `0`.
     * @example
     * // SIMPLE example
     * const data_A= { a: "A" };
     * const data_A_update= { a: "AAA" };
     * const c= $dom.component("UL", null);
     *     c.add("LI", null)
     *          .onupdate(data_A, ({ a })=>({ textContent: a }));//`{ a }` add listener for "a"
     * c.mount(document.body);
     * c.update(data_A_update);
     * @example
     * // EXAMPLE WITH `mapUpdate`
     * const data_B= { a: { b: "A" }};
     * const data_B_update= { a: { b: "AAA" }};
     * const c= $dom.component("UL", null, { mapUpdate: d=>({ a: d.a.b }) });
     *     c.add("LI", null)
     *          .onupdate(data_B, ({ a })=>({ textContent: a }));
     * c.mount(document.body);
     * c.update(data_B_update);
     * @example
     * // EXAMPLE WITH FUNCTION AS ARGUMENT OF `update`
     * const c= $dom.component("UL", null, { mapUpdate: d=>({ a: d.a.b }) });
     *     c.add("LI", null)
     *          .onupdate({ a: 1 }, ({ a })=>({ textContent: a }));
     * c.mount(document.body);
     * c.update(({ a })=> { a: ++a });
     */
    function update(new_data){
        if(!internal_storage) return false;
        return internal_storage.update(typeof new_data==="function" ? new_data(internal_storage.getData()) : new_data);
    }
    
    /**
     * Methods returns if it was `onupdate` used
     * @method isStatic
     * @memberof $dom.types.Component.share
     * @public
     * @return {Boolean} If there is some listeners `onupdate`
     */
    function isStatic(){
        return !internal_storage;
    }
    
};
/**
 * Object shall holds **NodeElement** properties like `className`, `textContent`, …. This is primary argument for {@link $dom.assign}. There are some notes and changes:
 *  - For `dataset` can be used also `Object` notation: `$dom.assign(document.getElementById("ID"), { dataset: { test: "TEST" } }); //<p id="ID" data-test="TEST"></p>`.
 *  - The same notation can be used for **CSS variables** (the key is called `style_vars`).
 *  - **IMPORTANT CHANGE**: Key `style` also supports **text**, so `$dom.assign(el, { style: "color: red;" });` and `$dom.assign(el, { style: { color: "red" } })` is equivalent to `el.setAttribute("style", "color: red;");`
 *  - **IMPORTANT DIFFERENCE**: `classList` accepts *Object* in the form of `class_name: -1|0|1` where '-1' means `el.classList.toggle(class_name)` others `el.classList.toggle(class_name, Booleans(...))`
 *  - *Speed optimalization*: It is recommended to use `textContent` (instead of `innerText`) and `$dom.add` or `$dom.component` (instead of `innerHTML`).
 *  - `href`, `src` or `class` are convereted to `element.setAttribute(key, …)`;
 * @typedef DomAssignObject
 * @memberof $dom.types
 * @type {Object}
 */
/**
 * Procedure for merging object into the element properties.
 * Very simple example: `$dom.assign(document.body, { className: "test" });` is equivalent to `document.body.className= "test";`.
 * It is not deep copy in general, but it supports `style`, `style_vars` and `dataset` objects (see below).
 * @method assign
 * @memberof $dom
 * @param {NodeElement} element
 * @param {...$dom.types.DomAssignObject} object_attributes
 * @example
 * const el= document.body;
 * const onclick= function(){ console.log(this.dataset.js_param); };
 * $dom.assign(el, { textContent: "BODY", style: "color: red;", dataset: { js_param: "CLICKED" }, onclick });
 * //result HTML: <body style="color: red;" data-js_param="CLICKED">BODY</body>
 * //console output on click: "CLICKED"
 * $dom.assign(el, { style: { color: "green" } });
 * //result HTML: <body style="color: green;" data-js_param="CLICKED">BODY</body>
 * //console output on click: "CLICKED"
 * @example
 * const el= document.body;
 * $dom.assign(el, { classList: { testClass: -1 } });
 * //result HTML: <body class="testClass">…</body>
 * $dom.assign(el, { classList: { testClass: -1 } });
 * //result HTML: <body class="">…</body>
 * @example
 * const el= document.body;
 * $dom.assign(el, { classList: { testClass: true } });//or 1
 * //result HTML: <body class="testClass">…</body>
 * $dom.assign(el, { classList: { testClass: false } });//or 0
 * //result HTML: <body class="">…</body>
 * //...
 * @example
 * $dom.assign(A_ELEMENT, { href: "www.google.com" });//=> <a href="www.google.com" …
 * $dom.assign(IMG_ELEMENT, { src: "image.png" });//=> <img src="image.png" …
 */
$dom.assign= function(element, ...objects_attributes){
    const object_attributes= Object.assign({}, ...objects_attributes);
    const object_attributes_keys= Object.keys(object_attributes);
    for(let i=0, key, attr, i_length= object_attributes_keys.length; i<i_length; i++){
        key= object_attributes_keys[i];
        attr= object_attributes[key];
        if(typeof attr==="undefined"){ if(Reflect.has(element, key)){ Reflect.deleteProperty(element, key); } continue; }
        switch(key){
            case "style":
                if(typeof attr==="string") element.setAttribute("style", attr);
                else for(let k=0, k_key, k_keys= Object.keys(attr), k_length= k_keys.length; k<k_length; k++){ k_key= k_keys[k]; element.style.setProperty(k_key, attr[k_key]); }
                break;
            case "style_vars":
                for(let k=0, k_key, k_keys= Object.keys(attr), k_length= k_keys.length; k<k_length; k++){ k_key= k_keys[k]; element.style.setProperty(k_key, attr[k_key]); }
                break;
            case "classList":
                if(!element[key].toggle) break;
                for(let k=0, k_key, k_attr, k_keys= Object.keys(attr), k_length= k_keys.length; k<k_length; k++){
                    k_key= k_keys[k]; k_attr= attr[k_key];
                    if(k_attr===-1) element.classList.toggle(k_key);
                    else element.classList.toggle(k_key, Boolean(k_attr));
                }
                break;
            case "dataset":
                for(let k=0, k_key, k_keys= Object.keys(attr), k_length= k_keys.length; k<k_length; k++){ k_key= k_keys[k]; element.dataset[k_key]= attr[k_key]; }
                break;
            case "href" || "src" || "class":
                element.setAttribute(key, attr);
                break;
            default:
                element[key]= attr;
                break;
        }
    }
};

/**
 * Procedure for adding elements into the `parent` (in background use `createDocumentFragment`, `createElement`, `appendChild`)
 * @method add
 * @memberof $dom
 * @deprecated
 * @param {NodeElement} parent Wrapper (for example `<ul>`) where to cerate children elements (for example `<li>`)
 * @param $$$ {...Array}
 *  <br/>* `[ [ __NAME__, __PARAMS__ ], [ __NAME__, __PARAMS__ ], ..., [ __NAME__, __PARAMS__ ] ]`
 *  <br/>* Element in array is automatically nested into the previous element. `[["UL",...], ["LI",...], ["SPAN",...]]` creates `<ul><li><span></span></li></ul>`
 *  <br/>* `__NAME__` **\<String\>**: Name of element (for example `LI`, `P`, `A`, ...)
 *  <br/>* `__PARAMS__` **\<Object\>**: Parameters for elements as "innerText", "className", "dataset", ...
 *  <br/>    * see [$dom.assign](#methods_assign)
 *  <br/>    * There is one change with using key "$", which modify elements order and it is not parsed by [$dom.assign](#methods_assign)
 *  <br/>        * `__PARAMS__.$`: Modify nesting behaviur (accepts index of element in `$$$`). `[["UL",...], ["LI",...], ["LI",{$:0,...}]]` creates `<ul><li></li><li></li></ul>`
 * @return {NodeElement} First created element (usualy wrapper thanks nesting)
 * @example
 * $dom.add(ul_element,[
 *     ["LI", {className: "nejake-tridy", onclick: clickFCE}],
 *         ["SPAN", {innerText: "Prvni SPAN v LI"}],
 *         ["SPAN", {$:0, innerText: "Druhy SPAN v LI"}]
 * ]);
 * // = <ul><li class="nejake-tridy" onclick="clickFCE"><span>Prvni SPAN v LI</span><span>Druhy SPAN v LI</span></li></ul>
 * // !!! VS !!!
 * $dom.add(ul_element,[
 *     ["LI", {className: "nejake-tridy", onclick: clickFCE}],
 *         ["SPAN", {innerText: "Prvni SPAN v LI"}],
 *             ["SPAN", {innerText: "Druhy SPAN v LI"}]
 * ]);
 * // = <ul><li class="nejake-tridy" onclick="clickFCE"><span>Prvni SPAN v LI<span>Druhy SPAN v LI</span></span></li></ul>
 */
$dom.add= function(parent,$$$){
    let fragment= document.createDocumentFragment();
    let prepare_els= [], els= [];
    for(var i=0, i_length= $$$.length; i<i_length;i++){
        prepare_els[i]= document.createElement($$$[i][0]);
        if(!i) els[i]= fragment.appendChild(prepare_els[i]);
        else if(typeof $$$[i][1].$!=="undefined"){
            els[i]= els[$$$[i][1].$].appendChild(prepare_els[i]);
            delete $$$[i][1].$;
        }
        else els[i]= els[i-1].appendChild(prepare_els[i]);
        $dom.assign(els[i], $$$[i][1]);
    }
    parent.appendChild(fragment);
    if(i) return els[0];
};