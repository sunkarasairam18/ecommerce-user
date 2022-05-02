import React from "react";
import "./style.css";
import box from '../../images/box.png';
import pin from '../../images/pin.png';
import shield from '../../images/shield.png';
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="account">
      <div className="abox">
        <div className="abtitle">
          <div>Your Account</div>
        </div>
        <div className="aboptions">
          <div className="aboptboxs">
            <div className="adoptbox" onClick={()=>navigate("/account/orders")}>
              <div className="boximg">
                  <img src={box} alt="orders" style={{height:"40px",width:"40px"}}/>
              </div>
              <div className="boxinfo">
                <div className="boxhead">Your Orders</div>
                <div className="boxcontent">Orders,Not yet shippped etc.</div>
              </div>
            </div>
            <div className="adoptbox" onClick={()=>navigate("/account/editlogin")}>
              <div className="boximg">
                <img src={shield} alt="orders" style={{height:"40px",width:"40px"}}/>
              </div>
              <div className="boxinfo">
                <div className="boxhead">{"Login & Security"}</div>
                <div className="boxcontent">Edit Name,Mobile number etc.</div>
              </div>
            </div>
            <div className="adoptbox" onClick={()=>navigate("/account/editaddresses")}>
                <div className="boximg">
                    <img src={pin} alt="orders" style={{height:"35px",width:"35px"}}/>
                </div>
                <div className="boxinfo">
                    <div className="boxhead">Your Addresses</div>
                    <div className="boxcontent">Edit addresses for orders</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
