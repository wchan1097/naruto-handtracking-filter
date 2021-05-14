let capture;
let pn;
let hand;
var rasenganImg;
var chidoriImg;
var pickedJutsu = rasenganImg;

function setJutsu(event){
  pickedJutsu = event.textContent;
}

let sketch =  new p5(p => {
  p.preload = function(){
    rasenganImg = p.loadImage("Rasengan.webp");
    chidoriImg = p.loadImage("Chidori.png");
  };

  p.setup = function(){
    p.createCanvas(640, 480);
    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    pn = ml5.handpose(capture, modelReady);
    pn.on("predict", function(results) {
      if (results.length > 0){
        hand = results[0];
      }
      else{
        hand = null;
      }
    });
    capture.hide();
  };

  function modelReady() {
    console.log("Posenet model is ready");
  }

  p.draw = function(){
    p.fill(255, 0, 0);
    p.stroke(255, 0, 0);
    p.image(capture, 0, 0);
    if (hand){
      var fingers = [
        hand.annotations.indexFinger, 
        hand.annotations.middleFinger,
        hand.annotations.pinky,
        hand.annotations.ringFinger,
        hand.annotations.thumb
      ];
      var palm = hand.annotations.palmBase; 
      var middleX = fingers[1][2][0];
      var middleY = fingers[1][2][1];
      var x = palm[0][0];
      var y = palm[0][1];  
      var imgX = ((middleX + x) / 2);
      var imgY = ((middleY + y) / 2);
      var imgDimensions;
      if (pickedJutsu == "Chidori"){
        imgDimensions = 600;
        p.tint(255, 200);
        p.image(chidoriImg, imgX - (imgDimensions / 2), imgY - (imgDimensions / 2), imgDimensions, imgDimensions);
      }
      else{
        imgDimensions = 180;
        p.image(rasenganImg, imgX - (imgDimensions / 2), imgY - (imgDimensions / 2), imgDimensions, imgDimensions);
      }
      // fingers.forEach(element => {
      //   for (var count = 1; count < element.length; count ++){
      //     //Previous Finger Point
      //     var prevItem = element[count - 1];
      //     var prevX = prevItem[0];
      //     var prevY = prevItem[1];
      //     ellipse(prevX, prevY, 10);

      //     //Current Finger Point
      //     var currItem = element[count];
      //     var currX = currItem[0];
      //     var currY = currItem[1];
      //     ellipse(currX, currY, 10);

      //     line(prevX, prevY, currX, currY, 5);
      //   }
      // })
      if (p.mouseIsPressed){
        console.log(hand);
      }
    }
  }
}, "webContainer");

