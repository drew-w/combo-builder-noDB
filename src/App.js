import './reset.css';
import './App.css';
import Main from './Components/Main'
import Header from './Components/Header'
import { Component } from 'react';


class App extends Component {
  constructor() {
    super()
    this.state = {
      selector: 0,
      changeImages: 'false'
    }
  }

  selectImages = (id) => {
    alert(id)
    this.setState({
      selector: id,
      changeImages: 'true'
    })
  }

  finishChange = () => {
    this.setState({changeImages: 'false'})
  }


  render() {

    return (
      <main>
        <Header
          selector={this.selectImages}
        />
        <Main
          selector={this.state.selector}
          change={this.selectImages}
          finishChange={this.finishChange}
        />
      </main>
    );
  }
}
export default App;
