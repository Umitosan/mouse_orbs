/*jshint esversion: 6 */


function Orbs(nodeDiam, width, height) {
  this.nodeDiam = nodeDiam; // diamater in pixels of node
  this.width = width;  // nodes per row
  this.height = height;  // nodes per column
  this.nodes = undefined;  // array of nods
  this.mouseX = undefined;
  this.mouseY = undefined;
  this.mouseEventData = undefined;
  this.txtMouseCoords = undefined;

  this.init = function() {
      //  TxtBox(x,y,font,color,msg)
      this.txtMouseCoords = new TxtBox((canW/2)-100,30,"32px Ariel","rgb(0,200,0)","X,Y:  "+ this.mouseX+" , "+this.mouseY);
      CANVAS.addEventListener('mousemove', (evt) => {
        this.mouseEventData = evt;
      }, false);
      CANVAS.addEventListener('click', (evt2) => {
        // DO STURFF@!!!
      }, false);
      // build nodes
      this.nodes = [];
      let xGap = canW / (this.width);
      let yGap = canH / (this.height);
      console.log('xGap,yGap = ' + xGap + " , " + yGap);
      for (let c = 0; c < this.width; c++) {
        let newX = (c * (xGap+1)) + ( xGap / 2 );
        for (let r = 0; r < this.height; r++) {
          let newY = (r * (yGap+1)) + ( yGap / 2 );
          this.nodes.push(new Node(newX,newY,this.nodeDiam/2,randColor("rgba")));
        }
      }
      console.log('this.nodes = ', this.nodes);
  }; // init

  this.getMousePos = function() {
    let rect = CANVAS.getBoundingClientRect();
    let msDataX = this.mouseEventData.clientX;
    let msDataY = this.mouseEventData.clientY;
    return {
      x: msDataX - rect.left,
      y: msDataY - rect.top
    };
  };


  this.draw = function() {
    this.txtMouseCoords.draw();
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  }; // draw


  this.update = function() {
    if (this.mouseEventData !== undefined) {
      let mouseData = this.getMousePos();
      this.mouseX = mouseData.x;
      this.mouseY = mouseData.y;
      this.txtMouseCoords.msg = ("rgb(0,200,0)","X,Y: "+ this.mouseX+","+this.mouseY);
    }
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].update(this.mouseX,this.mouseY);
    }
  }; // update


}




function Node(x,y,r,color) {
  this.x = x;
  this.y = y;
  this.radius = r;
  this.color = color;
  this.mouseOver = undefined;
  this.pulseRadius = r+10+3; // distance of pulse from center of node
  this.pulseBallRad = 8;
  this.pulseSpinSpeed = getRadianAngle(2);
  this.pulseSpinAngle = 0;

  this.init = function() {
    this.mouseOver = false;
  };

  this.drawPulse = function() {
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.pulseSpinAngle);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.fillStyle = 'rgba(0,200,0,1)';
    ctx.arc(this.pulseRadius,0,this.pulseBallRad,0,2*Math.PI);  // first arc
    ctx.fill();
    // ctx.stroke();
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.rotate(getRadianAngle(45));
      ctx.arc(this.pulseRadius,0,this.pulseBallRad,0,2*Math.PI);
      ctx.fill();
      // ctx.stroke();
    }
    ctx.restore();
  };

  this.draw = function() {
    // context.arc(x,y,r,sAngle,eAngle,counterclockwise)  angles in radiens
    if (this.mouseOver) {
      ctx.beginPath();
      ctx.fillStyle = invertRGBAstr(this.color);
      ctx.strokStyle = invertRGBAstr(this.color);
      ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
      this.drawPulse();
    } else {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
    }
  };

  this.update = function(mX,mY) {
    if ( (mX > (this.x-this.radius)) && (mX < (this.x+this.radius)) &&
         (mY > (this.y-this.radius)) && (mY < (this.y+this.radius)) )  {
      this.mouseOver = true;
      this.pulseSpinAngle += this.pulseSpinSpeed;
    } else {
      this.mouseOver = false;
    }
  };

}
