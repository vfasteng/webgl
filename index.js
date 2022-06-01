function node(param,value){
    if(node[param]===undefined){
      node[param]=value
      return false
    }
    return node[param]
}

{

    const directives=[]

    node('directives',directives)

}

{

    const directives=node('directives')

    function parse(scope, elem, source, callback){
        //let matches = [];
        //let match;
        let text = source;
        const reg = new RegExp("{{([a-zA-Z0-9]+)}}","gm")
        return text.replace(reg,match=>{
            const watch=match.substring(2,match["length"]-2)
            scope.watch( watch, (old,val) => {
                callback(text.replace(new RegExp(match,"gm"),val));
            });
            return scope[watch]
        })
        /*while ((match = reg["exec"](text)) !== null) {
            matches["push"](match);
        }
        const replace = () => {
            let newVal = text;
            matches.forEach((matched) => {
                const parts=matched.split('.')
                const val=scope[matched]//(parts.length?(scope[parts[0]]?(scope[parts[0]][parts[1]]):undefined):scope[matched])
                if (val !== undefined) {
                    newVal = newVal.replace("{{" + matched + "}}", val ?? "");
                }
            });
            if (newVal !== text) {
                callback(newVal);
            }
        };
        matches.forEach((matched) => {
            scope.watch(matched, val => {
                replace();
            });
        });
        replace();*/
    }
    
    node('parse',parse)

    //const parse=node('parse')
    
    function compile(element, scope){
        /*const directive = (elem) => {
            const attributes = elem.getAttributeNames ? elem.getAttributeNames() : [];
            attributes.forEach((attr) => {
                const attrValue = elem.getAttribute(attr);
                if (attr.indexOf("red-") > -1) {
                    elem.removeAttribute(attr);
                    elem._attr = attrValue;
                    const dir=Directives[attr["replace"]("red-", "")]
                    if(dir){
                        dir(elem, scope, attrValue);
                        //return false
                    }
                } else {
                    parse(scope,elem, attrValue, (txt) => {
                        elem.setAttribute(attr, txt);
                    });
                    //return true
                }
            })
        };*/
        const each = (element) => {
            const el = element
            const elem = element
            if(el===undefined){
                return
            }
            /*if((!elem)||(typeof elem==="string")){
                return
            }*/
            //if (elem.nodeName !== "#text") {
               // directive(elem)
                    //return
                //}
            //}
            if (elem.childNodes.length === 1) {
                parse(scope,elem, elem.innerHTML, (txt) => {
                    elem.innerHTML = txt;
                });
            }
            elem.childNodes.forEach((node) => {
                each(node);
            });
        };
        each(element);


        for(const directive of directives){
            const elements=element.querySelectorAll("[red-"+directive.selector+"]")

            for(const element of elements){

                const attr=element.getAttribute("red-"+directive.selector)

                directive.callback(element,scope,attr)

            }
        }

    }
    
    node('compile',compile)
    //node('Directives',Directives)
    //node('parse',parse)
    

}



{

    //function watch(){}
    
      /*  Object.prototype.watch = function (prop, handler) {
            const self = this
            !self.handlers ? self.handlers = [] : null;
            !self.handlers[prop] ? self.handlers[prop] = [] : null
            self.handlers[prop]['push'](handler)
            if (self.hasOwnProperty(prop) && !self.hasOwnProperty('_' + prop)) {
                self['_' + prop] = self[prop]
                try{
                //delete(self[prop])
                }catch(e){}
            }
            if (!self.hasOwnProperty(prop)) {
                Object.defineProperty(self, prop, {
                    ["get"]: () => self['_' + prop],
                    ["set"]: (value) => {
                        const oldVal=self['_' + prop]
                        self.handlers[prop].forEach(handler => {
                            handler(oldVal,value)
                        })
                        self['_' + prop] = value
                    },
                })
            }
        }*/
    
    
        ///////////////////////////////////////////
    
    
      
    
            Object.prototype.watch = function (prop, handler) {
    
                let helper = this.helper
                if(helper===undefined){
                    helper={}
                    this.helper = helper
                }
                if(helper[prop]===undefined){
                    helper[prop]= {
                        list:[],
                        Value:this[prop],
                    }
                }
    
                helper[prop].list.push(handler)
    
            if (!this["hasOwnProperty"](prop)) {

                Object["defineProperty"](this, prop, {
    
                    ["get"]: () => helper[prop].Value,
                    ["set"]: (val) => {
                            
                            for(const handler of helper[prop].list){
                                handler(helper[prop].Value,val)
                            }
                            helper[prop].Value = val
                        },
    
                })
            }
          
            }
    
    
    //}

}



