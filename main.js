// var frequencyInput = -4;
// var orderInput = 3;
// var waveformInput = "square";
// var canvas = document.querySelector("canvas");
// var context = canvas.getContext("2d");

// var TAU = Math.PI * 2.0;
// var Scale = 64.0;
// var time = 0.0;
// var startTime = new Date().getTime();
// var values = [];
// var valuePointer = 0;
// var x = 128.0,
// 		y = 128.0;

// function fourier(order) {
// 		var phase = order * time * TAU;
// 		var radius = 4.0 / (order * Math.PI) * Scale;
// 		context.beginPath();
// 		context.lineWidth = 1.0;
// 		context.strokeStyle = "rgba(255,128,32,1.0)";
// 		context.arc(x, y, radius, 0, TAU);
// 		context.stroke();
// 		context.strokeStyle = "rgba(255,255,255,0.4)";
// 		context.moveTo(x, y);
// 		x += Math.cos(phase) * radius;
// 		y += Math.sin(phase) * radius;
// 		context.lineTo(x, y);
// 		context.stroke();
// };

// function connect() {
// 		context.beginPath();
// 		context.moveTo(x + 0.5, y + 0.5);
// 		context.lineTo(256 + 0.5, y + 0.5);
// 		context.strokeStyle = "rgba(255,255,32,1.0)";
// 		context.stroke();
// };

// function drawWave() {
// 		values[valuePointer++ & 255] = y;
// 		context.beginPath();
// 		context.strokeStyle = "rgba(0,255,0,1)";
// 		context.moveTo(256 + 0.5, y + 0.5);
// 		for (var i = 1; i < 256; ++i) {
// 				context.lineTo(256 + i + 0.5, values[(valuePointer - i) & 255] + 0.5);
// 		}
// 		context.stroke();
// }

// (function frame() {
// 		canvas.width = canvas.clientWidth;
// 		canvas.height = canvas.clientHeight;
// 		x = 144.0;
// 		y = 128.0;
// 		switch (waveformInput) {
// 				case "square":
// 						for (var order = 0; order <= orderInput; order++) {
// 								fourier((order << 1) + 1);
// 						}
// 						break;
// 				case "sawtooth":
// 						for (var order = 1; order <= orderInput; order++) {
// 								fourier(order << 1);
// 						}
// 						break;
// 		}
// 		connect();
// 		drawWave();
// 		var now = new Date().getTime();
// 		time += (now - startTime) * Math.pow(10.0, frequencyInput);
// 		startTime = now;
// 		window.requestAnimationFrame(frame);
// })();


var drawing = [
{ x: 100, y: 100 },
{ x: 0, y: 100 },
{ x: 0, y: 0 },
{ x: 100, y: 0 },
];

function dft(vals) {
  var X = [];
  var N = vals.length;
  for (var k = 0; k < N; k++) {
    var re = 0;
    var im = 0;
    for (var n = 0; n < N; n++) {
      var phi = ( ( Math.PI * 2 ) * k * n) / N;
      re += x[n] * Math.cos(phi);
      im -= x[n] * Math.sin(phi);
    }
    //re = re / N;
    //im = im / N;

    var freq = k;
    var amp = Math.sqrt(re * re + im * im);
    var phase = Math.atan2(im, re);
    X[k] = { re, im, freq, amp, phase };
  }
  return X;
}




let data = drawing;

let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];

  const skip = 0;
  for (let i = 0; i < data.length; i += skip+1) {
    x.push(data[i].x);
    y.push(data[i].y);
  }
  fourierX = dft(x);
  fourierY = dft(y);

  fourierX.sort((a, b) => b.amp - a.amp);
  fourierY.sort((a, b) => b.amp - a.amp);

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * Math.cos(freq * time + phase + rotation);
    y += radius * Math.sin(freq * time + phase + rotation);

//     stroke(255, 100);
//     noFill();
//     ellipse(prevx, prevy, radius * 2);
//     stroke(255);
//     line(prevx, prevy, x, y);
  }
//   return createVector(x, y);
	return null;
}

// function draw() {
//   background(0);

//   let vx = epiCycles(width / 2 + 100, 100, 0, fourierX);
//   let vy = epiCycles(100, height / 2 + 100, HALF_PI, fourierY);
//   let v = createVector(vx.x, vy.y);
//   path.unshift(v);
//   line(vx.x, vx.y, v.x, v.y);
//   line(vy.x, vy.y, v.x, v.y);

//   beginShape();
//   noFill();
//   for (let i = 0; i < path.length; i++) {
//     vertex(path[i].x, path[i].y);
//   }
//   endShape();

//   const dt = TWO_PI / fourierY.length;
//   time += dt;

//   if (time > TWO_PI) {
//     time = 0;
//     path = [];
//   }

// }


