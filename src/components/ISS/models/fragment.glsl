uniform vec3 uLight;
varying vec2 vUv2;
varying float vDist;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vUv2 = uv;
    vDist = clamp(pow(map((dot(normalize(uLight) * vec3(-1.,1.,-1.) , position) * 2.), -1.0, 1.0, 0.0, 1.0), 2.), 0., 1.);
}
