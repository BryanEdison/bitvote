import React, { Component } from 'react';
import factory from './ethereum/factory';
import {Link} from 'react-router-dom';
import BitHeader from './Header';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elections: []
    }
  }

 async componentDidMount() {
    this.elections =  await factory.methods.getDeployedElections().call();
    this.setState({elections: this.elections});
  }


  // renderElections = () => {

  //     this.state.elections.map(address =>
  //       (
  //         <Link key={address} path={`/elections/${address}`}>
  //           <a>View Election {address}</a>
  //         </Link>)
  //     );
  //   }


  render() {
    return (
        <div>
          <BitHeader />
          <h3>Open Elections</h3>
          {this.state.elections.map(address =>
            (
              <Link key={address} to={`/elections/${address}`}>
                <ul>View Election {address}</ul>
              </Link>)
          )}
        </div>
    );
  }
}

export default Home;
