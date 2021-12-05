import { ShaderProgram } from "../core/shaderProgram";
import { Vector } from "../core/vector";

export class DisplayShader extends ShaderProgram {
    public position: number;
    public texture: WebGLUniformLocation;
    public resolution: WebGLUniformLocation;

    public constructor(gl: WebGLRenderingContext) {
        super(
            gl,
            "src/game/shaders/assets/displayVertex.glsl",
            "src/game/shaders/assets/displayFragment.glsl"
        );
    }

    protected getAllAttributeLocations(): void {
        this.position = this.getAttributeLocation("position");
    }

    protected getAllUniformLocations(): void {
        this.resolution = this.getUniformLocation("resolution");
        this.texture = this.getUniformLocation("texture");
    }

    public loadResolution(): void {
        this.load2DVector(
            this.resolution,
            new Vector(this.gl.canvas.width, this.gl.canvas.height)
        );
    }

    public loadTextures(): void {
        this.loadInt(this.texture, 0);
    }
}
