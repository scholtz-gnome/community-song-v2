import "./css/FileItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const plusIcon = <FontAwesomeIcon icon={faPlus} />;

const AddFileButton: React.FC = () => {
  return (
    <label htmlFor="file" cypress-test="create-song-add-file-label">
      Add file <span>{plusIcon}</span>
    </label>
  );
};

export default AddFileButton;
