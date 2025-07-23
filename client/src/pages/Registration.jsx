import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator"; 

function Registration() {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Get the selected file
  };

  const validateInputs = () => {
    const { name, email, password, phone } = inputData;

    if (!name.trim()) {
      toast.error("Name is required!");
      return false;
    }
    if (!email || !validator.isEmail(email)) {
      toast.error("A valid email is required!");
      return false;
    }
    if (!phone || !validator.isMobilePhone(phone)) {
      toast.error("A valid phone number is required!");
      return false;
    }
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }
    if (!image) {
      toast.error("Profile image is required!");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("phone", inputData.phone);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://bookcycle-qdl4.onrender.com/api/user/registration",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        toast.success("Registration successful!");
        navigate("/signin");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/registration.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="flex justify-center py-[50px] bg-black"
    >
      <div className="w-[350px] relative shadow-cardShadow rounded-3xl bg-white/25 mx-auto p-5 flex flex-col gap-y-5">
        <div className="bg-black text-white absolute left-0 top-0 right-0 rounded-t-3xl py-[10px]">
          <h1 className="text-4xl text-center font-oswald uppercase mb-4 font-bold underline">
            Registration
          </h1>
        </div>

        <div className="pt-[65px]">
          <label htmlFor="name">Enter your name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full py-1 px-3 outline-none border border-black rounded bg-transparent placeholder:text-black"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full py-1 px-3 outline-none border border-black rounded bg-transparent placeholder:text-black"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your valid phone number"
            className="w-full py-1 px-3 outline-none border border-black rounded bg-transparent placeholder:text-black"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full py-1 px-3 outline-none border border-black rounded bg-transparent placeholder:text-black"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="image">Upload your image</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 w-full text-center text-white py-1 px-3 rounded-md"
        >
          {loading ? "Loading ..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link
            className="text-green-700 ml-5 bg-green-100 py-1 px-2 rounded-md"
            to={"/signin"}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
