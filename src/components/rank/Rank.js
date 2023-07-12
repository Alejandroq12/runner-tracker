const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${name}, your current entry count is...`}</div>
      <div className="white f1">{'#4'}</div>
    </div>
  );
};

export default Rank;
