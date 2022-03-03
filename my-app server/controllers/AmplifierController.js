const Amplifier = require('../model/Amplifier');

exports.postData = async (req,res,next)=>{
    const amplifier = await Amplifier.create(req.body);
    res.status(200).json(amplifier);
}

exports.getData = async (req,res,next)=>{
    const amplifiers = await Amplifier.find();
    res.status(200).json(amplifiers);
}

exports.updateData=async (req,res,next)=>{
    const _id = req.id
    const data = req.body
    const amplifier = await Amplifier.findByIdAndUpdate(req.params.id,req.body)
    return res.status(200).json({"status":"success"})
}

exports.getByFence=async(req,res,next)=>{
    console.log(res.body);
    const amplifiers = await Amplifier.find({geometry:{$geoIntersects:{$geometry:req.body}}}).exec();
    console.log(amplifiers.length);
    return res.status(200).json(amplifiers);
}