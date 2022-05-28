
/*glarr*/

{

    node('engine',async function(){


    const canvas=document.createElement('canvas')
      canvas.width=512
      canvas.height=512
      const gl = canvas.getContext("webgl2")
      document.body.append(canvas)




















      const engine={
        gl,
        models:[],
      }








    const camera=node('createCamera')(gl)
    camera.source.translation[2] = -6

    engine.camera=camera







    node('setupScene')(gl)

    var time_old = 0;

    var animate = function(time) {


       const frameTime = (time-time_old)*0.001;




       time_old = time;


        const uniforms={
            projection: camera.projection(),
            camera: camera.matrix(),
        }


       node('clearScene')(gl)


       for(const model of engine.models){

          if(model.animate){
            model.animate(frameTime)
          }

            model.render(gl, uniforms)

       }



       requestAnimationFrame(animate);


    }
    animate(0);


    return engine

    })



}
