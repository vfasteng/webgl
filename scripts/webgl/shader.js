{

    node('createShaderByName',async function(gl,name){

      const shader={
        name,
      }

      const load=node('load')

      let path="/shaders"//-min"
      //try{
      //  if(DEBUG!==undefined){
      //    path="/shaders"
      //  }
      //}catch(e){}

      const vertCode = await load(path+"/"+name+".vert")
      const fragCode = await load(path+"/"+name+".frag")

      shader.program = await node('createShaderFromSource')(gl,vertCode,fragCode,name)

      return shader

    })

    node('createShader',function(gl,shaderCode,shaderType,name){

      const shader=gl.createShader(shaderType);
      gl.shaderSource(shader, shaderCode);
      gl.compileShader(shader);

      if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        //console.log('shaderCode',shaderCode)
        console.log('shader: ',name,'; ',gl.getShaderInfoLog(shader));
      }

      return shader

    })


    node('createShaderFromSource',async function(gl,vertCode,fragCode,name){

      const vertShader = await node('createShader')(gl,vertCode,gl.VERTEX_SHADER,name)
      const fragShader = await node('createShader')(gl,fragCode,gl.FRAGMENT_SHADER,name)

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);

      if (! gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('shader: ',name,'; ',gl.getProgramInfoLog(shaderProgram));
      }

      return shaderProgram

    })

}
