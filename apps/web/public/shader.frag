precision highp float;

uniform float iTime;

void main() {
gl_FragColor = vec4(
    mod(gl_FragCoord.x / 256., 1.),
    mod((gl_FragCoord.x + gl_FragCoord.y - iTime * 40.) / 256. , 1.),
    mod(gl_FragCoord.y / 256., 1.),
    1.
);
}