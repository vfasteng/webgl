{



    node('TriangulationScene',async function(){



        const engine=await node('engine')()
        const gl=engine.gl



        

        const positions=[]
        for(let i=0;i<4;i++){
            positions.push(...[Math.random(),Math.random(),0])
        }


        const trianglesCount=(positions.length/3)-2

        console.log('trianglesCount',trianglesCount)

        const indices=[]
        indices.push(0,1,2, 1,3,2)



        const shaderProgram=await node('createShaderByName')(gl,"default")

        let geometry={positions,indices}
        
        geometry=node('fixGeometry')(geometry)

        //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")

        

        const mesh=node('createMeshFromGeometry')(gl, geometry, shaderProgram)



        engine.models.push(mesh)
















        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}
