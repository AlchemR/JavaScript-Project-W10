// entry file

// const Level1 = require("./level1.js")
import {level1} from "./scripts/level1.js"
import { level2 } from "./scripts/level2.js"
import { level3 } from "./scripts/level3.js"
import { level4 } from "./scripts/level4.js"

import * as planck from 'planck/dist/planck-with-testbed'
import { start } from "planck/dist/planck-with-testbed"

window.onload = function () {
  const canvas1 = document.getElementById('overlay')
  const context2 = canvas1.getContext('2d')
  const intro1 = document.querySelector('#intro1')
  const intro1button = document.querySelector('#intro1button')
  const intro2 = document.querySelector('#intro2')
  const intro2button = document.querySelector('#intro2button')
  const intro3 = document.querySelector('#intro3')
  const intro3button = document.querySelector('#intro3button')
  const intro4 = document.querySelector('#intro4')

  const startbutton = document.querySelector('#startbutton')
  const level1flag = document.querySelector('#level1flag')
  const startbutton2 = document.querySelector('#startbutton2')
  const level2flag = document.querySelector('#level2flag')
  const startbutton3 = document.querySelector('#startbutton3')
  const level3flag = document.querySelector('#level3flag')
  const startbutton4 = document.querySelector('#startbutton4')
  const level4flag = document.querySelector('#level4flag')
  intro1button.addEventListener('click', () => { ; intro1.style.display = 'none'; intro2.style.display = 'block'; intro2button.style.display = 'block'})
  intro2button.addEventListener('click', () => { ; intro2.style.display = 'none'; intro3.style.display = 'block';intro3button.style.display = 'block'  })
  intro3button.addEventListener('click', () => { ; intro3.style.display = 'none'; intro4.style.display = 'block'; startbutton.style.display = 'block'; level1flag.style.display = 'block' })
  startbutton.addEventListener('click', () => { level1(); startbutton.style.display = 'none'; level1flag.style.display = 'none'; intro4.style.display = "none" })
  startbutton2.addEventListener('click', () => { level2(); startbutton2.style.display = 'none'; level2flag.style.display = 'none'; })
  startbutton3.addEventListener('click', () => { level3(); startbutton3.style.display = 'none'; level3flag.style.display = 'none' })
  startbutton4.addEventListener('click', () => { level4(); startbutton4.style.display = 'none'; level4flag.style.display = 'none' })
  canvas1.height = 100
  canvas1.width = innerWidth
  window.context2 = context2
  window.canvas1 = canvas1
}



let totalscore = 100
window.totalscore = totalscore

const level1Complete = false
const level2Complete = false
const level3Complete = false
const level4Complete = false
// import * as planck from '../node_modules/planck/dist/planck-with-testbed'


// level1()