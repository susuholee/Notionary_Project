import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const CreateHeart = async ({ uid, post_id }) => {
  const { data } = await axios.post(`${API_URL}/main/heart`, {
    uid, post_id
  });
  console.log("좋아요 추가 및 조회 응답 데이터:", data);
  return data;
}

const GetHeartUser = async (post_id) => {
  const { data } = await axios.get(`${API_URL}/main/heart/${post_id}`)
  console.log("좋아요 유저 조회 응답",data)
  return data
}

const DeleteHeart = async ({ uid, post_id }) => {
  const {data} = await axios.delete(`${API_URL}/main/heartDelete`, {
     data: { uid, post_id }
  });
  console.log("좋아요 취소 API 응답 :", data)
  return data;
}


export {CreateHeart, GetHeartUser,DeleteHeart}