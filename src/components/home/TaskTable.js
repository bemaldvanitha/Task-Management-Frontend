import React from "react";
import {FaInfo, FaTrash} from "react-icons/fa";

import './TaskTable.css';
import {IoPencil} from "react-icons/io5";
import {TiTick} from "react-icons/ti";

const TaskTable = ({ tasks, infoClickHandler, deleteClickHandler, editClickHandler, completeClickHandler }) => {
    return(
        <table className={'task-table'}>
            <thead>
                <tr className={'task-table-header-header-row'}>
                    <th className={'task-table-header'}>Title</th>
                    <th className={'task-table-header'}>Description</th>
                    <th className={'task-table-header'}>Due Date</th>
                    <th className={'task-table-header'}>Priority</th>
                    <th className={'task-table-header'}>Status</th>
                    <th className={'task-table-header'}>Assign</th>
                    <th className={'task-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
            {tasks.map((task) => {
                return (
                    <tr key={task.id}>
                        <td className={'task-table-data'}>
                            {task.title.length > 10 ? task.title.slice(0, 10) + '...' : task.title}
                        </td>
                        <td className={'task-table-data'}>
                            {task.description.length > 20 ? task.description.slice(0, 20) + '...' : task.description}
                        </td>
                        <td className={'task-table-data'}>{new Date(task.dueDate).toLocaleDateString('en-US',
                            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        <td className={'task-table-data'}>{task.priority}</td>
                        <td className={'task-table-data'}>{task.status}</td>
                        <td className={'task-table-data'}>{task.assignedTo}</td>
                        <td>
                           <div className={'task-table-icon-container'}>
                               <FaInfo className={'task-table-icon task-table-info-icon'}
                                       onClick={() => infoClickHandler(task.id)}/>
                               <IoPencil className={'task-table-icon task-table-edit-icon'}
                                         onClick={() => editClickHandler(task.id)}/>
                               <FaTrash className={'task-table-icon task-table-delete-icon'}
                                        onClick={() => deleteClickHandler(task.id)}/>
                               <TiTick className={'task-table-icon task-table-info-icon'}
                                       onClick={() => completeClickHandler(task.id)}/>
                           </div>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default TaskTable;