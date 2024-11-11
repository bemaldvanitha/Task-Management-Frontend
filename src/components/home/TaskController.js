import React from 'react';

import CustomInput from '../common/input/CustomInput';
import CustomSelect from '../common/select/CustomSelect';

import './TaskController.css';

const TaskController = ({ searchTerm, setSearchTerm, selectedStatus, setSelectedStatus, selectedPriority,
                            setSelectedPriority, selectedSortOption, setSelectedSortOption, statuses,
                            priorities, sortOptions }) => {

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setSelectedPriority(e.target.value);
    };

    const handleSortChange = (e) => {
        setSelectedSortOption(e.target.value);
    };

    return (
        <div className="task-controller">
            <div className="task-controller-row">
                <CustomInput title="Search Tasks" id="search" value={searchTerm} onChangeHandle={handleSearchChange}
                             placeholder="Search tasks..." type={'text'} isSmall={true} isNoLabel={true}/>
                <CustomSelect title="Sort By" id="sort" value={selectedSortOption} onChangeHandle={handleSortChange}
                              options={sortOptions} isSmall={true} isNoLabel={true}/>
                <CustomSelect title="Status" id="status" value={selectedStatus} onChangeHandle={handleStatusChange}
                    options={statuses} isSmall={true} isNoLabel={true}/>
                <CustomSelect title="Priority" id="priority" value={selectedPriority} onChangeHandle={handlePriorityChange}
                    options={priorities} isSmall={true} isNoLabel={true}/>
            </div>
        </div>
    );
};

export default TaskController;