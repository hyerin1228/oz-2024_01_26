import React from "react";
import PostEditor from "../PostEditor";

function EditPostSection({ posts, setPosts, postIndexToEdit }) {
  const handleClickButton = ({ title, content }) => {
    // 현재 아래 코드는 새로운 포스트를 추가하는 코드이고
    // 수정해야 할 방향성은
    // prevPosts에서, 현재 수정중인 포스트를 찾아내서, 그 녀석의 title과 content를 수정
    setPosts((prevPosts) => [...prevPosts, { title, content }]);
  };

  return (
    <section>
      <h4>기존 포스트 수정</h4>
      <PostEditor
        buttonLabel="포스트 수정하기"
        onClickButton={handleClickButton}
        postToEdit={posts[postIndexToEdit]}
      />
    </section>
  );
}

export default EditPostSection;
