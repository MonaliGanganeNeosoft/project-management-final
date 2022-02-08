const mongoose = require("mongoose");
const projectDetailsSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"pls enter title"]
    },
    description:[
        {
            url:{
                type:String,
                required:false,
            },
            text:{
                type:String,
                required:false,

            }
        },
    ],
    demo_URL:{
        type:String,
        required:[false,"pls enter demo"]
    },
    github_URL:{
        type:String,
        required:[false,"pls enter github"]
    },
    //multiple question
    questionss:[
        
        {
            questions:{
                
                    type:String,
                    required:false
                
            },
        }
    ],
    //one question=>1 ans
    anwers:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: false,
              },
              name: {
                type: String,
                required: false,
              },
              question: {
                type: String,
                required: false,
              },
              ans: {
                type: String,
                required: false,
              },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = mongoose.model("ProjectDetails",projectDetailsSchema)