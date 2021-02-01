const inputs = require('../inputs.json') 
const saved = [];

let id = 1;
 

module.exports = {
    getInputs: (req, res) => {
        res.status(200).send(inputs);
    },
    getSaved: (req, res) => {
        res.status(200).send(saved)
    },
    saveCombo: (req, res) => {
        const {combo} = req.body;
        const {name} = req.body;
        const newCombo = {id, name, combo}
        saved.push(newCombo);
        id++;
        res.status(200).send(saved)
    }
}