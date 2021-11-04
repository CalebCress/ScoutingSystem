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
Each data document contains the following fields

- `team`: team who data is on
- `scout`: scout who submited
- `data`: json containing all data collected scouting