const pkgVersion = require("../../package.json").version
const { updateFileExtension } = require("../util")

const banner = `/*
 * Laure Ladastra - Homepage v${pkgVersion} (https://laureladastra.com/)
 * Copyright ${new Date().getFullYear()} Quantaleap B.V. (https://github.com/twbs/bootstrap/graphs/contributors)
 * All Rights Reserved (https://raw.githubusercontent.com/laureladastra/laureladastra-homepage/refs/heads/main/LICENSE.md)
 */`

module.exports = function (grunt) {
  // Minify JavaScript files
  grunt.config.set("uglify", {
    modules: {
      // Process files from 'node-modules' before additional scripts
      // are added to the folder
      options: {
        banner: banner
      },
      files: [
        {
          expand: true,
          cwd: "build/js",
          src: "**/*.js",
          dest: "build/js/",
          rename: updateFileExtension()
        }
      ]
    },
    files: {
      options: {
        banner: banner
      },
      files: [
        {
          expand: true,
          cwd: "src/js",
          src: "**/*.js",
          dest: "build/js/",
          banner: banner,
          rename: updateFileExtension()
        }
      ]
    }
  })
  grunt.loadNpmTasks("grunt-contrib-uglify")
}
