const sortByTimeStamp = arr => {
  arr.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  return arr;
};

export default sortByTimeStamp;
