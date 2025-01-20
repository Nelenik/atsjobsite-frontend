"use server";

export const createData = async (formdata: FormData) => {
  const formObject = Object.fromEntries(formdata.entries());

  console.log(formObject);
};
