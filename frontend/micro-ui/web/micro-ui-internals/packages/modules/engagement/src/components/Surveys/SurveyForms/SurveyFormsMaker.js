import React, { useEffect, useReducer } from "react";
import NewSurveyForm from "./NewSurveyForm";

const defaultFormsConfig = {
  question: "",
  answerType: "Short Answer",
  required: false,
  options: [],
};

const initialSurveyFormState = [defaultFormsConfig];

const surveyFormReducer = (state, { type, payload }) => {
  switch (type) {
    case "addNewForm":
      const newSurveyQues = [...state, defaultFormsConfig];
      //console.log("addNewForm >>>", { newSurveyQues });
      payload.setSurveyConfig("questions", newSurveyQues);
      return newSurveyQues;
    case "updateForm":
      const updatedSurveyQues = [...state];
      //console.log("updateForm >>>", { updatedSurveyQues });
      updatedSurveyQues.splice(payload.index, 1, payload);
      payload.setSurveyConfig("questions", updatedSurveyQues);
      return updatedSurveyQues;
    case "removeForm":
      if (state.length === 1) return state;
      const copyOfSate = [...state];
      copyOfSate.splice(payload.index, 1);
      //console.log("removeForm After>>>", { copyOfSate, payload });
      payload.setSurveyConfig("questions", copyOfSate);
      return copyOfSate;
  }
};

const SurveyFormsMaker = ({ t, formsConfig, setSurveyConfig, disableInputs }) => {
  const [surveyState, dispatch] = useReducer(surveyFormReducer, formsConfig ? formsConfig : initialSurveyFormState);

  const passingSurveyConfigInDispatch = ({ type, payload }) => {
    dispatch({ type, payload: { ...payload, setSurveyConfig } });
  };

  const renderPreviewForms = () => {
    return surveyState.length
      ? surveyState.map((config, index) => (
          <NewSurveyForm key={index} {...config} t={t} index={index} disableInputs={disableInputs} dispatch={passingSurveyConfigInDispatch} />
        ))
      : null;
  };

  return (
    <div className="surveyformslist_wrapper">
      <div className="heading">{t("CS_SURVEYS_QUESTIONS")}</div>
      {renderPreviewForms()}
      <div className="pointer">
        <button
          className={`unstyled-button link ${disableInputs ? "disabled-btn" : ""} `}
          type="button"
          onClick={() => passingSurveyConfigInDispatch({ type: "addNewForm" })}
        >
          {t("CS_COMMON_ADD_QUESTION")}
        </button>
      </div>
    </div>
  );
};

export default SurveyFormsMaker;
