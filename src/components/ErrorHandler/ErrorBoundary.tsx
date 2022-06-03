import React from 'react';
import {MyProps, MyState} from '@/components/ErrorHandler/type';
import ErrorFallback from '@/components/ErrorHandler/ErrorFallback';

export class ErrorBoundary extends React.Component<MyProps, MyState> {
  state: MyState = {
    error: null,
  };

  componentDidCatch(error: Error) {
    this.setState({
      error: error,
    })
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <ErrorFallback error={error}/>
      );
    }
    return children;
  }
}
