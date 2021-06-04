import ReactDOM from "react-dom";
import FileItems from "../components/CreateSong/FileItems";

describe("FileItems Component", () => {
  it("renders the FileItems component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <FileItems
        files={[{ name: "Hello", size: 9876 }]}
        changeFileType={() => console.log("changeFileType")}
        changeFileName={() => console.log("changeFileName")}
      />,
      div
    );
  });
});
