from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Task Schemas
class TaskBase(BaseModel):
    text: str
    category: str
    priority: str
    deadline: Optional[str] = None
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    text: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    deadline: Optional[str] = None
    completed: Optional[bool] = None

class Task(TaskBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# User Schemas
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    tasks: List[Task] = []

    class Config:
        from_attributes = True
