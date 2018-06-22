import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Election from './ethereum/election';
import BitHeader from './Header';
import CreateBallot from './CreateBallot';


class ShowElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      manager: '',
      ballots: []
    }
  }

  async componentDidMount() {
  const election =  await Election(this.props.match.params.address);
  this.info =  await election.methods.getInfo().call();
  this.setState({ title: this.info[0], manager: this.info[2] })

  const ballotCount = +this.info[3];

  async function ballots() {
    let ballotArr = [];
    for (var i = 0; i < ballotCount; i++) {
      const ballot = await election.methods.ballots(i).call();
      console.log("grr", ballot);
      ballotArr.push(ballot.description);
    }
    console.log(ballotArr);
    return ballotArr ;
  }
  this.setState({ballots: ballots()});
console.log("BALLOT", this.state.ballots)

}

  render() {
    return (
        <div>
        <BitHeader />
        <h3>Contract created by {this.state.manager}</h3>
        <h2>Election: {this.state.title}</h2>
        <CreateBallot address={this.props.match.params.address} />
      {this.state.ballots[0]}

        </div>
    );
  }
}
// {this.state.ballots.map(ballot =>
//   (
//       <ul key={ballot}>Ballot: {ballot}</ul>
//     )
// )}

export default ShowElection;

