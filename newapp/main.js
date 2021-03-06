import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import FeatureService from './services/FeatureService';
import AmplifierService from './services/AmplifierService';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon'
import Feature from 'ol/Feature';
import {
  Select,
  Translate,
  defaults as defaultInteractions,
} from 'ol/interaction';
import {Draw, Modify, Snap} from 'ol/interaction';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import LineService from './services/LineService';

const featureService = new FeatureService();
const amplifierService = new AmplifierService();
const lineService=new LineService()
//map creation
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    projection: "EPSG:4326",
    center: [0, 0],
    zoom: 2
  })
});
// vector layers
const source = new VectorSource();
const vector = new VectorLayer({
  source: source,
});
map.addLayer(vector)
const amplifierSource = new VectorSource();
const amplifierLayer = new VectorLayer({
  source:amplifierSource
})
map.addLayer(amplifierLayer)
const linesource = new VectorSource();
const lineLayer = new VectorLayer({
  source:linesource
})
map.addLayer(lineLayer)

//icon style
const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 25],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: './icons/icon.png',
  }),
});

//featureSelect
const featureSelect = new Select({
  source:source
})
map.addInteraction(featureSelect);

//functions
let draw,drawline,drawpoint,boxDraw,translate;
function init(){
  map.removeInteraction(draw)
  map.removeInteraction(drawline)
  map.removeInteraction(drawpoint)
  map.removeInteraction(boxDraw)
  map.removeInteraction(translate)
}
function translateInteraction(){
  translate= new Translate({
    features: featureSelect.getFeatures(),
  });
  map.addInteraction(translate)
}
function addInteractions(shape){
  draw= new Draw({
    source:source,
    type:shape
  })
  map.addInteraction(draw);
}
function addInteractions2(shape){
drawpoint= new Draw({
  type:shape,
    source:amplifierSource,
 
  })
map.addInteraction(drawpoint);
}
function addInteract(shape){
  drawline= new Draw({
    source:linesource,
    type:shape
  })
  map.addInteraction(drawline);
}
function boxInteraction(){
 boxDraw = new Draw({
    type:'Polygon',
    source:amplifierSource
    })
    
    map.addInteraction(boxDraw);
}
function setDrawInteration(shape){
  switch(shape){
    case "Point":{
      addInteractions2('Point')
    }
    break;
    case "Polygon":{
      addInteractions('Polygon')
      
  }
  case"LineString":{
    addInteract('LineString')
  }
    break;
  }
}
var clicked=false;
//home control --refresh page
var homeControl = new ol.control.Control({
  element: document.getElementById("btn-group1")
})
document.getElementById("myButton").addEventListener("click",()=>{
  location.href = "index.html"
})
map.addControl(homeControl)
//line control
var LineControl = new ol.control.Control({
  element:document.getElementById("btn-group2")
})
 document.getElementById("myLineButton").addEventListener("click",()=>{

init()
setDrawInteration('LineString')
      
const modify = new Modify({
          source:linesource
});
map.addInteraction(modify);
modify.on("modifyend",e=>{
          const modifiedfeature=e.features.getArray()[0];
           lineService.updateLine(modifiedfeature);
        })
        
        linesource.on("addfeature",e=>{
          const featureType = e.feature.getGeometry().getType().toUpperCase()
          lineService.saveLine(e.feature);
          
        })
    })
map.addControl(LineControl)
//polygon control 
var PolygonControl = new ol.control.Control({
  element: document.getElementById("btn-group3")
})

document.getElementById("myPolyButton").addEventListener("click", () => {
init()
  setDrawInteration('Polygon')
 const modify=new Modify({
  source:source
})

 modify.on("modifyend", e => {
   const modifiedfeature = e.features.getArray()[0];
   featureService.updateFeature(modifiedfeature);
 })

 source.on("addfeature", e => {
   const featureType = e.feature.getGeometry().getType().toUpperCase()
   featureService.saveFeature(e.feature);

 }) 
 map.addInteraction(modify);
})

map.addControl(PolygonControl)


//translate  
var translateControl = new ol.control.Control({
    element: document.getElementById("btn-group4")
  })
document.getElementById("mytranslateButton").addEventListener("click", () => {
init()
  translateInteraction()
  })
  map.addControl(translateControl)
  //boxselect
  var BoxSelectControl = new ol.control.Control({
    element:document.getElementById("btn-group5")
  })
  document.getElementById("myBoxSelectButton").addEventListener("click", () => {
init()
setDrawInteration('Point')

  const ampmodify = new Modify({
    source:amplifierSource
  });
  map.addInteraction(ampmodify);


  ampmodify.on("modifyend",e=>{
    const modifiedfeature=e.features.getArray()[0];
    amplifierService.updateAmplifier(modifiedfeature)
  })
  
 
  amplifierSource.on("addfeature",e=>{ 
    e.feature.setStyle(iconStyle)
    const featureType = e.feature.getGeometry().getType().toUpperCase()
    amplifierService.saveAmplifier(e.feature)
      })
})
map.addControl(BoxSelectControl)
//view
var PointViewControl = new ol.control.Control({
  element: document.getElementById("btn-group6")
})
document.getElementById("myPointViewButton").addEventListener("click", () => {
if(!clicked){
  clicked=true;
init()
boxInteraction()

boxDraw.on("drawend",async(evt)=>{
  
const amps=await amplifierService.getAmplifiersByFence(evt.feature)

amps.forEach(f=>{
  console.log(f);
  const feature = new Feature({
    geometry:new Point(f.geometry.coordinates),
    type:f.type,
    _id:f._id
  })
  feature.setStyle(iconStyle)
  amplifierSource.addFeature(feature);
})

})
}else{
  clicked=false
}
})
map.addControl(PointViewControl)
 //select the shape drawn
 featureSelect.on("select",async (e)=>{
  if(e.selected[0].getProperties()._id){
    const amplifiers = await amplifierService.getAmplifiersByFence(e.selected[0])
    amplifierSource.clear();
    amplifiers.forEach(a=>{
      const amplifier = new Feature({
        geometry:new Point(a.geometry.coordinates),
        type:a.type,
        _id:a._id
      })
      amplifier.setStyle(new Style(null))
      amplifierSource.addFeature(amplifier);
    })
  }        
})   
window.addEventListener("load", async (e) => {
init()
  const savedFeatures = await featureService.getFeatures();
  console.log(savedFeatures)
  savedFeatures.forEach(f => {
    const feature = new Feature({
      geometry: new Polygon(f.geometry.coordinates),
      type: f.type,
      _id: f._id
    })
    source.addFeature(feature);
  })
    const savedAmplifiers = await amplifierService.getAmplifiers();
    console.log(savedAmplifiers)
    savedAmplifiers.forEach(a=>{
      const amplifier = new Feature({
        geometry:new Point(a.geometry.coordinates),
        type:a.type,
        _id:a._id
        
      })
      amplifier.setStyle(new Style(null))
      amplifierSource.addFeature(amplifier);
    })
    //line 
    const savedlines = await lineService.getLines();
    console.log(savedlines)
    savedlines.forEach(f => {
      const line = new Feature({
        geometry: new LineString(f.geometry.coordinates),
        type: f.type,
        _id: f._id
      })
      source.addFeature(line);
    })
   

  })
