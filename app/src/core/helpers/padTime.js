const padTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export default padTime;
