#version 300 es

precision mediump float;

//in float Q;
in vec3 T;
in vec2 U;

//uniform vec4 uColor;
uniform vec4 uSpecular;

//uniform vec2 V;
//uniform float W;
//uniform float X;

uniform sampler2D B;
uniform sampler2D Y;
uniform sampler2D Z;

uniform vec3 a;

out vec4 outColor;

void main(void) {

  vec4 color = texture(B,U);

  vec3 b = texture(Z,U).rgb;

  float c = dot(normalize(a), T) * .5 + .5;

  color = color + uSpecular;

  outColor = vec4(color.rgb*c, 1.0);
}