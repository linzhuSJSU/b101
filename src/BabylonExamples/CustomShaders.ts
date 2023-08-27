import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, ShaderMaterial } from "@babylonjs/core"

export class CustomShaders {

    scene: Scene;
    engine: Engine;

constructor(private canvas:HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();


    this.engine.runRenderLoop(() => {

        this.scene.render();
    });
}

createScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;


    const hemiLight = new HemisphericLight(
        "hemiLight",
        new Vector3(0, 1, 0),
        this.scene
    );

    hemiLight.intensity = 0.5;

    const plane = MeshBuilder.CreatePlane("plane", {size: 2}, this.scene);

    // Effect.ShadersStore['customVertexShader'] = `
    //     precision highp float;
    //     attribute vec3 position;
    //     uniform mat4 worldViewProjection;
        
    //     void main() {
    //         vec4 p = vec4(position, 1.);
    //         gl_Position = worldViewProjection * p;
    //     }
    // `;

    // Effect.ShadersStore['customFragmentShader'] = `
    //     precision highp float;

    //     void main() {
    //         gl_FragColor = vec4(1.,0.,0.,1.);
    //     }
    // `;

    //const shaderMaterial = new ShaderMaterial('custom', scene, './shaders/CUSTOM', {});

    const shaderMaterial = new ShaderMaterial(
        "mandelbulbMaterial",
        scene,
        {
            vertex: "./CUSTOM",
            fragment: "./CUSTOM",
        },
        {
            // No need to specify attributes or uniforms here for procedural content
        }
    );
    
    plane.material = shaderMaterial;

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    
    ball.position.y = 1;


    return scene;
}

}