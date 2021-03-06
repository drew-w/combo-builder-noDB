const inputs = require('../inputs.json') 
const inputsSF = require('../inputs-sf.json')
const inputsUNI = require('../inputs-uni.json')
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
        const {combo, name, id} = req.body
        saved[i] = {
            combo: combo,
            id: id,
            name: name
        }
        res.status(200).send(saved)
    },
    editInputs: (req, res) => {
        if (req.params.id === 2){
            res.status(200).send(inputsSF)
        }
        else if (req.params.id === 3){
            res.status(200).send(inputsUNI)
        }
        else {
            res.status(200).send(inputs)
        }
    }
}