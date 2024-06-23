
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Chat  = require("./models/chat.js");
const path = require("path");
const methodOverride = require("method-override");
const expressError = require("./ExpressError.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then((result)=>{
    console.log("connection succesfully ",result);
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//insert data
// let chat1 = new Chat({
//     from:"nikeeta",
//     to:"sneha",
//     message:"hi hello i am nik",
//     created_at:new Date()
// });
// chat1.save().then((data)=>{
//     console.log("hi i am nik",data);
// }).catch((error)=>{
//     console.log(error,"oh no error occurse");
// })

//index Route
app.get("/chats",async(req,res,next)=>{
    try{
   let chats = await Chat.find();


//  Chat.find().then((data)=>{
//     console.log(data);

res.render("index.ejs",{chats});
    } catch(err){
      next(err);
    }
});

//New AND Create Route
// app.use("/chats/new",(req,res,next)=>{
//   res.send("error occurse");
//   next(err);
// });
app.get("/chats/new",(req,res)=>{
    // throw new expressError(404,"some error occurse");
res.render("newChat.ejs");

});


app.post("/chats",async(req,res,next)=>{
    try{
  let{from,to,message} = req.body;
  let newChats = new Chat({
    from : from,
    to : to,
    message :message,
    created_at : new Date()
  });
  await newChats.save();
//   .then((result)=>{
//     console.log("data are save");
//   }).catch((error)=>{
//     console.log(error);
//   });

//   console.log(newChats);
 res.redirect("/chats");
} catch(err){
    next(err);
   // throw new expressError();
}
});

// asyncWrap function
function asyncWrap(fn){
  return function(req,res,next){
       fn(req,res,next).catch((err)=>
        
        next(err));
  };
}


app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
  
let{id} = req.params;
let chat = await Chat.findById(id);
if(!chat){
  next( new expressError(404,"chat not found"));
}
res.render("edit.ejs",{chat});
  
}));

//error handling
// app.get("/chats/:id",async(req,res,next)=>{
//     try{
//   let{id} = req.params;
//   let chat = await Chat.findById(id);
//   if(!chat){
//     next( new expressError(404,"chat not found"));
//   }
// res.render("edit.ejs",{chat});
//     } catch(err){
//         next(err);
//     }
// });


//edit Rout:
app.get("/chats/:id/edit",async(req,res,next)=>{
    try{
  let{id} =  req.params;
  let chat = await Chat.findById(id);
 res.render("edit.ejs",{chat});
    } catch(err){
        next(err);
    }
});

app.put("/chats/:id",async(req,res)=>{
  let{id} = req.params;
  let{message:msg} = req.body;
  console.log(msg);
  let updatedChat = await Chat.findByIdAndUpdate(id,{message:msg},{runValidators:true, new:true});
  console.log(updatedChat);
res.redirect("/chats");
});

//delete

app.delete("/chats/:id",asyncWrap( async(req,res,next)=>{
    try{
   let{id} = req.params;
   let del = await Chat.findByIdAndDelete(id);
   console.log(del);
   res.redirect("/chats");
    } catch(err){
        next(err);
    }
}));

app.get("/nik",(req,res)=>{
  req.send("hello");
});

//mongoose error
const handleValidationErr = (err)=>{
  console.log("this is an validation error");
  console.dir(err.message);
  return err;
};
//print error message
app.use((err,req,res,next)=>{
 console.log(err.name);
 if(err.name === "ValidationError")
  {
    err = handleValidationErr(err);
    //console.log(err);
  }
 next(err);
});

// Error handling Middleware
app.use((err,req,res,next)=>{
  let{status=500,message="some eeror messege" } = err;
  res.status(status).send(message); 
});

let port = 8080;
app.listen(port,()=>{
    console.log("run on port 8080");
});
