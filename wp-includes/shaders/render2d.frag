#version 300 es

precision mediump float;

//uniform sampler2D B;

//varying vec3 C;
//in vec3 D;
in vec2 E;

out vec4 outColor;

void main(void) {

    //vec4 diffuseColor = texture(B, E);
    vec3 L=vec3(E.x,E.y,0.5);

    outColor = vec4(L, 1.0);

}
