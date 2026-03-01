
-- Create storage bucket for GoFix photos (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gofix-photos', 'gofix-photos', true);

-- Allow anyone to upload to gofix-photos bucket
CREATE POLICY "Anyone can upload gofix photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gofix-photos');

-- Allow public read access to gofix-photos
CREATE POLICY "Public read access for gofix photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'gofix-photos');

-- Create gofix_requests table
CREATE TABLE public.gofix_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  repair_type TEXT NOT NULL,
  description TEXT,
  city TEXT,
  address TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  client_name TEXT,
  client_phone TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gofix_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Anyone can insert gofix requests"
ON public.gofix_requests FOR INSERT
WITH CHECK (true);

-- Restrict reads (admin only via service role)
CREATE POLICY "No public reads on gofix requests"
ON public.gofix_requests FOR SELECT
USING (false);
