/** @format */

const fs = require("fs");
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

const userList = [];

let data = fs.readFileSync(
  "/Users/hsglc/Desktop/nodejs.txt",
  "utf8",
  (err, data) => {
    if (err) {
      return;
    }
  }
);

router.post("/", function (req, res) {
  const id = req.body.id;
  userList[0].forEach((user) => {
    if (id === user.id) ++user.RequestNumber;
  });
  console.log(userList);
  res.end("Verified User");
});

console.log(JSON.parse(data));
userList.push(JSON.parse(data));
console.log(userList);

fs.writeFileSync(
  "/Users/hsglc/Desktop/nodejs.txt",
  JSON.stringify(userList,null,2),
  (err) => {
    if (err) {
        return;
    }
  }
);

// let data1 = fs.readFileSync(
//   "/Users/hsglc/Desktop/nodejs.txt",
//   "utf8",
//   (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   }
// );
// console.log(data1);

app.listen(3000, () => {
  console.log("Started on PORT 3000");
});
