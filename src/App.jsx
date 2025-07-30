import { useState } from "react";
import { MdFileDownload } from "react-icons/md";

function App() {
  const [color,setColor] = useState("#eeeeee")
  const [selectedI,setSelectedI] = useState(2)
  
const aspectRatios = [
  { id: 0, ratio: '1:1', width: 1024, height: 1024, label: 'Square', tailwindVal: "aspect-[1/1]" },
  { id: 1, ratio: '4:3', width: 1024, height: 768, label: 'Standard', tailwindVal: "aspect-[4/3]" },
  { id: 2, ratio: '3:2', width: 1024, height: 682.67, label: 'Classic', tailwindVal: "aspect-[3/2]" },
  { id: 3, ratio: '16:10', width: 1024, height: 640, label: 'Widescreen', tailwindVal: "aspect-[16/10]" },
  { id: 4, ratio: '16:9', width: 1024, height: 576, label: 'Video', tailwindVal: "aspect-[16/9]" },
  { id: 5, ratio: '21:9', width: 1024, height: 438.86, label: 'Ultrawide', tailwindVal: "aspect-[21/9]" }
];



  const handleDownload = ()=>{
    const mainCanvas = document.createElement("canvas")
    mainCanvas.height = aspectRatios[selectedI].height
    mainCanvas.width = aspectRatios[selectedI].width
    const ctx = mainCanvas.getContext("2d")
    ctx.fillStyle = color
    ctx.fillRect(0,0,aspectRatios[selectedI].width,aspectRatios[selectedI].height)
    if (!mainCanvas) return;
    const pngEX = mainCanvas.toDataURL("image/png").replace(
      "image/png",
      "image/octet-stream"
    );
    const link = document.createElement("a");
    link.href = pngEX;
    link.download = `${aspectRatios[selectedI].ratio} ${color}-bg.png`;
    link.click();
  }

  return (
     <div className="flex justify-around items-center h-screen">
      <div className="h-100 w-100 border-2 rounded-2xl rounded-tl-none relative p-4 grid place-items-center">
        <p className="top-[-15px] absolute bg-blue-950 left-1 px-1 ">Preview</p>
        <div className={` myProp1 grid place-items-center w-full rounded-md  ${aspectRatios[selectedI].tailwindVal} `} style={{backgroundColor:color}}></div>
      </div>
       
       
             <main className="bg-neutral-300 h-100 w-100 rounded-2xl grid grid-row-2 text-black ">
                 <div className="p-2 flex justify-around items-center">
                     <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} className=" size-20"/>
                     <input className="font-mono text-4xl w-40 " value={color} type="text" onChange={(e)=>setColor(e.target.value)} />
                 </div>
                 <div className="px-4 py-2 grid-cols-2 grid gap-2">
                     {aspectRatios.map((elem,i)=>(
                         <div key={i} className={`px-4 py-2  text-xl flex justify-center items-center rounded-md transition-all ${i === selectedI ? "bg-neutral-500" : "bg-neutral-800 text-amber-50"}`} onClick={()=>setSelectedI(i)}>{elem.ratio}</div>
                     ))}
                     <button className="col-span-2 row-span-2 bg-emerald-600 rounded-lg text-lg flex justify-center  gap-2 items-center" onClick={handleDownload}>Download<MdFileDownload className="size-6"/></button>
                 </div>
             </main>
     </div>
  )
}
////TODO:
//  !fix UI
//  !recent colors
//  !cromas
//  !add custom
// *good resolotion 
// *animations 

export default App
