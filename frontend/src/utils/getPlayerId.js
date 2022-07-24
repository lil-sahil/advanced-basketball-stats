export const getPlayerId = async (dataResponse) => {
  return dataResponse === "fail" ? 0 : dataResponse["PERSON_ID"].toString();
};
