#version 300 es

in vec3 positions;
//in vec3 normals;
in vec2 texcoords;

//uniform mat4 projection;
//uniform mat4 camera;
uniform mat4 model;

//attribute vec3 color;

//varying vec3 vColor;
//out vec3 vLighting;
out vec2 vTexCoords;

void main(void) {
    gl_PointSize = 5.0;
    //glLineWidth = 3.0;

    gl_Position = model * vec4(positions, 1.);

    //vColor = color;
    vTexCoords=texcoords;

    ///vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    //vec3 directionalLightColor = vec3(0.4, 0.4, 0.4);
    //vec3 directionalVector = normalize((camera*vec4(1.0)).xyz);

    //vec4 transformedNormal = model * vec4(normals, 1.0);

    //float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    //vLighting = ambientLight + (directionalLightColor * directional);

}
