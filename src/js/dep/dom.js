let d=-1;
let fSlider, tSlider, button;

function initPlayButton(){
  elem = createDiv('\n')
  elem.position(1230,540);
  elem.style('width', '365px');
  elem.style('height', '165px');
  elem.style('padding', '20px');
  elem.style('background-color', '#f0f0f0');

  button = createButton('START/STOP');
  //button = createCheckbox('START/STOP', true);
  button.position(1250,675);
  button.style('width', '365px');
  button.style('background-color', '#dfb04b');
  button.style('border', 'none');
  button.style('color', '#161616');
  button.style('padding', '15px');
  button.style('font-family', 'PT Sans');
  button.style('font-size', '14pt');

  //button.style('z-index', '1');
  button.mousePressed(buttonMousePressed)
}
function buttonMousePressed(){
  d*=-1;
}

function initFreqSlider(){
  freq_text = createP('Speed');
  freq_text.position(1250,540);
  freq_text.style('font-size', '14pt');
  freq_text.style('font-family', 'PT Sans');
  freq_text.style('font-style', 'bold');
  freq_text.style('color', '#161616');
  //freq_text.style('text-shadow', '1px 1px #c2c2c2');

  fSlider = createSlider(0.5, 15, f/60, 0.5);
  fSlider.position(1310,555);
  fSlider.style('width', '300px');
  //fSlider.style('z-index', '1');
  fSlider.changed(fSliderChanged);
}
function fSliderChanged(){
   console.log("FREQ SLIDER CHANGE",fSlider.value());
   f = fSlider.value()*60;
   toDraw = [];
   tooFast = f > g;
   getStartStop(tripData, g, f);
   addTrips(tripData);

   removeElements();
   initPlayButton();
   initFreqSlider();
   initTimeSlider();
}
function initTimeSlider(){
  time_text = createP('Time');
  time_text.position(1250,600);
  time_text.style('font-size', '14pt');
  time_text.style('font-family', 'PT Sans');
  time_text.style('font-style', 'bold');
  time_text.style('color', '#161616');
  //time_text.style('text-shadow', '1px 1px #c2c2c2');


  tSlider = createSlider((startTMin-1)*f, stopTMax*f, t, g); // in seconds
  tSlider.position(1310,615);
  tSlider.style('width', '300px');
  //tSlider.style('z-index', '1');
  tSlider.changed(tSliderChanged);
}
let tSliderPulsed = -1;
function tSliderChanged(){
   console.log("TIME SLIDER CHANGE", tSlider.value());
   toDraw = [];
   visited = [];
   t = tSlider.value();
   tSliderPulsed *= -1;
   for (var i = 0; i < t; i += f) {
      getToDraw(i)
   }
   tSliderPulsed *= -1;
}
