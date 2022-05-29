#version 300 es

in vec3 F;
in vec3 G;
in vec2 H;

uniform mat4 I;
uniform mat4 J;
uniform mat4 K;

//attribute vec3 L;

//varying vec3 C;
out vec3 D;
out vec2 E;

void main(void) {
    gl_PointSize = 5.0;
    //glLineWidth = 3.0;

    gl_Position = I*J*K*vec4(F, 1.);

    //C = L;
    E=H;

    vec3 M = vec3(0.3, 0.3, 0.3);
    vec3 N = vec3(0.4, 0.4, 0.4);
    vec3 O = normalize((J*vec4(1.0)).xyz);

    vec4 transformedNormal = K * vec4(G, 1.0);

    float P = max(dot(transformedNormal.xyz, O), 0.0);
    D = M + (N * P);

}
