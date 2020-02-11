import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";
import courseStore from "../stores/courseStore";
function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        onChange={props.onChange}
        value={props.course.title}
        error={props.errors.title}
      />
      <div className="form-group">
        <label htmlFor="author">Professor</label>
        <div className="field">
          <select
            id="professor"
            name="professorId"
            onChange={props.onChange}
            className="form-control"
            value={props.course.professorId || ""}
          >
            {courseStore.getProfessors().map((professor,key) => {
            return (
                <option key={key} value={professor.id}>{professor.name}</option>
            );
          })}
          </select>
        </div>
        {props.errors.professorId && (
          <div className="alert alert-danger">{props.errors.professorId}</div>
        )}
      </div>

      <TextInput
        id="category"
        name="category"
        label="Category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />


      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default CourseForm;