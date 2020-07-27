export const parseDate = date => {
  const options = { month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};
