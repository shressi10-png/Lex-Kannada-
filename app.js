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

let lessonIndex = 0
let exerciseIndex = 0

function startLesson(){

let lesson = lessons[lessonIndex]

document.getElementById("screen").innerHTML =

`

<h2>Lesson ${lessonIndex+1}</h2>

<h1>${lesson.letters.join(" ")}</h1>

<p>Sounds: ${lesson.sounds.join(" / ")}</p>

<p>Example: ${lesson.examples[0]} (${lesson.meanings[0]})</p>

<button onclick="nextExercise()">Start Exercise</button>

`

exerciseIndex = 0

}

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

ctx.font="200px Arial"
ctx.fillStyle="#e0e0e0"
ctx.textAlign="center"
ctx.textBaseline="middle"

ctx.fillText("ಕ",160,170)

let drawing=false

canvas.addEventListener("pointerdown",e=>{

drawing=true

ctx.beginPath()
ctx.moveTo(e.offsetX,e.offsetY)

})

canvas.addEventListener("pointermove",e=>{

if(!drawing) return

ctx.lineWidth=8
ctx.lineCap="round"
ctx.strokeStyle="#2f80ed"

ctx.lineTo(e.offsetX,e.offsetY)
ctx.stroke()

})

canvas.addEventListener("pointerup",()=>{

drawing=false

})

}

showHome()
