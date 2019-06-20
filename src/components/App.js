import React from 'react';
import Header from '../containers/Header';
import MainSection from '../containers/MainSection';

// We are getting the store as a prop just to dispatch an action
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

class App extends React.Component {
  componentDidMount() {
    this.props.store.dispatch({ type: 'FETCH_TODOS' });
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection />
      </div>
    );
  }
}

export default App;
