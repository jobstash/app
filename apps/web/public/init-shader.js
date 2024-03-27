

document.addEventListener("DOMContentLoaded", (event) => {
shaderWebBackground.shade({
    shaders: {
        image: {
        uniforms: {
            iTime: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000)
        }
        }
    }
    });
});