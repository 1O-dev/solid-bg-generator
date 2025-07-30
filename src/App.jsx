import { useEffect, useRef, useState } from "react";
import { MdFileDownload } from "react-icons/md";

function App() {
  const [color,setColor] = useState("#eeeeee")
  const [selectedI,setSelectedI] = useState(2)
  
  const aspictRatios = [
    { id: 0, ratio: '1:1', width: 400, height: 400, label: 'Square' },
    { id: 1, ratio: '4:3', width: 400, height: 300, label: 'Standard' },
    { id: 2, ratio: '3:2', width: 400, height: 267, label: 'Classic' },
    { id: 3, ratio: '16:10', width: 400, height: 250, label: 'Widescreen' },
    { id: 4, ratio: '16:9', width: 400, height: 225, label: 'Video' },
    { id: 5, ratio: '21:9', width: 400, height: 171, label: 'Ultrawide' }

  ]
  const mainCanvasRef = useRef(null)

  useEffect(()=>{
    const mainCanvas = mainCanvasRef.current
    const ctx = mainCanvas.getContext("2d")
    ctx.fillStyle = color
    ctx.fillRect(0,0,mainCanvas.width,mainCanvas.height)
  },[selectedI,color])

  const handleDownload = ()=>{
    const Canvas = document.querySelector("canvas");
    if (!Canvas) return;
    const pngEX = Canvas.toDataURL("image/png").replace(
      "image/png",
      "image/octet-stream"
    );
    const link = document.createElement("a");
    link.href = pngEX;
    link.download = `${color}-bg.png`;
    link.click();
  }

  return (
     <div className="flex justify-around items-center h-screen">
      <div className="h-100 w-100 border-2 rounded-2xl rounded-tl-none relative grid place-items-center">
        <p className="top-[-15px] absolute bg-blue-950 left-1 px-1">Preview</p>
        <canvas ref={mainCanvasRef} height={aspictRatios[selectedI].height} width={aspictRatios[selectedI].width} className="scale-85 rounded-md"></canvas>
      </div>
       
       
             <main className="bg-neutral-300 h-100 w-100 rounded-2xl grid grid-row  -2 text-black ">
                 <div className="p-2 flex justify-around items-center">
                     <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className=" size-20"/>
                     <input className="font-mono text-4xl w-40 " value={color} type="text" onChange={(e)=>setColor(e.target.value)} />
                 </div>
                 <div className="px-4 py-2 grid-cols-2 grid gap-2">
                     {aspictRatios.map((elem,i)=>(
                         <div key={i} className={`px-4 py-2  text-xl flex justify-center items-center rounded-md transition-all ${i === selectedI ? "bg-neutral-500" : "bg-neutral-800 text-amber-50"}`} onClick={()=>setSelectedI(i)}>{elem.ratio}</div>
                     ))}
                     <button className="col-span-2 row-span-2 bg-emerald-600 rounded-lg text-lg flex justify-center  gap-2 items-center" onClick={handleDownload}>Download<MdFileDownload className="size-6"/></button>
                 </div>
             </main>
     </div>
  )
}



export default App
