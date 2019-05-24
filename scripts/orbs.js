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
      this.txtMouseCoords = new TxtBox((canW/2)-100,60,"32px Ariel","rgb(0,200,0)","X,Y:  "+ this.mouseX+" , "+this.mouseY);
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
          this.nodes.push(new Node(newX,newY,this.nodeDiam/2,myColors.blue));
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

  this.init = function() {
    this.mouseOver = false;
  };

  this.draw = function() {
    ctx.save();
    ctx.beginPath();
    // ctx.translate(this.x,this.y);
    if (this.mouseOver) {
      ctx.fillStyle = myColors.cherry;
      ctx.strokStyle = myColors.green;
      ctx.arc(this.x,this.y,this.radius+4,0,360);
    } else {
      ctx.fillStyle = this.color;
      ctx.strokStyle = this.color;
      ctx.arc(this.x,this.y,this.radius,0,360);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  this.update = function(mX,mY) {
    if ( (mX > (this.x-this.radius)) && (mX < (this.x+this.radius)) &&
         (mY > (this.y-this.radius)) && (mY < (this.y+this.radius)) )  {
      this.mouseOver = true;
    } else {
      this.mouseOver = false;
    }
  };

}
