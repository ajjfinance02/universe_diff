// import axios from '../../req/axios-url';
import { NextResponse } from 'next/server';
// export const runtime = 'edge';
// `https://ipwho.is/${ip}`
// import { NextApiRequest, NextApiResponse } from 'next';
const protect = process.env.PROTECT
export default async function handler (req , res) {
    try {
      let ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.connection.remoteAddress || req.socket.remoteAddress;
      let link;
      if(req.headers['host'].startsWith('localhost')) {
        //https://ipinfo.io/json
        link = `http://ip-api.com/json/`
      } else {
        link = `http://ip-api.com/json/${ip}`
      }
      const response = await fetch(link); //https://ipapi.co/json/
      let data = await response.json();
      data['proc'] = protect
      console.log('data: ', data)
      res.status(200).json(data)
    } catch (ex) {
      console.error('Error fetching data:', ex);
      // return NextResponse.json({ message: `Error Fetching from API: ${ex}` }, { status: 500 });
      res.status(500).json({message: `Error Fetching from api: ${ex}`})

    }

}

function getDeviceIP() {
  const networkInterfaces = os.networkInterfaces();
  let deviceIP = null;

  for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      for (const iface of interfaces) {
          // Skip internal (e.g., localhost) and non-IPv4 addresses
          if (iface.family === 'IPv4' && !iface.internal) {
              deviceIP = iface.address;
              break;
          }
      }
      if (deviceIP) break;
      // dest1839-ingur4738.endo-india.cam;
  }

  return deviceIP || 'IP address not found';
}