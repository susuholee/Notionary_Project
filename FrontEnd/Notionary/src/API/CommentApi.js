import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;

const CreateComment = async ({ uid, post_id, category_id, content }) => {
  const { data } = await axios.post(`${API_URL}/api/main/comment`, {
    uid, post_id, category_id, content
  });
  // console.log("API 응답 데이터:", data);
  return data;
}

const GetAllComment = async (post_id) => {
  const { data } = await axios.get(`${API_URL}/api/main/comment/${post_id}`);
  return data;
};
export {CreateComment, GetAllComment}