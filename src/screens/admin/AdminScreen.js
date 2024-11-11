import React, { useState, useEffect } from 'react';
import LoadingSpinner from "../../components/common/loading/LoadingSpinner";
import { useFetchAdminStatsQuery } from "../../slicers/adminApiSlice";
import CustomBarChart from "../../components/charts/bar-chart/CustomBarChart"; // Assuming this is already implemented

import './AdminScreen.css';

const AdminScreen = () => {
    const [adminStats, setAdminStats] = useState({});
    const [taskByPriority, setTaskByPriority] = useState([]);
    const [tasksByUser, setTaskByUser] = useState([]);

    const { data: adminStatData, isLoading: adminStatIsLoading, refetch: adminStatRefetch, error: adminStatError } = useFetchAdminStatsQuery();

    useEffect(() => {
        if (adminStatData) {
            setAdminStats({
                totalTasks: adminStatData.totalTasks,
                completedTasks: adminStatData.completedTasks,
                totalDueTasks: adminStatData.totalDueTasks,
                totalOverdueTasks: adminStatData.totalOverdueTasks
            });
            setTaskByPriority(adminStatData.tasksByPriority || []);
            setTaskByUser(adminStatData.tasksByUser || []);
        }
    }, [adminStatData]);

    if (adminStatIsLoading) {
        return <LoadingSpinner />;
    }

    if (adminStatError) {
        return <div>Error loading admin stats</div>;
    }

    const priorityCategories = taskByPriority.map(item => item.priority);
    const priorityData = taskByPriority.map(item => item.taskCount);

    const userCategories = tasksByUser.map(item => item.userName);
    const userData = tasksByUser.map(item => item.taskCount);

    return (
        <div className={'admin-screen'}>
            <div className="admin-screen-container">
                <h2 className={'admin-screen-title'}>Admin Dashboard</h2>
                <div className="admin-stats-summary">
                    <div className="stat-box">
                        <h3 className={'stat-box-title'}>Total Tasks</h3>
                        <p className={'stat-box-desc'}>{adminStats.totalTasks}</p>
                    </div>
                    <div className="stat-box">
                        <h3 className={'stat-box-title'}>Completed Tasks</h3>
                        <p className={'stat-box-desc'}>{adminStats.completedTasks}</p>
                    </div>
                    <div className="stat-box">
                        <h3 className={'stat-box-title'}>Total Due Tasks</h3>
                        <p className={'stat-box-desc'}>{adminStats.totalDueTasks}</p>
                    </div>
                    <div className="stat-box">
                        <h3 className={'stat-box-title'}>Total Overdue Tasks</h3>
                        <p className={'stat-box-desc'}>{adminStats.totalOverdueTasks}</p>
                    </div>
                </div>

                <div className={'chart-row'}>
                    <div className="chart-container">
                        <CustomBarChart title="Task Distribution by Priority" seriesTitle="Task Count"
                            backgroundColor="#353935" data={priorityData} categories={priorityCategories}
                            letterColor="#f0f0f0" yAxisTitle="Task Count"/>
                    </div>

                    <div className="chart-container">
                        <CustomBarChart title="Task Distribution by User" seriesTitle="Task Count"
                            backgroundColor="#353935" data={userData} categories={userCategories}
                            letterColor="#f0f0f0" yAxisTitle="Task Count"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminScreen;