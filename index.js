const path = require("path");
const { execSync } = require("child_process");

execSync("node Backend/server.js", {
  stdio: "inherit",
  cwd: __dirname 
});
