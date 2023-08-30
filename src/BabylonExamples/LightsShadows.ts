import { Scene, Engine, FreeCamera, Vector3, CubeTexture, SceneLoader, AbstractMesh } from "@babylonjs/core"
import "@babylonjs/loaders";

export class LightsShadows {

    scene: Scene;
    engine: Engine;
    models!: AbstractMesh[];

    constructor(private canvas:HTMLCanvasElement) {
        this.engine = new Engine(this.canvas, true);
        this.scene = this.createScene();
        this.CreateEnviroment();


        this.engine.runRenderLoop(() => {

            this.scene.render();
        });
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera", new Vector3(0, 1, -8), this.scene);
        camera.attachControl();
        camera.speed = 0.25;


        const envTex = CubeTexture.CreateFromPrefilteredData("./environment/sky.env", scene);
        scene.environmentTexture = envTex;
        scene.createDefaultSkybox(envTex, true);
        scene.environmentIntensity = 0.5;


        return scene;
    }


    async CreateEnviroment(): Promise<void> {
        const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "LightingScene.glb");

        this.models = meshes;

    }


}