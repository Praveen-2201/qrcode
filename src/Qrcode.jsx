import { useState } from "react"
export const Qrcode = () => {
  const[img, setImg]=useState("")
  const [loading ,setLoading]=useState(false)
  const[qrdata ,setQrdata] =useState("")
  const[qrSize ,setqrSize ] = useState("150")
 async function generateQr() {
  setLoading(true)
  try {
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`
    setImg(url)
  } catch (error) {
    console.error("ERROR GENERATING QRCODE",error)
  }finally{
    setLoading(false)
  }
 }
  function downloadQr() {
    fetch (img).then((Response)=>Response.blob()).then((blob)=>
    {
      const link=document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="Qr.png"
      document.body.appendChild(link)
      link.click()
      document.removeChild(link)
    })
  }
  return (
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>please wait...</p>}
        {img && <img src={img} alt=""  className="img"/>}
        <div>
            <label htmlFor="dataInput" className="input-lable" >
                data for Qr code
            </label>
            <input type="text"  id="dataInput" value={qrdata} 
            placeholder="enter data for Qr-code" onChange={(e)=>setQrdata(e.target.value)}/>
            <label htmlFor="sizeInput" className="input-lable">
               img size(e.g.,150):
            </label>
            <input type="text"  id="sizeInput" value={qrSize}
            placeholder="enter size for Qr-code" onChange={(e)=>setqrSize(e.target.value)}/>
        <button className="generate-button" onClick={generateQr}>
          generate Qr Code</button>
        <button className="download-button" onClick={downloadQr}>
          download Qr Code</button>
        </div>
        <p>Designed by <span>Praveen...</span></p>
    </div>
  )
}
