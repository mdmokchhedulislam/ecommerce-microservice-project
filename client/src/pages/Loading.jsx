import React from "react";

function Loading() {
  return (
    <div className="flex mt-[140px]  justify-center min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row space-x-4">
        

            <div
              className="w-[70px] h-[70px] rounded-full animate-spin
                    border-y-2 border-dashed border-blue-500 border-t-transparent"
            ></div>

 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
