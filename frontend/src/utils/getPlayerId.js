export const getPlayerId = async (dataResponse) => {
  return dataResponse["PERSON_ID"].toString();
};
