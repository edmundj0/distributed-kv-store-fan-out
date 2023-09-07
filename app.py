import os, time
from collections import defaultdict
from flask import Flask, request, Response
import requests
import logging
import json
import concurrent.futures

import socket
print(socket.gethostname())

logging.getLogger().setLevel(logging.INFO)

# INFO
# WARNING
# DEBUG
# ERROR

PORT = os.getenv('PORT')

app = Flask(__name__)

NODE_LIST = ["c1:5002", "c2:5003", "c3:5004", "c4:5005", "c5:5006", "c6:5007", "c7:5008", "c8:5009", "c9:5010", "c10:5011"]

DATA_DICT = defaultdict(lambda x: -1)

@app.route("/")
def test():
    # res = requests.get('127.0.0.1:5000/')
    # print('aa', res)
    return 'test'


# /add
#  adds key value to dict
@app.route("/add", methods=["POST"])
def add():
    time.sleep(1)
    key = request.json["key"]
    value = request.json["value"]
    is_forwarded = request.json.get("forwarded", False)

    DATA_DICT[key] = value

    payload = {"key": key, "value": value, "forwarded": True}

    if not is_forwarded:
        logging.info([n for n in NODE_LIST if n.split(':')[-1] != PORT])

        def send_request(node, payload):
            for node in [n for n in NODE_LIST if n.split(':')[-1] != PORT]:
                try:
                    resp = requests.post(f'http://{node}/add', data=json.dumps(payload), headers={'Content-Type':'application/json'}, timeout=3)

                    logging.info(f'{node}:  STATUS  [OK], response:  {resp}')
                except Exception as e:
                    logging.error(e)
                    logging.info(f'{node}:  STATUS  [ERR]')



        # Concurrent fan out
        with concurrent.futures.ThreadPoolExecutor() as executor:
            # futures = []
            for node in [n for n in NODE_LIST if n.split(':')[-1] != PORT]:
                # futures.append(executor.submit(send_request, node, payload))
                executor.submit(send_request, node, payload)

            # concurrent.futures.wait(futures)


    return Response({"message": "done"},status=200)



@app.route("/get/<key>")
def get(key):
    return DATA_DICT[key]

# /del
#  deletes key from dict

# /get
#  gets value of key




def run():
    app.run('0.0.0.0', port=PORT)

if __name__ == '__main__':
    #
    #
    #
    #
    #
    run()
