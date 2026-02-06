from app.common.database import get_connection
from app.common.response import success

class TestBL:

    @staticmethod
    def get_random_number():
        random_number = 42  # Just a placeholder for demonstration
        return success(random_number, message="Random number generated successfully", status_code=200)
    
    @staticmethod
    def get_sample_product_list():
        sample_products = [
            {"id": 1, "name": "Product A", "price": 10.99},
            {"id": 2, "name": "Product B", "price": 19.99},
            {"id": 3, "name": "Product C", "price": 5.49}
        ]
        return success(sample_products, message="Sample product list retrieved successfully", status_code=200)
    
    @staticmethod
    def double_of(num):
        if num == 0:
            return success(None, message="Cannot double zero", status_code=400)
        result = num * 2
        return success(result, message=f"Double of {num} is {result}", status_code=200)
    

# from app.common.database import get_connection
# from app.common.response import success

# class StudentBL:

#     @staticmethod
#     def get_all_students():
#         conn = get_connection()
#         cursor = conn.cursor()
#         cursor.execute("SELECT * FROM Students")
#         rows = cursor.fetchall()
#         conn.close()

#         return success(rows)

#     @staticmethod
#     def add_student(student):
#         conn = get_connection()
#         cursor = conn.cursor()

#         cursor.execute(
#             "INSERT INTO Students (Name, RollNo, Section) VALUES (?, ?, ?)",
#             student.name,
#             student.roll_no,
#             student.section
#         )

#         conn.commit()
#         conn.close()

#         return success(message="Student added successfully")

