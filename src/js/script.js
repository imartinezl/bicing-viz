// INITIALIZATION
let t = 0;//0;
let f = 30*60; // TIME FREQUENCY (in seg)
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

  canvas = createCanvas(800, 700);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  getStationsCoor(stationsData);
  tripData = tripJSON.data;
  getStartStop(tripData, g, f);
  addTrips(tripData);

  initPlayButton();
  initFreqSlider();
  initTimeSlider();
}

function draw(){
  if(t < stopTMax*f && d>0){
    t += f;
    getToDraw(t);
  }
  drawTrips();
}
