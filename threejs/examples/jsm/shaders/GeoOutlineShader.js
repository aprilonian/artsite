/**
 * Simple test shader
 */

const GeoOutlineShader = {

	uniforms: {
		'size' : {value: null}, // Must be vector3
		'thickness' : {value: 0.01},
		'smoothness' : {value: 0.1},
	},

	vertexShader: /* glsl */`

		varying vec3 vPos;

		void main()	{
			vPos = position;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
		}`,

	fragmentShader: /* glsl */`

		varying vec3 vPos;

		uniform vec3 size;
		uniform float thickness;
		uniform float smoothness;
	
		void main() {
				
			float a = smoothstep(thickness, thickness + smoothness, length(abs(vPos.xy) - size.xy));
			a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.yz) - size.yz));
			a *= smoothstep(thickness, thickness + smoothness, length(abs(vPos.xz) - size.xz));
			
			vec3 c = mix(vec3(1), vec3(0), a);
			
			gl_FragColor = vec4(c, 1.0);
		}`

};

export { GeoOutlineShader };