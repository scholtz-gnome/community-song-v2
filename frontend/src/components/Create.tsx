import "./form.css";
import "./Create.css";
import FileItems from "./FileItems";
import "./Button.css";
import { BaseSyntheticEvent, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import config from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const plusIcon = <FontAwesomeIcon icon={faPlus} />;

const splitType = (str: string) => str.split("/")[1];
const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const Create: React.FC = () => {
  const [title, setTitle] = useState("");
  const [alternateTitle, setAlternateTitle] = useState<string | null>(null);
  const [artist, setArtist] = useState("unknown artist");

  const [files, setFiles] = useState<any[]>([]);
  const [fileNamesObject, setFileNamesObject] = useState<any>({});
  const [fileTypesObject, setFileTypesObject] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [isOpened, setIsOpened] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onTitleChange = (e: BaseSyntheticEvent) => {
    const trimmedTitle: string = e.target.value.trim();
    setTitle(trimmedTitle);
  };

  const onAlternateTitleChange = (e: BaseSyntheticEvent) => {
    const trimmedAlternateTitle: string = e.target.value.trim();
    setAlternateTitle(trimmedAlternateTitle);
  };

  const onArtistChange = (e: BaseSyntheticEvent) => {
    const trimmedArtist: string = e.target.value.trim();
    if (!trimmedArtist) {
      setArtist("unknown artist");
    } else {
      setArtist(trimmedArtist);
    }
  };

  const onFileNameChange = (e: BaseSyntheticEvent, oldFileName: string) => {
    const trimmedFileName: string = e.target.value.trim();
    fileNamesObject[oldFileName] = trimmedFileName;
    setFileNamesObject(fileNamesObject);
    stateToggle();
  };

  const onFileTypeChange = (e: BaseSyntheticEvent, fileName: string) => {
    const trimmedFileType: string = e.target.value.trim();
    fileTypesObject[fileName] = trimmedFileType;
    setFileTypesObject(fileTypesObject);
    stateToggle();
  };

  const onFileChange = (e: BaseSyntheticEvent) => {
    const fileSize = e.target.files[0].size;
    const fileType = e.target.files[0].type;
    const fileName = e.target.files[0].name;

    if (fileType !== "application/pdf" && fileType !== "text/plain") {
      setErrorMessage(`File type ${splitType(fileType)} not supported.`);
      setIsOpened(false);
    } else if (fileSize > 10 * 1024 * 1024) {
      setErrorMessage("File size exceeded. Cannot exceed 10MB.");
      setIsOpened(false);
    } else {
      fileNamesObject[fileName] = fileName;
      setFileNamesObject(fileNamesObject);
      files.push(e.target.files[0]);
      setErrorMessage("");
      setFiles(files);
      setIsOpened(true);
      stateToggle();
    }
  };

  const stateToggle = () => {
    if (isOpened) {
      setIsOpened(false);
    } else {
      setIsOpened(true);
    }
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const songsEndpoint = `${config.API_ROOT}/songs`;
    const songData = {
      title,
      alternateTitle,
      artist,
    };
    const axiosSongConfig: AxiosRequestConfig = {
      withCredentials: true,
      headers: {
        "X-CSRF-TOKEN": csrfToken,
        "Content-Type": "application/json",
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        setIsUploading(true);
        setUploadPercentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        setMessage("Nearly there...");
      },
    };
    try {
      const res = await axios.post(songsEndpoint, songData, axiosSongConfig);
      const songId = res.data.id;

      let filesEndpoint;
      const formData = new FormData();
      const axiosFileConfig: AxiosRequestConfig = {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          setIsUploading(true);
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
          setMessage("Nearly there...");
        },
      };

      if (files.length === 1) {
        filesEndpoint = `${config.API_ROOT}/songs/${songId}/files`;

        formData.append("file", files[0]);
        formData.append("fileName", fileNamesObject[files[0].name]);
        formData.append("type", fileTypesObject[files[0].name]);
        await axios.post(filesEndpoint || "", formData, axiosFileConfig);

        setMessage(`${title} created`);
      } else if (files.length > 1) {
        filesEndpoint = `${config.API_ROOT}/songs/${songId}/file-collections`;
        files.forEach((file) => {
          formData.append("file", file);
          formData.append("fileNames", fileNamesObject[file.name]);
          formData.append("types", fileTypesObject[file.name]);
        });
        await axios.post(filesEndpoint || "", formData, axiosFileConfig);
        setMessage(`${title} created`);
      } else {
        setMessage(`${title} created`);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="create" id="create-song-form">
      <article className="songInfo">
        <section>
          <label className="labelName">Title</label>
          <input
            className="dark-input"
            cypress-test="create-song-title-input"
            type="text"
            name="title"
            required
            onInput={onTitleChange}
          />
        </section>
        <section>
          <label className="labelName">Alternate Title</label>
          <input
            type="text"
            cypress-test="create-song-alternate-title-input"
            name="alternate_title"
            onChange={onAlternateTitleChange}
            className="dark-input"
          />
        </section>
        <section>
          <label className="labelName">Artist</label>
          <input
            className="dark-input"
            cypress-test="create-song-artist-input"
            type="text"
            name="artist"
            onChange={onArtistChange}
          />
        </section>
      </article>
      <article className="filesInfo">
        <FileItems
          files={files}
          changeFileType={onFileTypeChange}
          changeFileName={onFileNameChange}
        />
        {errorMessage && (
          <section className="file-list">
            <div className="error-item blank-item">{errorMessage}</div>
          </section>
        )}
        <section className="add-file">
          <label htmlFor="file" cypress-test="create-song-add-file-label">
            Add file <span>{plusIcon}</span>
          </label>
          <input
            cypress-test="create-song-add-file-input"
            id="file"
            type="file"
            name="file"
            accept=".txt,.pdf"
            onInput={onFileChange}
          />
        </section>
        <section>
          <button className="smallButton" cypress-test="create-song-submit">
            Create Song
          </button>
        </section>
        {isUploading && (
          <section
            className="uploadPercentage"
            style={{ width: `${uploadPercentage}%` }}
          >
            {uploadPercentage}%
          </section>
        )}
        {message && (
          <section className="file-list">
            <div
              className="blank-item"
              cypress-test="create-song-success-message"
            >
              {message}
            </div>
          </section>
        )}
      </article>
    </form>
  );
};

export default Create;
