import React, { Component } from 'react'
import axios from 'axios'

class Saved extends Component {
    constructor() {
        super();
        this.state = {
            savedCombos: []
        }
    }

    componentDidMount() {
        this.getSaved();
    }

    getSaved = () => {
        axios.get('/api/combos')
            .then(res => {
                this.setState({ savedCombos: res.data })
            })
    }

    render() {
        let mappedSaved = this.state.savedCombos.map(e => {
            return (
                <div key={e.id}>
                    <h1>{e.name}</h1>
                </div>
            )
        })
        console.log(mappedSaved)
        return (
            <div className='Saved'>
            </div>
        )
    }
}

export default Saved;