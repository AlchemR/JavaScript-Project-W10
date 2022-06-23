//level1trial

import * as planck from 'planck/dist/planck-with-testbed'

window.onload = function () {
  const startbutton3 = document.querySelector('#startbutton3')
  const level3flag = document.querySelector('#level3flag')
  const playbutton = document.querySelector('#playbutton')
  playbutton.addEventListener('click', () => { testbed.togglePause(); })

}

export function level2() {
    planck.testbed('Sandbox', function (testbed) {
      testbed.background = "#111111"
      testbed.speed = 2      
      testbed.width = (innerWidth / 4);
      testbed.height = (innerHeight / 4);

      testbed.hz = 30;
      let pl = planck, Vec2 = pl.Vec2;
      let world = new pl.World(Vec2(0, -10));
      let levelscore = 10000
      testbed.mouseForce = 6000; 
      
      let COUNT = 3;
      
      window.addEventListener('click', () => { if (levelscore < 0) { levelscore = 0 } else { levelscore += -500 } });
      
      let ground = world.createBody();
      ground.createFixture(pl.Edge(Vec2(-80.0, -80.0), Vec2(200.0, -80.0)), 0.0);
      ground.createFixture(pl.Edge(Vec2(200.0, 150.0), Vec2(200.0, -80.0)), 0.0);
      ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(-80.0, -80.0)), 0.0);
      ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(200.0, 150.0)), 0.0);
      ground.createFixture(pl.Edge(Vec2(80.0, 30.0), Vec2(200.0, 0.0)), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' }; ;
      ground.createFixture(pl.Edge(Vec2(80.0, 30.0), Vec2(200.0, 50.0)), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' };;
      
      ground.createFixture(pl.Edge(Vec2(80.0, 30.0), Vec2(80.0, -40.0)), 0.0);;
      ground.createFixture(pl.Edge(Vec2(100.0, -80.0), Vec2(200.0, -20.0)), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' };;
      
      
      let ballBodyDef = {
        position: Vec2(70, -40),
        bullet: false,
        allowSleep: true,
        linearDamping: .01,
        angularDamping: .5
      }
      
      
      let ballStartAttr = {
        friction: .1,
        restitution: .5, 
        density: 10,
        userData: 'ball'
      };
      
      let ballFinishAttr = {
        friction: .2,
        restitution: .1, 
        density: 1,
        userData: 'finish'
      };
      
      
      let ball1 = world.createDynamicBody(ballBodyDef);
      world.destroyBody(ball1)
      
      function generateShot() {
        if (ball1.m_destroyed) {
          ball1 = world.createDynamicBody(ballBodyDef);
          ball1.createFixture(pl.Circle(2), ballStartAttr);
          ball1.kingpin = true;
          ball1.render = { fill: 'white' };
          // const img = new Image()
          // img.src = "https://upload.wikimedia.org/wikipedia/commons/2/27/Wey_source_farringdon.jpg"
        } else { if (!testbed.isPaused()) { world.destroyBody(ball1); if (levelscore > 0) { levelscore = levelscore - 500 }; testbed.pause() } }
      }
      
      generateShot()
      
      const ball3 = world.createDynamicBody(ballBodyDef);
      ball3.setPosition(Vec2(30, 2))
      ball3.createFixture(pl.Circle(2), ballStartAttr);
      ball3.render = { fill: 'blue', stroke: 'blue' };
      const ball4 = world.createDynamicBody(ballBodyDef);

       
      
      let ball2 = world.createBody(Vec2(82,-25));
      ball2.createFixture(pl.Circle(2), ballFinishAttr);
      ball2.render = { fill: 'red', stroke: 'red' };
      
      let a = 1;
      let box = planck.Box(a, a*7);
      
      let x = Vec2(8.0, 8);
      let y = Vec2();
      let deltaX = Vec2(0, 4);
      let deltaY = Vec2(0, 4);
      
      for (let i = 0; i < COUNT; ++i) {
        y.set(x);
        world.createDynamicBody(y).createFixture(box, 5.0);
        y.add(deltaY);
        x.add(deltaX);
      }
      
      
      function keylistener() {
        //there is probably a way to do this with a case statement
        //camera
        
        if (testbed.activeKeys.right) {
          if (cameraLimitX(testbed.x)) { testbed.x += 2 } else { testbed.x = ball1pos.x }
        } else if (testbed.activeKeys.left) {
          if (cameraLimitX(testbed.x)) { testbed.x -= 2 } else { testbed.x = ball1pos.x }
        } else if (testbed.activeKeys.up) {
          if (cameraLimitY(testbed.y)) { testbed.y -= 2 } else { testbed.y = ball1pos.y }
        } else if (testbed.activeKeys.down) {
          if (cameraLimitY(testbed.y)) { testbed.y += 2 } else { testbed.y = ball1pos.y }
        } else if (testbed.activeKeys.C) {
          testbed.togglePause()
        } else if (testbed.activeKeys.fire) {
          generateShot()
        }
        
      }
      
      let ball1pos = ball1.getPosition()
      
      function cameraLimitX(xPos) {
        if ((testbed.x + (testbed.width * .4) > ball1pos.x) && (testbed.x - (testbed.width * .4) < ball1pos.x)) { return true } else { return false }
      }
      
      function cameraLimitY(yPos) {
        if ((testbed.y + (testbed.height * .4) > ball1pos.y) && ((testbed.y - (testbed.height + canvas1.height) * .4) < ball1pos.y)) { return true } else { return false }
      }
      
      function textOut() {
        let scale = 30
        let ballpos = ball1.getPosition()
        context2.clearRect(0, 0, canvas1.width, canvas1.height);
        context2.font = `30px sans-serif`;
        context2.fillStyle = 'white';
        context2.fillText(`Paused : ${testbed.isPaused()}`, 600, `${scale}`);
        context2.fillText(`Level Score:${levelscore}`, 600, `${scale * 2}`);
        context2.fillText(`Total Score: ${totalscore}`, 600, `${scale * 3}`);
      }
      
      
      function finishTouch() {
        world.on('post-solve', function (contact) {
          let fA = contact.getFixtureA(), bA = fA.getBody();
          let fB = contact.getFixtureB(), bB = fB.getBody();
          let throwBall = fA.getUserData() === "ball" ? bA : fB.getUserData() === "ball" ? bB : null;
          let finishBall = fA.getUserData() === "finish" ? bA : fB.getUserData() === "finish" ? bB : null;
          setTimeout(function () { if (throwBall && finishBall) { if (!testbed.isPaused()) { world.destroyBody(throwBall); testbed.pause(); addScore(); textOut(); if (throwBall.kingpin) { playbutton.style.display = 'block'; levelEnd() } } } }, 1);
        });
      }
      
      function addScore() { return totalscore += levelscore }
      
      function levelEnd() {
        level3flag.style.display = 'block';
        startbutton3.style.display = 'block';
        playbutton.style.display = 'none';
        playdiv.style.display = 'none';
        testbed.canvas.remove()
      }
      
      
      testbed.step = function () {
        keylistener()
        textOut()
        finishTouch()
      };
      
      const playbutton = document.querySelector('#playbutton')
      const playdiv = document.querySelector('#playdiv')
      playbutton.style.display = 'block';
      playdiv.style.display = 'block';
      window.testbed1 = testbed
      playbutton.addEventListener('click', () => { window.testbed.togglePause(); textOut; })
      
      return world
    });
  }
  
  
  