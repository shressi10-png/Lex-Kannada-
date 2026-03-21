let currentLesson = localStorage.getItem("lesson") ? parseInt(localStorage.getItem("lesson")) : 0
let step = 0
let retryQueue = []



const lessons = [

{
name:"Vowels",
letters:["ಅ","ಆ"],
sounds:["a","aa"],
word:{
text:"ಅಮ್ಮ",
meaning:"mother",
breakdown:["ಅ","ಮ್ಮ"],
phonetic:["a","mma"]
}
},

{
name:"Velar",
letters:["ಕ","ಗ"],
sounds:["ka","ga"],
word:{
text:"ಕಲ್ಲು",
meaning:"stone",
breakdown:["ಕ","ಲ್ಲು"],
phonetic:["ka","llu"]
}
}

]



function saveProgress(){

localStorage.setItem("lesson",currentLesson)

}



function showHome(){

document.getElementById("screen").innerHTML=

`
<h1>LexKannada</h1>

<button onclick="showAlphabet()">Alphabet Map</button>

<br>

<button onclick="showWritingPractice()">Writing Practice</button>

<br>

<button onclick="startStructured()">Structured Lessons</button>

<p>Lesson ${currentLesson+1} / ${lessons.length}</p>
`

}



function startStructured(){

step = 0
retryQueue = []

runLesson()

}



function runLesson(){

let lesson = lessons[currentLesson]

if(step > 7){

if(retryQueue.length > 0){

let retry = retryQueue.shift()
retry()
return

}

currentLesson++
saveProgress()

if(currentLesson >= lessons.length){

currentLesson = 0
showHome()
return
}

step = 0
runLesson()
return
}



switch(step){

case 0:
showLessonIntro(lesson)
break

case 1:
showLetters(lesson)
break

case 2:
letterQuiz(lesson)
break

case 3:
matchExercise(lesson)
break

case 4:
traceLesson(lesson.letters[0])
break

case 5:
showWord(lesson)
break

case 6:
wordQuiz(lesson)
break

case 7:
showBreakdown(lesson)
break

}

step++

}



function showLessonIntro(lesson){

document.getElementById("screen").innerHTML=

`
<h2>${lesson.name}</h2>

<button onclick="runLesson()">Start</button>
`

}



function showLetters(lesson){

document.getElementById("screen").innerHTML=

`
<h2>Letters</h2>

<h1>${lesson.letters.join(" ")}</h1>

<p>${lesson.sounds.join(" / ")}</p>

<button onclick="speak('${lesson.letters[0]}')">🔊 Hear</button>

<br>

<button onclick="runLesson()">Continue</button>
`

}



function letterQuiz(lesson){

let correct = lesson.letters[0]
let options=[...lesson.letters,"ಮ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Which letter is "${lesson.sounds[0]}"?</h2>

${options.map(o=>`<button onclick="checkAnswer('${o}','${correct}',()=>letterQuiz(lesson))">${o}</button>`).join("")}
`

}



function matchExercise(lesson){

document.getElementById("screen").innerHTML=

`
<h2>Match</h2>

<p>${lesson.letters[0]} → ${lesson.sounds[0]}</p>
<p>${lesson.letters[1]} → ${lesson.sounds[1]}</p>

<button onclick="runLesson()">Continue</button>
`

}



function traceLesson(letter){

document.getElementById("screen").innerHTML=

`
<h2>Trace</h2>

<h1>${letter}</h1>

<canvas id="canvas" style="width:320px;height:320px;border:2px solid #ccc;"></canvas>

<br>

<button onclick="runLesson()">Continue</button>
`

initTraceCanvas()

}



function showWord(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=

`
<h2>Word</h2>

<h1>${w.text}</h1>

<p>${w.meaning}</p>

<button onclick="speak('${w.text}')">🔊 Hear</button>

<br>

<button onclick="runLesson()">Continue</button>
`

}



function wordQuiz(lesson){

let w = lesson.word

let options=[w.text,"ಮನೆ","ನದಿ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Which word is "${w.meaning}"?</h2>

${options.map(o=>`<button onclick="checkAnswer('${o}','${w.text}',()=>wordQuiz(lesson))">${o}</button>`).join("")}
`

}



function showBreakdown(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=

`
<h2>Breakdown</h2>

<h1>${w.text}</h1>

<p>${w.breakdown.map(s=>`[${s}]`).join(" ")}</p>

<p>${w.phonetic.join(" + ")}</p>

<button onclick="runLesson()">Finish</button>
`

}



function checkAnswer(choice,correct,retry){

if(choice===correct){

runLesson()

}else{

retryQueue.push(retry)

document.getElementById("screen").innerHTML=

`
<h2>Try Again</h2>

<p>This will appear later</p>

<button onclick="runLesson()">Continue</button>
`

}

}



function speak(text){

let msg=new SpeechSynthesisUtterance(text)
msg.lang="kn-IN"

speechSynthesis.speak(msg)

}



function initTraceCanvas(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

let ratio=window.devicePixelRatio||1

canvas.width=320*ratio
canvas.height=320*ratio

ctx.scale(ratio,ratio)

ctx.lineWidth=8
ctx.lineCap="round"

let drawing=false
let lastX=0
let lastY=0

canvas.addEventListener("touchstart",(e)=>{

drawing=true

let rect=canvas.getBoundingClientRect()

lastX=e.touches[0].clientX-rect.left
lastY=e.touches[0].clientY-rect.top

ctx.beginPath()
ctx.moveTo(lastX,lastY)

},{passive:false})

canvas.addEventListener("touchmove",(e)=>{

if(!drawing)return

let rect=canvas.getBoundingClientRect()

let x=e.touches[0].clientX-rect.left
let y=e.touches[0].clientY-rect.top

ctx.lineTo(x,y)
ctx.stroke()

lastX=x
lastY=y

},{passive:false})

canvas.addEventListener("touchend",()=>{

drawing=false

})

}



showHome()
