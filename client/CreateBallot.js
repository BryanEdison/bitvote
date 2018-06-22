import React, {Component} from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from './ethereum/web3';
import Election from './ethereum/election';


class CreateBallot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      error: '',
      loading: false
    }

  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    console.log(this.props.address)
    const election = Election(this.props.address);
    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
    await election.methods.createBallot(this.state.value)
    .send({
      from: accounts[0]
    });
    } catch (err) {
      this.setState({ error: err.message });
    }
    this.setState({ loading: false });
  };


  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.error}>
      <Form.Field>
      <label>Ballot option</label>
      <Input
      labelPosition="left"
      value={this.state.value}
      onChange={event => this.setState({ value: event.target.value })}
      />
      </Form.Field>
      <Message error header="Drats!" content={this.state.error} />
      <Button loading={this.state.loading}primary>Create!</Button>
      </Form>
    )
  }

}

export default CreateBallot;
