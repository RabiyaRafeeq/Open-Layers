import GeoJSON from 'ol/format/GeoJSON';
import AmpliferModel from "../model/Amplifier";


class AmplifierService{
    amplifierModel = new AmpliferModel();
    async saveAmplifier(feature){
        if(!feature.values_._id){//try getters
            let writer = new GeoJSON();
            let data = writer.writeFeatureObject(feature)
            data.type = 'amplifier';
            console.log(data);
            const res=await this.amplifierModel.saveFeature(data);
            feature.values_._id=res._id
          }
    }

    getAmplifiers(){
        const amplifiers = this.amplifierModel.getFeatures()
        return amplifiers;
    }

    getAmplifiersByFence=(fence)=>{
        const geom = {
          type:'Polygon',
          coordinates:fence.getGeometry().getCoordinates()
        }
        const amplifiers = this.amplifierModel.getByFence(geom);
        return amplifiers;
      }

    updateAmplifier(feature){
        const id=feature.values_._id
        const geom={geometry:{
            type:"Point",
            coordinates:feature.getGeometry().getCoordinates()
        }}
        this.amplifierModel.putFeature(id,geom);
    }
}

export default AmplifierService;