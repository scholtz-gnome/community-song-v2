import "./FileItems.css";
import FileProps from "../interfaces/FileProps";

const FileItems: React.FC<FileProps> = ({
  files,
  changeFileType,
  changeFileName,
}) => {
  return (
    <section className="file-list">
      {files.length === 0 && (
        <div className="blank-item">
          <div>No files added</div>
        </div>
      )}
      {files.map((file, i) => {
        return (
          <div key={i} className="file-item">
            <div>
              <label htmlFor="file-name"></label>
              <input
                cypress-test="file-items-file-name-input"
                type="text"
                id="file-name"
                name="file-name"
                defaultValue={file.name}
                onInput={(e) => changeFileName(e, file.name)}
                required
              />
            </div>
            <div>
              <label htmlFor="file-type-select"></label>
              <select
                name="file-types"
                cypress-test="file-items-select-type"
                id="file-type-select"
                form="create-song-form"
                onInput={(e) => changeFileType(e, file.name)}
                required
              >
                <option value="">select a file type</option>
                <option value="chords and lyrics">chords and lyrics</option>
                <option value="lyrics">lyrics</option>
                <option value="full score">full score</option>
                <option value="sheet music">sheet music</option>
                <option value="lead sheet">lead sheet</option>
                <option value="guitar tabs">guitar tabs</option>
                <option value="bass tabs">bass tabs</option>
                <option value="exercise">exercise</option>
              </select>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FileItems;
