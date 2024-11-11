import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CustomBarChart = ({ title, seriesTitle, backgroundColor, data, categories, letterColor, yAxisTitle }) => {
    const options = {
        chart: {
            type: 'column',
            backgroundColor: backgroundColor
        },
        title: {
            text: title,
            style: {
                color: letterColor
            }
        },
        xAxis: {
            categories: categories,
            title: {
                style: {
                    color: letterColor
                }
            },
            labels: {
                style: {
                    color: letterColor
                }
            }
        },
        yAxis: {
            title: {
                text: yAxisTitle,
                style: {
                    color: letterColor
                }
            },
            labels: {
                style: {
                    color: letterColor
                }
            }
        },
        legend: {
            itemStyle: {
                color: letterColor
            }
        },
        series: [
            {
                name: seriesTitle,
                data: data
            }
        ]
    };

    return(
        <div style={{width: '90%'}}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default CustomBarChart;