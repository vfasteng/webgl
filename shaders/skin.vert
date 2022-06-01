#version 300 es

in vec3 positions;
in vec3 normals;
in vec2 texcoords;
in vec4 weights;
in uvec4 joints;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform float numJoints;

uniform sampler2D jointTexture;

uniform vec3 camera;

out float depth;
out vec3 vNormal;
out vec2 vCoord;

mat4 getBoneMatrix(uint jointNdx) {
  return mat4(
    texelFetch(jointTexture, ivec2(0, jointNdx), 0),
    texelFetch(jointTexture, ivec2(1, jointNdx), 0),
    texelFetch(jointTexture, ivec2(2, jointNdx), 0),
    texelFetch(jointTexture, ivec2(3, jointNdx), 0));
}

void main (void) {
  if(int(numJoints)>0){
      mat4 skinMatrix = getBoneMatrix(joints[0]) * weights[0] +
                    getBoneMatrix(joints[1]) * weights[1] +
                    getBoneMatrix(joints[2]) * weights[2] +
                    getBoneMatrix(joints[3]) * weights[3];
  
      gl_Position = projection * view * model * skinMatrix* vec4(positions, 1.0);
  }else{
      gl_Position = projection * view * model * vec4(positions, 1.0);
  }

  vNormal = mat3(model) * normalize(normals);

  vCoord=texcoords;

  depth = abs(length((mat3(model) * positions)-camera));

  depth=8.5/depth;
}