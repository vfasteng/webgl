node('createRenderBuffer',function(gl,width,height){

    const buffer={
      width,
      height,
      framebuffer: gl.createFramebuffer(),
      color: gl.createTexture(),
      depth: gl.createTexture(),
    }

    // framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer.framebuffer);
    buffer.framebuffer.width = width;
    buffer.framebuffer.height = height;

    // colorbuffer
    gl.bindTexture(gl.TEXTURE_2D, buffer.color);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, buffer.framebuffer.width, buffer.framebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // depthbuffer
    gl.bindTexture(gl.TEXTURE_2D, buffer.depth);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, buffer.framebuffer.width, buffer.framebuffer.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);

    // assemble buffers
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, buffer.color, 0);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, buffer.depth, 0);

    //this.checkBuffer();

    //gl.bindTexture(gl.TEXTURE_2D, null);
    //gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return buffer

})