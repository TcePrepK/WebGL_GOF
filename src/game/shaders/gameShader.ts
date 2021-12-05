import { ShaderProgram } from "../core/shaderProgram";
import { Vector } from "../core/vector";

export class GameShader extends ShaderProgram {
    public position: number;

    public texture: WebGLUniformLocation;
    public resolution: WebGLUniformLocation;
    public offset: WebGLUniformLocation;

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
        this.offset = this.getUniformLocation("offset");
    }

    public loadResolution(): void {
        this.load2DVector(
            this.resolution,
            new Vector(this.gl.canvas.width, this.gl.canvas.height)
        );
    }

    public loadOffset(offset: Vector): void {
        this.load2DVector(this.offset, offset);
    }

    public loadTextures(): void {
        this.loadInt(this.texture, 0);
    }
}
