

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."activity_type" AS ENUM (
    'story_created',
    'story_updated',
    'story_shared',
    'story_exported',
    'api_key_created',
    'api_key_deleted',
    'settings_updated'
);


ALTER TYPE "public"."activity_type" OWNER TO "postgres";


CREATE TYPE "public"."share_type" AS ENUM (
    'public',
    'private',
    'team'
);


ALTER TYPE "public"."share_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_share_code"() RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z}';
  result text := '';
  i integer := 0;
  code_exists boolean;
begin
  loop
    result := '';
    for i in 1..8 loop
      result := result || chars[1+random()*(array_length(chars, 1)-1)];
    end loop;
    
    select exists(
      select 1 from public.shared_stories where share_code = result
    ) into code_exists;
    
    if not code_exists then
      return result;
    end if;
  end loop;
end;
$$;


ALTER FUNCTION "public"."generate_share_code"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_unique_username"("email" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  base_username TEXT;
  new_username TEXT;
  counter INTEGER := 0;
BEGIN
  -- Extract username from email (before @)
  base_username := split_part(email, '@', 1);
  -- Remove special characters and spaces
  base_username := regexp_replace(base_username, '[^a-zA-Z0-9]', '', 'g');
  -- Convert to lowercase
  base_username := lower(base_username);
  
  -- Try the base username first
  new_username := base_username;
  
  -- Keep trying with incrementing numbers until we find a unique username
  WHILE EXISTS (SELECT 1 FROM users WHERE username = new_username) LOOP
    counter := counter + 1;
    new_username := base_username || counter::TEXT;
  END LOOP;
  
  RETURN new_username;
END;
$$;


ALTER FUNCTION "public"."generate_unique_username"("email" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_activity_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) RETURNS TABLE("total_activities" bigint, "activities_by_type" "jsonb", "recent_activities" "jsonb")
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  activity_stats record;
  activity_counts jsonb;
  recent_list jsonb;
begin
  -- Get total activities
  select count(*)::bigint into total_activities
  from public.user_activity
  where user_id = p_user_id
  and created_at between p_start_date and p_end_date;

  -- Get activity counts by type
  select jsonb_object_agg(activity_type::text, count(*))
  into activities_by_type
  from public.user_activity
  where user_id = p_user_id
  and created_at between p_start_date and p_end_date
  group by activity_type;

  -- Get recent activities
  select jsonb_agg(
    jsonb_build_object(
      'id', id,
      'type', activity_type,
      'details', details,
      'created_at', created_at
    )
  )
  into recent_activities
  from (
    select id, activity_type, details, created_at
    from public.user_activity
    where user_id = p_user_id
    and created_at between p_start_date and p_end_date
    order by created_at desc
    limit 10
  ) recent;

  return next;
end;
$$;


ALTER FUNCTION "public"."get_user_activity_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.username IS NULL THEN
    NEW.username := generate_unique_username(NEW.email);
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_story_views"("p_share_code" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  update public.shared_stories
  set 
    views_count = views_count + 1,
    last_viewed_at = now()
  where share_code = p_share_code
  and (expires_at is null or expires_at > now());
end;
$$;


ALTER FUNCTION "public"."increment_story_views"("p_share_code" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."api_key_usage" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "api_key_id" "uuid" NOT NULL,
    "endpoint" "text" NOT NULL,
    "method" "text" NOT NULL,
    "status_code" integer NOT NULL,
    "response_time" integer NOT NULL,
    "user_agent" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."api_key_usage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."api_keys" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "key_hash" "text" NOT NULL,
    "scopes" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "last_used" timestamp with time zone,
    "expires_at" timestamp with time zone NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."api_keys" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."repositories" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "full_name" "text" NOT NULL,
    "owner" "text" NOT NULL,
    "description" "text",
    "url" "text" NOT NULL,
    "private" boolean DEFAULT false NOT NULL,
    "default_branch" "text" DEFAULT 'main'::"text" NOT NULL,
    "languages" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "stargazers_count" integer DEFAULT 0 NOT NULL,
    "forks_count" integer DEFAULT 0 NOT NULL,
    "watchers_count" integer DEFAULT 0 NOT NULL,
    "size" integer DEFAULT 0 NOT NULL,
    "story_count" integer DEFAULT 0 NOT NULL,
    "commit_count" integer DEFAULT 0 NOT NULL,
    "last_synced_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."repositories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."repository_syncs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "repository_id" "uuid" NOT NULL,
    "status" "text" NOT NULL,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "completed_at" timestamp with time zone,
    "error" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    CONSTRAINT "repository_syncs_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'in_progress'::"text", 'completed'::"text", 'failed'::"text"])))
);


