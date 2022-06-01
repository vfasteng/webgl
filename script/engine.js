
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
      




    //const buffer=node('createRenderBuffer')(gl,512,512)



    /*const ceratePrinter=node('ceratePrinter');

    var left=0, width=25
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    const print = await ceratePrinter(engine, 1,0.5, -x, -x+wx)*/

    /*var left=25, width=25
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    this.print2 = new Print(this, 1,0.5, -x, -x+wx)

    var left=50, width=25
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    this.print3 = new Print(this, 1,0.5, -x, -x+wx)



    var left=50, width=50
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    this.print4 = new Print(this, 0.0,-1.0, -x, -x+wx)*/


    const colorTexture=node('loadTexture')(gl,"/images/box.webp")

      const render2d=await node('Render2D')(engine,colorTexture)
      ///render2d.uniforms.colorTexture=diffuseTexture
      //engine.models.push(render2d)


    //print.uniforms.colorTexture=diffuseTexture//buffer.color




      








    const camera=node('createCamera')(gl)
    camera.source.translation[2] = -6

    engine.camera=camera



      function render(gl, uniforms, frameTime){

        for(const model of engine.models){
  
          if(model.animate){
            model.animate(frameTime)
          }
  
          model.render(gl, uniforms)
  
       }
  
      }



    node('setupScene')(gl)

    var time_old = 0;

    var animate = function(time) {


       const frameTime = (time-time_old)*0.001;




       time_old = time;


        const uniforms={
            projection: camera.projection(),
            camera: camera.matrix(),
        }


      //node('clearSceneAndSetBuffer')(gl,buffer)
      //render(gl, uniforms, frameTime)

      node('clearSceneAndSetBuffer')(gl)
      render(gl, uniforms, frameTime)
       

      //uniforms.colorTexture=diffuseTexture
      //print.render(gl,uniforms)




       requestAnimationFrame(animate);


    }
    animate(0);

    return engine

    })



}
