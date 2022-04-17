import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axios";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { setShowSignIn, setShowSignup } from "../../Store/reducer";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

const ProductDetailsPage = () => {
  const { productSlug, productId } = useParams();
  const [product, setProduct] = useState();
  const [route, setRoute] = useState();
  const [pic, setPic] = useState();

  const token = useSelector((state) => state.data.user.token);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (!token) {
      dispatch(setShowSignIn(true));
    } else {
    }
  };

  const buyNow = () => {
    if (!token) {
      dispatch(setShowSignIn(true));
    }
  };

  const getProductDetails = async (id) => {
    try {
      const res = await axiosInstance.get(`/product/info/${id}`);
      if (res.status === 200) {
        console.log(res.data);
        setProduct(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRoute = async (id) => {
    try {
      const res = await axiosInstance.get(`category/getroute/${id}`);
      if (res.status === 200) {
        console.log("Route : ", res.data);
        setRoute(["Home", ...res.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productSlug && productId) {
      getProductDetails(productId);
    }
  }, [productSlug, productId]);

  useEffect(() => {
    if (product) {
      setPic(product.productPictures[0].img);
      getRoute(product.category);
    }
  }, [product]);

  const generatePublicUrl = (url) => {
    return `http://localhost:3000/public/${url}`;
  };

  return (
    <div className="pdp">
      {product && (
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">
              {product.productPictures.map((thumb, index) => (
                <div
                  className="thumbnail"
                  onMouseEnter={() => setPic(thumb.img)}
                >
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                </div>
              ))}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={generatePublicUrl(pic)}
                  alt={`${product.productPictures[0].img}`}
                />
              </div>

              {/* action buttons */}
              <div className="buybuttons">
                <Button
                  variant="contained"
                  style={{
                    width: "40%",
                    padding: "12px",
                    backgroundColor: "dodgerblue",
                  }}
                  startIcon={<ShoppingCartIcon />}
                  onClick = {()=>addToCart()}
                >
                  ADD TO CART
                </Button>
                <Button
                  variant="contained"
                  style={{
                    width: "40%",
                    padding: "12px",
                    backgroundColor: "darkviolet",
                  }}
                  startIcon={<FlashOnIcon />}
                  onClick = {()=>buyNow()}
                >
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                {route &&
                  route.map((station) => (
                    <li
                      key={station}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <p>
                        {station.length > 20
                          ? station.slice(0, 20) + "..."
                          : station}
                      </p>
                      <ArrowForwardIosIcon
                        style={{
                          height: "12px",
                          width: "12px",
                          paddingLeft: "5px",
                        }}
                      />
                    </li>
                  ))}
                <li style={{ display: "flex", alignItems: "center" }}>
                  <p>
                    {product.name.length > 40
                      ? product.name.slice(0, 40) + "..."
                      : product.name}
                  </p>
                </li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <StarIcon style={{ width: "15px", height: "15px" }} />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  <CurrencyRupeeIcon />
                  {product.price.toLocaleString("en-US")}
                </span>
              </div>
              <div>
                {/* <p style={{ 
                color: '#212121', 
                fontSize: '14px',
                fontWeight: '600' 
                }}>Available Offers</p> */}
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {product.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
