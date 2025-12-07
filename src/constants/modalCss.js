export const themeStyles = `
    .preview-panel {
      background-image: linear-gradient(45deg, #f8f9fa 25%, transparent 25%),
                        linear-gradient(-45deg, #f8f9fa 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #f8f9fa 75%),
                        linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    }
    .control-group {
      transition: all 0.3s ease;
    }
    .control-group:hover {
      transform: translateY(-2px);
    }
    .section-selector-btn {
      transition: all 0.2s ease;
      border: 2px solid transparent;
    }
    .section-selector-btn.active {
      background-color: #0d6efd !important;
      border-color: #0d6efd !important;
      color: white !important;
      transform: scale(1.05);
    }
    .section-selector-btn:not(.active) {
      background-color: #f8f9fa;
      border-color: #dee2e6;
      color: #6c757d;
    }
    .section-selector-btn:not(.active):hover {
      background-color: #e9ecef;
      border-color: #adb5bd;
      color: #495057;
    }
  `;