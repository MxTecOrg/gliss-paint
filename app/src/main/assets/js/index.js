
//app.script("libs/eruda.min.js", () => eruda.init());
app.script("js/ui/modal.js");
app.script("js/ui/range.js");
app.script("js/canvas/tool-bar.js");
app.script("js/canvas/paint.js");
app.script("js/canvas/prototype.js");
app.script("libs/java.js");

app.css("css/index.css");

/* propiedades del pincel */
var pencil = {
  
  weight: 5, //grosor de linea
  max_weight: 20, //grosor máximo
  min_weight: 1, //grosor mínimo

  color: "#000000", //color de linea
  rgb: { //color rgb
    red: 0,
    blue: 0,
    green: 0,
    alpha: 1,
  }
}

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