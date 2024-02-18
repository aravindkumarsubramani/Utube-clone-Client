import React, {useState} from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import SearchBar from "./SearchBar/SearchBar";
import { RiVideoAddLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Auth from "../../Pages/Auth/Auth";

// ----------------------------------------------------------------------



function Navbar({toggleDrawer, setEditCreateChanelBtn}){

  const [AuthBtn, setAuthBtn] = useState(false)
    //  const CurrentUser = null;
    
    // const CurrentUser = {
    //       result: {
    //         email: "xy50312@gmail.com",
    //         joinedOn: "2222-07-15T09:57:23.489Z",
    //       },
    //     };
    const CurrentUser=useSelector(state=>state.currentUserReducer)
    console.log(CurrentUser)
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId:
            "673096952766-qh032b5hu24omn9n8o59f23fvhd2neqr.apps.googleusercontent.com",
          scope: "email",
        });
      }
      gapi.load("client:auth2", start);
    }, []);
    const dispatch = useDispatch();
    const onSuccess = (response) => {
      const Email = response?.profileObj.email;
      console.log(Email);
      dispatch(login({ email: Email }));
    };
  
    const onFailure = (response) => {
      console.log("Failed", response);
    };


    return (
       <>
        <div className="Container_Navbar">
          <div className="Burger_Logo_Navbar">
            {/* leftside navbar */}
            <div className="burger" onClick={() => toggleDrawer()}>
              <p></p>
              <p></p>
              <p></p>
            </div>    
            <Link to={"/"} className="logo_div_Navbar">
               <img src={logo} alt="" />
               <p className="logo_title_navbar">Utube Clone</p>
            </Link>
          </div>

              {/* middle navbar */}
            <SearchBar/>

              {/* rightside navbar */}
            <RiVideoAddLine size={22} className="vid_bell_Navbar" />
            <div className="apps_Box">
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
              <p className="appBox"></p>
            </div>
            <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />

              {/* Signin Button */}
            <div className="Auth_cont_Navbar">
              { CurrentUser ? (
              <>
               <div className="Chanel_logo_App" onClick={()=>setAuthBtn(true)}>
                 <p className="fstChar_logo_App">
                 {CurrentUser?.result.name ? (
                   <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                   ) : (
                   <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                   )}
                 </p>
               </div>
              </>

              ):(
       
               <>
                <GoogleLogin
                 clientId={"673096952766-qh032b5hu24omn9n8o59f23fvhd2neqr.apps.googleusercontent.com"}
                 onSuccess={onSuccess}
                 onFailure={onFailure}
                 render={(renderProps) => (
                 <p onClick={renderProps.onClick} className="Auth_Btn">
                  {/* <p onClick={logTmp} className="Auth_Btn"> */}
                  <BiUserCircle size={22} />
                  <b>Sign in</b>
                 </p>
                 )}
                />
               </>

              )}
            </div>
        </div>
              {AuthBtn &&
                <Auth User={CurrentUser}
                setEditCreateChanelBtn={setEditCreateChanelBtn}
                setAuthBtn={setAuthBtn}/>
              }
       </>
   );
}

export default Navbar;