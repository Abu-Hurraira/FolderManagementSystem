from fastapi import APIRouter
from app.business_logic.auth_bl import AuthBL

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login")
def login_endpoint(data: dict):
    email = data.get("email")
    password = data.get("password")
    return AuthBL.login(email, password)

@router.get("/sections/{teacher_id}")
def get_sections(teacher_id: int):
    return AuthBL.get_sections(teacher_id)
