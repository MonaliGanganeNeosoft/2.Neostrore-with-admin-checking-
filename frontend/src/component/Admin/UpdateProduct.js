import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  // const [name, setName] = useState("");
  const [product_name, setName] = useState("");
  const [category_name, setCategoryName] = useState("");

  // const [color_name, setColoeName] = useState("");

  const [product_cost, setPrice] = useState(0);


  // const [description, setDescription] = useState("");
  const [product_desc, setDescription] = useState("");
  const [product_rating,setProductRating] = useState("");
 

  const [product_producer, setProductProducer] = useState("");

  const [product_dimension, setProductDimension] = useState("");
  const [product_material, setProductMaterial] = useState("");



  const [category, setCategory] = useState("");
  const [product_stock, setStock] = useState(0);
  // const [images, setImages] = useState([]);
  // const [oldImages, setOldImages] = useState([]);
  // const [product_image, setImages] = useState([]);

  // const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.product_name);
      setCategoryName(product.category_name);
      setProductRating(product.product_rating);
      setProductProducer(product.product_producer);
      setProductDimension(product.product_dimension);
      setProductMaterial(product.product_material);

      setDescription(product.product_desc);
      setPrice(product.product_cost);
      setCategory(product.category);
      setStock(product.product_stock);
      // setOldImages(product.product_image);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("product_name", product_name);
    myForm.set("category_name",category_name);
    // myForm.set("color_name",color_name);
    myForm.set("product_cost", product_cost);
    myForm.set("product_desc", product_desc);
    myForm.set("product_rating", product_rating);
    myForm.set("product_producer", product_producer);
    myForm.set("product_dimension", product_dimension);
    myForm.set("product_material", product_material);
    
    myForm.set("category", category);
    myForm.set("product_stock", product_stock);

    // product_image.forEach((image) => {
    //   myForm.append("product_image", image);
    // });
    dispatch(updateProduct(productId, myForm));
  };

  // const updateProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);
  //   setOldImages([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update product</h1>

            {/* <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
            <div>
              {/* <SpellcheckIcon /> */}
              <input
                type="text"
                placeholder="Product Name st"
                required
                value={product_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              
              <input
                type="text"
                placeholder="Category Name st"
                required
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            {/* <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div> */}
            <div>
              {/* <AttachMoneyIcon /> */}
              <input
                type="number"
                placeholder="Price cost no"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={product_cost}
              />
            </div>


            {/* <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div> */}
            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description st"
                value={product_desc}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              
              <input
                type="text"
                placeholder="product Rating no"
                required
                value={product_rating}
                onChange={(e) => setProductRating(e.target.value)}
              />
            </div>

            {/* <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

             <div>
              
              <input
                type="text"
                placeholder="product Producer st"
                required
                value={product_producer}
                onChange={(e) => setProductProducer(e.target.value)}
              />
            </div>
            <div>
              
              <input
                type="text"
                placeholder="product dimension st"
                required
                value={product_dimension}
                onChange={(e) => setProductDimension(e.target.value)}
              />
            </div>
            <div>
              
              <input
                type="text"
                placeholder="product material st"
                required
                value={product_material}
                onChange={(e) => setProductMaterial(e.target.value)}
              />
            </div>

            <div>
              {/* <StorageIcon /> */}
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={product_stock}
              />
            </div>

            {/* <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div> */}

            {/* <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Updated
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;