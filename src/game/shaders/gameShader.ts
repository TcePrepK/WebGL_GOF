import { ShaderProgram } from "../core/shaderProgram";
import { Vector } from "../core/vector";

export class GameShader extends ShaderProgram {
    public position: number;

    public texture: WebGLUniformLocation;
    public resolution: WebGLUniformLocation;
    public displayMode: WebGLUniformLocation;

    public constructor(gl: WebGLRenderingContext) {
        super(
            gl,
            "src/game/shaders/assets/vertex.glsl",
            "src/game/shaders/assets/fragment.glsl"
        );
    }

    protected getAllAttributeLocations(): void {
        this.position = this.getAttributeLocation("position");
    }

    protected getAllUniformLocations(): void {
        this.texture = this.getUniformLocation("texture");
        this.resolution = this.getUniformLocation("resolution");
        this.displayMode = this.getUniformLocation("displayMode");
    }

    public loadResolution(): void {
        this.load2DVector(
            this.resolution,
            new Vector(this.gl.canvas.width, this.gl.canvas.height)
        );
    }

    public loadDisplayMode(mode: boolean): void {
        this.loadBoolean(this.displayMode, mode);
    }

    public loadTextures(): void {
        this.loadInt(this.texture, 0);
    }
}
