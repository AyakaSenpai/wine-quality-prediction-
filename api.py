from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np

app = FastAPI(title="Wine Quality Prediction API", version="1.0")

# Biar web HTML kamu bisa akses API (penting!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ubah jadi domain kamu kalau sudah production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model sekali saat API jalan
with open("models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)
with open("models/random_forest_model.pkl", "rb") as f:
    model = pickle.load(f)
with open("models/feature_names.pkl", "rb") as f:
    feature_names = pickle.load(f)

class WineInput(BaseModel):
    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float
    pH: float
    sulphates: float
    alcohol: float

@app.get("/")
def home():
    return {"message": "Wine Quality API siap! POST ke /predict"}

@app.post("/predict")
def predict(data: WineInput):
    try:
        # Ubah ke DataFrame biar sesuai urutan kolom
        input_df = pd.DataFrame([data.dict()], columns=feature_names)
        scaled = scaler.transform(input_df)
        pred = model.predict(scaled)
        return {"predicted_quality": int(pred[0])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))