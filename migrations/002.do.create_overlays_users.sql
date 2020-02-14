CREATE TABLE overlays_users(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
user_name TEXT NOT NULL UNIQUE,
user_password TEXT NOT NULL,
date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP
);

CREATE TABLE user_options(
id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
user_groups TEXT NOT NULL UNIQUE,
user_topics TEXT UNIQUE,
-- groups_owner TEXT REFERENCES overlays_users(user_name) NOT NULL,
-- topics_owner TEXT REFERENCES overlays_users(user_name) NOT NULL


);

-- CREATE TABLE user_groups(
--   id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
--    group_name TEXT NOT NULL UNIQUE,
--    group_owner TEXT REFERENCES overlays_users(user_name) NOT NULL
-- );



-- ALTER TABLE overlays_topics
--   ADD COLUMN
--     user_id INTEGER REFERENCES overlays_users(id) ON DELETE CASCADE;
-- ADD COLUMN group_id INTEGER REFERENCES overlays_users()