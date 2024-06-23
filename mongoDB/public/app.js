let butn = document.querySelector("#btn");
butn.addEventListener("click",()=>{

   // alert("ok");
   let value = confirm("confirm delete");
   if(value){
    console.log("delete");
   }
   else{
    console.log("not");
   }
    console.log("button was click");
});
