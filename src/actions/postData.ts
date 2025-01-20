"use server";

export const createCompany = async (formdata: FormData) => {
  const formObject = Object.fromEntries(formdata.entries());

  console.log(formObject);
};

export const createVacancy = async (formdata: FormData) => {
  const formObject = Object.fromEntries(formdata.entries());

  console.log(formObject);
};
