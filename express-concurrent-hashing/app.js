const express = require("express");

const app = express();

const PORT = process.env.PORT
const NODES = ["c1:5002", "c2:5003", "c3:5004", "c4:5005", "c5:5006", "c6:5007", "c7:5008", "c8:5009", "c9:5010", "c10:5011"]



app.get('/', (req, res) => {
    res.status(200);
    res.send("test")
})




app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server successfully running on port", PORT)
    } else {
        console.log("Server error on start: ", error)
    }
})
