let currentLesson = 0
let step = 0

/* ---------------- FULL ALPHABET ---------------- */

const fullAlphabet = [

{l:"ಅ",p:"a"},{l:"ಆ",p:"aa"},{l:"ಇ",p:"i"},{l:"ಈ",p:"ee"},
{l:"ಉ",p:"u"},{l:"ಊ",p:"oo"},{l:"ಋ",p:"ru"},
{l:"ಎ",p:"e"},{l:"ಏ",p:"ee"},{l:"ಐ",p:"ai"},
{l:"ಒ",p:"o"},{l:"ಓ",p:"oo"},{l:"ಔ",p:"au"},

{l:"ಕ",p:"ka"},{l:"ಖ",p:"kha"},{l:"ಗ",p:"ga"},{l:"ಘ",p:"gha"},{l:"ಙ",p:"nga"},
{l:"ಚ",p:"cha"},{l:"ಛ",p:"chha"},{l:"ಜ",p:"ja"},{l:"ಝ",p:"jha"},{l:"ಞ",p:"nya"},
{l:"ಟ",p:"ta"},{l:"ಠ",p:"tha"},{l:"ಡ",p:"da"},{l:"ಢ",p:"dha"},{l:"ಣ",p:"na"},
{l:"ತ",p:"ta"},{l:"ಥ",p:"tha"},{l:"ದ",p:"da"},{l:"ಧ",p:"dha"},{l:"ನ",p:"na"},
{l:"ಪ",p:"pa"},{l:"ಫ",p:"pha"},{l:"ಬ",p:"ba"},{l:"ಭ",p:"bha"},{l:"ಮ",p:"ma"},

{l:"ಯ",p:"ya"},{l:"ರ",p:"ra"},{l:"ಲ",p:"la"},{l:"ವ",p:"va"},
{l:"ಶ",p:"sha"},{l:"ಷ",p:"sha"},{l:"ಸ",p:"sa"},{l:"ಹ",p:"ha"},{l:"ಳ",p:"la"}

]



/* ---------------- LESSONS ---------------- */

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



/* ---------------- PROGRESS ---------------- */

function progressBar(){

let total = 7
let progress = (step / total) * 100

return `
<div style="width:90%;margin:auto;height:10px;background:#ddd;border-radius:10px;">
<div style="width:${progress}%;height:10px;background:#3a7be0;border-radius:10px;"></div>
</div>
`
}



/* ---------------- ALPHABET ---------------- */

function showAlphabet(){

let html="<h2>Alphabet</h2><div class='grid'>"

fullAlphabet.forEach(letter=>{

html+=`
<div class="letter" onclick="startLetterLesson('${letter.l}','${letter.p}')">
<div>${letter.l}</div>
<div style="font-size:14px">${letter.p}</div>
</div>
`

})

html+="</div><button onclick='showHome()'>Back</button>"

document.getElementById("screen").innerHTML=html

}



/* ---------------- LETTER LESSON ---------------- */

function startLetterLesson(letter,phonetic){

document.getElementById("screen").innerHTML=

`
<h2>Letter</h2>
<h1>${letter}</h1>
<p>${phonetic}</p>

<button onclick="speak('${letter}')">🔊 Hear</button>

<br>

<button onclick="startTrace('${letter}')">Trace</button>

<br>

<button onclick="showAlphabet()">Back</button>
`
}



/* ---------------- WRITING ---------------- */

let writingIndex = 0

function showWritingPractice(){

document.getElementById("screen").innerHTML=

`
<h2>Writing Practice</h2>

<button onclick="startWritingFlow(0)">Start Practice</button>

<br>

<button onclick="showHome()">Back</button>
`
}

function startWritingFlow(index){
writingIndex = index
showWritingLetter()
}

function showWritingLetter(){

let letter = fullAlphabet[writingIndex]

document.getElementById("screen").innerHTML=

`
<h2>Trace</h2>
<h1>${letter.l}</h1>
<p>${letter.p}</p>

<button onclick="startTrace('${letter.l}')">Start Tracing</button>

<br>

<button onclick="prevWriting()">Back</button>
<button onclick="nextWriting()">Next</button>
`
}

function nextWriting(){
if(writingIndex < fullAlphabet.length-1){
writingIndex++
showWritingLetter()
}
}

function prevWriting(){
if(writingIndex > 0){
writingIndex--
showWritingLetter()
}
}



/* ---------------- TRACE (FIXED) ---------------- */

function startTrace(letter){

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

<br>

<button onclick="startTrace('${letter}')">Retry</button>
<button onclick="showHome()">Home</button>
`

initCanvas()
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



/* ---------------- LESSON FLOW ---------------- */

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



/* ---------------- LESSON SCREENS ---------------- */

function intro(lesson){

document.getElementById("screen").innerHTML=
`<h2>${lesson.name}</h2>${nav()}`
}

function showLetters(lesson){

document.getElementById("screen").innerHTML=
`<h1>${lesson.letters.join(" ")}</h1>
<p>${lesson.sounds.join(" / ")}</p>
<button onclick="speak('${lesson.letters[0]}')">🔊</button>
${nav()}`
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



/* ---------------- TRACE LESSON ---------------- */

function trace(letter){
startTrace(letter)
}



/* ---------------- WORD ---------------- */

function showWord(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=
`<h1>${w.text}</h1>
<p>${w.meaning}</p>
<button onclick="speak('${w.text}')">🔊</button>
${nav()}`
}

function showBreakdown(lesson){

let w = lesson.word

document.getElementById("screen").innerHTML=
`<h1>${w.text}</h1>
<p>${w.breakdown.map(x=>`[${x}]`).join(" ")}</p>
<p>${w.phonetic.join(" + ")}</p>
${nav()}`
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
`<h2>Lesson Complete</h2>
<button onclick="showLessonMenu()">Back</button>`
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
