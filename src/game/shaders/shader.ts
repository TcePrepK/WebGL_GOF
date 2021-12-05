import { globalVariables } from "../core/globalVariables";
import { MasterRenderer } from "../core/masterRenderer";

export class Core {
    private gl: WebGLRenderingContext;
    private masterRenderer: MasterRenderer;

    public start(): void {
        this.gl = globalVariables.gl;
        this.masterRenderer = new MasterRenderer(this.gl);

        this.loop();
    }

    private loop(): void {
        this.masterRenderer.render();

        requestAnimationFrame(this.loop.bind(this));
    }
}
