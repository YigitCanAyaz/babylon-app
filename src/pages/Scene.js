import React from "react";
import * as BABYLON from "@babylonjs/core";
import SceneComponent from "../components/SceneComponent";
import { GLTFFileLoader } from "@babylonjs/loaders/glTF"
// import { OBJFileLoader } from '@babylonjs/loaders'
import { ModelHandler } from "../components/inputs/ModelHandler";
import { TextureHandler } from "../components/inputs/TextureHandler";
import { MeshDropDown } from "../components/dropDowns/MeshDropDown";
import { ColorPickerHandler } from "../components/inputs/ColorPickerHandler";
import { FirstAnimationButton } from "../components/buttons/FirstAnimationButton";
import { SecondAnimationButton } from "../components/buttons/SecondAnimationButton";
import { ThirdAnimationButton } from "../components/buttons/ThirdAnimationButton";
import { PlayAnimationButton } from "../components/buttons/PlayAnimationButton";
import { circleOfConfusionPixelShader } from "@babylonjs/core/Shaders/circleOfConfusion.fragment";


let box;
var camera;
var light;
var colorMaterial;
var flag = false;
var count = 1;
var gizmo;
var utilLayer;
var boundingBox;
var myScene;
var colorPicker;


let firstAnimationPosition, firstAnimationRotation;
let secondAnimationPosition, secondAnimationRotation;
let thirdAnimationPosition, thirdAnimationRotation;

const onSceneReady = async (scene) => {

    myScene = scene;

    GLTFFileLoader.IncrementalLoading = false;

    myScene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com//textures/country.env", scene);
    myScene.createDefaultSkybox(myScene.environmentTexture);

    camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 10, BABYLON.Vector3(-6, 0, 0), myScene);
    const canvas = myScene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);

    camera.wheelPrecision = 15; //Mouse wheel speed
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 50;

    light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), myScene);

    light.intensity = 0.7;

    colorMaterial = new BABYLON.StandardMaterial("colorMaterial", myScene);
    colorPicker = document.getElementById("colorPicker");
    colorPicker.value = colorMaterial.diffuseColor;
};

const handleModelSelect = (evt) => {
    if (flag === false) {
        flag = true;
    } else {
        const dropDownList = document.getElementById('meshDropDown');
        while (dropDownList.options.length > 0) {
            dropDownList.remove(0);
        }
        myScene.getMeshByName("box").dispose();
        gizmo.dispose();
        utilLayer.dispose();
        boundingBox.dispose();
    }
    var files = evt.target.files;
    const url = URL.createObjectURL(files[0]);
    BABYLON.SceneLoader.Append(url, "", myScene, function (scene) {
        let mesh = myScene.meshes[count];
        let meshParent = mesh.getChildMeshes()[0];
        mesh.position = new BABYLON.Vector3(-6, 0, 0);

        var gltfMesh = mesh;
        boundingBox = BABYLON.BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(gltfMesh);

        // Create bounding box gizmo
        utilLayer = new BABYLON.UtilityLayerRenderer(scene)
        utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
        gizmo = new BABYLON.GizmoManager(scene);
        gizmo.boundingBoxGizmoEnabled = true;
        gizmo.positionGizmoEnabled = true;
        gizmo.gizmos.boundingBoxGizmo.fixedDragMeshScreenSize = true


        gizmo.attachedMesh = boundingBox;
        var dragobserver = new BABYLON.PointerDragBehavior();
        boundingBox.addBehavior(dragobserver);

        boundingBox.rotationQuaternion = new BABYLON.Quaternion();
        const dropDownList = document.getElementById('meshDropDown');

        console.log(gizmo);

        mesh.getChildMeshes().forEach((childMeshes) => {
            var option = document.createElement("option");
            option.value = childMeshes.id;
            option.text = childMeshes.id.charAt(0).toUpperCase() + childMeshes.id.slice(1);
            console.log(option)
            dropDownList.appendChild(option);
        });

    }, null, null, ".glb");

}

const handleTextureSelect = (evt) => {
    let files = evt.target.files;
    let url = URL.createObjectURL(files[0]);
    // let mesh = scene.meshes[count];
    var textureMaterial = new BABYLON.StandardMaterial("textureMaterial", myScene);
    textureMaterial.diffuseTexture = new BABYLON.Texture(url);
    var selectList = document.getElementById("meshDropDown");
    var childMesh = myScene.getMeshByName(selectList.value);
    childMesh.material = textureMaterial;
}

