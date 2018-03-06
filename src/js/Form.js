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
      linkCopied: false,
    };
    this.inputUrlOnKeyUp = this.inputUrlOnKeyUp.bind(this);
    this.clearLink = this.clearLink.bind(this);
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
    const linkCopied = false;
    const hash = '';
    this.setState({
      url,
      hash,
      linkReceived,
      linkCopied,
    });
  }

  clearLink (e) {
    e.preventDefault();
    const url = '';
    this.setState({ url });
    // Prevents preventDefault() from erroring
    this.resetForm({});
  }

  copyLink (e) {
    e.preventDefault();
    this.shortenedUrlInput.select();
    // This won't work on IE9, but hey this is a cool React app so yeah, f'IE
    document.execCommand('Copy');
    const linkCopied = true;
    this.setState({ linkCopied });
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
    const {
      hash,
      url,
      linkReceived,
      linkCopied,
    } = this.state;
    // The default form, which shortens a link
    if (!linkReceived) {
      return (
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
              onChange={this.inputUrlOnKeyUp}
            />
            <input
              className='btn btn-success col-2'
              type='submit'
              value='Shorten'
            />
          </div>
        </form>
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
                ref={(input) => { this.shortenedUrlInput = input; }}
              />
              <button
                className='fa fa-times Form__Clear'
                onClick={this.clearLink}
              />
              <button
                className='btn btn-success col-2'
                value='Copy'
                onClick={this.copyLink}
              >Copy
              </button>
            </div>
          </form>
          {linkCopied &&
            <div className='well well-info'>
              <p>Link Copied!<span className='fa fa-clipboard-check' /></p>
            </div>
          }
        </div>
      );
    }
  }

}

module.exports = Form;
