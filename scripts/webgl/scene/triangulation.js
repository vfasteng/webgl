{



    node('TriangulationScene',async function(engine){



        //const engine=await node('engine')()
        const gl=engine.gl



        

        const points=[]
        for(let i=0;i<20;i++){
            points.push({point:[Math.random(),Math.random(),0]})
        }


        //const trianglesCount=(points.length/3)-2

        console.log('points',points)

        /*let len=1000000;
        let pointSh
        for(const point of points){
            const leng=vec3.long(point.point);
            point.length=leng;
            if(leng<len){
                len=leng;
                pointSh=point
            }
        }*/
        const triangles=[];

        function pairTriangle(point1){
            let triagles=[];

            for(const point of points){
                const sub=vec3.subtract([],point.point,point1.point);
                point.len=vec3.long(sub);
            }
            let len=100000
            let point2
            let point3
            let point4
            for(const point of points){
                if(point!==point1){
                    if(len>point.len){
                        len=point.len;
                        point4=point3;
                        point3=point2;
                        point2=point;
                    }
                }
            }

            if(point1&&point2&&point3){
                triagles.push([point1,point2,point3])
            }
            if(point2&&point4&&point3){
                triagles.push([point2,point4,point3])
            }


            return triagles;
        }
        
        for(const point of points){
            const triang=pairTriangle(point)
            if(triang.length){
                triangles.push(...triang);
            }
        }
        //var toProcess = earcut.flatten(positions);
        //var result = earcut(toProcess.vertices, toProcess.holes, toProcess.dimensions);
        const positions=[]
        for(const trian of triangles){
            positions.push(...trian)
        }
        //const indices = earcut(positions,null,2);//earcut(positions,[4]);
        //console.log('indices',indices)
        //const positions=[]
        //for(const p of poly){
        //    positions.push(...triangles[p])
        //}
        //const indices=poly

        const shaderProgram=await node('createShaderByName')(gl,"default")
    
        {

            //const positions=[]
            //points.map(pos=>positions.push(...pos.point))

            let geometry={positions}
            
            geometry=node('fixGeometry')(geometry)

            //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")

            

            const mesh=node('createMeshFromGeometry')(engine, geometry, shaderProgram)

            mesh.mode=gl.POINTS;

            //engine.models.push(mesh)
        }



        {
            const tpositions=[]
            triangles.map(triangle=>triangle.map(pos=>tpositions.push(...pos.point)))

            let tgeometry={positions:tpositions}
            
            tgeometry=node('fixGeometry')(tgeometry)

            //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")

            

            const tmesh=node('createMeshFromGeometry')(gl, tgeometry, shaderProgram)

            //tmesh.mode=gl.LINES;

            engine.models.push(tmesh)
        }
















        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}
