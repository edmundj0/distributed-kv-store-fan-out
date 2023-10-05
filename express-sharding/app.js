const express = require("express");
const fetch = require("node-fetch");
const { calculateHash, findNode } = require("./consistent-hashing");

const app = express();

const PORT = process.env.PORT
const NODES = ["c1:5002", "c2:5003", "c3:5004", "c4:5005", "c5:5006", "c6:5007", "c7:5008", "c8:5009", "c9:5010", "c10:5011"]

const DATA_OBJECT = {}

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json(DATA_OBJECT)
})

app.post('/add', (req, res) => {
    const key = req.body.key
    const value = req.body.value
    const isForwarded = req.body.forwarded || false
    console.log(key, value)

    if (isForwarded) {
        DATA_OBJECT[key] = value
    }


    // forward data to appropriate node
    if (!isForwarded) {
        const hash = calculateHash(key)
        const nodeIndex = findNode(hash, NODES)

        // data goes into current node
        if (PORT === NODES[nodeIndex].split(":")[1]) {
            DATA_OBJECT[key] = value
            return res.status(200).json({ message: `key: ${key} stored in Node ${nodeIndex} with IP ${PORT}` })
        }

        const portNum = NODES[nodeIndex].split(":"[1])
        const payload = { "key": key, "value": value, "forwarded": true }
        sendData(portNum, payload)
    }

    return res.status(200).json({ message: "done" })

})

async function sendData(portNum, payload) {
    const url = `http:${portNum}/add`
    const options = {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(`${portNum}: STATUS [OK], response: ${JSON.stringify(data)}`)
        })
        .catch((error) => {
            console.error(`STATUS [ERR]: ${error}`)
        })
}



app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server successfully running on port", PORT)
    } else {
        console.log("Server error on start: ", error)
    }
})
