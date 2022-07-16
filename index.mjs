import createServer from '@tomphttp/bare-server-node';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const port = process.env.PORT || 8080;
const express = require("express");
const app = express();
const config = require("./config.json");
const Corrosion = require("./lib/server")

const bare = createServer('/bare/');

const proxy = new Corrosion({
    codec: 'xor',
    prefix: "/corrosion/",
    title: config.branding
});

proxy.bundleScripts();

app.use(express.static("./static", {
    extensions: ["html"]
}));

app.get("/", function(req, res){
    res.sendFile("index.html", {root: "./static"});
});

app.use(function (req, res) {
    if (req.url.startsWith(proxy.prefix)) {
      proxy.request(req,res);
    } else if (req.url.startsWith("/bare/")) {
      return bare.routeRequest(req, res)
    } else {
      res.status(404).sendFile("404.html", {root: "./static"});
    }
})

app.listen(port, () => {
    console.log(`Amethyst is running at localhost:${port}`)
  })