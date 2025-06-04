const { Heart, User} = require('../../models/config')


const CreateHeart = async ({ post_id, uid }) => {
  try {
    const data = await Heart.create({ post_id, uid });
    return { state: 200, message: "좋아요 성공", data };
  } catch (error) {
    return { state: 500, message: "좋아요 실패!!", error};
  }
};


// (async () => {
//   const result = await CreateHeart({
//     uid: 'suho123',
//     post_id: 14
//   });
//   console.log('CreateHeart 결과', result);
// })();





const GetHeartsUser = async (post_id) => {
  try {
    const data  = await Heart.findAll({
      where: { post_id },
      include: [{ model: User, attributes: ['nick', 'profImg'] }]
    });

    return {state : 200, message : "좋아요한 유저 조회" , data}
  } catch (error) {
    return {state : 500, message : "좋아요한 유저 조회 실패" , error}
  }
};

// (async () => {
//   const result = await GetHeartsUser(14)
//   console.log('GetHeartsUser 결과', result);
// })();



// 좋아요 취소
const DeleteHeart = async({post_id, uid}) => {
    try {
        const data = await Heart.destroy({
                where : {post_id : post_id, uid : uid}
        })
        return {state : 200, message : "좋아요 취소", data}
    } catch (error) {
        return {state : 404, message : "좋아요 취소 실패!!", error}
    }
}

// (async () => {
//   const result = await DeleteHeart({
//     post_id : 8,
//     uid: 'suho123'
//   });
//   console.log('DeleteHeart 결과', result);
// })();


module.exports =  {CreateHeart, GetHeartsUser, DeleteHeart}

