import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import CustomInput from "../common/input/CustomInput";
import CustomTextArea from "../common/textarea/CustomTextArea";
import CustomSelect from "../common/select/CustomSelect";

import './CreateTaskModel.css';

const CreateTaskModel = ({ isOpen, closeHandler, okHandler, assignedChangeHandler, dueDataChangeHandler,
                             priorityChangeHandler, descriptionChangeHandler, mode, titleChangeHandler,
                             formData, fieldErrors, priorities, users }) => {
    const [modalWidth, setModalWidth] = useState(800);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 480) {
                setModalWidth('95%');
            } else if (width < 768) {
                setModalWidth('90%');
            } else if (width < 1200) {
                setModalWidth('70%');
            } else {
                setModalWidth(800);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const usersList = users.map(item => item.username);

    return(
        <Modal open={isOpen} onCancel={closeHandler} onOk={() => okHandler(mode)} okText={mode === 'Create' ? 'Create Task' :
            'Update Task'} className={'custom-model custom-model-2'} width={modalWidth}>
            <CustomInput title={'Task Title'} type={'text'} placeholder={'Enter task title'} value={formData.title}
                         isError={fieldErrors.isTitleError} errorMessage={'Enter valid task title'} id={'title'}
                         onChangeHandle={titleChangeHandler}/>
            <CustomTextArea title={'Task Description'} onChangeHandle={descriptionChangeHandler} id={'description'}
                            errorMessage={'Enter valid task description'} isError={fieldErrors.isDescriptionError}
                            value={formData.description} placeholder={'Enter task description'}/>
            <CustomSelect onChangeHandle={priorityChangeHandler} value={formData.priority} title={'Task Priority'}
                          isError={fieldErrors.isPriorityError} errorMessage={'Select task priority'} id={'priority'}
                          options={priorities}/>
            <CustomInput type={'date'} onChangeHandle={dueDataChangeHandler} id={'dueDate'} errorMessage={'Select due date'}
                         isError={fieldErrors.isDueDateError} value={formData.dueDate} title={'Task Due Date'}
                         placeholder={'Select task due date'}/>
            {mode === 'Create' && <CustomSelect value={formData.assignedTo} isError={fieldErrors.isAssignedToError}
                         id={'assignedTo'} errorMessage={'Select who task assign to'} title={'Task Assigned'}
                          onChangeHandle={assignedChangeHandler} options={usersList}/>}
        </Modal>
    )
}

export default CreateTaskModel;