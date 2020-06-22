import helloWord from './hello.js'
import worldWord from './world.js'
import './style.css'

document.querySelector('#root').innerHTML = `${helloWord} ${worldWord}`