var dog,happyDog,dog_pic;
var foodstock, foodS;
var database;

function preload()
{
  dog_pic = loadImage("images/dogImg.png")
	happyDog = loadImage("images/dogImg1.png")
}

function setup() {
database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250,300,20,20);
  dog.addImage(dog_pic)
  dog.scale = 0.15;

  foodstock = database.ref('Food');
  foodstock.on("value", readStock)
  
  textSize(18)
}


function draw() {  

  background(46,139,87);   

 

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

   fill(0)
  text("Press the up arrow key to feed Drago milk",110,50)
  textSize(15)
  text("Food remaining: " + foodS,200,200)
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x<=0) {
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  });
}
  
  

  



