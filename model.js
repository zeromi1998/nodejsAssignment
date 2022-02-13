const mongoose = require("mongoose")

const paraSchema = {
  para:String

}

const paraData  =  mongoose.model("Paragraph",paraSchema)
module.exports = {
    paraData
}