#version 300 es

precision mediump float;

uniform sampler2D colorTexture;
uniform sampler2D depthTexture;

//varying vec3 vColor;
//in vec3 vLighting;
in vec2 vTexCoords;

out vec4 outColor;

void main(void) {

    vec3 depth = texture(depthTexture, vTexCoords).rgb;
    vec3 color = texture(colorTexture, vTexCoords).rgb;
    //vec4 color=vec3(vTexCoords.x,vTexCoords.y,0.5);

    outColor = vec4(depth, 1.0);

}
