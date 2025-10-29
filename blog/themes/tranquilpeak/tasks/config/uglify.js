module.exports = function (grunt) {
  var website = {}
  website[
    `source/assets/js/script-0c9f6b624574010eb8ed25a01596694311bdfaedff91b6651e7d35686c63692f.min.js`
  ] = ["source/assets/js/script.js"]
  grunt.config.set("uglify", {
    // Minify `script.js` file into `script.min.js`
    prod: {
      options: {
        mangle: {
          reserved: ["jQuery", "fancybox"]
        }
      },
      files: website
    }
  })

  grunt.loadNpmTasks("grunt-contrib-uglify")
}
