export function calculateBirthdayCountdown(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  // Set the birthDate to the current year
  birthDate.setFullYear(today.getFullYear());

  // If the birthday has already passed this year, set it to next year
  if (birthDate < today) {
    birthDate.setFullYear(today.getFullYear() + 1);
  }

  // Calculate the difference in days
  const timeDifference = birthDate - today;
  const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysUntilBirthday;
}
