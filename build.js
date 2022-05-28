const fs=require('fs')



const files=[
  "/js/node.js"
  ,"/js/common.js"
  ,"/js/camera.js"
  ,"/js/cubes.js"
  ,"/js/engine.js"
  ,"/js/geometry.js"
  ,"/js/mat4.js"
  ,"/js/mesh.js"
  ,"/js/scene.js"
  ,"/js/shader.js"
  ,"/js/texture.js"
  ,"/js/uniform.js"
  ,"/js/vec3.js"

  ,"/js/index.js"
]

let script

for(const file of files){
  if(file===undefined){

  }else{
    script+=(fs.readFileSync('.'+file).toString());
  }
}

fs.writeFileSync('./index.js',script)
