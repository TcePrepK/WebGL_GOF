import * as fs from "fs";
import { globalVariables } from "./globalVariables";
import { Vector } from "./vector";

export abstract class ShaderProgram {
    gl: WebGLRenderingContext;
    shaderProgram: WebGLProgram;

    public constructor(
        gl: WebGLRenderingContext,
        vertexShaderPath: string,
        fragmentShaderPath: string
    ) {
        this.gl = gl;

        const path = globalVariables.path;
        const projectPath = globalVariables.projectPath;
        const fixVertexDir = path.join(projectPath, vertexShaderPath);
        const fixFragmentDir = path.join(projectPath, fragmentShaderPath);

        this.shaderProgram = this.initShaderProgram(
            fixVertexDir,
            fixFragmentDir
        );

        this.getAllAttributeLocations();
        this.getAllUniformLocations();
    }

    public start() {
        this.gl.useProgram(this.shaderProgram);
    }

    public stop() {
        this.gl.useProgram(null);
    }

    protected abstract getAllAttributeLocations(): void;
    protected abstract getAllUniformLocations(): void;

    protected getAttributeLocation(name: string): number {
        return this.gl.getAttribLocation(this.shaderProgram, name);
    }

    protected getUniformLocation(name: string): WebGLUniformLocation {
        return this.gl.getUniformLocation(this.shaderProgram, name);
    }

    protected loadFloat(location: WebGLUniformLocation, value: number): void {
        this.gl.uniform1f(location, value);
    }

    protected loadInt(location: WebGLUniformLocation, value: number): void {
        this.gl.uniform1i(location, value);
    }

    protected load2DVector(
        location: WebGLUniformLocation,
        vector: Vector
    ): void {
        this.gl.uniform2fv(location, [vector.x, vector.y]);
    }

    private initShaderProgram(
        vertexShaderPath: string,
        fragmentShaderPath: string
    ): WebGLProgram {
        const gl = this.gl;
        const vertexSource = fs.readFileSync(vertexShaderPath).toString();
        const fragmentSource = fs.readFileSync(fragmentShaderPath).toString();

        const vertexShader = this.loadShader(gl.VERTEX_SHADER, vertexSource);
        if (!vertexShader) {
            console.error(
                "Unable to find vertex shader at " + vertexShaderPath
            );
            return;
        }

        const fragmentShader = this.loadShader(
            gl.FRAGMENT_SHADER,
            fragmentSource
        );
        if (!fragmentShader) {
            console.error(
                "Unable to find fragment shader at " + fragmentShaderPath
            );
            return;
        }

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error(
                "Unable to initialize the shader program: " +
                    gl.getProgramInfoLog(shaderProgram)
            );
            return null;
        }

        return shaderProgram;
    }

    private loadShader(type: number, source: string): WebGLShader {
        const shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(
                "An error occurred compiling the shaders: " +
                    this.gl.getShaderInfoLog(shader)
            );
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
}
