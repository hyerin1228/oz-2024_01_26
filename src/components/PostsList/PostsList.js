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
      {/* 드래그앤드롭 기능을 지원하는 Context , 범위를 감싸는 최상위의 요소이고.. 드래그 작업이 끝났을 때 onDragEnd 함수가 호출*/}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 드래그 가능한 요소들이 놓일 수 있는 영역 */}
        <Droppable droppableId="droppable">
          {/* Droppable 밑에 provided와 snapshot 두 개의 인자를 받아 드롭 가능한 영역이ㅡ 실제 UI를 렌더링 */}
          {(provided, snapshot) => (
            // ref = DOM 요소에 참조를 제공(?) , style = 드래그 중인지의 여부에 따른 스타일 적용
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <ol>
                {posts.map((post, index) => (
                  // 드래그 가능한 개별 요소를 만들기 위한 작업. 각 요소는 고유한 key와 draggableId, 그리고 순서를 나타내는 index를 가진다.
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided, snapshot) => (
                      <li ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                      >
                        {/* 드래그 가능한 요소(li 리스트항목)을 나탄냄 */}
                          <span>{post.title}</span>
                          <button onClick={() => setPostIndexToEdit(index)}>수정하기</button>
                      </li>
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
