const request=require('request');

const forecast=(data,callback)=>{
        const lat=data.lat;
        const long=data.long;
        const place=data.place;

        const weatherAPIurl=`http://api.weatherstack.com/current?access_key=7e3dcdc44ba0708382c01a2d9ba79c89&query=${lat},${long}`
            
        request({url:weatherAPIurl,json:true},(error,response,body)=>{
            if(error){
                callback("Can't connect to weather API",undefined)
            } else{
                callback(undefined,body.current.temperature,body.current.weather_descriptions.humidity)    
            }
        })

}

module.exports={
    forecast:forecast
}