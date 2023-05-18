import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Card from "../../components/card/card";
import { API_URL } from "../../constants";
import "./home.css";

function Home() {
  const history = useHistory();
  const location = useLocation();
  const [bands, setBands] = useState([]);
  const [band4Selewct, setBand4Select] = useState([]);
  const [genres, setGenres] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [genreSelect, setGenreSelect] = useState([]);
  const [modifyBandList, setModifyList] = useState([]);
  const [selected, setSelected] = useState(false);

  const [genrePick, setGenre] = useState("Select Genre");

  function genreChange(e) {
    setGenre(e.target.value);

    const filterBands = bands.filter(
      (band) => band.genreCode === e.target.value
    );
    setModifyList(filterBands);
  }
  function cleanFilter() {
    setModifyList(bands);
  }
  function sortAscendingBands() {
    setModifyList([...modifyBandList].sort((a, b) => a.year - b.year));
  }
  function sortDescendingBands() {
    setModifyList([...modifyBandList].sort((a, b) => b.year - a.year));
  }
  function setBandData(id) {
    const band4Data = bands.find((band) => band.id === id);
    setBand4Select(band4Data);
    setSelected(id);
    const selectAlbums = albums.filter((album) => album.bandId === id);
    setFilteredAlbums(selectAlbums);
    const genreBandSelected = genres.filter(
      (genre) => genre.code === band4Data.genreCode
    );
    genreBandSelected.length === 0
      ? setGenreSelect("Goth Metal") // This is add for a missing data in the database
      : setGenreSelect(genreBandSelected[0].name);
  }

  const setData = (dataBase) => {
    setModifyList(dataBase.bands);
    setBands(dataBase.bands);
    setGenres(dataBase.genre);
    setAlbums(dataBase.albums);
  };
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleLogout = () => {
    history.push("/");
  };

  if (!location.state) {
    return (
      <div className="errorLogin">
        <p>Error: You are not logged in.</p>
        <button onClick={() => history.push("/")}>To Login</button>
      </div>
    );
  }

  return (
    <div>
      <Header username={location.state} onLogout={handleLogout} />
      <div className="navBar">
        <select value={genrePick} onChange={genreChange}>
          {genres.map((genre) => {
            return (
              <option key={genre} value={genre.code}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <button onClick={cleanFilter}>Clean Sort & Filter</button>
        <button onClick={sortAscendingBands}>
          Sort bands by Year -Ascending-
        </button>
        <button onClick={sortDescendingBands}>
          Sort bands by Year -Descending-
        </button>
      </div>
      <div className="cards">
        {modifyBandList.map((band) => {
          return (
            <React.Fragment key={band.id}>
              {selected === band.id ? (
                <React.Fragment>
                  <button onClick={() => setSelected(false)} >
                  {band.name}
                  </button>
                </React.Fragment>
              ) : (
                <button key={band.id} onClick={() => setBandData(band.id)}>
                  <strong>{band.name}</strong>
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {selected !== false &&
      <div className="card-wrapper">
        <Card
          band={band4Selewct}
          select={selected}
          albumsBand={filteredAlbums}
          genre={genreSelect}
          />
      </div>
        }
      <Footer />
    </div>
  );
}

export default Home;
