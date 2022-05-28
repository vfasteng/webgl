{

    

    node('createCamera',function(gl){

      const mat4=node('mat4')
    const vec3=node('vec3')

        const camera={
            fov: 5*9,
            aspect: gl.canvas.width / gl.canvas.height,
            near: 1/1000,
            far: 1000,

            projection(){
              return mat4.perspective([], this.fov, this.aspect, this.near, this.far)
            }
          }
        

        node('assignSource')(camera)

        return camera


    })


}