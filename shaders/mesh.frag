#version 300 es

precision mediump float;

//in float depth;
in vec3 vNormal;
in vec2 vCoord;

//uniform vec4 uColor;
uniform vec4 uSpecular;

//uniform vec2 iResolution;
//uniform float iTime;
//uniform float delta;

uniform sampler2D diffuseTexture;
uniform sampler2D normalTexture;
uniform sampler2D emissiveTexture;

uniform vec3 lightDirection;

out vec4 outColor;

void main(void) {

  vec4 color = texture(diffuseTexture,vCoord);

  vec3 emissive = texture(emissiveTexture,vCoord).rgb;

  float fakeLight = dot(normalize(lightDirection), vNormal) * .5 + .5;

  color = color + uSpecular;

  outColor = vec4(color.rgb*fakeLight, 1.0);
}