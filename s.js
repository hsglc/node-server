/** @format */

const fs = require("fs");
const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

const filePath = "/Users/hsglc/Desktop/nodejs.txt"; //  at this path we will save our data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json body
app.use("/", router); // use router

let userList = []; // this collection will be saved in the file

let data = fs.readFileSync(filePath, "utf8", (err, data) => {
  // read the user data from the file
  if (err) {
    return;
  }
});

if (data) {
  // if the file is not empty, then parse the data and assing it to the userList
  let list = JSON.parse(data);
  userList = list;
}

router.post("/", function (req, res) {
  const id = req.body.id; // get the id from the request
  const user = userList.find((item) => item.id === id); // find the user in the userList
  if (!user) {
    // if the user is not found, then push the user to the userList
    userList.push({ id, numOfRequests: 1 });
  }
  const updatedUserList = userList.filter((item) => item.id !== id);

  if (user) {
    // if the user exists, then update the number of requests of the user
    user.numOfRequests++;
    updatedUserList.push(user);
  }

  fs.writeFileSync(filePath, JSON.stringify(updatedUserList), (err) => {
    // write the new userList to the file
    if (err) {
      return;
    }
  });

  res.status(200).end(JSON.stringify(user)); // send the response with 200 status code and the user object
});

app.listen(3000, () => {
  console.log("Started on PORT 3000");
});
