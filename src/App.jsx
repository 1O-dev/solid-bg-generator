import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";

function App() {
  const [color, setColor] = useState("#eeeeee");
  const [selectedI, setSelectedI] = useState(2);
  const [recent,setRecent] = useState(localStorage.getItem("recent").split(",") || ["#EE3","#20f","#908"])

  const aspectRatios = [
    {
      id: 0,
      ratio: "1:1",
      width: 1024,
      height: 1024,
      label: "Square",
      tailwindVal: "aspect-[1/1]",
    },
    {
      id: 1,
      ratio: "4:3",
      width: 1024,
      height: 768,
      label: "Standard",
      tailwindVal: "aspect-[4/3]",
    },
    {
      id: 2,
      ratio: "3:2",
      width: 1024,
      height: 682.67,
      label: "Classic",
      tailwindVal: "aspect-[3/2]",
    },
    {
      id: 3,
      ratio: "16:10",
      width: 1024,
      height: 640,
      label: "Widescreen",
      tailwindVal: "aspect-[16/10]",
    },
    {
      id: 4,
      ratio: "16:9",
      width: 1024,
      height: 576,
      label: "Video",
      tailwindVal: "aspect-[16/9]",
    },
    {
      id: 5,
      ratio: "21:9",
      width: 1024,
      height: 438.86,
      label: "Ultrawide",
      tailwindVal: "aspect-[21/9]",
    },
  ];


  function handleRecent(){[]
    if(color === recent[recent.length-1]) return;
    if(recent.length === 7) recent.shift()

    const updatedRecent = [...recent,color]
    setRecent(updatedRecent)
      
  }

  useEffect(()=>{localStorage.setItem("recent",recent.join())},[recent])
  

  const handleDownload = () => {
    const mainCanvas = document.createElement("canvas");
    mainCanvas.height = aspectRatios[selectedI].height;
    mainCanvas.width = aspectRatios[selectedI].width;
    const ctx = mainCanvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(
      0,
      0,
      aspectRatios[selectedI].width,
      aspectRatios[selectedI].height
    );
    if (!mainCanvas) return;
    const pngEX = mainCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngEX;
    link.download = `${aspectRatios[selectedI].ratio} ${color}-bg.png`;
    link.click();
    handleRecent()

  };

  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-10">
      <h1 className="text-4xl font-bold capitalize">solid background Generator</h1>
      <div className="flex items-center justify-around w-full">
        <div className="h-100 w-120 border-2 rounded-2xl rounded-tl-none relative p-4 grid place-items-center">
          <p className="top-[-15px] absolute bg-[#3954c0] left-1 px-1 ">Preview</p>
          <div
            className={` myProp1 grid place-items-center w-full rounded-md  ${aspectRatios[selectedI].tailwindVal} `}
            style={{ backgroundColor: color }}
          ></div>
        </div>

          <div className="h-100 w-120 bg-white text-black rounded-2xl p-4 space-y-4 ">
            <div className="flex items-center gap-x-5">
              <input type="text" className="border-2 border-black w-full h-10  rounded-md px-2 outline-0 text-black " value={color} onChange={(e)=>setColor(e.target.value)}/>
              <input type="color" className="h-10 rounded-md" value={color} onChange={(e)=>setColor(e.target.value)} />
            </div>

            <div className="space-y-2">
              <h1 className="text-lg">Recent</h1>
              <div className="flex gap-x-2">
                {recent.map((elem,i)=>(
                  <div key={i} onClick={()=>setColor(elem)} className="size-8 bg-black rounded-full border-2 border-zinc-600" style={{ backgroundColor: elem }} title={elem}></div>
                ))}
              </div>
            </div>

          </div>
      </div>

      <button onClick={handleDownload}> dtest</button> // to test downloads only
    </div>
  );
}
////TODO:
//  !fix UI include responsivety
//  !recent colors
//  !cromas
//  !add custom
//  ?more aspcets
// *good resolotion
// *animations

export default App;
