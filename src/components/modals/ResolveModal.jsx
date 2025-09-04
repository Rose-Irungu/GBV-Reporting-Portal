import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

const ResolveModal = ({ 
  showResolveModal, 
  setShowResolveModal, 
  selectedCase, 
  allReports,
  onResolveCase 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the selected report
  const selectedReport = allReports?.find(report => report.reference_code === selectedCase);

  const handleResolve = async () => {
    setIsSubmitting(true);
    try {
      await onResolveCase({
        referenceCode: selectedCase,
        resolvedAt: new Date().toISOString()
      });
      
      setShowResolveModal(false);
    } catch (error) {
      console.error('Error resolving case:', error);
      alert('Failed to resolve case. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
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

        {/* Confirmation Message */}
        <div className="text-center mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-medium text-amber-800">
                Confirm Resolution
              </h3>
            </div>
            <p className="text-amber-700">
              Are you sure you want to resolve this case?
            </p>
          </div>

          {selectedReport && (
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Case ID:</span> {selectedReport.reference_code}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Reporter:</span> {selectedReport.full_name || 'N/A'}
              </p>
            </div>
          )}
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
            disabled={isSubmitting}
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
                <span>Yes, Resolve</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveModal;