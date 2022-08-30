//level1trial

import * as planck from 'planck/dist/planck-with-testbed'

window.onload = function () {
  const playbutton = document.querySelector('#playbutton')
  playbutton.addEventListener('click', () => { testbed.togglePause(); })
}

export function level3() {
    planck.testbed('Sandbox', function (testbed) {
      testbed.background = "#111111"
      testbed.speed = 2
      
      testbed.width = (innerWidth / 4);
      testbed.height = (innerHeight / 4);
      testbed.hz = 30;

      let pl = planck, Vec2 = pl.Vec2;
      let world = new pl.World(Vec2(0, -10));
      testbed.mouseForce = 6000; 
      let levelscore = 10000 // 10K tenative
      // turns on/off impulses to apply like slingshot 

      let COUNT = 10;
      window.addEventListener('click', () => { if (levelscore < 0) { levelscore = 0 } else { levelscore += -500 } });

      let ground = world.createBody();
      // ground.createFixture(pl.Edge(Vec2(-80.0, -80.0), Vec2(200.0, -80.0)), 0.0); // ground
      // ground.createFixture(pl.Edge(Vec2(200.0, 150.0), Vec2(200.0, -80.0)), 0.0); // right
      // ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(-80.0, -80.0)), 0.0); // left
      // ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(200.0, 150.0)), 0.0);  // top
      // ground.createFixture(pl.Edge(Vec2(-80.0, 0.0), Vec2(150.0, 0.0)), 0.0); // ground
      ground.createFixture(pl.Box(.2, 115, Vec2(200, 35))).render = { stroke: 'white', fill: 'white' }; // side walls R
      ground.createFixture(pl.Box(.2, 115, Vec2(-80, 35))).render = { stroke: 'white', fill: 'white' }; // side wall L
      ground.createFixture(pl.Box(140, .2, Vec2(60, -80), .0)).render = { stroke: 'white', fill: 'white' }; // floor
      ground.createFixture(pl.Box(140, .2, Vec2(60, 150), .0)).render = { stroke: 'white', fill: 'white' }; // roof

      ground.createFixture(pl.Box(115, .2, Vec2(35, 10)), { restitution: 0, friction: 0 } ).render = { stroke: 'orange', fill: 'orange' };
      ground.createFixture(pl.Box(115, .2, Vec2(85, 30)), { restitution: 0, friction: 0 } ).render = { stroke: 'orange', fill: 'orange' }; // slanted platform
      ground.createFixture(pl.Box(115, .2, Vec2(35, 60), -.12), {friction: -1} ).render = { stroke: 'orange', fill: 'orange' }; // mid platform
      ground.createFixture(pl.Box(1, 10, Vec2(200, 30), 0), { restitution: 60, friction: -1} ).render = { stroke: 'blue', fill: 'blue' }; // mid bouncer
      ground.createFixture(pl.Box(1, 10, Vec2(-80, 20), 0), { restitution: 60, friction: -1} ).render = { stroke: 'blue', fill: 'blue' }; // mid bouncer
      ground.createFixture(pl.Box(115, .2, Vec2(85, 100), .09), { friction: -1 } ).render = { stroke: 'orange', fill: 'orange' }; // slanted platform
      ground.createFixture(pl.Box(115, .2, Vec2(35, 140), -.09), { friction: -1 }).render = { stroke: 'orange', fill: 'orange' }; // slanted platform
      // ground.createFixture(pl.Box(.1, 2, Vec2(-30, 90), .95), { friction: -1 } ).render = { stroke: 'blue', fill: 'blue' }; // slanted platform
      ground.createFixture(pl.Edge(Vec2(-30.0, 90.0), Vec2(-32.0, 91.0)), { restitution: 90, friction: 0 }).render = { fill: 'blue', stroke: 'blue' }; // ground slant

      ground.createFixture(pl.Edge(Vec2(80.0, -30.0), Vec2(170.0, -10.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(170.0, -10.0), Vec2(200.0, 0.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(80.0, -30.0), Vec2(60.0, -25.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(60.0, -25.0), Vec2(50.0, -20.0)), { restitution: 90, friction: 0 }).render = { fill: 'blue', stroke: 'blue' }; // ground slant

      // ground.createFixture(pl.Edge(Vec2(100.0, -80.0), Vec2(200.0, -20.0)), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' };;

      // ground.createFixture(pl.Circle(Vec2(100.0, -80.0), 10), { restitution: 60 }).render = {fill: 'blue', stroke: 'blue'}; // bouncy
      // ground.createFixture(pl.Circle(Vec2(200.0, -40.0), 10), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' }; // bouncy
      // ground.createFixture(pl.Box(50, 5, Vec2(150, -60), 60), {restitution: 60}).render = { fill: 'blue', stroke: 'blue' };
      // .render = { fill: 'blue', stroke: 'blue' }; // bouncy
      

      let ballBodyDef = {
        position: Vec2(10, 100),
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
        } else { if (!testbed.isPaused()) { world.destroyBody(ball1); if (levelscore > 0) { levelscore = levelscore - 500 }; testbed.pause() } }
      }

      generateShot()

      const ball3 = world.createDynamicBody(ballBodyDef);
      ball3.setPosition(Vec2(-20, 100))
      ball3.createFixture(pl.Circle(2), ballStartAttr);
      ball3.m_fixtureList.m_restitution = .9
      ball3.stillActive = true;
      ball3.render = { fill: 'blue', stroke: 'blue' };


      let ball2 = world.createBody(Vec2(82,-22));
      ball2.createFixture(pl.Circle(2), ballFinishAttr);
      ball2.render = { fill: 'red', stroke: 'red' };



      let a = 1;
      let box = planck.Circle(a+a);

      let x = Vec2(30.0, 70);
      let y = Vec2();
      let xplus = Vec2(8,8);
      let yplus = Vec2(10, 2);

      for (let i = 0; i < COUNT; ++i) {

        y.set(x);
          world.createDynamicBody(y).createFixture(box, 5.0);
          x.add(xplus);
          y.add(yplus);

      }





      function keylistener() {

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
        if ((testbed.x + (testbed.width) > ball1pos.x) && (testbed.x - (testbed.width) < ball1pos.x)) { return true } else { return false }
      }

      function cameraLimitY(yPos) {
        if ((testbed.y + (testbed.height * 1) > ball1pos.y) && (testbed.y - ((testbed.height) * 1) < ball1pos.y)) { return true } else { return false }
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

        if (ball3.stillActive === true) { if (((bonusball.y <= (finishball.y + 4.5)) && (bonusball.y >= finishball.y - 4.5)) && ((bonusball.x <= (finishball.x + 4.5)) && (bonusball.x >= finishball.x - 4.5))) { ball3.stillActive = false; world.destroyBody(ball3); addScore() } }
        if (ball1.stillActive === true) { if (((ballpos.y <= (finishball.y + 4.5)) && (ballpos.y >= finishball.y - 4.5)) && ((ballpos.x <= (finishball.x + 4.5)) && (ballpos.x >= finishball.x - 4.5))) { ball1.stillActive = false; world.destroyBody(ball1); addScore(); playbutton.style.display = 'block'; testbed.pause(); levelEnd() } }
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
        level4flag.style.display = 'block';
        startbutton4.style.display = 'block';
        testbed.canvas.remove()
      }

      const playbutton = document.querySelector('#playbutton')
      const playdiv = document.querySelector('#playdiv')
      playbutton.style.display = 'block';
      playdiv.style.display = 'block';
      window.testbed2 = testbed
      playbutton.addEventListener('click', () => { window.testbed2.togglePause(); textOut; })


      testbed.step = function () {
        keylistener()
        textOut()
        // finishTouch()
      };

return world
    });
  }


