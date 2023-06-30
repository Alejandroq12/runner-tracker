const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">
        {' '}
        {
          'This Smart Recognition App will detect faces in your pictures. Give it a try.'
        }{' '}
      </p>
      <div>
        <input className='f4 pa2 w-70 center' type="tex" />
        <button className='w-30 grow link ph3 pv2 dib white bg-light-purple'>Detect</button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