ALTER TABLE "public"."repository_syncs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stories" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "repository_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "description" "text",
    "is_public" boolean DEFAULT false NOT NULL,
    "view_count" integer DEFAULT 0 NOT NULL,
    "share_count" integer DEFAULT 0 NOT NULL,
    "metadata" "jsonb" DEFAULT '{"style": "technical", "timespan": {"end": null, "start": null}, "generatedAt": null, "totalCommits": 0, "includeLineChanges": true, "includeTimeContext": true, "includeLanguageContext": true}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."stories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."story_shares" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "story_id" "uuid" NOT NULL,
    "sharer_id" "uuid" NOT NULL,
    "platform" "text" NOT NULL,
    "shared_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "story_shares_platform_check" CHECK (("platform" = ANY (ARRAY['twitter'::"text", 'linkedin'::"text", 'facebook'::"text"])))
);


ALTER TABLE "public"."story_shares" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."story_views" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "story_id" "uuid" NOT NULL,
    "viewer_id" "uuid",
    "viewed_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."story_views" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_activity" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "activity_type" "public"."activity_type" NOT NULL,
    "details" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."user_activity" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_settings" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "settings" "jsonb" DEFAULT '{"theme": {"mode": "system", "accent_color": "default"}, "privacy": {"show_activity": true, "default_story_visibility": "private"}, "repository": {"auto_sync": true, "default_branch": "main", "sync_frequency": "daily"}, "accessibility": {"font_size": "medium", "high_contrast": false, "reduce_animations": false, "keyboard_shortcuts": true}, "notifications": {"web": true, "email": true, "digest": "weekly"}}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "github_id" bigint NOT NULL,
    "email" "text",
    "name" "text" NOT NULL,
    "avatar_url" "text",
    "github_token" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "username" "text" NOT NULL,
    "social_links" "jsonb" DEFAULT '{}'::"jsonb"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."api_key_usage"
    ADD CONSTRAINT "api_key_usage_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."api_keys"
    ADD CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."repositories"
    ADD CONSTRAINT "repositories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."repository_syncs"
    ADD CONSTRAINT "repository_syncs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stories"
    ADD CONSTRAINT "stories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."story_shares"
    ADD CONSTRAINT "story_shares_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."story_views"
    ADD CONSTRAINT "story_views_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_activity"
    ADD CONSTRAINT "user_activity_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_github_id_key" UNIQUE ("github_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_username_key" UNIQUE ("username");



CREATE INDEX "api_key_usage_api_key_id_idx" ON "public"."api_key_usage" USING "btree" ("api_key_id");



CREATE INDEX "api_key_usage_created_at_idx" ON "public"."api_key_usage" USING "btree" ("created_at");



CREATE INDEX "api_keys_key_hash_idx" ON "public"."api_keys" USING "btree" ("key_hash");



CREATE INDEX "api_keys_user_id_idx" ON "public"."api_keys" USING "btree" ("user_id");



CREATE INDEX "idx_api_key_usage_api_key_id" ON "public"."api_key_usage" USING "btree" ("api_key_id");



CREATE INDEX "idx_api_keys_user_id" ON "public"."api_keys" USING "btree" ("user_id");



CREATE INDEX "idx_repositories_full_name" ON "public"."repositories" USING "btree" ("full_name");



CREATE INDEX "idx_repositories_user_id" ON "public"."repositories" USING "btree" ("user_id");



CREATE INDEX "idx_repository_syncs_repository_id" ON "public"."repository_syncs" USING "btree" ("repository_id");



CREATE INDEX "idx_stories_repository_id" ON "public"."stories" USING "btree" ("repository_id");



CREATE INDEX "idx_stories_user_id" ON "public"."stories" USING "btree" ("user_id");



CREATE INDEX "idx_story_shares_story_id" ON "public"."story_shares" USING "btree" ("story_id");



CREATE INDEX "idx_story_views_story_id" ON "public"."story_views" USING "btree" ("story_id");



CREATE INDEX "idx_user_activity_user_id" ON "public"."user_activity" USING "btree" ("user_id");



CREATE INDEX "idx_user_settings_user_id" ON "public"."user_settings" USING "btree" ("user_id");



CREATE INDEX "user_activity_created_at_idx" ON "public"."user_activity" USING "btree" ("created_at");



CREATE INDEX "user_activity_type_idx" ON "public"."user_activity" USING "btree" ("activity_type");



CREATE INDEX "user_activity_user_id_idx" ON "public"."user_activity" USING "btree" ("user_id");



CREATE OR REPLACE TRIGGER "on_auth_user_created" BEFORE INSERT ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();



CREATE OR REPLACE TRIGGER "update_repositories_updated_at" BEFORE UPDATE ON "public"."repositories" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_stories_updated_at" BEFORE UPDATE ON "public"."stories" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_user_settings_updated_at" BEFORE UPDATE ON "public"."user_settings" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



CREATE OR REPLACE TRIGGER "update_users_updated_at" BEFORE UPDATE ON "public"."users" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at"();



ALTER TABLE ONLY "public"."api_key_usage"
    ADD CONSTRAINT "api_key_usage_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."api_keys"
    ADD CONSTRAINT "api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."repositories"
    ADD CONSTRAINT "repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stories"
    ADD CONSTRAINT "stories_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."stories"
    ADD CONSTRAINT "stories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_shares"
    ADD CONSTRAINT "story_shares_sharer_id_fkey" FOREIGN KEY ("sharer_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."story_views"
    ADD CONSTRAINT "story_views_viewer_id_fkey" FOREIGN KEY ("viewer_id") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."user_activity"
    ADD CONSTRAINT "user_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_settings"
    ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



CREATE POLICY "System can insert API key usage" ON "public"."api_key_usage" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."api_keys"
  WHERE (("api_keys"."id" = "api_key_usage"."api_key_id") AND ("api_keys"."user_id" = "auth"."uid"())))));



