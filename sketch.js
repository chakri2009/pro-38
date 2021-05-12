
var backgroundImage,background;
var monkey,monkey_running;
var ground,ground_img;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;


function preload(){
  backgroundImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
 

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
 
}

function setup() {
  createCanvas(displayWidth,400);
 
  background=createSprite(0,0,800,400);
  background.addImage(backgroundImage);
  background.scale=1.5;
  background.x=background.width/2;
  background.velocityX=-4;
 
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
 
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
 
  bananaGroup = new Group();
  obstaclesGroup = new Group();
 
  score = 0;
}

function draw() {
   background.velocityX = -3 
camera.y=monkey.y-50;
 
   
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(background.x<100){
    background.x=background.width/2;
  }
 
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10:monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40:monkey.scale=0.18;
                break;
        default: break;
    }
 
    if(keyDown("space") ) {
      monkey.velocityY = -10;
    }
   monkey.velocityY = monkey.velocityY + 0.6;
 
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(monkey)){
        monkey.scale=0.08;
     // score=score-2;
    }
 
  drawSprites();
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
   monkey.depth = banana.depth + 1;
   
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
   
    //assign scale and lifetime to the obstacle    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
