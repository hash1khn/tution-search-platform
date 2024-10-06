-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(20) NOT NULL CHECK (role IN ('teacher', 'student', 'admin')),
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations Table
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL
);

-- Subjects Table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Teachers Table (with hourly_rate and subject they teach)
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    teaching_mode VARCHAR(20) NOT NULL CHECK (teaching_mode IN ('online', 'physical', 'both')),
    bio TEXT,
    location_id INT REFERENCES locations(id),
    verified BOOLEAN DEFAULT FALSE,
    experience_years INT, -- Years of teaching experience
    education TEXT, -- Educational background
    languages TEXT[], -- Languages spoken by the teacher
    rating DECIMAL(3, 2), -- Teacher's average rating
    hourly_rate DECIMAL(10, 2), -- Teacher's hourly rate
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TeacherSubjects Table (links teachers to the subjects they teach)
CREATE TABLE teacher_subjects (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE
);

-- TeacherGrades Table (stores the grade levels teachers can teach)
CREATE TABLE teacher_grades (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    grade VARCHAR(50)
);

-- TeacherAvailability Table (stores the availability of teachers)
CREATE TABLE teacher_availability (
    id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    day VARCHAR(10) NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Students Table (with preferred subjects and guardian contact)
CREATE TABLE students (
    id SERIAL PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    grade_level VARCHAR(50) NOT NULL,
    location_id INT REFERENCES locations(id),
    preferred_subjects TEXT[], -- Subjects the student prefers to learn
    guardian_contact VARCHAR(20), -- Contact information for a parent or guardian
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- StudentSubjects Table (links students to subjects they want to learn)
CREATE TABLE student_subjects (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE
);

-- HiringContracts Table (contracts between students and teachers)
CREATE TABLE hiring_contracts (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    mode VARCHAR(20) NOT NULL CHECK (mode IN ('online', 'physical')),
    payment_terms VARCHAR(255),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table (stores individual reviews and ratings)
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    contract_id INT REFERENCES hiring_contracts(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    teacher_id INT REFERENCES teachers(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5), -- Individual rating for this review
    review_text TEXT, -- Textual feedback
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table (tracks notifications sent to users)
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('contract_update', 'review', 'general')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table (tracks payments related to contracts)
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    contract_id INT REFERENCES hiring_contracts(id) ON DELETE CASCADE,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'completed', 'failed')),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
