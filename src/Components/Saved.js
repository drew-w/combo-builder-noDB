import React, { Component } from 'react'
import axios from 'axios'

class Saved extends Component {
    constructor() {
        super();
        this.state = {
            savedCombos: []
        }
    }

    componentDidUpdate() {
        this.getSaved();
    }

    getSaved = () => {
        axios.get('/api/combos')
            .then(res => {
                this.setState({ savedCombos: res.data })
            })
    }

    deleteCombo = (id) => {

        axios.delete(`/api/combos/${id}`)
            .then(res => {
                this.setState({
                    savedCombos: res.data
                })
            })
    }

    render() {
        let mappedSaved = this.state.savedCombos.map(e => {
            return (
                <div key={e.id}>
                    <h1>{e.name}</h1>
                    <button className='displayButton' onClick={() => this.props.editCombo(e.id)}>Edit</button>
                    <button className='displayButton' onClick={() => this.deleteCombo(e.id)}>X</button>
                </div>
            )
        })

        return (
            <div className='Saved'>
                {mappedSaved}
            </div>
        )
    }
}

export default Saved;