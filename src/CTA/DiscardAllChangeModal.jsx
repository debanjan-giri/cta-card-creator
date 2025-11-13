import { AlertTriangle } from "lucide-react";

const DiscardAllChangeModal = ({ show, onHide, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={onCancel}
      ></div>
      
      {/* Modal */}
      <div 
        className="modal fade show d-block" 
        style={{ zIndex: 1050 }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title d-flex align-items-center">
                <AlertTriangle className="text-warning me-2" size={24} />
                Discard Changes?
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-3 text-muted">
                You have unsaved changes to your card. If you switch to templates, 
                all your current changes will be lost.
              </p>
              <p className="mb-0 fw-semibold">
                Are you sure you want to continue?
              </p>
            </div>
            <div className="modal-footer border-0 pt-0">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-warning"
                onClick={onConfirm}
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscardAllChangeModal;