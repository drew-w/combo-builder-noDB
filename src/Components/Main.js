import React, { Component } from 'react'
import axios from 'axios'
import InputDisplay from './inputDisplay';
import Builder from './Builder'


class Main extends Component {
    constructor() {
        super();
        this.state = {
            inputs: [],
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

    addToCombo = (newInput) => {
        let copy = [...this.state.current]
        copy.push(newInput);
        if (newInput.type === 'direction'){
            copy.push(this.state.inputs[0])
        }
        else if (newInput.type === 'button'){
            copy.push(this.state.inputs[1])
        }
        this.setState({ current: copy })
    }

    render() {

        return (
            <div className='Main'>
                <InputDisplay
                    inputs={this.state.inputs} 
                    addToCombo={this.addToCombo}
                    />
                <Builder current={this.state.current}/>
            </div>
        )
    }
}

export default Main