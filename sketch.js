//Create variables here
var dog, happyDog, dogImg;
var database, foodstock, foodS;

function preload(){
//load images here
	dogImg = loadImage("dog.png");
  happydogImg = loadImage("dog1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,320,25,35);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}

function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
   }
 
  drawSprites();
  fill(255,255,255);
  stroke("black");
  text("Food remaining: "+ foodS, 180, 135);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Dog Milk!",135,220);

  //add styles here

  readStock();
  writeStock();
}

//Function to read values from database
function readStock(data){
  foodS = data.val();
}

//Function to write values in database
function writeStock(x){
  
  if(x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}



