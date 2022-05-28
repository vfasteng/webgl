
/*glarr*/

{

    node('engine',async function(canvas){

      if(canvas===undefined){
        canvas=document.createElement('canvas')
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        document.body.append(canvas)
      }
      const gl = canvas.getContext("webgl2")
      




















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
