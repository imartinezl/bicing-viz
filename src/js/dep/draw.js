function drawStations(){
  noStroke();
  fill(255,128,0);
  for(var i = 0; i < stationsCoor.length; i++){
    var pos = myMap.latLngToPixel(stationsCoor[i][0], stationsCoor[i][1])
    ellipse(pos.x, pos.y, 7, 7);
  }
}
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
  text(f,700,600);
  // text(frameCount, width / 2, height / 2);
}
