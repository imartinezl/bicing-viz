# Barcelona Bike Trips Visualization

Visualization of the trips carried out with the public system of electric bicycles of the city of Barcelona. 

<p align="center">
  <img src="docs/demo_video.gif"/>
</p>

This repo is based on the data generated on the [imartinezl/bicing-analysis](https://github.com/imartinezl/bicing-analysis) repo, which estimates bicycle trips based on the state of each station over time. As a first version of the visualization, this project explores the limits of canvas-based libraries, such as [p5.js](https://p5js.org/) and [mappa.js](https://mappa.js.org/).


### Setup

First, check that you have node and npm installed
```
node --version
npm --version
```
Then add gulp globally on your system
```
npm install --global gulp-cli
```
Finally, download all the required node modules
```
cd bicing-viz
npm install
```

### Run
The default *gulp* task will compute these commands:

- *copy*: copy all the required files from the src folder to the distribution folder: **html, css, js, json**
- *sass*: compile the **sass** into **css**
- *inject*: inject **css** and **js** files into the **index.html** head and body
- *serve*: serve the development web server
- *watch*: watch for changes and hot reload

To run the default gulp task, just:
```
cd bicing-viz
gulp
```
If you prefer to run one specific task, just add the name of the task to the *gulp* command:
```
cd bicing-viz
gulp serve
```

### Built with

- [p5.js](https://p5js.org/)
- [mappa.js](https://mappa.js.org/)
- [gulp.js](https://gulpjs.com/)



