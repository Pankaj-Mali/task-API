const { urlencoded } = require("express");
const express = require("express")
const mongoose = require("mongoose");
const task = require("./models/task");
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

mongoose.connect("mongodb://0.0.0.0/newtaskapi", (e) => {
    (e) ? console.log(e.message) : console.log("database is up")
})

app.post("/v1/tasks", async (req, res) => {

    try {

        if (req.body.tasks) {

            const data = await task.insertMany(req.body.tasks);
            let info=[];

            for(let i=0 ;i<data.length ;i++){
                info.push({id:data[i]._id})
            }

            return res.status(201).json({
                tasks: info
            })

        } else {
            const data = await task.create(req.body)

            return res.status(201).json({
                id: data._id
            })

        }


    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }

});

app.get("/v1/tasks", async (req, res) => {

    try {

        const data = await task.find()

        res.status(200).json({
            tasks: data
        })

    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }

});

app.get("/v1/tasks/:id", async (req, res) => {

    try {

        const data = await task.findById(req.params.id)

        res.status(200).send(data)

    } catch (e) {
        res.status(404).json({
            error: "There is no task at that id"

        })
    }

});

app.delete("/v1/tasks/:id", async (req, res) => {

    try {
        const data = await task.findByIdAndDelete(req.params.id)
        res.status(204).send()

    } catch (e) {
        res.status(404).json({
            message: e.message

        })
    }

});

app.put("/v1/tasks/:id", async (req, res) => {

    try {

        const info = await task.findById(req.params.id)

        const data = await task.findByIdAndUpdate(req.params.id, req.body)
        res.status(204).send()

    } catch (e) {
        res.status(404).json({
            error: "There is no task at that id"

        })
    }

});

app.delete("/v1/tasks", async (req, res) => {

    try {
        let data = req.body.tasks
        for(let i=0;i<data.length;i++){
            await task.findByIdAndDelete(data[i].id)
        }
        res.status(204).send()
    } catch (e) {
        res.status(404).json({
            message: e.message

        })
    }

});




app.listen(8080, (e) => {
    (e) ? console.log(e.message) : console.log("server is up at 8080")
})