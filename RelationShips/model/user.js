const mongoose = require('mongoose');

main().then(()=>{console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    username:{
        type:String,

    },
    address:[
        {
            _id : false,
        location:String,
        city:String
        },
    ],
});

const User = mongoose.model("User",userSchema);

const addUser = async()=>{
    let user1 = new User({
      username:"nikeeta",
      address:[
        {
      
        location:"mirarode",
        city:"pune"
      }
    ]
    });

user1.address.push({location:"katraj 21223",
    city:"nashik"});
    let data = await user1.save();
     console.log(data);
};
addUser();