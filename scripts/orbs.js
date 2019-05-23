/*jshint esversion: 6 */


function Orbs(width, height) {
  this.width = width;
  this.height = height;
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
  }; // draw


  this.update = function() {
    if (this.mouseEventData !== undefined) {
      let mouseData = this.getMousePos();
      this.mouseX = mouseData.x;
      this.mouseY = mouseData.y;
      this.txtMouseCoords.msg = ("rgb(0,200,0)","X,Y: "+ this.mouseX+","+this.mouseY);
    }
  }; // update


}
