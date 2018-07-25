FROM python:3

# USER app
ENV PYTHONUNBUFFERED 1
# RUN mkdir /db
#RUN chown app:app -R /db

RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
# ADD warmup_ave/warmup_ave/creds.json /code/warmup_ave/warmup_ave
RUN pip install -r requirements.txt
ADD . /code/
