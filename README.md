# JavaScript-Project-W10
Javascript Project from App Academy


Arc

Arc is a trajectory based impact game.   Core feture is based on launching a projectile towards a target in arc patterns to get a score. Interactions with a level enviroment in canvas are driven by mouse movement, keyboard and Interact-able buttons displayed on-screen.


A similar well known release in the genre -- angry birds circa (2009) --  has been a successful rendition of a trajectory game.  


All renditions include several mechanics:
1) Use a projectile to hit a target in an arc / trajectory
2) the target varies in position, requiring successively more complex arcs to hit; Requiring some problem solving to the target
3) the highest score results from hitting the targets in the fewest possible moves



Technologies used:
Canvas to render and display outputs of game
Planck -- to handle the collision physics between enviromental objects.
Webpack to bundle and transpile the javascript code


Functionality & MVPs

With this version of Arc
* Start, pause
* Display level Scores
* Some environmental interaction help to modify the score
* Enviroment Colors / responsiveness to projectile impact
* The playable area should be a moveable fraction of the overall level.
* Respond to hotkeys input to alter pause/regenerate ammo


Event triggering Collision detection:
To detect collisions, each "frame" that is animated updates the x/y cordinates and force values (velocity, rotation, momentum).  Then with that new cordinate, it must be checked if each instance is touching, and of those touching instances it checks if the bodies touching match the end-case of adding score or ending the level.




          let fA = contact.getFixtureA(), bA = fA.getBody();
          let fB = contact.getFixtureB(), bB = fB.getBody();
          let throwBall = fA.getUserData() === "ball" ? bA : fB.getUserData() === "ball" ? bB : null;
          let finishBall = fA.getUserData() === "finish" ? bA : fB.getUserData() === "finish" ? bB : null;
          setTimeout(function () { 
              if (throwBall && finishBall) { 
                  if (!testbed.isPaused()) { 
                      world.destroyBody(throwBall); testbed.pause(); addScore(); textOut(); 
                        if (throwBall.kingpin) { 
                            playbutton.style.display = 'block'; levelEnd() } } } }, 1);
        });
      }

Future refinement of this mechanic would include: fixing when the async function of the ball is touching over multiple seconds (30/60 FPS); and can send hundreds or thousands of sequential positive "world ending" checks; occasionally crashing the game when the qeue gets overloaded.


the platform has potential to be a much larger game; and solving the handshake between rendering (sync) and collision detection positives(async) would allow this to be a deeper framework for this type of game genre.  This would require using a rendering library.


* Environmental features:
    * Destructible blocks
    * Blocks which move when impacted.  Absorb momentum of projectile
    * pivot blocks which completely redirect the momentum path of the projectile (transform x to y velocity)
    * Explosion
    * Semi-permeable blocks (if projectiles are colored correctly or bear the correct attribute, they can pass through these walls with no resistance, otherwise they block)
    * Portal blocks (wrap feature teleports the blocks to other portion of the map)
    * Skid blocks which are slippery (like ice)
    * Skid blocks which allow the projectile to decelerate and minimize the damage( think sandpaper)
    * Suspended blocks which when impacted spread something to modify surfaces (like waterbaloon pop)

* Ammo / Abilities features:
    * Gyroscope — exentric orbit
    * Gyroscope curve/boomerang
    * Explosion
    * Grav pull (implosion)
    * Sticky coating (makes blocks stick to a wall)
    * ricochet(bouncy ball)
    * Telekinetic Remote control (mouse follow?)
    * Burn block
    * Permeable bullets
    * Planetary orbit blocks
    * Particles which trampoline blocks
    * Shatter blocks which break out into smaller peices



Credit:
Planck library's creator ( Shakiba ) for taking the time to talk about the library and rendering (and his discord! ( Piqnt ))


