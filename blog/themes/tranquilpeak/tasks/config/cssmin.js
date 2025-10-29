module.exports = function (grunt) {
  grunt.config.set("cssmin", {
    // Minify `style.css` file into `style.min.css`
    prod: {
      files: [
        {
          expand: true,
          cwd: "source/assets/css",
          src: ["style.css"],
          dest: "source/assets/css",
          ext: `-af388f72de52c378c4a2f78ce390db255bd3da6014a49091319ef265b9887af4.min.css`
        }
      ]
    }
  })

  grunt.loadNpmTasks("grunt-contrib-cssmin")
}
