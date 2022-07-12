import getUnixTimestamp from './getUnixTimestamp';

const isExpired = (dateInSeconds: number) => {
  const now = getUnixTimestamp();
  if (dateInSeconds < now) {
    return true;
  }

  return false;
};

export default isExpired;
