import 'ol/ol.css';
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
    


            var LineButton=document.createElement("button")
            LineButton.innerHTML='<img src="draw-line-with-anchors-line-Icon.png",alt="image" width:"128" height="52" >'
                LineButton.className="myButton"
                var LineElement=document.createElement("div")
                LineElement.className="LineButtonDiv"
                LineElement.appendChild(LineButton)
                var LineControl=new ol.control.Control({
                    element:LineElement
                })
                LineButton.addEventListener("click",()=>{
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
                    }
                  })
                map.addControl(LineControl)



                var PolygonButton=document.createElement("button")
                PolygonButton.innerHTML='<img src="719-7197135_primary-kig-polygon-clip-arts-draw-polygon-icon.png",alt="image" width:"120" height="50" >'
                    PolygonButton.className="myButton"
                    var PolygonElement=document.createElement("div")
                    PolygonElement.className="PolygonButtonDiv"
                    PolygonElement.appendChild(PolygonButton)
                    var PolygonControl=new ol.control.Control({
                        element:PolygonElement
                    })
                    PolygonButton.addEventListener("click",()=>{
                      addInteraction();
                      function addInteraction() {
                          var draw = new Draw({
                            source: source,
                            type: 'Polygon',
                          });
                          const modify = new Modify({
                            source:source
                          });
                          
                          map.addInteraction(draw);
                          map.addInteraction(modify);
                        }
                      })
                    map.addControl(PolygonControl)

            var Button=document.createElement("button")
            Button.innerHTML='<img src="png-clipart-google-map-maker-google-maps-drawing-pin-google-search-you-are-here-angle-pin.png",alt="image" width:"45" height="29" >'
                Button.className="myButton"
                var Element=document.createElement("div")
                Element.className="ButtonDiv"
                Element.appendChild(Button)
                var Control=new ol.control.Control({
                    element:Element
                })
                Button.addEventListener("click",()=>{
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
                    }
                  })
                map.addControl(Control)
              
                
            var Button=document.createElement("button")
            Button.innerHTML='<img src="2479618.png",alt="image" width:"100" height="50" >'
                Button.className="myButton"
                var Element=document.createElement("div")
                Element.className="ButtonDiv"
                Element.appendChild(Button)
                var Control=new ol.control.Control({
                    element:Element
                })
                Button.addEventListener("click",()=>{
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
                  })
                map.addControl(Control)
      
