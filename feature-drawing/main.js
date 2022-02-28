import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import Modify from 'ol/interaction/Modify';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import FeatureController from './services/FeatureService';
import FeatureService from './services/FeatureService';

const featureService = new FeatureService();

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
}); 


var homeButton=document.createElement("button")
homeButton.innerHTML='<img src="Graphicloads-100-Flat-Home.ico",alt="image" width:"100" height="50" >'
    homeButton.className="myButton"
    var homeElement=document.createElement("div")
    homeElement.className="homeButtonDiv"
    homeElement.appendChild(homeButton)
    var homeControl=new ol.control.Control({
        element:homeElement
    })
    homeButton.addEventListener("click",()=>{
        location.href="index.html"
    })
    map.addControl(homeControl)
    const vectorSource = new VectorSource();
    const vector=new VectorLayer({
      source:vectorSource
    })
    var note = new ol.control.Notification();
    map.addControl(note)

    // Add the editbar
    var select = new ol.interaction.Select({ title: 'Sélection'});
    select.set('title', 'Sélection');
    var edit = new ol.control.EditBar({
      // Translate interaction title / label 
      interactions: { 
        // Use our own interaction > set the title inside
        Select: select,
        // Define button title
        DrawLine: 'Ligne',
        // Drawregular with label
        DrawRegular: { title: 'Forme régullière', ptsLabel: 'pts', circleLabel: 'cercle' }
      },
      source: vectorSource
    });
    map.addControl(edit);

    // Add a tooltip
    var tooltip = new ol.Overlay.Tooltip();
    map.addOverlay(tooltip);

    edit.getInteraction('Select').on('select', function(e){
      if (this.getFeatures().getLength()) {
        tooltip.setInfo('Drag points on features to edit...');
      }
      else tooltip.setInfo();
    });
    edit.getInteraction('Select').on('change:active', function(e){
      tooltip.setInfo('');
    });
    edit.getInteraction('ModifySelect').on('modifystart', function(e){
      if (e.features.length===1) tooltip.setFeature(e.features[0]);
    });
    edit.getInteraction('ModifySelect').on('modifyend', function(e){
      tooltip.setFeature();
    });
    edit.getInteraction('DrawPoint').on('change:active', function(e){
      tooltip.setInfo(e.oldValue ? '' : 'Click map to place a point...');
    });
    edit.getInteraction('DrawLine').on(['change:active','drawend'], function(e){
      tooltip.setFeature();
      tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing line...');
    });
    edit.getInteraction('DrawLine').on('drawstart', function(e){
      tooltip.setFeature(e.feature);
      tooltip.setInfo('Click to continue drawing line...');
    });
    edit.getInteraction('DrawPolygon').on('drawstart', function(e){
      tooltip.setFeature(e.feature);
      tooltip.setInfo('Click to continue drawing shape...');
    });
    edit.getInteraction('DrawPolygon').on(['change:active','drawend'], function(e){
      tooltip.setFeature();
      tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...');
   
      var draw = new Draw({
        source: vectorSource,
        type: 'Polygon'
      });
      const modify = new Modify({
        source:vectorSource
      });
      
      map.addInteraction(draw);
      map.addInteraction(modify);
      modify.on("modifyend",e=>{
        const modifiedfeature=e.features.getArray()[0];
        featureService.updateFeature(modifiedfeature);
      })
      
      vectorSource.on("addfeature",e=>{
        featureService.saveFeature(e.feature);
      })
    });
    edit.getInteraction('DrawHole').on('drawstart', function(e){
      tooltip.setFeature(e.feature);
      tooltip.setInfo('Click to continue drawing hole...');
    });
    edit.getInteraction('DrawHole').on(['change:active','drawend'], function(e){
      tooltip.setFeature();
      tooltip.setInfo(e.oldValue ? '' : 'Click polygon to start drawing hole...');
    });
    edit.getInteraction('DrawRegular').on('drawstart', function(e){
      tooltip.setFeature(e.feature);
      tooltip.setInfo('Move and click map to finish drawing...');
    });
    edit.getInteraction('DrawRegular').on(['change:active','drawend'], function(e){
      tooltip.setFeature();
      tooltip.setInfo(e.oldValue ? '' : 'Click map to start drawing shape...');
    });


    edit.on('info', function(e){
      console.log(e)
      note.show('<i class="fa fa-info-circle"></i> '+e.features.getLength()+' feature(s) selected');
    });
   
window.addEventListener("load",async (e)=>{
 const savedFeatures = await featureService.getFeatures();
 console.log(savedFeatures)
 savedFeatures.forEach(f=>{
   const feature = new Feature({
     geometry:new Polygon(f.geometry.coordinates),
     type:f.type,
     _id:f._id
   })
   vectorSource.addFeature(feature);
   
 })
 
})
map.addLayer(vector);




