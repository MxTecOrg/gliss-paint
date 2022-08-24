/* evento dibujar */
let last_client_x = 0;
let last_client_y = 0;
function drawHandler (event) {
  event = event.targetTouches[0];
  let client_x =  event.clientX;
  let client_y =  event.clientY;
  
  if (!last_client_x) {
    last_client_x = client_x;
    last_client_y = client_y;
  }
  
  ctx.beginPath();
  ctx.moveTo(last_client_x, last_client_y);
  ctx.lineTo(client_x, client_y);
  ctx.stroke();
  ctx.closePath();
 
  last_client_x = client_x;
  last_client_y = client_y;
}


/* deshacer */
function undo () {
  let data_url = undo.history[undo.history.length - 1];
  //redo.history.push(canvas.toDataURL("image/png"));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (data_url) ctx.drawImageDataURL(data_url, 0, 0, canvas.width, canvas.height);
  undo.history.pop();
}

/* rehacer */
function redo () {
  let data_url = redo.history[redo.history.length - 1];
  if (data_url) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImageDataURL(data_url, 0, 0, canvas.width, canvas.height);
  }
  redo.history.pop();
  undo.history.push(data_url);
}