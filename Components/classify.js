import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { manipulateAsync } from 'expo-image-manipulator';

import  { bundleResourceIO} from '@tensorflow/tfjs-react-native';
import { decode } from 'base64-arraybuffer';

// Define the JSONHandler class
class JSONHandler {
  constructor(jsonString) {
    this.jsonString = jsonString;
  }

  async load() {
    const modelJSON = JSON.parse(this.jsonString);
    const modelArtifacts = {
      modelTopology: modelJSON.modelTopology,
      format: modelJSON.format,
      generatedBy: modelJSON.generatedBy,
      convertedBy: modelJSON.convertedBy
    };
    if (modelJSON.trainingConfig != null) {
      modelArtifacts.trainingConfig = modelJSON.trainingConfig;
    }
    if (modelJSON.userDefinedMetadata != null) {
      modelArtifacts.userDefinedMetadata = modelJSON.userDefinedMetadata;
    }
    return modelArtifacts;
  }
}

export default function ImageClassifier() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [Label, setLabel] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added state for loading indicator

  const uri = 'applescab.jpeg'; // Replace with the path to your image

  useEffect(() => {
    // Load the model and initialize TensorFlow.js
    async function initializeModel() {
      try {
        await tf.ready(); // Ensure TensorFlow.js is ready
        const modelJSON = require('../assets/models/model.json');
        const modelWeights = require('../assets/models/group1-shard1of1.bin');
        const modelClasses = require("../assets/models/classes.json")
        const imageSize = 224;
        console.log(modelJSON);
        console.log(modelWeights);
        const model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));
        model.predict(tf.zeros([1, imageSize, imageSize, 3]));
        setModel(model);
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
      const imageArray = await preprocessImage(uri);
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
  const preprocessImage = async (imagePath) => {
    // Manipulate image for resizing and format conversion
    const manipulatedImage = await manipulateAsync(
        imagePath,
        [{ resize: { width: 224, height: 224 } }],
        { compress: 1, format: 'jpeg' }
    );

    // Convert the manipulated image to a tensor
    const { uri } = manipulatedImage;
    const imgB64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const imageTensor = tf.node.decodeImage(new Uint8Array(imgBuffer), 3);

    // Normalize the image from [0, 255] to [0, 1]
    const normalized = imageTensor.toFloat().div(tf.scalar(255));

    // Reshape the image tensor to match model input shape
    const preProcessedImage = normalized.reshape([1, 224, 224, 3]);

    return preProcessedImage;
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