{


    const directives=node('directives')



    directives.push({selector:"click",callback:click})


    function click(element,scope,attr){


        //console.log(element,scope)
        //node('registerDirective')(element)

        element.addEventListener("click",function(event){


            (function(){
                eval(attr)
            }).bind(scope)()

        })


    }


}

{

    
    /*attrs*/
    
    /*systemDefs*/
    node('assign',function(target,from){
      return Object.assign(target,from)
    })
    
    node('load',async function load(uri,type){
        const promise=await fetch(uri)
        const text=await promise[type??"text"]()
        return text
    })

    node('U8A',function(array){
      return new Uint8Array(array)
    })
    
    node('F32A',function(array){
      return new Float32Array(array)
    })
    
    node('U16A',function(array){
      return new Uint16Array(array)
    })
    

}



{

    

    node('createCamera',function(gl){

      const mat4=node('mat4')
    const vec3=node('vec3')

    const aspect=gl.canvas.width / gl.canvas.height;

        const camera={
            fov: 5*9,
            aspect,
            near: 1/1000,
            far: 100,

            projection(){
              return mat4.perspective([], this.fov, this.aspect, this.near, this.far)
            }
          }
        

        node('assignSource')(camera)

        return camera


    })


}

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


    node('TRS',function(translation=[0,0,0], rotation=[0,0,0], scale=[1,1,1]){
        return {translation, rotation, scale}
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

node('createRenderBuffer',function(gl,width,height){

    const buffer={
      width,
      height,
      //renderbuffer: gl.createRenderbuffer(),
      framebuffer: gl.createFramebuffer(),
      color: node('createTexture')(gl,undefined,width,height,'color'),
      depth: node('createTexture')(gl,undefined,width,height,'depth'),
    }


    //gl.bindRenderbuffer(gl.RENDERBUFFER, buffer.renderbuffer);
    //gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, width,height);

    // framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer.framebuffer);
    buffer.framebuffer.width = width;
    buffer.framebuffer.height = height;

    // colorbuffer
    //gl.bindTexture(gl.TEXTURE_2D, buffer.color);
    /*gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, buffer.framebuffer.width, buffer.framebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // depthbuffer
    //gl.bindTexture(gl.TEXTURE_2D, buffer.depth);
    /*gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);*/
    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT24, buffer.framebuffer.width, buffer.framebuffer.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);

    // assemble buffers
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, buffer.color, 0);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, buffer.depth, 0);

    //gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, buffer.renderbuffer);

    //this.checkBuffer();

    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    return buffer

})

{
  
    node('createCanvas',function(){
        const canvas=document.createElement('canvas')
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        document.body.append(canvas)
        return canvas
    })

}

