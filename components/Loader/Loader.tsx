import { ThreeDot } from 'react-loading-indicators';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.container}>
      <ThreeDot color="#0b5ed7" size="medium" />
    </div>
  );
}
