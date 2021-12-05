import { PlatformPath } from "path";
import { Core } from "../shaders/shader";

export const globalVariables = {
    width: <number>window.innerWidth,
    height: <number>window.innerHeight - 4,

    projectPath: <string>null,

    path: <PlatformPath>null,

    core: <Core>null,

    canvas: <HTMLCanvasElement>null,
    gl: <WebGLRenderingContext>null,
};
