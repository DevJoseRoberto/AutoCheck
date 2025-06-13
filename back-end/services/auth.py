from sqlalchemy.orm import Session
from schemas.user import UserLogin
from models.user import Users
from sqlalchemy import select
from core.security import decode_access_token
from jose import JWTError
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

oauth_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_email(db: Session, email:str):
    user = db.query(Users).filter(Users.email == email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario não encontrado", 
        )
    return user


def get_user_name(db: Session, name: str):
    user = db.query(Users).filter(Users.name == name).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario não encontrado", 
        )
    return user

def get_current_user(db: Session, token: str = Depends(oauth_scheme)):
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail="Token invalido",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try: 
        payload = decode_access_token(token)
        name: str = payload.get("sub")
        is_admin: bool = payload.get("is_admin")
        if name is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception
    user = get_user_name(db, name)
    if user is None:
        raise credentials_exception
    return user, is_admin


def user_is_admin(user: UserLogin = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Acesso restrito a administradores")
    return user

