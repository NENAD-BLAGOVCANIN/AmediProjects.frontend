import React from 'react'

function List({ tasks, setTasks, setSelectedTask, selectedTask,
  showTasksModal, setShowTasksModal, showAddTaskCard, setShowAddTaskCard }) {
  return (
    <div className='py-5 px-2'>
      <h5 className='color-text-lighter'>To do</h5>

      <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive pt-3'>
          <table className='table table-bordered table-hover'>

            <tbody>
              {tasks.filter(task => task.status === 'todo').map(task => (
                <tr key={task.id}>
                  <td className='bg-transparent'>{task.subject}</td>
                  <td className='bg-transparent'>{task.description}</td>
                  <td className='bg-transparent'>{task.created_at}</td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      <h5 className='color-text-lighter mt-4'>Doing</h5>

      <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive pt-3'>
          <table className='table table-bordered table-hover'>

            <tbody>
              {tasks.filter(task => task.status === 'in_progress').map(task => (
                <tr key={task.id}>
                  <td className='bg-transparent'>{task.subject}</td>
                  <td className='bg-transparent'>{task.description}</td>
                  <td className='bg-transparent'>{task.created_at}</td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      <h5 className='color-text-lighter mt-4'>On Hold</h5>

      <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive pt-3'>
          <table className='table table-bordered table-hover'>

            <tbody>
              {tasks.filter(task => task.status === 'on_hold').map(task => (
                <tr key={task.id}>
                  <td className='bg-transparent'>{task.title}</td>
                  <td className='bg-transparent'>{task.description}</td>
                  <td className='bg-transparent'>{task.created_at}</td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      
      <h5 className='color-text-lighter mt-4'>Done</h5>

      <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive pt-3'>
          <table className='table table-bordered table-hover'>

            <tbody>
              {tasks.filter(task => task.status === 'done').map(task => (
                <tr key={task.id}>
                  <td className='bg-transparent'>{task.title}</td>
                  <td className='bg-transparent'>{task.description}</td>
                  <td className='bg-transparent'>{task.created_at}</td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default List