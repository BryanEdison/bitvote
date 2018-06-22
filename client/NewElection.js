import React, { Component} from 'react';
import factory from './ethereum/factory';
import web3 from './ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import BitHeader from './Header';


 class NewElection extends Component {

  state= {
    title: '',
    error: '',
    loading: false
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
    await factory.methods.createElection(this.state.title)
    .send({
      from: accounts[0]
    });
//something here
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
      <BitHeader />
      <h2> Create a new Election</h2>
      <Form onSubmit={this.onSubmit} error={!!this.state.error}>
      <Form.Field>
      <label>Title</label>
      <Input
      value={this.state.title}
      onChange={event => this.setState({ title: event.target.value })}
      />
      </Form.Field>
      <Message error header="Drats!" content={this.state.error} />
      <Button loading={this.state.loading}primary>Create!</Button>
      </Form>
      </div>
    );
  }
}


export default NewElection;
