let streak=0

function showHome(){

document.getElementById("screen").innerHTML=

`

<h2>Welcome</h2>

<p>Learn to read and write Kannada</p>

<button onclick="startLesson()">Start Lesson</button>

<p>🔥 Streak: ${streak}</p>

`

}

function startLesson(){

let lesson=lessons[0]

document.getElementById("screen").innerHTML=

`

<h2>Lesson 1</h2>

<p>Learn these letters</p>

<h1>${lesson.letters.join(" ")}</h1>

<p>Sound group: ${lesson.sound}</p>

<p>Example: ${lesson.example}</p>

<button onclick="quiz()">Next</button>

`

}

function quiz(){

document.getElementById("screen").innerHTML=

`

<h2>Which letter is "ka"?</h2>

<button onclick="correct()">ಕ</button>

<button onclick="wrong()">ತ</button>

<button onclick="wrong()">ಪ</button>

`

}

function correct(){

streak++

document.getElementById("screen").innerHTML=

`

<h2>Correct!</h2>

<p>🔥 Streak: ${streak}</p>

<button onclick="showWriting()">Writing Practice</button>

`

}

function wrong(){

document.getElementById("screen").innerHTML=

`

<h2>Try again</h2>

<button onclick="quiz()">Retry</button>

`

}

ffunction showWriting(){

document.getElementById("screen").innerHTML=

`

<h2>Trace the letter</h2>

<p>Sound: ka</p>

<canvas id="c" width="320" height="320"
style="border:2px solid #ccc;border-radius:12px;background:white"></canvas>

<button onclick="showHome()">Finish</button>

`

initCanvas()

}
`

initCanvas()

}

function initCanvas(){

let canvas=document.getElementById("c")
let ctx=canvas.getContext("2d")

let drawing=false

canvas.addEventListener("pointerdown",e=>{

drawing=true
ctx.beginPath()
ctx.moveTo(e.offsetX,e.offsetY)

})

canvas.addEventListener("pointermove",e=>{

if(!drawing) return

ctx.lineWidth=6
ctx.lineTo(e.offsetX,e.offsetY)
ctx.stroke()

})

canvas.addEventListener("pointerup",()=>{

drawing=false

})

}

showHome()
