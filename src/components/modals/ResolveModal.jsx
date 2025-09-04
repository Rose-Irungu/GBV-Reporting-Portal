import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

const ResolveModal = ({ 
  showResolveModal, 
  setShowResolveModal, 
  selectedCase, 
  allReports,
  onResolveCase 
}) => {
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolutionType, setResolutionType] = useState('completed');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the selected report
  const selectedReport = allReports?.find(report => report.reference_code === selectedCase);

  const handleResolve = async () => {
    if (!resolutionNotes.trim()) {
      alert('Please provide resolution notes');
      return;
    }

    setIsSubmitting(true);
    try {
      await onResolveCase({
        referenceCode: selectedCase,
        resolutionType,
        resolutionNotes: resolutionNotes.trim(),
        resolvedAt: new Date().toISOString()
      });
      
      // Reset form and close modal
      setResolutionNotes('');
      setResolutionType('completed');
      setShowResolveModal(false);
    } catch (error) {
      console.error('Error resolving case:', error);
      alert('Failed to resolve case. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setResolutionNotes('');
    setResolutionType('completed');
    setShowResolveModal(false);
  };

  if (!showResolveModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Resolve Case
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Case Info */}
        {selectedReport && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Case Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Case ID:</span> {selectedReport.reference_code}</p>
              <p><span className="font-medium">Reporter:</span> {selectedReport.full_name || 'N/A'}</p>
              <p><span className="font-medium">Type:</span> {selectedReport.incident_type || 'N/A'}</p>
              <p><span className="font-medium">Current Status:</span> 
                <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {selectedReport.status}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Resolution Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution Type
          </label>
          <select
            value={resolutionType}
            onChange={(e) => setResolutionType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="completed">Completed Successfully</option>
            <option value="resolved">Issue Resolved</option>
            <option value="closed">Case Closed</option>
            <option value="duplicate">Duplicate Case</option>
            <option value="invalid">Invalid Report</option>
            <option value="no_action">No Action Required</option>
          </select>
        </div>

        {/* Resolution Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution Notes *
          </label>
          <textarea
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="Provide details about how this case was resolved..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Please provide detailed notes about the resolution for record keeping.
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-700">
              <p className="font-medium">Important:</p>
              <p>Once resolved, this case will be marked as completed. Make sure all necessary actions have been taken.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleResolve}
            disabled={isSubmitting || !resolutionNotes.trim()}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Resolving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Resolve Case</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveModal;