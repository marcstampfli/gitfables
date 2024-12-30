-- Add RLS policies for repository_syncs table
DROP POLICY IF EXISTS "Users can view their own repository syncs" ON repository_syncs;
CREATE POLICY "Users can view their own repository syncs" ON repository_syncs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM repositories
            WHERE repositories.id = repository_syncs.repository_id
            AND repositories.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can create repository syncs" ON repository_syncs;
CREATE POLICY "Users can create repository syncs" ON repository_syncs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM repositories
            WHERE repositories.id = repository_syncs.repository_id
            AND repositories.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can update their own repository syncs" ON repository_syncs;
CREATE POLICY "Users can update their own repository syncs" ON repository_syncs
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM repositories
            WHERE repositories.id = repository_syncs.repository_id
            AND repositories.user_id = auth.uid()
        )
    );

-- Add foreign key constraint if not exists
DO $$ BEGIN
    ALTER TABLE repository_syncs
    ADD CONSTRAINT repository_syncs_repository_id_fkey
    FOREIGN KEY (repository_id)
    REFERENCES repositories(id)
    ON DELETE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$; 