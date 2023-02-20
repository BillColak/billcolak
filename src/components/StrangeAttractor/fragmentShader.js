const fragmentShader = `
void main() {
  vec3 color = vec3(0.67, 0.56, 0.86);
  gl_FragColor = vec4(color, 1.0);
}
`

export default fragmentShader
