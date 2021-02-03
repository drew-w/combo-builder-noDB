function Saved(props) {
  let mappedSaved = props.saved.map((e) => {
    return (
      <div key={e.id} className="savedContainer">
        <h1>{e.name}</h1>
        <div className="savedButtonBox">
          <button 
            className="savedButton" 
            onClick={() => props.editCombo(e.id)}
            disabled={props.editing === 'true'}>
            Edit
          </button>
          <button
            className="savedButton"
            onClick={() => props.deleteCombo(e.id)}
            disabled={props.editing === 'true'}
          >
            X
          </button>
        </div>
      </div>
    );
  });

  return <div className="Saved">{mappedSaved}</div>;
}

export default Saved;
