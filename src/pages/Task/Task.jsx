import React from 'react'
import './task.scss'

export default function Task() {
  var taskList = ['html', 'javascript']
  return (
    <div className='task'>
      <div className='card'>
        <div className='status'>learning...</div>
        <div className='list'>
          {taskList.map((v, i) => {
            return (
              <div className='item' key={i}>
                {v}
              </div>
            )
          })}
          <div className='item'>
            <input type='text' />
          </div>
          <div className='add'></div>
        </div>
      </div>
    </div>
  )
}