{




    node('engine',async function(canvas=node('createCanvas')() ){

      

      //if(canvas===undefined){
        /*canvas=document.createElement('canvas')
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
        document.body.append(canvas)*/
        //canvas=node('createCanvas')()
      //}
      const gl = canvas.getContext("webgl2")

      //var ext = gl.getExtension('WEBGL_depth_texture');

      const engine={
        gl,
        models:[],
        add(scene){
            this.models.push(scene)
        }
      }
      


  

    engine.buffers=[]

    const buffer1=node('createRenderBuffer')(gl,512,512)
    engine.buffers.push(buffer1)

    const buffer2=node('createRenderBuffer')(gl,512,512)
    buffer2.shader=await node('createShaderByName')(gl,"depth")
    buffer2.clearColor=[0,0,0,1]
    engine.buffers.push(buffer2)


    /*const ceratePrinter=node('ceratePrinter');

    var left=0, width=25
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    const print = await ceratePrinter(engine, 1,0.5, -x, -x+wx)*/

    /*var left=25, width=25
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    this.print2 = new Print(this, 1,0.5, -x, -x+wx)

    var left=50, width=25
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    this.print3 = new Print(this, 1,0.5, -x, -x+wx)



    var left=50, width=50
    var x=-(((left-100)/100)*2)-1, wx=(width/100)*2
    this.print4 = new Print(this, 0.0,-1.0, -x, -x+wx)*/


    const bgTexture=node('loadTexture')(gl,"/images/box.webp")

    engine.renderers=[]

      const render2d=await node('Render2D')(engine)
      render2d.source.scale=vec3(1.0)//[0.5,0.5,0.5]
      //render2d.source.translation=[0.0,0.0,0]
      render2d.uniforms.colorTexture=buffer1.color
      render2d.uniforms.depthTexture=buffer2.color
      engine.renderers.push(render2d)

      /*const render2d2=await node('Render2D')(engine)
      render2d2.source.scale=[0.5,0.5,0.5]
      render2d2.source.translation=[0,0.5,0]
      render2d2.uniforms.colorTexture=buffer.depth
      engine.renderers.push(render2d2)*/

      ///render2d.uniforms.colorTexture=diffuseTexture
      //engine.models.push(render2d)


    //const colorTexture=diffuseTexture//buffer.color




    //gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    //gl.colorMask(true, true, true, false);//.glcolorMask() 
    //gl.depthFunc(gl.LEQUAL);

    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.enable(gl.BLEND);








    const camera=node('createCamera')(gl)
    camera.source.translation[2] = -6

    engine.camera=camera



      function render(gl, uniforms, frameTime, shader){

        for(const model of engine.models){
  
          if(model.animate){
            model.animate(frameTime)
          }
  
          if(!model.render){
              console.log('model without render()...', model)
          }
          model.render(gl, uniforms, frameTime, shader)
  
       }
  
      }

      console.log('engine',engine);

    node('setupScene')(gl)

    var time_old = 0;
    let frame=0;

    var animate = function(time) {


       const frameTime = (time-time_old)*0.001;
       frame++;



       time_old = time;


        const uniforms={
            projection: camera.projection(),
            camera: camera.matrix(),
            cameraPosition:camera.source.translation,
            lightDirection:camera.source.translation,
            iResolution:[gl.canvas.width,gl.canvas.height],
            iTime:time,
            delta:frameTime,
            frame:frame,
            backgroundTexture:bgTexture,
        }


        for (const scene of engine.models) {
          scene.updateWorldMatrix();
          if(scene.skins){
            scene.animSkin(delta);
          }
        }

      //for(const anim of this.anims){
      //  anim.bind(this)(delta)
      //}


        for(const buffer of engine.buffers){
            node('clearSceneAndSetBuffer')(gl,buffer)
            render(gl, uniforms, frameTime, buffer.shader)
        }

        node('clearSceneAndSetBuffer')(gl)
        render(gl, uniforms, frameTime)//, buffer2.shader)
        

        //render2d.uniforms.colorTexture=buffer.color//colorTexture
        //print.render(gl,uniforms)
        for(const render of engine.renderers){
            render.render(gl,uniforms)
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



}

{

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
        const fa = 1.0 / Math.tan(fovy / 2);
        out[0] = fa / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = fa;
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
    


    node('setupAttribute',function(gl,shader,buffer,name,size,arrayType){
      
      if(arrayType===undefined){
        arrayType=gl.ARRAY_BUFFER
      }

      gl.bindBuffer(arrayType, buffer);

       const pointer = gl.getAttribLocation(shader.program, name);

       if(pointer>-1){
         if(name==='joints'){
          gl.vertexAttribIPointer(pointer, size, gl.UNSIGNED_SHORT, false,0,0) ;
         }else{
          gl.vertexAttribPointer(pointer, size, gl.FLOAT, false,0,0) ;
         }
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


    node('setupAttributesAngGetVAO',function(gl,shader,buffers){

      const vao = gl.createVertexArray();
      gl.bindVertexArray(vao);

      for(const key of Object.keys(buffers)){

        let arraySize= (key==='indices')?1:3
        if(key==='texcoords'){
          arraySize=2
        }
        let arrayType= (key==='indices')? gl.ELEMENT_ARRAY_BUFFER: gl.ARRAY_BUFFER

          node('setupAttribute')(gl,shader, buffers[key], key,arraySize,arrayType)
            
      }

      gl.bindVertexArray(null);

      return vao

    })

    node('Mesh',function(...args){
      return node('createMeshFromGeometry')(...args)
    })

    node('createMeshFromGeometry',function(engine,geometry,shader,addToEngine=true){

      const gl=engine.gl


      let buffers
      const mesh={
        geometry,
        buffers: buffers=node('createBuffersFromGeometry')(gl, geometry),
        shader,
        vao: node('setupAttributesAngGetVAO')(gl,shader,buffers),
        mode:gl.TRIANGLES,
        uniforms:{},

        draw(gl,uniforms,frameTime,shader){

            shader=shader ?? this.shader

            gl.useProgram(shader.program);


           
            gl.bindVertexArray(this.vao);

            
            const uniformSetter=node('uniformsSetter')(gl,shader)

            uniformSetter.set(uniforms)
            uniformSetter.set(this.uniforms??{})
            uniformSetter.set({
              model:this.worldMatrix??this.matrix(),
            })
          
          if(this.geometry.indices){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

            gl.drawElements(this.mode, this.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
          }else{
            let count=this.geometry.positions.length/3
            //if(this.mode===gl.POINTS){
            //  count=this.geometry.positions.length/3
            //}
            gl.drawArrays(this.mode, 0, count);
          }
        }
      }

      node('assignSource')(mesh)
      node('assignScene')(mesh)

      if(addToEngine){
          engine.add(mesh)
      }

      return mesh


    })


}



{

    node('createShaderByName',async function(gl,name){

      const shader={
        name,
      }

      const load=node('load')

      let path="/shaders-min"
      try{
        if(DEBUG!==undefined){
          path="/shaders"
        }
      }catch(e){}

      const vertCode = await load(path+"/"+name+".vert")
      const fragCode = await load(path+"/"+name+".frag")

      shader.program = await node('createShaderFromSource')(gl,vertCode,fragCode)

      return shader

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

   function isPowerOf2(value) {
      return (value & (value - 1)) == 0;
   }

   node('setTexParameteri',function(gl,texture,width=1,height=1,kind='default'){
        gl.bindTexture(gl.TEXTURE_2D, texture);

        if(isPowerOf2(width) && isPowerOf2(height) && (kind!=='depth') ) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            const filter=(kind==='depth') ? gl.NEAREST:gl.LINEAR;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            if(kind!=='depth'){
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
        }
   })

   node('createTexture',function(gl,color=[0, 0, 255, 255],width=1,height=1,kind='default'){
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      if(kind==='default'){
        const pixel = node('U8A')(color)
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

{


    node('uniformsSetter',function uniformsSetter(gl,shader){
       
        let sampler=0
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,null)
      
        return {
            set(uniforms){
                
                for(const key of Object.keys(uniforms)){

                    const pointer = gl.getUniformLocation(shader.program,key)
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


}

{


    function vec3(num){
        return vec3.create(num)
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

        long(a){
          let x = a[0];
          let y = a[1];
          let z = a[2];
          return Math.hypot(x, y, z);
        },

        add(out, a, b) {
          out[0] = a[0] + b[0];
          out[1] = a[1] + b[1];
          out[2] = a[2] + b[2];
          return out;
        },
        
        subtract(out, a, b) {
          out[0] = a[0] - b[0];
          out[1] = a[1] - b[1];
          out[2] = a[2] - b[2];
          return out;
        }

    })


    node('vec3',vec3)


}

{



    node('Render2D',async function(engine){



        //const engine=await node('engine')()
        const gl=engine.gl



        
        //engine.camera.source.translation = vec3.create()


        const shaderProgram=await node('createShaderByName')(gl,"render2d")

        let geometry=await node('load')("/models/quad.json","json")
        
        geometry=node('fixGeometry')(geometry)

        //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")
        //const diffuseTexture=node('loadTexture')(gl,"/images/box.webp")
        

        const mesh=node('Mesh')(engine, geometry, shaderProgram, false)

        

        /*const uniforms={
            //colorTexture:diffuseTexture,
        }


        const render={
            uniforms,
            render(gl,uniforms){
                node('assign')(mesh.uniforms,this.uniforms)
                //mesh.uniforms=this.uniforms;
                mesh.render(gl,uniforms)
            }
        }*/

        //mesh.uniforms.colorTexture=colorTexture


        //engine.models.push(render)



        return mesh












        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}


    {
        
        function glTypedArray(val){
            return {
                '5120': Int8Array,
                '5121': Uint8Array,
                '5122': Int16Array,
                '5123': Uint16Array,
                '5124': Int32Array,
                '5125': Uint32Array,
                '5126': Float32Array
            }[val]
        }
        
        function NumSize(val){
            return {
                'SCALAR': 1,
                'VEC2': 2,
                'VEC3': 3,
                'VEC4': 4,
                'MAT2': 4,
                'MAT3': 9,
                'MAT4': 16
            }[val]
        }
        
        function getAccessorTypedArrayAndStride(gltf, accessorIndex) {
            const accessor = gltf.accessors[accessorIndex];
            const bufferView = gltf.bufferViews[accessor.bufferView];
            const TypedArray = glTypedArray(accessor.componentType);
            const buffer = gltf.buffers[bufferView.buffer];
            accessor.size=NumSize(accessor.type)
            const array=new TypedArray(
              buffer,
              bufferView.byteOffset + (accessor.byteOffset || 0),
              accessor.count * accessor.size)
            return array/*{
              accessor,
              array,
          }*/
        }
        
        
        
        node('loadGLTF',async function(engine,uri){
        
            const gl=engine.gl
        
            //const shader=await node('createShader')('skin.vert','skin.frag')
            //const meshShader=await node('createShader')('skin')
            const shader=await node('createShaderByName')(gl,"skin")
        
            
            let path=uri.replace(uri.split('/').pop(),'')
        
            const gltf=await node('load')(uri,"json")
        
            //console.log(gltf)
        
            for(const key of Object.keys(gltf.buffers)){
                const url=path+'/'+gltf.buffers[key].uri
                gltf.buffers[key]=await node('load')(url,'arrayBuffer')
            }
        
            
        
            gltf.accessors=gltf.accessors.map((accessor,index)=>{
                return getAccessorTypedArrayAndStride(gltf,index)
            })
        
            gltf.images=(gltf.images??[]).map(image=>{
                return node('loadTexture')(gl, path+'/'+image.uri)
            })
        
            gltf.textures=(gltf.textures??[]).map(texture=>{
                return gltf.images[texture.source]
            })
        
            gltf.materials=(gltf.materials??[]).map(material=>{
                const returnMaterial={}
                if(material.pbrMetallicRoughness){
                    const mat=material.pbrMetallicRoughness
                    returnMaterial.uColor= mat.baseColorFactor??[1,1,1,1]
                    returnMaterial.diffuseTexture=mat.baseColorTexture?gltf.textures[mat.baseColorTexture.index]:null//createTexture(gl,[128,128,128,255])
                }
                returnMaterial.normalTexture=material.normalTexture?(gltf.textures[material.normalTexture.index]):null//createTexture(gl,[0,0,255,255])
                returnMaterial.emissiveTexture=material.emissiveTexture?(gltf.textures[material.emissiveTexture.index]):null//createTexture(gl,[128,128,128,255])
                return returnMaterial
            })
        
            gltf.meshes=gltf.meshes.map(mesh=>{
                let buff={geometry:{}}
                for(const key of Object.keys(mesh.primitives[0].attributes)){
                    buff.geometry[(key.replace('_0','').toLowerCase()+'s').replace('ss','s')]=gltf.accessors[mesh.primitives[0].attributes[key]]
                }
          
                buff.geometry.indices=gltf.accessors[mesh.primitives[0].indices]
                buff.material=gltf.materials ? gltf.materials[mesh.primitives[0].material]:{}
          
                return buff
            })
        
            const skinnodes = [];
            const orignodes = gltf.nodes;
            gltf.nodes = gltf.nodes.map((n) => {
              const {name, skin, mesh, translation, rotation, scale} = n;
        
              const trs = node('TRS')(translation, rotation, scale);
              const nodeScene = node('Scene')(trs, name);
              const realMesh = gltf.meshes[mesh];
              if (skin !== undefined) {
                skinnodes.push({node: nodeScene, mesh: realMesh, skinNdx: skin});
              } else if (realMesh) {
                const mesh=node('Mesh')(engine,realMesh.geometry,shader,node)
                mesh.uniforms=realMesh.material
                //node.add(mesh)
                //node.drawables.push(mesh);
                //engine.meshes.push(mesh)
              }
              return nodeScene;
            });
        
            gltf.skins = (gltf.skins??[]).map((skin) => {
              const joints = skin.joints.map(ndx => gltf.nodes[ndx]);
              const array = gltf.accessors[skin.inverseBindMatrices]
              return node('Skin')(gl,joints, array);
            });
        
            for (const {node:nodeScene, mesh, skinNdx} of skinnodes) {
              //console.log('load model mesh: ',mesh)
              const meshAdd=node('Mesh')(engine,mesh.geometry,shader,nodeScene)
              meshAdd.uniforms=mesh.material
              const skin=gltf.skins[skinNdx]
              meshAdd.skin=skin
              //node.add(meshAdd)
              //node.drawables.push(meshAdd);
              //engine.meshes.push(meshAdd)
            }
        
            gltf.nodes.forEach((nodeScene, ndx) => {
              const children = orignodes[ndx].children;
              if (children) {
                addChildren(gltf.nodes, nodeScene, children);
              }
            });
        
            for (const scene of gltf.scenes) {
              scene.root = node('Scene')(node('TRS')(), scene.name);
              addChildren(gltf.nodes, scene.root, scene.nodes);
            }
        
            engine.add(gltf.scenes[0].root)
        
            console.log(gltf)

            //for(const mesh of gltf.meshes){
            //    engine.add(mesh)
            //}
        
            //node('assign')(this,gltf)
        
            //gltf.scenes[0].root.updateWorldMatrix()

            const model=node('Scene')()
            node('assign')(model,gltf)


            return model

            
        })


        
        
        function addChildren(nodes, nodeScene, childIndices) {
            childIndices.forEach((childNdx) => {
                const child = nodes[childNdx];
                //child.setParent(node);
                nodeScene.add(child)
            });
        }
        
        
        
        
    
    }
    
    

    {
    
        function lerp(input, target, percent) {
            input += (target - input)*percent;
            return input
        }
        function lerpVec(input, target, percent) {
            return input.map((p,i)=>lerp(input[i], target[i], percent))
        }
        
       
        
        
        node('animSkin',function(delta){

            return
        
        
                if(!this.animData){
                    this.animData = {}
                }
        
        
                if(!this['animations']||!this.animations.length){
                    return
                }
        
                const skin=this['skins'][0]
        
                    const animation=this.animations[0]
        
        
        
                    this.animData.frame = this.animData.frame??0
                    this.animData.percent=this.animData.percent??0.0;
                    this.animData.frames=this.animData.frames??0
                    this.animData.time=this.animData.time??0
        
                
                    const frametime=0.035
        
                    this.animData.percent=this.animData.time/frametime
                    this.animData.time+=delta
        
                    const calcPercent=()=>{
                    while(this.animData.percent>frametime){
                        this.animData.frame++
                        this.animData.time=0
                        this.animData.percent=0
                    }
                    }
                    if(this.animData.frame>this.animData.frames){
                    this.animData.frame=0
                    calcPercent()
                    }
                    if(this.animData.time>frametime){
                    calcPercent()
                    }
                    
        
            for(const channel of animation['channels']){
                    const target=channel['target']
                    const joint=this.nodes[target['node']]
                    const sampler=animation['samplers'][channel['sampler']]
                    
                    const fname={'translation':'position','rotation':'rotation','scale':'scale',}[channel.target['path']]
                    const len=(fname==='rotation')?4:3
        
        
                    const accessor=this.accessors[sampler['output']].array
                    
                    if(!this.animData.frames){
                        this.animData.frames=accessor.length/len
                    }
                
                    if(fname==='rotation'){
                        var value=[accessor[(this.animData.frame*len)+0],accessor[(this.animData.frame*len)+1],accessor[(this.animData.frame*len)+2],accessor[(this.animData.frame*len)+3]]
                    }else{
                        var value=[accessor[(this.animData.frame*len)+0],accessor[(this.animData.frame*len)+1],accessor[(this.animData.frame*len)+2]]
                    }
        
                    let fromVal=[value[0],value[1],value[2],value[3],]
                
                    const newVal=lerpVec(fromVal, value, this.animData.percent)
        
                    joint.source[fname]=newVal
                    }
        
        
        })
    
    }
    
    

    {
    
      
        
        node('Skin',function(gl, joints, inverseBindMatrixData){
              this.joints = joints;
              this.inverseBindMatrices = [];
              this.jointMatrices = [];
            
              this.jointData = new Float32Array(joints.length * 16);
        
              for (let i = 0; i < joints.length; ++i) {
                this.inverseBindMatrices.push(new Float32Array(
                    inverseBindMatrixData.buffer,
                    inverseBindMatrixData.byteOffset + Float32Array.BYTES_PER_ELEMENT * 16 * i,
                    16));
                this.jointMatrices.push(new Float32Array(
                    this.jointData.buffer,
                    Float32Array.BYTES_PER_ELEMENT * 16 * i,
                    16));
              }
        
              this.jointTexture = gl.createTexture();
              gl.bindTexture(gl.TEXTURE_2D, this.jointTexture);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            
            
            return {
                update(node) {
                const globalWorldInverse = mat4.create()
                mat4.invert(globalWorldInverse,node.worldMatrix);
            
                for (let j = 0; j < this.joints.length; ++j) {
                    const joint = this.joints[j];
                    const dst = this.jointMatrices[j];
                    mat4.multiply(dst, globalWorldInverse, joint.worldMatrix);
                    mat4.multiply(dst, dst, this.inverseBindMatrices[j]);
                }
                gl.bindTexture(gl.TEXTURE_2D, this.jointTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, 4, this.joints.length, 0,
                                gl.RGBA, gl.FLOAT, this.jointData);
                }
            }
        })


    
    }
    
    

{



    node('CubesScene',async function(engine){



        //const engine=await node('engine')()
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

        let geometry=await node('load')("/models/box.json","json")
        geometry=node('fixGeometry')(geometry)

        const diffuseTexture=node('loadTexture')(gl,"/images/box.webp")

        const meshes=[]

        const count=100.0;

        for(let i=0;i<count;i++){
            const mesh=node('createMeshFromGeometry')(engine, geometry, shaderProgram)
            mesh.source.translation=[pos(), pos(), pos()]
            const scaleX=scale()
            mesh.source.scale=[scaleX,scaleX,scaleX]
            mesh.source.factor=[factor(),factor(),factor()]

            mesh.uniforms={
                diffuseTexture,
            }

            //mesh.mode=gl.LINE_STRIP;

            meshes.push(mesh)
        }



            for(const mesh of meshes){

                mesh.animate=function(frameTime){

                    mesh.source.rotation=mesh.source.rotation.map((n,i)=>n+mesh.source.factor[i])

                }
            }
            //const rotation=[frameTime*0.3, frameTime*0.12, frameTime*0.45]
            //this.source.rotation=this.source.rotation.map((n,i)=>n+rotation[i])



        //engine.models.push(...meshes)
















        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}


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


{



    node('Render2DScene',async function(engine){



        //const engine=await node('engine')()
        const gl=engine.gl



        
        //engine.camera.source.translation = vec3.create()


        const shaderProgram=await node('createShaderByName')(gl,"render2d")

        let geometry=await node('load')("/models/quad.json","json")
        
        geometry=node('fixGeometry')(geometry)

        //const diffuseTexture=node('loadTexture')(gl,"/wp-includes/images/box.webp")
        const diffuseTexture=node('loadTexture')(gl,"/images/box.webp")
        

        const mesh=node('createMeshFromGeometry')(engine, geometry, shaderProgram)

        mesh.source.scale=[0.8,0.8,0.8]

        mesh.uniforms.colorTexture=diffuseTexture


        //engine.models.push(mesh)
















        //node('loadGLTF')('./models/stickman/scene.gltf')





    })



}


{



    node('GLTFScene',async function(engine){



        //const engine=await node('engine')()
        //const gl=engine.gl





        

        await node('loadGLTF')(engine,'/models/stickman/scene.gltf')





    })



}


{

    node('init',async function(){


        const engine=await node('engine')()


        //node('Render2DScene')()

        //node('TriangulationScene')()

        node('CubesScene')(engine)


        //node('GLTFScene')(engine)









        node('pageStart')()




    })

    /*window.addEventListener('DOMContentLoaded', () => {
        node('init')()
    })*/

    node('init')()









    node('pageStart',function(){


        const scope={}

        scope["loadScene"]=function(){
            console.log('scene load...')
        }

        node('compile')(document.body, scope)


    })




}



