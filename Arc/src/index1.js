// entry file
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')
import * as planck from '../node_modules/planck/dist/planck-with-testbed'
console.log(canvas)
console.log(context)


console.log(canvas)
canvas.width = innerWidth/2;
canvas.height = innerHeight/2;


  const pl = planck
  const world = pl.World(pl.Vec2(0, -10));

  let ground = world.createBody();
  ground.createFixture(pl.Edge(pl.Vec2(-40.0, 0.0), pl.Vec2(40.0, 0.0)), 0.0);

  let shape = pl.Box(0.6, 0.125);

  let y = 25.0;
  let prevBody = ground;
  for (let i = 0; i < 30; ++i) {
    let body = world.createDynamicBody(pl.Vec2(0.5 + i, y));
    body.createFixture(shape, {
      density: 20.0,
      friction: 0.2,
    });

    let anchor = pl.Vec2(i, y);
    world.createJoint(pl.RevoluteJoint({
      collideConnected: false,
    }, prevBody, body, anchor));

    prevBody = body;
  }


// Rendering function
function render() {
  // Iterate over bodies and fixtures

  for (var body = world.getBodyList(); body; body = body.getNext()) {
    for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
      // Draw or update fixture
      let temp = fixture.getShape().m_vertices
      // console.log(temp)
      context.beginPath()
      temp.forEach(el => context.lineTo(el.x,el.y))
      context.stroke()
    }
  }
}

world.on('remove-fixture', function (fixture) {
  // Remove fixture from UI if required
});

// Game loop
function loop() {
  // In each frame call world.step with fixed timeStep
  window.requestAnimationFrame(loop);
  world.step(1 / 60, 1 , 1);
  // Request a new frame
  render()
}

// Start game loop
loop();