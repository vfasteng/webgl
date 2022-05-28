{

    node('createShaderByName',async function(gl,name){

      const load=node('load')

        const vertCode = await load("/wp-includes/shaders"+"/"+name+".vert")
        const fragCode = await load("/wp-includes/shaders"+"/"+name+".frag")

      return node('createShaderFromSource')(gl,vertCode,fragCode)

    })

    node('createShader',function(gl,shaderCode,shaderType){

      const shader=gl.createShader(shaderType);
      gl.shaderSource(shader, shaderCode);
      gl.compileShader(shader);

      if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('shaderCode',shaderCode)
        console.log(gl.getShaderInfoLog(shader));
      }

      return shader

    })


    node('createShaderFromSource',async function(gl,vertCode,fragCode){

      const vertShader = await node('createShader')(gl,vertCode,gl.VERTEX_SHADER)
      const fragShader = await node('createShader')(gl,fragCode,gl.FRAGMENT_SHADER)

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);

      if (! gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log(gl.getProgramInfoLog(shaderProgram));
      }

      return shaderProgram

    })

}
