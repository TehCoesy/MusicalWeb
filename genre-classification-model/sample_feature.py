import librosa
import librosa.feature
import argparse

import os
import numpy as np

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file', help="Filename", required=True)

    args = parser.parse_args()

    sound, sr = librosa.load(args.file)

    feature = librosa.feature.melspectrogram(y = sound, sr = sr, n_fft = 2048, hop_length = 512)

    # Normalize spectrogram
    feature = librosa.power_to_db(feature, ref = np.max)
    feature = feature[:, :1000]

    # Get MFCC
    #feature = librosa.feature.mfcc(sound)

    # Normalize MFCC to [-1, 1]
    #feature = feature / np.amax(np.absolute(feature))

    print(np.shape(feature))