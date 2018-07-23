import React, { PureComponent } from 'react';
import _ from 'lodash';

import Image from './image.jsx';
import welcomeImage from '../assets/images/crash_title.png'

class App extends PureComponent {

  render() {
    return (
      <div className='fill'>
        <Image href={welcomeImage} />
      </div>
    );
  }
}

export default App;
