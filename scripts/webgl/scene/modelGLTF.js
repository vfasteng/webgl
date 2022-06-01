{



    node('GLTFScene',async function(engine){



        //const engine=await node('engine')()
        //const gl=engine.gl





        

        await node('loadGLTF')(engine,'/models/stickman/scene.gltf')





    })



}
