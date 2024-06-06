import express from "express";
import mongoose, {Schema, model} from "mongoose";
import { ErrorHandler, TryCatch , ErrorMiddleware} from "./ErrorHandler.js";
import {body, validationResult, check, param, query} from "express-validator";




const p = mongoose.connect("mongodb+srv://manishbug21cs:chy7gHjIT59Q8pTu@portfolio.umxcqhn.mongodb.net/", {dbName: "portfolio"});
p.then((data)=>{
    console.log(data.connection.host);
    console.log("connected");
}).catch((error)=>{
    console.log("error occured");
    // console.log(error);
    throw error;
})


const userSchema = new Schema({
    firstName :{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    phoneNo:{
        type:String,
        required:true,
        
    },
    msg:{
        type:String,
        required:true,
    }
})

const userModel = model("user", userSchema);






const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
  
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
  
    if (errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages, 400));
  };
  
  const registerValidator = () => [
    
    body("firstName", "Please Enter first Name").notEmpty(),
    body("lastName", "Please Enter last name").notEmpty(),
    body("email", "Please Enter email").notEmpty(),
    body("phoneNo", "Please Enter Phone no.").notEmpty(),
    body("msg", "Please type some message").notEmpty(),

  ];
  



const app = express();

app.use(express.json())


const controller = TryCatch(async(req, resp) =>{
    // console.log(req.body)
    const {firstName, lastName, email, phoneNo, msg} = req.body;

    const b = await userModel.create({firstName, lastName, email, phoneNo, msg});
    console.log(b);

    return resp.json({
        success: true,
        message:"we will contact u soon",
    })
    

})

app.post("/", registerValidator(), validateHandler, controller);

app.use(ErrorMiddleware);




app.listen(5000, ()=>{
    console.log("server is running on port 5000");
})











