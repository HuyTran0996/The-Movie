import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageContext from "../context/PageContext";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

function generateYears() {
  let years = [];
  for (let i = 1919; i <= 2023; i++) {
    years.push(i);
  }
  return years;
}

function FilterAppBar() {
  const navigate = useNavigate();
  const { state, dispatch, getData } = useContext(PageContext);
  const { search } = state;
  const years = generateYears();

  const handleSubmit = (e) => {
    e.preventDefault();
    const genre = e.target.genre.value;
    const year = e.target.year.value;
    const sort = e.target.sort.value;
    dispatch({ type: "SET_GENRE", payload: genre });
    dispatch({ type: "SET_YEAR", payload: year });
    dispatch({ type: "SET_SORT", payload: sort });
    dispatch({ type: "SET_DATA_FILTER", payload: null });
    navigate(`/filter?genre=${genre}&year=${year}&sort=${sort}`);
  };
  return (
    <div>
      <div>FilterAppBar</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="genre">Movie Genre:</label>
        <select id="genre" name="genre">
          {genres.map((type) => {
            return (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="year">Release Year:</label>
        <select id="year" name="year">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" name="sort">
          <option value="popularity.asc">popularity.asc</option>
          <option value="popularity.desc">popularity.desc</option>
          <option value="revenue.asc">revenue.asc</option>
          <option value="revenue.desc">revenue.desc</option>
          <option value="primary_release_date.asc">
            primary_release_date.asc
          </option>
          <option value="primary_release_date.desc">
            primary_release_date.desc
          </option>
          <option value="vote_average.asc">vote_average.asc</option>
          <option value="vote_average.desc">vote_average.desc</option>
          <option value="vote_count.asc">vote_count.asc</option>
          <option value="vote_count.desc">vote_count.desc</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FilterAppBar;
