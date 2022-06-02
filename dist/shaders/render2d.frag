#version 300 es

precision mediump float;

uniform sampler2D d;
uniform sampler2D e;
uniform sampler2D f;

uniform vec2 V;

//varying vec3 C;
//in vec3 D;
in vec2 E;

out vec4 outColor;

void main(void) {

    vec3 Q = texture(e, E).rgb;
    vec3 L = texture(d, E).rgb;
    vec3 g = texture(f, E).rgb;
    //vec4 L=vec3(E.x,E.y,0.5);

    float h=1.0/V.x;

    float i=Q.r*6.5;

    vec3 j;
    float k=1.0;
    for(float i=0.0;i<i;i++){
        vec2 l=vec2(E.x+h*5.0,E.y+h*5.0);
        vec3 m = texture(d, l).rgb;
        j=j+m*vec3(0.55);
    }
    j=j+L+L;

    vec3 n = j/k;

    n=g*n+(vec3(0.5)-n);

    //if(length(n)<0.2){
    //    n=vec3(length(n)*3.5);
    //}

    outColor = vec4(n, 1.0);

}
