import React, {useEffect, useState} from 'react';
import { Modal, Tag } from 'antd';
import './InfoTaskModel.css';

const InfoTaskModel = ({ isModelOpen, cancelHandler, task }) => {
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

    return (
        <Modal open={isModelOpen} onCancel={cancelHandler} onOk={cancelHandler} okText={'Close'}
            title={'Task Info'} className={'custom-model'} width={modalWidth}>
            <div>
                <div className="task-details">
                    <div className="task-detail-item">
                        <strong>Title:</strong> <span>{task.title}</span>
                    </div>
                    <div className="task-detail-item">
                        <strong>Description:</strong> <span>{task.description}</span>
                    </div>
                    <div className="task-detail-item">
                        <strong>Priority:</strong> <Tag
                        color={task.priority === 'Minor' ? 'green' : 'blue'}>{task.priority}</Tag>
                    </div>
                    <div className="task-detail-item">
                        <strong>Status:</strong> <span>{task.status}</span>
                    </div>
                    <div className="task-detail-item">
                        <strong>Assigned To:</strong> <span>{task.assignedTo}</span>
                    </div>
                    <div className="task-detail-item">
                        <strong>Due Date:</strong> <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="audit-logs">
                    <h4>Audit Logs:</h4>
                    {task.auditLogs.length > 0 ? (
                        task.auditLogs.map((log, index) => (
                            <div key={index} className="audit-log-item">
                                <strong>{log.action} by {log.performedBy}</strong>
                                {log.details.length > 0 && (
                                    <div className="audit-details">
                                        {log.details.map((detail, idx) => (
                                            <div key={idx} className="audit-detail">
                                                <strong>{detail.field}:</strong>
                                                <span>{detail.oldValue} → {detail.newValue}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <span>No audit logs available</span>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default InfoTaskModel;
