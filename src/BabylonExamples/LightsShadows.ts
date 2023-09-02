import { Scene, Engine, FreeCamera, Vector3, SceneLoader, AbstractMesh, MeshBuilder, Light, LightGizmo, GizmoManager, HemisphericLight } from "@babylonjs/core"
import "@babylonjs/loaders";

export class LightsShadows {

    scene: Scene;
    engine: Engine;
    models!: AbstractMesh[];
    ball!: AbstractMesh;

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
        const camera = new FreeCamera("camera", new Vector3(0, 1, -6), this.scene);
        camera.attachControl();
        camera.speed = 0.10;
        camera.minZ = 0.1;



        return scene;
    }


    async CreateEnviroment(): Promise<void> {
        const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "LightingScene.glb");

        this.models = meshes;

        this.ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);

        this.ball.position = new Vector3(0, 1, -3);

        this.CreateLights();

    }

    CreateLights(): void {
        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
    }

    CreateGizmos(customLight: Light): void {
        const lightGizmo = new LightGizmo();
        lightGizmo.scaleRatio = 2;
        lightGizmo.light = customLight;

        const gizmoManager = new GizmoManager(this.scene);
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.usePointerToAttachGizmos = false;
        gizmoManager.attachToMesh(lightGizmo.attachedMesh);
    }


}