from app.common.database import get_connection
from app.common.response import success

class AuthBL:

    @staticmethod
    def login(email: str, password: str):
        conn = get_connection()
        cursor = conn.cursor()

        # Note: column names updated to match your schema
        cursor.execute(
            "SELECT TeacherID, FullName, Email, Role FROM Teachers "
            "WHERE Email=? AND PasswordHash=? AND IsActive=1",
            email, password
        )
        user = cursor.fetchone()
        conn.close()

        if user:
            return success(
                {
                    "id": user.TeacherID,
                    "fullName": user.FullName,
                    "email": user.Email,
                    "role": user.Role,
                    "teacherId": user.TeacherID
                },
                message="Login successful",
                status_code=200
            )
        return success(None, message="Invalid credentials", status_code=401)

    @staticmethod
    def get_sections(teacher_id: int):
        conn = get_connection()
        cursor = conn.cursor()

        # Join TeacherSections with Sections to get assigned sections
        cursor.execute(
            "SELECT s.SectionID, s.SectionName, s.CourseName "
            "FROM TeacherSections ts "
            "JOIN Sections s ON ts.SectionID = s.SectionID "
            "WHERE ts.TeacherID=?",
            teacher_id
        )
        rows = cursor.fetchall()
        conn.close()

        sections = [
            {"sectionId": row.SectionID, "sectionName": row.SectionName, "courseName": row.CourseName}
            for row in rows
        ]

        return success(sections, message="Sections fetched successfully", status_code=200)
