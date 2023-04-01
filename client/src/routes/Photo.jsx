import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDisplay from '../components/NavDisplay';

function Photo({ imgSource, setImgSource, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate('/login');
    }
  }, [user.email]);

  function handleCapture(target) {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setImgSource(newUrl);
      }
    }
  }

  return (
    <div className='photo-container'>
      <NavDisplay user={user} />

      <div className='add-photo-box'>
        {/* <label className='label' htmlFor='icon-button-file'>
     
        </label> */}
        {/* https://engineering.99x.io/how-to-access-the-camera-of-a-mobile-device-using-react-progressive-web-app-pwa-9d77168e5f2d */}
        <img className='photo-capture' src={imgSource} alt={''}></img>
        <input
          accept='image/*'
          id='icon-button-file'
          type='file'
          capture='environment'
          onChange={(event) => handleCapture(event.target)}
        />

      </div>
    </div>
  );
}

export default Photo;
