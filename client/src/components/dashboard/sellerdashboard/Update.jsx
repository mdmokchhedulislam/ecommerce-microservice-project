




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateBook() {
    const { id } = useParams(); // URL থেকে Book ID নিন
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        bookname: "",
        price: "",
        semister: "",
        department: "",
        description: "",
    });

    const [productImage, setProductImage] = useState(null); 
    const navigate = useNavigate();

    // 1. Fetch Existing Data for Pre-fill
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://bookcycle-qdl4.onrender.com/api/product/singleproduct/${id}`);
                console.log("response is ", res);

                const data = res?.data.data;

                console.log(data.data);


                setInputData({
                    bookname: data.bookname,
                    price: data.price,
                    semister: data.semister,
                    department: data.department,
                    description: data.description,
                    productImage: data.productImage
                });
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch book details");
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]);



    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputData({
            ...inputData,
            [name]: value,
        });
    };
    

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const validateInputs = () => {
        if (!inputData.bookname.trim()) {
            toast.error("Book name is required");
            return false;
        }
        if (!inputData.price || isNaN(inputData.price) || inputData.price <= 0) {
            toast.error("Enter a valid price");
            return false;
        }
        if (!inputData.semister) {
            toast.error("Please select a semester");
            return false;
        }
        if (!inputData.department) {
            toast.error("Please select a department");
            return false;
        }
        if (!inputData.description.trim()) {
            toast.error("Description cannot be empty");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateInputs()) return;

        const formData = new FormData();
        formData.append("bookname", inputData.bookname);
        formData.append("price", inputData.price);
        formData.append("semister", inputData.semister);
        formData.append("department", inputData.department);
        formData.append("description", inputData.description);
        if (productImage) {
            formData.append("productImage", productImage);
        }

        try {
            setLoading(true);
            const res = await axios.put(
                `https://bookcycle-qdl4.onrender.com/api/product/update/${id}`,
                formData,
                { withCredentials: true }
            );
            console.log("response data is === is ",res);
            

            if (res.status === 200) {
                setLoading(false);
                toast.success("Book updated successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update book");
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='w-[450px] my-[20px] bg-[#e5e7eb] rounded-lg text-black shadow-2xl shadow-slate-600  mx-auto p-5 flex flex-col gap-y-4  '>
                <h1 className='text-[30px] text-center font-oswald font-bold '>Update Book</h1>

                <div>
                    <label htmlFor="name">Enter your Book Name</label>
                    <input
                        type="text"
                        name="bookname"
                        value={inputData.bookname}
                        placeholder="Enter your bookname"
                        className="w-full py-1 px-3 outline-none border  rounded bg-transparent border-black"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="price">Enter your Book Price</label>
                    <input
                        type="number"
                        name="price"
                        value={inputData.price}
                        placeholder="Enter your price"
                        className="w-full py-1 px-3 outline-none border rounded bg-transparent border-black"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <select name="semister" id="semister" value={inputData.semister} onChange={handleChange} className='w-full py-1 px-3  outline-none border text-slate-500 border-black rounded bg-transparent'>
                        <option className='text-black' value="">Enter Semester</option>
                        <option value="1st">1st</option>
                        <option value="2nd">2nd</option>
                        <option value="3rd">3rd</option>
                        <option value="4th">4th</option>
                        <option value="5th">5th</option>
                        <option value="6th">6th</option>
                        <option value="7th">7th</option>
                    </select>
                </div>

                <div>
                    <select name="department" id="department" value={inputData.department} onChange={handleChange} className='w-full py-1 px-3 outline-none border text-slate-500 bg-black rounded bg-transparent border-black'>
                        <option className='text-black' value="">Enter Department</option>
                        <option value="Computer">Computer</option>
                        <option value="civil">Civil</option>
                        <option value="electrical">Electrical</option>
                        <option value="mechanical">Mechanical</option>
                        <option value="electronix">Electronix</option>
                        <option value="power">Power</option>
                        <option value="electromedical">ElectroMedical</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description">Enter Book description</label>
                    <textarea
                        name='description'
                        value={inputData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-transparent border-black"
                    ></textarea>
                </div>

                <div className='flex'>
                    <div>
                        <label htmlFor="productImage">Upload your Book image</label>
                        <input type="file" name="productImage" onChange={handleImageChange} />
                    </div>

                    <div>
                        <img className='w-[60px] h-[60px]' src={inputData.productImage} alt="" />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-black/50 hover:bg-black/75 text-white/75 hover:text-white w-full text-center  py-1 px-3 rounded-md  transition-all duration-700"
                >
                    {loading ? "Updating..." : "Update Book"}
                </button>
            </div>
        </div>
    );
}

export default UpdateBook;
