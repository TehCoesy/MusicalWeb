import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

import librosa
import librosa.feature

import os, glob, math
import random
import numpy as np
import argparse

import keras
from keras.models import Sequential
from keras.layers import Dense, Conv2D, MaxPooling2D, Dropout, Flatten, BatchNormalization
from keras.layers import Activation
from keras.utils.np_utils import to_categorical

# Preferences
CLASS_LABEL = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"]
DATA_FOLDER = 'genres'

TRAIN_TEST_SPLIT = 0.8
TRAINING_EPOCHS = 80
BATCH_SIZE = 32

load_weight = False
save_weight = True

WEIGHTS_FOLDER = "./Models"
WEIGHTS_FILENAME = "convnet_weights_default.h5"

def extract_features(filename):
    sound, sr = librosa.load(filename)

    spectrogram = librosa.feature.melspectrogram(y = sound, sr = sr, n_fft = 2048, hop_length = 512)

    # Normalize spectrogram
    spectrogram = librosa.power_to_db(spectrogram, ref = np.max)
    spectrogram = spectrogram[:, :1000]

    #print(np.shape(spectrogram))

    return np.array(spectrogram)

def generate_features_labels():
    all_features = []
    all_labels = []

    for class_name in CLASS_LABEL:
        print("Loading class", class_name)
        sound_files = glob.glob(DATA_FOLDER + "/" + class_name + "/*.wav")

        for f in sound_files:
            #print("Loading file", f)
            feature = extract_features(f)
            all_features.append(feature)
            all_labels.append(class_name)

    # Convert labels to one-hot
    label_unique_ids, label_row_ids = np.unique(all_labels, return_inverse = True)
    label_row_ids = label_row_ids.astype(np.int32, copy = False)
    label_one_hot = to_categorical(label_row_ids, len(label_unique_ids))

    return np.stack(all_features), label_one_hot

def generate_train_test_sets(all_features, all_labels):
    print("Features: ", np.shape(all_features))
    print("Labels: ", np.shape(all_labels))

    index_train = random.sample(list(np.arange(len(all_features))), k=int(len(all_features) * TRAIN_TEST_SPLIT))
    index_test = []

    for i in range(len(all_features)):
        if i not in index_train:
            index_test.append(i)

    #print(len(index))
    #print(index)

    trainX = []
    trainY = []
    testX = []
    testY = []

    for i in index_train:
        trainX.append(all_features[i])
        trainY.append(all_labels[i])

    for i in index_test:
        testX.append(all_features[i])
        testY.append(all_labels[i])

    # Reshape for CNN input
    trainX = np.array([x.reshape((128, 1000, 1)) for x in trainX])
    testX = np.array([x.reshape((128, 1000, 1)) for x in testX])
    trainY = np.array([y.reshape((10)) for y in trainY])
    testY = np.array([y.reshape((10)) for y in testY])

    print(np.shape(trainX))
    print(np.shape(trainY))
    print(np.shape(testX))
    print(np.shape(testY))

    return trainX, trainY, testX, testY

def create_model(input_dim, output_dim):
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

    return model

def training_session():
    all_features, all_labels = generate_features_labels()

    trainX, trainY, testX, testY = generate_train_test_sets(all_features, all_labels)

    #print(np.shape(trainX))
    #print(np.shape(trainY))

    model = create_model((128, 1000, 1), 10)

    if load_weight:
        print("Loading previous weight")
        try:
            model.load_weights(os.path.join(WEIGHTS_FOLDER, WEIGHTS_FILENAME))
        except Exception as e:
            print("Error loading weight file")
            print(e)

    model.fit(trainX, trainY, epochs=TRAINING_EPOCHS, batch_size=BATCH_SIZE, verbose=1)

    loss, acc = model.evaluate(testX, testY, batch_size=32)

    print("Loss:", loss, "Accuracy:", acc)

    if save_weight:
        print("Saving weight")
        try:
            model.save_weights(WEIGHTS_FOLDER + "/" + WEIGHTS_FILENAME)
        except Exception as e:
            print("Error saving weight")
            print(e)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--weight_file", help="Specify weights filename", default="convnet_weights_default.h5")
    parser.add_argument("-ff", "--weight_folder", help="Specify where to save weights", default="./Models")
    parser.add_argument("-l", "--load", help="Load trained weights (Maybe unstable)", type=bool, default=False)
    parser.add_argument("-ns", "--no_save", help="Don't save trained weights", type=bool, default=False)

    args = parser.parse_args()

    WEIGHTS_FILENAME = args.weight_file
    WEIGHTS_FOLDER = args.weight_folder

    load_weight = args.load
    save_weight = not args.no_save

    training_session()