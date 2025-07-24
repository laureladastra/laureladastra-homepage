module.exports = function (grunt) {
  // Minify javascripts and rename to `*.min.js`
  grunt.config.set("uglify", {
    files: {
      files: [
        {
          expand: true,
          cwd: "build/js",
          src: "**/*.js",
          dest: "build/js/",
          rename: function (destBase, destPath) {
            const path = destBase + destPath
            if (destPath.endsWith(".min.js")) {
              return path
            } else {
              return path.replace(".js", ".min.js")
            }
          }
        }
      ]
    }
  })
  grunt.loadNpmTasks("grunt-contrib-uglify")
}
