const {
  getAllCategory,
  getSubCategory,
} = require("../controllers/category/category.controller");
const {
  CreateComment,
  getAllComment,
} = require("../controllers/comment/comment.controller");
const {
  CreateHeart,
  DeleteHeart,
  GetHeartsUser,
} = require("../controllers/heart/heart.controller");
const {
  getAllPost,
  getSubPost,
  getEtcPost,
} = require("../controllers/post/post.controller");
const cookieParser = require("cookie-parser");

const router = require("express").Router();
const axios = require("axios");

// 전체 게시글 조회 라우팅
router.get("/", async (req, res) => {
  const data = await getAllPost();
  res.json(data);
});

// 세부 카테고리 게시글 조회 라우팅
router.post("/subpost", async (req, res) => {
  const { category_name, SubCategory } = req.body;
  const data = await getSubPost(category_name, SubCategory);
  res.json(data);
});

// 기타 카테고리 게시글 조회 라우팅
router.get("/etc", async (req, res) => {
  const data = await getEtcPost();
  res.json(data);
});
// 전체 카테고리 조회 라우팅
router.get("/category", async (req, res) => {
  const data = await getAllCategory();
  res.json(data);
});

// 댓글 추가 라우팅
router.post("/comment", async (req, res) => {
  const { uid, post_id, category_id, content } = req.body;
  const data = await CreateComment({ uid, post_id, category_id, content });
  res.json(data);
});

// 게시글 댓글 조회 라우팅팅
router.get("/comment/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const data = await getAllComment(post_id);
  res.json(data);
});

// 게시글 좋아요 조회 라우팅
router.get("/heart/:post_id", async (req, res) => {
  const { post_id} = req.params;
  const data = await GetHeartsUser(post_id);
  res.json(data);
})

// 게시글 좋아요 추가 라우팅
router.post("/heart", async (req, res) => {
  const { uid, post_id } = req.body;
  const data = await CreateHeart({ uid, post_id });
  res.json(data);
});


// 게시글 좋아요 취소 라우팅
router.delete("/heartDelete", async (req, res) => {
  const { uid, post_id } = req.body;
  const data = await DeleteHeart({ uid, post_id });
  res.json(data);
});

module.exports = router;
