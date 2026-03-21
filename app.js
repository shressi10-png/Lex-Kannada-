function showHome(){

document.getElementById("screen").innerHTML=

`
<h1>LexKannada</h1>

<button onclick="showAlphabet()">Alphabet Map</button>

<br>

<button onclick="showWritingPractice()">Writing Practice</button>

<br>

<button onclick="startLesson()">Structured Lessons</button>
`

}



function showAlphabet(mode="lesson"){

let letters=[
{l:"ಅ",p:"a"},{l:"ಆ",p:"aa"},{l:"ಇ",p:"i"},{l:"ಈ",p:"ee"},
{l:"ಉ",p:"u"},{l:"ಊ",p:"oo"},

{l:"ಕ",p:"ka"},{l:"ಖ",p:"kha"},{l:"ಗ",p:"ga"},{l:"ಘ",p:"gha"},
{l:"ಚ",p:"cha"},{l:"ಜ",p:"ja"},

{l:"ಟ",p:"ta"},{l:"ಡ",p:"da"},
{l:"ತ",p:"ta"},{l:"ದ",p:"da"},

{l:"ಪ",p:"pa"},{l:"ಬ",p:"ba"},{l:"ಮ",p:"ma"}
]

let html="<h2>Kannada Alphabet</h2><div class='grid'>"

letters.forEach(letter=>{

if(mode==="practice"){
html+=`
<div class="letter" onclick="traceSingleLetter('${letter.l}')">
<div>${letter.l}</div>
<div style="font-size:14px;color:#555">${letter.p}</div>
</div>`
}else{
html+=`
<div class="letter" onclick="startLetterLesson('${letter.l}','${letter.p}')">
<div>${letter.l}</div>
<div style="font-size:14px;color:#555">${letter.p}</div>
</div>`
}

})

html+="</div><button onclick='showHome()'>Back</button>"

document.getElementById("screen").innerHTML=html

}



function startLetterLesson(letter,phonetic){

document.getElementById("screen").innerHTML=

`
<h2>Letter Lesson</h2>

<h1>${letter}</h1>

<p>Sound: ${phonetic}</p>

<button onclick="speak('${letter}')">🔊 Hear Sound</button>

<br>

<button onclick="traceSingleLetter('${letter}')">Trace</button>

<br>

<button onclick="startMiniQuiz('${letter}','${phonetic}')">Practice</button>

<br>

<button onclick="showAlphabet()">Back</button>
`

}



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
<h2>Trace the letter</h2>

<h1>${letter}</h1>

<canvas id="canvas" style="width:320px;height:320px;background:white;border:2px solid #ccc;"></canvas>

<br>

<button onclick="resetCanvas('${letter}')">Retry</button>

<button onclick="showAlphabet('practice')">Back</button>
`

initTraceCanvas()

}



function resetCanvas(letter){

traceSingleLetter(letter)

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



function speak(text){

let msg=new SpeechSynthesisUtterance(text)
msg.lang="kn-IN"

speechSynthesis.speak(msg)

}



function startMiniQuiz(letter,phonetic){

let options=[letter,"ಕ","ಮ","ತ"]

options.sort(()=>Math.random()-0.5)

document.getElementById("screen").innerHTML=

`
<h2>Which letter is "${phonetic}"?</h2>

${options.map(o=>`<button onclick="checkMini('${o}','${letter}','${phonetic}')">${o}</button>`).join("")}
`

}



function checkMini(choice,correct,phonetic){

if(choice===correct){

document.getElementById("screen").innerHTML=

`
<h2>Correct</h2>

<button onclick="startLetterLesson('${correct}','${phonetic}')">Continue</button>
`

}else{

document.getElementById("screen").innerHTML=

`
<h2>Try Again</h2>

<button onclick="startMiniQuiz('${correct}','${phonetic}')">Retry</button>
`

}

}



function startLesson(){

document.getElementById("screen").innerHTML=

`
<h2>Structured Lessons</h2>

<p>Coming next...</p>

<button onclick="showHome()">Back</button>
`

}



showHome()
