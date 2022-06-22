//level1trial

import * as planck from 'planck/dist/planck-with-testbed'

export function level3() {
    planck.testbed('Sandbox', function (testbed) {
      testbed.background = "#111111"
      testbed.speed = 2
      
      testbed.width = (innerWidth / 4);
      testbed.height = (innerHeight / 4);
      testbed.hz = 30;

      let pl = planck, Vec2 = pl.Vec2;
      let world = new pl.World(Vec2(0, -10));
      // testbed.mouseForce = 6000; 
      // turns on/off impulses to apply like slingshot 

      let COUNT = 0;

      let ground = world.createBody();
      ground.createFixture(pl.Edge(Vec2(-80.0, -80.0), Vec2(200.0, -80.0)), 0.0); // ground
      ground.createFixture(pl.Edge(Vec2(200.0, 150.0), Vec2(200.0, -80.0)), 0.0); // right
      ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(-80.0, -80.0)), 0.0); // left
      ground.createFixture(pl.Edge(Vec2(-80.0, 150.0), Vec2(200.0, 150.0)), 0.0);  // top

      ground.createFixture(pl.Edge(Vec2(-80.0, 0.0), Vec2(150.0, 0.0)), 0.0); // ground
      ground.createFixture(pl.Edge(Vec2(80.0, -30.0), Vec2(170.0, -10.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(170.0, -10.0), Vec2(200.0, 0.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(80.0, -30.0), Vec2(60.0, -25.0)), { restitution: 0, friction: 0 }).render = { fill: 'orange', stroke: 'orange' }; // ground slant
      ground.createFixture(pl.Edge(Vec2(60.0, -25.0), Vec2(50.0, -20.0)), { restitution: 60, friction: 0 }).render = { fill: 'blue', stroke: 'blue' }; // ground slant

      // ground.createFixture(pl.Edge(Vec2(100.0, -80.0), Vec2(200.0, -20.0)), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' };;

      // ground.createFixture(pl.Circle(Vec2(100.0, -80.0), 10), { restitution: 60 }).render = {fill: 'blue', stroke: 'blue'}; // bouncy
      // ground.createFixture(pl.Circle(Vec2(200.0, -40.0), 10), { restitution: 60 }).render = { fill: 'blue', stroke: 'blue' }; // bouncy
      // ground.createFixture(pl.Box(50, 5, Vec2(150, -60), 60), {restitution: 60}).render = { fill: 'blue', stroke: 'blue' };
      // .render = { fill: 'blue', stroke: 'blue' }; // bouncy
      

      let ballBodyDef = {
        position: Vec2(70, 10),
        bullet: false,
        allowSleep: true,
        linearDamping: .01,
        angularDamping: .5
      }


      let ballStartAttr = {
        friction: .1,
        restitution: .5, // bounce
        density: 10,
        userData: 'ball'
      };

      let ballFinishAttr = {
        friction: .2,
        restitution: .1, // bounce
        density: 1,
        userData: 'finish'
      };


      let ball1 = world.createDynamicBody(ballBodyDef);
      world.destroyBody(ball1)

      function generateShot() {
        if (ball1.m_destroyed) {
          ball1 = world.createDynamicBody(ballBodyDef);
          ball1.createFixture(pl.Circle(1), ballStartAttr);
          ball1.render = { texture: img };
          const img = new Image()
          img.src = "https://upload.wikimedia.org/wikipedia/commons/2/27/Wey_source_farringdon.jpg"
        }
      }

      generateShot()

      const ball3 = world.createDynamicBody(ballBodyDef);
      ball3.setPosition(Vec2(30, 2))
      ball3.createFixture(pl.Circle(1), ballStartAttr);
      ball3.render = { fill: 'blue', stroke: 'blue' };


      let ball2 = world.createBody(Vec2(82,-22));
      ball2.createFixture(pl.Circle(1), ballFinishAttr);
      ball2.render = { fill: 'red', stroke: 'red' };


      window.pl = pl
      window.world = world
      console.log("white ball = ball1 ", ball1)
      window.ball1 = ball1
      console.log("red ball = ball2 ", ball2)
      window.ball2 = ball2
      console.log("blue ball = ball3 ", ball3)
      window.ball3 = ball3


      let a = COUNT;
      let box = planck.Box(a, a+a+a);

      let x = Vec2(180.0, 8);
      let y = Vec2();
      let deltaX = Vec2(0, 4);
      let deltaY = Vec2(0, 4);

      for (let i = 0; i < COUNT; ++i) {
        y.set(x);
          world.createDynamicBody(y).createFixture(box, 5.0);
          y.add(deltaY);
        x.add(deltaX);
      }

            // let spin = world.createDynamicBody(Vec2(0.0, 10.0));
      // spin.createFixture(pl.Box(.5, 10.0), 20.0);

      // let joint1 = world.createJoint(pl.RevoluteJoint({
      //   motorSpeed: Math.PI,
      //   maxMotorTorque: 20000.0,
      //   enableMotor: true
      // }, ground, spin, Vec2(0.0, 1.0)));



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
        if ((testbed.x + (testbed.width * .4) > ball1pos.x) && (testbed.x - (testbed.width * .4) < ball1pos.x)) { return true } else { return false }
      }

      function cameraLimitY(yPos) {
        if ((testbed.y + (testbed.height * .4) > ball1pos.y) && ((testbed.y - (testbed.height + canvas1.height) * .4) < ball1pos.y)) { return true } else { return false }
      }

      function textOut() {
        let scale = 20
        let ballpos = ball1.getPosition()
        context2.clearRect(0, 0, canvas1.width, canvas1.height);
        context2.font = `${scale}px Courier New`;
        context2.fillStyle = 'blue';
        context2.fillText(`X POS : ${Math.round(ballpos.x)}`, 20, `${scale}`);
        context2.fillText(`Y POS :${Math.round(ballpos.y)}`, 20, `${scale * 2}`);
        context2.fillText(`testbed X POS : ${Math.round(testbed.x)}`, 20, `${scale * 3}`);
        context2.fillText(`testbed Y POS : ${Math.round(testbed.y)}`, 20, `${scale * 4}`);
        context2.fillText(`testbed Y height :${Math.round(testbed.height)}`, 20, `${scale * 5}`);
        context2.fillText(`Pause : ${testbed.isPaused()}`, 250, `${scale}`);
        context2.fillText(`Shot destroyed : ${ball1.m_destroyed}`, 250, `${scale * 2}`);

      }



      function finishTouch() {
        world.on('post-solve', function (contact) {
          let fA = contact.getFixtureA(), bA = fA.getBody();
          let fB = contact.getFixtureB(), bB = fB.getBody();
          let throwBall = fA.getUserData() === "ball" ? bA : fB.getUserData() === "ball" ? bB : null;
          let finishBall = fA.getUserData() === "finish" ? bA : fB.getUserData() === "finish" ? bB : null;
          setTimeout(function () { if (throwBall && finishBall) { world.destroyBody(throwBall); } }, 1);
        });
      }





      testbed.step = function () {
        keylistener()
        textOut()
        finishTouch()
      };

return world
    });
  }


// export {level1};
// export default;