//level1trial

import * as planck from 'planck/dist/planck-with-testbed'



export function level4() {
    planck.testbed('Sandbox', function (testbed) {
      testbed.background = "#111111"
      testbed.speed = 2
      testbed.width = (innerWidth / 4);
      testbed.height = (innerHeight / 4);
      testbed.hz = 30;
      let pl = planck, Vec2 = pl.Vec2;
      let world = new pl.World(Vec2(0, -10));
      let levelscore = 10000 // 10K tenative
      testbed.mouseForce = 6000; 


      let COUNT = 1;
      window.addEventListener('click', () => { if (levelscore < 0) { levelscore = 0 } else { levelscore += -500 } });

      let ground = world.createBody();
      ground.createFixture(pl.Edge(Vec2(-80.0, -80.0), Vec2(200.0, -80.0)), 0.0); // ground
      ground.createFixture(pl.Edge(Vec2(200.0, 150.0), Vec2(200.0, -80.0)), 0.0); // right
      ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(-80.0, -80.0)), 0.0); // left
      ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(200.0, 150.0)), 0.0);  // top

      ground.createFixture(pl.Edge(Vec2(-80.0, 40.0), Vec2(150.0, 40.0)), { friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground
      ground.createFixture(pl.Edge(Vec2(-60.0, 5.0), Vec2(185.0, 5.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(160.0, -15.0), Vec2(200.0, 0.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(-80.0, -70.0), Vec2(200.0, -70.0)), { friction: 1 }); // ground slide
      ground.createFixture(pl.Edge(Vec2(-80.0, -60.0), Vec2(-75.0, -70.0)), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' }; // ground slide
      

      let ballBodyDef = {
        position: Vec2(70, 30),
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
          ball1.render = { fill: "white" };
        } else { if (!testbed.isPaused()) { world.destroyBody(ball1); if (levelscore > 0) { levelscore = levelscore - 500 }; testbed.pause() } }
      }

      generateShot()

      const ball3 = world.createDynamicBody(ballBodyDef);
      ball3.setPosition(Vec2(30, 40))
      ball3.createFixture(pl.Circle(2), ballStartAttr);
      ball3.m_fixtureList.m_restitution = .9
      ball3.stillActive = true;
      ball3.render = { fill: 'blue', stroke: 'blue' };


      let ball2 = world.createBody(Vec2(130,-40));
      ball2.createFixture(pl.Circle(2), ballFinishAttr);
      ball2.render = { fill: 'red', stroke: 'red' };


      let a = COUNT;
      let box = planck.Box(a,a*9,x,0);

      let x = Vec2(160.0, 8);
      let y = Vec2();
      let xplus = Vec2(0, 4);
      let yplus = Vec2(0, 4);

      for (let i = 0; i < COUNT; ++i) {
        y.set(x);
          world.createDynamicBody(y).createFixture(box, 5.0);
          y.add(yplus);
        x.add(xplus);
      }

      let spin = world.createDynamicBody(Vec2(0.0, 10.0));
      spin.createFixture(pl.Box(.5, 10.0), 20.0);

      let joint1 = world.createJoint(pl.RevoluteJoint({
        motorSpeed: Math.PI,
        maxMotorTorque: 20000.0,
        enableMotor: true
      }, ground, spin, Vec2(0.0, 1.0)));


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
        } else if (testbed.activeKeys.fire) { generateShot() } 

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
        context2.font = `30px sans-serif`;
        context2.fillStyle = 'white';
        context2.fillText(`Paused : ${testbed.isPaused()}`, 600, `${scale}`);
        context2.fillText(`Level Score:${levelscore}`, 600, `${scale * 2}`);
        context2.fillText(`Total Score: ${totalscore}`, 600, `${scale * 3}`);
        context2.fillText(`← → ↑ ↓: Move Camera`, 550, `${scale * 4.1}`);
        if (ball3.stillActive === true) { if (((bonusball.y <= (finishball.y + 4.5)) && (bonusball.y >= finishball.y - 4.5)) && ((bonusball.x <= (finishball.x + 4.5)) && (bonusball.x >= finishball.x - 4.5))) { ball3.stillActive = false; world.destroyBody(ball3); addScore() } }
        if (ball1.stillActive === true) { if (((ballpos.y <= (finishball.y + 4.5)) && (ballpos.y >= finishball.y - 4.5)) && ((ballpos.x <= (finishball.x + 4.5)) && (ballpos.x >= finishball.x - 4.5))) { ball1.stillActive = false; world.destroyBody(ball1); addScore(); playbutton.style.display = 'block'; testbed.pause(); levelEnd() } }
      }


      function finishTouch() {
        world.on('post-solve', function (contact) {
          let fA = contact.getFixtureA(), bA = fA.getBody();
          let fB = contact.getFixtureB(), bB = fB.getBody();
          let throwBall = fA.getUserData() === "ball" ? bA : fB.getUserData() === "ball" ? bB : null;
          let finishBall = fA.getUserData() === "finish" ? bA : fB.getUserData() === "finish" ? bB : null;
          setTimeout(function () { if (throwBall && finishBall) { if (!testbed.isPaused()) { world.destroyBody(throwBall); testbed.pause(); addScore(); textOut(); if (throwBall.kingpin) { playbutton.style.display = 'block'; levelEnd() } }  } }, 1);
        });
      }


      function addScore() { return totalscore += levelscore }

      function levelEnd() {
        const startbutton5 = document.querySelector('#realstart5button')
        const level5flag = document.querySelector('#realstart5')
        level5flag.style.display = 'block';
        startbutton5.style.display = 'block';
        testbed.canvas.remove()
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
      window.testbed3 = testbed
      playbutton.addEventListener('click', () => { window.testbed3.togglePause(); textOut; })

return world
    });
  }


