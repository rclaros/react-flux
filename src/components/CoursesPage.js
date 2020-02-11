import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { deleteCourse,loadData } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [professors, setProfessors] = useState(courseStore.getProfessors());
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadData();
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    //debugger;
    setCourses(courseStore.getCourses());
    setProfessors(courseStore.getProfessors());
  }

  return (
    <><h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} professors={professors} deleteCourse={deleteCourse} /> 
    </>
  );
}

export default CoursesPage;