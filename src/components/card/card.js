import React from "react";
import "./card.css";

function Card({ band, select, albumsBand, genre }) {
  return (
    <div className={`card ${select === band.id ? "selected" : ""}`}>
      {select === band.id && (
        <>
          <h2>{band.name}</h2>
          <p>Genre: {genre}</p>
          <p>Year of foundation: {band.year}</p>
          <p>Members:</p>
          <ul>
            {band.members.map((musician, index) => (
              <li key={index}>{musician.name}</li>
            ))}
          </ul>
          {albumsBand.length === 0 && <p>This band has no albums</p>}
          {albumsBand.length > 0 && (
            <>
              <p>Albums:</p>
              <ul>
                {albumsBand.map((album, index) => (
                  <li key={index}>
                    {album.name} ({album.year})
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Card;
