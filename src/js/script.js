
function Trip(d) {
  this.trajectory = d.trajectory;
  this.flow = d.flow;
  this.duration = round((d.destination_timestamp-d.origin_timestamp)/1000/60,2)*60;
  this.startTime = floor(d.origin_idx*g/f);
  this.stopTime = floor(d.destination_idx*g/f);
  this.durationAdj = (this.stopTime-this.startTime)*f;
  this.npoints = d.trajectory.length;
  this.deltaIncr =  f/this.durationAdj*(this.npoints-2+1);
  this.deltaIncr = round(this.deltaIncr*1000)/1000;
  this.c = 0;
  this.delta = 0.0;

  this.next = function(){
    origin = myMap.latLngToPixel(this.trajectory[this.c].latitude, this.trajectory[this.c].longitude);
    originVector = createVector(origin.x, origin.y);
    destination =  myMap.latLngToPixel(this.trajectory[this.c+1].latitude, this.trajectory[this.c+1].longitude);
    destinationVector = createVector(destination.x, destination.y);

    this.position = originVector.lerp(destinationVector, this.delta);
  }
  this.update = function(){
    this.delta += this.deltaIncr;
    ps = floor(this.delta);
    this.c = min(this.c + ps,this.npoints-2.0);
    this.delta = this.delta - ps;
  }
  this.save = function(p){
      // visited[p].push(this.trajectory); // to save all generated points
      if(f<g){
        visited[p].push(this.trajectory[this.c])  // to save only saved points
      }
  }
  this.saveFirst = function(p){
    visited[p].push(this.trajectory[0])
  }
  this.saveLast = function(p){
    visited[p].push(this.trajectory[this.npoints-1])
  }
  this.saveAll = function(p){
    this.trajectory.forEach(function(e){
      visited[p].push(e);
    })
  }
}

let trips = [];
function addTrips(data){
  trips = [];
  for (var i = 0; i < data.length; i++) {
    trips.push(new Trip(data[i]));
  }
}

const options = {
  lat: 41.3977,
  lng:  2.1606,
  zoom: 13,
  studio: true,
  style: 'mapbox://styles/inigoml/cjolr9fcq1x352rpilptsjt6c'
}
const key = 'pk.eyJ1IjoiaW5pZ29tbCIsImEiOiJjamcycndxcDAwcmlsMnFwaHk4eDdpanhnIn0.lOge1jvtZgNLhr6yUdz8qA'
const mappa = new Mappa('Mapbox', key);

// INITIALIZATION
let t = 0;//0;
let f = 30*60; // TIME FREQUENCY (in seg)
let g = 15*60; // TRIPS FREQUENCY (15min in seg)
let toDraw = [];
let visited = [];
let tooFast = f > g;
let fSlider, tSlider, button;

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

let d=-1;
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
  tSlider = createSlider(startTMin*f, stopTMax*f, t, g); // in seconds
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
   for (var i = 0; i < t; i += f) {
      getToDraw(i)
   }
}

function getToDraw(t){
  if (startT[t/f] != null) {
    startT[t/f].forEach(function(p){
        toDraw.push(p);
        if (visited[p] == null) visited[p] = [];
        if(!tooFast) trips[p].saveFirst(p);
    })
  }
  if (stopT[t/f] != null) {
    stopT[t/f].forEach(function(p){
        toDraw.splice( toDraw.indexOf(p), 1 );
        if(!tooFast){
          trips[p].saveLast(p);
        }else{
          trips[p].saveAll(p);
        }
    })
  }
}

function draw(){
  if(t < stopTMax*f && d>0){
    t += f;
  }
  // removeElements();
  // initFreqSlider();
  // initTimeSlider();
  // initPlayButton();

  getToDraw(t);
  drawTrips();
}
function getStationsCoor(data){
  for (var s in data) {
    stationsCoor.push([data[s].latitude, data[s].longitude])
  }
}

// let startT, stopT, startTMin, stopTMax;
// function getStartStop(data, g, f){
//   startT = stopT = [];
//   startTMin = stopTMax = null;
//   for (var i = 0; i < data.length; i++) {
//     o_idx = data[i].origin_idx;
//     o_idx = floor(o_idx*g/f);
//     if (startT[o_idx] == null) startT[o_idx] = [];
//     startT[o_idx].push(i);
//     d_idx = data[i].destination_idx;
//     d_idx = floor(d_idx*g/f);
//     if (stopT[d_idx] == null) stopT[d_idx] = [];
//     stopT[d_idx].push(i);
//
//     if(startTMin==null ||  o_idx < startTMin) startTMin = o_idx;
//     if(stopTMax==null || d_idx > stopTMax) stopTMax = d_idx;
//   }
//   console.log(startTMin);
//   console.log(stopTMax);
// }

// function drawStations(){
//   noStroke();
//   fill(255,128,0);
//   for(var i = 0; i < stationsCoor.length; i++){
//     var pos = myMap.latLngToPixel(stationsCoor[i][0], stationsCoor[i][1])
//     ellipse(pos.x, pos.y, 7, 7);
//   }
// }
function drawPoint(p){

  trips[p].next();

  noStroke();
  fill(0,0,0);
  ellipse(trips[p].position.x, trips[p].position.y, 5, 5);

  trips[p].update();
  trips[p].save(p);
}
function drawPath(v, i){
  stroke(255,0,0, 40);
  strokeWeight(trips[i].flow);

  noFill();
  beginShape();
  v.forEach(function(e) {
    var pos = e;
    if(e.latitude != null & e.longitude != null){
      pos = myMap.latLngToPixel(e.latitude, e.longitude);
    }
    vertex(pos.x, pos.y);
  })
  endShape();
}
function drawTrips(){
  clear();
  visited.forEach(function(v, i){
    if( v.length > 0) drawPath(v, i);
  })

  // Everything that needs to be redrawn goes here
  if(toDraw.length>0){
    console.log(toDraw);
  }
  toDraw.forEach(function(p){
    drawPoint(p);
  })
  drawStations();
  text(t,600,600);
  // text(frameCount, width / 2, height / 2);
}
