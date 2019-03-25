const express = require("express");
const app = express();
const PORT = 8080;
const base = [
    {
        id: "id1",
        name: "Task1",
        size: 2.34,
        owner: "Zhidkov Artyom",
        created: new Date(1995, 2, 21),
        modified: new Date(2019, 2, 11)
    },
    {
        id: "id2",
        name: "Task2",
        size: 5.63,
        owner: "Mailo Mikola",
        created: new Date(1994, 11, 1),
        modified: new Date(2018, 3, 25)
    },
    {
        id: "id3",
        name: "Task3",
        size: 0.09,
        owner: "Bondarenko Svetlana",
        created: new Date(1999, 12, 31),
        modified: new Date(2000, 3, 5)
    },
];

const admin = {
    email: "wewe@gmail.com",
    password: "wewe"
};

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/list', (req, res) => {
    console.log(req);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(base));
});

app.get('/access', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(admin));
});

app.get('/list/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(base.filter((item) => item.id === req.params.id)));
});

app.listen(PORT, () => {
    console.log(`Listen to the port ${PORT}`);
});
