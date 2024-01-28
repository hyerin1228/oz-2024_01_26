import { useState } from "react";
import "./App.css";
import CreatePostSection from "./components/CreatePostSection/CreatePostSection";
import EditPostSection from "./components/EditPostSection";
import Header from "./components/Header";
import PostsList from "./components/PostsList/PostsList";

const initialPosts = [
  { id: "1", title: "샘플 포스트 제목", content: "샘플 포스트 내용" },
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [postIndexToEdit, setPostIndexToEdit] = useState(null); // "create" | "edit"

  return (
    <div className="App">
      <Header />
      <button onClick={() => setPostIndexToEdit(null)}>
        새로운 포스트 작성하기
      </button>

      <PostsList posts={posts} setPosts={setPosts} setPostIndexToEdit={setPostIndexToEdit} />

      {/* 포스트 작성하기 */}
      {postIndexToEdit === null && <CreatePostSection posts={posts} setPosts={setPosts} />}

      {/* 포스트 수정하기 */}
      {postIndexToEdit !== null && (
        <EditPostSection
          posts={posts}
          setPosts={setPosts}
          postIndexToEdit={postIndexToEdit}
        />
      )}
    </div>
  );
}

export default App;
