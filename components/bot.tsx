import Spline from '@splinetool/react-spline/next';

export default function Bot() {
  return (
  <>
    <div className='hidden sm:block select-none'>
      <Spline className='select-none'
        scene="https://prod.spline.design/9eIyi3iaEX6qYFG9/scene.splinecode" 
      />
    </div>
    <div className='sm:hidden select-none'>
      <Spline className='select-none'
        scene="https://prod.spline.design/llZLmjtoFEby-mTp/scene.splinecode" 
      />
    </div>
  </>
  );
}
