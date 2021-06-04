import ReactDOM from "react-dom";
import Message from "../components/Message";

describe("Message Component", () => {
  it("renders the Message component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Message message={"This is a message message"} messageType={"status"} />,
      div
    );
  });
});
