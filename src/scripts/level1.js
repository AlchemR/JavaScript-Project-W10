//level1trial

import * as planck from 'planck/dist/planck-with-testbed'


window.onload = function () {
  const startbutton2 = document.querySelector('#startbutton2')
  const level2flag = document.querySelector('#level2flag')
  const playbutton = document.querySelector('#playbutton')
  playbutton.addEventListener('click', () => { testbed.togglePause(); })
}

export function level1() {
  planck.testbed('Sandbox', function (testbed) {



      let totalscore1 = totalscore
      testbed.background = "#111111"
      testbed.speed = 2
      console.log("Innerwidth", innerWidth)
      console.log("Innerheight", innerHeight)
      testbed.width = (innerWidth / 4);
      testbed.height = (innerHeight / 4);
      testbed.hz = 30;
      testbed.lineWidth = 32;
      window.testbed = testbed
      let pl = planck, Vec2 = pl.Vec2;
      let world = new pl.World(Vec2(0, -10));
      testbed.mouseForce = 6000; 
      let levelscore = 10000 // 10K tenative


      let COUNT = 12;
      
        window.addEventListener('click', () =>  { if (levelscore < 0) {levelscore = 0 } else {levelscore += -500} } );

      

      let ground = world.createBody();
    // ground.createFixture(pl.Edge(Vec2(-80.0, 0.0), Vec2(60.0, 0.0)) ).render = ({ lineWidth: '10', stroke: 'blue' })
    // ground.createFixture(pl.Edge(Vec2(120.0, 0.0), Vec2(200.0, 20.0)) ).render = { width: '10px' };
    // ground.createFixture(pl.Edge(Vec2(60.0, 0.0), Vec2(130.0, -30.0)) ).render = { width: '10px' };
    // ground.createFixture(pl.Edge(Vec2(200.0, -30.0), Vec2(120.0, -80.0)) ).render = { width: '10px' };
    // ground.createFixture(pl.Edge(Vec2(-80.0, -80.0), Vec2(200.0, -80.0)) ).render = { width: '10px' };
    // ground.createFixture(pl.Edge(Vec2(200.0, 150.0), Vec2(200.0, -80.0)) ).render = { width: '10px' };
    // ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(200.0, 150.0)) ).render = { width: '10px' };
    ground.createFixture(pl.Box(70, .2, Vec2(-10, 0), 0)).render = { stroke: 'white', fill: 'white' };
    ground.createFixture(pl.Box(41, .2, Vec2(160, 10), -50)).render = { stroke: 'white', fill: 'white' };
    ground.createFixture(pl.Box(38, .2, Vec2(95, -15), -.40)).render = { stroke: 'white', fill: 'white' };
    ground.createFixture(pl.Box(47, .2, Vec2(160, -55), .55)).render = { stroke: 'white', fill: 'white' };
    ground.createFixture(pl.Box(.2, 115, Vec2(200, 35) )).render = { stroke: 'white', fill: 'white' }; // side walls R
    ground.createFixture(pl.Box(.2, 115, Vec2(-80, 35) )).render = { stroke: 'white', fill: 'white' }; // side wall L
    ground.createFixture(pl.Box(140, .2, Vec2(60, -80), .0)).render = { stroke: 'white', fill: 'white' }; // floor
    ground.createFixture(pl.Box(140, .2, Vec2(60, 150), .0)).render = { stroke: 'white', fill: 'white' }; // roof

    // ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(-80.0, -80.0)) ).render = { width: '10px' };
    
    // ground.createFixture(pl.Polygon(Vec2(-80.0, 2.0), Vec2(60.0, 60.0), Vec2(60.0, 4.0), Vec2(-80.0, 4.0) )  ).render = { stroke: 'red' };
    
    // ground.createFixture(pl.Polygon(Vec2(-80.0, 2.0), Vec2(60.0, 2.0), Vec2(60.0, 4.0), Vec2(-80.0, 4.0) )  ).render = { width: '10px' };
    // pl.Box(Vec2(-80.0, 5.0), Vec2(60.0, 10.0)).render = {stroke:"red", fill: 'red'}
    // pl.Box(Vec2(-80.0, 5.0), Vec2(60.0, 10.0)).render = {stroke:"red", fill: 'red'}
      // ground.createFixture(pl.Box(Vec2(-80.0, 15.0), Vec2(200.0, 150.0)), 5.0);

      let ballBodyDef = {
        position: Vec2(-50, 10),
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
          ball1.stillActive = true;
          ball1.render = { fill: 'white', stroke: 'white' };
        } else { if (!testbed.isPaused()) {world.destroyBody(ball1); if (levelscore > 0) {levelscore = levelscore - 500}; testbed.pause()}  }
      }

      generateShot()

      const ball3 = world.createDynamicBody(ballBodyDef);
      ball3.setPosition(Vec2(30, 2))
      ball3.createFixture(pl.Circle(2), ballStartAttr);
      ball3.m_fixtureList.m_restitution = .9
      ball3.stillActive = true;
      ball3.render = { fill: 'blue', stroke: 'blue' };


      let ball2 = world.createBody(Vec2(40,-78));
      ball2.createFixture(pl.Circle(2), ballFinishAttr);
      // ball2.createFixture(pl.Circle(4), ballFinishAttr);
      ball2.kingpin = false;
      ball2.render = { fill: 'red', stroke: 'red' };

      let a = 3;
      let box = planck.Box(a, a);

      let x = Vec2(50.0, 8);
      let y = Vec2();
      let xplus = Vec2(0, 8);
      let yplus = Vec2(0, 8);

      for (let i = 0; i < COUNT; ++i) {
        y.set(x);
          world.createDynamicBody(y).createFixture(box, 5.0);
          y.add(yplus);
        x.add(xplus);
      }



      function keylistener() {
        //there is probably a way to do this with a case statement
        //camera
        // let ball1pos = ball1.getPosition()
        if (testbed.activeKeys.right) {
          if (cameraLimitX(testbed.x)) { testbed.x += 2 } else { testbed.x = ball1pos.x }
        } else if (testbed.activeKeys.left) {
          if (cameraLimitX(testbed.x)) { testbed.x -= 2 } else { testbed.x = ball1pos.x }
        } else if (testbed.activeKeys.up) {
          if (cameraLimitY(testbed.y)) { testbed.y -= 2 } else { testbed.y = ball1pos.y }
        } else if (testbed.activeKeys.down) {
          if (cameraLimitY(testbed.y)) { testbed.y += 2 } else { testbed.y = ball1pos.y }
        } else if (testbed.activeKeys.fire) {
          testbed.togglePause()
        }
        // else if (testbed.activeKeys.fire) { generateShot() }

      }

      let ball1pos = ball1.getPosition()

      function cameraLimitX(xPos) {
        if ((testbed.x + (testbed.width ) > ball1pos.x) && (testbed.x - (testbed.width  ) < ball1pos.x)) { return true } else { return false }
      }

      function cameraLimitY(yPos) {
        if ((testbed.y + (testbed.height * 1) > ball1pos.y) && (testbed.y - ((testbed.height ) * 1) < ball1pos.y)) { return true } else { return false }
      }

      function textOut() {
        let scale = 24
        let ballpos = ball1.getPosition()
        let finishball = ball2.getPosition()
        let bonusball = ball3.getPosition()

        context2.clearRect(0, 0, canvas1.width, canvas1.height);

        context2.font = `28px sans-serif`;
        context2.fillStyle = 'white';
        context2.fillText(`Paused : ${testbed.isPaused()}`, (innerWidth / 2.3), `${scale}`);
        context2.fillText(`Level Score:${levelscore}`, (innerWidth / 2.3), `${scale * 2}`);
        context2.fillText(`Total Score: ${totalscore}`, (innerWidth / 2.3), `${scale * 3}`);
        context2.fillText(`← → ↑ ↓: Move Camera`, (innerWidth / 2.5), `${scale * 4}`);
        
        if (ball3.stillActive === true) { if (((bonusball.y <= (finishball.y + 4.5)) && (bonusball.y >= finishball.y - 4.5)) && ((bonusball.x <= (finishball.x + 4.5)) && (bonusball.x >= finishball.x - 4.5))) { ball3.stillActive = false; world.destroyBody(ball3); addScore()   } }
        if (ball1.stillActive === true) { if (((ballpos.y <= (finishball.y + 4.5)) && (ballpos.y >= finishball.y - 4.5)) && ((ballpos.x <= (finishball.x + 4.5)) && (ballpos.x >= finishball.x - 4.5))) { ball1.stillActive = false; world.destroyBody(ball1); addScore(); playbutton.style.display = 'block'; testbed.pause(); levelEnd()  } }
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

      function addScore(){  totalscore += levelscore }

function levelEnd(){
level2flag.style.display = 'block';
startbutton2.style.display = 'block';
playbutton.style.display = 'none';
playdiv.style.display = 'none';
testbed.canvas.remove();
}



      testbed.step = function () {
        keylistener()
        textOut()
        // finishTouch()
      };

    const playbutton = document.querySelector('#playbutton')
    const playdiv = document.querySelector('#playdiv')
    playbutton.style.display = 'block';
    playdiv.style.display = 'block';
    window.testbed = testbed
    playbutton.addEventListener('click', () => { window.testbed.togglePause(); textOut; })

return world
    });
  }


