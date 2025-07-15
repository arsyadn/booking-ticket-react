import axios from "axios";
import React, { Fragment, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const DetailCreateConcert = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/concerts/create", formData);
      setSuccess(true);
      console.log("Concert created successfully:", response.data);

      setLoading(false);
    } catch (error) {
      console.error("Error creating concert:", error);
      setLoading(false);
    }
  };

  const SuccessComp = () => {
    return (
      <Fragment>
        <div className="text-center py-4 mt-4 bg-success text-white rounded shadow">
          <h5>Concert Created Successfully!</h5>
          <Link to="/" className="btn w-50">
            <Button variant="outline-light" className="w-100">
              Go to Home
            </Button>
          </Link>
        </div>
      </Fragment>
    );
  };
  return success ? (
    <SuccessComp />
  ) : (
    <Card className="shadow w-100 mt-4" style={{ margin: "10px" }}>
      <Card.Header className="bg-white">
        <h5 className="fw-bolder text-center mb-0 py-2">Create Concert</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Concert Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter concert name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Link to="/" className="me-2">
              <Button variant="secondary" className="me-2">
                Cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit" disabled={loading}>
              Create Concert
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DetailCreateConcert;
