import { useState } from 'react'
import './task.scss'
// 引入卡片组件
import Card from '@/components/Card/Card'
// 引入 DragDropContext
import { DragDropContext } from 'react-beautiful-dnd'
// 引入lodash
import _ from 'lodash'

export default function Task() {
  let taskList = {
    preStudyList: [],
    learningList: [],
    completeList: []
  }
  const [List, setList] = useState(taskList)
  const [isAdd, setAdd] = useState(false) // 控制输入框

  // 显示输入框
  function showInput() {
    setAdd(true)
  }

  /* getId  : 获取添加项id
   * params : null
   * return : maxId
   */
  function getId() {
    const { preStudyList, learningList, completeList } = List
    let preMaxId =
      preStudyList.length > 0 ? Math.max(...preStudyList.map(v => v.id)) : 0
    let learnMaxId =
      learningList.length > 0 ? Math.max(...learningList.map(v => v.id)) : 0
    let completeMaxId =
      completeList.length > 0 ? Math.max(...completeList.map(v => v.id)) : 0
    return Math.max(preMaxId, learnMaxId, completeMaxId)
  }

  // 添加列表项
  function addList(e) {
    if (e.keyCode === 13) {
      const { preStudyList, learningList, completeList } = List
      const id = getId() + 1
      setList({
        preStudyList: [...preStudyList, { id, val: e.target.value }],
        learningList,
        completeList
      })
      setAdd(false)
    }
  }

  // 删除列表项
  function delList(index, pableId) {
    let newList = _.cloneDeep(List)
    // const { preStudyList, learningList, completeList } = List
    newList[pableId].splice(index, 1)
    setList(newList)
    newList = null
  }

  // 拖拽结束
  function onDragEnd(res) {
    let newList = _.cloneDeep(List)
    const sourceIndex = res.source.index // 源索引
    const destinationIndex = res.destination.index // 目标索引
    const sourceId = res.source.droppableId // 源组
    const destinationId = res.destination.droppableId //目标组
    if (sourceIndex === destinationIndex && sourceId === destinationId) {
      return
    }
    let [item] = newList[sourceId].splice(sourceIndex, 1)
    newList[destinationId].splice(destinationIndex, 0, item)
    setList(newList)
    newList = null
  }

  return (
    <div className='task'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Card
          list={List.preStudyList}
          addList={addList}
          delList={delList}
          isPre
          isAdd={isAdd}
          showInput={showInput}
          className='pre'
          title='Prepare to study'
          pableId='preStudyList'></Card>
        <Card
          list={List.learningList}
          delList={delList}
          className='learn'
          title='Learning...'
          pableId='learningList'></Card>
        <Card
          list={List.completeList}
          delList={delList}
          className='complete'
          title='Complete'
          pableId='completeList'></Card>
      </DragDropContext>
    </div>
  )
}
