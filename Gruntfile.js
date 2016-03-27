module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    uglify: {
      start: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },

  /*  imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['img/svg/*.svg']
        }]
      }
    },*/

    svgstore: {
      options: {
        includeTitleElement: false,
        svg: {
          style: 'display:none',
        },
        cleanup: [
          'fill',
        ],
      },
      default : {
        files: {
          'img/sprite_sedona.svg': ['img/svg/*.svg'],
        },
      },
    },

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['build/**/*'],
      },
      scripts: {
        files: ['js/script.js'],
        tasks: ['js'],
        options: {
          spawn: false
        },
      },
      images: {
        files: [
          'img/svg/*.svg'
        ],
        tasks: ['img'],
        options: {
          spawn: false
        },
      },
      styles: {
        files: ['css/style.css'],
        // tasks: ['html'],
        options: {
          spawn: false
        },
      },
      html: {
        files: ['./index.html'],
        // tasks: ['html'],
        options: {
          spawn: false
        },
      },
    },

    less: {
         development: {
            options: {
               yuicompress: true,
               optimization: 2
            },
            files: {
               // target.css file: source.less fil//
               "css/style.css": "less/style.less"
            }
        }
   },
   watch: {
      styles: {
         files: ['less/**/*.less'], // which files to watch
         tasks: ['less'],
         options: {
            nospawn: true
         }
      }
   },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'css/style.css',
            'img/sprite_sedona.svg',
            './index.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./",
          },
          startPath: "index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }

  });



  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', [
    'js',
    'img',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('js', [
    'uglify',
  ]);

  grunt.registerTask('img', [
    'svgstore',
  ]);

};
