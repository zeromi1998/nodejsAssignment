const express = require("express")

const {router}  =  require("./routes/getCountriesRoute")
const cookieParser = require("cookie-parser");
const app = express()

app.use(cookieParser());


app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false }));

app.use("/",router)



app.listen(8080, () => {
  console.log("server running ...")
})
