import React from "react";
import { ITodo } from "../../interfaces";
import Dropzone from "../dropzone/Dropzone";
import { ModalWrapper } from "./Modal.styles";

interface Props {
  isActive: boolean;
  onClose: () => void;
  onAdd: (todos: ITodo[]) => Promise<void>;
}

const Modal: React.FC<Props> = ({ isActive, onClose, onAdd }) => (
  <>
    {isActive && (
      <ModalWrapper>
        <Dropzone onClose={onClose} onAdd={onAdd} />
      </ModalWrapper>
    )}
  </>
);

export default Modal;
