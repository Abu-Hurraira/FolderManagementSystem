from fastapi import APIRouter
# from app.business_logic.student_bl import StudentBL
# from app.common.schemas import StudentCreate

from app.business_logic.test_bl import TestBL

router = APIRouter(
    prefix="/test",
    tags=["Test"]
)

@router.get("/get_random_number")
def get_random_number():
    return TestBL.get_random_number()

@router.get("/get_sample_product_list")
def get_sample_product_list():
    return TestBL.get_sample_product_list()

@router.post("/double_of/{num}")
def double_of(num: int):
    return TestBL.double_of(num)
