# Specsheet
Specsheet for team1540 Scouting System
## API
### API Endpoints
#### Submit Scouting Data
- `Endpoint`: `/submit`
- `Fields`:
  - `data`: json containing scouting data
  - `scout`: name of the scout who collected the data
  - `teamNumber`: team scouteds number

## Database
Uses MongoDB with database named `scouting`.
### Database Scheme
#### Scouting Data
Scouting data is stored in a collection called `data`.
Each document contains the following fields

- `teamId`: id of team data is on
- `scout`: scout who submited
- `data`: json containing all data collected scouting
- `eventId`: id of event data was collected

#### Events
Events stored in collection called `events`.
Each document contains the following fields

- `id`: id of event
- `name`: the events name i.e. "Bunny Bots"
- `teams`: list of team ids participating in the event

#### Teams
Teams stored in collection called `teams`.
Each document contains the following fields

- `id`: id of the team
- `name`: team name
- `number`: team number
