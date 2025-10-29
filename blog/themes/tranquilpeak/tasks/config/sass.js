const sass = require("sass")

module.exports = function (grunt) {
  grunt.config.set("sass", {
    // Compile `tranquilpeak.scss` file into `tranquilpeak.css`
    dev: {
      options: {
        implementation: sass,
        sourceMap: false,
        silenceDeprecations: [
          "slash-div",
          "color-functions",
          "global-builtin",
          "import"
        ]
      },
      files: [
        {
          src: "source/_css/tranquilpeak.scss",
          dest: "source/assets/css/tranquilpeak.css"
        }
      ]
    }
  })

  grunt.loadNpmTasks("grunt-sass")
}
