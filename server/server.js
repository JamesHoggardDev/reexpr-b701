const express = require('express');
const app = express();

app.get("/api", (req, res) => {
    res.json({ 
        "users": [
            {
                "name": "Faith",
                "num_comms": "046",
                "comment": "I like the setup and design",
                "objectID": 0,
            },
            {
                "name": "Vikrum",
                "num_comms": "015",
                "comment": "I agree.",
                "objectID": 1,
            },
            {
                "name": "Aaron",
                "num_comms": "051",
                "comment": "I would definitely recommend",
                "objectID": 2,
            },
            {
                "name": "Christina",
                "num_comms": "281",
                "comment": "Page 309 of the instructions covers the procedure for VoIP usage. ",
                "objectID": 3,
            },
            {
                "name": "Sarah",
                "num_comms": "101",
                "comment": "They offer up to 1-Year of Ink In-box",
                "objectID": 4,
            },
            {
                "name": "Rhonda",
                "num_comms": "123",
                "comment": "It works with my iMac, iPad and iPhone.",
                "objectID": 5,
            },
            {
                "name": "Danny",
                "num_comms": "044",
                "comment": "I don't like the setup",
                "objectID": 6,
            },
            {
                "name": "Cecilia",
                "num_comms": "143",
                "comment": "It's great to have",
                "objectID": 7,
            },
            {
                "name": "Jonas",
                "num_comms": "120",
                "comment": "This is just what I needed.",
                "objectID": 8,
            },
            {
                "name": "Peter",
                "num_comms": "046",
                "comment": "I like the setup and design",
                "objectID": 9,
            },
        ],
});
})

app.listen(5000, () => {console.log("server listening on port 5000") })



