import React, { Component } from "react";
import axios from "axios";
import InputDisplay from "./inputDisplay";
import Builder from "./Builder";
import Saved from "./Saved";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
      currentName: "",
      current: [],
      saved: [],
      editing: "false",
      id: "",
    };
  }

  componentDidMount() {
    this.getInputs();
    this.getSaved();
  }

  getInputs = () => {
    axios
      .get(`/api/inputs/`)
      .then((res) => {
        this.setState({
          inputs: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  updateInputs = (id) => {
    axios.put(`/api/inputs/${id}`).then((res) => {
      this.setState({
        inputs: res.data,
      });
    });
  };

  saveCombo = (combo) => {
    const name = [...this.state.currentName].join("");
    axios
      .post("/api/combos", { combo, name })
      .then((res) => {
        this.setState({
          saved: res.data,
          currentName: "",
          current: [],
        });
        this.getSaved();
      })
      .catch((err) => console.log(err));
  };

  addToCombo = (newInput) => {
    let copy = [...this.state.current];
    copy.push(newInput);
    if (newInput.type === "direction") {
      copy.push(this.state.inputs[0]);
    } else if (newInput.type === "button") {
      copy.push(this.state.inputs[1]);
    }
    this.setState({ current: copy });
  };

  editCombo = (id) => {
    const savedCopy = [...this.state.saved];
    let index = savedCopy.findIndex((combo) => combo.id === +id);
    let editableCombo = savedCopy[index];
    console.log(id);
    console.log(editableCombo);
    console.log("saved " + savedCopy);
    console.log(index);
    this.setState({
      current: editableCombo.combo,
      currentName: editableCombo.name,
      editing: "true",
      id: id,
    });
  };

  saveEdits = (combo) => {
    const name = [...this.state.currentName].join("");
    const { id } = this.state;
    axios
      .put(`/api/combos/${id}`, { combo, name, id })
      .then((res) => {
        this.setState({
          saved: res.data,
          currentName: "",
          current: [],
          id: "",
          editing: "false",
        });
      })
      .catch((err) => console.log(err));
  };

  clearDisplay = () => {
    this.setState({
      current: [],
      currentName: "",
    });
  };

  handleChange = (input) => {
    this.setState({ currentName: input });
  };
  getSaved = () => {
    axios.get("/api/combos").then((res) => {
      this.setState({ saved: res.data });
    });
  };

  deleteCombo = (id) => {
    axios.delete(`/api/combos/${id}`).then((res) => {
      this.setState({
        saved: res.data,
      });
    });
  };

  render() {
    return (
      <div className="Main">
        <InputDisplay inputs={this.state.inputs} addToCombo={this.addToCombo} />
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
            saved={this.state.saved}
            editing={this.state.editing}
            editCombo={this.editCombo}
            deleteCombo={this.deleteCombo}
            />
      </div>
    );
  }
}

export default Main;
