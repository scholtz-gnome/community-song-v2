import "./css/FileItems.css";

interface FileProps {
  fileName: string;
  changeFileName: Function;
  changeFileType: Function;
}

const File: React.FC<FileProps> = ({
  fileName,
  changeFileName,
  changeFileType,
}) => {
  return (
    <div className="file-item">
      <div>
        <label htmlFor="file-name"></label>
        <input
          cypress-test="file-items-file-name-input"
          type="text"
          id="file-name"
          name="file-name"
          defaultValue={fileName}
          onInput={(e) => changeFileName(e, fileName)}
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
          onInput={(e) => changeFileType(e, fileName)}
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
};

export default File;
