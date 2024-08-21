// src/components/Profile.jsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [negativeWords, setNegativeWords] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [exampleSentences, setExampleSentences] = useState("");
  const [categories, setCategories] = useState("");
  const [userFeedback, setUserFeedback] = useState("");

  const handleAddNegativeWord = (event) => {
    if (event.key === "Enter" && event.target.value) {
      setNegativeWords([...negativeWords, event.target.value]);
      event.target.value = "";
    }
  };

  const handleAddKeyword = (event) => {
    if (event.key === "Enter" && event.target.value) {
      setKeywords([...keywords, event.target.value]);
      event.target.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      youtubeChannel,
      negativeWords,
      keywords,
      exampleSentences,
      categories,
      userFeedback,
    };
    console.log("Form Data Submitted: ", formData);
    // Here you can add the logic to send formData to your backend or API
  };

  return (
    <div className="container">
      <h5 className="mt-5 pb-5 bold">Training Data Form</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="youtubeChannel">
          <Form.Label>YouTube Channel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter YouTube Channel URL"
            value={youtubeChannel}
            onChange={(e) => setYoutubeChannel(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="negativeWords">
          <Form.Label>Negative Words for Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add negative word and press Enter"
            onKeyDown={handleAddNegativeWord}
          />
          <div className="mt-2">
            {negativeWords.map((word, index) => (
              <span key={index} className="badge badge-danger mr-2">
                {word}
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="keywords">
          <Form.Label>Keywords for Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add keyword and press Enter"
            onKeyDown={handleAddKeyword}
          />
          <div className="mt-2">
            {keywords.map((word, index) => (
              <span key={index} className="badge badge-primary mr-2">
                {word}
              </span>
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="exampleSentences">
          <Form.Label>Example Sentences</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter example sentences for training"
            value={exampleSentences}
            onChange={(e) => setExampleSentences(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="categories">
          <Form.Label>Categories</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter categories for training"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="userFeedback">
          <Form.Label>User Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter user feedback"
            value={userFeedback}
            onChange={(e) => setUserFeedback(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
