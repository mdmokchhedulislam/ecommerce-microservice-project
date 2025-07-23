import React, { useEffect, useState } from "react";
import Container from "../common/Container";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NavbarData } from "../../api/navbar";
import { GiCrossMark, GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slice/userSlice";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";

function Navbar() {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const { cartItem } = useSelector((state) => state.cart);

  const [dashboard, setDashboard] = useState(false);
  const [ismenu, setIsMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard")
    ) {
      setDashboard(true);
    } else {
      setDashboard(false);
    }
  }, [location.pathname]);

  const handleLogOut = () => {
    dispatch(signOut());
    toast.success("logout Successfully")
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate()

  return (
    <>
      <header
        className={`z-50 w-full ${scrolled ? "bg-bgPrimary" : "bg-transparent"
          } transition-all duration-700 sticky ${dashboard ? "md:pl-[280px]" : ""
          } border-b shadow-sm border-slate-300 top-0 left-0 right-0`}
      >
        <Container className="pt-[23px] pb-[18px]">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to={"/"}>
              <h1 className="text-2xl font-bold">BookCycle</h1>
            </Link>

            {/* Mobile Menu Icon */}
            {ismenu ? (
              <GiCrossMark
                onClick={() => setIsMenu(false)}
                className="text-white text-2xl z-50 md:hidden"
              />
            ) : (
              <>
                <div className="flex gap-5 md:hidden">
                  <div className="relative">
                    <Link to={"/cart"}>
                      <CiShoppingCart className="text-3xl" />
                    </Link>
                    <div className="w-[25px] h-[25px] bg-red-400 rounded-full absolute -top-3 -right-2">
                      <p className="flex items-center justify-center">
                        {cartItem?.length || 0}
                      </p>
                    </div>
                  </div>

                  <GiHamburgerMenu
                    onClick={() => setIsMenu(true)}
                    className="text-slate-500 text-2xl z-50 md:hidden"
                  />
                </div>
              </>
            )}

            {/* Mobile Menu */}
            <div 
              className={`md:hidden absolute top-0 left-0 right-0 h-screen transition-all duration-500 transform ${ismenu ? "translate-x-0 bg-[#333333]/75" : "-translate-x-full"
                } z-40 flex flex-col items-center gap-5`}
            >
              {ismenu && (
                <>
                  <ul className="pt-[100px] flex flex-col gap-[30px] text-[14px] leading-[18px] text-gray">
                    {NavbarData?.map((item) => (
                      <li className="text-center" key={item.id} onClick={() => setIsMenu(false)}>
                        <NavLink
                          to={item.path}
                          className="font-onest uppercase text-white text-[14px] leading-[17px] transition-all duration-300 hover:scale-110 "
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>


                  <div className=" gap-5 flex mx-auto flex-col items-center justify-center mt-[120px] md:hidden ">
                    {/* User Profile */}
                    {currentUser?.data?.data?.user ? (
                      <img
                        onClick={() => setProfile(!profile)}
                        className="w-[40px] h-[40px] border rounded-full"
                        src={currentUser?.data?.data?.user?.image || "/default-profile.png"}
                        alt="User Profile"
                      />
                    ) : (
                      ""
                    )}

                    {!currentUser && (
                      <div className="flex gap-3">
                        <button className="bg-black hover:bg-slate-600 text-white px-3 py-1 rounded-md">
                          <Link to={"/registration"} onClick={()=>setIsMenu(false)}>SignUp</Link>
                        </button>
                        <button className="bg-black transition-all duration-400 hover:bg-slate-600 text-white px-3 py-1 rounded-md">
                          <Link to={"/signin"} onClick={()=>setIsMenu(false)}>Login</Link>
                        </button>
                      </div>
                    )}

                    {currentUser && (
                      <div
                        onClick={() => setIsMenu(false)}
                        className=" items-center justify-center text-center text-black text-[16px] font-bold font-oswald pt-1 flex flex-col gap-3"
                      >
                        <button className= "text-white font-bold rounded-full  transition-all duration-700 " onClick={handleLogOut}>Logout</button>
                      </div>
                    )}
                  </div>




                </>
              )}
            </div>














            {/* Desktop Menu */}
            <div className="hidden md:flex">
              <ul className="flex md:gap-[15px] lg:gap-[35px] md:text-[12px] lg:text-[14px] leading-[18px] text-gray">
                {NavbarData?.map((item) => (
                  <li
                    key={item.id}
                    className="transition-all duration-300 hover:scale-105 hover:text-titleColor"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        ` text-secondary md:text-[12px] uppercase font-oswald lg:text-[14px] leading-[17px] ${isActive
                          ? "text-titleColor border-b-4 border-titleColor pb-[10px]"
                          : "text-black"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile and Cart */}
            <div className=" gap-5 items-center relative hidden md:flex">
              <div className="relative">
                <Link to={"/cart"}>
                  <CiShoppingCart className="text-3xl" />
                </Link>
                <div className="w-[25px] h-[25px] bg-red-400 rounded-full absolute -top-3 -right-2">
                  <p className="flex items-center justify-center">
                    {cartItem?.length || 0}
                  </p>
                </div>
              </div>

              {/* User Profile */}
              {currentUser?.data?.data?.user ? (
                <img
                  onClick={() => setProfile(!profile)}
                  className="w-[40px] h-[40px] border rounded-full"
                  src={currentUser?.data?.data?.user?.image || "/default-profile.png"}
                  alt="User Profile"
                />
              ) : (
                ""
              )}

              {!currentUser && (
                <div className="flex gap-3">
                  <button className="bg-black hover:bg-slate-600 text-white px-3 py-1 rounded-md">
                    <Link to={"/registration"}>SignUp</Link>
                  </button>
                  <button className="bg-black transition-all duration-400 hover:bg-slate-600 text-white px-3 py-1 rounded-md">
                    <Link to={"/signin"}>Login</Link>
                  </button>
                </div>
              )}

              {profile && (
                <div
                  onClick={() => setProfile(false)}
                  className="w-[150px] h-[100px] absolute top-[58px]   rounded-b-3xl -right-5 text-center text-black text-[16px] font-bold font-oswald pt-1 flex flex-col gap-3"
                >
                  <button className="hover:text-white px-5 py-1 hover:bg-black rounded-full  transition-all duration-700 " onClick={() => navigate("/dashboard")} >Dashboard</button>
                  <button className="hover:text-white px-5 py-1 hover:bg-black rounded-full  transition-all duration-700 " onClick={handleLogOut}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

export default Navbar;
