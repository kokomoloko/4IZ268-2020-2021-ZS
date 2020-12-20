'use strict';

const e = React.createElement;


class LinkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: '' };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.setState({ quote: '' })
    setTimeout(() =>
      axios.get('https://api.kanye.rest')
        .then(response => response.data)
        .then(
          (data) => this.setState({ quote: data.quote })
        ), 1000);
  }

  componentDidMount() {
    axios.get('https://api.kanye.rest')
      .then(response => response.data)
      .then(
        (data) => this.setState({ quote: data.quote })
      );
  };

  render() {
    const { quote } = this.state;

    const kanyeTip = e(
      'p',
      { className: 'kanye_tip' },
      quote ? 'Tap Kanye for more wisdom.' : 'Kanye is thinking...',
    );

    const kanyeQuote = e(
      'p',
      { className: 'kanye_quote' },
      quote ? `"${quote}"` : '',
    );

    const kanyeFace = e(
      'img',
      {
        src: 'assets/img/kanye-face.jpg',
        onClick: this.handleClick,
        className: 'kanye_face'
      },
    );
    return e(
      'div',
      {},
      kanyeFace, kanyeTip, kanyeQuote,
    );
  }
}

document.querySelectorAll('.kanye_container')
  .forEach(domContainer => {
    ReactDOM.render(
      e(LinkComponent),
      domContainer
    );
  }); 