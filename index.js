const express = require("express");
const app = express();
const PORT = 8000;
//템플릿
app.set("view engine", "ejs");
app.use("/view", express.static(__dirname + "/views"));

//bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const useRouter = require("./routes/user");
app.use("/", useRouter);

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
