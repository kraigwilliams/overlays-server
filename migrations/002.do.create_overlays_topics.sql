CREATE TABLE overlays_topics(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    topic_name TEXT NOT NULL,
    topic_url TEXT NOT NULL,
    
    date_added TIMESTAMP NOT NULL DEFAULT now() ,
    user_id INTEGER REFERENCES overlays_users(id) NOT NULL 
);

-- note TEXT,