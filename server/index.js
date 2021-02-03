const express = require('express');
const ctrl = require('./controller.js')

const app = express();

app.use(express.json());


app.get('/api/inputs/', ctrl.getInputs);
app.get('/api/combos', ctrl.getSaved);
app.post('/api/combos', ctrl.saveCombo);
app.delete('/api/combos/:id', ctrl.deleteCombo);
app.put('/api/combos/:id', ctrl.editCombo);
app.put('/api/inputs/:id', ctrl.editInputs)


const port = 4000;
app.listen(port, () => console.log(`listening on port ${port}`))
