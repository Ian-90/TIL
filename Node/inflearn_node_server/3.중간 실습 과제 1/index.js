const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.listen(3000, () => {
  console.log("start, express server on port 3000");
});

app.post("/search_result", (req, res) => {
  console.log(req.body.term);
  const responseData = [
    { aa: 1 },
    { aa: 2 },
    { aa: 3 },
    { aa: 4 },
    { aa: 5 },
    { aa: 6 },
    { aa: 7 },
    { aa: 8 },
    { aa: 9 },
    { aa: 10 }
  ];

  if (req.body.term === "aa") {
    res.json(responseData);
  }
});
