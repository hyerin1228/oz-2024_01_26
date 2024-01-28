import React from "react";
import "./PostsList.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function PostsList({ posts, setPostIndexToEdit, setPosts }) {
    // a little function to help us with reordering the result(결과 재정렬을 돕는 함수)
  const reorder =  (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;
  const getItemStyle = (draggableStyle, isDragging) => ({
    userSelect: 'none',
    padding: grid * 2,
    marginBottom: grid,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
  });

  console.log(posts)

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      posts,
      result.source.index,
      result.destination.index
    );

    console.log(newItems);
    console.log(posts);
    setPosts(newItems);
    //setPosts((prevPosts) => [...prevPosts, newItems]);
    console.log(posts);
  };

  return (
    <section id="posts-list">
      <h4>포스트 목록</h4>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <ol>
                {posts.map((post, index) => (
                  <Draggable
                    key={post.title}
                    draggableId={post.title}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getItemStyle(
                          provided.draggableStyle,
                          snapshot.isDragging
                        )}
                        {...provided.dragHandleProps}
                      >
                        {/*  */}
                        <li key={post.title}>
                          <span>{post.title}</span>
                          <button onClick={() => setPostIndexToEdit(index)}>수정하기</button>
                        </li>
                      </div>
                    )}
                  </Draggable>
                ))}
              </ol>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <ol>
        {posts.map((post, index) => (
          <li key={post.title}>
            <span>{post.title}</span>
            <button onClick={() => setPostIndexToEdit(index)}>수정하기</button>
          </li>
        ))}
      </ol> */}
    </section>
  );
}

export default PostsList;
