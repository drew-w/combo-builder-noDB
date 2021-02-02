import React, { Component } from 'react'
import axios from 'axios'
import InputDisplay from './inputDisplay';
import Builder from './Builder'
import Saved from './Saved'


class Main extends Component {
    constructor() {
        super();
        this.state = {
            inputs: [],
            currentName: '',
            current: [],
            saved: [],
            editing: 'false',
            id: ''
        }
    }

    componentDidMount() {
        this.getInputs();
        this.getSaved();
    }

    componentDidUpdate(){
        this.getSaved();
    }

    getInputs = () => {
        axios.get('/api/inputs')
            .then(res => {
                this.setState({
                    inputs: res.data
                })
            })
            .catch(err => console.log(err))
    }

    saveCombo = (combo) => {
        const name = [...this.state.currentName].join('')
        axios.post('/api/combos', { combo, name })
            .then(res => {
                this.setState({
                    saved: res.data,
                    currentName: '',
                    current: []
                })
            })
            .catch(err => console.log(err))
    }

    getSaved = () => {
        axios.get('/api/combos')
            .then(res => {
                this.setState({ saved: res.data })
            })
    }

    addToCombo = (newInput) => {
        let copy = [...this.state.current]
        copy.push(newInput);
        if (newInput.type === 'direction') {
            copy.push(this.state.inputs[0])
        }
        else if (newInput.type === 'button') {
            copy.push(this.state.inputs[1])
        }
        this.setState({ current: copy })
    }

    editCombo = (id) => {
        const savedCopy = [...this.state.saved]
        let index = savedCopy.findIndex(combo => combo.id === +id)
        let editableCombo = savedCopy[index]
        console.log('setting editing id to'+id)
        this.clearDisplay();
        this.setState({
            current: editableCombo.combo,
            currentName: editableCombo.name,
            editing: 'true',
            id: id
        })
    }

    saveEdits = (combo) => {
        const name = [...this.state.currentName].join('')
        const {id} = this.state
        console.log(`trying to put at ${id}`)
        axios.put(`/api/combos/${id}`, {combo, name, id})
            .then(res => {
                console.log(res.data)
                this.setState({
                    currentName: '',
                    current: [],
                    id: '',
                    editing: 'false'
                })
            })
            .catch(err => console.log(err))  
        this.clearDisplay()
    }

    clearDisplay = () => {
        this.setState({
            current: [],
            currentName: ''
        })
    }

    handleChange = (input) => {
        this.setState({ currentName: input })
    }

    render() {

        return (
            <div className='Main'>
                <InputDisplay
                    inputs={this.state.inputs}
                    addToCombo={this.addToCombo}
                />
                <Builder
                    current={this.state.current}
                    currentName={this.state.currentName}
                    clear={this.clearDisplay}
                    change={this.handleChange}
                    save={this.saveCombo}
                    editing={this.state.editing}
                    saveEdits={this.saveEdits}
                />
                <Saved 
                    editCombo={this.editCombo}
                    editing={this.state.editing}
                    />

            </div>
        )
    }
}

export default Main