import Spline from '@splinetool/react-spline/next';

export default function Bot() {
  return (
  <>
    <div className='hidden sm:block'>
      <Spline
        scene="https://prod.spline.design/9eIyi3iaEX6qYFG9/scene.splinecode" 
      />
    </div>
    <div className='sm:hidden'>
      <Spline
        scene="https://prod.spline.design/llZLmjtoFEby-mTp/scene.splinecode" 
      />
    </div>
  </>
  );
}
