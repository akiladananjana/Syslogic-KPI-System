const getClearDate = (oldDate) => {
  const newDate = new Date(oldDate);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString("en-US", options);
};

console.log(
  getClearDate("Tue May 02 2024 05:30:00 GMT+0530 (India Standard Time)")
);
