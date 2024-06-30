import { adsCardType } from "../types/AdsCardType";

export const setQuestionsToLocalStorage = () => {
  const exampleQuestions = [
    "What is your name?",
    "How old are you?",
    "Where are you from?",
  ];

  localStorage.setItem("questions", JSON.stringify(exampleQuestions));
};

export const getAdsFromStorage = () => {
  const data = localStorage.getItem("ads");
  if (data) {
    return JSON.parse(data) as adsCardType[];
  } else return null;
};

export const setAdsToStorage = (data: adsCardType[]) => {
  localStorage.setItem("ads", JSON.stringify(data));
};
