let d=-1;
let fSlider, tSlider, button;

function initPlayButton(){
  button = createButton('START/STOP');
  //button = createCheckbox('START/STOP', true);
  button.position(20,150);
  button.style('width', '300px');
  button.style('z-index', '1');
  button.mousePressed(buttonMousePressed)
}
function buttonMousePressed(){
  d*=-1;
}

function initFreqSlider(){
  fSlider = createSlider(5, 60, f/60, 5);
  fSlider.position(20,100);
  fSlider.style('width', '300px');
  fSlider.style('z-index', '1');
  fSlider.changed(fSliderChanged);
}
function fSliderChanged(){
   console.log("FREQ SLIDER CHANGE",fSlider.value());
   f = fSlider.value()*60;
   toDraw = [];
   tooFast = f > g;
   getStartStop(tripData, g, f);
   removeElements();
   initPlayButton();
   initFreqSlider();
   initTimeSlider();
   console.log("DONE");
}
function initTimeSlider(){
  tSlider = createSlider((startTMin-1)*f, stopTMax*f, t, g); // in seconds
  tSlider.position(20,200);
  tSlider.style('width', '300px');
  tSlider.style('z-index', '1');
  tSlider.changed(sSliderChanged);
}
function sSliderChanged(){
   console.log("TIME SLIDER CHANGE", tSlider.value());
   toDraw = [];
   visited = [];
   t = tSlider.value();
   console.log(t);
   for (var i = 0; i < t; i += f) {
      getToDraw(i)
   }
}
