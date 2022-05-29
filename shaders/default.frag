#version 300 es

precision mediump float;

uniform sampler2D diffuseTexture;

//varying vec3 vColor;
in vec3 vLighting;
in vec2 vTexCoords;

out vec4 outColor;

void main(void) {

    vec4 diffuseColor = texture(diffuseTexture, vTexCoords);

    outColor = vec4(diffuseColor.rgb*vLighting, 1.0);

}
