/* global window */
const React = require('react');

const redirect = () => {
  window.location.href = '/';
};

module.exports = () => (
  <div className='Header'>
    <h1
      className='text-center'
      onClick={redirect}
    >Smol Boi</h1>
  </div>
);
