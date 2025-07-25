module.exports = function (grunt) {
  // Run the tasks that are required to build the 'production' environment
  grunt.registerTask("build", [
    "clean:folder",
    "copy:files",
    "uglify:modules",
    "clean:modules",
    "uglify:files",
    "replace:files"
    // FIXME update version in README badge if needed
  ])
}
