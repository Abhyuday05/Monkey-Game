var monkey, monkey_running;
var banana,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

function preload(){
monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(450, 450);
  
  var survivalTime = 0;
  
  monkey = createSprite(80,350,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  score = 0;
}

function draw() {
  monkey.debug = true;
  background("skyblue");
  
    if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12 ;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  spawnBananas();
  spawnStones();
    
  foodGroup = new Group();
  obstacleGroup = new Group();

  if(monkey.isTouching(foodGroup)){
    score = score+1;
  }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score~", + score, 40, 40);
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.velocityXEach = 0;
    foodGroup.velocityXEach = 0;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time : ", + survivalTime,   100, 500);
}

function spawnBananas(){
  if(frameCount % 80 === 0){
  banana = createSprite(450,160,30,30);
  banana.addImage(bananaImage);
  banana.y = Math.round(random(120,200));
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 120;
  foodGroup.add(banana);
  monkey.depth = banana.depth + 1;
  }
}

function spawnStones(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(800,320,10,40);
  obstacle.addImage(obstacleImage);
  obstacle.y=Math.round(random(315,320));
  obstacle.scale = 0.1;
  obstacle.velocityX = -5;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
  } 
}