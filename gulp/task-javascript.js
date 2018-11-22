/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
module.exports= function({app, $gulp_folder, gulp, error, $g, $o, $run}){
    /* jshint -W061 */const gulp_place= require("./gulp_place.js")({gulp_replace: $g.replace, fs: $o.fs, variable_eval: (str)=> eval(str)});/* jshint +W061 */
    let namespaces= {$string: "$string", $dom: "$dom", $async: "$async", $optimizier: "$optimizier", $time: "$time", $array: "$array", $object: "$object", $function: "$function"};
    if(app.namespaces_rename) Object.keys(app.namespaces_rename).forEach(key=> namespaces[key]= app.namespaces_rename[key]);
    return function(cb){
        let cmd;
        if($run.jshint_advanced){
            cmd= $o.spawn($run.jshint_advanced, [app.src_folder], {});
            cmd.stdout.on('data', function(data){ error.addText(data.toString()+"\n"); });
            cmd.on('close', run);
        } else {
            run(0);
        }
        function run(code){
            let main_stream;
            if(!code){
                main_stream= gulp.src([app.src_folder+"*.js", '!'+app.src_folder+'*.sub.js'])
                    .pipe($g.replace("\"gulp.variable.namespaces\"", "{"+Object.keys(namespaces).reduce((acc,key,i)=> acc+(i ? ", " : "")+namespaces[key]+": "+ key, "")+"}"))
                    .pipe(gulp_place({folder: "src/", string_wrapper: '"'}))
                    .pipe($g.replace(/\/\* gulp \*\/\/\* global gulp_place \*\/\r?\n/g,""));
    
                main_stream
                    .on('error', error.handler)
                    .pipe(gulp.dest(app.bin_folder))
                    .on('end', function minify(){
                        gulp.src([app.bin_folder+"*js", "!"+app.bin_folder+"*-min.js"])
                            //.pipe($g.js_obfuscator())
                            .pipe($g.minify_js({noSource : true}))
                            .on('error', error.handler)
                            //.pipe($g.rename({suffix: ".min"}))
                            .pipe(gulp.dest(app.bin_folder))
                            .on('end', cb);
                    });
            } else {
                $g.util.log($g.util.colors.red('[Error]'), "Error(s) in javascripts!");
                $o.fs.writeFile($gulp_folder+'build.log', error.getText(), cb);
                error.addNum();
            }
        }
    };
};
