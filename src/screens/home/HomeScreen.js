import React, { useState, useEffect } from 'react';
import { Modal, message } from "antd";

import LoadingSpinner from "../../components/common/loading/LoadingSpinner";
import TaskTable from "../../components/home/TaskTable";
import CustomButton from "../../components/common/button/CustomButton";
import CreateTaskModel from "../../components/home/CreateTaskModel";
import DeleteTaskModel from "../../components/home/DeleteTaskModel";
import InfoTaskModel from "../../components/home/InfoTaskModel";
import { useFetchAllUsersQuery } from "../../slicers/authApiSlice";
import { useFetchAssignedTasksQuery, useTaskCompleteMutation, useDeleteTaskMutation, useTaskUpdateMutation,
    useTaskCreateMutation } from "../../slicers/taskApiSlice";

import './HomeScreen.css';
import TaskController from "../../components/home/TaskController";

const HomeScreen = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [statuses, setStatuses] = useState(['Pending', 'Completed']);
    const [priorities, setPriorities] = useState(['Minor', 'Low', 'Moderate', 'High', 'Critical']);
    const [sortOptions, setSortOptions] = useState(['dueDate', 'priority']);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [isCreateTaskModelOpen, setIsCreateTaskModelOpen] = useState(false);
    const [taskManipulationMode, setTaskManipulationMode] = useState('Create');
    const [updateTaskId, setUpdateTaskId] = useState(0);

    const [isDeleteTaskModelOpen, setIsDeleteTaskModelOpen] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(0);

    const [isInfoTaskModelOpen, setIsInfoTaskModelOpen] = useState(false);
    const [infoTaskId, setInfoTaskId] = useState(0);
    const [selectedTask, setSelectedTask] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '',
        dueDate: '',
        assignedTo: ''
    });

    const [isFieldError, setIsFieldError] = useState({
        isTitleError: '',
        isDescriptionError: '',
        isPriorityError: '',
        isDueDateError: '',
        isAssignedToError: ''
    });

    const { data: allUsersData, isLoading: allUsersIsLoading, refetch: allUsersRefetch, error: allUsersError
        } = useFetchAllUsersQuery();
    const { data: taskData, isLoading: taskDataIsLoading, refetch: taskDataRefetch, error: taskDataError } =
        useFetchAssignedTasksQuery({ status: selectedStatus, priority: selectedPriority, sortBy: selectedSortOption,
            search: searchTerm, page: currentPage, pageSize });
    const [taskComplete, { isLoading: taskCompleteIsLoading }] = useTaskCompleteMutation();
    const [deleteTask, { isLoading: deleteTaskIsLoading }] = useDeleteTaskMutation();
    const [taskCreate, { isLoading: taskCreateIsLoading }] = useTaskCreateMutation();
    const [taskUpdate, { isLoading: taskUpdateIsLoading }] = useTaskUpdateMutation();

    useEffect(() => {
        if(taskData?.tasks){
            setTasks(taskData?.tasks);
            setTotalPages(parseInt(taskData?.totalPages));
        }
    }, [selectedStatus, selectedPriority, selectedSortOption, searchTerm, currentPage, pageSize, taskData]);

    useEffect(() => {
        if(allUsersData?.users){
            setUsers(allUsersData?.users);
        }
    },[allUsersData]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const titleChangeHandler = (e) => {
        handleChange('title', e.target.value);
    }

    const descriptionChangeHandler = (e) => {
        handleChange('description', e.target.value);
    }

    const priorityChangeHandler = (e) => {
        handleChange('priority', e.target.value);
    }

    const dueDataChangeHandler = async (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            message.warning('You cannot select a past date.');
        } else {
            handleChange('dueDate', e.target.value);
        }
    }

    const assignedChangeHandler = (e) => {
        handleChange('assignedTo', e.target.value);
    }

    const createTaskCancelHandler = () => {
        setIsCreateTaskModelOpen(false);
        setTaskManipulationMode('Create');
        setUpdateTaskId(0);
    }

    const createTaskHandler = () => {
        setIsCreateTaskModelOpen(true);
        setTaskManipulationMode('Create');
    }

    const infoSelectHandler = (id) => {
        setIsInfoTaskModelOpen(true);
        setInfoTaskId(id);
        const task = tasks.find(task => task.id === id);
        setSelectedTask(task);
    }

    const closeInfoSelectHandler = (id) => {
        setIsInfoTaskModelOpen(false);
        setInfoTaskId(0);
        setSelectedTask({});
    }

    const deleteSelectHandler = (id) => {
        setDeleteTaskId(id);
        setIsDeleteTaskModelOpen(true);
    }

    const closeDeleteModelHandler = () => {
        setDeleteTaskId(0);
        setIsDeleteTaskModelOpen(false);
    }

    const deleteModelCompletionHandler = async () => {
        try {
            const res = await deleteTask(deleteTaskId).unwrap();
            message.success(res?.message || 'Task deletion successfully !');
            await taskDataRefetch();
        }catch (err){
            console.log(err);
            message.error(err?.data?.message  || 'Task deletion failed !');
        }

        setDeleteTaskId(0);
        setIsDeleteTaskModelOpen(false);
    }

    const editSelectHandler = (id) => {
        setIsCreateTaskModelOpen(true);
        setTaskManipulationMode('Edit');
        setUpdateTaskId(id);
        const task = tasks.find(task => task.id === id);

        setFormData({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            assignedTo: formData.assignedTo
        });
    }

    const completeSelectHandler = async (id) => {
        try {
            const res = await taskComplete(id).unwrap();
            message.success(res?.message || 'Task complete successfully !');
            await taskDataRefetch();
        }catch (err){
            console.log(err);
            message.error(err?.data?.message  || 'Task complete failed !');
        }
    }

    const taskCreationSubmitHandler = async (mode) => {
        const titleValidity = formData.title.trim().length >= 3;
        const descriptionValidity = formData.description.trim().length >= 6;
        const priorityValidity = formData.priority.trim().length !== 0;
        const dueDateValidity = formData.dueDate.trim().length !== 0;
        const assignedToValidity = taskManipulationMode === 'Create' ?
            formData.assignedTo.trim().length !== 0 : true;

        setIsFieldError({
            isTitleError: false,
            isAssignedToError: false,
            isDescriptionError: false,
            isDueDateError: false,
            isPriorityError: false
        });

        if(titleValidity && descriptionValidity && priorityValidity && dueDateValidity && assignedToValidity){
            try {
                if(mode === 'Create'){
                    const assignedId = users.find(user => user.username === formData.assignedTo).id;

                    const body = {
                        title: formData.title,
                        description: formData.description,
                        priority: formData.priority,
                        dueDate: formData.dueDate,
                        assignedId: assignedId
                    }

                    const res = await taskCreate(body).unwrap();
                    message.success(res?.message || 'Task create successfully !');
                    await taskDataRefetch();
                }else {
                    const body = {
                        title: formData.title,
                        description: formData.description,
                        priority: formData.priority,
                        dueDate: formData.dueDate
                    }
                    let id = updateTaskId;
                    const res = await taskUpdate({ id, body }).unwrap();
                    message.success(res?.message || 'Task update successfully !');
                    await taskDataRefetch();
                }

                createTaskCancelHandler();
            }catch (error){
                console.log(error);
                message.error(error?.data?.message  || `Task ${taskManipulationMode === 'Create' ? 'Creation'
                    : 'Edit'} failed !`);
            }
        }else {
            setIsFieldError({
                isTitleError: !titleValidity,
                isAssignedToError: !assignedToValidity,
                isDescriptionError: !descriptionValidity,
                isDueDateError: !dueDateValidity,
                isPriorityError: !priorityValidity
            })
        }
    }

    if(allUsersIsLoading || taskDataIsLoading || taskCompleteIsLoading || deleteTaskIsLoading ||
        taskCreateIsLoading || taskUpdateIsLoading){
        return (
            <LoadingSpinner/>
        )
    }else {
        return(
            <div className={'home-screen'}>
                <div className={'home-screen-container'}>
                    <p className={'home-screen-title'}>Tasks</p>
                    <div className={'home-screen-header-row'}>
                        {<div className={'home-screen-no-content'}></div>}
                        <CustomButton title={'Create Task'} onClick={createTaskHandler} fontColor={'#f0f0f0'}
                                      bgColor={'#000000'} isSmall={true}/>
                    </div>
                    <div>
                        <TaskController
                            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                            selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
                            selectedPriority={selectedPriority} setSelectedPriority={setSelectedPriority}
                            selectedSortOption={selectedSortOption} setSelectedSortOption={setSelectedSortOption}
                            statuses={statuses} priorities={priorities} sortOptions={sortOptions}
                        />
                    </div>
                    {tasks.length === 0 && <p className={'home-screen-placeholder-text'}>No Tasks Left</p>}
                    {tasks.length !== 0 && <TaskTable tasks={tasks} infoClickHandler={infoSelectHandler}
                               deleteClickHandler={deleteSelectHandler} editClickHandler={editSelectHandler}
                               completeClickHandler={completeSelectHandler}/>}
                    {isCreateTaskModelOpen && <CreateTaskModel isOpen={isCreateTaskModelOpen}
                                closeHandler={createTaskCancelHandler} okHandler={taskCreationSubmitHandler}
                                formData={formData} titleChangeHandler={titleChangeHandler}
                                descriptionChangeHandler={descriptionChangeHandler} mode={taskManipulationMode}
                                priorityChangeHandler={priorityChangeHandler} dueDataChangeHandler={dueDataChangeHandler}
                                assignedChangeHandler={assignedChangeHandler} fieldErrors={isFieldError}
                                priorities={priorities} users={users}/>}
                    {isDeleteTaskModelOpen && <DeleteTaskModel okHandler={deleteModelCompletionHandler}
                                cancelHandler={closeDeleteModelHandler} isModelOpen={isDeleteTaskModelOpen}/>}
                    {isInfoTaskModelOpen && <InfoTaskModel isModelOpen={isInfoTaskModelOpen}
                                cancelHandler={closeInfoSelectHandler} task={selectedTask}/>}
                </div>
            </div>
        )
    }
}

export default HomeScreen;