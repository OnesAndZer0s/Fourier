var incre = -1;
var data = '';
function saveCookies() {
setCookie("Path",value("path"),365);
setCookie("Skip",value("skip"),365);
setCookie("Speed",value("speed"),365);
setCookie("RepeatForever",value("repeatForever"),365);
setCookie("Repeat",value("repeat"),365);
setCookie("Scale",value("scale"),365);
setCookie("Style",value("style"),365);
setCookie("Time",value("time"),365);
setCookie("StartX",value("startX"),365);
setCookie("StartY",value("startY"),365);
setCookie("CircleWidth",value("circleWidth"),365);
setCookie("CircleColor",value("circleColor"),365);
setCookie("LineWidth",value("lineWidth"),365);
setCookie("LineColor",value("lineColor"),365);
setCookie("DrawWidth",value("drawWidth"),365);
setCookie("DrawColor",value("drawColor"),365);
setCookie("Play",value("play"),365);
setCookie("Sort",value("sort"),365);
setCookie("RemoveZeros",value("removeZeros"),365);
}


function loadCookies(){
id("path").value = getCookie("Path");
id("skip").value = getCookie("Skip");
id("speed").value = getCookie("Speed");
id("repeatForever").checked = eval(getCookie("RepeatForever"));
id("repeat").value = getCookie("Repeat");
id("scale").value = Number(getCookie("Scale"));
id("style").value = getCookie("Style");
id("time").value = getCookie("Time");
id("startX").value = getCookie("StartX");
id("startY").value = getCookie("StartY");
id("circleWidth").value = getCookie("CircleWidth");
id("circleColor").value = getCookie("CircleColor");
id("lineWidth").value = getCookie("LineWidth");
id("lineColor").value = getCookie("LineColor");
id("drawWidth").value = getCookie("DrawWidth");
id("drawColor").value = getCookie("DrawColor");
id("play").checked = eval(getCookie("Play"));
id("sort").checked = eval(getCookie("Sort"));
id("removeZeros").checked = eval(getCookie("RemoveZeros"));
init();
}

function clearCookies(){
setCookie("Path","",365);
setCookie("Skip","0",365);
setCookie("Speed","1",365);
setCookie("RepeatForever","false",365);
setCookie("Repeat","1",365);
setCookie("Scale","1",365);
setCookie("Style","0",365);
setCookie("Time","0",365);
setCookie("StartX","0",365);
setCookie("StartY","0",365);
setCookie("CircleWidth","1",365);
setCookie("CircleColor","rgba(0,128,128,0.2)",365);
setCookie("LineWidth","1",365);
setCookie("LineColor","rgba(0,128,128,1)",365);
setCookie("DrawWidth","3",365);
setCookie("DrawColor","rgba(0,0,0,1)",365);
setCookie("Play","true",365);
setCookie("Sort","true",365);
setCookie("RemoveZeros","false",365);}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  


function id(id){return document.getElementById(id);}

function value(i){
if (id(i).type !== "checkbox") {
if (id(i).type == "number") {
return Number(id(i).value);
}else {return id(i).value;
}}
else {
return id(i).checked;}
}


