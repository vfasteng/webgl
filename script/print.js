node('ceratePrinter',async function(engine,left,right,top,bottom){
        
        const gl=engine.gl

        let geometry={
            "positions":[
                top,left,0.0,
                top,right,0.0,
                bottom,right,0.0,
                bottom,left,0.0 
         ],
         "indices": [3,2,1,3,1,0],
         "texcoords":[
             0,1,
             0,0,
             1,0,
             1,1
         ]
        }

        geometry=node('fixGeometry')(geometry)

        const shaderProgram=await node('createShaderByName')(gl,"print2d")

        const mesh=node('createMeshFromGeometry')(gl, geometry, shaderProgram)

        //mesh.source.scale=[0.8,0.8,0.8]

        engine.models.push(mesh)


        const uniforms={}

        return {
            uniforms,
            render(gl,uniforms){
                //Object.assign(uniforms,this.uniforms)
                mesh.render(gl,uniforms)
            }
        }
})