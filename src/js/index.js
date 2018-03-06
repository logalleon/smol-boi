/* global window, document */
const React = require('react');
const ReactDOM = require('react-dom');
const Header = require('./Header');
const Form = require('./Form');
const Description = require('./Description');
const Footer = require('./Footer');

window.onload = () => {
  ReactDOM.render(
    <div className='SmolBoi container container-fixed'>
      <Header />
      <Description />
      <Form />
      <Footer />
    </div>,
    // b/c trailing comma destroys this
    document.getElementById('app') // eslint-disable-line
  );
};
