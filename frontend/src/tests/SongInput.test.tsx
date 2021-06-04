import ReactDOM from "react-dom";
import SongInput from "../components/CreateSong/SongInput";

describe("SonfInput Component", () => {
  it("renders the SongInput component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <SongInput
        titleInput={() => console.log("titleInput smoke test")}
        alternateTitleInput={() =>
          console.log("alternateTitleInput smoke test")
        }
        artistInput={() => console.log("artistInput smoke test")}
      />,
      div
    );
  });
});
