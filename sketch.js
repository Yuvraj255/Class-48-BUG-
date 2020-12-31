//Declaring Variables
var gameState = "start";

var bird,birdImage;
var scene,sceneImage;
var cloud,cloudImage,cloudsGroup;
var plane,planeImage,planesGroup;
var hitSound,sad,sadImage;
var gameover,gameoverSound,gameoverImage;
var reset,resetImage;
var start,startImage,startButton,buttonImage;
var lives = 3;
var score = 0;

//Function Preload
function preload(){
  //loading Sprite Images
  birdImage = loadAnimation("Images/frame-1.png","Images/frame-2.png");
  sceneImage = loadImage("Images/background.jpg");
  cloudImage = loadImage("Images/cloud.png");
  planeImage = loadImage("Images/plane.png");
  hitSound = loadSound("Sounds/hit2.mp3");
  gameoverSound = loadSound("Sounds/gameover.wav");
  sadImage = loadImage("Images/sad.png");
  startImage = loadImage("Images/startScreen2.png");
  buttonImage = loadImage("Images/startButton.png");
  gameoverImage = loadImage("Images/gameoverImage.png");
  resetImage = loadImage("Images/reset.png");
}

//Function Setup
function setup() {
  createCanvas(750,600);

  startButton = createSprite(400,500,10,10);
  reset = createSprite(400,400,10,10);
  reset.addImage("reset",resetImage);
  reset.scale = 0.5;
  reset.visible = false;
  scene = createSprite(600,300,10,10);
  scene.visible = false;
  
  //Creating Bird
  bird = createSprite(200,300,20,20);
  bird.visible = false;
 
  cloudsGroup = createGroup();
  planesGroup = createGroup();

 }

function draw() {
  background(startImage);
  if(gameState === "start"){

    startButton.addImage("button",buttonImage);
    startButton.scale = 0.4;

    if(mousePressedOver(startButton)){
      gameState = "play";
    }
  }
  if(gameState === "play"){
    background(0);

    //Creating Scene
    scene.visible = true;
    scene.addImage("scene",sceneImage);
    scene.velocityX = -3;
    scene.scale = 2.5;

    bird.addAnimation("bird",birdImage);
    bird.scale = 0.1;
   
    bird.visible = true;
    startButton.visible = false;

    bird.depth = scene.depth+1;

    if(scene.x < 0){
      scene.x = 300;
    }

    score = score+Math.round(frameRate()/60);

  //Creating UP Functoin
  if(keyWentDown(UP_ARROW)){
    bird.velocityY = -12;
  }
  bird.velocityY += 0.8;

  if(bird.y < 0 || bird.y > 600){
    lives = lives-1;
    bird.y = 300;
  }

  clouds();
  planes();

  for(var i=0; i<cloudsGroup.length; i++){
    if(cloudsGroup.isTouching(bird) && lives > 0){
      lives = lives-1;
      cloudsGroup.get(i).destroy();
      hitSound.play();
      sad = createSprite(375,300,10,10);
      sad.addImage("sad",sadImage);
      sad.lifetime = 15;
      sad.scale = 0.2;
    }
  }
  for(var a=0; a<planesGroup.length; a++){
    if(planesGroup.isTouching(bird) && lives > 0){
      lives = lives-1;
      planesGroup.get(a).destroy();
      hitSound.play();
      sad = createSprite(375,300,10,10);
      sad.addImage("sad",sadImage);
      sad.lifetime = 15;
      sad.scale = 0.2;
    }
  }


  if(lives === 0){
    bird.destroy();
    cloudsGroup.destroyEach();
    planesGroup.destroyEach();
    scene.velocityX = 0;
    gameoverSound.play();
    gameState = "end";
  }
  }

  if(gameState === "end"){
    background(gameoverImage);
    scene.visible = false;
    //reset.visible = true;

    /*if(mousePressedOver(reset)){
      gameState = "start";
      reset.visible = false;
      startButton.visible = true;
      score = 0;
      lives = 3;

    }*/
  }

  drawSprites();
  if(gameState === "play"){
  textSize(20);
  fill("red");
  text("Lives:"+lives,550,50);

  text("Score:" + score,550,100);
  }

 
}

//Function for making clouds
function clouds(){
  if(frameCount % 90 === 0){
  cloud = createSprite(750,Math.round(random(20,450)),10,10);
  cloud.addImage("cloud",cloudImage);
  cloud.scale = 0.25;
  cloud.lifetime = 150;
  cloud.velocityX = -5;

  cloudsGroup.add(cloud);
  }
}

//Function for making planes
function planes(){
  if(frameCount % 150 === 0){
    plane = createSprite(750,Math.round(random(10,400)),10,10);
    plane.addImage("plane",planeImage);
    plane.scale = 0.18;
    plane.lifetime = 150;
    plane.velocityX = -5;

    planesGroup.add(plane);
    
  }
}