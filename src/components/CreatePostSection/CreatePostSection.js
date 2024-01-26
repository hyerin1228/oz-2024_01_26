import React from "react";
import PostEditor from "../PostEditor";

function CreatePostSection({ setPosts }) {
  const handleClickButton = ({ title, content }) => {
    setPosts((prevPosts) => [...prevPosts, { title, content }]);
  };

  return (
    <section>
      <h4>새로운 포스트 작성</h4>
      <PostEditor
        buttonLabel="포스트 작성하기"
        onClickButton={handleClickButton}
      />
    </section>
  );
}

export default CreatePostSection;
