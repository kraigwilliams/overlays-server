CREATE TABLE user_notes (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  note_owner INTEGER REFERENCES overlays_users(id) NOT NULL,
  from_topic INTEGER REFERENCES overlays_topics(id) NOT NULL,
  note_title TEXT NOT NULL,
  note_contents TEXT NOT NULL
);