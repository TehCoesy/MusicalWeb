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
from keras.layers import Dense, Conv2D, Activation
from keras.utils.np_utils import to_categorical

# Preferences
CLASS_LABEL = {"blues", "classical", "country", "disco", "hiphop", "jazz", "metal", "pop", "reggae", "rock"}
DATA_FOLDER = 'genres'

TRAIN_TEST_SPLIT = 0.2
TRAINING_EPOCHS = 30

load_weight = True
save_weight = True

WEIGHTS_FOLDER = "Models"
WEIGHTS_FILENAME = "dense_e15_0.h5"
