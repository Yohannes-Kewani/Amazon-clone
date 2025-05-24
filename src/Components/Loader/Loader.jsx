import React from 'react'
import {PuffLoader} from 'react-spinners'
function Loader() {
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh"

    }}><PuffLoader /></div>
  )
}

export default Loader