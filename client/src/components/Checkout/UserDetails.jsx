import React from "react";

function UserDetails({ handleChange, userData }) {
  return (
    <div className="w-[70%]">
      <div className="mt-[30px] w-full">
        <div className="flex gap-5">
          <div className="w-1/2">
            <label htmlFor="name">Enter your Name</label>
            <input
              type="text"
              name="name"
              value={userData?.name || ""} 
              placeholder="Enter your name"
              className="w-full py-1 px-3 outline-none border border-black rounded"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="email">Enter your Email</label>
            <input
              type="text"
              name="email"
              value={userData?.email || ""} 
              placeholder="Enter your email"
              className="w-full py-1 px-3 outline-none border border-black rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-[30px] w-full">
        <div className="flex gap-5">
          <div className="w-1/2">
            <label htmlFor="district">Enter your District </label>
            <input
              type="text"
              name="district"
              value={userData?.district || ""} 
              placeholder="Enter your District"
              className="w-full py-1 px-3 outline-none border border-black rounded"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="city">Enter your City</label>
            <input
              type="text"
              name="city"
              value={userData?.city || ""} 
              placeholder="Enter your City"
              className="w-full py-1 px-3 outline-none border border-black rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mt-[30px] w-full">
        <div className="flex gap-5">
          <div className="w-1/2">
            <label htmlFor="zip">Enter your Zipcode</label>
            <input
              type="text"
              name="zip"
              value={userData?.zip || ""} 
              placeholder="Enter your Zipcode"
              className="w-full py-1 px-3 outline-none border border-black rounded"
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="phone">Enter your Phone</label>
            <input
              type="number"
              name="phone"
              value={userData?.phone || ""} 
              placeholder="Enter your phone"
              className="w-full py-1 px-3 outline-none border border-black rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
