import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";

function App() {
  const [color, setColor] = useState("#eeeeee");
  const [selectedI, setSelectedI] = useState(3);
  const [recent, setRecent] = useState( localStorage.getItem("recent").split(",") );

  const aspectRatios = [
    {
      id: 1,
      ratio: "1:1",
      width: 1024,
      height: 1024,
      label: "Square",
      tailwindVal: "aspect-[1/1]",
    },
    {
      id: 2,
      ratio: "4:3",
      width: 1024,
      height: 768,
      label: "Standard",
      tailwindVal: "aspect-[4/3]",
    },
    {
      id: 3,
      ratio: "3:2",
      width: 1024,
      height: 682.67,
      label: "Classic",
      tailwindVal: "aspect-[3/2]",
    },
    {
      id: 4,
      ratio: "16:10",
      width: 1024,
      height: 640,
      label: "Widescreen",
      tailwindVal: "aspect-[16/10]",
    },
    {
      id: 5,
      ratio: "16:9",
      width: 1024,
      height: 576,
      label: "Video",
      tailwindVal: "aspect-[16/9]",
    },
    {
      id: 6,
      ratio: "21:9",
      width: 1024,
      height: 438.86,
      label: "Ultrawide",
      tailwindVal: "aspect-[21/9]",
    },
  ];

  const chromas = [
    { color: "#04F404", label: "Green Chroma" },
    { color: "#0047bb", label: "Blue Chroma" },
    { color: "#FF0000", label: "Red Chroma" },
  ];

  function handleRecent() {
    [];
    if (color === recent[recent.length - 1]) return;
    if (recent.length === 7) recent.shift();

    const updatedRecent = [...recent, color];
    setRecent(updatedRecent);
  }

  useEffect(() => {
    localStorage.setItem("recent", recent.join(","));
  }, [recent]);

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
    handleRecent();
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-10">
      <h1 className="text-4xl font-bold capitalize max-md:scale-60">
        solid background Generator
      </h1>
      <div className="flex items-center justify-around w-full">
        <div className="min-h-120 w-120 border-2 rounded-2xl rounded-tl-none relative p-4  place-items-center transition-all hidden lg:grid ">
          <p className="top-[-15px] absolute bg-[#3954c0] left-1 px-1 ">
            Preview {aspectRatios[selectedI].width} X
            {aspectRatios[selectedI].height}
          </p>
          <div
            className={` myProp1 grid place-items-center w-full rounded-md  ${aspectRatios[selectedI].tailwindVal} `}
            style={{ backgroundColor: color }}
          ></div>
        </div>

        <div className="h-100 w-120 bg-white text-black rounded-2xl p-4 space-y-4  max-md:scale-80">
          <div className="flex items-center gap-x-5">
            <input
              type="text"
              className="border-2 border-black w-full h-10  rounded-md px-2 outline-0 text-black "
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              type="color"
              className="h-10 rounded-md"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className=" flex flex-1 gap-x-2">
            {chromas.map((elem, i) => (
              <button
                key={i}
                onClick={() => setColor(elem.color)}
                style={{ backgroundColor: elem.color }}
                className={`flex flex-1 rounded-md p-1 flex-col ${
                  i === 1 && "text-zinc-300"
                }`}
              >
                <span>{elem.label}</span>
                <span className="text-sm opacity-65">{elem.color}</span>
              </button>
            ))}
          </div>
          <hr className="w-20 m-auto" />

          <div className="space-y-2">
            <h1 className="text-lg">Recent</h1>
            <div className="flex gap-x-2">
              {recent.map((elem, i) => (
                <div
                  key={i}
                  onClick={() => setColor(elem)}
                  className="size-8 bg-black rounded-full border-2 border-zinc-600"
                  style={{ backgroundColor: elem }}
                  title={elem}
                ></div>
              ))}
            </div>
          </div>
          <hr className="w-20 m-auto" />

          <div>
            <div className="w-full overflow-hidden overflow-x-scroll py-2 [&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-thumb]:bg-gray-300  [&::-webkit-scrollbar-thumb]:rounded-full">
              <div className="grid grid-row-1 grid-cols-6 gap-2 w-180 ">
                {aspectRatios.map((elem, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedI(i)}
                    className={`flex flex-col items-center p-2 justify-center rounded-2xl transition-all  ${
                      i === selectedI
                        ? "shadow-none bg-neutral-200"
                        : "shadow-[inset_4px_4px_12px_#333,_inset_2px_2px_4px_#eee]"
                    } `}
                  >
                    <span>{elem.ratio}</span>

                    <span className="opacity-60 text-sm ">{elem.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="w-full h-13 rounded-md bg-emerald-500 flex items-center justify-center gap-2" onClick={handleDownload}>Download .png <MdFileDownload/></button>
        </div>
      </div>
      <h1>Made By Omar Mokhtar</h1>
    </div>
  );
}
////TODO:
//  !fix UI include responsivety
//  ?more aspcets
//  !add custom (failed)
// *cromas
// *recent colors
// *good resolotion
// *animations

export default App;
