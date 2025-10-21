'use client';
import { useRouter } from 'next/navigation';
import css from './BackBtn.module.css';

export default function BackBtn() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button onClick={handleBack} className={css.backBtn}>
      Back
    </button>
  );
}
