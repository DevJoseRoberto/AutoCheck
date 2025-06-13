from pydantic import BaseModel, EmailStr, validator
from datetime import datetime,date

class UserCreate(BaseModel):
    name: str
    password: str
    confirm_password: str
    cpf: str
    phone: str
    birthdate: date

    @validator('birthdate', pre=True)
    def validate_date(cls, value):
        if isinstance(value, date):
            return value
        try:
            return datetime.strptime(value, "%d/%m/%Y").date()
        except ValueError:
            raise ValueError('Data inválida')
    
    email: EmailStr
    is_admin: bool

class UserOut(BaseModel):
    name: str
    email: EmailStr
    id: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: EmailStr
    hashed_password: str