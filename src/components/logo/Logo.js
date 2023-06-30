import Tilt from 'react-parallax-tilt';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt>
        <div options={{ max : 15 }} style={{ height: '250px', width: 250, backgroundColor: 'darkgreen' }}>
          <h1>React Parallax Tilt 👀</h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
