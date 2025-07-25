module.exports = function (grunt) {
  // Replace stylesheet and javascript links
  // after updating names during minification process
  grunt.config.set("replace", {
    files: {
      src: ["src/*.html"],
      dest: "build/",
      replacements: [
        {
          from: "../node_modules/bootstrap/dist/js/bootstrap.bundle.js",
          to: "js/vendors/bootstrap.bundle.js"
        },
        {
          from: ".js",
          to: ".min.js"
        }
      ]
    }
  })
  grunt.loadNpmTasks("grunt-text-replace")
}
