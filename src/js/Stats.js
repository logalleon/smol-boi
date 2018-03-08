/* global window */
const React = require('react');
const { ajax } = require('jquery');
const { HOST } = require('../../config');

class Stats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hash: '',
      url: '',
      hits: [],
      days: '',
    };
  }

  componentDidMount () {
    const { search } = window.location;
    const days = search.split('days=')[1];
    // Dangerrrrr
    const url = `/hit${search}`;
    ajax({
      url,
      method: 'GET',
      success: (response) => {
        // u = scope complaints
        const { hash, url: u, hits } = response;
        this.setState({
          hash,
          url: u,
          hits,
          days,
        });
      },
      error: (jqxhr) => {
        // @TODO
        console.log(jqxhr);
      },
    });
  }

  getFormattedUrl (hash) {
    return `${HOST}/r?h=${hash}`;
  }

  getFormattedHits (days, hits) {
    const hitCount = {};
    hits.forEach((hit) => {
      const { createdAt } = hit;
      const date = new Date(createdAt);
      const mdy = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
      if (hitCount[mdy]) {
        hitCount[mdy]++;
      } else {
        hitCount[mdy] = 1;
      }
    });
    const jsx = [];
    const now = new Date();
    const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    const oneDay = 24 * 60 * 60 * 1000;
    for (let i = 1; i <= days; i++) {
      const date = new Date(startDate.getTime() + (i * oneDay));
      const mdy = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
      if (hitCount[mdy]) {
        jsx.push(
          <li
            className='Stats__Hit'
            key={i}
          >
            <p>{mdy}</p>
            <h4>{hitCount[mdy]} Hits</h4>
            <span
              className='Stats__HitCount'
              style={{
                width: `${hitCount[mdy] * 10}px`,
              }}
            />
          </li>
        );
      } else {
        jsx.push(
          <li key={i}>
            <p>{mdy}</p>
          </li>
        );
      }
    }
    return jsx;
  }

  render () {
    const {
      hash,
      url,
      hits,
      days,
    } = this.state;
    if (hits.length) {
      const formattedHits = this.getFormattedHits(days, hits);
      return (
        <div className='Stats'>
          <div className='row'>
            <div className='col-8 offset-2'>
              <h3 className='text-center'>{this.getFormattedUrl(hash)}</h3>
              <h4 className='text-center'>{url}</h4>
              <p className='text-center'>Hits for the last {days} days.
              </p>
              <ul>
                {formattedHits}
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (url && !hits.length) {
      const formattedHits = this.getFormattedHits(days, hits);
      return (
        <div className='Stats'>
          <div className='row'>
            <div className='col-8 offset-2'>
              <h3 className='text-center'>{this.getFormattedUrl(hash)}</h3>
              <h4 className='text-center'>{url}</h4>
              <p className='text-center'>No hits for the last {days} days.
              </p>
              <ul>
                {formattedHits}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}
module.exports = Stats;
