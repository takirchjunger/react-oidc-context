import * as React from 'react';

export interface Props {
  text: string;
}

export default class ExampleComponent extends React.Component<Props> {
  public render() {
    const { text } = this.props;

    return <div>Example Component: {text}</div>;
  }
}
