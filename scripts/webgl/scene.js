{

    node('setupScene',function(gl){

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clearDepth(10.0);

    })

    node('clearSceneAndSetBuffer',function(gl,buffer){

        const pointer=buffer ? buffer.framebuffer:null;
        gl.bindFramebuffer(gl.FRAMEBUFFER, pointer);

        const clearColor=(buffer && buffer.clearColor) ? buffer.clearColor:[0.0, 0.0, 0.0, 0.0];
        gl.clearColor(...clearColor);

        if(buffer){
            gl.viewport(0.0, 0.0, buffer.width, buffer.height);
        }else{
            gl.viewport(0.0, 0.0, gl.canvas.width, gl.canvas.height);
        }
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    })


    node('assignSource',function(target){

        const mat4=node('mat4')
        const vec3=node('vec3')

        return Object.assign(target,{

            source: target.source??node('TRS')(),
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


    node('assignScene',function(target){

        node('assign')(target,{

            children:[],

            render(...args){

                if(this.children){
                    for(const child of this.children){
                        child.render(...args)
                    }
                }

                if(this.draw){
                    this.draw(...args)
                }

            },

            updateWorldMatrix(parentWorldMatrix=mat4.create()) {
              
                this.worldMatrix=this.matrix();
          
                mat4.multiply(this.worldMatrix, parentWorldMatrix, this.worldMatrix);
          
                for (const child of this.children) {
                    child.updateWorldMatrix(this.worldMatrix);
                }
            },

        })

    })


    node('TRS',function( translation =[0,0,0], rotation=[0,0,0], scale=[1,1,1]){
        return { translation , rotation, scale}
    })


    node('Scene',function(source=node('TRS'),name='scene name'){
        const scene={name,source,
            add(scene){
                this.children.push(scene)
            }
        }
        node('assignSource')(scene)
        node('assignScene')(scene)
        return scene
    })


}