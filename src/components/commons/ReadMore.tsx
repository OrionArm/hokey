import React, { Component, SyntheticEvent } from 'react';
import Truncate from 'react-truncate';

interface Props {
  lines: number;
}

interface State {
  expanded: boolean;
  truncated: boolean;
}

class ReadMore extends Component<Props, State> {
  state = {
    expanded: false,
    truncated: false,
  };

  handleTruncate = (truncated: boolean) => {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated,
      });
    }
  }

  toggleLines = (event: SyntheticEvent) => {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { children, lines } = this.props;

    const { expanded } = this.state;
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
