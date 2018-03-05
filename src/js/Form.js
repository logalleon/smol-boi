const React = require('react');
const { ajax } = require('jquery');

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    const { url } = this.state;
    const method = 'POST';
    const data = { url };
    ajax({
      url: '/r/',
      method,
      data,
      contentType: 'application/json',
      success: (response) => {
        console.log(response);
      },
      error: (jqxhr) => {
        console.log(jqxhr);
      },
    });
  }

  render () {
    return (
      <form
        className='form form-horizontal Form'
        onSubmit={this.handleSubmit}
      >
        <div className='form-input'>
          <input
            className='input'
            type='text'
          />
          <input
            className='btn btn-success'
            type='submit'
            value='Shorten'
          />
        </div>
      </form>
    );
  }

}

module.exports = Form;
