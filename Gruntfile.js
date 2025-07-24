module.exports = function (grunt) {
  // Load the include-all library in order to require all of our grunt
  // configurations and task registrations dynamically.
  let includeAll
  try {
    includeAll = require("include-all")
  } catch (err) {
    console.error("Could not find `include-all` module.")
    console.error("Skipping grunt tasks...")
    console.error("To fix this, please run:")
    console.error("npm install include-all --save-dev")
    console.error(err)
  }

  /**
   * Loads Grunt configuration modules from the specified
   * relative path. These modules should export a function
   * that, when run, should either load/configure or register
   * a Grunt task.
   * @param {String} path
   * @return {function}
   */
  function loadTasks(path) {
    return (
      includeAll({
        dirname: require("path").resolve(__dirname, path),
        filter: /(.+)\.js$/
      }) || {}
    )
  }

  /**
   * Invokes the function from a Grunt configuration module with
   * a single argument - the `grunt` object.
   * @param {Object} tasks
   * @return {void}
   */
  function invokeConfigFn(tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt)
      }
    }
  }

  // Load task functions
  const taskConfigurations = loadTasks("./tasks/config")
  const registerDefinitions = loadTasks("./tasks/register")

  // Run task functions to configure Grunt.
  invokeConfigFn(taskConfigurations)
  invokeConfigFn(registerDefinitions)
}
