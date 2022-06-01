{

   function isPowerOf2(value) {
      return (value & (value - 1)) == 0;
   }

   node('setTexParameteri',function(gl,texture,width=1,height=1,kind='default'){
        gl.bindTexture(gl.TEXTURE_2D, texture);

        if(isPowerOf2(width) && isPowerOf2(height) && (kind!=='depth') ) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
   })

   node('createTexture',function(gl,color=[0, 0, 255, 255],width=1,height=1,kind='default'){
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      if(kind==='default'){
        const pixel = new Uint8Array(color)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
      }else if(kind==='color'){
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      }else if(kind==='depth'){
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
      }

      node('setTexParameteri')(gl,texture,width,height,kind)

      return texture;
   })


    node('loadTexture',function loadTexture(gl, url) {
        const texture=node('createTexture')(gl)
 
        const image = new Image();
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
         
            node('setTexParameteri')(gl,texture,image.width,image.height)
        };
        image.src = url;
     
        return texture;
     })



}