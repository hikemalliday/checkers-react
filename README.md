# Checkers-React
#### A Checkers game, built with ReactJS and Typescript

### Local Installation:
I have added a 'docker-compose' folder, which contains a docker-compose.yaml. Run this YAML to pull both the backend and frontend images from Docker Hub and launch the website locally.

###### Docker Hub:

https://hub.docker.com/r/hikemalliday/checkers-react-frontend

##### Landing/home page:
Contains a breif description about the New Game and Replay pages.
![image](https://github.com/hikemalliday/checkers-react/assets/117792777/dd444abf-5927-47b0-9394-48a64143df6a)

#### New Game page:
The user can play a game against themself. The pieces are moved with drag and drop. When finished, they can click the export replay button. This uploads the replay to a SQLite database, stored on the [backend](https://github.com/hikemalliday/checkers-react-BACKEND).
![image](https://github.com/hikemalliday/checkers-react/assets/117792777/6811f631-d8a8-4a75-aa3c-b7aaa1b94ad5)

#### Replay page:
The user can select  a replay from the pullldown menu. They can then click the Play Replay button to watch the game.
![image](https://cdn.discordapp.com/attachments/617825237752479751/1177755506832576533/image.png?ex=6573a94a&is=6561344a&hm=1f8b00c24b7ebc3779e30dcaadaf581fb514f3d222c4716863c39300962696ef&)

### Go ahead and try it!

Play a game against youself under the New Game page, then click the export replay button. Then, go to the Replays page. Your game will be the highest numbered ID in the drop down list. Run the replay!

#### DEV NOTES:
My second project created with ReactJS, as well as my second project created with Typescript. TypeScript certainly did not solve any problems for me, I merely forced myself to build with it to expose myself to it. 

The replay feature plays the game from an array of objects. Each object represents a game turn, and contains the movement start and movement end coordinates. Its from these coordinates that we 'recreate' the piece movements.

I learned a fair amount about state management with this project.

