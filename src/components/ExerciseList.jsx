import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = ({exercise, deleteExercise}) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+exercise._id}>edit</Link> | <a href="/" onClick={() => { deleteExercise(exercise._id) }}>delete</a>
    </td>
  </tr>
);

export default () => {
  const [exercises, setEcercises] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises/')
      .then(response => {
        setEcercises(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteExercise = id => {
    axios
      .delete('http://localhost:5000/exercises/' + id)
      .then(res => console.log(res.data));

    setEcercises(exercises.filter(exercise => exercise._id !== id));
  };

  const exerciseList = () => {
    return exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
    })
  }
  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};
