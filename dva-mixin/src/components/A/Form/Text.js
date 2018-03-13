import React from 'react';

class FormText extends React.Component {
  state = {
    value: this.props.value,
  }
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    this.setState({ value });
  }
  render() {
    return (<span>{this.state.value}</span>);
  }
}

export default FormText;
