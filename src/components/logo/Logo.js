import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 155 }}
        style={{ height: '150px', width: '150px' }}
      >
        <div>
          <div className="Tilt-inner pa3">
            <img style={{ paddingTop: '6px' }} alt="logo" src={logo} />{' '}
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
