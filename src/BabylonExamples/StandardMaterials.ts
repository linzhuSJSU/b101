import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, StandardMaterial, Texture } from "@babylonjs/core"

export class StandardMaterials {

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

    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
        "ground", 
        { width: 10, height: 10 }, 
        this.scene
    );

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    
    ball.position.y = 1;


    ground.material = this.CreateGoundMaterial();
    ball.material = this.CreateBallMaterial();

    return scene;
}

CreateGoundMaterial(): StandardMaterial {
    const groundMat = new StandardMaterial("groundMat", this.scene);
    const uvScale = 4;
    const texArray: Texture[] = [];

    //create diffuse texture and assign it to ground diffuse texture then push it to texArray
    const diffuseTex = new Texture("./textures/stone/stone_diffuse.jpg", this.scene);
    groundMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    //create normal texture and assign it to ground bump texture then push it to texArray
    const normalTex = new Texture("./textures/stone/stone_normal.jpg", this.scene);
    groundMat.bumpTexture = normalTex;
    texArray.push(normalTex);

    //create ambient texture and assign it to ground ambient texture then push it to texArray
    const aotTex = new Texture("./textures/stone/stone_ao.jpg", this.scene);
    groundMat.ambientTexture = aotTex;
    texArray.push(aotTex);

    //create specular texture and assign it to ground specular texture then push it to texArray
    const specTex = new Texture("./textures/stone/stone_spec.jpg", this.scene);
    groundMat.specularTexture = specTex;
    texArray.push(specTex);

    texArray.forEach((tex) => {
        tex.uScale = uvScale;
        tex.vScale = uvScale;
    });
    return groundMat;
}

CreateBallMaterial(): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    const uvScale = 2;
    const texArray: Texture[] = [];

    //create diffuse texture and assign it to ball diffuse texture then push it to texArray
    const diffuseTex = new Texture("./textures/metal/metal_diffuse.jpg", this.scene);
    ballMat.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    //create normal texture and assign it to ball bump texture then push it to texArray
    const normalTex = new Texture("./textures/metal/metal_normal.jpg", this.scene);
    ballMat.bumpTexture = normalTex;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    texArray.push(normalTex);

    //create ambient texture and assign it to ball ambient texture then push it to texArray
    const aotTex = new Texture("./textures/metal/metal_ao.jpg", this.scene);
    ballMat.ambientTexture = aotTex;
    texArray.push(aotTex);

    //create specular texture and assign it to ball specular texture then push it to texArray
    const specTex = new Texture("./textures/metal/metal_spec.jpg", this.scene);
    ballMat.specularTexture = specTex;
    ballMat.specularPower = 10;
    texArray.push(specTex);

    texArray.forEach((tex) => {
        tex.uScale = uvScale;
        tex.vScale = uvScale;
    });



    return ballMat;
}
}