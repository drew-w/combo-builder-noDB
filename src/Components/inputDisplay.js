import React, { Component } from 'react'


class InputDisplay extends Component {
    constructor() {
        super();
    }

    render() {
        let mappedInputs = this.props.inputs.map(e => {
            if (e.id > 2) {
                return (
                    <div key={this.props.inputs.id} className='inputImages'>
                        <img
                            src={e.image}
                            onClick={() => this.props.addToCombo(e)}
                        />
                    </div>
                )
            }
        })
        return (
            <div className='InputDisplay'>
                {mappedInputs}
            </div>
        )
    }
}

export default InputDisplay;