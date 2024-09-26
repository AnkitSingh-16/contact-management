const express = require("express");
const app = express();
const contactRoute = require("./routes/contactRoute");
const userRoute = require("./routes/userRoute");
const dbConnect = require("./config/dbConnection");
const dotenv = require('dotenv')

dotenv.config();

dbConnect();
app.use(express.json());
app.use("/api/contact", contactRoute);
app.use("/api/user", userRoute);
app.get('/', (req, res) => {
    res.send("hii there");
})

app.listen(5000, () =>
  console.log(` server is running on port http://localhost:${5000}`)
);
