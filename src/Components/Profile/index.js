import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileHeader from '../ProfileHeader';

import { getMovies } from '../../Actions/movies';

import './index.css';

function Profile() {
  const [searchTerm, setSearhTerm] = useState('');

  const fetchMovieReducer = useSelector((state) => state.fetchMovieReducer);
  const { movies, error, loading } = fetchMovieReducer;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className="profile-page">
      <ProfileHeader />
      <div className="profile">
        <input
          className="profile__search"
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            setSearhTerm(event.target.value);
          }}
        ></input>
        <div className="profile__container">
          {loading ? (
            <div className="loading">
              <div></div>
              <div></div>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            movies
              .filter((movie) => {
                if (searchTerm === '') {
                  return movie;
                } else if (movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return movie;
                }
              })
              .map((movie, key) => (
                <div key={key} className="movie__container">
                  <Link className="movie__details" to={`/profile/${movie.movieDescription}`}>
                    <div className="movie__title">{movie.movieName}</div>
                    <img className="movie__image" src={movie.movieImage} alt="poster" />
                    <h3 className="movie__year">{movie.movieYear}</h3>
                    <h3 className="movie__rating">&#11088;{movie.movieRating}</h3>
                  </Link>
                  <button className="button__favourites">Add to Favourites</button>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
