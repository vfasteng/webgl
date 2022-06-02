#version 300 es

in vec3 F;
in vec3 G;
in vec2 H;

uniform mat4 I;
uniform mat4 J;
uniform mat4 K;

uniform vec3 JPosition;

//attribute vec3 L;

//varying vec3 C;
//out vec3 D;
//out vec2 E;
out float Q;

void main(void) {
    gl_PointSize = 5.0;
    //glLineWidth = 3.0;

    vec4 KPosition = K*vec4(F, 1.);
    gl_Position = I*J*KPosition;

    vec3 S = vec3(1.0,1.0,1.0);
    Q = length(JPosition - KPosition.xyz)/15.0;
    //Q = KPosition.z;

    //C = L;
    /*E=H;

    vec3 M = vec3(0.3, 0.3, 0.3);
    vec3 N = vec3(0.4, 0.4, 0.4);
    vec3 O = normalize((J*vec4(1.0)).xyz);

    vec4 transformedNormal = K * vec4(G, 1.0);

    float P = max(dot(transformedNormal.xyz, O), 0.0);
    D = M + (N * P);*/

}
