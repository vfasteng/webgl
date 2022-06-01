node('ceratePrinter',async function(engine,left,right,top,bottom){
        
        const gl=engine.gl

        const shaderProgram=await node('createShaderByName')(gl,"render2d")

        let geometry=await node('load')("/models/box.json","json")
        
        geometry=node('fixGeometry')(geometry)

        //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")

        

        const mesh=node('createMeshFromGeometry')(gl, geometry, shaderProgram)

        mesh.source.scale=[0.8,0.8,0.8]


        //engine.models.push(mesh)
        
        const uniforms={}

        const printer={
            uniforms,
            render(gl,uniforms){
                //Object.assign(uniforms,this.uniforms)
                mesh.render(gl,uniforms)
            }
        }

        engine.models.push(printer)

        return printer
})