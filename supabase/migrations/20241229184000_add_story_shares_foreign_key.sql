-- Add foreign key constraint to story_shares table
ALTER TABLE story_shares
ADD CONSTRAINT fk_story_shares_story
FOREIGN KEY (story_id) REFERENCES stories(id)
ON DELETE CASCADE; 