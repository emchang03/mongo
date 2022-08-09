// require mongoose 
const mongoose = require("mongoose"); 

// run and catch a potential error 
main().catch(err => console.log(err)) ; 


// async main function 
async function main(){
  // Replace the uri string with your connection string.
  const uri =  "mongodb://localhost:27017";
  const dbPath = "/fruitsDB";
  await mongoose.connect(uri + dbPath)

  // make a fruit schema 
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String, 
      required: [true, 'Where is the fruit name?']
    },
    rating: {
      type:  Number,
      min: 1,
      max: 5
    },
    review: String
  }); 

  // make a model 
  const Fruit =  mongoose.model("Fruit", fruitSchema); 

  // make our first documents 
  const lychee = new Fruit({
    name: "Lychee", 
    score: 5,
    review: "so yummy and fresh!"
  }); 

  const guava = new Fruit({
    name: "Guava", 
    score: 4,
    review: "not flavorful enough"
  }); 

  const passionfruit = new Fruit({
    name: "Passionfruit",
    score: 0,
    review: "idk man i never tried it lol"
  });


  // make a person schema 
  const personSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    favoriteFruit: fruitSchema
  });

  // make a person model 
  const Person = mongoose.model("Person", personSchema); 

  // add a person to the document 
  const john = new Person({
    name: "John",
    age: 8
  });


  Person.updateOne({name:"John"}, {favoriteFruit: guava}, (err)=>{
    if(err){
      console.log("error updating")
    } else{
      console.log("successfully updated")
    }
  });

  Person.deleteMany({name:"John"}, (err)=>{
    if(err){
      console.log("Could not delete")
    }else{
      console.log("Successfully deleted")
    }
  });


  // add all the fruits
  // Fruit.insertMany([lychee, guava, passionfruit], function(err){
  //   if(err){
  //     console.log(err); 
  //   }else{
  //     console.log("Successfully added to database!"); 
  //   }
  // });   


  // Fruit.find((err,fruits)=>{
  //   if(err){
  //     console.log("Error"); 
  //     process.exit();
  //   }
  //   else{
  //     fruits.forEach((fruit)=>{
  //       console.log(fruit.name);
  //     }); 
  //       process.exit(); 
  //   }    
  // });



  // Fruit.deleteOne( {name: "Passionfruit"}, function(err){
  //   if(err){
  //     console.log(err)
  //   }else{
  //     console.log("successfully deleted")
  //   }
  // })






} // end main method 
 
