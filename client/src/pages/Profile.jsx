import React from "react";
import { useSelector } from "react-redux";

function Profile() {
    const {currentUser,isAuthenticated} = useSelector((state)=>state.user)
    // console.log(currentUser.data.data.user);
    
  return (
    <div className="">
      <div className="w-1/2 mx-auto bg-slate-500 h-screen">
        <div className="flex items-center justify-center h-full gap-20"> 
            <div>
                <img className="w-[150px] h-[150px] rounded-full" src={currentUser.data.data.user.image} alt="" />
                
            </div>
            <div>
                <p>Name: <span className="capitalize">{currentUser.data.data.user.name}</span></p>
                <p>Email: <span className="capitalize">{currentUser.data.data.user.email}</span></p>
                <p>Phone: <span className="capitalize">{currentUser.data.data.user.phone}</span></p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
