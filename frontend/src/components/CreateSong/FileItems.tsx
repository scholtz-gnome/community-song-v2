import "./css/FileItems.css";
import File from "./File";
import FileItemsProps from "../../interfaces/FileItemsProps";

const FileItems: React.FC<FileItemsProps> = ({
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
          <div key={i}>
            <File
              fileName={file.name}
              changeFileName={changeFileName}
              changeFileType={changeFileType}
            />
          </div>
        );
      })}
    </section>
  );
};

export default FileItems;
