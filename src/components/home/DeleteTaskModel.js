import React from 'react';
import { Modal } from 'antd';

import './DeleteTaskModel.css';

const DeleteTaskModel = ({ isModelOpen, cancelHandler, okHandler }) => {
    return(
        <Modal open={isModelOpen} onCancel={cancelHandler} onOk={okHandler} okText={'Delete'}
               title={'Are you sure?'} className={'custom-model'}>
            <p className={'delete-model-text'}>Are you sure about deleting task</p>
        </Modal>
    )
}

export default DeleteTaskModel;