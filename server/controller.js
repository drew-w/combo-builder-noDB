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
    },
    deleteCombo: (req, res) => {
        const i = saved.findIndex(combo => combo.id === +req.params.id);
        saved.splice(i, 1);
        res.status(200).send(saved)
    },
    editCombo: (req, res) => {
        const i = saved.findIndex(combo => combo.id === + req.params.id);
        const editableCombo = saved[i]
        res.status(200).send(editableCombo)
    }
}