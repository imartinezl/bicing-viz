

function drawStations(){
  noStroke();
  fill(255,128,0);
  for(var i = 0; i < stationsCoor.length; i++){
    var pos = myMap.latLngToPixel(stationsCoor[i][0], stationsCoor[i][1])
    ellipse(pos.x, pos.y, 7, 7);
  }
}


let startT, stopT, startTMin, stopTMax;
function getStartStop(data, g, f){
  startT = stopT = [];
  startTMin = stopTMax = null;
  for (var i = 0; i < data.length; i++) {
    o_idx = data[i].origin_idx;
    o_idx = floor(o_idx*g/f);
    if (startT[o_idx] == null) startT[o_idx] = [];
    startT[o_idx].push(i);
    d_idx = data[i].destination_idx;
    d_idx = floor(d_idx*g/f);
    if (stopT[d_idx] == null) stopT[d_idx] = [];
    stopT[d_idx].push(i);

    if(startTMin==null ||  o_idx < startTMin) startTMin = o_idx;
    if(stopTMax==null || d_idx > stopTMax) stopTMax = d_idx;
  }
  console.log(startTMin);
  console.log(stopTMax);
}
