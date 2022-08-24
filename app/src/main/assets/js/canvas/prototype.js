/* extender metodos canvas */

/* dibujar circulo */
CanvasRenderingContext2D.prototype.fillCircle = function (x, y, r) {
  this.beginPath();
  this.arc(x, y, r, 0, 6.283185307179586);
  this.fill();
  this.closePath();
};
 
/* dibujar imagen a partir de data url */ 
CanvasRenderingContext2D.prototype.drawImageDataURL = function (data_url, x, y, w, h) {
  let self = this;
  let img = DOM.createElement("img");
  img.setAttribute("src", data_url);
  img.onload = e => {
    self.drawImage(img, x, y, w, h);
    img = null;
  }
};