import React, { PureComponent } from 'react';
import _ from 'lodash';

import cards from '../data/wrath_cards.json';

import TextFit from 'react-textfit';

import Weather from './weather.jsx';

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
      if (nextProps.day !== 1) {
        this.setState({
          showWeather: false,
        }, () => {
          setTimeout(() => {
            this.setState({
              showDay: true,
            }, () => {
              setTimeout(() => {
                this.setState({
                  showNight: true,
                  counts,
                  deck,
                });
              }, 2000)
              setTimeout(() => {
                this.setState({
                  showDay: false,
                  showNight: false,
                }, () => {
                  setTimeout(() => {
                    this.setState({ showWeather: true })
                  }, 2000)
                });
              }, 6000)
            })
          }, 1000)
        })
      } else {
        this.setState({
          showDay: true,
        }, () => {
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
        })
      }
    }
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

    // var results = this.getResults(counts)

    var wind = counts.wind;

    return (
      <div className="relative fill">
        <div className="fill top-left">
          <Weather {...counts} />
        </div>
        <div
          className={"fill top-left " + (showWeather ? 'hide' : 'show-quick')}
          style={{ backgroundColor: "#000", color: "#FFF" }}
        >
          <div className={'fill ' + (showDay ? 'show' : 'hide')}>
            <div className={"fill flex-middle"} style={{ height: "50%" }}>
              <div style={{ width: '100%' }}>
                <TextFit mode='single' forceSingleModeWidth >
                  Day {day}
                </TextFit>
              </div>
            </div>
            <div className="flex-middle" style={{ width: "100%" }}>
              <div className={(showNight ? 'show' : 'hide')} style={{ width: '50%' }}>
                <TextFit mode='single' forceSingleModeWidth >
                  {windText[wind]}
                </TextFit>
              </div>
            </div>
            <div className="flex-middle" style={{ width: "100%" }}>
              {Boolean(wind) &&
                <div className={(showNight ? 'show' : 'hide')} style={{ width: '50%' }}>
                  <TextFit mode='single' forceSingleModeWidth >
                    Deteriorate All Active Fires by {wind}
                  </TextFit>
                </div>
              }
            </div>
          </div>

        </div>
      </div >
    )
  }
}

export default App;
