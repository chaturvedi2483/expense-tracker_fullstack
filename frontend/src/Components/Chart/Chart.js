import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                borderColor: '#48BB78',
                backgroundColor: 'rgba(72, 187, 120, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#48BB78',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                borderColor: '#F56565',
                backgroundColor: 'rgba(245, 101, 101, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#F56565',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#2D3748',
                bodyColor: '#4A5568',
                borderColor: 'rgba(102, 126, 234, 0.2)',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#718096',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(113, 128, 150, 0.1)',
                    borderDash: [5, 5]
                },
                ticks: {
                    color: '#718096',
                    font: {
                        size: 11
                    },
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    }

    return (
        <ChartStyled>
            <div className="chart-header">
                <h3>Financial Trends</h3>
                <p>Income vs Expenses over time</p>
            </div>
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .chart-header {
        margin-bottom: 1.5rem;
        
        h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
        }
        
        p {
            font-size: 0.875rem;
            color: var(--primary-color3);
            margin: 0;
        }
    }
    
    .chart-container {
        flex: 1;
        position: relative;
        min-height: 300px;
    }
`;

export default Chart