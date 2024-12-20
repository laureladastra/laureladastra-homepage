module.exports = function (grunt) {
  grunt.option('force', true)
  // Clean up the 'build' folder
  grunt.config.set('clean', ['build/*'])
  grunt.loadNpmTasks('grunt-contrib-clean')
}
