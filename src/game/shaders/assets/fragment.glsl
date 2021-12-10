precision highp float;

uniform sampler2D texture;
uniform vec2 resolution;
uniform bool displayMode;
uniform float iter;

void display() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv.y = 1.0 - uv.y;

    gl_FragColor = texture2D(texture, uv);
}

void step() {
    float width = resolution.x / 2.0;
    float height = resolution.y / 2.0;

    vec2 pos = gl_FragCoord.xy - vec2(width, height);
    vec2 vel = normalize(pos);

    for (float i = 0.0; i < 1000000.0; i++) {
        if (i == iter) {
            break;
        }

        pos += vel;
        
        if (pos.x > width || pos.x < -width) {
            pos -= vel;
            vel.x = -vel.x;
            pos += vel;
        }

        if (pos.y > height || pos.y < -height) {
            pos -= vel;
            vel.y = -vel.y;
            pos += vel;
        }
    }

    gl_FragColor = vec4(abs(pos) / vec2(width, height), 0.0, 1.0);
}

void main() {
    if (displayMode) {
        display();
    } else {
        step();
    }
}