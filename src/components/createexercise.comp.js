import React, { Component } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios  from "axios";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      sets: 0,
      reps: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/user/')
      .then(response => {
        if (response.data.length > 0){
          this.setState({
            users: response.data.map(user => user.username), //response.data.map(user => user.username),
            username: response.data[0].username,
          });
        }
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onChangeSets(e) {
    this.setState({
      sets: e.target.value,
    });
  }
  onChangeReps(e) {
    this.setState({
      reps: e.target.value,
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }
  onSubmit(e){
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      sets: this.state.sets,
      reps: this.state.reps,
      date: this.state.date,
    };

    console.log(exercise);

    axios.post('http://127.0.0.1:5000/exercises/add',exercise)
      .then(res => console.log(res.data));

    window.location = '/app/create';
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Sets : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.sets}
              onChange={this.onChangeSets}
            />
          </div>
          <div className="form-group">
            <label>Reps: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.reps}
              onChange={this.onChangeReps}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
