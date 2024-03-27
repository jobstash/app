setTimeout(() => {

  console.log('inner-timeout!')
  shaderWebBackground.shade({
    shaders: {
      image: {
        uniforms: {
          iTime: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000),
        },
      },
    },
  });
}, 5000);
console.log('timeout!')