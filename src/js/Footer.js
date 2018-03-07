const React = require('react');

module.exports = () => (
  <footer className='Footer'>
    <div className='container-fluid text-center'>
      <p>&copy;{new Date().getFullYear()}&nbsp;
        <a
          href='https://github.com/logalleon'
          target='_blank'
        >@logalleon
        </a>&nbsp; | &nbsp;Corgis from&nbsp;
        <a
          href='https://olliewhen.deviantart.com/art/A-lot-of-corgis-270452301'
          target='_blank'
        >here
        </a>.
      </p>
    </div>
  </footer>
);
