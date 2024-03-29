import React, { Component } from 'react';
import TodoDataService from '../services/todo.service';
import { Link } from 'react-router-dom';

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);

    this.state = {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      searchTitle: ''
    };
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTodos() {
    TodoDataService.getAll()
      .then(response => {
        this.setState({
          todos: response.data
        });
      })
  }

  refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });
  }

  setActiveTodo(todo, index) {
    this.setState({
      currentTodo: todo,
      currentIndex: index
    });
  }

  removeAllTodos() {
    TodoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });

    TodoDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          todos: response.data
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
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  toggleCompleted(todo) {
    todo.completed = !todo.completed
    var data = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed
    };
    
    TodoDataService.update(todo.id, data)
      .then(
        this.setState({
          currentTodo: {
            completed: todo.completed
          }
        }))
  }

  render() {
    const { searchTitle, todos, currentTodo, currentIndex } = this.state;
    return (
      <div>
        {todos ? (
          <div className='list row'>
            <div className='col-md-8'>
              <div className='input-group mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search by title'
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle} />
                <div className='input-group-append'>
                  <button
                    id='search'
                    className='btn btn-outline-secondary'
                    type='button'
                    onClick={this.searchTitle} >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <ul className='list-group'>
                {todos &&
                  todos.map((todo, index) => (
                    <li
                      className={
                        'list-group-item ' +
                        (index === currentIndex ? 'active' : '')
                      }
                      onClick={() => this.setActiveTodo(todo, index)}
                      key={index} >
                      {todo.completed ? (
                        <span
                          className='checkbox'
                          onClick={() => this.toggleCompleted(todo)} >
                          {'✅'}
                        </span>
                      ) : (
                        <span
                          className='checkbox'
                          onClick={() => this.toggleCompleted(todo)} >
                          {'❌'}
                        </span>
                      )}
                      {` : ${todo.title}`}
                    </li>
                  ))}
              </ul>
              <button
                id='clear'
                className='m-3 btn btn-sm btn-danger'
                onClick={this.removeAllTodos} >
                Clear List
              </button>
            </div>
            <br />
            <div className='col-md-6'>
              {currentTodo ? (
                <div>
                  <h4>{currentTodo.title}</h4>
                  <div className='list-group-item'>
                    {currentTodo.description && (
                      <div>
                        <label>
                          <strong>Description:</strong>
                        </label>{' '}
                        {currentTodo.description}
                      </div>
                    )}
                    <div>
                      <label>
                        <strong>Status:</strong>
                      </label>{' '}
                      {currentTodo.completed ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                  <Link
                    id='edit'
                    to={'/todos/' + currentTodo.id}
                    className='badge badge-warning' >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <h1>Click 'Add' above, create a todo <br /><br /> to get started with your todo list!</h1>
        )}
      </div>
    );
  }
}
