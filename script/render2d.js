{



    node('Render2D',async function(engine){



        //const engine=await node('engine')()
        const gl=engine.gl



        
        //engine.camera.source.translation = vec3.create()


        const shaderProgram=await node('createShaderByName')(gl,"render2d")

        let geometry=await node('load')("/models/quad.json","json")
        
        geometry=node('fixGeometry')(geometry)

        //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")
        //const diffuseTexture=node('loadTexture')(gl,"/images/box.webp")
        

        const mesh=node('createMeshFromGeometry')(gl, geometry, shaderProgram)

        mesh.source.scale=[0.8,0.8,0.8]

        const uniforms={
            //colorTexture:diffuseTexture,
        }


        const render={
            uniforms,
            render(gl,uniforms){
                //Object.assign(uniforms,this.uniforms)
                mesh.uniforms=this.uniforms;
                mesh.render(gl,uniforms)
            }
        }

        //mesh.uniforms.colorTexture=colorTexture


        //engine.models.push(render)



        return render












        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}
