import { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Write(props) {
  const [title, setTitle] = useState("");
  const [body, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [postCreated, setPostCreated] = useState(false);
  const user = props.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
      username: user.username,
    };
    if (file) {
      const element = document.getElementById("image-form");
      const formData = new FormData(element);
      const filename = file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("upload", formData);
      } catch (err) {}
    }
    try {
      await axios.post("posts/", newPost);
      setPostCreated(true);
    } catch (err) {}
  };

  if (postCreated) {
    return <Redirect to="/connect" />;
  }

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" id="image-form" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus addImage">IMG</i>
          </label>
          <br />
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput writeTitle"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
