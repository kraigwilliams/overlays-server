# Overlays Server

This is the backend api for the Overlays App. It can be accessed here [Overlays Api]https://kraig-overlays-server.herokuapp.com/
There are four parts to the api.
The user service, topics service,notes service and authentication service.

## Topics Router
This router lives at /api/topics.
It handles the GET,POST,DELETE endpoints for topics in the database.
The endpoints are /api/topics and api/topics/:topicId.
/api/topic executed the getAllTopics function from the Topics Service



## Topics Service
This handles the CRUD operations for the database table where an user's submitted topics.
Get Topics gets the topics in the dabase that are linked to the user's id

#### getById 
Gets a topic by its specifc id. 
#### insertTopic 
This inserts a new topic posted by a user into the database. It executes the function insertTopic from the TopicsApiService.


## User Router
This route live within the api at /api/user and is responsible for the CRUD operations for adding a new user to the database.



## User Api Service
This handles the CRUD operations for requests to the api that connect to the database table that deals with registering new users to the overlays site.


## Auth Router
#### /api/login
This route handles authenticating a user logging back into their existing account.

#### /api/refresh
This route handles refreshing a user's authentication to keep them logged in based on their activity on the client side.


## Auth Api Service
This handles authenticating users to overlays using JSON web tokens.

## Notes Router
this route live as /api/notes. It handles the CRUD operations for notes in the database.
/bytopic/:topicName

## Notes API Service
This executes functions based on the calls made to the Notes Router at /api/notes

##### getAllNotes
This functions gets all the notes from a databases that are attached to the specified topics

##### insertNote
This function posts a new note attached to a topic into the database.

##### deleteNote
This functions deletes a specific note from a topic from the database
