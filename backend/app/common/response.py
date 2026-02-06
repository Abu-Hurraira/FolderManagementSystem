from fastapi.responses import JSONResponse

def success(data=None, message="Success", status_code=200):
    return JSONResponse(
        status_code=status_code,
        content={
            "data": data,
            "message": message,
            "status_code": status_code
        }
    )






# from typing import Any, Optional

# def success(
#     data: Optional[Any] = None,
#     message: str = "Request successful",
#     status_code: int = 200
# ):
#     return {
#         "success": True,
#         "statusCode": status_code,
#         "message": message,
#         "data": data
#     }


# def error(
#     message: str = "Something went wrong",
#     status_code: int = 400,
#     error_code: Optional[str] = None
# ):
#     return {
#         "success": False,
#         "statusCode": status_code,
#         "message": message,
#         "errorCode": error_code,
#         "data": None
#     }
