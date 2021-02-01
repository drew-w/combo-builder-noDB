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
            <div className='display'>
                {mappedInputs}
            </div>
        </div>
    )
}

export default Builder