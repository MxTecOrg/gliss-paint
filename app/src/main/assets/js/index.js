
app.script("js/canvas/paint.js");
app.script("js/canvas/prototype.js");
app.script("libs/java.js");
app.script("libs/eruda.min.js", () => eruda.init());

app.css("css/index.css");


/* (app) iniciar aplicación */
function OnStart () {
  
  /* (canvas) inicializar */
  canvas = DOM.getElementById("canvas");
  canvas.width = app.width - 20;
  canvas.height = app.height - 20;
  ctx = canvas.getContext("2d");
  
  /* rehacer y deshacer */
  undo.history = [];
  redo.history = [];
  
  /* dibujar */
  canvas.ontouchstart = e => {
    undo.history.push(canvas.toDataURL("image/png"));
    last_client_x = null;
    last_client_y = null
    drawHandler(e);
  };
  canvas.ontouchmove = drawHandler;
};