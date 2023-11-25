# Checkers-React
#### A Checkers game, built with ReactJS and Typescript

##### Landing/home page:
Contains a breif description about the New Game and Replay pages.
![image](https://github.com/hikemalliday/checkers-react/assets/117792777/dd444abf-5927-47b0-9394-48a64143df6a)

#### New Game page:
The user can play a game against themself. The pieces are moved with drag and drop. When finished, they can click the export replay button. This uploads the replay to a SQLite database, stored on the [backend](https://github.com/hikemalliday/checkers-react-BACKEND).
![image](https://github.com/hikemalliday/checkers-react/assets/117792777/6811f631-d8a8-4a75-aa3c-b7aaa1b94ad5)

#### Replay page:
The user can select  a replay from the pullldown menu. They can then click the Play Replay button to watch the game.
![image](https://cdn.discordapp.com/attachments/617825237752479751/1177755506832576533/image.png?ex=6573a94a&is=6561344a&hm=1f8b00c24b7ebc3779e30dcaadaf581fb514f3d222c4716863c39300962696ef&)

#### DEV NOTES:
My second project created with ReactJS, as well as my second project created with Typescript. The replay feature plays the game from an array of objects. Each object represents a game turn, and contains the movement start and movement end coordinates. Its from these coordinates that we 'recreate' the piece movements.

Learned a fair amount about state management with this project. Specifically, the async nature of 'useState()', and the sync nature of 'useRef()'.

