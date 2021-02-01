const express = require('express');
const ctrl = require('./controller.js')

const app = express();

app.use(express.json());


app.get('/api/inputs', ctrl.getInputs);
app.get('/api/combos', ctrl.getSaved);
app.post('/api/combos', ctrl.saveCombo);



const port = 4000;
app.listen(port, () => console.log(`listening on port ${port}`))
