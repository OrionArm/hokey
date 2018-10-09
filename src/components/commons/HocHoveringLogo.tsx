import * as React from 'react';

// Output props
export interface OnChangeHoFProps {
  handleHover?: (value: string) => void;
  closeHover: () => null;
}

// Input props
export interface OnChangeNative {
  handleHover: React.ChangeEventHandler<HTMLInputElement>;
  closeHover: React.ChangeEventHandler<HTMLInputElement>;
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

    handleHover = (selectedLogo: string | null) => {
      this.setState({
        selectedLogo,
      });
    }
    closeHover = () => {
      this.setState({
        selectedLogo: null,
      });
    }

    render() {
      return (
        <Child
          {...this.props}
          isHoverOpen={this.state.selectedLogo}
          closeHover={this.closeHover}
          handleHover={this.handleHover}
        />
      );
    }
  };
}
