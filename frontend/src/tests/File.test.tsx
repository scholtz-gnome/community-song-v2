import ReactDOM from "react-dom";
import File from "../components/CreateSong/File";

describe("File Component", () => {
  it("renders the File component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <File
        fileName={"File name"}
        changeFileName={() => console.log("changeFileName smoke test")}
        changeFileType={() => console.log("changeFileType smoke test")}
      />,
      div
    );
  });
});
