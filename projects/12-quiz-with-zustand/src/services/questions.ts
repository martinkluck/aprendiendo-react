export const getAllQuestions = async () => {
  const response = await fetch('http://localhost:5173/data.json');
  const json = await response.json();
  return json;
}