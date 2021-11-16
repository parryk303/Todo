import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/add-todo.component";
import Todo from "./components/todo.component";
import TodosList from "./components/todos-list.component";

class App extends Component {
  render() {
    return (
      <div className="main">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/todos"} className="navbar-brand">
            Kyle's
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div id='container' className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todos"]} component={TodosList} />
            <Route exact path="/add" component={AddTodo} />
            <Route path="/todos/:id" component={Todo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
