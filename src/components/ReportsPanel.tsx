import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateReportStatus } from '../store/slices/adminSlice';
import { Report } from '../types';
import './ReportsPanel.css';

const ReportsPanel: React.FC = () => {
  const dispatch = useDispatch();
  const { reports, isLoading } = useSelector((state: RootState) => state.admin);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    return statusFilter === 'all' || report.status === statusFilter;
  });

  const handleUpdateReportStatus = (reportId: string, status: Report['status']) => {
    dispatch(updateReportStatus({
      reportId,
      status,
      reviewedBy: 'admin' // В реальном приложении здесь будет ID текущего админа
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'reviewed': return '#2196F3';
      case 'resolved': return '#4CAF50';
      case 'dismissed': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает рассмотрения';
      case 'reviewed': return 'Рассмотрено';
      case 'resolved': return 'Решено';
      case 'dismissed': return 'Отклонено';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="reports-panel">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="reports-panel">
      <div className="panel-header">
        <h2>Жалобы и сообщения</h2>
        <p>Управление жалобами пользователей</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все жалобы</option>
            <option value="pending">Ожидают рассмотрения</option>
            <option value="reviewed">Рассмотренные</option>
            <option value="resolved">Решенные</option>
            <option value="dismissed">Отклоненные</option>
          </select>
        </div>
      </div>

      <div className="reports-list">
        {filteredReports.length === 0 ? (
          <div className="no-reports">
            <p>Жалобы не найдены</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-header">
                <div className="report-info">
                  <h3 className="report-title">Жалоба #{report.id}</h3>
                  <div className="report-meta">
                    <span className="report-date">{formatDate(report.createdAt)}</span>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(report.status) }}
                    >
                      {getStatusText(report.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="report-content">
                <div className="report-details">
                  <div className="detail-item">
                    <span className="detail-label">Жалобщик:</span>
                    <span className="detail-value">{report.reporterName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">ID задания:</span>
                    <span className="detail-value">{report.jobId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Причина:</span>
                    <span className="detail-value">{report.reason}</span>
                  </div>
                </div>

                <div className="report-description">
                  <h4>Описание жалобы:</h4>
                  <p>{report.description}</p>
                </div>

                {report.reviewedAt && (
                  <div className="review-info">
                    <h4>Информация о рассмотрении:</h4>
                    <p>Рассмотрено: {formatDate(report.reviewedAt)}</p>
                    {report.reviewedBy && (
                      <p>Администратор: {report.reviewedBy}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="report-actions">
                {report.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateReportStatus(report.id, 'reviewed')}
                      className="action-btn review-btn"
                    >
                      Рассмотреть
                    </button>
                    <button
                      onClick={() => handleUpdateReportStatus(report.id, 'resolved')}
                      className="action-btn resolve-btn"
                    >
                      Решить
                    </button>
                    <button
                      onClick={() => handleUpdateReportStatus(report.id, 'dismissed')}
                      className="action-btn dismiss-btn"
                    >
                      Отклонить
                    </button>
                  </>
                )}
                
                {report.status === 'reviewed' && (
                  <>
                    <button
                      onClick={() => handleUpdateReportStatus(report.id, 'resolved')}
                      className="action-btn resolve-btn"
                    >
                      Решить
                    </button>
                    <button
                      onClick={() => handleUpdateReportStatus(report.id, 'dismissed')}
                      className="action-btn dismiss-btn"
                    >
                      Отклонить
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsPanel;
