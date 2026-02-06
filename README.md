# Teachers Folder Management System

A full-stack application to manage teachers, sections, and courses.  
Built with **FastAPI** for backend and **React (Vite)** for frontend.  

---

## Features

### Backend (FastAPI)
- Teacher login with email & password
- Fetch sections assigned to a teacher
- Structured with **business logic → controller → main.py**
- Connects to **SQL Server** database

### Frontend (React)
- Login page with validation and loading states
- Dashboard page showing teacher's sections
- Logout functionality
- Uses **Axios** for API calls

---

## Database Schema

### Tables

**Teachers**
- TeacherID (PK)
- FullName
- Email (unique)
- PasswordHash
- Role (`Teacher` or `HOD`)
- IsActive
- CreatedAt

**Sections**
- SectionID (PK)
- SectionName
- CourseName

**TeacherSections**
- TeacherSectionID (PK)
- TeacherID (FK → Teachers)
- SectionID (FK → Sections)

---

## Setup

### Backend

1. Navigate to backend folder:
```bash
cd backend
