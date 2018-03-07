/* global window */
const React = require('react');
const { ajax } = require('jquery');

class Stats extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hits: [],
    };
  }

  componentDidMount () {
    const { search } = window.location;
    // Dangerrrrr
    const url = `/hit${search}`;
    ajax({
      url,
      method: 'GET',
      success: (response) => {
        console.log(response);
      },
      error: (jqxhr) => {
        // @TODO
        console.log(jqxhr);
      },
    });
  }

  render () {
    const { hits } = this.state;
    if (hits.length) {
      return (
        <div />
      );
    } else {
      return (
        <div />
      );
    }
  }
}
module.exports = Stats;
