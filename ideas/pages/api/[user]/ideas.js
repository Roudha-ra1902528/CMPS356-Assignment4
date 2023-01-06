import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
let data = null
let _data = require('../../../tmp/ideas.json')  //for testing

export default async function handler(req, res) {

    const file = await fs.promises.readFile("tmp/ideas.json");
    data = JSON.parse(file)

    switch (req.method) {
        case 'GET':
            return get();
        case 'POST':
            return post();
        case 'DELETE':
            return remove();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    function get() {
        if(!req.query.user) 
        res.status(200).json([])
        res.status(200).json(data.filter(idea => idea.user == req.query.user))
    }

    function post() {
        data.push({ideaId: uuidv4(), ...req.body})
        console.log("in post")
        saveData()
        res.status(200).json({ message: "Successfully Added Idea!" })
    }

    function remove() {
        const { user, ideaId } = req.query    //use the user UUID and the idea UUID to delete

        const index = data.findIndex(idea => idea.user == user && idea.ideaId == ideaId) 

        if(index == -1)
        res.status(200).json({ message: "No Idea!" })
        else{
        data.splice(index, 1)
        saveData()
        res.status(200).json({ message: "Successfully Deleted Idea!" })
        }
    }
}

function saveData() {
    fs.writeFileSync('tmp/ideas.json', JSON.stringify(data, null, 4));
}