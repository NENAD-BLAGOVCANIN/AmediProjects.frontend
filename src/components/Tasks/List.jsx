import React from 'react'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck as solidCircleCheck } from '@fortawesome/free-solid-svg-icons';

function List({ tasks, setTasks, setSelectedTask, selectedTask,
  showTasksModal, setShowTasksModal, showAddTaskCard, setShowAddTaskCard }) {
  return (
    <div className='py-5 px-2'>

      <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive pt-3'>
          <table className='table table-bordered table-hover'>
            <tbody>

              <tr>
                <td className='bg-transparent medium color-text-lighter w-25'>
                  Subject
                </td>
                <td className='bg-transparent medium color-text-lighter w-25'>Description</td>
                <td className='bg-transparent medium color-text-lighter w-25'>Created At</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <h5 className='color-text-lighter'>To do</h5>

      <div className='m-auto d-block w-100' style={{ maxWidth: 1500, overflowX: 'auto' }}>
        <div className='table-responsive pt-3'>
          <table className='table table-bordered table-hover'>

            <tbody>
              {tasks.filter(task => task.status === 'todo').map(task => (
                <tr key={task.id}>
                  <td className='bg-transparent medium color-text-lighter'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                    {task.subject}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>
                    {task.description.length > 28 ? `${task.description.slice(0, 28)}...` : task.description}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>{task.created_at}</td>

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
                  <td className='bg-transparent medium color-text-lighter'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                    {task.subject}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>
                    {task.description.length > 28 ? `${task.description.slice(0, 28)}...` : task.description}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>{task.created_at}</td>

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
                  <td className='bg-transparent medium color-text-lighter'>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-muted medium pe-2' />
                    {task.subject}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>
                    {task.description.length > 28 ? `${task.description.slice(0, 28)}...` : task.description}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>{task.created_at}</td>

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
                  <td className='bg-transparent medium color-text-lighter'>
                    <FontAwesomeIcon icon={solidCircleCheck} className='text-success rounded-circle me-2' />
                    {task.subject}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>
                    {task.description.length > 28 ? `${task.description.slice(0, 28)}...` : task.description}
                  </td>
                  <td className='bg-transparent medium color-text-lighter'>{task.created_at}</td>

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