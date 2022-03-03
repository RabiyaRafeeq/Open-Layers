class Amplifier{
    async saveFeature(data){
        const res= await fetch('http://127.0.0.1:8001/api/uploadAmplifer', {
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
        const res =  await fetch('http://127.0.0.1:8001/api/uploadAmplifer');
        const features = await res.json();
        return features;
    }

    async putFeature(featureId,data){
        const res= await fetch(`http://127.0.0.1:8001/api/uploadAmplifer/${featureId}`, {
            method: 'PUT', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })  

        const feature = await res.json();
        return feature;
        
    }

    async getByFence(geom){
        const res= await fetch('http://127.0.0.1:8001/api/uploadAmplifer/byFence', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(geom),
        })      
        const feature = await res.json();
        console.log(feature);
        return feature;
    }
    

}

export default Amplifier;