CREATE POLICY "System can insert activity" ON "public"."user_activity" FOR INSERT WITH CHECK (true);



CREATE POLICY "Users can create their own API keys" ON "public"."api_keys" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own API keys" ON "public"."api_keys" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can delete their own stories" ON "public"."stories" FOR DELETE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own repositories" ON "public"."repositories" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own settings" ON "public"."user_settings" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert their own stories" ON "public"."stories" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can record story views" ON "public"."story_views" FOR INSERT WITH CHECK (true);



CREATE POLICY "Users can record their shares" ON "public"."story_shares" FOR INSERT WITH CHECK (("auth"."uid"() = "sharer_id"));



CREATE POLICY "Users can update their own data" ON "public"."users" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own profile" ON "public"."users" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own repositories" ON "public"."repositories" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own settings" ON "public"."user_settings" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update their own stories" ON "public"."stories" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view own activity" ON "public"."user_activity" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view share analytics" ON "public"."story_shares" FOR SELECT USING (true);



CREATE POLICY "Users can view story view counts" ON "public"."story_views" FOR SELECT USING (true);



CREATE POLICY "Users can view their own API key usage" ON "public"."api_key_usage" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."api_keys"
  WHERE (("api_keys"."id" = "api_key_usage"."api_key_id") AND ("api_keys"."user_id" = "auth"."uid"())))));



CREATE POLICY "Users can view their own API keys" ON "public"."api_keys" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own activity" ON "public"."user_activity" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own data" ON "public"."users" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own profile" ON "public"."users" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view their own repositories" ON "public"."repositories" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own settings" ON "public"."user_settings" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can view their own stories" ON "public"."stories" FOR SELECT USING ((("auth"."uid"() = "user_id") OR ("is_public" = true)));



ALTER TABLE "public"."api_key_usage" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."api_keys" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."repositories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."repository_syncs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."stories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."story_shares" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."story_views" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_activity" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_settings" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."generate_share_code"() TO "anon";
GRANT ALL ON FUNCTION "public"."generate_share_code"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_share_code"() TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_unique_username"("email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."generate_unique_username"("email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_unique_username"("email" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_activity_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_activity_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_activity_summary"("p_user_id" "uuid", "p_start_date" timestamp with time zone, "p_end_date" timestamp with time zone) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_story_views"("p_share_code" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_story_views"("p_share_code" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_story_views"("p_share_code" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."api_key_usage" TO "anon";
GRANT ALL ON TABLE "public"."api_key_usage" TO "authenticated";
GRANT ALL ON TABLE "public"."api_key_usage" TO "service_role";



GRANT ALL ON TABLE "public"."api_keys" TO "anon";
GRANT ALL ON TABLE "public"."api_keys" TO "authenticated";
GRANT ALL ON TABLE "public"."api_keys" TO "service_role";



GRANT ALL ON TABLE "public"."repositories" TO "anon";
GRANT ALL ON TABLE "public"."repositories" TO "authenticated";
GRANT ALL ON TABLE "public"."repositories" TO "service_role";



GRANT ALL ON TABLE "public"."repository_syncs" TO "anon";
GRANT ALL ON TABLE "public"."repository_syncs" TO "authenticated";
GRANT ALL ON TABLE "public"."repository_syncs" TO "service_role";



GRANT ALL ON TABLE "public"."stories" TO "anon";
GRANT ALL ON TABLE "public"."stories" TO "authenticated";
GRANT ALL ON TABLE "public"."stories" TO "service_role";



GRANT ALL ON TABLE "public"."story_shares" TO "anon";
GRANT ALL ON TABLE "public"."story_shares" TO "authenticated";
GRANT ALL ON TABLE "public"."story_shares" TO "service_role";



GRANT ALL ON TABLE "public"."story_views" TO "anon";
GRANT ALL ON TABLE "public"."story_views" TO "authenticated";
GRANT ALL ON TABLE "public"."story_views" TO "service_role";



GRANT ALL ON TABLE "public"."user_activity" TO "anon";
GRANT ALL ON TABLE "public"."user_activity" TO "authenticated";
GRANT ALL ON TABLE "public"."user_activity" TO "service_role";



GRANT ALL ON TABLE "public"."user_settings" TO "anon";
GRANT ALL ON TABLE "public"."user_settings" TO "authenticated";
GRANT ALL ON TABLE "public"."user_settings" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
