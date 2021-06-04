import ReactDOM from "react-dom";
import AddFileButton from "../components/CreateSong/AddFileButton";

describe("AddFileButton Component", () => {
  it("renders the AddFileButton component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AddFileButton />, div);
  });
});
