var randToken = require("crypto").randomBytes(32).toString("hex")

module.exports = function (grunt) {
  var website = {}
  website[`source/assets/js/script-${randToken}.min.js`] = [
    "source/assets/js/script.js"
  ]
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
