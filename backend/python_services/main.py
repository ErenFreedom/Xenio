from fastapi import FastAPI
import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
import re
import string
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.layers import TextVectorization
from tensorflow.keras import layers
import numpy as np
from fastapi import HTTPException
from pydantic import BaseModel

file_path = 'updated_banking_faq_queries.csv'
df = pd.read_csv(file_path)
def preprocess_text(text):
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.lower()
    text = re.sub(r'\d+', '', text)
    return text
df['cleaned_variation'] = df['Variation'].apply(preprocess_text)
distinct_values = df['CAT_A'].unique()

le = LabelEncoder()
df['CAT_A_encoded'] = le.fit_transform(df['CAT_A'])

label_mapping = dict(zip(le.classes_, le.transform(le.classes_)))

train_sentences = df["cleaned_variation"].to_numpy()
train_labels = df["CAT_A_encoded"].to_numpy()

X_train, X_test, y_train, y_test = train_test_split(train_sentences, train_labels, test_size=0.2, random_state=42)

max_vocab_length = 10000
max_length = 20

text_vectorizer = TextVectorization(max_tokens=max_vocab_length,
                                    output_mode="int",
                                    output_sequence_length=max_length)

text_vectorizer.adapt(X_train)

embedding = layers.Embedding(input_dim=max_vocab_length,
                             output_dim=128,
                             embeddings_initializer="uniform",
                             input_length=max_length,
                             name="embedding_1")


inputs = layers.Input(shape=(1,), dtype="string")
x = text_vectorizer(inputs)
x = embedding(x)
x = layers.LSTM(128)(x)
x = layers.Dense(100, activation="relu")(x)
x = layers.Dense(50, activation="relu")(x)
outputs = layers.Dense(48, activation="softmax")(x)
model_1 = tf.keras.Model(inputs, outputs, name="model_1_LSTM")

model_1.compile(
    loss="sparse_categorical_crossentropy",
    optimizer=tf.keras.optimizers.Adam(),
    metrics=["accuracy"],
)

model_1_history = model_1.fit(X_train,
                              y_train,
                              epochs=50,
                              )



app = FastAPI()

class Query(BaseModel):
    text: str 

class PredictionResponse(BaseModel):
    predicted_category: str
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/predict/", response_model=PredictionResponse)
async def predict(query: Query):
    
    cleaned_text = preprocess_text(query.text)
  
    custom_message_array = np.array([[cleaned_text]]) 
    custom_message_tensor = tf.convert_to_tensor(custom_message_array, dtype=tf.string)
    
    predictions = model_1.predict(custom_message_tensor)
    predicted_class = np.argmax(predictions, axis=1)  
    
    predicted_label = le.inverse_transform(predicted_class)
    
    predicted_category = predicted_label[0] if len(predicted_label) > 0 else "Unknown"

    return PredictionResponse(predicted_category=predicted_category)
