-- Update any null or invalid provider values to github
UPDATE repositories 
SET provider = 'github'::repository_provider 
WHERE provider IS NULL OR provider::text = 'undefined'; 