const React = require('react');

const corgis = ['a', 'b', 'c', 'd'];

const getCorgi = () => {
  const index = Math.floor(Math.random() * (corgis.length + 1));
  return `/img/corgi_${corgis[index]}.jpg`;
};

module.exports = () => (
  <div className='Header'>
    <h1 className='text-center'>Smol Boi</h1>
    <div className='row'>
      <img
        src={getCorgi()}
        alt='A small corgi drawing'
      />
    </div>
  </div>
);
