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
            saved: []
        }
    }

    componentDidMount() {
        this.getInputs();
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
        console.log(name)
        combo.pop()
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
        axios.put(`/api/combos/${id}`)
            .then(res => {
                this.setState({
                    current: res.data
                })
            })
            .catch(err => console.log(err))
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
                />
                <Saved 
                    editCombo={this.editCombo}
                    />

            </div>
        )
    }
}

export default Main