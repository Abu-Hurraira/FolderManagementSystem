CREATE DATABASE TeachersFolderMS;
GO
USE TeachersFolderMS;
GO

CREATE TABLE Teachers (
    TeacherID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) CHECK (Role IN ('Teacher', 'HOD')) NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Sections (
    SectionID INT IDENTITY(1,1) PRIMARY KEY,
    SectionName NVARCHAR(50),
    CourseName NVARCHAR(100)
);

CREATE TABLE TeacherSections (
    TeacherSectionID INT IDENTITY(1,1) PRIMARY KEY,
    TeacherID INT FOREIGN KEY REFERENCES Teachers(TeacherID),
    SectionID INT FOREIGN KEY REFERENCES Sections(SectionID)
);

INSERT INTO Teachers (FullName, Email, PasswordHash, Role)
VALUES
('Umer Farooq', 'umer@biit.edu', '123456', 'Teacher'),
('Zahid Ahmed', 'zahid@biit.edu', '123456', 'Teacher'),
('Shahid Jamil', 'shahid@biit.edu', '123456', 'Teacher'),
('Dr.Iram',      'iram@biit.edu', '123456', 'Teacher'),
('Dr. Munir', 'munir@biit.edu', 'admin123', 'HOD');

INSERT INTO Sections (SectionName, CourseName)
VALUES
('BSCS-7A', 'Software Engineering'),
('BSCS-7B', 'Software Engineering'),
('BSIT-5A', 'Database Systems');

INSERT INTO TeacherSections (TeacherID, SectionID)
VALUES
(1,1),
(1,2),
(2,1),
(3,3),
(4,2);
