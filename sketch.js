var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;


//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  
  //Monkey
  monkey_running =            loadAnimation("https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/4a316a0c-e674-4ecd-8569-5cd555de6301.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/eccc37dd-63b1-47a1-8428-d779a6453dda.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/a30b16b8-b57e-4161-9ca2-831682e108f1.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/19375b88-92b2-4aca-8db1-94204e1b5a65.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/82507b78-25f4-4a57-84c4-6fe3bec1314a.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/c3956434-a75c-4244-8009-c8f5272fd592.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/b5326685-64e9-4a3e-b39b-3a36037b80c7.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/fa39a583-db6c-49cb-a805-59c67e299ee2.png","https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/12199b78-c712-4ff5-9092-24a7e5cef7ee.png")
  //Banana
  bananaImage = loadImage("https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/0d77ff7a-8fc5-4712-8ebd-0e4a2a4c6af7.png");
  //Obstacle
  obstacleImage = loadImage("https://assets.editor.p5js.org/5fbe53cf2d3f38002479b7d8/47e24744-bfb8-4c5b-85d0-a5c4de56e4aa.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(400,400);
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //score
  score = 0;
  survialTime = 0;
  
}

//Draw
function draw() {
  
  //Background
  background ("white");
  
   //displaying survialtime
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 100, 50);
  
  //displaying score
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 300, 100);
  
 //Monkey
  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    survialTime = Math.ceil(frameCount/frameRate());
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -19; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survialTime.visible = false;
     monkey.velocityX=0;
     ground.velocityX=0;

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("black");
       textSize(30);
     text("Monkey is dead", 100, 240);
   }
 
  
  
 

  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 200 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}



