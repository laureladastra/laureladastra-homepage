module.exports = function (grunt) {
  // Build (environment : production)
  // FIXME should clean all redundant files afterwards
  grunt.registerTask("buildProd", [
    "clean:init",
    "bower:dev",
    "copy:files",
    "clean:files",
    "syncAssets",
    "replace:cssFancybox",
    "replace:cssTranquilpeak",
    "replace:cssFontAwesome",
    "concat",
    "cssmin",
    "uglify",
    "linkAssetsProd",
    "clean:jsProd",
    "clean:cssProd"
  ])
}
