# quantum-connect-four

## About

This web based game is a submission for the IBM Quantum Awards 2019  the Game Award Challenge.
<br/>
This game is based on the tabletop game [Connect Four](https://en.wikipedia.org/wiki/Connect_Four) and also inspired by the popular [Quantum Tic Tac Toe](http://quantumtictactoe.com). However Connect Four differs from Tic Tac Toe in that the pieces are placed from the top and fall to the bottom under the influence of gravity.

## Contributors
- Arjit Khullar [@ToJen](https://github.com/ToJen)
- Tomisin Jenrola [@arjitkhullar](https://github.com/arjitkhullar)
- Rahul Choudary [@YenSid12](https://github.com/YenSid12)


## How To Play
The players take turns dropping pieces or discs into columns until they can form a horizontal, vertical or diagonal line of 4 pieces. Instead of placing these classical ('solid') pieces, players can also form quantum superpositions by clicking the 'Begin Superposition' and placing two quantum pieces (indicated by a lighter shade) in different spots, thereby potentially blocking their opponent's path. Both sides can either place solid or quantum pieces until the board is filled up, at which point, the superpositions collapse and the suriving pieces fall into place under the influence of gravity and the gameplay resumes until any one of the following counditions is met:
1. Player 1 forms a winning combo before their opponent. Note: the winning pieces must be solid and must not have any shaky quantum pieces underneath them, since that could potentially destroy a winning connection upon quantum measurement.
2. Player 2 forms a winning combo before their opponent
3. Tie I: The board gets completely filled up by solid pieces before either player can form a winning combo
4. Tie II: Both players form winning combos simultaneously upon collapse of all the superpositions, this is a tie condition unique only to our quantum version of Connect Four

## Using Docker (Recommended)

1. `docker-compose up --build --force-recreate --always-recreate-deps`

## Manually

1. Clone this repo: `git clone git@github.com:ToJen/quantum-connect-four.git`
2. cd client
3. yarn
4. yarn dev
5. Create a separate terminal session
6. cd server
7. pip install -r requirements.txt
8. python app.py

Visit <http://localhost:5000>

## Deploying

1. `docker-compose -f docker-compose.prod.yaml up --build`
