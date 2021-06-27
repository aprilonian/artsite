import * as THREE from '../build/three.module.js';

const MStylizedFabric = {

	uniforms: {
		// "c":   { type: "f", value: 1.0 },
		// "p":   { type: "f", value: 1.4 },
		"baseColor"	: { value: new THREE.TextureLoader().load( "../models/textures/transPattern.jpg") },
		"color"		: { value: new THREE.Color(0xcccccc) },
		"glowColor" : { value: new THREE.Color(0x666666) },
	},

	vertexShader: /* glsl */`

		varying vec3 vNormal;
		varying vec3 eyeVector;
		varying vec2 vUv;

		void main() 
		{
			vUv = uv;

			vec3 newPosition = position;
			vec4 worldPosition = modelMatrix * vec4( newPosition, 1.0 );
			eyeVector = normalize(worldPosition.xyz - cameraPosition);

			vNormal = normalize( normalMatrix * normal );
			
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}
	`,

	fragmentShader: /* glsl */`

		varying vec3 vNormal;
		varying vec3 eyeVector;
		varying vec2 vUv;

		uniform sampler2D baseColor;
		uniform vec3 color;
		uniform vec3 glowColor;

		void main() {
			
			float fresnel = abs( 1.0 + dot(eyeVector, vNormal));
			vec4 t = texture2D( baseColor, vUv );
			vec3 finalColor = (color * vec3(t)) + ( glowColor * fresnel );
			
			gl_FragColor = vec4(finalColor,1.0);
			
		}
	`

};

export { MStylizedFabric };