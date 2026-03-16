let lessonIndex = 0
let exerciseIndex = 0

let retryQueue = []

let drawing = false
let strokeCount = 0

let points = []

let ctx
let canvas



function showHome(){

document.getElementById("screen").innerHTML=

`
<h2>Welcome</h2>

<button onclick="startLesson()">Start Lesson</button>
`

}



function startLesson(){

exerciseIndex=0
retryQueue=[]

runExercise()

}



function runExercise(){

let lesson = lessons[lessonIndex]

if(exerciseIndex>6){

if(retryQueue.length>0){

let retry = retryQueue.shift()
retry()
return

}

showCompletion()
return
}


switch(exerciseIndex){

case 0:
showLetters()
break

case 1:
quizLetter(0)
break

case 2:
matchExercise()
break

case 3:
traceLetter(0)
break

case 4:
traceLetter(1)
break

case 5:
quizLetter(1)
break

case 6:
showWord()
break

}

exerciseIndex++

}



function showLetters(){

let l = lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`
<h2>Look at these letters</h2>

<h1>${l.letters.join(" ")}</h1>

<p>Hindi: ${l.hindi.join(" / ")}</p>
<p>Tamil: ${l.tamil.join(" / ")}</p>

<button onclick="runExercise()">Continue</button>
`

}



function quizLetter(i){

let l = lessons[lessonIndex]

let correct = l.letters[i]
let sound = l.sounds[i]

let options=[...l.letters,"ನ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Which letter is "${sound}"?</h2>

${options.map(o=>`<button onclick="checkAnswer('${o}','${correct}',()=>quizLetter(${i}))">${o}</button>`).join("")}
`

}



function matchExercise(){

let l = lessons[lessonIndex]

let correct = l.letters[1]
let sound = l.sounds[1]

let options=[...l.letters,"ನ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Match the sound</h2>

<p>Which letter makes the sound <b>${sound}</b>?</p>

${options.map(o=>`<button onclick="checkAnswer('${o}','${correct}',()=>matchExercise())">${o}</button>`).join("")}
`

}



function checkAnswer(choice,correct,retry){

if(choice===correct){

document.getElementById("screen").innerHTML=

`
<h2>Correct</h2>

<button onclick="runExercise()">Continue</button>
`

}else{

retryQueue.push(retry)

document.getElementById("screen").innerHTML=

`
<h2>Incorrect</h2>
<p>This will appear again later</p>

<button onclick="runExercise()">Continue</button>
`

}

}



function traceLetter(i){

let l = lessons[lessonIndex]

strokeCount = 0
points = []

document.getElementById("screen").innerHTML=

`
<h2>Trace</h2>

<h1>${l.letters[i]}</h1>

<canvas id="canvas" width="320" height="320"
style="border:2px solid #ccc;background:white"></canvas>

<button onclick="finishTrace()">Continue</button>
`

canvas=document.getElementById("canvas")
ctx=canvas.getContext("2d")

canvas.addEventListener("pointerdown",startDraw)
canvas.addEventListener("pointermove",addPoint)
canvas.addEventListener("pointerup",endDraw)

requestAnimationFrame(drawLoop)

}



function startDraw(e){

drawing=true

points.push(getPos(e))

}



function addPoint(e){

if(!drawing) return

points.push(getPos(e))
strokeCount++

}



function endDraw(){

drawing=false

}



function getPos(e){

let rect=canvas.getBoundingClientRect()

return{
x:e.clientX-rect.left,
y:e.clientY-rect.top
}

}



function drawLoop(){

ctx.lineWidth=8
ctx.lineCap="round"
ctx.strokeStyle="#000"

ctx.beginPath()

for(let i=1;i<points.length;i++){

ctx.moveTo(points[i-1].x,points[i-1].y)
ctx.lineTo(points[i].x,points[i].y)

}

ctx.stroke()

requestAnimationFrame(drawLoop)

}



function finishTrace(){

if(strokeCount<5){

alert("Please trace the letter")

return

}

runExercise()

}



function showWord(){

let lesson = lessons[lessonIndex]

let wordData = lesson.examples[Math.floor(Math.random()*lesson.examples.length)]

document.getElementById("screen").innerHTML=

`
<h2>Word</h2>

<h1>${wordData.word}</h1>

<p><b>Meaning:</b> ${wordData.meaning}</p>

<button onclick="showBreakdown('${wordData.word}','${wordData.meaning}','${wordData.breakdown}','${wordData.phonetic}')">
Show breakdown
</button>
`

}



function showBreakdown(w,m,b,p){

document.getElementById("screen").innerHTML=

`
<h1>${w}</h1>

<p>${m}</p>

<h3>${b}</h3>

<button onclick="showPronunciation('${w}','${m}','${b}','${p}')">
Show pronunciation
</button>
`

}



function showPronunciation(w,m,b,p){

document.getElementById("screen").innerHTML=

`
<h1>${w}</h1>

<p>${m}</p>

<p>${b}</p>

<h3>${p}</h3>

<button onclick="runExercise()">Finish Lesson</button>
`

}



function showCompletion(){

let l = lessons[lessonIndex]

document.getElementById("screen").innerHTML=

`
<h2>Lesson Complete</h2>

<h1>${l.letters.join(" ")}</h1>

<button onclick="nextLesson()">Next Lesson</button>
`

}



function nextLesson(){

lessonIndex++

if(lessonIndex>=lessons.length){

lessonIndex=0

}

showHome()

}



showHome()
