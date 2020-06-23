import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)

import librosa
import librosa.feature

import os, glob, math
import numpy as np

import keras
from keras.models import Sequential
from keras.layers import Dense, Activation
from keras.utils.np_utils import to_categorical

CLASS_LABEL = {"blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"}
DATA_FOLDER = 'genres'

TRAIN_TEST_SPLIT = 0.2

load_weight = True
save_weight = True
weight_folder = './Models'
weight_filename = 'music_genre_0.h5'

def extract_features(filename):
    sound, sr = librosa.load(filename, duration=30)

    # Get features
    chrome_stft = librosa.feature.chroma_stft(sound, sr)
    spec_cent = librosa.feature.spectral_centroid(sound, sr)
    spec_bw = librosa.feature.spectral_bandwidth(sound, sr)
    rolloff = librosa.feature.spectral_rolloff(sound, sr)
    zcr = librosa.feature.zero_crossing_rate(sound)
    mfcc = librosa.feature.mfcc(sound, sr)

    # Get mean of features
    chrome_stft = np.mean(chrome_stft)
    spec_cent = np.mean(spec_cent)
    spec_bw = np.mean(spec_bw)
    rolloff = np.mean(rolloff)
    zcr = np.mean(zcr)

    mmfcc = []
    # Normalize MFCC
    for e in mfcc:
        mmfcc.append(np.mean(e))
    
    # Stacking data
    feature = np.vstack((chrome_stft, spec_cent, spec_bw, rolloff, zcr))
    feature = np.append(feature, mmfcc)

    #print(np.shape(feature))

    return feature


def generate_features_labels():
    all_features = []
    all_labels = []

    for class_name in CLASS_LABEL:
        print("Loading class", class_name)
        sound_files = glob.glob(DATA_FOLDER + "/" + class_name + "/*.au")

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
    model.add(Dense(64, activation='relu'))
    model.add(Dense(output_dim, activation='softmax'))

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    return model

def training_session():
    all_features, all_labels = generate_features_labels()

    trainX, trainY, testX, testY = generate_train_test_sets(all_features, all_labels)

    model = create_model(np.shape(trainX)[1], np.shape(trainY)[1])

    if load_weight:
        print("Loading previous weight")
        try:
            model.load_weights(os.path.join(weight_folder, weight_filename))
        except Exception as e:
            print("Error loading weight file")
            print(e)

    model.fit(trainX, trainY, epochs=100, batch_size=32, verbose=1)

    loss, acc = model.evaluate(testX, testY, batch_size=32)

    print("Loss:", loss, "Accuracy:", acc)

    if save_weight:
        print("Saving weight")
        try:
            model.save_weights(os.path.join(weight_folder, weight_filename))
        except Exception as e:
            print("Error saving weights")
            print(e)

if __name__ == "__main__":
    training_session()