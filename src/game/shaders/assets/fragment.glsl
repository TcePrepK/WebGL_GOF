precision highp float;

uniform sampler2D texture;
uniform vec2 resolution;
uniform bool displayMode;

void display() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y = 1.0 - uv.y;

    gl_FragColor = texture2D(texture, uv);
}

void step() {
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

void main() {
    if (displayMode) {
        display();
    } else {
        step();
    }
}