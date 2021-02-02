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

    componentDidMount() {
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
                <div key={e.id} className='savedContainer'>
                    <h1>{e.name}</h1>
                    <div className='savedButtonBox'>
                        {this.props.editing === 'false' ?
                            <button className='savedButton' onClick={() => this.props.editCombo(e.id)}>Edit</button>
                            :
                            <button disabled={true} className='savedButton'>Edit</button>
                        }
                        <button className='savedButton' onClick={() => this.deleteCombo(e.id)}>Delete</button>
                    </div>
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