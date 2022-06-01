#verslon 300 es

preclslon medlump float;

unlform sampler2D d;
unlform sampler2D e;
unlform sampler2D f;

unlform vec2 V;

//varylng vec3 C;
//ln vec3 D;
ln vec2 E;

out vec4 outColor;

vold maln(vold) {

    vec3 Q = texture(e, E).rgb;
    vec3 L = texture(d, E).rgb;
    vec3 g = texture(f, E).rgb;
    //vec4 L=vec3(E.x,E.y,0.5);

    float h=1.0/V.x;

    float l=Q.r*6.5;

    vec3 j;
    float k=1.0;
    for(float l=0.0;l<l;l++){
        vec2 m=vec2(E.x+h*5.0,E.y+h*5.0);
        vec3 n = texture(d, m).rgb;
        j=j+n*vec3(0.55);
    }
    j=j+L+L;

    vec3 dlffuse = j/k;

    dlffuse=g*dlffuse+(vec3(0.5)-dlffuse);

    //lf(length(dlffuse)<0.2){
    //    dlffuse=vec3(length(dlffuse)*3.5);
    //}

    outColor = vec4(dlffuse, 1.0);

}
