function node(param,value){
    if(node[param]===undefined){
      node[param]=value
      return false
    }
    return node[param]
}{

    
    /*attrs*/
    
    /*systemDefs*/
    
    node('load',async function load(uri,type){
        const promise=await fetch(uri)
        const text=await promise[type??"text"]()
        return text
    })
    
    node('F32A',function(array){
      return new Float32Array(array)
    })
    
    node('U16A',function(array){
      return new Uint16Array(array)
    })
    
    node('assign',function(target,obj){
      return Object.assign(target,obj)
    })
    

}

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


}{



    node('CubesScene',async function(){



        const Canvas=document.querySelector("#webgl-canvas");

        const engine=await node('engine')(Canvas)
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

/*glarr*/

{

    node('engine',async function(){


    const canvas=document.createElement('canvas')
      canvas.width=512
      canvas.height=512
      const gl = canvas.getContext("webgl2")
      document.body.append(canvas)




















      const engine={
        gl,
        models:[],
      }








    const camera=node('createCamera')(gl)
    camera.source.translation[2] = -6

    engine.camera=camera







    node('setupScene')(gl)

    var time_old = 0;

    var animate = function(time) {


       const frameTime = (time-time_old)*0.001;




       time_old = time;


        const uniforms={
            projection: camera.projection(),
            camera: camera.matrix(),
        }


       node('clearScene')(gl)


       for(const model of engine.models){

          if(model.animate){
            model.animate(frameTime)
          }

            model.render(gl, uniforms)

       }



       requestAnimationFrame(animate);


    }
    animate(0);


    return engine

    })



}
{


        node('fixGeometry',function(geometry){
            

            const result={}

            const names=["positions", "normals", "texcoords", "indices"]


            if(geometry[names[0]]){
                result.positions=geometry[names[0]]
            }
            if(geometry[names[1]]){
                result.normals=geometry[names[1]]
            }
            if(geometry[names[2]]){
                result.texcoords=geometry[names[2]]
            }
            if(geometry[names[3]]){
                result.indices=geometry[names[3]]
            }



            for(const key of Object.keys(geometry)){
                if(! names.includes(key)){
                    result[key]=geometry[key]
                }
            }

            return result


        })



}{

  const EPSILON = 0.000001;
  const Infinity =  1/ EPSILON;

    function mat4(){
      return mat4.create()
    }



    node('assign')(mat4,{

      create() {
        return [1,0,0,0,
          0,1,0,0,
          0,0,1,0,
          0,0,0,1]
      },
      
      clone(a) {
        let out = [];
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      },

      translate(out, a, v) {
        let x = v[0],
          y = v[1],
          z = v[2];
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;
      
        if (a === out) {
          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
          a00 = a[0];
          a01 = a[1];
          a02 = a[2];
          a03 = a[3];
          a10 = a[4];
          a11 = a[5];
          a12 = a[6];
          a13 = a[7];
          a20 = a[8];
          a21 = a[9];
          a22 = a[10];
          a23 = a[11];
      
          out[0] = a00;
          out[1] = a01;
          out[2] = a02;
          out[3] = a03;
          out[4] = a10;
          out[5] = a11;
          out[6] = a12;
          out[7] = a13;
          out[8] = a20;
          out[9] = a21;
          out[10] = a22;
          out[11] = a23;
      
          out[12] = a00 * x + a10 * y + a20 * z + a[12];
          out[13] = a01 * x + a11 * y + a21 * z + a[13];
          out[14] = a02 * x + a12 * y + a22 * z + a[14];
          out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }
      
        return out;
      },

      scale(out, a, v) {
        let x = v[0],
          y = v[1],
          z = v[2];
      
        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      },

      rotate(out, a, rad, axis) {
        let x = axis[0],
          y = axis[1],
          z = axis[2];
        let len = Math.hypot(x, y, z);
        let s, c, t;
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;
        let b00, b01, b02;
        let b10, b11, b12;
        let b20, b21, b22;
      
        if (len < EPSILON) {
          return null;
        }
      
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
      
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
      
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
      
        // Construct the elements of the rotation matrix
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
      
        // Perform rotation-specific matrix multiplication
        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out[11] = a03 * b20 + a13 * b21 + a23 * b22;
      
        if (a !== out) {
          // If the source and destination differ, copy the unchanged last row
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        return out;
      },

      multiply(out, a, b) {
        let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
        let a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
        let a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
        let a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];
      
        // Cache only the current line of the second matrix
        let b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
      },


      invert(out, a) {
        let a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
        let a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
        let a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
        let a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];
      
        let b00 = a00 * a11 - a01 * a10;
        let b01 = a00 * a12 - a02 * a10;
        let b02 = a00 * a13 - a03 * a10;
        let b03 = a01 * a12 - a02 * a11;
        let b04 = a01 * a13 - a03 * a11;
        let b05 = a02 * a13 - a03 * a12;
        let b06 = a20 * a31 - a21 * a30;
        let b07 = a20 * a32 - a22 * a30;
        let b08 = a20 * a33 - a23 * a30;
        let b09 = a21 * a32 - a22 * a31;
        let b10 = a21 * a33 - a23 * a31;
        let b11 = a22 * a33 - a23 * a32;
      
        // Calculate the determinant
        let det =
          b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      
        if (!det) {
          return null;
        }
        det = 1.0 / det;
      
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      
        return out;
      },
      
      //perspectiveNO
      perspective(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[15] = 0;
        if (far != null && far !== Infinity) {
          const nf = 1 / (near - far);
          out[10] = (far + near) * nf;
          out[14] = 2 * far * near * nf;
        } else {
          out[10] = -1;
          out[14] = -2 * near;
        }
        return out;
      }


    
    })
    
    node('mat4',mat4)
    

}

{

    node('createBuffer',function(gl,array,arrayType){

      if(arrayType===undefined){
        arrayType = gl.ARRAY_BUFFER
      }
      const buffer = gl.createBuffer();
      gl.bindBuffer(arrayType, buffer);
      gl.bufferData(arrayType, array, gl.STATIC_DRAW);
      return buffer;

    })
    


    node('setupAttribute',function(gl,shaderProgram,buffer,name,size,arrayType){
      
      if(arrayType===undefined){
        arrayType=gl.ARRAY_BUFFER
      }

      gl.bindBuffer(arrayType, buffer);

       const pointer = gl.getAttribLocation(shaderProgram, name);

       if(pointer>-1){
          gl.vertexAttribPointer(pointer, size, gl.FLOAT, false,0,0) ;
          gl.enableVertexAttribArray(pointer);
       }

    })

    node('createBuffersFromGeometry',function(gl,geometry){

      const F32A=node('F32A')
      const U16A=node('U16A')

      const buffers={}

      for(const key of Object.keys(geometry)){

        if(key==='indices'){

          buffers[key] = node('createBuffer')(gl, U16A(geometry[key]), gl.ELEMENT_ARRAY_BUFFER)

        }else{
          buffers[key] = node('createBuffer')(gl, F32A(geometry[key]))
        }

      }
      
      return buffers

    })


    node('setupAttributesAngGetVAO',function(gl,shaderProgram,buffers){

      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      for(const key of Object.keys(buffers)){

        let arraySize= (key==='indices')?1:3
        if(key==='texcoords'){
          arraySize=2
        }
        let arrayType= (key==='indices')? gl.ELEMENT_ARRAY_BUFFER: gl.ARRAY_BUFFER

          node('setupAttribute')(gl,shaderProgram, buffers[key], key,arraySize,arrayType)
            
      }

      gl.bindVertexArray(null);

      return vao

    })



    node('createMeshFromGeometry',function(gl,geometry,shaderProgram){


      let buffers
      const mesh={
        geometry,
        buffers: buffers=node('createBuffersFromGeometry')(gl, geometry),
        shaderProgram,
        vao: node('setupAttributesAngGetVAO')(gl,shaderProgram,buffers),


        render(gl,uniforms){

            gl.useProgram(this.shaderProgram);


           
            gl.bindVertexArray(this.vao);

            
            const uniformSetter=node('uniformsSetter')(gl,this.shaderProgram)

            uniformSetter.set(uniforms)
            uniformSetter.set(this.uniforms??{})
            uniformSetter.set({
              model:this.matrix(),
            })
          
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

            gl.drawElements(gl.TRIANGLES, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);

        }
      }

      node('assignSource')(mesh)

      return mesh


    })


}

{

    node('setupScene',function(gl){

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
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


}{

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
{





    node('loadTexture',function loadTexture(gl, url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
     
        // Because images have to be download over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    width, height, border, srcFormat, srcType,
                    pixel);
     
        const image = new Image();
        image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                       srcFormat, srcType, image);
     
        // WebGL1 has different requirements for power of 2 images
        // vs non power of 2 images so check if the image is a
        // power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
           // Yes, it's a power of 2. Generate mips.
           gl.generateMipmap(gl.TEXTURE_2D);
        } else {
           // No, it's not a power of 2. Turn of mips and set
           // wrapping to clamp to edge
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
           gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        };
        image.src = url;
     
        return texture;
     })
     
     function isPowerOf2(value) {
        return (value & (value - 1)) == 0;
     }




}{


    node('uniformsSetter',function uniformsSetter(gl, program){
       
        let sampler=0
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,null)
      
        return {
            set(uniforms){
                
                for(const key of Object.keys(uniforms)){

                    const pointer = gl.getUniformLocation(program,key)
                    const Value=uniforms[key]
                
                    if((! pointer)||(Value===undefined)){
                        return
                    }
                    
                    
                    
                    if((Value!==undefined)&&(Value["constructor"]["name"]==="WebGLTexture")){
                        gl.uniform1i(pointer,sampler)
                        gl.activeTexture(gl.TEXTURE0+sampler)
                        gl.bindTexture(gl.TEXTURE_2D,Value)
                        sampler++
                    }else{
                        
                        switch(Value.length) {
                            case 16:
                                gl.uniformMatrix4fv(pointer,null,Value)
                                break;
                            case 4:
                                gl.uniform4fv(pointer,Value)
                                break;
                            case 3:
                                gl.uniform3fv(pointer,Value)
                                break;
                            case 2:
                                gl.uniform2fv(pointer,Value)
                                break;
                            default:
                                gl.uniform1f(pointer,Value)
                          }
                        

                    }
            
                }
                
            }
        }
    })


}{


    function vec3(){
        return vec3.create()
      }

    node('assign')(vec3,{

        create(x,y,z) {
          if(x===undefined){
            x=0.0
          }
          if(y===undefined){
            y=x
          }
          if(z===undefined){
            z=y
          }
          return [x,y,z]
        },

    })


    node('vec3',vec3)


}{

    node('init',function(){


        node('CubesScene')()


    })

    window.addEventListener('DOMContentLoaded', () => {
        node('init')()
    })

}

