const inputs = require('../inputs.json') 
const saved = [{

}]
 

module.exports = {
    getInputs: (req, res) => {
        res.status(200).send(inputs);
    }
}