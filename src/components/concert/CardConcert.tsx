import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export type ArrConcertType = {
  CreatedAt: string;
  DeletedAt: null | string;
  ID: number;
  UpdatedAt: string;
  date: string;
  desc: string;
  location: string;
  name: string;
  isPayment: boolean;
};

const CardConcert = () => {
  const [arrConcerts, setArrConcerts] = useState<ArrConcertType[]>([]);
  const { loginData } = useSelector((store: any) => store.authReducer);

  const userId = loginData?.data?.user_id ?? 0;
  console.log("Login Data:", userId);
  const handleGetAllConcerts = async () => {
    try {
      const response = await axios.post("/concerts", { user_id: userId });
      const newData = response.data?.data || [];
      setArrConcerts(newData);
      console.log("Concerts data:", response.data?.data);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    }
  };

  useEffect(() => {
    handleGetAllConcerts();
  }, []);
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3">
      {arrConcerts.map((data, id) => {
        return (
          <Card
            key={id}
            className="shadow"
            style={{ width: "18rem", margin: "10px" }}
          >
            <Card.Header className="bg-white">
              <h5 className="fw-bolder text-center mb-0 py-2">{data.name}</h5>
            </Card.Header>
            <Card.Body>
              <p>Location : {data.location}</p>
              {data.isPayment && <p className="text-success">Payment Done</p>}
            </Card.Body>
            <Card.Footer className="bg-white">
              <Link to={`/concert/${data.ID}`} state={data}>
                <Button variant="primary" className="btn w-100 my-2">
                  See Detail
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
};

export default CardConcert;
