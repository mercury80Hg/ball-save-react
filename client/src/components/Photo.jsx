import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDisplay from './NavDisplay';

function Photo({ imgSource, setImgSource, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate('/login');
    }
  }, [user.email]);

  function handleCapture(target){
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setImgSource(newUrl);
      }
    }
  };

  return (
    <div className=''>
      {/* <NavDisplay /> */}

      <div className='add-input-box'>
        <label className='label' htmlFor='icon-button-file'>
     
        </label>
        {/* https://engineering.99x.io/how-to-access-the-camera-of-a-mobile-device-using-react-progressive-web-app-pwa-9d77168e5f2d */}
        <input
          accept='image/*'
          id='icon-button-file'
          type='file'
          capture='environment'
        />
      </div>
      <img src={imgSource} alt={''}></img>
    </div>
  );
}

export default Photo;
