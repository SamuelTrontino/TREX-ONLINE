  //variaveis
  var trex, trex_running, trexpng;
  var groundImage,ground; 
  var chao
  var nuvem,nuvemimage
  var cactos,cactosimage1,cactoimage2,cactoimage3,cactoimage4,cactoimage5,cactoimage6
  var estadodejogo = "começar" 
  var grupcactos,grupnuvens
  var pontos=0
  var gameoverimage,restarteimage,gameover,restarte
  var pulo,checkpoint,morte

  //imagens
  function preload(){
  gameoverimage = loadImage("gameOver.png")
  restarteimage= loadImage("restart.png")
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexpng = loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png")
  nuvemimage = loadImage("cloud.png")
  cactosimage1 = loadImage("obstacle1.png")
  cactosimage2 = loadImage("obstacle2.png")
  cactosimage3 = loadImage("obstacle3.png")
  cactosimage4 = loadImage("obstacle4.png")
  cactosimage5 = loadImage("obstacle5.png")
  cactosimage6 = loadImage("obstacle6.png")
  pulo = loadSound("jump.mp3")
  checkpoint = loadSound("checkpoint.mp3")
  morte = loadSound("die.mp3")
  }

  function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-110,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trexmorto",trexpng)

  //criando o chao
  chao = createSprite(width/2,height-20,width,20)
  chao.visible=false

  ground= createSprite(width/2,height-30,width,30)
  ground.addImage(groundImage)  

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  grupcactos = new Group() 
  grupnuvens = new Group()  
  
  trex.debug = false
  trex.setCollider("circle",0,0,40)
  //trex.setCollider("rectangle",60,0,100,250,90)
  gameover=createSprite(width/2,height/2)
  gameover.addImage("gameover1",gameoverimage)
  gameover.scale = 0.5
  restarte=createSprite(width/2,height/2+30)
  restarte.addImage("restarte1",restarteimage)
  restarte.scale = 0.4
  gameover.visible = false
  restarte.visible = false
  }


  function draw(){

  //definir a cor do plano de fundo

  background("white");

  //pontos
  text("pontos "+pontos,width/25,50)
  if(pontos>0&&pontos%400===0){
  checkpoint.play()
  }

  
  //impedir que o trex caia
  trex.collide(chao)
  drawSprites();



  if(estadodejogo==="começar"){
   
    //pontos=pontos+Math.round(frameCount/60)
    pontos=pontos+Math.round(getFrameRate()/60);

    //pular quando tecla de espaço for pressionada
    if(touches.length>0||keyDown("space")&&trex.y>height-100){
      trex.velocityY = -10;
      pulo.play()
      touches = []
    }
    
    trex.velocityY = trex.velocityY + 0.5;
    
    ground.velocityX = -(8+pontos/100)
    if(ground.x<0){
    ground.x=ground.width/2
    }
    geracactos();
    geranuvem();
    console.log(frameCount)
    if(trex.isTouching(grupcactos)){
    estadodejogo="fim de jogo"
    morte.play()
    //trex.velocityY = -11
    //pulo.play()
    
    }
  //estado de jogo fim
  }
  else if(estadodejogo==="fim de jogo"){
    ground.velocityX = 0
    grupcactos.setLifetimeEach(-1)
    grupnuvens.setLifetimeEach(-1)
    grupcactos.setVelocityXEach(0)
    grupnuvens.setVelocityXEach(0)
    trex.changeAnimation("trexmorto",trexpng)
    trex.velocityY = 0
    gameover.visible = true
    restarte.visible = true
    if(touches.length>0||mousePressedOver(restarte)){
    console.log("reinicio")  
    reset()
     touches = [] 
    }
  }

  }
  function reset(){
  console.log("dentro da funçao")
  estadodejogo="começar"
  grupcactos.destroyEach()
  grupnuvens.destroyEach() 
  gameover.visible = false
  restarte.visible = false
  pontos=0
  trex.changeAnimation("running", trex_running); 
  }

  //gera nuvem
  function geranuvem(){
  if(frameCount%60===0){
    nuvem = createSprite(width,100)
    nuvem.addImage("nuvem",nuvemimage)
    nuvem.velocityX = -4
    nuvem.y = Math.round(random(0,100))//math=biblioteca round=arrendondar random=aleatorio
    //vida das nuvens 
    nuvem.lifetime = 400
    grupnuvens.add(nuvem)

    //nuvem.debug = true
  }

  }

  

  //gera cactos
  function geracactos (){
  if(frameCount%60===0){
    cactos = createSprite(width,height-40)
    cactos.velocityX = -(4+pontos/100)
    cactos.scale = 0.7
    
    var cactus = Math.round(random(1,6))
    switch(cactus){
    
     case 1: cactos.addImage(cactosimage1);
     break;
     case 2: cactos.addImage(cactosimage2);
      break;
      case 3: cactos.addImage(cactosimage3);
      break;
      case 4: cactos.addImage(cactosimage4);
      break;
      case 5: cactos.addImage(cactosimage5);
      break;
      case 6: cactos.addImage(cactosimage6);
      break;

      default:break;
    }
    //vida dos cactos 
    cactos.lifetime = 400
    grupcactos.add(cactos)
    
    }   
  
  }