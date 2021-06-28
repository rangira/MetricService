const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

let data = new Map();

const testVal = (val) => /^\d+$/.test(val);

const processData = (data) => {
    const TIME_INTERVAL = 60*60*1000 // 1 hour
    let sum = 0;
    let curr = Date.now();
    data.forEach((count, dt) => {
        if (curr - dt < TIME_INTERVAL){
            sum += count;
        }
    });
    return sum;
};

app.get('/metric/springfield-residents/sum', (req, res) => {
    res.send(JSON.stringify(processData(data)))
});

app.post('/metric/springfield-residents', (req, res) => {
    if (!req.body.value || !testVal(req.body.value))
       res.status(400).send('Value is required and should be an integral value')
    
    let val = parseInt(req.body.value)
    data.set(Date.now(), val)
    res.status(200).send(`Value ${val} updated`)
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {app, processData};