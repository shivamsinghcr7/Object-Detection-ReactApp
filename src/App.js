import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { useRef } from "react";
import { DrawingBox } from "./DrawingBox.jsx";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runCocoSSD = async () => {
    const network = await cocossd.load();
    console.log("Model loaded...", network);

    //Loop and detect
    setInterval(() => {
      detectObject(network);
    }, 100);
  };

  const detectObject = async (network) => {
    if (
      typeof webcamRef !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video property
      const video = webcamRef.current.video;
      const videoHeight = video.videoHeight;
      const videoWidth = video.videoWidth;

      // Set video height and width
      webcamRef.current.video.height = videoHeight;
      webcamRef.current.video.width = videoWidth;

      // Set canvas width and height
      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      // Make Detection
      const obj = await network.detect(video);
      console.log(obj);

      // Draw the detection box
      const ctx = await canvasRef.current.getContext("2d");
      DrawingBox(obj, ctx);
    }
  };

  runCocoSSD();

  return (
    <div className="App">
      <div>
        <h1>Object Detection App</h1>
        <p>Used Reactjs, Tensorflowjs and React-Webcam</p>
      </div>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            zIndex: 9,
            width: 700,
            height: 800,
            textAlign: "center",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            zIndex: 9,
            width: 700,
            height: 800,
            textAlign: "center",
          }}
        />
      </header>
    </div>
  );
}

export default App;
