{



    node('Render2DScene',async function(){



        const engine=await node('engine')()
        const gl=engine.gl



        
        //engine.camera.source.translation = vec3.create()


        const shaderProgram=await node('createShaderByName')(gl,"render2d")

        let geometry=await node('load')("/models/quad.json","json")
        
        geometry=node('fixGeometry')(geometry)

        //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")
        const diffuseTexture=node('loadTexture')(gl,"/images/box.webp")
        

        const mesh=node('createMeshFromGeometry')(gl, geometry, shaderProgram)

        mesh.source.scale=[0.8,0.8,0.8]

        mesh.uniforms.colorTexture=diffuseTexture


        engine.models.push(mesh)
















        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}
