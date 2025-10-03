import React from 'react';
import Card from './Card';
import './Chart.css';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartDataPoint[];
  title?: string;
  type?: 'bar' | 'line' | 'pie';
  height?: number;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ 
  data, 
  title,
  type = 'bar',
  height = 300,
  className = ''
}) => {
  const classes = `chart chart-${type} ${className}`.trim();

  // Generate colors if not provided
  const defaultColors = ['#2563eb', '#89F336', '#ef4444', '#f59e0b', '#8b5cf6', '#10b981'];
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || defaultColors[index % defaultColors.length]
  }));

  // For bar chart
  const maxValue = Math.max(...chartData.map(item => item.value), 1);
  
  return (
    <Card className={classes} title={title}>
      <div className="chart-container" style={{ height: `${height}px` }}>
        {type === 'bar' && (
          <div className="chart-bar-container">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar-item">
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }}
                ></div>
                <div className="chart-bar-label">{item.label}</div>
                <div className="chart-bar-value">{item.value}</div>
              </div>
            ))}
          </div>
        )}
        
        {type === 'line' && (
          <div className="chart-line-container">
            <div className="chart-line-grid">
              {[0, 25, 50, 75, 100].map((percent) => (
                <div 
                  key={percent} 
                  className="chart-line-grid-line"
                  style={{ bottom: `${percent}%` }}
                ></div>
              ))}
            </div>
            <svg className="chart-line-svg" viewBox={`0 0 100 ${100}`}>
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                points={chartData.map((item, index) => 
                  `${(index / (chartData.length - 1)) * 100},${100 - (item.value / maxValue) * 100}`
                ).join(' ')}
              />
              {chartData.map((item, index) => (
                <circle
                  key={index}
                  cx={(index / (chartData.length - 1)) * 100}
                  cy={100 - (item.value / maxValue) * 100}
                  r="3"
                  fill={item.color}
                />
              ))}
            </svg>
            <div className="chart-line-labels">
              {chartData.map((item, index) => (
                <div key={index} className="chart-line-label">
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {type === 'pie' && (
          <div className="chart-pie-container">
            <svg className="chart-pie-svg" viewBox="0 0 100 100">
              {(() => {
                let startAngle = 0;
                return chartData.map((item, index) => {
                  const sliceAngle = (item.value / chartData.reduce((sum, d) => sum + d.value, 0)) * 360;
                  const endAngle = startAngle + sliceAngle;
                  
                  // Convert angles to radians
                  const startAngleRad = (startAngle - 90) * Math.PI / 180;
                  const endAngleRad = (endAngle - 90) * Math.PI / 180;
                  
                  // Calculate coordinates
                  const x1 = 50 + 40 * Math.cos(startAngleRad);
                  const y1 = 50 + 40 * Math.sin(startAngleRad);
                  const x2 = 50 + 40 * Math.cos(endAngleRad);
                  const y2 = 50 + 40 * Math.sin(endAngleRad);
                  
                  // Large arc flag
                  const largeArcFlag = sliceAngle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M 50 50`,
                    `L ${x1} ${y1}`,
                    `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');
                  
                  startAngle = endAngle;
                  
                  return (
                    <path
                      key={index}
                      d={pathData}
                      fill={item.color}
                    />
                  );
                });
              })()}
            </svg>
            <div className="chart-pie-legend">
              {chartData.map((item, index) => (
                <div key={index} className="chart-pie-legend-item">
                  <div 
                    className="chart-pie-legend-color" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="chart-pie-legend-label">{item.label}</div>
                  <div className="chart-pie-legend-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Chart;