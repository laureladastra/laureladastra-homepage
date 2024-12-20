module.exports = function (grunt) {
  // Run the tasks that are required to build the 'production' environment
  grunt.registerTask('build', [
    'clean',
    'copy:files',
    'uglify:files',
    'replace:files'
  ])
}
