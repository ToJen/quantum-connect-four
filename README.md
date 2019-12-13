# quantum-connect-four

## Using Docker (Recommended)

1. `docker-compose up`

## Manually

1. Clone this repo: `git clone git@github.com:ToJen/quantum-connect-four.git`
2. cd client
3. yarn
4. yarn dev
5. Create a separate terminal session
6. cd server
7. pip install -r requirements.txt
8. python server.py

Visit <http://localhost:5000>

## Deploying

1. `docker-compose -f docker-compose.prod.yaml up`
