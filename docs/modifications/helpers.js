/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
/* global gulp_place */
module.exports= {
    pathHelper: function(path){
        const folder_part= path.split("undefined"+"\\")[1];
        return "https://github.com/jaandrle/jaaJSU#readme"+"/blob/master/"+folder_part+"/";
    }
};