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

const featureService = new FeatureService();
const amplifierService = new AmplifierService();
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    projection: 'EPSG:4326',
    center: [0, 0],
    zoom: 2
  })
});
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
const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 25],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: './icons/icon.png',
  }),
});
const featureSelect = new Select({
  source:source
})
map.addInteraction(featureSelect);
//home control --refresh page
var homeControl = new ol.control.Control({
  element: document.getElementById("btn-group")
})
document.getElementById("myButton").addEventListener("click",()=>{
  location.href = "index.html"
})
map.addControl(homeControl)
//polygon control 
var PolygonControl = new ol.control.Control({
  element: document.getElementById("btn-group")
})

document.getElementById("myPolyButton").addEventListener("click", (evt) => {
  const draw = new Draw({
    source:source,
    type:'Polygon',
   
  });
  map.addInteraction(draw);
   const modify=new Modify({
     source:source
   })
    map.addInteraction(modify);

    modify.on("modifyend", e => {
      const modifiedfeature = e.features.getArray()[0];
      featureService.updateFeature(modifiedfeature);
    })

    source.on("addfeature", e => {
      const featureType = e.feature.getGeometry().getType().toUpperCase()
      featureService.saveFeature(e.feature);

    }) 
    
})

map.addControl(PolygonControl)
//translate  
var translateControl = new ol.control.Control({
    element: document.getElementById("btn-group")
  })
document.getElementById("mytranslateButton").addEventListener("click", () => {
    const translate = new Translate({
      features: featureSelect.getFeatures(),
    });
    map.addInteraction(featureSelect)
    map.addInteraction(translate)
  })
  map.addControl(translateControl)
  //boxselect
  var BoxSelectControl = new ol.control.Control({
    element:document.getElementById("btn-group")
  })
  document.getElementById("myBoxSelectButton").addEventListener("click", () => {
   const draw = new Draw({
    type:"Point",
      source:amplifierSource,
   
    })
  map.addInteraction(draw);
 
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
  element: document.getElementById("btn-group")
})
document.getElementById("myPointViewButton").addEventListener("click", () => {
  addInteraction()
  function addInteraction(){
const boxDraw = new Draw({
type:'Polygon',
source:amplifierSource
})

map.addInteraction(boxDraw);

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
  }
})
map.addControl(PointViewControl)

window.addEventListener("load", async (e) => {
  
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
amplifier.setStyle(iconStyle)
      amplifierSource.addFeature(amplifier);
    })
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
          amplifier.setStyle(iconStyle)
          amplifierSource.addFeature(amplifier);
        })
      }        
    })   

  })
     
  map.addLayer(vector)
  map.addLayer(amplifierLayer);
