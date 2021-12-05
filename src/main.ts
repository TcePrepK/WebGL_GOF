import { globalVariables } from "./game/core/globalVariables";
import { Core } from "./game/shaders/shader";

const canvas = document.createElement("canvas");
canvas.width = globalVariables.width;
canvas.height = globalVariables.height;

document.body.appendChild(canvas);
const gl = canvas.getContext("webgl");

// Libraries

// @ts-ignore
globalVariables.path = window.path;

// @ts-ignore
delete window.path;

// Libraries

globalVariables.canvas = canvas;
globalVariables.gl = gl;

if (!gl) {
    console.error(
        "Unable to initialize WebGL. Your browser or machine may not support it."
    );
}

const projectPath = globalVariables.path.resolve();
globalVariables.projectPath = projectPath;

const core = new Core();
globalVariables.core = core;

core.start();
