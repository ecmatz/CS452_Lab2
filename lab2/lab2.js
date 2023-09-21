var gl;
var shaderProgram;
var theta;
var canvas;
var rotateFlag;
var clipX;
var clipY;
var velocityUnif;
var direction;
var acceleration;
function init(){
  direction = "right";
  acceleration = 1.0;
  theta = .0;
  rotateFlag = 0;
  clipX =.0;
  clipY=.0;
  canvas = document.getElementById("gl-canvas");
  gl=WebGLUtils.setupWebGL(canvas);
  if (!gl) {alert( "WebGL is not available" );}

  gl.viewport(0, 0, 512, 512);

  gl.clearColor( 1.0, .5, .761, 1.0 );

  shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
  velocityUnif = gl.getUniformLocation(shaderProgram, "velocity")
  gl.useProgram(shaderProgram);
  gl.clear(gl.COLOR_BUFFER_BIT);

  setupShape();
  drawShape();
}

function setupShape(){
  var p0 = vec2(.0,.0);
  var p1 = vec2(.1,.1);
  var p2 = vec2(.25,.25);
  var p3 = vec2(.35,.1);
  var p4 = vec2(.15,.25);
  var arrayOfPoints = [p0,p1,p2,p3,p4];

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW);

  var myPositionAttribute = gl.getAttribLocation( shaderProgram, "myPosition" );
  gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( myPositionAttribute );
}

function drawShape(){
  var thetaUniform = gl.getUniformLocation(shaderProgram, "theta");
  gl.uniform1f(thetaUniform,theta);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN,0,5);
  theta+=.005 * rotateFlag;
  move();
  requestAnimFrame(drawShape);
}
function startRotate(){rotateFlag = 1;}
function stopRotate(){rotateFlag = 0;}

function moveShapeMouse(event) {
var canvasX = event.clientX;
var canvasY = event.clientY;
clipX = 2.0*canvasX / 512.0 - 1.0;
clipY =-(2.0*canvasY / 512.0 - 1.0);
gl.uniform2f(velocityUnif,clipX, clipY);
}

function move(){
  if (direction == "right"){
    clipX += .001*acceleration;
  }
  if (direction == "left"){
    clipX -= .001*acceleration;
  }
  if (direction == "up"){
    clipY += .001*acceleration;
  }
  if (direction == "down"){
    clipY -= .001*acceleration;
  }
  gl.uniform2f(velocityUnif, clipX, clipY)
}
function moveShapeKeys(event) {
  var _keyCode = event.keyCode;
  if (_keyCode == 65){
    direction = "left";
  } else if (_keyCode == 68){
    direction = "right"
  } else if(_keyCode == 83){
    direction = "down";
  } else if (_keyCode == 87){
    direction = "up";
  }
  gl.uniform2f(velocityUnif, clipX, clipY);
}
function increaseSpeed(){
    acceleration++;
}
function decreaseSpeed(){
  console.log(acceleration);
  if (acceleration <=0){
    acceleration = 0;
  } else{
    acceleration--;
  }
}
