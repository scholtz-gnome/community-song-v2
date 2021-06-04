import "./css/Create.css";
import "../form.css";
import "../Button.css";
import SongInput from "./SongInput";
import FileItems from "./FileItems";
import AddFileButton from "./AddFileButton";
import Message from "../Message";

import { BaseSyntheticEvent, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import config from "../../config";

const splitType = (str: string) => str.split("/")[1];

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("CSRF-TOKEN"))
  ?.split("=")[1];

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [alternateTitle, setAlternateTitle] = useState<string | null>(null);
  const [artist, setArtist] = useState<string>("unknown artist");

  const [files, setFiles] = useState<any[]>([]);
  const [fileNamesObject, setFileNamesObject] = useState<any>({});
  const [fileTypesObject, setFileTypesObject] = useState<any>({});

  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const onSongTitleInput = (e: BaseSyntheticEvent) => {
    const input: string = e.target.value.trim();
    setTitle(input);
  };

  const onSongAlternateTitleInput = (e: BaseSyntheticEvent) => {
    const input: string = e.target.value.trim();
    setAlternateTitle(input);
  };

  const onSongArtistInput = (e: BaseSyntheticEvent) => {
    const input: string = e.target.value.trim();
    setArtist(input);
  };

  const onFileNameChange = (e: BaseSyntheticEvent, oldFileName: string) => {
    const input: string = e.target.value.trim();
    fileNamesObject[oldFileName] = input;
    setFileNamesObject(fileNamesObject);
    stateToggle();
  };

  const onFileTypeChange = (e: BaseSyntheticEvent, fileName: string) => {
    const input: string = e.target.value.trim();
    fileTypesObject[fileName] = input;
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
        await axios.post(filesEndpoint, formData, axiosFileConfig);

        setMessage(`${title} created`);
      } else if (files.length > 1) {
        filesEndpoint = `${config.API_ROOT}/songs/${songId}/file-collections`;
        files.forEach((file) => {
          formData.append("file", file);
          formData.append("fileNames", fileNamesObject[file.name]);
          formData.append("types", fileTypesObject[file.name]);
        });
        await axios.post(filesEndpoint, formData, axiosFileConfig);
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
      <SongInput
        titleInput={onSongTitleInput}
        alternateTitleInput={onSongAlternateTitleInput}
        artistInput={onSongArtistInput}
      />
      <article className="filesInfo">
        <FileItems
          files={files}
          changeFileType={onFileTypeChange}
          changeFileName={onFileNameChange}
        />
        {errorMessage && (
          <Message message={errorMessage} messageType={"error"} />
        )}
        <section className="add-file">
          <AddFileButton />
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

        {uploadPercentage !== 0 && (
          <section className="uploadPercentage">
            <div style={{ width: `${uploadPercentage}%` }}>
              {uploadPercentage}%
            </div>
          </section>
        )}

        {message && <Message message={message} messageType={"status"} />}
      </article>
    </form>
  );
};

export default Create;
