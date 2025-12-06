const testController = (req ,res)=>{
    res.status(200).send({
        message:"test welcome user",
        success:true,
    })
};


module.exports={testController}