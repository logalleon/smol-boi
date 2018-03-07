const React = require('react');

const corgis = ['a', 'b', 'c', 'd'];

const getCorgi = () => {
  const index = Math.floor(Math.random() * (corgis.length));
  return `/img/corgi_${corgis[index]}.jpg`;
};

module.exports = () => (
  <div className='Description'>
    <div className='row'>
      <img
        src={getCorgi()}
        alt='A small corgi drawing'
      />
    </div>
    <div className='row'>
      <div className='col-8 offset-2'>
        <h2 className='text-center'>make heckin&#39; big urls vv smol</h2>
        <p>Smol Boi turns long, complex urls into bite-sized links.
          Easily link to special searches for dog-sized cumberbunds,
          blogs about homemade dog treats,
          and perhaps even human-centered activities.
        </p>
      </div>
    </div>
  </div>
);
