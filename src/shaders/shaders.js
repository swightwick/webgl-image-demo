export const vertexShader = `
  precision mediump float;
      
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    // cool effect on scroll
    vertexPosition.y += sin(((vertexPosition.x + 0.05) * 0.05) * 3.141592) * (sin(uPlaneDeformation / 270.0));
    vertexPosition.x += sin(((vertexPosition.y + 0.05) * 0.05) * 3.141592) * (sin(uPlaneDeformation / 90.0));
    vertexPosition.z += sin(((vertexPosition.x + 0.05) * 1.2) * 3.141592) * (sin(uPlaneDeformation /300.0));

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 2.0)).xy;
    
  }
`;

export const fragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D planeTexture;
  
  void main() {
    gl_FragColor = texture2D(planeTexture, vTextureCoord);
  }
`;
