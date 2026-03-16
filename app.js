let lessonIndex=0
let exerciseIndex=0
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

let lesson=lessons[lessonIndex]

exerciseIndex=0

document.getElementById("screen").innerHTML=

`

<h2>Lesson ${lessonIndex+1}</h2>

<h1>${lesson.letters.join(" ")}</h1>

<p>Sounds: ${lesson.sounds.join(" / ")}</p>

<p>Example: ${lesson.examples[0]} (${lesson.meanings[0]})</p>

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

showHome()

}

exerciseIndex++

}

function showQuiz(){

let lesson=lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`

<h2>Which letter is "${lesson.sounds[0]}"?</h2>

<button onclick="checkAnswer('${lesson.letters[0]}')">${lesson.letters[0]}</button>

<button onclick="checkAnswer('${lesson.letters[1]}')">${lesson.letters[1]}</button>

<button onclick="checkAnswer('ನ')">ನ</button>

`

}

function checkAnswer(letter){

let correct=lessons[lessonIndex].letters[0]

if(letter===correct){

streak++

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

<h2>Match the letter</h2>

<button onclick="matchCorrect()"> ${lesson.letters[0]} → ${lesson.sounds[0]} </button>

<button onclick="matchWrong()"> ${lesson.letters[1]} → ${lesson.sounds[0]} </button>

`

}

function matchCorrect(){

streak++

document.getElementById("screen").innerHTML=

`

<h2>Correct!</h2>

<p>🔥 Streak: ${streak}</p>

<button onclick="nextExercise()">Continue</button>

`

}

function matchWrong(){

document.getElementById("screen").innerHTML=

`

<h2>Not quite</h2>

<button onclick="showMatch()">Try again</button>

`

}

function showWriting(){

let lesson=lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`

<h2>Trace the letter</h2>

<p>Sound: ${lesson.sounds[0]}</p>

<canvas id="canvas" width="320" height="320"
style="border:2px solid #ccc;border-radius:12px;background:white"></canvas>

<button onclick="showHome()">Finish</button>

`

initCanvas(lesson.letters[0])

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
