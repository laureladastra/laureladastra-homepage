module.exports = function (grunt) {
  // Copy all existing resources to 'build'
  // excluding files transformed during the
  // Grunt process
  grunt.config.set("copy", {
    files: {
      files: [
        {
          expand: true,
          cwd: "src",
          src: ["**", "!sass/**", "!img/psd/**"],
          dest: "build/"
        },
        {
          expand: true,
          cwd: "node_modules",
          src: ["bootstrap/dist/js/bootstrap.bundle.js"],
          flatten: true,
          filter: "isFile",
          dest: "build/js/"
        }
      ]
    }
  })
  grunt.loadNpmTasks("grunt-contrib-copy")
}
