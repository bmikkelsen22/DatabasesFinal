import * as React from "react";
import * as ReactDOM from "react-dom";
import "./modal.css";

export interface ModalProps {
  visible: boolean;
  title?: string;
  height?: number;
  width?: number;
  onCancel: () => void;
}

export const Modal: React.SFC<ModalProps> = props => {
  const sizeStyle = {
    height: props.height,
    width: props.width
  };
  const wrapperClass = props.visible ? "modal-backdrop" : "hidden";

  return (
    <div className={wrapperClass}>
      <div className="modal" style={sizeStyle}>
        <div className="modal-header">
          <h2 className="modal-title">{props.title}</h2>
          <span className="modal-close" onClick={props.onCancel}>
            &#10799;
          </span>
        </div>
        {props.children}
      </div>
    </div>
  );
};
