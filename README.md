# quantum-connect-four

## About

This web based game is a submission for the IBM Quantum Awards 2019  the Game Award Challenge.
<br/>
The game is influenced by the popular [Quantum Tic Tac Toe](http://quantumtictactoe.com).

## Contributors
- Arjit Khullar [@ToJen](https://github.com/ToJen)
- Tomisin Jenrola [@arjitkhullar](https://github.com/arjitkhullar)
- Rahul Choudary [@YenSid12](https://github.com/YenSid12)


## How To Play
Player 1 makes move
picks one column for solid piece or two columns for superposed pieces
only permit move if there is space, otherwise force the player to retry move

call collapse, which will only execute if board is full
call gravity
call victory

if game doesnt end Player 2 makes his move just like player 1

call collapse, gravity and victory
rinse and repeat until victory or tie conditions are satisfied


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
