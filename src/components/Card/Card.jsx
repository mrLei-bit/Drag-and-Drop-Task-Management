import './card.scss'
import { useEffect, useRef } from 'react'
// 引入 Droppable Draggable
import { Droppable, Draggable } from 'react-beautiful-dnd'
export default function Card(props) {
  const {
    list,       //列表项数组              array
    addList,    //添加方法                method
    delList,    //删除方法                method
    isPre,      //判断是否为prepare卡片    blur
    isAdd,      //判断是否显示输入框       blur
    showInput,  //显示输入框方法          method
    className,  //卡片类名                   string
    title,      //标题                   string
    pableId     //droppableId            string
  } = props
  const inputRef = useRef()
  const card = useRef()

  //监听className 添加卡片类名
  useEffect(() => {
    card.current.classList.add(className)
  }, [className])

  //监听isAdd 控制输入框显示
  useEffect(() => {
    if (isAdd) {
      inputRef.current.focus()
    }
  }, [isAdd])

  //拖拽到边框变色
  function getListStyle(isDraggingOver) {
    return { border: isDraggingOver ? '2px solid skyblue' : 'none' }
  }

  return (
    <div className='card' ref={card}>
      <div className='status'>{title}</div>
      <Droppable droppableId={pableId} key={pableId}>
        {(provided, snapshot) => (
          <div
            className='list'
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}>
            {/* 列表项 */}
            {list.map((v, i) => (
              <Draggable draggableId={v.id + ''} index={i} key={v.id}>
                {provided => (
                  <div
                    className='item'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {v.val}
                    <div className='del' onClick={() => delList(i, pableId)}>
                      x
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {/* 输入框 */}
            {isAdd ? (
              <div className='item'>
                <input type='text' onKeyDown={addList} ref={inputRef} />
              </div>
            ) : (
              ''
            )}
            {/* 添加按钮 */}
            {isPre ? (
              <div className='add' onClick={() => showInput()}></div>
            ) : (
              ''
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}
