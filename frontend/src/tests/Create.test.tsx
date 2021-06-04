import ReactDOM from "react-dom";
import Create from "../components/CreateSong/Create";

describe("Create Component", () => {
  it("renders the Create component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Create />, div);
  });
});
