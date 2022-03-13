import GeoJSON from 'ol/format/GeoJSON';
import LineModel from "../model/Line";

class LineService{
    lineModel = new LineModel();
    async saveLine(feature){
        if(!feature.values_._id){
            let writer = new GeoJSON();
            let data = writer.writeFeatureObject(feature)
            const res=await this.lineModel.saveLine(data);
            feature.values_._id=res._id
          }
    }

    getLines(){
        const features = this.lineModel.getLines();
        return features;
    }

    updateLine(feature){
        const id=feature.values_._id
        const geom={
            geometry:{
            type:"LineString",
            coordinates:feature.getGeometry().getCoordinates()
        }}
        this.lineModel.putLine(id,geom);
    }
}

export default LineService;