import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddCoursePage = () => {
    const [courseName, setCourseName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [capacity, setCapacity] = useState('');
    const [credits, setCredits] = useState('');
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [term, setTerm] = useState('');
    const [year, setYear] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [prerequisites, setPrerequisites] = useState([]);
    const [selectedPrerequisite, setSelectedPrerequisite] = useState(-1);
    const [scheduleDay, setScheduleDay] = useState([]);
    const [scheduleTime, setScheduleTime] = useState([]);
    const [scheduleBuilding, setScheduleBuilding] = useState([]);
    const [scheduleRoom, setScheduleRoom] = useState([]);

  useEffect(() => {
    // Fetch data from the backend (replace URLs with your actual backend endpoints)
    const fetchData = async () => {
      try {
        const [specializationsRes, facultiesRes, prerequisitesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/get_special'),
          axios.get('http://localhost:8080/api/v1/get_employee'),
          axios.get('http://localhost:8080/api/v1/get_pre'),
        ]);

        setSpecializations(specializationsRes.data);
        setFaculties(facultiesRes.data);
        setPrerequisites(prerequisitesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
        name: courseName,
        code: courseCode,
        capacity,
        credits,
        specialization: selectedSpecialization,
        term,
        year,
        facID: selectedFaculty,
        prereq: selectedPrerequisite === -1 ? null : selectedPrerequisite,
        schedule_day: scheduleDay,
        schedule_time: scheduleTime,
        schedule_building: scheduleBuilding,
        schedule_room: scheduleRoom,
      };

    try {
      // Make a POST request to the backend to save the course
      const response = await axios.post('http://localhost:8080/api/v1/add_course', formData);

      // Handle success (e.g., redirect, show a success message)
      console.log('Course created successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error creating course:', error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Add Course</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCourseCode">
              <Form.Label>Course Code:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCredits">
              <Form.Label>Credits:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter credits"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formSpecialization">
              <Form.Label>Specialization:</Form.Label>
              <Form.Control
                as="select"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="" disabled>Select specialization</option>
                {specializations.map((specialization) => (
                  <option key={specialization.specializationId} value={specialization.specializationId}>
                    {specialization.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTerm">
              <Form.Label>Term:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Year:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFaculty">
              <Form.Label>Faculty:</Form.Label>
              <Form.Control
                as="select"
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                <option value="" disabled>Select faculty</option>
                {faculties.map((faculty) => (
                  <option key={faculty.employeeId} value={faculty.employeeId}>
                    {faculty.email}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrerequisite">
              <Form.Label>Prerequisite:</Form.Label>
              <Form.Control
                as="select"
                value={selectedPrerequisite}
                onChange={(e) => setSelectedPrerequisite(e.target.value)}
              >
                <option value={-1}>None</option>
                {prerequisites.map((prerequisite) => (
                  <option key={prerequisite.courseId} value={prerequisite.courseId}>
                    {prerequisite.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formScheduleDay">
              <Form.Label>Schedule Day:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter schedule day"
                value={scheduleDay.join(',')} // Convert array to comma-separated string for display
                onChange={(e) => setScheduleDay(e.target.value.split(','))} // Convert comma-separated string to array  
              />
            </Form.Group>

            <Form.Group controlId="formScheduleTime">
              <Form.Label>Schedule Time:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter schedule time"
                value={scheduleTime.join(',')}
                onChange={(e) => setScheduleTime(e.target.value.split(','))}
              />
            </Form.Group>

            <Form.Group controlId="formScheduleBuilding">
              <Form.Label>Schedule Building:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter schedule building"
                value={scheduleBuilding.join(',')}
                onChange={(e) => setScheduleBuilding(e.target.value.split(','))}
              />
            </Form.Group>

            <Form.Group controlId="formScheduleRoom">
              <Form.Label>Schedule Room:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter schedule room"
                value={scheduleRoom.join(',')}
                onChange={(e) => setScheduleRoom(e.target.value.split(','))}
               />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCoursePage;
