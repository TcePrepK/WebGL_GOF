import { DisplayShader } from "../shaders/displayShader";
import { GameShader } from "../shaders/gameShader";
import { globalVariables } from "./globalVariables";
import { Vector } from "./vector";

export class MasterRenderer {
    private gl: WebGLRenderingContext;

    private displayShader: DisplayShader;
    private gameShader: GameShader;

    private displayBuffer: WebGLBuffer;
    private frameBuffer: WebGLFramebuffer;

    private oldColorAttachment: WebGLTexture;

    private offset: Vector = new Vector(0, 0);

    public WIDTH: number = globalVariables.width;
    public HEIGHT: number = globalVariables.height;

    public constructor(gl: WebGLRenderingContext) {
        this.gl = gl;

        this.displayShader = new DisplayShader(gl);
        this.gameShader = new GameShader(gl);

        this.displayBuffer = this.createDisplayBuffer();
        this.frameBuffer = this.createFrameBuffer();

        // create buffer that holds width * height * 4 bytes of 1
        this.oldColorAttachment = this.create2DTexture(
            this.createRandomBoard()
        );

        this.gameShader.start();
        this.gameShader.loadResolution();
        this.gameShader.loadTextures();
        this.gameShader.stop();

        this.displayShader.start();
        this.displayShader.loadResolution();
        this.displayShader.loadTextures();
        this.displayShader.stop();

        window.addEventListener(
            "mousedown",
            function () {
                this.oldColorAttachment = this.create2DTexture(
                    this.createRandomBoard()
                );
            }.bind(this)
        );
    }

    private createRandomBoard(): Uint8Array {
        const pixels = new Uint8Array(this.WIDTH * this.HEIGHT * 4);
        for (let i = 0; i < pixels.length; i++) {
            const r = Math.random();
            pixels[i] = r < 0.5 ? 0 : 255;
        }

        return pixels;
    }

    private createDisplayBuffer(): WebGLBuffer {
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        return vertexBuffer;
    }

    private prepare(): void {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public render(): void {
        const gl = this.gl;
        this.prepare();

        this.bindFrameBuffer();

        const colorBuffer = this.createColorBuffer();

        // Game
        this.gameShader.start();

        this.gameShader.loadOffset(this.offset);
        gl.bindTexture(gl.TEXTURE_2D, this.oldColorAttachment);
        this.drawDisplay(this.gameShader.position);

        this.gameShader.stop();
        // Game

        this.unbindFrameBuffer();

        // Display
        this.displayShader.start();

        gl.bindTexture(gl.TEXTURE_2D, colorBuffer);
        this.drawDisplay(this.displayShader.position);

        this.displayShader.stop();
        // Display

        gl.deleteTexture(this.oldColorAttachment);
        this.oldColorAttachment = colorBuffer;
    }

    private drawDisplay(position: number): void {
        const gl = this.gl;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.displayBuffer);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(position);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    private bindFrameBuffer(): void {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
    }

    private unbindFrameBuffer(): void {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    private createColorBuffer(): WebGLRenderbuffer {
        const gl = this.gl;
        const texture = this.create2DTexture(null);

        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            texture,
            0
        );

        return texture;
    }

    private createFrameBuffer(): WebGLFramebuffer {
        const gl = this.gl;
        const frameBuffer = gl.createFramebuffer();
        return frameBuffer;
    }

    private create2DTexture(pixels: ArrayBufferView): WebGLTexture {
        const gl = this.gl;
        const texture = this.gl.createTexture();
        const width = this.WIDTH;
        const height = this.HEIGHT;

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            width,
            height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixels
        );

        gl.bindTexture(gl.TEXTURE_2D, null);

        return texture;
    }
}
