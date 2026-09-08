CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  reason TEXT,
  message TEXT NOT NULL,
  segment TEXT,
  context TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  ip_address TEXT,
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_idx ON contact_submissions(created_at);
