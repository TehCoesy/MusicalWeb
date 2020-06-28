import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

import librosa
import librosa.feature

import os, glob, math
import numpy as np
import argparse
import sys

import keras
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.utils.np_utils import to_categorical

CLASS_LABEL = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"]
WEIGHTS_FOLDER = "Models"
WEIGHTS_FILENAME = "dense_e15_0.h5"

def extract_feature_dense(filename):
    try:
        sound, _ = librosa.load(filename)

        # Get MFCC
        mfcc = librosa.feature.mfcc(sound)

        # Normalize MFCC to [-1, 1]
        mfcc = mfcc / np.amax(np.absolute(mfcc))

        #print("Raw MFCC shape: ", np.shape(mfcc))

        return np.ndarray.flatten(mfcc)[:25000]

    except Exception as e:
        print("Exception loading file / feature")
        print(e)

    return None

def create_model(input_dim, output_dim):
    try:
        model = Sequential()

        model.add(Dense(256, activation='relu', input_dim=input_dim))
        model.add(Dense(128, activation='relu'))
        model.add(Dense(128, activation='relu'))
        model.add(Dense(output_dim, activation='softmax'))

        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

        model.load_weights(os.path.join(WEIGHTS_FOLDER, WEIGHTS_FILENAME))

        return model
    except Exception as e:
        print("Exception loading model")
        print(e)

    return None

if __name__ == "__main__":

    filename = "blues_1.wav"

    feature = extract_feature_dense(filename)
    
    #print(np.shape(feature))

    model = create_model(25000, 10)

    prediction = model.predict_classes(np.array([feature]))

    print("Prediction is: " + CLASS_LABEL[prediction[0]])