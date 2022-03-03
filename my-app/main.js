import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import FeatureService from './services/FeatureService';
import AmplifierService from './services/AmplifierService';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon'
import Select from 'ol/Interaction/Select';
import Amplifier from './model/Amplifier';
import Point from 'ol/geom/Point';
const featureService = new FeatureService();
const amplifierService = new AmplifierService();

const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource();

const vector = new VectorLayer({
  source: source,
});


const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4,
  })
});

const amplifierSource = new VectorSource();
const amplifierLayer = new VectorLayer({
  source:amplifierSource
})
var toolButton = document.createElement("button")
toolButton.innerHTML = '<img src="./icons/arrow-of-double-angle-pointing-down_318-52893.webp",alt="image" width:"48" height="48" >'
toolButton.className = "mytoolButton"
var toolElement = document.createElement("div")
toolElement.className = "toolButtonDiv"
toolElement.appendChild(toolButton)
var toolControl = new ol.control.Control({
  element: toolElement
})
toolButton.addEventListener("click", () => {
  var homeButton = document.createElement("button")
  homeButton.innerHTML = '<img src="./icons/Graphicloads-100-Flat-Home.ico",alt="image" width:"100" height="50" >'
  homeButton.className = "myButton"
  var homeElement = document.createElement("div")
  homeElement.className = "homeButtonDiv"
  homeElement.appendChild(homeButton)
  var homeControl = new ol.control.Control({
    element: homeElement
  })
  homeButton.addEventListener("click", () => {
    location.href = "index.html"
  })
  map.addControl(homeControl)

  var LineButton = document.createElement("button")
  LineButton.innerHTML = '<img src="./icons/draw-line-with-anchors-line-Icon.png",alt="image" width:"120" height="50" >'
  LineButton.className = "myLineButton"
  var LineElement = document.createElement("div")
  LineElement.className = "LineButtonDiv"
  LineElement.appendChild(LineButton)
  var LineControl = new ol.control.Control({
    element: LineElement
  })
  /*   LineButton.addEventListener("click",()=>{
      addInteraction();
      function addInteraction() {
          var draw = new Draw({
            source: source,
            type: 'LineString',
          });
          const modify = new Modify({
            source:source
          });
          
          map.addInteraction(draw);
          map.addInteraction(modify);
          modify.on("modifyend",e=>{
            const modifiedfeature=e.features.getArray()[0];
            featureService.updateFeature(modifiedfeature);
          })
          
          source.on("addfeature",e=>{
            const featureType = e.feature.getGeometry().getType().toUpperCase()
            featureService.saveFeature(e.feature);
            
          })
        }
      }) */
  map.addControl(LineControl)

  var PolygonButton = document.createElement("button")
  PolygonButton.innerHTML = '<img src="./icons/719-7197135_primary-kig-polygon-clip-arts-draw-polygon-icon.png",alt="image" width:"100" height="54" >'
  PolygonButton.className = "myPolyButton"
  var PolygonElement = document.createElement("div")
  PolygonElement.className = "PolygonButtonDiv"
  PolygonElement.appendChild(PolygonButton)
  var PolygonControl = new ol.control.Control({
    element: PolygonElement
  })
  PolygonButton.addEventListener("click", () => {
    addInteraction();
    function addInteraction() {
      var draw = new Draw({
        source: source,
        type: 'Polygon',
      });
      const modify = new Modify({
        source: source
      });

      map.addInteraction(draw);
      map.addInteraction(modify);

      modify.on("modifyend", e => {
        const modifiedfeature = e.features.getArray()[0];
        featureService.updateFeature(modifiedfeature);
      })

      source.on("addfeature", e => {
        const featureType = e.feature.getGeometry().getType().toUpperCase()
        featureService.saveFeature(e.feature);

      })


    }
  })
  map.addControl(PolygonControl)

  var PointButton = document.createElement("button")
  PointButton.innerHTML = '<img src="./icons/png-clipart-google-map-maker-google-maps-drawing-pin-google-search-you-are-here-angle-pin.png",alt="image" width:"50" height="31" >'
  PointButton.className = "myPointButton"
  var PointElement = document.createElement("div")
  PointElement.className = "PointButtonDiv"
  PointElement.appendChild(PointButton)
  var PointControl = new ol.control.Control({
    element: PointElement
  })
  /*   PointButton.addEventListener("click",()=>{
      addInteraction();
      function addInteraction() {
          var draw = new Draw({
            source: source,
            type: 'Point',
          });
          const modify = new Modify({
            source:source
          });
          
          map.addInteraction(draw);
          map.addInteraction(modify);
          modify.on("modifyend",e=>{
            const modifiedfeature=e.features.getArray()[0];
            featureService.updateFeature(modifiedfeature);
          })
          
          source.on("addfeature",e=>{
            const featureType = e.feature.getGeometry().getType().toUpperCase()
            featureService.saveFeature(e.feature);
            
          })
        }
      }) */
  map.addControl(PointControl)


  var CircleButton = document.createElement("button")
  CircleButton.innerHTML = '<img src="./icons/2479618.png",alt="image" width:"100" height="54" >'
  CircleButton.className = "myCircleButton"
  var CircleElement = document.createElement("div")
  CircleElement.className = "CircleButtonDiv"
  CircleElement.appendChild(CircleButton)
  var CircleControl = new ol.control.Control({
    element: CircleElement
  })
  /*     CircleButton.addEventListener("click",()=>{
        addInteraction();
        function addInteraction() {
            var draw = new Draw({
              source: source,
              type: 'Circle',
            });
            const modify = new Modify({
              source:source
            });
            
            map.addInteraction(draw);
            map.addInteraction(modify);
      
      }
    }) */
  map.addControl(CircleControl)
  var translateButton = document.createElement("button")
  translateButton.innerHTML = '<img src="./icons/6129592.png",alt="image" width:"50" height="48" >'
  translateButton.className = "mytranslateButton"
  var translateElement = document.createElement("div")
  translateElement.className = "translateButtonDiv"
  translateElement.appendChild(translateButton)
  var translateControl = new ol.control.Control({
    element: translateElement
  })
  translateButton.addEventListener("click", () => {

  })
  map.addControl(translateControl)

  var BoxSelectButton = document.createElement("button")
  BoxSelectButton.innerHTML = '<img src="./icons/1934407.png",alt="image" width:"50" height="50" >'
  BoxSelectButton.className = "myBoxSelectButton"
  var BoxSelectElement = document.createElement("div")
  BoxSelectElement.className = "BoxSelectButtonDiv"
  BoxSelectElement.appendChild(BoxSelectButton)
  var BoxSelectControl = new ol.control.Control({
    element: BoxSelectElement
  })
  BoxSelectButton.addEventListener("click", () => {
   addInteraction()
    function addInteraction(){
   const draw = new Draw({
      source:amplifierSource,
      type:"Point"
    })
  
  
  map.addInteraction(draw);
 
  const ampmodify = new Modify({
    source:amplifierSource
  });
  map.addInteraction(ampmodify);
  const iconStyle =  new ol.style.Style({
    
    image: new ol.style.Icon({
      anchor:[.5,25],
      anchorXUnits:'fraction',
      anchorYUnits:'pixels',
      src:"./icons/icon.png",
    })
  })


  ampmodify.on("modifyend",e=>{
    const modifiedfeature=e.features.getArray()[0];
    amplifierService.updateAmplifier(modifiedfeature)
  })
  
    /*  const changeIcon = (cords)=>{
      const iconFeature = new Feature({
        geometry:new Point(cords),
          
          });
         
          iconFeature.setStyle(iconStyle);
       
          amplifierSource.changed(iconFeature);
        } */
  amplifierSource.on("addfeature",e=>{ 

  /*   const feature = e.feature;
    const cords = feature.getGeometry().getCoordinates();
    
    console.log(cords)
    feature.setStyle(iconStyle)
    changeIcon(cords);  */
    const featureType = e.feature.getGeometry().getType().toUpperCase()
    amplifierService.saveAmplifier(e.feature)
   
     
      })
  
/*     const boxDraw = new Draw({
      type:'Polygon',
      source:searchSrc
    })
    boxDraw.on("drawend",async(evt)=>{
      const amps=await ampService.getAmplifiersByFence(evt.feature)
      amps.forEach(f=>{
        console.log(f);
        const feature = new Feature({
          geometry:new Point(f.geometry.coordinates),
          type:f.type,
          _id:f._id
        })
        searchSrc.addFeature(feature);
      })
    })
    map.addInteraction(boxDraw);
map.addLayer(searchLayer); */
  }
})

      map.addControl(BoxSelectControl)
})
  map.addControl(toolControl)
  
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
 
        amplifierSource.addFeature(amplifier);
      })
    })

/* const featureSelect = new Select({
      source:source
    })
    map.addInteraction(featureSelect);
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
          amplifierSource.addFeature(amplifier);
        })
      }
        
    })  */

  const modify = new Modify({
    source: source
  });
  map.addInteraction(modify);

  modify.on("modifyend", e => {
    const modifiedfeature = e.features.getArray()[0];
    featureService.updateFeature(modifiedfeature);
  })

  map.addLayer(vector)
  map.addLayer(amplifierLayer);
