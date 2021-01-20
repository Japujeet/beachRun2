var beach, beachImg, beachball, beachballImg, mat, matImg, umbrella, umbrellaImg, obstacle, obstacleGrp, Points, pointsImg, pointGrp;
var you, youAnimation;
var ground;
var score = 0,
  survive = 0,
  injuries = 0;
var gameover, Gameover;
var play = 1,
  end = 0;
var gamestate = 1;

function preload() {
  beachImg = loadImage("beach123.png");
  youAnimation = loadAnimation("yoou.png", "yoou3.png", "yoou22.png", "yoou3.png");
  beachballImg = loadImage("beachball.png");
  matImg = loadImage("mat.png");
  umbrellaImg = loadImage("umbrella.png");
  pointsImg = loadImage("points.png");
  gameover = loadImage("gameover.png");
}

function setup() {
  createCanvas(600, 400);
  beach = createSprite(200, 200, 10, 10);
  beach.addImage(beachImg);
  beach.velocityX = -(6 + score / 10);
  beach.scale = 1.5;
  you = createSprite(50, 300, 10, 10);
  you.addAnimation("moving", youAnimation);
  you.scale = 0.5;
  obstacleGrp = new Group();
  pointGrp = new Group();
}

function draw() {

  if (gamestate === play) {
    ground = createSprite(300, 365, 600, 5);

    ground.visible = false;

    if (ground.x < 30) {
      ground.x = 200;
    }

    you.collide(ground);

    if (beach.x < 30) {
      beach.x = 200;
    }

    if (keyWentDown("space") && (you.y > 250)) {
      you.velocityY = -19;
    }

    obstacles();


    if (you.isTouching(obstacleGrp)) {
      obstacleGrp.destroyEach();
      injuries = injuries + 1;
    }
    points();

    if (you.isTouching(pointGrp)) {
      score = score + 10;
      pointGrp.destroyEach();
    }

    if (injuries === 10) {
      gamestate = end;

    }

    you.velocityY = you.velocityY + 0.8;

    survive = Math.ceil(frameCount / frameRate());


  }

  if (gamestate === end) {
    Gameover = createSprite(210, 200, 10, 10);
    Gameover.addImage(gameover);

    Gameover.depth = 10;
    pointGrp.destroyEach();
    obstacleGrp.destroyEach();
  }
   camera.position.x = you.x+200;
   camera.position.y = you.y;
    drawSprites();
    fill("black");
    text("Score=" + score, 50, 150);
    text("Time Survived=" + survive, 150, 150);
    text("Injuries=" + injuries, 280, 150);
}

function obstacles() {
  if (frameCount % 300 === 0) {

    var rand = Math.round(random(1, 3))
    obstacle = createSprite(605, 340, 10, 10);
    obstacle.velocityX = -(5 + score / 10);
    obstacle.scale = 0.5;
    obstacle.lifetime = 155;
    obstacle.setCollider("circle", 0, 0, 40);
    //obstacle.debug=true;
    
    switch (rand) {
      case 1:
        obstacle.addImage(beachballImg);


        break;
      case 2:
        obstacle.addImage(matImg);
        obstacle.scale = 1;

        break;
      case 3:
        obstacle.y = 315;
        obstacle.addImage(umbrellaImg);

        break;
      
      default:
        break;
    }
    obstacleGrp.add(obstacle);
  }
}

function points() {
  if (frameCount % 150 === 0) {
    Points = createSprite(605, 200, 10, 10);
    Points.addImage(pointsImg);
    Points.velocityX = -(5 + score / 10);
    Points.scale = 0.2;
    Points.lifetime = 155;
    Points.setCollider("circle", 0, 0, 40);
    pointGrp.add(Points);
    //Points.debug=true;
  }
}