var bird, bird_flying;
var bgSprite;
var vehiclesGroup, droneGroup;

//game state values start, play, end
var gameState = "start"

var score=0;
var highScore=0;

function preload(){
 bird_flying = loadAnimation("images/tile000.png","images/tile001.png","images/tile002.png","images/tile003.png","images/tile004.png", "images/tile006.png", "images/tile007.png", "images/tile008.png", "images/tile009.png", "images/tile010.png","images/tile012.png", "images/tile013.png", "images/tile014.png","images/tile015.png" )
 
  bgImg = loadImage("images/bgimg2.jpg")

  
  drone1 = loadImage("images/drone1.jpg");
  drone2 = loadImage("images/drone2.png");
  drone3 = loadImage("images/drone3.jpg");
  car1 = loadImage("images/car1.png");
  newFont=loadFont("assets/assets/Amatic-Bold.ttf")
}

function setup() {
  //create a canvas
  createCanvas(windowWidth, windowHeight)

  bgSprite = createSprite(width/2, height/2)
  bgSprite.addImage("background", bgImg)
  bgSprite.scale=0.6
  bgSprite.velocityX=-3
  
  bgSprite.x = width/2

  bird = createSprite(100, 200, 50, 50)
  bird.addAnimation("fly", bird_flying)
  bird.scale=0.7

  //groups for sprites
  vehicleGroup = createGroup();
  droneGroup = createGroup();
  transformerGroup = createGroup();
}

function draw() {
  if(score>highScore){
    highScore=score;
  }
  if (gameState === "start"){
    background("red");
    textSize(50);
    fill("black");
    strokeWeight(5);
    textFont(newFont)
    text("Press 's' to START", width/2 - 170, height/2)
    text("High Score"+highScore, width/2 - 170, height/2+100)
    bird.y=0;
  }

  if (gameState === "play"){
    background("blue");
    drawSprites();
    fill("black")
    textSize(20);
    text("Score: "+score, width-100, 100)
    text("High Score: " + highScore, width - 200, 200)
    console.log(bird.y);
    if(frameCount % 10 === 0){
      score+=1
    }
    
    //to make the background move in the left direction
    if(bgSprite.x<0){
      bgSprite.x = width/2
    } 
    //add gravity
    bird.velocityY = bird.velocityY + 0.3
    
    //calling functions to spawn the obstacles
    spawnVehicles();
    spawnDrones();
    spawnTransformers();

    if (vehicleGroup.isTouching(bird) || droneGroup.isTouching(bird) || transformerGroup.isTouching(bird)||bird.y>650){
      gameState = "end"
    }
  }

  if(gameState==='end'){
    background("yellow");
    textSize(50);
    fill("black");
    strokeWeight(5);
    text("Game Over", width/2 - 170, height/2)
    text("Your Score: " + score, width/2 - 50, height/2 + 100)
    text("High Score: "+highScore, width/2 - 50, height/2+150)
    text("Press R to restart", width/2 - 50, height/2 + 200)
  }
}
function keyPressed(){
  if(keyCode === 32){
    bird.velocityY=-5
  }
  //if user presses S or s
  if (keyCode === 115 || keyCode === 83){
    gameState = "play";
  }
  //to detect r or R
  if(keyCode==114 ||keyCode===82){
    if(gameState=="end"){
      gameState="start"
      score=0
    }
  }
}
// spawn drones..
function spawnDrones(){
  if(frameCount % Math.round(random(100, 300)) === 0){
    droneSprite = createSprite(width + 100, Math.round(random(50, 100)), 30, 30);
    droneSprite.velocityX = bgSprite.velocityX

    /*var rand = Math.round(random(1,3));
    switch(rand){
      case 1: droneSprite.addImage(drone1);
            break;
      case 2: droneSprite.addImage(drone2);
            break;
      case 3: droneSprite.addImage(drone3);
            break;
      default: break;
    }*/
      droneSprite.lifetime = 1000;

      droneGroup.add(droneSprite);
  }
}

function spawnVehicles(){
  if  (frameCount % Math.round(random(150, 400)) === 0){
  vehicleSprite = createSprite(width +100, height - 30, 30, 30)
  vehicleSprite.velocityX = bgSprite.velocityX;
  var rand = Math.round(random(1,4));
 /* switch(rand){
    case 1: vehicleSprite.addImage(car1)
            break;
    case 2: vehicleSprite.addImage(car1)
            break;
    case 3: vehicleSprite.addImage(car1)
            break;
    case 4: vehicleSprite.addImage(car1)
            break;
    default: break;
  }*/

  vehicleSprite.lifetime = 700;

  vehicleGroup.add(vehicleSprite);
  }
}

// spawn transformers
function spawnTransformers(){
  if (frameCount % Math.round(random(150, 400)) === 0){
    transformerSprite = createSprite(width + 100, height - 30, 40, 40);
    transformerSprite.velocityX = bgSprite.velocityX;
    
    transformerSprite.lifetime = 1000;
    transformerGroup.add(transformerSprite);
  }
}
  
  

    
  
