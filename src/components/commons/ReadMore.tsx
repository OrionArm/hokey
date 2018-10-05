import React, { Component } from 'react';
import Truncate from 'react-truncate';

interface Props {
  lines: number;
}
class ReadMore extends Component<Props> {
  state = {
    expanded: false,
    truncated: false,
  };

  handleTruncate = truncated => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  }

  toggleLines = event => {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { children, lines } = this.props;

    const { expanded } = this.state;
    console.log(!expanded);

    return (
      <p style={{ margin: 0, maxWidth: 500 }} onClick={this.toggleLines}>
        <Truncate lines={!expanded && lines} onTruncate={this.handleTruncate}>
          <span onClick={this.toggleLines}>{children}</span>
        </Truncate>
      </p>
    );
  }
}

export default ReadMore;
