
app.script("libs/java.js");
app.script("libs/eruda.min.js", () => eruda.init());

app.css("css/index.css");

/* (app) iniciar aplicación */
function OnStart () {
  
  app.debug("onstart", "Hello World!!");
}