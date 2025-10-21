'use client';

import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
