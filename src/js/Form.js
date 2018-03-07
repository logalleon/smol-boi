/* global document */
const React = require('react');
const { ajax } = require('jquery');
const isUrl = require('is-url');
const { HOST } = require('../../config');

class Form extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: '',
      hash: '',
      timesGenerated: 0,
      linkReceived: false,
      linkCopied: false,
      isValid: true,
    };
    this.generatedUrlOnChange = this.generatedUrlOnChange.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.getFormattedUrl = this.getFormattedUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getFormattedUrl (hash) {
    return `${HOST}/r?h=${hash}`;
  }

  generatedUrlOnChange (e) {
    const { value: url } = e.target;
    this.setState({ url });
  }

  resetForm (e) {
    e.preventDefault();
    const { value: url } = e.target;
    const linkReceived = false;
    const linkCopied = false;
    const hash = '';
    this.setState({
      url,
      hash,
      linkReceived,
      linkCopied,
    });
  }

  copyLink (e) {
    e.preventDefault();
    this.input.select();
    // This won't work on IE9, but hey this is a cool React app so yeah, f'IE
    document.execCommand('Copy');
    const linkCopied = true;
    this.setState({ linkCopied });
  }

  handleSubmit (e) {
    e.preventDefault();
    const { url } = this.state;
    if (isUrl(url)) {
      const isValid = true;
      const method = 'POST';
      const data = JSON.stringify({ url });
      ajax({
        url: '/r/',
        method,
        data,
        contentType: 'application/json',
        success: (response) => {
          if (!response.error) {
            const { hash, timesGenerated } = response;
            const linkReceived = true;
            this.setState({
              hash,
              timesGenerated,
              linkReceived,
              isValid,
            });
          } else {
            // @TODO
          }
        },
        error: (jqxhr) => {
          console.log(jqxhr);
          // @TODO
        },
      });
    } else {
      const isValid = false;
      this.setState({ isValid });
    }
  }

  render () {
    const {
      hash,
      timesGenerated,
      url,
      linkReceived,
      linkCopied,
      isValid,
    } = this.state;
    // The default form, which shortens a link
    if (!linkReceived) {
      return (
        <div>
          <form
            className='Form form form-horizontal'
            onSubmit={this.handleSubmit}
          >
            <div className='row'>
              <input
                className='form-control offset-2 col-6'
                type='text'
                value={url}
                placeholder='Enter URL to Shorten'
                onChange={this.generatedUrlOnChange}
                ref={(input) => { this.input = input; }}
              />
              <input
                className='btn btn-success col-2'
                type='submit'
                value='Shorten'
              />
            </div>
          </form>
          {!isValid &&
            <div className='col-6 offset-3 well'>
              <p className='text-center'>It looks like the link you entered was invalid.
               Please check the link and try again.
              </p>
            </div>
          }
        </div>
      );
    // Display a form with a copy link button if data has been received
    } else {
      return (
        <div>
          <form
            className='Form form form-horizontal'
          >
            <div className='row'>
              <input
                className='form-control offset-2 col-6'
                type='text'
                value={this.getFormattedUrl(hash)}
                onChange={this.resetForm}
                ref={(input) => { this.input = input; }}
              />
              <button
                className='btn btn-success col-2'
                value='Copy'
                onClick={this.copyLink}
              >Copy
              </button>
            </div>
          </form>
          <div className='row'>
            <p className='col-8 offset-2 text-center'>This link has been generated {timesGenerated} times.&nbsp;
              <a href={`/stats?h=${hash}&days=30`}>Check out the stats here.</a>
            </p>
          </div>
          {linkCopied &&
            <div className='col-6 offset-3 well'>
              <p className='text-center'>Link Copied!</p>
            </div>
          }
        </div>
      );
    }
  }
}

module.exports = Form;
