// import Spline from '@splinetool/react-spline';
import './Intro.css';

export default function Intro() {
  return (
    <section>
        <div className="introbody">
            <div className='introhead'>
                <h1 className='introheadh1'>Explore Your Virtual Possibilities!</h1>
                <p className='introheadp'>Arkerium is a purpose-built utility token that can now be used in various ways across the decentralized ecosystem.</p>
            </div>
            {/* <Spline scene={process.env.PUBLIC_URL+'/3d/scene.splinecode'} className='intro3d'/> */}
            {/* <Spline scene='https://prod.spline.design/i16LWyh0m15r-uDS/scene.splinecode' className='intro3d'/> */}
            <img className='introImg' src={process.env.PUBLIC_URL+'/logo/introIcon1.png'} alt='img_not_found'/>
        </div>
    </section>
  );
}