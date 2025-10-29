module.exports = function (grunt) {
  // Build (environment : development)
  grunt.registerTask("build", [
    "clean:init",
    "bower:dev",
    "copy:files",
    "clean:files",
    "syncAssets",
    "linkAssets",
    "replace:cssFancybox",
    "replace:cssTranquilpeak",
    "replace:cssFontAwesome"
  ])
}
