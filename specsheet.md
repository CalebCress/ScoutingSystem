# Specsheet
Specsheet for team1540 Scouting System
## API
### API Endpoints
#### Submit Scouting Data
- Endpoint: `/submit`
- Method: `Post`
- Fields:
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
- Fields:
  - `name`: name of the event
  - `teams`: list of teams participating in the event

#### Add Team to Event
- Enpoint: `/eventteam`
- Method: `Post`
- Field:
  - `eventId`: id of event to add team too
  - `number`: number of team added

#### Get Data on Team
- Endpoint: `/teamdata`
- Method: `Post`
- Fields:
  - `teamNumber`: number of the team
  - `eventId`: id of event data was requested for (0 if all events)

#### Get Events
- Endpoint: `/events`
- Method: `Get`

## Database
Uses MongoDB with database named `scouting`.
### Database Scheme
#### Scouting Data
Scouting data is stored in a collection called `data`.
Each document contains the following fields

- `teamNumber`: number of team data is on
- `scout`: scout who submited
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
