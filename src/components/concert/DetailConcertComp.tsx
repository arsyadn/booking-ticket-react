import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useLocation, Link, useParams } from "react-router-dom";
import { ArrConcertType } from "./CardConcert";
import axios from "axios";
import PaymentCard from "./PaymentCard";
import { useSelector } from "react-redux";

const DetailConcertComp = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const data: ArrConcertType = location.state;

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);

  // payment
  const [makePayment, setMakePayment] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);

  const { loginData } = useSelector((store: any) => store.authReducer);
  const userId = loginData?.data?.user_id;

  const handleBookTicket = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: userId,
        concert_id: parseInt(id || "0"),
      };

      setLoading(true);
      const response = await axios.post("/concerts/booking", payload);
      setBooked(true);
      setLoading(false);
      setBookingId(response.data?.data?.booking_id || null);
    } catch (error) {
      console.error("Error creating concert:", error);
      setLoading(false);
    }
  };

  const BookedComp = () => (
    <Card.Footer className="bg-white text-center py-4">
      <h5 className="text-success">Ticket Booked Successfully!</h5>
      <p className="text-muted">Please make a payment!</p>
      <Button
        variant="primary"
        className="btn w-50"
        onClick={() => setMakePayment(true)}
        disabled={loading}
      >
        {loading ? (
          <div>
            <Spinner size="sm" className="me-2" />
            Loading...
          </div>
        ) : (
          "Make Payment"
        )}
      </Button>
    </Card.Footer>
  );

  useEffect(() => {
    const handleMakePayment = async () => {
      try {
        const payload = {
          booking_id: bookingId,
        };

        setLoading(true);
        await axios.post("payments/create", payload);
        setMakePayment(false);
        setSuccessPayment(true);
      } catch (error) {
        console.error("Error creating concert:", error);
        setLoading(false);
      }
    };

    if (makePayment) {
      handleMakePayment();
    }
  }, [makePayment, bookingId]);

  return (
    <div className="mt-5">
      <h2 className="fw-bold">Detail Concert</h2>
      {successPayment ? (
        <PaymentCard title={data.name} />
      ) : (
        <Card className="shadow w-100 mt-4" style={{ margin: "10px" }}>
          <Card.Header className="bg-white">
            <h5 className="fw-bolder text-center mb-0 py-2">{data?.name}</h5>
          </Card.Header>
          <Card.Body>
            <p>Date : {data?.date}</p>
            <p>Location : {data?.location}</p>
            <p>Description : {data?.desc}</p>
            {data.isPayment && <p className="text-success">Payment Done</p>}
          </Card.Body>
          {booked ? (
            <BookedComp />
          ) : (
            <Card.Footer className="bg-white d-flex flex-column justify-content-center align-items-center py-4">
              <Link to="/" className="w-50">
                <Button variant="secondary" className="btn w-100">
                  Back
                </Button>
              </Link>
              <Button
                variant="primary"
                className="btn w-50 mt-3"
                onClick={handleBookTicket}
                disabled={loading || data.isPayment}
              >
                {loading ? (
                  <div>
                    <Spinner size="sm" className="me-2" />
                    Loading...
                  </div>
                ) : data.isPayment ? (
                  "See You at the Concert!"
                ) : (
                  "Book Ticket"
                )}
              </Button>
            </Card.Footer>
          )}
        </Card>
      )}
    </div>
  );
};

export default DetailConcertComp;
