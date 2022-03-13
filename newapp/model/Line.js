
class Line{
    async saveLine(data){
        const res= await fetch('http://127.0.0.1:8001/api/uploadLine', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })      
        const feature = await res.json();
        return feature;
    }

    async getLines(){
        const res =  await fetch('http://127.0.0.1:8001/api/uploadLine');
        const features = await res.json();
        return features;
    }

    async putLine(featureId,data){
        const res= await fetch(`http://127.0.0.1:8001/api/uploadLine/${featureId}`, {
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

export default Line;
