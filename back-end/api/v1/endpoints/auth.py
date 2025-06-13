from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from services.auth import get_current_user, get_user_email, oauth_scheme
from sqlalchemy.orm import Session
from core.security import create_acess_token
from utils import verify_password
from db.session import SessionLocal
from schemas.token import Token
from utils import verify_password
from core.security import create_acess_token

auth_router = APIRouter(prefix='/auth', tags=['auth'])


# Criar uma classe personalizada para login com email
class EmailPasswordRequestForm(OAuth2PasswordRequestForm):
    def __init__(self, email: str = Form(...), password: str = Form(...)):
        super().__init__(username=email, password=password, scope="")
        self.email = email

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@auth_router.post("/token", response_model=Token)
def login_for_access_token(db: Session = Depends(get_db), form_data: EmailPasswordRequestForm = Depends()):
    user = get_user_email(db, form_data.email)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais incorretas", 
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token = create_acess_token(data={"sub": user.name, "is_admin": user.is_admin})

    return {"access_token": f"Bearer {access_token}", "token_type": "bearer"}


@auth_router.get('/data', status_code=status.HTTP_202_ACCEPTED)
def get_user_data(token: str = Depends(oauth_scheme), db: Session = Depends(get_db)):
    return get_current_user(db, token)