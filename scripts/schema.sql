-- Mariposas - Esquema de base de datos para Neon
-- Ejecutar en Neon Console: https://console.neon.tech

-- Tabla de alumnos
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de sesiones (login)
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de progreso por actividad
CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  activity_id VARCHAR(50) NOT NULL,
  activity_title VARCHAR(200),
  category VARCHAR(50),
  -- Estado
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,  -- 0-100 si aplica, NULL si no tiene puntaje
  correct BOOLEAN,  -- para actividades de sí/no
  -- Tiempos
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_seconds INTEGER,  -- duración en segundos
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, activity_id)
);

-- Índices para consultas del profesor
CREATE INDEX IF NOT EXISTS idx_progress_student ON progress(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_activity ON progress(activity_id);
CREATE INDEX IF NOT EXISTS idx_progress_completed_at ON progress(completed_at);
CREATE INDEX IF NOT EXISTS idx_sessions_student ON sessions(student_id);

-- Insertar alumnos
INSERT INTO students (slug, name) VALUES
  ('valentina', 'Valentina'),
  ('carolina', 'Carolina'),
  ('federico', 'Federico'),
  ('milagros', 'Milagros'),
  ('martina', 'Martina'),
  ('facundo-rios', 'Facundo Rios'),
  ('facundo-lezue', 'Facundo Lezue'),
  ('facundo-rodriguez', 'Facundo Rodriguez'),
  ('cecilia', 'Cecilia'),
  ('maria-elena', 'Maria Elena'),
  ('maria-luz', 'Maria Luz'),
  ('pablo', 'Pablo'),
  ('lola', 'Lola'),
  ('noel', 'Noel')
ON CONFLICT (slug) DO NOTHING;
