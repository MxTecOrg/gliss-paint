/* EVENTOS EN BARRA DE CANVAS */

/* (event) click en deshacer */
function OnUndo () {undo()}
function OnRedo () {redo()}

/* (event) mostrar dialogo de pincel */
function OnPencilStyle () {
  
  if (!window.modal_pencilStyle) {
    /* crear modal */
    let modal = new Modal("Pincel");
    let body = modal.body;
    let pToColor = porc => porc / 100 * 255;
    
    let pencil_view = DOM.createElement("canvas");
    let _ctx = pencil_view.getContext("2d");
    
    /* barras deslizables */
    let range_weight = new RangeInput({value: 50});
    let range_blue = new RangeInput({value: 0});
    let range_red = new RangeInput({value: 0});
    let range_green = new RangeInput({value: 0});
    let range_alpha = new RangeInput({value: 100});
    
    pencil_view.width = 100;
    pencil_view.height = 100;
    renderPencilView();
    
    range_weight.cont.oninput = renderPencilView;
    range_red.cont.oninput = renderPencilView;
    range_blue.cont.oninput = renderPencilView;
    range_green.cont.oninput = renderPencilView;
    range_alpha.cont.oninput = renderPencilView;
    
    function renderPencilView () {
      /* renderizar visor de pincel */
      _ctx.clearCanvas();
      _ctx.lineWidth = pencil.max_weight * range_weight.state.value/100;
      _ctx.strokeStyle = 
        "rgba(" 
        + pToColor(range_red.state.value) + "," 
        + pToColor(range_blue.state.value) + "," 
        + pToColor(range_green.state.value) + ","
        + range_alpha.state.value / 100
      + ")";
      _ctx.beginPath();
      _ctx.moveTo(pencil_view.width, 0);
      _ctx.lineTo(0, pencil_view.height);
      _ctx.stroke();
      _ctx.closePath();
    }
    
    body.appendChild(pencil_view);
    body.appendChild(range_weight.cont);
    body.appendChild(range_red.cont);
    body.appendChild(range_blue.cont);
    body.appendChild(range_green.cont);
    body.appendChild(range_alpha.cont);
    
    /* botones de modal */
    modal.addButton("Cancelar", function(){
      let rgb = pencil.rgb;
      range_red.set("value", rgb.red*100 / 255);
      range_blue.set("value", rgb.blue*100 / 255);
      range_green.set("value", rgb.green*100 / 255);
      range_alpha.set("value", rgb.alpha*100);
      range_weight.set("value", pencil.weight*100 / pencil.max_weight);
      renderPencilView();
    });
    modal.addButton("Aceptar", function(){
      let rgb = pencil.rgb;
      rgb.red = pToColor(range_red.state.value);
      rgb.blue = pToColor(range_blue.state.value);
      rgb.green = pToColor(range_green.state.value);
      rgb.alpha = range_alpha.state.value/100;
      pencil.weight = range_weight.state.value/100 * pencil.max_weight;
      pencil.color = "rgba(" + rgb.red + ", " + rgb.blue + ", " + rgb.green + "," + rgb.alpha + ")";
    });
    modal_pencilStyle = modal;
  }
  
  /* mostrar modal */
  modal_pencilStyle.show();
  
}

