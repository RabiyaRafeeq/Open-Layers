
class Feature{
    async saveFeature(data){
        const res= await fetch('http://127.0.0.1:8000/api/uploadShape', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })      
        const feature = await res.json();
        return feature;
    }

    async getFeatures(){
        const res =  await fetch('http://127.0.0.1:8000/api/uploadShape');
        const features = await res.json();
        return features;
    }

    async putFeature(featureId,data){
        const res= await fetch(`http://127.0.0.1:8000/api/uploadShape/${featureId}`, {
            method: 'PUT', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })  

        const feature = await res.json();
        return feature;
        
    }
    

}

export default Feature;
