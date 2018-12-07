let trips = [];
function addTrips(data){
  trips = [];
  for (var i = 0; i < data.length; i++) {
    trips.push(new Trip(data[i]));
  }
}
function getToDraw(t){
  if (startT[t/f] != null) {
    // console.log("START: ",startT[t/f]);
    startT[t/f].forEach(function(p){
      toDraw.push(p);
      if (visited[p] == null) visited[p] = [];
      if(!tooFast) trips[p].saveFirst(p);
    })
  }
  if (stopT[t/f] != null) {
    // console.log("STOP: ",stopT[t/f]);
    stopT[t/f].forEach(function(p){
      toDraw.splice( toDraw.indexOf(p), 1 );
      if(tooFast || tSliderPulsed>0){
        trips[p].saveAll(p);
      }else{
        trips[p].saveLast(p);
      }
    })
  }
}
function getStationsCoor(data){
  for (var s in data) {
    stationsCoor.push([data[s].latitude, data[s].longitude])
  }
}

let startT, stopT, startTMin, stopTMax;
function getStartStop(data, g, f){
  startT = [];
  stopT = [];
  startTMin = null;
  stopTMax = null;
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
  // console.log(startTMin);
  // console.log(stopTMax);
}
