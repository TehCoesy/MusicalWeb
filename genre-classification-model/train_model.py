import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

import librosa
import librosa.feature

import os, glob, math
import numpy as np
import argparse

import keras
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.utils.np_utils import to_categorical

# Preferences
CLASS_LABEL = ["blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"]
DATA_FOLDER = './genres'

TRAIN_TEST_SPLIT = 0.8
TRAINING_EPOCHS = 10
BATCH_SIZE = 32

load_weight = False
save_weight = True

WEIGHTS_FOLDER = "Models"
WEIGHTS_FILENAME = "dense_e15_0.h5"

def extract_features(filename):
    sound, _ = librosa.load(filename)

    # Get MFCC
    mfcc = librosa.feature.mfcc(sound)

    # Normalize MFCC to [-1, 1]
    mfcc = mfcc / np.amax(np.absolute(mfcc))

    #print("Raw MFCC shape: ", np.shape(mfcc))

    return np.ndarray.flatten(mfcc)[:25000]

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

    all_data = np.column_stack((all_features, all_labels))

    np.random.shuffle(all_data)

    splitindex = int(len(all_data) * TRAIN_TEST_SPLIT)
    train, test = all_data[:splitindex, :], all_data[splitindex:, :]

    trainX = train[:, :-10]
    trainY = train[:, -10:]

    testX = test[:, :-10]
    testY = test[:, -10:]

    print("TrainX: ", np.shape(trainX))
    print("TrainY: ", np.shape(trainY))

    print("TestX: ", np.shape(testX))
    print("TestY: ", np.shape(testY))

    return trainX, trainY, testX, testY

def create_model(input_dim, output_dim):
    model = Sequential()

    model.add(Dense(256, activation='relu', input_dim=input_dim))
    model.add(Dense(128, activation='relu'))
    model.add(Dense(128, activation='relu'))
    model.add(Dense(output_dim, activation='softmax'))

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    return model

def training_session():
    all_features, all_labels = generate_features_labels()

    trainX, trainY, testX, testY = generate_train_test_sets(all_features, all_labels)

    #print(np.shape(trainX)[1])
    #print(np.shape(trainY)[1])

    model = create_model(np.shape(trainX)[1], np.shape(trainY)[1])

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
            model.save_weights(os.path.join(WEIGHTS_FOLDER, WEIGHTS_FILENAME))
        except Exception as e:
            print("Error saving weights")
            print(e)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--weight_file", help="Specify weights filename", default="dense_e15_0.h5")
    parser.add_argument("-ff", "--weight_folder", help="Specify where to save weights", default="Models")
    parser.add_argument("-l", "--load", help="Load trained weights (Maybe unstable)", type=bool, default=False)
    parser.add_argument("-ns", "--no_save", help="Don't save trained weights", type=bool, default=False)

    args = parser.parse_args()

    WEIGHTS_FILENAME = args.weight_file
    WEIGHTS_FOLDER = args.weight_folder

    if args.load:
        load_weight = True
    if args.no_save:
        save_weight = False

    training_session()