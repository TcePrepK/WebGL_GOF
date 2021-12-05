precision highp float;

uniform sampler2D texture;
uniform vec2 resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y = 1.0 - uv.y;

    gl_FragColor = texture2D(texture, uv);
}