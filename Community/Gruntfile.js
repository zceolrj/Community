/**
 * Created by zceolrj on 2015/9/27.
 */
module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                options: {
                    separator: ';'
                },
                files: {
                    'dist/js/community.js': ['src/js/app.js', 'src/js/api.js',
                        'src/js/index.js', 'src/js/module/*.js']
                }
            },

            css: {
                options: {
                    separator: ' '
                },
                src: ['src/css/*.css', 'src/css/module/*.css'],
                dest: 'dist/css/community.css'
            }
        },

        uglify: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'dist/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'dist/js',
                    ext: '.min.js'
                }]
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/js/**/*.js'],
            gruntfile: ['Gruntfile.js'],
            javascript: ['src/js/**/*.js'],
            options: {
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        cssmin: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            html: {
                files: [
                    {expand: true, cwd:'src', src: ['*.html'], dest: 'dist/'},
                    {expand: true, cwd:'src/view/', src: ['**/*.html'], dest: 'dist/view/'}
                ]
            },
            img: {
                files: [
                    {expand: true, cwd:'src/scss/img', src: ['*.*'], dest: 'dist/css/img'},
                    {expand: true, cwd:'src/images', src: ['*.*'], dest: 'dist/images'}
                ]
            },
            resource: {
                files: [
                    {expand: true, cwd:'src/resource/', src: ['*.*'], dest: 'dist/resource/'}
                ]
            }
        },

        clean: {
            all: ['dist/']
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },

            js: {
                files: 'src/js/**/*.js',
                tasks: ['jshint:javascript', 'concat:js', 'uglify']
            },

            css: {
                files: 'src/css/*.css',
                tasks: ['cssmin:min']
            },

            html: {
                files: 'src/**/*.html',
                tasks: ['copy:html']
            },

            images: {
                files: ['src/images/*.*', 'src/scss/img/*.*'],
                tasks: ['copy:img']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'jshint:javascript', 'concat:js', 'concat:css', 'uglify', 'cssmin:min',
        'copy:html', 'copy:img', 'copy:resource']);

    grunt.registerTask('images', ['copy:img']);

    grunt.registerTask('default', ['build']);

};