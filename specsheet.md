# Specsheet
Specsheet for team1540 Scouting System
## API
### API Endpoints
#### Submit Scouting Data
- Endpoint: `/submit`
- Method: `Post`
- Request Fields:
  - `data`: json containing scouting data
  - `scout`: id of scout collecting data
  - `teamNumber`: team scouted's number
  - `eventId`: id of event data was collected at
 
#### Add Team
- Endpoint: `/addteam`
- Method: `Post`
- Fields:
  - `number`: number of the team
  - `name`: name of the team

#### Add Event
- Endpoint: `/addevent`
- Method: `Post`
- Request Fields:
  - `name`: name of the event
  - `teams`: list of teams participating in the event

#### Add Team to Event
- Endpoint: `/eventteam`
- Method: `Post`
- Request Fields:
  - `eventId`: id of event to add team too
  - `number`: number of team added

#### Add Note
- Endpoint: `/addnote`
- Method: `Post`
- Request Fields:
  - `name`: name of the note (default to "note")
  - `notes`: notes taken
  - `eventId`: id of event notes were taken at

#### Get Data on Team
- Endpoint: `/teamdata`
- Method: `Post`
- Request Fields:
  - `teamNumber`: number of the team
  - `eventId`: id of event data was requested for (0 if all events)

#### Get Events
- Endpoint: `/events`
- Method: `Get`

#### Get Event
- Endpoint: `/event`
- Method: `Post`
- Request Fields:
  - `eventId`: id of the event

#### Get All Data
- Endpoint: `/all`
- Method: `Get`

#### Get Notes
- Endpoint: `/notes`
- Method: `Get`

#### Queue Scouts
- Endpoint: `/queue`
- Method: `Post`
- Request Fields:
  - `eventId`: id of event
  - `scouts`: list of scouts to queue for round
  - `roundNumber`: number of round to queue scouts for

#### Get Queued Scouts
- Endpoint: `/roundQueue`
- Method: `Post`
- Request Fields:
  - `roundNumber`: number of round you want to get scouts for
  - `eventId`: id of event queue is for
- Response Fields:
  - `scouts`: list of id's of queued scouts

## Database
Uses MongoDB with database named `scouting`.
### Database Scheme
#### Scouting Data
Scouting data is stored in a collection called `data`.
Each document contains the following fields

- `teamNumber`: number of team data is on
- `scoutId`: id of scout who submited
- `data`: json containing all data collected scouting
- `eventId`: id of event data was collected

#### Events
Events stored in collection called `events`.
Each document contains the following fields

- `id`: id of event
- `name`: the events name i.e. "Bunny Bots"
- `teams`: list of team numbers participating in the event

#### Teams
Teams stored in collection called `teams`.
Each document contains the following fields

- `name`: team name
- `number`: team number

#### Notes
Stores custom notes in collection called `notes`.

- `name`: name of the notes
- `notes`: notes taken
- `eventId`: event notes were taken at

#### Scouting Log
Stores log of who is scouting each match at events in collection called `scoutingLog`.

- `scoutId`: id of scout
- `matchNumber`: number of match they will scout

#### Match Log
Stores matches with teams who played at events in collection called `matchLog`.

- `number`: match number
- `teams`: list of 6 teams in match
- `eventId`: event id matches are at