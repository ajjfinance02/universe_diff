import React from 'react'

const Loader = () => {
  return (
    <div className="mail-loader_block" id="first" style={{marginTop:'230px'}} >
		   <center>
        {/* <Image id="main_logo_id" src="" width="70px"  /> */}
        <div className="loader" >
            <div className="loaderBar" style={{backgroundColor: 'green'}}></div>
        </div>
        <hr style={{width:'50%',textAlign:'left',marginLeft:0}} />
        <div className="loading_text">loading <span id="loader_email"></span> mail settings ...</div>
        <hr style={{width:'50%',textAlign:'left',marginLeft:0}} />
		 </center>
    </div>
  )
}

export default Loader
