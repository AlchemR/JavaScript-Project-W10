// entry file

// const Level1 = require("./level1.js")
import {level1} from "./scripts/level1.js"
import { level2 } from "./scripts/level2.js"


import * as planck from 'planck/dist/planck-with-testbed'
const canvas1 = document.getElementById('overlay')
const context2 = canvas1.getContext('2d')

window.onload = function () {
  const playbutton = document.querySelector('#playbutton')
  const destroybutton = document.querySelector('#destroybutton')
  const startbutton = document.querySelector('#startbutton')
  const startbutton2 = document.querySelector('#startbutton2')
  const startbutton3 = document.querySelector('#startbutton3')
  const startbutton4 = document.querySelector('#startbutton4')
  playbutton.addEventListener('click', () => { testbed.togglePause(); }) // doesnt update text file, might need to look into how to bind later
  destroybutton.addEventListener('click', () => { console.log("destroy works") ; } )
  startbutton.addEventListener('click', () => { level1() })
  startbutton2.addEventListener('click', () => { level2() })
  startbutton3.addEventListener('click', () => { level3() })
  startbutton4.addEventListener('click', () => { level4() })
  window.destroybutton = destroybutton
  window.playbutton = playbutton
}


canvas1.height = 100
canvas1.width = innerWidth
window.context2 = context2
window.canvas1 = canvas1

// import * as planck from '../node_modules/planck/dist/planck-with-testbed'


// level1()