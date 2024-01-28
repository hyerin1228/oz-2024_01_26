import React from "react";
import "./PostsList.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



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


function PostsList({ posts, setPostIndexToEdit, setPosts }) {

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      posts,
      result.source.index,
      result.destination.index
    );

    setPosts(newItems);
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
                      {posts.map((post, index) => (
                      <li key={post.title}>
                        <span>{post.title}</span>
                        <button onClick={() => setPostIndexToEdit(index)}>수정하기</button>
                      </li>
                      ))}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ol>
        {posts.map((post, index) => (
          <li key={post.title}>
            <span>{post.title}</span>
            <button onClick={() => setPostIndexToEdit(index)}>수정하기</button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default PostsList;
