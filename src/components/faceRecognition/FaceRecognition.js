const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center">
      <img
        alt="Input file to detect face"
        src={imageUrl}
      />
    </div>
  );
};

export default FaceRecognition;
