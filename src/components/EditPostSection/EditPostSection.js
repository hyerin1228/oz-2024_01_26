import React from "react";
import PostEditor from "../PostEditor";

function EditPostSection({ posts, setPosts, postIndexToEdit }) {
  const handleClickButton = ({ title, content, postToEdit  }) => {
    console.log(`${postToEdit}`)
    console.log(postToEdit)
    // 현재 아래 코드는 새로운 포스트를 추가하는 코드이고
    // 수정해야 할 방향성은
    // prevPosts에서, 현재 수정중인 포스트를 찾아내서, 그 녀석의 title과 content를 수정
    
    // 넘어온 postToEdit 는 뭘까...?
    // 바꿔치기 해야될 것 같은데.. 같은 건지 어떻게 찾지?

    // postToEdit 가 있으면 바꿔서 새로 넣어줘야하고. 없으면 그냥 데이터 넣어도 되고.

    // 일단 새로운 걸 만든다.
    if(postToEdit === null){
      setPosts((prevPosts) => [...prevPosts, { title, content }]);
    }else{
      let updatedPosts = [...posts].map( function(post){
        return (post === postToEdit) ? { title,content } : post;
      });
      setPosts(updatedPosts);
    }


    // setPosts((prevPosts) => [...prevPosts, { title, content }]);

  }

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
