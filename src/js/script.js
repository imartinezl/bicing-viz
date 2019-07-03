// INITIALIZATION
let t = 0;//0;
let f = 5*60; // TIME FREQUENCY (in seg)
let g = 15*60; // TRIPS FREQUENCY (15min in seg)
let toDraw = [];
let visited = [];
let tooFast = f > g;

let canvas;
let myMap;

let stationsData;
let stationsCoor = [];
let tripData;

function preload() {
  stationsData = loadJSON('./json/stations.json');
  tripJSON = loadJSON('./json/data.json');
}
function setup() {

  canvas = createCanvas(1000, 600);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  getStationsCoor(stationsData);
  tripData = tripJSON.data;
  getStartStop(tripData, g, f);
  addTrips(tripData);

  t = (startTMin - 1)*f;
  initPlayButton();
  initFreqSlider();
  initTimeSlider();
}

function draw(){
  if(t < stopTMax*f && d>0){
    t += f;
    getToDraw(t);
  }
  if(d>0)  drawTrips();
}
