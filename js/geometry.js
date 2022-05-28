{


        node('fixGeometry',function(geometry){
            

            const result={}

            const names=["positions", "normals", "texcoords", "indices"]


            if(geometry[names[0]]){
                result.positions=geometry[names[0]]
            }
            if(geometry[names[1]]){
                result.normals=geometry[names[1]]
            }
            if(geometry[names[2]]){
                result.texcoords=geometry[names[2]]
            }
            if(geometry[names[3]]){
                result.indices=geometry[names[3]]
            }



            for(const key of Object.keys(geometry)){
                if(! names.includes(key)){
                    result[key]=geometry[key]
                }
            }

            return result


        })



}