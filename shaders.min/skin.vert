#version 300 es

in vec3 F;
in vec3 G;
in vec2 H;
in vec4 weights;
in uvec4 joints;

uniform mat4 I;
uniform mat4 J;
uniform mat4 K;
uniform float numJoints;

uniform sampler2D jointTexture;

uniform vec3 JPosition;

//uniform vec3 J;

out float Q;
out vec3 T;
out vec2 U;

mat4 r(uint jointNdx) {
  return mat4(
    texelFetch(jointTexture, ivec2(0, jointNdx), 0),
    texelFetch(jointTexture, ivec2(1, jointNdx), 0),
    texelFetch(jointTexture, ivec2(2, jointNdx), 0),
    texelFetch(jointTexture, ivec2(3, jointNdx), 0));
}

void main (void) {
  if(int(numJoints)>0){
      mat4 t = r(joints[0]) * weights[0] +
                    r(joints[1]) * weights[1] +
                    r(joints[2]) * weights[2] +
                    r(joints[3]) * weights[3];
  
      gl_Position = I * J * K * t* vec4(F, 1.0);
  }else{
      gl_Position = I * J * K * vec4(F, 1.0);
  }

  T = mat3(K) * normalize(G);

  U=H;

  Q = abs(length((mat3(K) * F)-JPosition));

  Q=8.5/Q;
}