const React = require('react');

const terms = [
  'uh oh',
  'heck',
  'dang',
  'oof ouch owie'
];

const getTerm = () => {
  const index = Math.floor(Math.random() * (terms.length));
  return `${terms[index]} . . .`;
};


module.exports = () => (
  <div className='FourOhFour'>
    <div className='row'>
      <img
        src='/img/corgi_404.jpg'
        alt='A corgi looking away'
      />
    </div>
    <div className='row'>
      <div className='col-8 offset-2'>
        <h2 className='text-center'>{getTerm()}</h2>
        <p>It looks like the link you used was invalid. Smol Boi links
          should look something like `http://smol-boi.com/r?h=1234abcd`. If you think you reached this
          page in error, start barking for help. <a href='/'>Or click here</a> to go home.
        </p>
      </div>
    </div>
  </div>
);
