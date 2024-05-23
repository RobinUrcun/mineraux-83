export const fetchAllData = async function (url, options) {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return response.json();
    }
  } catch {
    return "error";
  }
};
