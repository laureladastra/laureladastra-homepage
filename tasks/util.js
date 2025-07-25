// Callback to rename .js files to .min.js extension
function updateFileExtension() {
  return function (dest, src) {
    const path = dest + src
    if (src.endsWith(".min.js")) {
      return path
    } else {
      return path.replace(".js", ".min.js")
    }
  }
}

module.exports = {
  updateFileExtension
}
