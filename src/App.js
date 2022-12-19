import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import Login from "./Login/Login";
import { Context } from "./setup/Context";
import StudentPage from "./Student/StudentPage";
import StuExamPage from "./Student/stuExam/StuExamPage";
import "./Student/stuSideBar.css";
import "./Student/stuSelectClass.css";
import "./navBar.css";
import "./login.css";
import StuInfo from "./Student/StuInfo/StuInfo";
import Navbar from "./Navbar";
import StudentHome from "./Student/StudentHome";
import "./Student/stuExam.css";
import "./Student/stuStat.css";
import "./Lecturer/lecSideBar.css";
import "./Lecturer/lecExam.css";
import "./Lecturer/lecQuestion.css";
import LecHome from "./Lecturer/LecHome";
import LecPage from "./Lecturer/LecPage";
import LecExam from "./Lecturer/lecExam/LecExam";
import ExamContent from "./Lecturer/lecExam/ExamContent";
import LecQuestion from "./Lecturer/lecQuestion/LecQuestion";
import LecStudentManage from "./Lecturer/LecStudentManage";

const app = () => {
  return (
    <Context>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="Student">
            <Route
              path="about/:sid"
              element={
                <StudentPage>
                  <StuInfo />
                </StudentPage>
              }
            />
            <Route
              exact
              path="Home"
              element={
                <StudentPage>
                  <StudentHome />
                </StudentPage>
              }
            />
            <Route
              path="Exam"
              element={
                <StudentPage>
                  <StuExamPage />
                </StudentPage>
              }
            />
          </Route>
          <Route exact path="Lecturer">
            <Route
              path="Home"
              element={
                <LecPage>
                  <LecHome />
                </LecPage>
              }
            />
            <Route
              path="Exams"
              element={
                <LecPage>
                  <LecExam />
                </LecPage>
              }
            ></Route>
            <Route
              path="Exams/Content/:eid"
              element={
                <LecPage>
                  <ExamContent />
                </LecPage>
              }
            />
            <Route
              path="Questions"
              element={
                <LecPage>
                  <LecQuestion />
                </LecPage>
              }
            ></Route>
            <Route
              path="Results"
              element={
                <LecPage>
                  <LecStudentManage />
                </LecPage>
              }
            />
          </Route>
          <Route exact path="/" element={<Login />}></Route>
        </Switch>
      </Router>
    </Context>
  );
};

export default app;
