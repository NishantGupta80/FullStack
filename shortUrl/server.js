const express = require("express");
const uuid = require("uuid");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/short-url", (req, res) => {
  const { longUrl } = req.body;
  const id = uuid.v4();
  const newUrlEntry = {
    id,
    longUrl,
  };
  fs.readFile("urls.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const urls = JSON.parse(data);
    urls.push(newUrlEntry);
    fs.writeFile("urls.json", JSON.stringify(urls), (err) => {
      if (err) {
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(201).json({
        shortUrl: `http://localhost:3000/${id}`,
      });
    });
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("urls.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
      return;
    }
    const urls = JSON.parse(data);
    const urlEntry = urls.find((entry) => entry.id === id);
    res.redirect(urlEntry.longUrl);
  });
});

app.get("/ping", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`app listening on port ${port}!`));
