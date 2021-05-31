import ReactDOM from "react-dom";
import App from "../App";

describe("App Component", () => {
  it("successfully renders the App component", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
