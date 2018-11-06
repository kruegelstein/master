export const getTime = (start, end) => {
  return (end - start) / 1000;
};

export const getOpacity = (round, rollback) => {
  switch (round) {
    case 1:
      return 1;
    case 2:
      return 0.9;
    case 3:
      if (rollback) {
        return 0.9;
      }
      return 0.8;
    case 4:
      if (rollback) {
        return 0.8;
      }
      return 0.7;
    case 5:
      if (rollback) {
        return 0.7;
      }
      return 0.6;
    case 6:
      if (rollback) {
        return 0.6;
      }
      return 0.5;
    case 7:
      if (rollback) {
        return 0.5;
      }
      return 0.4;
    case 8:
      if (rollback) {
        return 0.4;
      }
      return 0.3;
    case 9:
      if (rollback) {
        return 0.3;
      }
      return 0.2;
    case 10:
      if (rollback) {
        return 0.2;
      }
      return 0.1;

    default:
      return 1;
  }
};

export const getAdaptationScore = (hits, misses) => {
  return hits - misses;
};

export const getIncentives = (round, rollback) => {
  if (!rollback) {
    return (round + 1) * 10;
  } else {
    return (round + 1) * 10 - 15;
  }
};
