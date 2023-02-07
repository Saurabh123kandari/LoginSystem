import axios from 'axios';

export const fetchingLocation = async (lat, long) => {
  const res = await axios({
    method: 'get',
    url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat}%2C${long}&lang=en-US&apikey=QX0ITXavAU7kaTrg58ndBA3TPUHRPG826PYokOslnZ0`,
  });
  return res;
};
