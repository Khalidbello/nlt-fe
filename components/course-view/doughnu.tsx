import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

interface DoughnutChartProps {
    percentage: number;
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string[];
        }[];
    };
    containerClassName?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ percentage, data, containerClassName }) => {
    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="flex justify-start gap-4 items-center w-full h-32 p-4">
            <Doughnut data={data} options={chartOptions} />
            <div className="">
                <div className="flex items-center mr-2">
                    <div
                        className="w-3 h-3 mr-1 rounded-full"
                        style={{ backgroundColor: data.datasets[0].backgroundColor[1] }}
                    />
                    <div className=''>{data.labels[1]} {data.datasets[0].data[1]}%</div>
                </div>
                <div className="flex items-center mr-2">
                    <div
                        className="w-3 h-3 mr-1 rounded-full"
                        style={{ backgroundColor: data.datasets[0].backgroundColor[0] }}
                    />
                    <div className=''>{data.labels[0]} {data.datasets[0].data[0]}%</div>
                </div>
            </div>
        </div>
    );
};

export default DoughnutChart;
