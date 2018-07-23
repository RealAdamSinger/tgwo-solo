import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

import { Motion, spring } from 'react-motion';
import Game from './components/game.jsx';
import WelcomeScreen from './components/welcome.jsx';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      day: 0,
      opacity: 1,
      gameActive: false
    }
  }

  onClick = () => {
    var {
      day,
      opacity
    } = this.state;

    if (opacity !== 0) {
      this.setState({
        opacity: 0,
      }, () => {
        setTimeout(() => {
          this.setState({ day: ++day })
        }, 1000)
      });
    } else {
      this.setState({
        day: ++day,
      });
    }
  }

  render() {
    var {
      day,
      opacity
    } = this.state;

    return (
      <Motion
        key='Motion'
        style={{ opacity: spring(opacity) }}
        defaultStyle={{ opacity: 1 }}
      >
        {(styles) => (
          <div
            key='click-root'
            className='relative fill'
            onClick={this.onClick}
          >
            <div key='GameContainer' className='top-left fill'>
              <Game
                key='Game'
                day={day}
              />
            </div>
            {styles.opacity ? (
              <div
                key='Welcome'
                className='top-left fill'
                style={{
                  backgroundColor: 'black',
                  opacity: styles.opacity
                }}
              >
                <WelcomeScreen />
              </div>
            ) : null}
          </div>
        )}
      </Motion >
    )
  }
}

export default App;
