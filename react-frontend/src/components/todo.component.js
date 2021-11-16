import React, { Component } from 'react';
import TodoDataService from '../services/todo.service';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      currentTodo: {
        id: null,
        title: '',
        description: '',
        completed: false
      },
      message: ''
    };
  }

  componentDidMount() {
    this.getTodo(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentTodo: {
        ...prevState.currentTodo,
        description: description
      }
    }));
  }

  getTodo(id) {
    TodoDataService.get(id)
      .then(response => {
        this.setState({
          currentTodo: response.data
        });
      })
  }

  updateCompleted(status) {
    var data = {
      id: this.state.currentTodo.id,
      title: this.state.currentTodo.title,
      description: this.state.currentTodo.description,
      completed: status
    };

    TodoDataService.update(this.state.currentTodo.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTodo: {
            ...prevState.currentTodo,
            completed: status
          }
        }));
      })
  }

  updateTodo() {
    TodoDataService.update(
      this.state.currentTodo.id,
      this.state.currentTodo
    )
      .then(
        this.setState({
          message: `${this.state.currentTodo.title} was updated successfully!`
        })
      )
  }

  deleteTodo() {
    TodoDataService.delete(this.state.currentTodo.id)
      .then(
        this.props.history.push('/todos')
      )
  }

  render() {
    const { currentTodo } = this.state;
    return (
      <div>
        {currentTodo ? (
          <div className='edit-form'>
            <h4>{currentTodo.title}</h4>
            <form>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  value={currentTodo.title}
                  onChange={this.onChangeTitle} />
              </div>
              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  value={currentTodo.description}
                  onChange={this.onChangeDescription} />
              </div>
              <div className='form-group'>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTodo.completed ? ' Completed' : ' Pending'}
              </div>
            </form>
            <button
              id='edits'
              className='badge badge-danger mr-2'
              onClick={this.deleteTodo} >
              Delete
            </button>
            <button
              id='edits'
              type='submit'
              className='badge badge-success'
              onClick={this.updateTodo} >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    );
  }
}
