function Builder(props) {

    let mappedInputs = props.current.map(e => {
        return (
            <div key={props.inputs}>
                <img src={e.image} className='builderImages'/>
            </div>
        )
    })
    return (
        <div className='Builder'>
            <input 
                type='text' 
                placeholder='Give your combo a name!'
                onChange={e => props.change(e.target.value)}
                value={props.currentName}
                />
            <div className='display'>
                {mappedInputs}
            </div>
            <div className='saveClearContainer'>
                {props.editing === 'false' ? 
                <button 
                    disabled={!props.currentName || !props.current}
                    className='displayButton' 
                    onClick={() => props.save(props.current)}>Save</button>
                    :
                    <button
                        disabled={!props.currentName}
                        className='displayButton'
                        onClick={() => props.saveEdits(props.current)}
                        >Save Edits</button>
                    
                    }

                <button className='displayButton' onClick={props.clear}>Clear</button>
            </div>
        </div>
    )
}

export default Builder