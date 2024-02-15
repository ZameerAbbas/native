// import React, { useState, useEffect } from 'react';
// import { View, Text, Image } from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { io } from '@tensorflow/tfjs';
// import { decode } from 'base64-arraybuffer'; // Import a library for decoding base64 strings

// export default function ImageClassifier() {
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const imagePath = '../assets/applescab.jpg'; // Replace with the path to your image

//   useEffect(() => {
//     // Load the model
//     async function loadModel() {
//       try {
//         const modelJsonUri = '../models/model.json'; // Adjust the path as needed
//         const modelBinUris = []; // Array to hold paths to .bin files

//         // Adjust the paths to the .bin files based on your naming convention
//         for (let i = 1; i < 32; i++) {
//           modelBinUris.push(`group1-shard${i}of32.bin`);
//         }

//         const model = await tf.loadLayersModel(tf.io.modelFromJSON(modelJsonUri));

//         // Load the weights individually
//         for (let i = 1; i < modelBinUris.length; i++) {
//           await model.weights[i].load(modelBinUris[i]);
//         }

//         setModel(model);
//       } catch (error) {
//         console.error('Error loading the model:', error);
//       }
//     }
//     loadModel();
//   }, []);

//   useEffect(() => {
//     if (model) {
//       classifyImages();
//     }
//   }, [model]);

//   const classifyImages = async () => {
//     // Process the image and pass it to the model for prediction
//     try {
//       const imageArray = await processImage(imagePath);
//       const predictions = await model.predict(tf.tensor([imageArray])).data();
//       setPredictions(predictions);
//     } catch (error) {
//       console.error('Error processing or predicting:', error);
//     }
//   };

//   // Function to process the image
  const processImage = async (base64String) => {
    // Decode the base64 string to bytes
    const bytes = decode(base64String);

    // Create an Image component with the base64 string
    const image = new Image();
    image.src = `data:applescab.jpg;base64,${base64String}`;

    // Wait for the image to load
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });

    // Create a canvas element to manipulate the image
    const canvas = document.createElement('canvas');
    canvas.width = 224;
    canvas.height = 224;

    // Draw the image on the canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, 224, 224);

    // Get the pixel data from the canvas
    const imageData = ctx.getImageData(0, 0, 224, 224);

    // Convert the pixel data to an array
    const pixels = new Float32Array(imageData.data);

    // Normalize the pixel values to the range [0, 1]
    const imageArray = pixels.map((pixel) => pixel / 255.0);

    return imageArray;
  };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {/* Your UI components here */}
//     </View>
//   );
// }

  // Code that works fine...

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image } from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';

// // Define the JSONHandler class
// class JSONHandler {
//   constructor(jsonString) {
//     this.jsonString = jsonString;
//   }

//   async load() {
//     try {
//       const modelJSON = JSON.parse(this.jsonString);
//       const modelArtifacts = {
//         modelTopology: modelJSON.modelTopology,
//         format: modelJSON.format,
//         generatedBy: modelJSON.generatedBy,
//         convertedBy: modelJSON.convertedBy
//       };
//       if (modelJSON.weightsManifest != null) {
//         // Load weights if they exist (you can add code here)
//       }
//       if (modelJSON.trainingConfig != null) {
//         modelArtifacts.trainingConfig = modelJSON.trainingConfig;
//       }
//       if (modelJSON.userDefinedMetadata != null) {
//         modelArtifacts.userDefinedMetadata = modelJSON.userDefinedMetadata;
//       }
//       return modelArtifacts;
//     } catch (error) {
//       console.error('Error loading model JSON:', error);
//       throw error; // Propagate the error
//     }
//   }
// }

// export default function ImageClassifier() {
//   const [model, setModel] = useState(null);
//   const [predictions, setPredictions] = useState([]);
//   const imagePath = '../assets/applescab.jpg'; // Replace with the path to your image

//   useEffect(() => {
//     // Load the model and initialize TensorFlow.js
//     async function initializeModel() {
//       try {
//         await tf.ready(); // Ensure TensorFlow.js is ready
//         const modelJson = require('../models/model.json'); // Replace with the path to your model JSON file
//         const handler = new JSONHandler(JSON.stringify(modelJson)); // Convert to string before passing to handler
//         const loadedModel = await tf.loadLayersModel(handler);
//         setModel(loadedModel);
//         console.log("Model loaded successfully...")
//       } catch (error) {
//         console.error('Error loading the model:', error);
//       }
//     }
//     initializeModel();
//   }, []);

