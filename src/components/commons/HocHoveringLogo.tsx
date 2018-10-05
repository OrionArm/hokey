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
      isHoverOpen: null,
    };
    static displayName = `withOnChangeString(${Child.displayName ||
      Child.name})`;

    handleHover = isHoverOpen => this.setState({ isHoverOpen });

    render() {
      return (
        <Child
          {...this.props}
          isHoverOpen={this.state.isHoverOpen}
          handleHover={this.handleHover}
        />
      );
    }
  };
}
