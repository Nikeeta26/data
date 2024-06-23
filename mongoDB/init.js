const mongoose = require('mongoose');
const Chat  = require("./models/chat.js");

main().then((result)=>{
    console.log("connection succesfully ",result);
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

let allchats = [
    {
        from:"nikeeta",
        to:"sneha",
        message:"hi hello i am nik",
        created_at:new Date()
        },
        {
            from:"nikeeta",
            to:"sneha",
            message:"hi hello i am nik",
            created_at:new Date()
            },
    
            {
                from:"nikeeta",
                to:"sneha",
                message:"hi hello i am nik",
                created_at:new Date()
                },

                {
                    from:"nikeeta",
                    to:"sneha",
                    message:"hi hello i am nik",
                    created_at:new Date()
                    }
];

 Chat.insertMany(allchats);