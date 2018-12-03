export default name => {
  const api = {
    key: '9be1e238',
    baseUrl: `http://www.omdbapi.com/?t=${name}&plot=full&apikey=`
  };
  return `${api.baseUrl}${api.key}`;
};