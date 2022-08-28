/* 
  RANGE BAR
 */
 
//app.css("css/ui/range.css");
 
class RangeInput {
  constructor ({value=50}) {
    let state = {value};
    let cont = DOM.createElement("input");
    cont.type = "range";
    cont.style.marginTop = "10px";
    
    cont.addEventListener("input", function () {
      state.value = cont.value;
    });
    this.state = state;
    this.cont = cont;
    this.render();
  }
  
  set (prop, value) {
    this.state[prop] = value;
    this.render();
  }
  
  render () {
    this.cont.value = this.state.value;
  }
  
  
  
  /**** en desarrollo 
  _constructor () {
    let container = DOM.createElement("div");
    let bar = DOM.createElement("div");
    let ctrl = DOM.createElement("div");
    
    container.setAttribute("class", "range--container");
    bar.setAttribute("class", "range--bar");
    ctrl.setAttribute("class", "range");
    
    
    container.appendChild(bar);
    container.appendChild(ctrl);
    
    this.value = 50;
    this.color = "blue"//"var(--primary-color)";
    this.container = container;
    this.bar = bar;
    this.ctrl = ctrl;
    
    this.render();
  }
  
  render () {
    let bar = this.bar;
    let ctrl = this.ctrl;
    let container = this.container;
    
    ctrl.style.height = container.style.height;
    bar.style.borderColor = this.color;
    container.style.paddingLeft = parseInt(ctrl.style.width)/2 + "px";
    ctrl.style.background = this.color;
    ctrl.style.left = this.value + "%";
  }
  */
}