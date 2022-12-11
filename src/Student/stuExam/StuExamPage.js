import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../setup/Context";
import { useStudentContext } from "../studentContext";
import { getStoredExam } from "./fetchExam";
import StudentHome from "../StudentHome";
import { handleSubmit } from "./handleSubmit";
import StuExamPreview from "./StuExamPreview";
import { Link } from "react-router-dom";

const StuExamPage = () => {
  const { currentClass, ID, isTakingExam, setIsTakingExam } =
    useStudentContext();
  const { phpHandler } = useGlobalContext();
  const [examContent, setExamContent] = useState(
    getStoredExam(currentClass.ID_class, phpHandler)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswer] = useState([]);
  const [selected, setSelected] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  useEffect(() => {
    if (!isTakingExam) return;
    if (isLoading) {
      setExamContent(getStoredExam(currentClass.ID_class, phpHandler));
      setIsLoading(false);
    }
    if (!examContent) setIsLoading(true);
  }, [
    isLoading,
    setIsLoading,
    currentClass.ID_class,
    examContent,
    phpHandler,
    isTakingExam,
  ]);
  const storeAnswer = (idQuestion, question, selection, selectionContent) => {
    if (
      !answers.find((n) => {
        return n.idQuestion === idQuestion;
      })
    ) {
      setAnswer([
        ...answers,
        { idQuestion, question, selection, selectionContent },
      ]);
    } else {
      setAnswer(
        answers.map((n) => {
          if (n.id === idQuestion) return { ...n, selection, selectionContent };
          return n;
        })
      );
    }
  };
  const checkIndex = (n) => {
    if (n > examContent.length - 1) return 0;
    else if (n < 0) return examContent.length - 1;
    else return n;
  };
  if (!isLoading && isTakingExam)
    return (
      <>
        <StudentHome></StudentHome>
        <div className="question-navigate">
          {examContent.map((n, index) => {
            return (
              <span key={index} onClick={() => setCurrentQuestion(index)}>
                {index + 1}
              </span>
            );
          })}
        </div>
        {examContent.map((n, index) => {
          return (
            <div
              className={`${
                index === currentQuestion
                  ? "exam-question show-question"
                  : "hidden"
              }`}
              key={index}
            >
              {Object.values(n).map((n, index) => {
                if (index < 2)
                  return (
                    <p style={{ zIndex: "-10", opacity: 0 }} key={index}></p>
                  );
                if (index === 2)
                  return (
                    <div className="question" key={index}>
                      {n}
                    </div>
                  );
                else
                  return (
                    <div
                      className={`${
                        index === selected ? `answer selected-answer` : "answer"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelected(index);
                        storeAnswer(
                          examContent[currentQuestion].id_question,
                          examContent[currentQuestion].content,
                          index - 2,
                          n
                        );
                      }}
                    >
                      {n}
                    </div>
                  );
              })}
              <div className="stu-exam-btn-container">
                <button
                  onClick={() => {
                    setSelected(0);
                    setCurrentQuestion(checkIndex(currentQuestion + 1));
                  }}
                >
                  Next
                </button>
                <button
                  onClick={() => {
                    setSelected(0);
                    setCurrentQuestion(checkIndex(currentQuestion - 1));
                  }}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    handleSubmit(
                      answers,
                      examContent[0].id_exam,
                      currentClass.ID_class,
                      ID,
                      phpHandler
                    );
                    setIsTakingExam(false);
                    setExamContent([]);
                    setSelected(0);
                  }}
                >
                  Submit all answer
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  else if (!isTakingExam && !isLoading) {
    return <StuExamPreview answers={answers} />;
  } else
    return (
      <>
        <h1>Loading</h1>
        <h2>
          If this takes too long, click here to return to{" "}
          <Link to={"/Student/Home"}>home</Link>
        </h2>
      </>
    );
};

export default StuExamPage;
