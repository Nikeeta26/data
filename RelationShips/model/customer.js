const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>{console.log("connection successfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//order
const ordereSchema = new Schema({
item:{
    type:String,

},
price:{
    type:Number,
}

});

//customer
const customerSchema = new Schema({
  name:{
     type: String,
  },
  orders: [
      { 
          type: Schema.Types.ObjectId,
       ref: 'Order' 
      }
      ]
  
  });

 
// ------------- pre middleware use for handling deletion ------------

// customerSchema.pre("findOneAndDelete", async ()=> {
// console.log("Pre middleware");
//   //next();
// });

customerSchema.post("findOneAndDelete", async (customer)=> {
  if(customer.orders.length)
    {
     let res= await Order.deleteMany({_id: {$in : customer.orders} });
     console.log(res);
    }
    //next();
  });


  const Order = mongoose.model("Order",ordereSchema);
  const Customer = mongoose.model("Customer",customerSchema);

  



//---------order data insert-----------

// const addOrder = async ()=>{
//   let res =  await Order.insertMany([
//     {item:"samosa",price:20},
//     {item:"wadapaw",price:50},
//     {item:"masala thosa",price:80}
// ]);
// console.log(res);
// };
// addOrder();





  //---------------------customer-----------

//const addCust = async ()=>{
  // let cust1 = new Customer({
  //    name:"nikeeta",
  // });

  // let order1 = await Order.findOne({item:"samosa"});
  // let order2 = await Order.findOne({item:"wadapaw"});

  // cust1.orders.push(order1);
  // cust1.orders.push(order2);
  // let res = await cust1.save();
  // console.log(res);

  //print total object using populate method

//   let res = await Customer.find({}).populate("orders");
//   console.log(res[0]);
// }
//addCust();


// Handling deletion 

const addCust = async()=>{
  let newCust = new Customer({
    name:"rahul kumar",
  });

  let newOrder = new Order({
    item:"pizza",
    price:100,
  });

  let data = newCust.orders = newOrder;
  //let data = newCust.orders.push(newOrder);
  console.log(data);

  await newOrder.save();
  await newCust.save();
}

//addCust();


//----- delete customer -------
const delCust =  async()=>{
  let data = await Customer.findByIdAndDelete('666e8e1b91e6fa407435e4cf');
  console.log(data);
}

delCust();