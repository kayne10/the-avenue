# the-avenue
sports journalism website

### Pre-requisites
- Python3
- Virtualenv
- Postgres


### Start up
First, create database and save the name, user, and password in `creds.json`
Then follow these commands
```
source env/bin/activate
pip install -r requirements.txt
cd warmup_ave/
python manage.py migrate
```
Create a superuser for database
`python manage.py createsuperuser`
Then start the server
`python manage.py runserver`
If you want to leave the virtual environment: `deactivate`

### Start with Docker Compose
First, check settings.py file comments for docker setup.
Run the following
```
docker-compose build
docker-compose run web warmup_ave/manage.py migrate
docker-compose up -d
```
To access postgres shell:
`docker exec -it django_db_1 psql -U postgres`
