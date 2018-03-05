/* global document */
const React = require('react');
const ReactDOM = require('react-dom');
const Header = require('./Header');
const Form = require('./Form');

document.onload = () => {
  ReactDOM.render(
    <div className='SmolBoi'>
      <Header />
      <Form />
    </div>,
    document.getElementById('app') // eslint-disable-line
  );
};
