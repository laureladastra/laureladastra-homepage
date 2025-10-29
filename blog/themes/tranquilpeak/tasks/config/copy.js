module.exports = function (grunt) {
  // Rename files after bower.js task to ensure all
  // scripts are prefixed recognizable based to the library
  // they belong to
  grunt.config.set("copy", {
    files: {
      files: [
        {
          expand: true,
          cwd: "source/assets/css",
          src: ["all.css"],
          dest: "source/assets/css",
          rename: function (dest, src) {
            return `${dest}/fontawesome-${src}`
          }
        },
        {
          expand: true,
          cwd: "source/assets/js",
          src: ["all.js"],
          dest: "source/assets/js",
          rename: function (dest, src) {
            return `${dest}/fontawesome-${src}`
          }
        }
      ]
    }
  })
  grunt.loadNpmTasks("grunt-contrib-copy")
}
