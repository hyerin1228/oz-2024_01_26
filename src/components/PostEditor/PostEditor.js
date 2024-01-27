import React, { useEffect, useState } from "react";
import "./PostEditor.css";

function PostEditor({ buttonLabel, onClickButton, postToEdit }) {
  const [title, setTitle] = useState(postToEdit ? postToEdit.title : "");
  const [content, setContent] = useState(postToEdit ? postToEdit.content : "");

  const handleClickButton = () => {
    onClickButton({ title, content, postToEdit });

    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (!postToEdit) return;

    setTitle(postToEdit.title);
    setContent(postToEdit.content);
  }, [postToEdit]);

  return (
    <form className="post-editor" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleClickButton}>{buttonLabel}</button>
    </form>
  );
}

export default PostEditor;
