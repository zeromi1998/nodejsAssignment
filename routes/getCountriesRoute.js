const express = require("express")
const countriesData = require("../countries.json");
const router = express.Router()

const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const genareatedToken = crypto.randomBytes(64).toString('hex')

const fs = require("fs")

router.get("/countries", (req, res) => {
    // res.json(countriesData)
    res.render("index", { data: countriesData })

})

function getData(code) {

    console.log("code ", code)
    for (var i = 0; i < countriesData.length; i++) {
        // console.log("jk",countriesData[i])

        if (code === countriesData[i].code) {
            return countriesData[i]
        }
        // else {
        //   return "Data not Found"
        // }

    }
}

router.get("/countries/:code", (req, res) => {


    const data = getData(req.params.code)
    console.log("data", data)

    if (data != undefined) {
        res.render("country_code", { data: data })
    }
    else {


        res.json("Data not Found")
    }


})

const newData = [{
    "name": "USA",
    "code": "US",
    "id": 155
},

{
    "name": "Norway",
    "code": "NP",
    "id": 154
},
{
    "name": "India",
    "code": "IN",
    "id": 130
},

{
    "name": "Japan",
    "code": "JP",
    "id": 131
},
{
    "name": "United Kingdom",
    "code": "UK",
    "id": 158
},

]

router.get("/add/country", (req, res) => {

    fs.writeFile("./countries.json", JSON.stringify(newData), (err) => {
        if (err) throw err

        res.render("add_country", { data: countriesData })
        console.log("New DataAdded .....")
    })

})


function generateAccessToken() {
    return
}

router.get("/generateToken", (req, res) => {
    const genToken = generateAccessToken()


    const token = jwt.sign("Verified", genareatedToken);

    res.cookie("token", token)
    res.send("Token genareted")
})


function authJwtToken(req, res, next) {

    const headerToken = req.cookies.token;
    console.log("auth toekn", headerToken)

    jwt.verify(headerToken, genareatedToken, (err, data) => {
        if (err) {
            res.send("invalid Token")
        }

        res.send(data)
    })
}

router.get("/verifyToken", authJwtToken)




module.exports = {
    router
}