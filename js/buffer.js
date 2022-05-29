class Buffer{
  constructor(gl,width,height){

    this.width=width
    this.height=height


// create new buffers
this.framebuffer = gl.createFramebuffer();
//this.texture = new Texture();
this.texture = gl.createTexture();
//this.depth = new Texture();
this.depth = gl.createTexture();

// framebuffer
gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
this.framebuffer.width = width;
this.framebuffer.height = height;

// colorbuffer
gl.bindTexture(gl.TEXTURE_2D, this.texture);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.framebuffer.width, this.framebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

// depthbuffer
gl.bindTexture(gl.TEXTURE_2D, this.depth);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, this.framebuffer.width, this.framebuffer.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);

// assemble buffers
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth, 0);

//this.checkBuffer();

gl.bindTexture(gl.TEXTURE_2D, null);
gl.bindRenderbuffer(gl.RENDERBUFFER, null);
gl.bindFramebuffer(gl.FRAMEBUFFER, null);




    }
}

export default Buffer