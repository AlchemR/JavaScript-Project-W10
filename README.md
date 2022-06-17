# JavaScript-Project-W10
Javascript Project from App Academy


JS Project Proposal: (Arc)

Background
“Worms” was a classic turn based 2D arcade game, and was popular after its initial release in 1995.  The principal of the game is to use a projectile to hit targets in arcs.  A similar more recent release in its genre, crush the castle, or more widely known as angry birds circa (2009) have been successful renditions of a trajectory based impact game.  All renditions include several mechanics:

1) Use a projectile to hit a target in an arc / trajectory
2) the target varies in position, requiring successively more complex arcs to hit; Requiring some problem solving to the target
3) the highest score results from hitting the targets in the fewest possible moves

Functionality & MVPs

With this version of (undecided name)
* Start, pause, and reset the game
* Select easy/hard modes
* Select game speed and colors in settings
* Initially assist on arc path and whether the user will hit (hopefully this is a toggle-able mode)
* Display lives, level
* Some desired environmental interaction should help modify the score
* Colors / responsiveness to projectile impact
* Respond to hotkey input to alter a quality of the projectile behavior (abillity/ammo swap)
* Helper box should display some “tips” for playing the game, controlled by CSS
* (Additional features) the playable area should be a smaller fraction of the overall level.  By

Wireframes

<wireframe>
https://wireframe.cc/pCtnSU

￼

* Nav links include lin



* Game controls will include Start, Stop, and Reset buttons as well as a slider to control the speed.
* On the right, there will be clickable rectangles used to toggle between color schemes.
* On the left, three clickable shapes will be used to toggle between the types of grids available (Bonus)
* Additionally, a drop-down will be added to the Controls to toggle between different rule sets (Bonus).
Technologies, Libraries, APIs

This project will be implemented with the following technologies:
* The Canvas API to render the game board
* Webpack  bundle the  JavaScript
* npm to manage project dependencies
* (Tentative) plank JS library to manage environmental collisions with projectile

Implementation Timeline
NB:
* Friday Afternoon & Weekend: begin project, set up webpack. Render canvas, get more familiar with libraries. Create projectile class and target class.  Create primitive environment with solid (non responsive) environment for testing.  Determine if mouse follow functionality is possible or keyboard input is most desirable (and least buggy).  Determine basic physical constraints (inertia/mass, acceleration, max velocity, gravity, momentum).  Establish basic projectile behavior with these constraints — the most basic being dampening of projectile (collide with wall with no recoil). 
* Monday: Produce basic sandbox environment or “first level”.  Display lives/score and overlay.  No larger map area yet, but Investigate how to scale the different areas.  Determine if mouseover click drag is possible, or if keyboard hotkeys is most practical.  Minimap should be representational of overall render state.  Determine how to calculate projectile arc before launch, and trace over with particles or light lines.   
* Tuesday:  Phase between “game start” and actual level.  Add/create several levels first.  Construct environment, some destructible objects desired if possible.  Add several basic abilities and toggle in display box. 
* Wednesday:  Add additional levels and abillities/ features.  styling and presentation of game and levels (CSS and webpage appearance, color schemes) 
* Thursday Morning: Deploy to GitHub page. If time, rewrite this proposal as a production README. 
Bonus features
If at any point this game is ahead of planned implementation; some additional features to consider are:
Additional levels which demonstrate how to use, and then use some of the following features for resolving puzzles

* Environmental features:
    * Destructible blocks
    * Blocks which move when impacted.  Absorb momentum of projectile
    * Blocks which have a multiplier when impacted.  Should ricochet or have some slightly improbable velocity to them
    * Ricochet blocks which trampoline the particle
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

* Background music


