-- Cities Table
CREATE TABLE cities (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL
);

-- Grade Levels Table
CREATE TABLE grade_levels (
    grade_level_id SERIAL PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,  -- E.g., O-level, A-level, Intermediate
    sub_level VARCHAR(50),  -- E.g., O1, O2, AS, A2, etc.
    parent_level_id INT REFERENCES grade_levels(grade_level_id)  -- For hierarchical levels
);

-- Languages Table
CREATE TABLE languages (
    language_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL  -- Language name (e.g., English, Spanish)
);

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    gender VARCHAR(10),
    age INT,
    role VARCHAR(20) NOT NULL CHECK (role IN ('teacher', 'student', 'admin')),
    profile_picture VARCHAR(255),
    city_id INT REFERENCES cities(city_id) ON DELETE SET NULL,
    area VARCHAR(255) NOT NULL,  -- Area information
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects Table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Teachers Table
CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    teaching_mode VARCHAR(20) NOT NULL CHECK (teaching_mode IN ('online', 'physical', 'both')),
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    experience_years INT,
    education VARCHAR(255),  -- Education background
    rating DECIMAL(3, 2),  -- Rating out of 5
    hourly_rate DECIMAL(10, 2),  -- Hourly rate in decimal format
    grade_level_id INT REFERENCES grade_levels(grade_level_id) ON DELETE SET NULL,  -- Reference to grade levels
    language_id INT REFERENCES languages(language_id) ON DELETE SET NULL,  -- Reference to languages
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    grade_level_id INT REFERENCES grade_levels(grade_level_id) ON DELETE SET NULL,  -- Reference to grade levels
    guardian_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher Subjects Table
CREATE TABLE teacher_subjects (
    teacher_subject_id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- Teacher Availability Table
CREATE TABLE teacher_availability (
    availability_id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    day VARCHAR(10) NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Student Subjects Table
CREATE TABLE student_subjects (
    student_subject_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE
);

-- Hiring Contracts Table
CREATE TABLE hiring_contracts (
    contract_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    teacher_id INT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(subject_id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    mode VARCHAR(20) NOT NULL CHECK (mode IN ('online', 'physical')),
    payment_terms VARCHAR(255),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL REFERENCES hiring_contracts(contract_id) ON DELETE CASCADE,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    teacher_id INT NOT NULL REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('contract_update', 'review', 'general')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL REFERENCES hiring_contracts(contract_id) ON DELETE CASCADE,
    student_id INT NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'completed', 'failed')),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
