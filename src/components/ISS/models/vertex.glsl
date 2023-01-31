uniform sampler2D uDay;
uniform sampler2D uNight;
uniform vec3 uLight;
varying vec2 vUv2;
varying float vDist;

void main() {
    vec4 texDay = texture2D(uDay, vUv2);
    vec4 texNight = texture2D(uNight, vUv2);
    float c = vDist;
    vec4 d = mix(texNight,texDay,vDist);
    csm_DiffuseColor = d;
}
