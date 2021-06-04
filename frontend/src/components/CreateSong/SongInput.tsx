import "./css/Create.css";
import "../form.css";
import "../Button.css";

interface SongInputProps {
  titleInput: Function;
  alternateTitleInput: Function;
  artistInput: Function;
}

const SongInput: React.FC<SongInputProps> = ({
  titleInput,
  alternateTitleInput,
  artistInput,
}) => {
  return (
    <article className="songInfo">
      <section>
        <label className="labelName">Title</label>
        <input
          className="dark-input"
          cypress-test="create-song-title-input"
          type="text"
          name="title"
          required
          onInput={(e) => titleInput(e)}
        />
      </section>
      <section>
        <label className="labelName">Alternate Title</label>
        <input
          type="text"
          cypress-test="create-song-alternate-title-input"
          name="alternate_title"
          onInput={(e) => alternateTitleInput(e)}
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
          onInput={(e) => artistInput(e)}
        />
      </section>
    </article>
  );
};

export default SongInput;
