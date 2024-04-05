setTimeout(() => {
  var time;

  var minDimension;
  var screenRatioHalfX;
  var screenRatioHalfY;

  var mouseX;
  var mouseY;

  var stMouseX;
  var stMouseY;

  var tiltLR = 0;
  var tiltFB = 0;
  var tiltFBDelta = null;

  var feedbackShiftVectorX;
  var feedbackShiftVectorY;

  var oldScrollY;

  var drawCenterX;
  var drawCenterY;

  const feedbackMouseShiftFactor = 0.003;
  const feedbackTiltShiftFactor = 0.0002;
  const backgroundParallaxScrollingFactor = 0.5;
  const blob1ColorPulseSpeed = 0.04;
  const blob2ColorPulseSpeed = 0.04;
  const blob2ColorPulseShift = 0.5;
  const drawCenterShiftDownScale = 0.99;

  var blob1Color;
  var blob2Color;

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

  const onWindowLoad = () =>
    new Promise((resolve) => {
      window.addEventListener('load', resolve);
    });

  function handleDeviceOrientationChange(event) {
    if (event.beta) {
      if (tiltFBDelta) {
        tiltFB = event.beta - tiltFBDelta;
      } else {
        // first reading or calibration
        tiltFBDelta = event.beta;
        tiltFB = 0;
      }
    }
    if (event.gamma) {
      tiltLR = event.gamma;
    }
  }

  const deviceOrientationEvent = 'deviceorientation';

  function trackDeviceOrientation() {
    window.addEventListener(
      deviceOrientationEvent,
      handleDeviceOrientationChange,
      false,
    );
  }

  function untrackDeviceOrientation() {
    window.removeEventListener(
      deviceOrientationEvent,
      handleDeviceOrientationChange,
      false,
    );
  }

  function calibrateDeviceOrientation() {
    tiltFBDelta = null;
  }

  function initDeviceOrientation() {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response == 'granted') {
            tiltFBDelta = null;
            untrackDeviceOrientation(); // just in case it is subsequent attempt
            trackDeviceOrientation();
          }
        })
        .catch(console.error);
    } else {
      trackDeviceOrientation();
      tiltFBDelta = null;
    }
  }

  function maybeAddCalibrateDeviceOrientationAction() {
    if (window.DeviceOrientationEvent) {
      addControl(
        newButton('Calibrate Device Orientation', () =>
          initDeviceOrientation(),
        ),
      );
    }
  }

  function maybeAddActions() {
    maybeAddCalibrateDeviceOrientationAction();
    maybeAddFullScreenAction();
  }

  if (window.DeviceOrientationEvent) {
    if (!DeviceOrientationEvent.requestPermission) {
      trackDeviceOrientation();
    }
  }

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  onWindowLoad()
    .then(() =>
      Promise.all([
        loadScript('https://unpkg.com/screenfull/dist/screenfull.js'),
        loadScript('https://unpkg.com/nosleep.js/dist/NoSleep.min.js'),
      ]),
    )
    .then(maybeAddActions);

  shaderWebBackground.shade({
    onInit: (ctx) => {
      mouseX = ctx.cssWidth / 2;
      mouseY = ctx.cssHeight / 2;
      oldScrollY = window.scrollY;
      drawCenterX = 0;
      drawCenterY = 0;
    },
    onResize: (width, height) => {
      minDimension = Math.min(width, height);
      if (width >= height) {
        screenRatioHalfX = (height / width) * 0.5;
        screenRatioHalfY = 0.5;
      } else {
        screenRatioHalfX = 0.5;
        screenRatioHalfY = (width / height) * 0.5;
      }
    },
    onBeforeFrame: (ctx) => {
      stMouseX = (2 * ctx.toShaderX(mouseX) - ctx.width) / minDimension;
      stMouseY = (2 * ctx.toShaderY(mouseY) - ctx.height) / minDimension;
      time = performance.now() / 1000;
      const scrollY = window.scrollY;
      const scrollYDelta = scrollY - oldScrollY;
      if (scrollYDelta === 0) {
        feedbackShiftVectorY = 0;
      } else {
        feedbackShiftVectorY =
          (scrollYDelta / minDimension) *
          2 *
          ctx.cssPixelRatio *
          backgroundParallaxScrollingFactor;
        drawCenterY += feedbackShiftVectorY;
      }
      oldScrollY = scrollY;
      if (tiltFBDelta) {
        // we have device orientation readings, better than mouse
        feedbackShiftVectorX = tiltLR * feedbackTiltShiftFactor;
        feedbackShiftVectorY += tiltFB * -feedbackTiltShiftFactor;
      } else {
        feedbackShiftVectorX = stMouseX * feedbackMouseShiftFactor;
        feedbackShiftVectorY += stMouseY * feedbackMouseShiftFactor;
      }
      blob1Color = spectral_zucconi6((time * blob1ColorPulseSpeed) % 1);
      blob2Color = spectral_zucconi6(
        (time * blob2ColorPulseSpeed + blob2ColorPulseShift) % 1,
      );
    },
    shaders: {
      feedback: {
        uniforms: {
          iResolution: (gl, loc, ctx) =>
            gl.uniform2f(loc, ctx.width, ctx.height),
          iMinDimension: (gl, loc) => gl.uniform1f(loc, minDimension),
          iScreenRatioHalf: (gl, loc) =>
            gl.uniform2f(loc, screenRatioHalfX, screenRatioHalfY),
          iFeedbackZoomCenter: (gl, loc) => gl.uniform2f(loc, 0, 0),
          iFeedbackZoomRate: (gl, loc) => gl.uniform1f(loc, 0.001),
          iFeedbackShiftVector: (gl, loc) =>
            gl.uniform2f(loc, feedbackShiftVectorX, feedbackShiftVectorY),
          iFeedbackFadeRate: (gl, loc) => gl.uniform1f(loc, 0.999),
          iFeedbackColorShiftZoom: (gl, loc) => gl.uniform1f(loc, 0.2),
          iFeedbackColorShiftImpact: (gl, loc) => gl.uniform1f(loc, 0.004),
          iDrawCenter: (gl, loc) => gl.uniform2f(loc, drawCenterX, drawCenterY),
          iDrawIntensity: (gl, loc) => gl.uniform1f(loc, 0.35),
          iBlobEdgeSmoothing: (gl, loc) => gl.uniform1f(loc, 0.04),
          iBlob1Radius: (gl, loc) => gl.uniform1f(loc, 0.3),
          iBlob1PowFactor: (gl, loc) => gl.uniform1f(loc, 40),
          iBlob1Color: (gl, loc) =>
            gl.uniform3f(loc, blob1Color[0], blob1Color[1], blob1Color[2]),
          iBlob2Radius: (gl, loc) => gl.uniform1f(loc, 0.4),
          iBlob2PowFactor: (gl, loc) => gl.uniform1f(loc, 40),
          iBlob2Color: (gl, loc) =>
            gl.uniform3f(loc, blob2Color[0], blob2Color[1], blob2Color[2]),
          iColorShiftOfRadius: (gl, loc) => gl.uniform1f(loc, 0.5),
          iChannel0: (gl, loc, ctx) => ctx.texture(loc, ctx.buffers.feedback),
        },
      },
      image: {
        uniforms: {
          iResolution: (gl, loc, ctx) =>
            gl.uniform2f(loc, ctx.width, ctx.height),
          iChannel0: (gl, loc, ctx) => ctx.texture(loc, ctx.buffers.feedback),
        },
      },
    },
    onAfterFrame: () => {
      drawCenterY *= drawCenterShiftDownScale;
    },
    onError: (error, canvas) => {
      document.documentElement.classList.add('fallback-background');
      if (error instanceof shaderWebBackground.GlError) {
        console.log('Could not shade, adding fallback CSS classes:', error);
        // in regular web design we would just silently switch to fallback style
        window.alert(
          'The shader-web-background does not support your device/browser, therefore ' +
            'you cannot experience what is described here, try with another device',
        );
      } else {
        throw error;
      }
    },
  });
}, 1000);
