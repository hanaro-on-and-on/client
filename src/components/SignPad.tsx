import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

type Prop = {
  submit: () => void;
};
const SignPad = forwardRef(
  ({ submit }: Prop, ref: ForwardedRef<SignPadHandler>) => {
    const canvasRef = useRef<any>(null);

    const handle = {
      canvasRef: canvasRef,
    };

    useImperativeHandle(ref, () => handle);

    const clearSign = () => {
      if (canvasRef.current) canvasRef.current.clear();
    };

    return (
      <div className='flex flex-col gap-2'>
        <SignatureCanvas
          ref={canvasRef}
          canvasProps={{
            className: 'signature-canvas',
            width: '320px',
            height: 230,
          }}
          clearOnResize={false}
          backgroundColor='#e9ecef'
        />
        <div className='flex justify-between gap-1'>
          <button
            className='bg-gray-300 rounded-lg w-full py-3'
            onClick={clearSign}
          >
            clear
          </button>
          <button
            className='bg-hanaLightGreen rounded-lg w-full py-3 text-white'
            onClick={submit}
          >
            submit
          </button>
        </div>
      </div>
    );
  }
);

SignPad.displayName = 'SignPad';

export default SignPad;
