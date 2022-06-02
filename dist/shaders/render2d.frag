#version 300 es

precision mediump float;

uniform sampler2D b;
uniform sampler2D c;
uniform sampler2D d;

uniform vec2 T;

//varying vec3 C;
//in vec3 D;
in vec2 E;

out vec4 outColor;

void main(void) {

    vec3 Q = texture(c, E).rgb;
    vec3 L = texture(b, E).rgb;
    vec3 e = texture(d, E).rgb;
    //vec4 L=vec3(E.x,E.y,0.5);

    float f=1.0/T.x;

    float g=Q.r*6.5;

    vec3 h;
    float i=1.0;
    for(float i=0.0;i<g;i++){
        vec2 j=vec2(E.x+f*5.0,E.y+f*5.0);
        vec3 k = texture(b, j).rgb;
        h=h+k*vec3(0.55);
    }
    h=h+L+L;

    vec3 l = h/i;

    l=e*l+(vec3(0.5)-l);

    //if(length(l)<0.2){
    //    l=vec3(length(l)*3.5);
    //}

    outColor = vec4(l, 1.0);

}
