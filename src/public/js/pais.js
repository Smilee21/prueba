import dotenv from 'dotenv';

if (process.env.NODE_ENV != "production") {
    dotenv.config();
}
import { IPinfoWrapper } from "node-ipinfo";
const ipinfo = new IPinfoWrapper(process.env.tokenPais);

  const localizar = function(ip) {
  ipinfo.lookupIp(ip).then((response) => {
    return response.country;
  });
}


export default localizar
