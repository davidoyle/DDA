ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS auth_method TEXT;

UPDATE sessions
SET auth_method = 'magic_link'
WHERE auth_method IS NULL;

ALTER TABLE sessions
  ALTER COLUMN auth_method SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'sessions_auth_method_check'
  ) THEN
    ALTER TABLE sessions
      ADD CONSTRAINT sessions_auth_method_check
      CHECK (auth_method IN ('admin_password', 'magic_link', 'user_password'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_one_admin
  ON users ((role))
  WHERE role = 'admin' AND password_hash IS NOT NULL;
