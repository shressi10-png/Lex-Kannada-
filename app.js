let lessonIndex = localStorage.getItem("lessonIndex") ? parseInt(localStorage.getItem("lessonIndex")) : 0
let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0

let exerciseIndex = 0
let letterIndex = 0

function saveProgress(){

localStorage.setItem("lessonIndex",lessonIndex)
localStorage.setItem("streak",streak)

}

function showHome(){

document.getElementById("screen").innerHTML=

`

<h2>Welcome</h2>

<p>Learn to read and write Kannada</p>

<button onclick="startLesson()">Continue Lesson</button>

<p>🔥 Streak: ${streak}</p>

<p>Lesson: ${lessonIndex+1} / ${lessons.length}</p>

`

}

function startLesson(){

let lesson = lessons[lessonIndex]

exerciseIndex = 0
letterIndex = 0

document.getElementById("screen").innerHTML=

`

<h2>Lesson ${lessonIndex+1}</h2>

<h1>${lesson.letters.join(" ")}</h1>

<p>Sounds: ${lesson.sounds.join(" / ")}</p>

<p>Hindi: ${lesson.hindi.join(" / ")}</p>

<p>Tamil: ${lesson.tamil.join(" / ")}</p>

<button onclick="nextExercise()">Start Exercise</button>

`

}

function nextExercise(){

if(exerciseIndex===0){

showQuiz()

}

else if(exerciseIndex===1){

showMatch()

}

else if(exerciseIndex===2){

showWriting()

}

else{

lessonIndex++

if(lessonIndex>=lessons.length){

lessonIndex=0

}

saveProgress()

showHome()

}

exerciseIndex++

}

function showQuiz(){

let lesson = lessons[lessonIndex]

let letter = lesson.letters[letterIndex]
let sound = lesson.sounds[letterIndex]

let options=[lesson.letters[0],lesson.letters[1],"ನ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`

<h2>Which letter is "${sound}"?</h2>

<button onclick="checkAnswer('${options[0]}','${letter}')">${options[0]}</button>
<button onclick="checkAnswer('${options[1]}','${letter}')">${options[1]}</button>
<button onclick="checkAnswer('${options[2]}','${letter}')">${options[2]}</button>

`

}

function checkAnswer(choice,correct){

if(choice===correct){

streak++

saveProgress()

document.getElementById("screen").innerHTML=

`

<h2>Correct!</h2>

<p>🔥 Streak: ${streak}</p>

<button onclick="nextExercise()">Continue</button>

`

}

else{

document.getElementById("screen").innerHTML=

`

<h2>Try again</h2>

<button onclick="showQuiz()">Retry</button>

`

}

}

function showMatch(){

let lesson=lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`

<h2>Match the letters</h2>

<p>${lesson.letters[0]} → ${lesson.sounds[0]}</p>
<p>${lesson.letters[1]} → ${lesson.sounds[1]}</p>

<button onclick="nextExercise()">Continue</button>

`

}

function showWriting(){

let lesson = lessons[lessonIndex]

let letter = lesson.letters[letterIndex]
let sound = lesson.sounds[letterIndex]

document.getElementById("screen").innerHTML=

`

<h2>Trace the letter</h2>

<p>Sound: ${sound}</p>

<canvas id="canvas" width="320" height="320"
style="border:2px solid #ccc;border-radius:12px;background:white"></canvas>

<button onclick="nextLetter()">Next Letter</button>

`

initCanvas(letter)

}

function nextLetter(){

letterIndex++

if(letterIndex>1){

nextExercise()

}

else{

showWriting()

}

}

function initCanvas(letter){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

ctx.font="200px Arial"
ctx.fillStyle="#e3e3e3"
ctx.textAlign="center"
ctx.textBaseline="middle"

ctx.fillText(letter,160,170)

let drawing=false
let lastX=0
let lastY=0

canvas.addEventListener("pointerdown",e=>{

drawing=true
lastX=e.offsetX
lastY=e.offsetY

})

canvas.addEventListener("pointermove",e=>{

if(!drawing) return

ctx.beginPath()

ctx.lineWidth=8
ctx.lineCap="round"
ctx.strokeStyle="#2f80ed"

ctx.moveTo(lastX,lastY)
ctx.lineTo(e.offsetX,e.offsetY)

ctx.stroke()

lastX=e.offsetX
lastY=e.offsetY

})

canvas.addEventListener("pointerup",()=>{

drawing=false

})

}

showHome()
