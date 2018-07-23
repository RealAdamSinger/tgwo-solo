import React, { PureComponent } from 'react';
import _ from 'lodash';

import cards from '../data/wrath_cards.json';

import TextFit from 'react-textfit';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faSnowflake,
  faFire,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

const windText = ['Still Night', 'Windy Night', 'Stormy Night'];

class App extends PureComponent {
  constructor(props) {
    super(props)

    var deck = _.chain(cards).map((card) => {
      return _.times(card.count, () => {
        return card.id;
      });
    }).flatten()
      .orderBy(() => Math.random())
      .value();

    this.state = {
      deck,
      counts: {},
      day: 0,
      showWeather: false
    };
  }

  componentWillReceiveProps(nextProps) {
    var {
      day
    } = this.props;

    var {
      deck,
    } = this.state;

    deck = [...deck];

    var hand = deck.splice(0, 4),
      counts = _.countBy(hand);

    counts.wind = counts.wind || 0;

    if (counts.wind) {
      counts.frost += Math.floor(counts.wind / 2);
      counts.wind = Math.min(counts.wind, 2);
    }

    if (day !== nextProps.day) {
      this.setState({
        showDay: true
      }, () => {
        if (nextProps.day !== 1) {
          setTimeout(() => {
            this.setState({
              showNight: true,
              counts,
              deck
            });
          }, 2000)
          setTimeout(() => {
            this.setState({
              showDay: false,
              showNight: false,
            });
          }, 6000)
        } else {
          setTimeout(() => {
            this.setState({
              showDay: false,
              showNight: false,
              counts,
              deck
            }, () => {
              setTimeout(() => {
                this.setState({ showWeather: true })
              }, 2000)
            });
          }, 2000)
        }
      })
    }
  }

  getResults = (counts) => {

    var {
      wind = 0,
      frost = 0,
      aggression = 0,
      stalk = 0,
      hazard = 0
    } = counts;
    var frostText;



    if (frost > 2) {
      frost = 3;
      frostText = 'Whiteout';
    } else if (frost === 2) {
      frost = 3;
      frostText = 'Blizzard';
    } else {
      frost = 2
      frostText = 'Freezing';
    }

    return (
      <div>
        {windText[wind]}
        <div>
          {_.times(wind, () => <Icon icon={faFire} />)}
        </div>
        {frostText}
        <div>
          {_.times(hazard, () => <Icon icon={faExclamationTriangle} />)}
        </div>
        <div>
          {_.times(frost, () => <Icon icon={faSnowflake} />)}
        </div>
      </div>
    );
  }

  render() {
    var {
      day,
    } = this.props;

    var {
      counts,
      showDay,
      showNight,
      showWeather
    } = this.state;

    var results = this.getResults(counts)

    var wind = counts.wind;

    return (
      <div className="fill">
        {results}
      </div >
    )
  }
}

export default App;