function init() {
incre++
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var Xvalues = [];
var Yvalues = [];
var valuePointer = 0;
var glox = 128.0,
		gloy = 128.0;



function connect(coordOne, coordTwo) {
		context.beginPath();
		context.moveTo(coordOne[0], coordOne[1]);
		context.lineTo(coordTwo[0], coordTwo[1]);
		context.strokeStyle = lineColor;
  	context.lineWidth = lineWidth;
		context.stroke();
};

function drawWave() {
    valuePointer++;
    Xvalues[valuePointer] = glox;
    Yvalues[valuePointer] = gloy;
		context.beginPath();
    context.lineWidth = drawWidth;
		context.strokeStyle = drawColor;
		context.moveTo(glox, gloy);
		for (var i = 1; i < Xvalues.length; ++i) {
				context.lineTo(Xvalues[(valuePointer - i)], Yvalues[(valuePointer - i)]);
		}
		context.stroke();
}



function epiCycles(x, y, rotation, fourier) {
  for (var i = 0; i < fourier.length; i++) {
    var prevx = x;
    var prevy = y;
    var freq = fourier[i].freq;
    var radius = fourier[i].amp * scale;
    var phase = fourier[i].phase;
    x += radius * Math.cos(freq * subtime + phase + rotation);
    y += radius * Math.sin(freq * subtime + phase + rotation);
    
		//var phase = order * time * TAU;
		//var radius = 4.0 / (order * Math.PI) * Scale;
		context.beginPath();
		context.lineWidth = circleWidth;
		context.strokeStyle = circleColor;
    context.arc(x, y, radius*1, 0, Math.PI * 2.0);
		context.stroke();
		context.strokeStyle = circleColor;
		context.lineWidth = circleWidth;
		context.moveTo(prevx, prevy);
    context.lineTo(x, y);
// 		x += Math.cos(phase) * radius;
// 		y += Math.sin(phase) * radius;
		context.stroke();
  }
//   return createVector(x, y);
	return [x,y];
}

function dft(vals,sort) {
  var newArr = [];
  var length = vals.length;
  for (var k = 0; k < length; k++) {
    var re = 0;
    var im = 0;
    for (var n = 0; n < length; n++) {
      var phi = ( ( Math.PI * 2 ) * k * n) / length;
      re += vals[n] * Math.cos(phi);
      im -= vals[n] * Math.sin(phi);
    }

    var freq = k;
    var amp = Math.sqrt( (re * re) + (im * im) );
    var phase = Math.atan2(im, re);
    newArr[k] = { re, im, freq, amp, phase };
  }
  if (sort == true) {
  newArr.sort((a, b) => b.amp - a.amp);
  }
  return newArr;
}

function arrToData(arr){
arr = arr.replace(/[ ]/gm,',');
arr = arr.replace(/[#]/gm,',');
arr = arr.split(","); 
var newArr = [];  
for (var i = 0; i < arr.length; i += 2) {
if (!isNaN(Number(arr[i])) && !isNaN(Number(arr[i+1]))) {newArr.push({x: Number(arr[i]), y: Number(arr[i+1])}); } else {console.log(arr[i],arr[i+1]);}
} 
return newArr;
}
id("startX").max = canvas.clientWidth;
id("startY").max = canvas.clientHeight;

var play = value("play");
var skip = value("skip");
var speed = value("speed");
var repeat = value("repeat");
var scale = value("scale");
var style = Number(value("style"));
var time = value("time");
var sort = value("sort");
var removeZeros = value("removeZeros");
var startX = value("startX");
var startY = value("startY");

var circleColor = value("circleColor");
var circleWidth = value("circleWidth");
var lineColor = value("lineColor");
var lineWidth = value("lineWidth");
var drawColor = value("drawColor");
var drawWidth = value("drawWidth");

data = arrToData(value("path"));

if (removeZeros == true) {data = data.filter(function(cur){return cur.x !== 0 && cur.y !== 0})}
var xArr = [];
var yArr = [];
var fourierX;
var fourierY;
var subtime = time;
var path = [];

  for (var i = 0; i < data.length; i += skip+1) {
    xArr.push(data[i].x);
    yArr.push(data[i].y);
  }
  fourierX = dft(xArr,sort);
  fourierY = dft(yArr,sort);

var newFourier = '';
var oldIncre = incre;
(function frame() {
setTimeout(function(){
if (play) {		
canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
//     for (var order = 0; order <= orderInput; order++) {
// 		fourier((order << 1) + 1);
//     }		
if (style == 0) {
var Xcycle = epiCycles(startX,50,0,fourierX);
glox = Xcycle[0];

var Ycycle = epiCycles(50,startY,Math.PI/2,fourierY);
gloy = Ycycle[1];

		connect([50,gloy],[glox,gloy]);
		connect([glox,50],[glox,gloy]);
		drawWave();
} else if (style == 1){
  
var Xcycle = epiCycles(startX,startY,0,fourierX);
glox = Xcycle[0];

var Ycycle = epiCycles(startX,startY,Math.PI/2,fourierY);
gloy = Ycycle[1];

		connect([glox,startY],[glox,gloy]);
		connect([startX,gloy],[glox,gloy]);
		drawWave();

} else if (style == 2) {
var fx = fourierX[0],
    fy = fourierY[0],
    radiusX = fx.amp * scale,
    radiusY = fy.amp * scale;

var Xcycle = epiCycles(startX-radiusX,startY,0,fourierX);
glox = Xcycle[0];

var Ycycle = epiCycles(startX,startY-radiusY,Math.PI/2,fourierY);
gloy = Ycycle[1];

		connect([glox,startY],[glox,gloy]);
		connect([startX,gloy],[glox,gloy]);
		drawWave();

  
}
  
  let dt = (Math.PI * 2) / fourierY.length;
  subtime += dt*speed; 
  
  
if (repeat !== Infinity) {
if (subtime/repeat > (Math.PI * 2)) {
    subtime = time;
Xvalues = []; Yvalues = [];
}}

}
if (oldIncre == incre) {
window.requestAnimationFrame(frame);
}
}, speed);
})();


}

init();
