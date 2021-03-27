const request=require("request");


const geocode = (address,callback)=>{
    // we need to code the string of address if it contains any special characters
    let addr=encodeURIComponent(address);
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1IjoiY2FzcGVyMjYiLCJhIjoiY2tidjRzb2d6MDAzbTJybWppajF0a2JiNCJ9.L3zIdnRG_whNfj12-03uBg&limit=1`;

    request({url:url,json:true},(error,response,body)=>{
        if (error){
            callback("Unable to connect to location services",undefined);
        } else{
            const lat=body.features[0].center[1]
            const long=body.features[0].center[0]

            data={
                lat:lat,
                long:long,
                place:address
            }
            
            callback(undefined,data)

        }
    }
    )
}


module.exports={
    geocode:geocode
}