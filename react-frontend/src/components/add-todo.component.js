import React, { Component } from 'react';
import TodoDataService from '../services/todo.service';

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.newTodo = this.newTodo.bind(this);

    this.state = {
      id: null,
      title: '',
      description: '', 
      completed: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTodo() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    TodoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          completed: response.data.completed,
          submitted: true
        });
      })
  }

  newTodo() {
    this.setState({
      id: null,
      title: '',
      description: '',
      completed: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <div>
            <h4>Todo successfully added!</h4>
            <button className='btn btn-success' onClick={this.newTodo}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name='title' />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name='description' />
            </div>
            <button onClick={this.saveTodo} className='btn btn-success'>
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
