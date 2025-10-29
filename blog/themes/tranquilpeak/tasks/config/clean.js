module.exports = function (grunt) {
  grunt.config.set("clean", {
    // Delete the `assets` folder
    init: ["source/assets"],
    files: ["source/assets/css/all.css", "source/assets/js/all.js"],
    jsProd: {
      expand: true,
      cwd: "source/assets/js",
      src: [
        "**/*.js",
        "!**/script-0c9f6b624574010eb8ed25a01596694311bdfaedff91b6651e7d35686c63692f.min.js"
      ]
    },
    cssProd: {
      expand: true,
      cwd: "source/assets/css",
      src: [
        "**/*.css",
        "!**/style-af388f72de52c378c4a2f78ce390db255bd3da6014a49091319ef265b9887af4.min.css"
      ]
    }
  })

  grunt.loadNpmTasks("grunt-contrib-clean")
}
