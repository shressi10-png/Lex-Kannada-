let currentLesson = 0
let step = 0



/* ---------------- LESSON DATA ---------------- */

const lessons = [

{
name:"Vowels",
letters:["ಅ","ಆ","ಇ","ಈ"],
sounds:["a","aa","i","ee"],
word:{
text:"ಅಮ್ಮ",
meaning:"mother",
breakdown:["ಅ","ಮ್ಮ"],
phonetic:["a","mma"]
}
},

{
name:"Ka Group",
letters:["ಕ","ಖ","ಗ"],
sounds:["ka","kha","ga"],
word:{
text:"ಕಲ್ಲು",
meaning:"stone",
breakdown:["ಕ","ಲ್ಲು"],
phonetic:["ka","llu"]
}
},

{
name:"Ma Combinations",
letters:["ಮ"],
sounds:["ma"],
combos:[
{form:"ಮಾ",sound:"maa"},
{form:"ಮಿ",sound:"mi"},
{form:"ಮೂ",sound:"moo"},
{form:"ಮೆ",sound:"me"}
],
word:{
text:"ಅಮ್ಮ",
meaning:"mother",
breakdown:["ಅ","ಮ್ಮ"],
phonetic:["a","mma"]
}
}

]



/* ---------------- HOME ---------------- */

function showHome(){

document.getElementById("screen").innerHTML=

`
<h1>LexKannada</h1>

<button onclick="showLessonMenu()">Structured Lessons</button>

<br>

<button onclick="showAlphabet()">Alphabet Map</button>

<br>

<button onclick="showWritingPractice()">Writing Practice</button>
`

}



/* ---------------- PROGRESS BAR ---------------- */

function progressBar(){

let total = 7
let progress = (step / total) * 100

return `
<div style="width:90%;margin:auto;height:10px;background:#ddd;border-radius:10px;">
<div style="width:${progress}%;height:10px;background:#3a7be0;border-radius:10px;"></div>
</div>
`
}



/* ---------------- LESSON MENU ---------------- */

function showLessonMenu(){

let html="<h2>Lessons</h2>"

lessons.forEach((l,i)=>{
html+=`<button onclick="startLesson(${i})">${l.name}</button><br>`
})

html+=`<br><button onclick="showHome()">Back</button>`

document.getElementById("screen").innerHTML=html

}



/* ---------------- FLOW ---------------- */

function startLesson(index){
currentLesson = index
step = 0
runLesson()
}



function runLesson(){

let lesson = lessons[currentLesson]

if(step > 6){
showLessonComplete()
return
}

switch(step){

case 0: intro(lesson); break
case 1: showLetters(lesson); break
case 2: quiz(lesson); break
case 3: trace(lesson.letters[0]); break
case 4: showWord(lesson); break
case 5: showBreakdown(lesson); break
case 6: showCombinations(lesson); break

}

}



/* ---------------- NAV ---------------- */

function nav(){

return `
${progressBar()}
<br>
<button onclick="step--;runLesson()">Back</button>
<button onclick="step++;runLesson()">Next</button>
`
}



/* ---------------- SCREENS ---------------- */

function intro(lesson){

document.getElementById("screen").innerHTML=

`
<h2>${lesson.name}</h2>
<p>Learn and understand</p>
${nav()}
`
}



function showLetters(lesson){

document.getElementById("screen").innerHTML=

`
<h1>${lesson.letters.join(" ")}</h1>
<p>${lesson.sounds.join(" / ")}</p>

<button onclick="speak('${lesson.letters[0]}')">🔊</button>

${nav()}
`
}



function quiz(lesson){

let correct = lesson.letters[0]
let options=[...lesson.letters,"ಮ"]

options.sort(()=>Math.random()-0.5)

let html=`<h2>Find "${lesson.sounds[0]}"</h2>`

options.forEach(o=>{
html+=`<button onclick="answer('${o}','${correct}')">${o}</button>`
})

html+=nav()

document.getElementById("screen").innerHTML=html
}



function answer(choice,correct){

if(choice===correct){
step++
runLesson()
}else{
alert("Try again")
}
}



/* ---------------- TRACE WITH GUIDE ---------------- */

function trace(letter){

document.getElementById("screen").innerHTML=

`
<h2>Trace</h2>

<div style="position:relative;width:320px;height:320px;margin:auto;">

<div style="
position:absolute;
font-size:180px;
color:#ccc;
top:20px;
left:60px;
pointer-events:none;">
${letter}
</div>

<canvas id="canvas" style="width:320px;height:320px;border:2px solid #ccc;"></canvas>

</div>

${nav()}
`

initCanvas()
}



/* ---------------- WORD ---------------- */

function showWord(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=

`
<h1>${w.text}</h1>
<p>${w.meaning}</p>

<button onclick="speak('${w.text}')">🔊</button>

${nav()}
`
}



function showBreakdown(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=

`
<h1>${w.text}</h1>

<p>${w.breakdown.map(x=>`[${x}]`).join(" ")}</p>

<p>${w.phonetic.join(" + ")}</p>

${nav()}
`
}



/* ---------------- COMBINATIONS ---------------- */

function showCombinations(lesson){

if(!lesson.combos){
step++
runLesson()
return
}

let html=`<h2>Combinations</h2>`

lesson.combos.forEach(c=>{
html+=`<p>${c.form} → ${c.sound}</p>`
})

html+=nav()

document.getElementById("screen").innerHTML=html
}



/* ---------------- COMPLETE ---------------- */

function showLessonComplete(){

document.getElementById("screen").innerHTML=

`
<h2>Lesson Complete</h2>

<button onclick="showLessonMenu()">Back</button>
`
}



/* ---------------- AUDIO ---------------- */

function speak(text){
let msg=new SpeechSynthesisUtterance(text)
msg.lang="kn-IN"
speechSynthesis.speak(msg)
}



/* ---------------- CANVAS ---------------- */

function initCanvas(){

let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

let ratio=window.devicePixelRatio||1
canvas.width=320*ratio
canvas.height=320*ratio
ctx.scale(ratio,ratio)

ctx.lineWidth=8
ctx.lineCap="round"

let drawing=false

canvas.addEventListener("touchstart",(e)=>{
drawing=true
let rect=canvas.getBoundingClientRect()
ctx.beginPath()
ctx.moveTo(
e.touches[0].clientX-rect.left,
e.touches[0].clientY-rect.top
)
},{passive:false})

canvas.addEventListener("touchmove",(e)=>{
if(!drawing)return
let rect=canvas.getBoundingClientRect()
ctx.lineTo(
e.touches[0].clientX-rect.left,
e.touches[0].clientY-rect.top
)
ctx.stroke()
},{passive:false})

canvas.addEventListener("touchend",()=>drawing=false)

}



/* ---------------- START ---------------- */

showHome()
