precision highp float;

uniform float time;
uniform vec2 resolution;

varying vec2 vUv;

const int MAX_ITER = 100;
const float MIN_DIST = 0.001;
const float BAIL_OUT = 2.0;

vec3 mandelbulb(vec3 p) {
    vec3 z = p;
    float dr = 1.0;
    float r = length(z);
    float theta = acos(z.z / r);
    float phi = atan(z.y, z.x);
    for (int i = 0; i < MAX_ITER; i++) {
        float zr = length(z);
        if (zr > BAIL_OUT) break;
        float power = 8.0;
        theta = theta * power;
        phi = phi * power;
        dr = pow(zr, power - 1.0) * power * dr + 1.0;
        float x = zr * sin(theta) * cos(phi);
        float y = zr * sin(phi) * sin(theta);
        float z = zr * cos(theta);
        z = vec3(x, y, z) + p;
        r = length(z);
    }
    return vec3(0.5) * log(r) * r / dr;
}

void main(void) {
    vec3 rayDirection = normalize(vec3((vUv * 2.0 - 1.0) * vec2(1.0, resolution.y / resolution.x), 1.0));
    vec3 cameraPos = vec3(0.0, 0.0, -2.0);
    vec3 rayOrigin = cameraPos;

    vec3 color = mandelbulb(rayOrigin + rayDirection * 1.0);

    gl_FragColor = vec4(color, 1.0);
}
