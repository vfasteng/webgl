#version 300 es

precision mediump float;

uniform sampler2D colorTexture;
uniform sampler2D depthTexture;
uniform sampler2D backgroundTexture;

uniform vec2 iResolution;

//varying vec3 vColor;
//in vec3 vLighting;
in vec2 vTexCoords;

out vec4 outColor;

void main(void) {

    vec3 depth = texture(depthTexture, vTexCoords).rgb;
    vec3 color = texture(colorTexture, vTexCoords).rgb;
    vec3 back = texture(backgroundTexture, vTexCoords).rgb;
    //vec4 color=vec3(vTexCoords.x,vTexCoords.y,0.5);

    float pixel=1.0/iResolution.x;

    float deep=depth.r*6.5;

    vec3 sum;
    float count=1.0;
    for(float i=0.0;i<deep;i++){
        vec2 coords=vec2(vTexCoords.x+pixel*5.0,vTexCoords.y+pixel*5.0);
        vec3 col = texture(colorTexture, coords).rgb;
        sum=sum+col*vec3(0.55);
    }
    sum=sum+color+color;

    vec3 diffuse = sum/count;

    diffuse=back*diffuse+(vec3(0.5)-diffuse);

    //if(length(diffuse)<0.2){
    //    diffuse=vec3(length(diffuse)*3.5);
    //}

    outColor = vec4(diffuse, 1.0);

}
