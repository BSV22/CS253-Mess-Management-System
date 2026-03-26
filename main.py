from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cv2
import numpy as np
import base64
import os
import zlib
import json
from PIL import Image

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class ImagePayload(BaseModel):
    image: str

class TrainPayload(BaseModel):
    images: list[str]

recognizer = cv2.face.LBPHFaceRecognizer_create()
trainer_path = os.path.join("TrainingImageLabel", "Trainner.yml")
mapping_path = os.path.join("TrainingImageLabel", "mapping.json")
faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Global mapping: { int_id: "string_roll_no" }
id_to_rollno = {}

def load_ai_model():
    global id_to_rollno
    if os.path.exists(trainer_path):
        recognizer.read(trainer_path)
    if os.path.exists(mapping_path):
        with open(mapping_path, 'r') as f:
            id_to_rollno = {int(k): v for k, v in json.load(f).items()}

def save_mapping():
    os.makedirs(os.path.dirname(mapping_path), exist_ok=True)
    with open(mapping_path, 'w') as f:
        json.dump(id_to_rollno, f)

def get_int_id(roll_no: str) -> int:
    # Stable 32-bit hash for OpenCV
    return zlib.crc32(roll_no.encode('utf-8')) & 0xFFFFFFFF

load_ai_model()

@app.post("/recognize-face/")
async def recognize_face(payload: ImagePayload):
    try:
        header, encoded = payload.image.split(",", 1) if "," in payload.image else (None, payload.image)
        nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        faces = faceCascade.detectMultiScale(gray, 1.3, 5)
        if len(faces) == 0:
            return {"status": "noface"}

        if not os.path.exists(trainer_path):
            return {"status": "unknown"}

        (x, y, w, h) = faces[0]
        int_id, conf = recognizer.predict(gray[y:y+h, x:x+w])
        
        # conf < 75 means the AI is reasonably sure
        if conf < 75:
            roll_no = id_to_rollno.get(int_id, "unknown")
            return {"status": "success", "userId": roll_no}
        else:
            return {"status": "unknown"}
            
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/train-new-face/{user_id}")
async def train_new_face(user_id: str, payload: TrainPayload):
    try:
        global id_to_rollno
        os.makedirs("TrainingImage", exist_ok=True)
        int_id = get_int_id(user_id)
        id_to_rollno[int_id] = user_id
        save_mapping()
        
        sampleNum = 0
        for b64_img in payload.images:
            header, encoded = b64_img.split(",", 1) if "," in b64_img else (None, b64_img)
            nparr = np.frombuffer(base64.b64decode(encoded), np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            faces = faceCascade.detectMultiScale(gray, 1.3, 5)
            for (x, y, w, h) in faces:
                sampleNum += 1
                # Use the integer ID in the filename for legacy reasons/compatibility
                cv2.imwrite(f"TrainingImage/User.{int_id}.{sampleNum}.jpg", gray[y:y+h, x:x+w])
                
        if sampleNum == 0:
            return {"status": "error", "message": "No faces detected in the provided images."}

        # Training process
        imagePaths = [os.path.join("TrainingImage", f) for f in os.listdir("TrainingImage") if f.endswith('.jpg')]
        faces_data, ids = [], []
        
        for path in imagePaths:
            try:
                pilImg = Image.open(path).convert('L')
                faces_data.append(np.array(pilImg, 'uint8'))
                # Get ID from filename
                file_id = int(os.path.split(path)[-1].split(".")[1])
                ids.append(file_id)
            except:
                continue
                
        if len(faces_data) > 0:
            recognizer.train(faces_data, np.array(ids))
            os.makedirs("TrainingImageLabel", exist_ok=True)
            recognizer.save(trainer_path)
            load_ai_model()
            
        return {"status": "success", "samples_collected": sampleNum}
    except Exception as e:
        return {"status": "error", "message": str(e)}