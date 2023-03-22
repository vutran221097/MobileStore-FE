import React, { useState, useEffect } from "react";
import "./ListItem.css";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import url from "../../setup";
import { Link } from "react-router-dom";
import StringToHtml from "../DemoContent/DemoBodyContent";

const ListItem = (props) => {
  const { type, title } = props;
  const [listItem, setListItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      switch (type) {
        case "phone":
          const phoneData = await axios.get(`${url}/products`);
          if (phoneData.status === 200) {
            let phones = phoneData.data.allProduct;
            let phone = phones
              .filter((item) => {
                return (
                  (item.category !== "accessories") &
                  (item.category !== "tablet")
                );
              })
              .slice(0, 8);
            setListItem(phone);
            setLoading(false);
          }
          break;
        case "accessories":
          const accessoriesData = await axios.get(
            `${url}/products?category=accessories&sortByDate=-1`
          );
          if (accessoriesData.status === 200) {
            const accessories = accessoriesData.data.products.slice(0, 4);
            setListItem(accessories);
            setLoading(false);
          }
          break;
        case "tablet":
          const tabletData = await axios.get(
            `${url}/products?category=tablet&sortByDate=-1`
          );
          if (tabletData.status === 200) {
            const tablets = tabletData.data.products.slice(0, 4);
            setListItem(tablets);
            setLoading(false);
          }
          break;
        default:
          return;
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      setListItem([]);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="new-accessories">
      <div className="new-accessories-header-title">
        <p>{title} mới</p>
      </div>
      {loading && <h1 className="text-center">Loading . . . </h1>}
      {!listItem.length && !loading ? (
        <h1 className="text-center">Không có sản phẩm.</h1>
      ) : (
        <div className="new-accessories-content">
          {listItem.map((item) => {
            return (
              <div className="new-accessories-items" key={item._id}>
                <Link
                  to={`/product/${item._id}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Card className="new-accessories-card">
                    <Card.Img
                      className="new-accessories-image"
                      variant="top"
                      src={`${url}/uploads/${item.image}`}
                    />
                    <Card.Body>
                      <p className="new-accessories-title">{item.name}</p>
                      <p className="new-accessories-description">
                        {StringToHtml(item.description).slice(0, 50) + "..."}
                      </p>
                      <div className="new-accessories-card-footer">
                        <p className="new-accessories-price">
                          {item.price.toLocaleString("de-DE")}
                          <sup>đ</sup>
                        </p>
                        <Button variant="danger">Mua ngay</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListItem;
