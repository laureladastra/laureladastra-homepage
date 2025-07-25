module.exports = function (grunt) {
  grunt.option("force", true)
  // Clean up the 'build' folder
  grunt.config.set("clean", {
    folder: {
      src: "build/*"
    },
    modules: {
      expand: true,
      cwd: "build/js",
      src: ["**/*.js", "!**/*.min.js"]
    }
  })
  grunt.loadNpmTasks("grunt-contrib-clean")
}
