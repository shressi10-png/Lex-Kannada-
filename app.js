let saved = localStorage.getItem("lesson")
let currentLesson = saved ? parseInt(saved) : 0

if(isNaN(currentLesson)) currentLesson = 0

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
name:"Ka Group",
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



function showHome(){

document.getElementById("screen").innerHTML=

`
<h1>LexKannada</h1>

<button onclick="showAlphabet()">Alphabet Map</button>

<br>

<button onclick="showWritingPractice()">Writing Practice</button>

<br>

<button onclick="showLessonMenu()">Structured Lessons</button>
`

}



/* ---------------- ALPHABET ---------------- */

function showAlphabet(mode="lesson"){

let letters=[
{l:"ಅ",p:"a"},{l:"ಆ",p:"aa"},{l:"ಇ",p:"i"},{l:"ಈ",p:"ee"},
{l:"ಉ",p:"u"},{l:"ಊ",p:"oo"},
{l:"ಕ",p:"ka"},{l:"ಗ",p:"ga"},
{l:"ತ",p:"ta"},{l:"ದ",p:"da"},
{l:"ಪ",p:"pa"},{l:"ಬ",p:"ba"}
]

let html="<h2>Alphabet</h2><div class='grid'>"

letters.forEach(letter=>{

if(mode==="practice"){
html+=`
<div class="letter" onclick="traceSingleLetter('${letter.l}')">
<div>${letter.l}</div>
<div style="font-size:14px">${letter.p}</div>
</div>`
}else{
html+=`
<div class="letter" onclick="startLetterLesson('${letter.l}','${letter.p}')">
<div>${letter.l}</div>
<div style="font-size:14px">${letter.p}</div>
</div>`
}

})

html+="</div><button onclick='showHome()'>Back</button>"

document.getElementById("screen").innerHTML=html

}



/* ---------------- WRITING ---------------- */

function showWritingPractice(){

document.getElementById("screen").innerHTML=

`
<h2>Writing Practice</h2>

<button onclick="showAlphabet('practice')">Choose Letter</button>

<br>

<button onclick="showHome()">Back</button>
`

}



function traceSingleLetter(letter){

document.getElementById("screen").innerHTML=

`
<h2>Trace</h2>

<h1>${letter}</h1>

<canvas id="canvas" style="width:320px;height:320px;border:2px solid #ccc;"></canvas>

<br>

<button onclick="traceSingleLetter('${letter}')">Retry</button>

<button onclick="showAlphabet('practice')">Back</button>
`

initTraceCanvas()

}



/* ---------------- LESSON MENU ---------------- */

function showLessonMenu(){

let html="<h2>Lessons</h2>"

lessons.forEach((l,i)=>{

html+=`
<button onclick="startLesson(${i})">
Lesson ${i+1}: ${l.name}
</button><br>`

})

html+=`<br><button onclick="showHome()">Back</button>`

document.getElementById("screen").innerHTML=html

}



/* ---------------- LESSON FLOW ---------------- */

function startLesson(index){

currentLesson = index
step = 0
retryQueue = []

runLesson()

}



function runLesson(){

let lesson = lessons[currentLesson]

if(step > 6){

if(retryQueue.length > 0){
let retry = retryQueue.shift()
retry()
return
}

showLessonComplete()
return
}



switch(step){

case 0:
lessonIntro(lesson)
break

case 1:
showLetters(lesson)
break

case 2:
quizLetter(lesson)
break

case 3:
traceLesson(lesson.letters[0])
break

case 4:
showWord(lesson)
break

case 5:
quizWord(lesson)
break

case 6:
showBreakdown(lesson)
break

}

}



/* ---------------- NAV BUTTONS ---------------- */

function navButtons(){

return `
<br>
<button onclick="prevStep()">Back</button>
<button onclick="nextStep()">Next</button>
`
}



function nextStep(){
step++
runLesson()
}

function prevStep(){
if(step>0){
step--
runLesson()
}
}



/* ---------------- LESSON SCREENS ---------------- */

function lessonIntro(lesson){

document.getElementById("screen").innerHTML=

`
<h2>${lesson.name}</h2>
<p>Learn new letters</p>

${navButtons()}
`

}



function showLetters(lesson){

document.getElementById("screen").innerHTML=

`
<h1>${lesson.letters.join(" ")}</h1>
<p>${lesson.sounds.join(" / ")}</p>

<button onclick="speak('${lesson.letters[0]}')">🔊</button>

${navButtons()}
`

}



function quizLetter(lesson){

let correct = lesson.letters[0]
let options=[...lesson.letters,"ಮ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Find "${lesson.sounds[0]}"</h2>

${options.map(o=>`<button onclick="checkAnswer('${o}','${correct}',quizLetter.bind(null,lesson))">${o}</button>`).join("")}

${navButtons()}
`

}



function traceLesson(letter){

document.getElementById("screen").innerHTML=

`
<h2>Trace</h2>
<h1>${letter}</h1>

<canvas id="canvas" style="width:320px;height:320px;border:2px solid #ccc;"></canvas>

${navButtons()}
`

initTraceCanvas()

}



function showWord(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=

`
<h1>${w.text}</h1>
<p>${w.meaning}</p>

<button onclick="speak('${w.text}')">🔊</button>

${navButtons()}
`

}



function quizWord(lesson){

let w = lesson.word

let options=[w.text,"ಮನೆ","ನದಿ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>${w.meaning}</h2>

${options.map(o=>`<button onclick="checkAnswer('${o}','${w.text}',quizWord.bind(null,lesson))">${o}</button>`).join("")}

${navButtons()}
`

}



function showBreakdown(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=

`
<h1>${w.text}</h1>

<p>${w.breakdown.map(s=>`[${s}]`).join(" ")}</p>

<p>${w.phonetic.join(" + ")}</p>

${navButtons()}
`

}



/* ---------------- COMPLETE ---------------- */

function showLessonComplete(){

document.getElementById("screen").innerHTML=

`
<h2>Lesson Complete</h2>

<button onclick="showLessonMenu()">Back to Lessons</button>
`

}



/* ---------------- HELPERS ---------------- */

function checkAnswer(choice,correct,retry){

if(choice===correct){
nextStep()
}else{
retryQueue.push(retry)

document.getElementById("screen").innerHTML=

`
<h2>Try Again</h2>

<button onclick="nextStep()">Continue</button>
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



/* ---------------- START ---------------- */

showHome()
