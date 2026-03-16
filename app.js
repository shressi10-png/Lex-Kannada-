let lessonIndex = localStorage.getItem("lessonIndex") ? parseInt(localStorage.getItem("lessonIndex")) : 0
let streak = localStorage.getItem("streak") ? parseInt(localStorage.getItem("streak")) : 0

let exerciseIndex = 0
let retryQueue = []
let hasDrawn = false

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

exerciseIndex = 0
retryQueue = []

runExercise()

}

function runExercise(){

let lesson = lessons[lessonIndex]

if(retryQueue.length>0){

let retry = retryQueue.shift()

retry()

return
}

if(exerciseIndex===0){

showLetters()

}

else if(exerciseIndex===1){

quizLetter(0)

}

else if(exerciseIndex===2){

showMatch()

}

else if(exerciseIndex===3){

showWriting(0)

}

else if(exerciseIndex===4){

showWriting(1)

}

else if(exerciseIndex===5){

quizLetter(1)

}

else if(exerciseIndex===6){

showWordBreakdown()

}

else{

lessonIndex++

if(lessonIndex>=lessons.length){
lessonIndex=0
}

saveProgress()

document.getElementById("screen").innerHTML=

`
<h2>✓ Lesson Complete</h2>

<h1>${lesson.letters.join(" ")}</h1>

<button onclick="showHome()">Next Lesson</button>
`

return
}

exerciseIndex++

}

function showLetters(){

let lesson = lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`
<h2>Look at these letters</h2>

<h1 style="font-size:70px">${lesson.letters.join("   ")}</h1>

<p>Sounds: ${lesson.sounds.join(" / ")}</p>

<p>Hindi: ${lesson.hindi.join(" / ")}</p>

<p>Tamil: ${lesson.tamil.join(" / ")}</p>

<button onclick="runExercise()">Continue</button>
`

}

function quizLetter(index){

let lesson = lessons[lessonIndex]

let correctLetter = lesson.letters[index]
let sound = lesson.sounds[index]

let options=[lesson.letters[0],lesson.letters[1],"ನ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Which letter is "${sound}"?</h2>

<button onclick="checkAnswer('${options[0]}','${correctLetter}',()=>quizLetter(${index}))">${options[0]}</button>
<button onclick="checkAnswer('${options[1]}','${correctLetter}',()=>quizLetter(${index}))">${options[1]}</button>
<button onclick="checkAnswer('${options[2]}','${correctLetter}',()=>quizLetter(${index}))">${options[2]}</button>
`

}

function checkAnswer(choice,correct,retryFn){

if(choice===correct){

streak++
saveProgress()

document.getElementById("screen").innerHTML=

`
<h2>✓ Correct</h2>

<p>🔥 Streak: ${streak}</p>

<button onclick="runExercise()">Continue</button>
`

}

else{

retryQueue.push(retryFn)

document.getElementById("screen").innerHTML=

`
<h2>Incorrect</h2>

<p>This exercise will appear again later.</p>

<button onclick="runExercise()">Continue</button>
`

}

}

function showMatch(){

let lesson = lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`
<h2>Match the letters</h2>

<p>${lesson.letters[0]} → ${lesson.sounds[0]}</p>
<p>${lesson.letters[1]} → ${lesson.sounds[1]}</p>

<button onclick="runExercise()">Continue</button>
`

}

function showWriting(index){

let lesson = lessons[lessonIndex]

let letter = lesson.letters[index]
let sound = lesson.sounds[index]

hasDrawn = false

document.getElementById("screen").innerHTML=

`
<h2>Trace the letter</h2>

<h1 style="font-size:70px">${letter}</h1>

<p>Sound: ${sound}</p>

<canvas id="canvas" width="320" height="320"
style="border:2px solid #ccc;border-radius:12px;background:white"></canvas>

<button onclick="finishTrace(${index})">Continue</button>
`

initCanvas(letter)

}

function finishTrace(index){

if(!hasDrawn){

alert("Please trace the letter before continuing.")

return
}

runExercise()

}

function showWordBreakdown(){

let lesson = lessons[lessonIndex]

let word = lesson.examples[0]
let meaning = lesson.meanings[0]

let breakdown = "ಕಾ + ನೂ + ನು"
let phonetic = "kaa + noo + nu"

document.getElementById("screen").innerHTML=

`
<h2>Word</h2>

<h1>${word}</h1>

<p><b>Meaning:</b> ${meaning}</p>

<h3>Breakdown</h3>
<p style="font-size:22px">${breakdown}</p>

<h3>Pronunciation</h3>
<p style="font-size:22px">${phonetic}</p>

<button onclick="runExercise()">Finish Lesson</button>
`

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
hasDrawn=true
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
