    /* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true *///gulp.remove.line
    /* global $optimiziers *///gulp.remove.line
    var $function= {
        each: function(...functions){return function(...input){for(let i=0, i_length= functions.length; i<i_length; i++){ functions[i](...input); }}; },
        map: function(...functions){return function(...input){let out= []; for(let i=0, i_length= functions.length; i<i_length; i++){ out.push(functions[i](...input)); } return out;}; },
        /* Je to jen hloupy cyklus "...current" do dalsi funkce! => jednotlive funkce musi vracet pole! */
        sequention: function(...functions){return function(...input){let current= input; for(let i=0, i_length= functions.length; i<i_length; i++){ current= functions[i](...current); } return current;};},
        schedule: function(functions, {context= window, delay= 150}= {}){ $optimiziers.timeoutAnimationFrame(function loop(){ let process= functions.shift(); process.call(context); if(functions.length > 0) $optimiziers.timeoutAnimationFrame(loop, delay); }, delay); },
        conditionalCall: function(mixed,fun){
            if(!mixed) return false;
            if(typeof fun === "function") return fun(mixed);
            return mixed;
        }
    };