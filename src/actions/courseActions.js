import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import * as professorApi from "../api/professorApi";
import actionTypes from "./actionTypes";
import courseStore from "../stores/courseStore";
export function saveCourse(course) {
  return courseApi.saveCourse(course).then(savedCourse => {
  courseStore.getProfessors().forEach(element => {
    if(savedCourse.professorId===element.id){
      savedCourse.professorName=element.name;
    }
  });
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse
    });
  });
}

export function loadData() {
  return courseApi.getCourses().then(courses => {
    professorApi.getProfessors().then(professors => {
      let new_courses = [];
      if (professors.length > 0) {
        courses.map(item => {
          let new_item = Object.assign({}, item);
          professors.map(element => {
            if (item.professorId === element.id) {
              new_item.professorName = element.name;
            }
          });
          new_courses.push(new_item);
        });
        dispatcher.dispatch({
          actionType: actionTypes.LOAD_DATA,
          courses: new_courses,
          professors
        });
      }
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}
export function loadProfesors() {
  return professorApi.getProfessors().then(professors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_PROFESSORS,
      professors: professors
    });
  });
}

export function deleteCourse(id) {
  //debugger;
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}