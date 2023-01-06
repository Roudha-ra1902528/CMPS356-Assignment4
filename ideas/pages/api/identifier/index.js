import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
let data = null
let _data = require('../../../tmp/users.json')  //for testing

export default async function handler(req, res) {

    const file = await fs.promises.readFile("tmp/users.json");
    data = JSON.parse(file)

    switch (req.method) {
        case 'GET':
            return getUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    function getUser() {
        const user = uuidv4()
        data.push({user})
        saveData()
        res.status(200).json(user)
    }

}

function saveData() {
    fs.writeFileSync('tmp/users.json', JSON.stringify(data, null, 4));
}