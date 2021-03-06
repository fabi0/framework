var gruntRequireConfig = require('./src/dev/requireConfig').gruntConfig;
var gruntWrapperRequireConfig = require('./src/dev/requireConfig').gruntWrapperConfig;
var gruntDebugConfig = require('./src/dev/requireConfig').gruntDebugConfig;
module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            core: {
                options: gruntRequireConfig
            },
            wrapper: {
                options: gruntWrapperRequireConfig
            },
            debug: {
                options: gruntDebugConfig
            }
        },
        concat: {
            css: {
                src: 'build/tmp/*.css',
                dest: 'build/tmp/razorflow.core.theme.css'
            }
        },
        jst: {
            compile: {
                options: {
                    prettify: true,
                    processName: function (filePath) {
                        var parts = filePath.split('/');
                        var fileName = parts[parts.length - 1];
                        return fileName.split('.')[0];
                    },
                    amd: true,
                    global: false,
                    requires: {
                        'vendor/lodash' : '_'
                    }
                },
                files: {
                    "src/js/generated/templates.js": ["src/templates/*.html"]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    "build/tmp/razorflow.css": "src/less/razorflow.less",
                    "build/tmp/rftheme.default.css": "build/tmp/less/rftheme.default.less"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'src/js/.jshintrc'
            },
            files: [
                "src/js/**/*.js",
                "!src/js/vendor/**/*.js",
                "!src/js/generated/templates.js",
                "!src/js/buildutils/**/*.js"
            ]
        },
        karma: {
            dev: {
                configFile: './karma.conf.js',
                singleRun: true
            }
        },
        lodash: {
            build: {
                dest: 'src/vendor/js/lodash.rf.js',
                options: {
                    include: ['extend', 'pluck', 'map', 'each', 'isNumber', 'isString', 'isNaN', 'isArray', 'isObject', 'find', 'defer', 'delay', 'max', 'min', 'sortBy', 'flatten', 'clone', 'cloneDeep', 'values', 'pick', 'reduce', 'filter', 'indexOf', 'keys', 'debounce'],
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/tmp/',
                src: ['razorflow.core.theme.css'],
                dest: 'build/assets/css',
                ext: '.min.css'
            }
        },
        // Need to copy products.json
        copy: {
            localToWebRF: {
                files: [
                    {src: ["build/js/razorflow.min.js"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/css/razorflow.min.css"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/js/templates.js"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/js/rfDemos.js"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/img/exampleImgs/*.png"], dest: '../webrf/backend/static/transfer/',flatten: true },
                ]
            }
        },
        copyto: {
            srcToBuild: {
                files: [
                    {cwd: 'src/vendor/js/', src: ['jquery.min.js'], dest: 'build/assets/js/'},
                ]
            },
            packageToBuild: {
                files: [
                    {cwd: 'src/package/', src: ['**/*'], dest: 'build/package/'},
                ],
            },
            packageMinToBuild: {
                files: [
                    {cwd: 'src/packages/minified/', src: ['**/*'], dest: 'build/packages/minified/'}
                ]
            },
            packageSrcToBuild: {
                files: [
                    {cwd: 'src/packages/source/', src: ['**/*'], dest: 'build/packages/source/'}
                ]
            },
            assetsToPackage: {
                files: [
                    {cwd: 'build/assets/', src: ["js/**", "css/**", "img/**"], dest: 'build/package/files/'},
                    {cwd: 'build/assets/', src: ["js/**", "css/**", "img/**"], dest: 'build/package/dashboard_quickstart/'},
                ],
            },
            assetsToMinPackage: {
                files: [
                    {cwd: 'build/assets/', src: ["js/**", "css/**", "img/**"], dest: 'build/packages/minified/files/'},
                    {cwd: 'build/assets/', src: ["js/**", "css/**", "img/**"], dest: 'build/packages/minified/dashboard_quickstart/'},
                ],
            },
            assetsToSrcPackage: {
                files: [
                    {cwd: 'build/assets/', src: ["js/**", "css/**", "img/**"], dest: 'build/packages/source/files/'},
                    {cwd: 'build/assets/', src: ["js/**", "css/**", "img/**"], dest: 'build/packages/source/dashboard_quickstart/'},
                ],
            },
            srcToPackage: {
                files: [
                    {cwd: 'src/dev/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/dev/'},
                    {cwd: 'src/fonts/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/fonts/'},
                    {cwd: 'src/img/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/img/'},
                    {cwd: 'src/js/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/js/'},
                    {cwd: 'src/less/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/less/'},
                    {cwd: 'src/templates/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/templates/'},
                    {cwd: 'src/vendor/', src: ['**/*'], dest: 'build/packages/source/source/javascript/src/vendor/'},
                    {cwd: 'tools/src/grunt-tasks/', src: ['themeGen.js'], dest: 'build/packages/source/source/javascript/tools/grunt-tasks/'}
                ]
            },
            packageToRelease: {
                files: [
                    {cwd: 'src/package/', src: ['**'], dest: '../package/rf/javascript/'}
                ]
            },
            razorcharts: {
                files: [
                    {cwd: '../razorcharts/src/js', src:['**'], dest: 'src/js/'}
                ]
            },
            sprite: {
                files: [
                    {cwd: 'src/img/', src:['**'], dest: 'build/img/'},
                    {cwd: 'src/img/', src:['**'], dest: 'build/assets/img/'}
                ]
            },
            themebuilder: {
                files: [
                    {cwd: 'src/less/', src: ["theme.less", "mixins.less", "theme/variables.less"], dest: 'build/tmp/themebuilder/'},
                    {cwd: 'src/js/themebuilder/config/', src: ["defaulttheme.json"], dest: 'build/tmp/themebuilder/'}
                ]
            },
            connectors: {
                files: [
                    {cwd: '../cloudconnect/src/', src:['**'], dest: 'extras/connectors/'}
                ]
            }
        },
        replace: {
            removeAMD: {
                src: "build/assets/js/razorflow.min.js",
                overwrite: true,
                replacements: [
                    {from: /\bdefine\b/g, to: "_dfn"},
                    {from: /\brequire\b/g, to: "_rqr"}
                ]
            }
        },
        clean: {
            build: ["build"]
        },
        featuregen: {
            getFeature: {
                options: {
                    files: "src/js/**/*.js",
                    out: "build/out.html",
                    extension: ".js"
                }
            }
        },
        themegen: {
            defaultTheme: {
                options: {
                    themeJSON: "src/js/themebuilder/config/defaulttheme.json",
                    out: "build/tmp/less/rftheme.default.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    // grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadTasks("../grunt-contrib-jst/tasks");
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-lodash');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadTasks("./tools/src/grunt-tasks");


    
    grunt.registerTask('compile', ['themegen', 'less:development', 'jst:compile', 'copyto:sprite', 'copyto:themebuilder']);
    grunt.registerTask('test', ['compile', 'karma:dev', 'shell:coverageReport']);

    grunt.registerTask('build', ["clean:build", "copyto:razorcharts", "compile", "less", "jst:compile", 'requirejs:core', 'requirejs:wrapper', 'requirejs:debug', "replace:removeAMD", 'concat:css', 'cssmin:minify', "copyto:srcToBuild"])
    // grunt.registerTask('package', ['build', 'copyto:packageToBuild', 'copyto:assetsToPackage']);
    grunt.registerTask('packageMin', ['build', 'copyto:packageMinToBuild', 'copyto:assetsToMinPackage']);
    grunt.registerTask('packageSrc', ['build', 'copyto:packageSrcToBuild', 'copyto:assetsToSrcPackage', 'copyto:srcToPackage']);
    // grunt.registerTask('websiteRelease', ['build', 'cssmin:minify', 'squashdemos', "screenshotGen:examples", 'copy:localToWebRF'])
    grunt.registerTask('package', ['clean:build', 'build', 'copyto:packageMinToBuild', 'copyto:assetsToMinPackage', 'copyto:packageSrcToBuild', 'copyto:assetsToSrcPackage', 'copyto:srcToPackage']);
}