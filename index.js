window.onload = () => {

  var stage = document.getElementById('stage');
  var context = stage.getContext('2d');
  var storage = localStorage.getItem('record');
  var record = document.getElementById('record')
  record.innerHTML = storage === null ? "Record = 0" : "Record = " + storage;

  document.addEventListener("keydown", keyPush);

  setInterval(game, 60);

  const vel = 1; //velocidade
  var vx = vy = 0; //velovidade inicial
  var px = 10; //ponto de partida
  var py = 15; //ponto de partida
  var lp = 20; // lenght-tamanho das peças
  var qp = 20; // quantidade de peças
  var ax = ay = 15; //posicição inicial do ponto

  var trail = []; // rastro da cobra
  var tail = 5;

  function game() {
    px += vx;
    py += vy;

    // quando a cobra sai de uma extremidade, entra na outra
    if (px < 0) {
      px = qp - 1;
    }

    if (px > qp - 1) {
      px = 0;
    }

    if (py < 0) {
      py = qp - 1;
    }

    if (py > qp - 1) {
      py = 0;
    }
    
    //style do canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, stage.width, stage.height);

    //pinta o ponto
    context.fillStyle = "red";
    context.fillRect(ax*lp, ay*lp, lp, lp);

    //pinta a cobra
    context.fillStyle = "DarkOrchid";
    for (let index = 0; index < trail.length; index++) {
      context.fillRect(trail[index].x*lp, trail[index].y*lp, lp, lp);
      
      if (trail[index].x == px && trail[index].y == py) {
        vx = vy = 0;
        
        if ((storage === null ||storage <= tail) && tail > 5 ) {
          localStorage.setItem('record', JSON.stringify(tail));
          record.innerHTML = "Record = " + tail;
        }

        tail = 5;
      }
    }

    
    //pinta a cabeça
    context.fillStyle = "DarkMagenta";
    for (let index = 0; index < trail.length; index++) {
      if (index == trail.length - 1) {
        
        context.fillRect(trail[index].x*lp, trail[index].y*lp, lp, lp);
      }
    }


    // recebo a posição de px e py
    trail.push({x:px, y:py})

    //elimina a ultima posição, mantem o tail
    while (trail.length > tail) {
      trail.shift();
    }

    //atribui um novo local para o ponto
    if (ax == px && ay == py) {
      tail++;
      ax = Math.floor(Math.random() * qp)
      ay = Math.floor(Math.random() * qp)
    }
  }

  //basicamente, identifica as teclas, e direciona a posição da cobra
  function keyPush(e) {

    switch(e.keyCode) {
      case 37: //left
        vx = -vel;
        vy = 0;
        break;
      case 38: //up
        vx = 0;
        vy = -vel;
        break;
      case 39: // right
        vx = vel;
        vy = 0;
        break;
      case 40: // down
        vx = 0;
        vy = vel;
        break;
      default:
        break;
    }
  }
}