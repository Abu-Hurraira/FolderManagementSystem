import pyodbc

def get_connection():
    conn = pyodbc.connect(
        "DRIVER={SQL Server};"
        "SERVER=HURRAIRA\SQLEXPRESS;"
        "DATABASE=TeachersFolderMS;"
        "Trusted_Connection=yes;"
    )
    return conn
