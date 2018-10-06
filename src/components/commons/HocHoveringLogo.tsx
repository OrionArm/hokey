import * as React from 'react';

// Output props
export interface OnChangeHoFProps {
  handleHover?: (value: string) => void;
}

// Input props
export interface OnChangeNative {
  handleHover: React.ChangeEventHandler<HTMLInputElement>;
  isHoverOpen: null | string;
}

export default function withOnChangeString<T extends OnChangeNative>(
  Child: React.ComponentType<T>,
) {
  return class extends React.Component<OnChangeHoFProps & T, {}> {
    state = {
      selectedLogo: null,
    };
    static displayName = `withOnChangeString(${Child.displayName ||
      Child.name})`;

    handleHover = selectedLogo => {
      this.setState({
        selectedLogo:
          selectedLogo === this.state.selectedLogo ? null : selectedLogo,
      });
    }

    render() {
      return (
        <Child
          {...this.props}
          isHoverOpen={this.state.selectedLogo}
          handleHover={this.handleHover}
        />
      );
    }
  };
}
