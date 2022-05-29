{



    node('CubesScene',async function(){



        const engine=await node('engine')()
        const gl=engine.gl



        const posX=5
        function pos(){
            return (posX / 2)-Math.random()*posX
        }

        const scaleX=0.2
        function scale(){
            return (scaleX / 3)+Math.random()*scaleX
        }

        const factorX=0.072
        function factor(){
            return (factorX / 10)+Math.random()*factorX*0.13
        }




        const shaderProgram=await node('createShaderByName')(gl,"default")

        let geometry=await node('load')("/wp-includes/models/box.json","json")
        geometry=node('fixGeometry')(geometry)

        const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")

        const meshes=[]

        for(let i=0;i<20;i++){
            const mesh=node('createMeshFromGeometry')(gl, geometry, shaderProgram)
            mesh.source.translation=[pos(), pos(), pos()]
            const scaleX=scale()
            mesh.source.scale=[scaleX,scaleX,scaleX]
            mesh.source.factor=[factor(),factor(),factor()]

            mesh.uniforms={
                diffuseTexture,
            }

            //mesh.mode=gl.LINE_STRIP;

            meshes.push(mesh)
        }



            for(const mesh of meshes){

                mesh.animate=function(frameTime){

                    mesh.source.rotation=mesh.source.rotation.map((n,i)=>n+mesh.source.factor[i])

                }
            }
            //const rotation=[frameTime*0.3, frameTime*0.12, frameTime*0.45]
            //this.source.rotation=this.source.rotation.map((n,i)=>n+rotation[i])



        engine.models.push(...meshes)
















        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}
