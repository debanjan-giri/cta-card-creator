import { memo } from "react";

export const Selector = memo(
  ({ onSelect, label, data, disabled = false, value }) => {
    const handlePositionClick = (position) => {
      if (!disabled && onSelect) {
        onSelect(position);
      }
    };

    return (
      <div className="">
        <p className="mb-2 fw-semibold text-secondary small">{label}</p>
        <div className="d-flex flex-wrap gap-2 p-2 bg-white rounded border">
          {data?.map((position) => {
            const IconComponent = position?.icon;
            const isSelected = value === position.key;

            return (
              <button
                key={position.key}
                disabled={disabled}
                onClick={() => handlePositionClick(position.key)}
                className={`d-flex flex-column align-items-center justify-content-center rounded border text-center transition-all ${
                  isSelected
                    ? "bg-primary text-white border-primary"
                    : "bg-light text-dark border-light"
                }`}
                style={{
                  width: "56px",
                  minHeight: "60px",
                  padding: "8px 6px",
                  fontSize: "11px",
                  lineHeight: "13px",
                  fontWeight: 600,
                  cursor: disabled ? "not-allowed" : "pointer",
                  userSelect: "none",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                <IconComponent
                  style={{
                    fontSize: "18px",
                    marginBottom: "4px",
                    color: isSelected ? "white" : "#6c757d",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: isSelected ? "white" : "#495057",
                    textAlign: "center",
                  }}
                >
                  {position.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
