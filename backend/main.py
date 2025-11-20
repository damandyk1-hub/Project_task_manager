from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext

import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Manager API", version="1.0.0")

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Auth Endpoints ---

@app.post("/api/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Регистрация нового пользователя"""
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким email уже зарегистрирован"
        )

    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, name=user.name, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/login", response_model=schemas.User)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    """Вход пользователя в систему"""
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль"
        )

    if not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Неверный email или пароль"
        )

    return user

# --- Task Endpoints ---

@app.get("/api/tasks/{user_id}", response_model=List[schemas.Task])
def read_tasks(user_id: int, db: Session = Depends(get_db)):
    """Получить все задачи пользователя"""
    # Verify user exists
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден"
        )

    tasks = db.query(models.Task).filter(models.Task.user_id == user_id).all()
    return tasks

@app.post("/api/tasks/{user_id}", response_model=schemas.Task)
def create_task(user_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """Создать новую задачу"""
    # Verify user exists
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден"
        )

    db_task = models.Task(**task.dict(), user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.put("/api/tasks/{user_id}/{task_id}", response_model=schemas.Task)
def update_task(user_id: int, task_id: int, task_update: schemas.TaskUpdate, db: Session = Depends(get_db)):
    """Обновить задачу"""
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == user_id
    ).first()

    if db_task is None:
        raise HTTPException(
            status_code=404,
            detail="Задача не найдена или у вас нет прав доступа"
        )

    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/api/tasks/{user_id}/{task_id}")
def delete_task(user_id: int, task_id: int, db: Session = Depends(get_db)):
    """Удалить задачу"""
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.user_id == user_id
    ).first()

    if db_task is None:
        raise HTTPException(
            status_code=404,
            detail="Задача не найдена или у вас нет прав доступа"
        )

    db.delete(db_task)
    db.commit()
    return {"success": True}
