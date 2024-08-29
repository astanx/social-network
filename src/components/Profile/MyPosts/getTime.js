const getTime = () => {
  const hours = new Date().getHours().toString().padStart(2, "0");
  const minutes = new Date().getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
export default getTime;
