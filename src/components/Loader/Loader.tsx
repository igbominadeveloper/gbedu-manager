import { FunctionComponent } from 'react';

import LoaderIcon from '../../assets/loader.svg';

import './Loader.scss';

type LoaderProps = {
  width?: number;
};

const Loader: FunctionComponent<LoaderProps> = ({ width = 3 }: LoaderProps) => (
  <div className="app-loader" style={{ width: `${width}rem` }}>
    <img src={LoaderIcon} alt="loader" />
  </div>
);

export default Loader;
