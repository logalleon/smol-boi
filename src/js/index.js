/* global window, document */
const React = require('react');
const ReactDOM = require('react-dom');
const Header = require('./Header');
const Form = require('./Form');
const Description = require('./Description');
const FourOhFour = require('./FourOhFour');
const Footer = require('./Footer');
const Stats = require('./Stats');
const { FOUR_OH_FOUR } = require('../../config');

const { href } = window.location;

window.onload = () => {
  const app = document.getElementById('app');
  // 404 page render
  if (href.match(new RegExp(FOUR_OH_FOUR), 'g')) {
    ReactDOM.render(
      <div className='SmolBoi'>
        <Header />
        <FourOhFour />
        <Footer />
      </div>,
      app
    );
  // Stats page
  } else if (href.match(/stats/g)) {
    ReactDOM.render(
      <div className='SmolBoi'>
        <Header />
        <Stats />
        <Footer />
      </div>,
      app
    );
  // Normal render
  } else {
    ReactDOM.render(
      <div className='SmolBoi'>
        <Header />
        <Description />
        <Form />
        <Footer />
      </div>,
      app
    );
  }
};
