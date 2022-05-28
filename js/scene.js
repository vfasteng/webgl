{

    node('setupScene',function(gl){

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(0.5, 0.5, 0.5, 0.9);
        gl.clearDepth(1.0);

    })

    node('clearScene',function(gl){

        gl.viewport(0.0, 0.0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    })


    node('assignSource',function(target){

        const mat4=node('mat4')
        const vec3=node('vec3')

        return Object.assign(target,{

            source:{
                translation:vec3.create(),
                rotation:vec3.create(),
                scale:vec3.create(1.0),
            },
            matrix(){
                const matrix=mat4.create()
                mat4.translate(matrix, matrix, this.source.translation);
                mat4.rotate(matrix, matrix, this.source.rotation[2], [0,0,1]);
                mat4.rotate(matrix, matrix, this.source.rotation[1], [0,1,0]);
                mat4.rotate(matrix, matrix, this.source.rotation[0], [1,0,0]);
                mat4.scale(matrix, matrix, this.source.scale);
                return matrix
            }

        })


    })


}