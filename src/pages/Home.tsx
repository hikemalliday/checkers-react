import "../css/Home.css";

export const Home = () => {
  return (
    // <div className="home-container">
    //   <h1>Checkers Game</h1>A Checkers game made with ReactJS, Typescript,
    //   FastAPI, SQLite
    //   <h4>INSTRUCTIONS:</h4>
    //   <p>New Game:</p>
    //   <p>
    //     Play a game against yourself. There is an Export Replay button that will
    //     export the replay of the game into a SQLite database. This replay can be
    //     played back by going to the Replays page.
    //   </p>
    //   <p>Replays:</p>
    //   <p>
    //     Select a game ID from the dropdown menu, and then press PLay Replay.
    //     There is also an option to delete a replay.
    //   </p>
    // </div>
    <>
      <div>
        <div className="first-section spacer layer1">
          <section className="">
            <h1> Checkers Game </h1>
            <p>
              {" "}
              A Checkers game made with ReactJS, Typescript, FastAPI, and SQLite{" "}
            </p>
          </section>
        </div>
        <div className="">
          <section className="greyish">
            <h1> New Game </h1>
            <p>
              {" "}
              Play a game against yourself. There is an Export Replay button.
              Pressing this will save the game into a SQLite database, which can
              be played back at 'Replays'{" "}
            </p>
          </section>
        </div>
        <div className="blueish">
          <section>
            <h1> Replays </h1>
            <p>
              Select a game ID, then press 'Play Replay'. You can also delete a
              replay.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
