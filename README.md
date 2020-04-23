# Overlays Server

This is the backend api for the Overlays App.
There are three parts to the api.
The topics service, the notes service and the user authentication service.

## Topics Router
This router lives at /api/topics.
It handles the GET,POST,DELETE endpoints for topics in the database.
The endpoints are /api/topics and api/topics/:topicId



## Topics Service
This handles the CRUD operations for the database table where an user's submitted topics.
Get Topics gets the topics in the dabase that are linked to the user's id

#### GetById 
Gets a topic by its specifc id.
#### InsertTopic 
This inserts a new topic posted by a user into the database. It executes the function insertTopic from the TopicsApiService.


## User Router


## User Api Service
This handles the CRUD operations for requests to the api that connect to the database table that deals 
registering new users to the overlays site.


## Auth Api Service
This handles authenticating users to overlays using JSON web tokens.

## Notes API Service
This executes functions based on the calls made to the Notes Router at /api/notes

#### getAllNotes
This functions gets all the notes from a databases that are attached to the specified topics

#### insertNote
This function posts a new note attached to a topic into the database.
