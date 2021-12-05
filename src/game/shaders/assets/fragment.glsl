precision highp float;

uniform sampler2D texture;
uniform vec2 resolution;
uniform vec2 offset;

const vec2 down = vec2(0.0, 1.0);

void main() {
    vec2 pos = gl_FragCoord.xy;
    
    bool alive = (texture2D(texture, pos / resolution).rgb == vec3(1.0));

    // loop around 8 sides of current position
    int aliveNeighbor = 0;
    for (int i = -1; i < 2; i++) {
        for (int j = -1; j < 2; j++) {
            if (i == 0 && j == 0) continue;

            vec2 neighbor = pos + vec2(i, j);
            vec3 neighborColor = texture2D(texture, neighbor / resolution).rgb;

            if (neighborColor == vec3(1.0)) {
                aliveNeighbor++;
            }
        }
    }

    if (alive) {
        if (aliveNeighbor == 3 || aliveNeighbor == 2) {
            alive = true;
        } else {
            alive = false;
        }
    } else if (aliveNeighbor == 3) {
        alive = true;
    }

    gl_FragColor = vec4(alive);
}