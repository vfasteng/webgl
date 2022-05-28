{


    function vec3(){
        return vec3.create()
      }

    node('assign')(vec3,{

        create(x,y,z) {
          if(x===undefined){
            x=0.0
          }
          if(y===undefined){
            y=x
          }
          if(z===undefined){
            z=y
          }
          return [x,y,z]
        },

    })


    node('vec3',vec3)


}