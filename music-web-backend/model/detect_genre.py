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
from keras.layers import Dense, Conv2D, MaxPooling2D, Dropout, Flatten, BatchNormalization
from keras.utils.np_utils import to_categorical

CLASS_LABEL = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"]
WEIGHTS_FOLDER = "./model/Models"
WEIGHTS_DENSE_FILENAME = "dense_weights_default.h5"
WEIGHTS_CNN_FILENAME = "convnet_weights_default.h5"

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

def extract_feature_spectrogram(filename):
    sound, sr = librosa.load(filename)
    spectrogram = librosa.feature.melspectrogram(y = sound, sr = sr, n_fft = 2048, hop_length = 512)
    # Normalize spectrogram
    spectrogram = librosa.power_to_db(spectrogram, ref = np.max)
    spectrogram = spectrogram[:, :1000]
    #print(np.shape(spectrogram))
    return spectrogram.reshape(128, 1000, 1)

def create_model_dense(input_dim, output_dim):
    try:
        model = Sequential()

        model.add(Dense(256, activation='relu', input_dim=input_dim))
        model.add(Dense(128, activation='relu'))
        model.add(Dense(128, activation='relu'))
        model.add(Dense(output_dim, activation='softmax'))

        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        model.load_weights(os.path.join(WEIGHTS_FOLDER, WEIGHTS_DENSE_FILENAME))
        return model
    except Exception as e:
        print("Exception loading model")
        print(e)
    return None

def create_model_convnet(input_dim, output_dim):
    model = Sequential()

    # build network topology
    model = Sequential()

    # 1st Conv2D layer
    model.add(Conv2D(32, (3, 3), activation='relu', input_shape=input_dim))
    model.add(MaxPooling2D((3, 3), strides=(2, 2), padding='same'))
    model.add(BatchNormalization())

    # 2nd Conv2D layer
    model.add(Conv2D(32, (3, 3), activation='relu'))
    model.add(MaxPooling2D((3, 3), strides=(2, 2), padding='same'))
    model.add(BatchNormalization())

    # 3rd Conv2D layer
    model.add(Conv2D(32, (2, 2), activation='relu'))
    model.add(MaxPooling2D((2, 2), strides=(2, 2), padding='same'))
    model.add(BatchNormalization())

    # Flatten output and feed it into dense layer
    model.add(Flatten())
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.3))

    # Output layer
    model.add(Dense(output_dim, activation='softmax'))
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    model.load_weights(os.path.join(WEIGHTS_FOLDER, WEIGHTS_CNN_FILENAME))
    return model

if __name__ == "__main__":
    filename = './resources/audio/audio-detect-file.wav'

    # Dense model
    #feature = extract_feature_dense(filename)
    #model = create_model_dense(25000, 10)

    # CNN model
    feature = extract_feature_spectrogram(filename)
    model = create_model_convnet((128, 1000, 1), 10)

    #print(np.shape(feature))

    prediction = model.predict_classes(np.array([feature]))

    print(CLASS_LABEL[prediction[0]])