const changeColorOfMesh = () => {
    const selectedColor = BABYLON.Color3.FromHexString(colorPicker.value);
    var color = colorMaterial.diffuseColor.copyFrom(selectedColor);
    var colorMat = new BABYLON.StandardMaterial("colorMat", myScene);
    colorMat.diffuseColor.copyFrom(color);
    var selectList = document.getElementById("meshDropDown");
    var childMesh = myScene.getMeshByName(selectList.value);
    childMesh.material = colorMat;
}

const toggleFirstAnimationButton = () => {
    let mesh = boundingBox;
    var eular = boundingBox.rotationQuaternion.toEulerAngles();
    firstAnimationPosition = new BABYLON.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    firstAnimationRotation = new BABYLON.Vector3(eular.x, eular.y, eular.z);
    console.log(firstAnimationPosition);
    console.log(firstAnimationRotation);
}

const toggleSecondAnimationButton = () => {
    let mesh = boundingBox;
    var eular = boundingBox.rotationQuaternion.toEulerAngles();
    secondAnimationPosition = new BABYLON.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    secondAnimationRotation = new BABYLON.Vector3(eular.x, eular.y, eular.z);
    console.log(secondAnimationPosition);
    console.log(secondAnimationRotation);
}

const toggleThirdAnimationButton = () => {
    let mesh = boundingBox;
    var eular = boundingBox.rotationQuaternion.toEulerAngles();
    thirdAnimationPosition = new BABYLON.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    thirdAnimationRotation = new BABYLON.Vector3(eular.x, eular.y, eular.z);
    console.log(thirdAnimationPosition);
    console.log(thirdAnimationRotation);
}

const makeAnimation = () => {

    const frameRate = 10;

    var animationPosition = new BABYLON.Animation("animationPosition", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    const animationRotation = new BABYLON.Animation("animationRotation", "rotation", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

    var keyFramesPosition = [];
    let keyFramesRotation = [];


    // for position

    keyFramesPosition.push({
        frame: 0,
        value: 0
    });

    keyFramesPosition.push({
        frame: frameRate,
        value: firstAnimationPosition
    });

    keyFramesPosition.push({
        frame: frameRate * 2,
        value: secondAnimationPosition
    });

    keyFramesPosition.push({
        frame: frameRate * 3,
        value: thirdAnimationPosition
    });

    animationPosition.setKeys(keyFramesPosition);

    // for rotation

    keyFramesRotation.push({
        frame: 0,
        value: 0
    });

    keyFramesRotation.push({
        frame: frameRate,
        value: firstAnimationRotation
    });

    keyFramesRotation.push({
        frame: frameRate * 2,
        value: secondAnimationRotation
    });

    keyFramesRotation.push({
        frame: frameRate * 3,
        value: thirdAnimationRotation
    });

    animationRotation.setKeys(keyFramesRotation);

    let mesh = boundingBox;

    mesh.animations = [];
    mesh.animations.push(animationPosition);
    mesh.animations.push(animationRotation);

    myScene.beginAnimation(mesh, 0, 3 * frameRate, false);

    // mesh.position = new BABYLON.Vector3(-6, 0, 0);

}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene) => {
    if (box !== undefined) {
        var deltaTimeInMillis = scene.getEngine().getDeltaTime();

        const rpm = 10;
        box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
};

export default () => (

    <div className="position-relative">

        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="my-canvas" style={{ width: window.innerWidth, height: 'window.innerHeight', outline: 'none' }} />

        <ModelHandler modelHandler={handleModelSelect} />

        <TextureHandler textureHandler={handleTextureSelect} />

        <ColorPickerHandler colorPickerHandler={changeColorOfMesh} />

        <MeshDropDown />

        <div className="container position-absolute bottom-0 mb-5 text-center">

            <div className="row" style={{ "marginRight": "450px" }}>

                <FirstAnimationButton firstAnimationButton={toggleFirstAnimationButton} />

                <SecondAnimationButton secondAnimationButton={toggleSecondAnimationButton} />

                <ThirdAnimationButton thirdAnimationButton={toggleThirdAnimationButton} />

            </div>

        </div>

        <PlayAnimationButton playAnimationButton={makeAnimation} />

    </div>
);

