/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
gulp_place("global.sub.js", "file_once");/* global gulp_place, __eachInArrayLike, __eachInArrayLikeDynamic, export_as */
/**
 * This NAMESPACE provides features for Arrays.
 * @namespace $array
 * @global
 * @typicalname gulp_place("namespaces.$array", "eval_out")
 */
var $array= {
    /**
     * Function which calculate final index for cylce looping.
     * Means from current index `i` get `s`th value in array which length is `l`.
     * @method arrayIndex
     * @memberof $array
     * @param {Number} i Current index in array (typycally 0)
     * @param {Number} s Steps from `i`
     * @param {Number} l Array length
     * @return {Number} Index in array
     * @example
     * const a= ["0", "1"];
     * console.log(a[0]===a[$array.arrayIndex(0,0,a.length)]);
     * console.log(a[0]===a[$array.arrayIndex(1,1,a.length)]);
     * console.log(a[0]===a[$array.arrayIndex(0,2,a.length)]);
     */
    arrayIndex: function(i,s,l){
        return (l+i+(s%l))%l;
    },
    /**
     * Procedure for iterating throught Array `iterable`.
     * @method each
     * @memberof $array
     * @param {Mixed[]} iterable An array-like object for iterating.
     * @param {types.IterableCallback} i_function
     * @param {Object|undefined} scope An argument for `i_function.call(*,...)`
     * @return {Mixed} `share`
     */
    each: __eachInArrayLike,
    /**
     * Procedure for iterating throught Array `iterable` like {@link $array.each}, but use `for(...;(item= iterable[i]);i++)...`.
     * @method eachDynamic
     * @memberof $array
     * @param {Mixed[]} iterable An array-like object for iterating.
     * @param {types.IterableCallback} i_function
     * @param {Object|undefined} scope An argument for `i_function.call(*,...)`
     * @return {Mixed} `share`
     */
    eachDynamic: __eachInArrayLikeDynamic,
    /**
     * Function returns last element in array without editing the original.
     * @method getLast
     * @memberof $array
     * @param {Mixed[]} arr Input array.
     * @returns {Mixed} Last element in `arr`
     */
    getLast: function(arr){
        return arr[arr.length-1];
    },
    /**
     * Methods around array `arr` exported by {@link $array.partition} method.
     * @typedef {Object} ArrayPartition
     * @memberof types
     */
    /**
     * Function returns methods for splitting array by condition.
     * @method partition
     * @memberof $array
     * @param {Mixed[]} arr Input array.
     * @returns {types.ArrayPartition}
     */
    partition: function(arr){
        return {
            /**
             * @method head
             * @memberof types.ArrayPartition
             * @returns {Array} two items Array `[x, ...xs]` (first element and rest array)
             */
            head: function(){
                const [x, ...xs]= arr;
                return [x, xs];
            },
            /**
             * @method tail
             * @memberof types.ArrayPartition
             * @returns {Array} two items Array `[...xs, x]` (rest array and last element)
             */
            tail: function(){
                let local_arr= [...arr];
                const last= local_arr.pop();
                return [local_arr, last];
            },
            /**
             * @method onIndex
             * @memberof types.ArrayPartition
             * @param {Number} index Position (in fact for `*.splice(0, index)`) where to split array.
             * @returns {Array[]} Two items Array [arr1, arr2]
             */
            onIndex: function(index){
                let local_arr= [...arr];
                return [local_arr.splice(0,index), local_arr];
            },
            /**
             * @method byCondition
             * @memberof types.ArrayPartition
             * @param {types.function_filterCallback} fn In fact index of inner array (see return part).
             * @returns {Array[]} Two items Array [arr1, arr2] based on `fn`.
             */
            byCondition: function(fn){
                let out= [[],[]];
                __eachInArrayLike(arr, ({item, key})=>out[+!Boolean(fn(item, key))].push(item));
                return out;
            }
        };
    },
    /**
     * Function returns new array without any `item`
     * @method removeItem
     * @memberof $array
     * @param {Mixed[]} arr Original array
     * @param {Mixed} item Item for searching in `arr`. Make sence, if it is possible to compare with `===` operation
     * @returns {Array} New {Array} from `arr` without `item`s
     */
    removeItem: function(arr, item) {
        let p_arr= [...arr];//p_arr==private_arr
        var i = 0;
        while (i < p_arr.length) {
            if (p_arr[i] === item) p_arr.splice(i, 1);
            else i++;
        }
        return p_arr;
    },
    /**
     * Function returns random number for Array.sort function
     * @method sortRandom
     * @memberof $array
     * @returns {Number} Number in interval <-0.5,0.5>
     */
    sortRandom: function(){
        return Math.random() - 0.5;
    }
};
export_as($array, gulp_place("namespaces.$array", "variable"));