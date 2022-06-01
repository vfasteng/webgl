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

        long(a){
          let x = a[0];
          let y = a[1];
          let z = a[2];
          return Math.hypot(x, y, z);
        },

        add(out, a, b) {
          out[0] = a[0] + b[0];
          out[1] = a[1] + b[1];
          out[2] = a[2] + b[2];
          return out;
        },
        
        subtract(out, a, b) {
          out[0] = a[0] - b[0];
          out[1] = a[1] - b[1];
          out[2] = a[2] - b[2];
          return out;
        }

    })


    node('vec3',vec3)


}