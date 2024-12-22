module.exports = {
  apps : [{
    name   : "fenrir",
    script : "src/index.js",
    watch  : true,
    ignore_watch : ["node_modules", "\\.git", "config.json"],
  }]
}
