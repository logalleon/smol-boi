/* global document */
const React = require('react');
const { ajax } = require('jquery');
const { HOST } = require('../../config');

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: '',
      hash: '',
      linkReceived: false,
    };
    this.inputUrlOnKeyUp = this.inputUrlOnKeyUp.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.getFormattedUrl = this.getFormattedUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  getFormattedUrl (hash) {
    return `${HOST}/r?h=${hash}`;
  }

  inputUrlOnKeyUp (e) {
    const { value: url } = e.target;
    this.setState({ url });
  }

  resetForm (e) {
    e.preventDefault();
    const { value: url } = e.target;
    const linkReceived = false;
    const hash = '';
    this.setState({ url, hash, linkReceived });
  }

  copyLink (e) {
    e.preventDefault();
    this.shortenedUrlInput.select();
    document.execCommand('Copy');
  }

  handleSubmit (e) {
    e.preventDefault();
    const { url } = this.state;
    const method = 'POST';
    const data = JSON.stringify({ url });
    ajax({
      url: '/r/',
      method,
      data,
      contentType: 'application/json',
      success: (response) => {
        if (!response.error) {
          const { hash } = response;
          const linkReceived = true;
          this.setState({ hash, linkReceived });
        } else {
          // @TODO
        }
      },
      error: (jqxhr) => {
        console.log(jqxhr);
        // @TODO
      },
    });
  }

  render () {
    const { url, linkReceived, hash } = this.state;
    if (linkReceived) {
      return (
        <form
          className='Form form form-horizontal'
        >
          <div className='row'>
            <input
              className='form-control col-lg-8'
              type='text'
              value={hash}
              onKeyUp={this.resetForm}
              ref={(input) => { this.shortenedUrlInput = input; }}
            />
            <button
              className='btn btn-success col-lg-4'
              value='Copy'
              onClick={this.copyLink}
            >Copy
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form
          className='Form form form-horizontal'
          onSubmit={this.handleSubmit}
        >
          <div className='row'>
            <input
              className='form-control col-lg-8'
              type='text'
              defaultValue={url}
              placeholder='Enter URL to Shorten'
              onKeyUp={this.inputUrlOnKeyUp}
            />
            <input
              className='btn btn-success col-lg-4'
              type='submit'
              value='Shorten'
            />
          </div>
        </form>
      );
    }
  }

}

module.exports = Form;
