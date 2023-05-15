const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./env.config" });

const app = require("./app");

const DbConnectionString = process.env.MONGODB_REMOTE;

console.log(DbConnectionString);

mongoose
  .connect(DbConnectionString)
  .then((result) => {
    console.log("DB Conn Success...!");
  })
  .catch((error) => {
    console.log("Error Conn to DB...!");
    console.log(error);
  });

const PORT = 4000;
app.listen(PORT, (error) => {
  console.log(`App Started in ${PORT}`);
});

module.exports = mongoose;
