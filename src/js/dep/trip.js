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
