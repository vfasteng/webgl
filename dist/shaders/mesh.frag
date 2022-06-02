#version 300 es

precision mediump float;

//in float Q;
in vec3 R;
in vec2 S;

//uniform vec4 uColor;
uniform vec4 uSpecular;

//uniform vec2 T;
//uniform float U;
//uniform float V;

uniform sampler2D B;
uniform sampler2D W;
uniform sampler2D X;

uniform vec3 Y;

out vec4 outColor;

void main(void) {

  vec4 color = texture(B,S);

  vec3 Z = texture(X,S).rgb;

  float a = dot(normalize(Y), R) * .5 + .5;

  color = color + uSpecular;

  outColor = vec4(color.rgb*a, 1.0);
}