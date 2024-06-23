const { SchemaType } = require("mongoose");
const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>{console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//-----------user--------------------------
const userSchema = new Schema({
  username:{
    type:String,
  },
  email:{
     type:String,
  }
  
});


//-------------------post-------------------
const postSchema = new Schema({
  content:{
    type:String,
  },
  likes:{
    type:Number,
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }

});

// userSchema.pre('remove', async function(next) {
//   await Post.deleteMany({ user: this._id });
//   next();
// });



const User = mongoose.model("User",userSchema);

const Post = mongoose.model("Post",postSchema);

const addData = async ()=>{


//         let user1 = new User({
//              username:"sneha",
//              email:"nikeeta@gmail.com"
//         });
// console.log(user1);
        // let user1 = await User.findOne({username:"nikeeta"});

      //  let post1 =  new Post({
        //   content:"hello world",
        //   likes:40,
        // });

        // post1.user = user1;

        //  let Postdata = await post1.save();
        // console.log(Postdata);


        // let show = await Post.find({}).populate("user","username");
        // console.log(show);



        //let Userdata = await user1.save();
        // console.log(Userdata);


};
addData();


// const deleteUserAndPosts = async (userId) => {
//   try {
//     // Delete user and trigger middleware to delete associated posts
//     const user = await User.findById(userId);
//     if (!user) {
//       console.log(`User with ID ${userId} not found.`);
//       return;
//     }

//     await user.deleteOne();
//     console.log(`User with ID ${userId} and associated posts deleted successfully.`);
//   } catch (error) {
//     console.error("Error deleting user and posts:", error);
//   }
// };

// Example usage:
deleteUserAndPosts('666fff598d3a01007e6b1997'); 