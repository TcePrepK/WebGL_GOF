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
    
    vec3 currentColor = texture2D(texture, pos / resolution.xy).rgb;
    float currentData = currentColor.r;
    bool alive = currentData > 0.0;

    float neighborDatas = 0.0;
    for (int i = -1; i < 2; i++) {
        for (int j = -1; j < 2; j++) {
            if (i == 0 && j == 0) continue;

            vec2 neighbor = pos + vec2(i, j);
            float neighborData = texture2D(texture, neighbor / resolution).r;

            neighborDatas += neighborData;
        }
    }

    bool nextAlive = false;
    if (alive) {
        if (neighborDatas >= 2.0 && neighborDatas <= 3.0) {
            nextAlive = true;
        } else {
            nextAlive = false;
        }
    } else if (neighborDatas >= 2.0 && neighborDatas <= 4.0) {
        nextAlive = true;
    }

    float nextData = 0.0;
    if (nextAlive) {
        nextData = currentData + 0.1;
    } else {
        nextData = currentData - 0.1;
    }

    gl_FragColor = vec4(nextData, nextData, nextData, 1.0);
}

void main() {
    if (displayMode) {
        display();
    } else {
        step();
    }
}