//   useEffect(() => {
//     if (model) {
//       classifyImages();
//     }
//   }, [model]);

//   const classifyImages = async () => {
//     // Process the image and pass it to the model for prediction
//     try {
//       const imageArray = await processImage(imagePath);
//       const predictions = await model.predict(tf.tensor([imageArray])).data();
//       setPredictions(predictions);
//     } catch (error) {
//       console.error('Error processing or predicting:', error);
//     }
//   };

//   // Function to process the image
//   const processImage = async (base64String) => {
//     // Add your image processing logic here
//     // Ensure the image processing logic is correct and returns the image array
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
//       {model ? (
//         <Text style={{color: 'white'}}>Model Loaded Successfully!</Text>
//       ) : (
//         <Text>Loading Model...</Text>
//       )}
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { decode } from 'base64-arraybuffer';

const class_names = [
  'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
  'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
  'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
  'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
  'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
  'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
  'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
  'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
  'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
];

// Define the JSONHandler class
class JSONHandler {
  constructor(jsonString) {
    this.jsonString = jsonString;
  }

  async load() {
    try {
      const modelJSON = JSON.parse(this.jsonString);
      const modelArtifacts = {
        modelTopology: modelJSON.modelTopology,
        format: modelJSON.format,
        generatedBy: modelJSON.generatedBy,
        convertedBy: modelJSON.convertedBy
      };
      if (modelJSON.weightsManifest != null) {
        // Load weights if they exist (you can add code here)
      }
      if (modelJSON.trainingConfig != null) {
        modelArtifacts.trainingConfig = modelJSON.trainingConfig;
      }
      if (modelJSON.userDefinedMetadata != null) {
        modelArtifacts.userDefinedMetadata = modelJSON.userDefinedMetadata;
      }
      return modelArtifacts;
    } catch (error) {
      console.error('Error loading model JSON:', error);
      throw error; // Propagate the error
    }
  }
}

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [Label, setLabel] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added state for loading indicator

  const imagePath = '../assets/applescab.jpg'; // Replace with the path to your image

  useEffect(() => {
    // Load the model and initialize TensorFlow.js
    async function initializeModel() {
      try {
        await tf.ready(); // Ensure TensorFlow.js is ready
        const modelJson = require('../models/model.json'); // Replace with the path to your model JSON file
        const handler = new JSONHandler(JSON.stringify(modelJson)); // Convert to string before passing to handler
        const loadedModel = await tf.loadLayersModel(handler);
        setModel(loadedModel);
        setIsLoading(false); // Set loading state to false after model is loaded
      } catch (error) {
        console.error('Error loading the model:', error);
      }
    }
    initializeModel();
  }, []);

  useEffect(() => {
    if (model) {
      classifyImages();
    }
  }, [model]);

  const classifyImages = async () => {
    // Process the image and pass it to the model for prediction
    try {
      const imageArray = await processImage(imagePath);
      const predictions = await model.predict(tf.tensor([imageArray])).data();
      setPredictions(predictions);
      const predicted_class = tf.argMax(predictions).dataSync()[0];
      const predicted_class_name = class_names[predicted_class];
      setLabel(predicted_class_name);
    } catch (error) {
      console.error('Error processing or predicting:', error);
    }
  };

  // Function to process the image
  const processImage = async (imagePath) => {
    // Add your image processing logic here
    // Ensure the image processing logic is correct and returns the image array
    try {
      // Read the image file
      const imageFile = await FileSystem.readAsStringAsync(imagePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Manipulate the image (resize, crop, etc.)
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageFile, // Pass the image data directly
        [{ resize: { width: 224, height: 224 } }],
        { compress: 1, format: 'png', base64: true }
      );
  
      // Extract pixel data from the manipulated image
      const { base64 } = manipulatedImage;
  
      // Convert base64 string to ArrayBuffer
      const arrayBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;
      const pixels = new Float32Array(arrayBuffer);
  
      // Normalize the pixel values to the range [0, 1]
      const imageArray = pixels.map((pixel) => pixel / 255.0);
  
      return imageArray;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <Text>Loading Model...</Text>
      ) : (
        <Text>Model Loaded Successfully!</Text>
      )}
      <Text>{Label}</Text>
    </View>
  );
}
