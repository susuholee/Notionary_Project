require("dotenv").config({ path: "../.env" });
const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const User = require("./user");
const Team = require("./team");
const Post = require("./post");
const Comment = require("./comment");
const Category = require("./category");
const Heart = require("./heart");
const MyProject = require("./myproject");
const TeamProject = require("./teamproject");
const Workspace = require("./workspace");
const Workspacectgrs = require("./workspace.ctgrs");
const Page = require("./page");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  }
);

// 모델 init
const page = Page.init(sequelize);
const workspacectgrs = Workspacectgrs.init(sequelize);
const workspace = Workspace.init(sequelize);
const user = User.init(sequelize);
const team = Team.init(sequelize);
const post = Post.init(sequelize);
const comment = Comment.init(sequelize);
const category = Category.init(sequelize);
const heart = Heart.init(sequelize);
const myproject = MyProject.init(sequelize);
const teamproject = TeamProject.init(sequelize);

// 모델 등록
const db = {
  Page: page,
  Workspacectgrs: workspacectgrs,
  Workspace: workspace,
  User: user,
  Team: team,
  Post: post,
  Comment: comment,
  Category: category,
  Heart: heart,
  MyProject: myproject,
  TeamProject: teamproject,
  sequelize,
};

// 관계 설정
workspacectgrs.associate(db);
workspace.associate(db);
page.associate(db);
user.associate(db);
team.associate(db);
post.associate(db);
comment.associate(db);
category.associate(db);
heart.associate(db);
myproject.associate(db);
teamproject.associate(db);

// 워크스페이스 초기 데이터
const datainit = async () => {
  const data = ["개인 워크스페이스"];
  await Promise.all(
    data.map((el) =>
      Workspace.findOrCreate({
        where: { workspace_name: el },
      })
    )
  );
  console.log("✅ 워크스페이스 초기화 완료");
};

// 카테고리 초기 데이터
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const categoryData = [
  [1, "IT", 1, null], [2, "디자인", 1, null], [3, "교육", 1, null],
  [4, "금융", 1, null], [5, "취미", 1, null], [6, "기타", 1, null],
  [7, "프로그래밍", 2, 1], [8, "인공지능", 2, 1], [9, "클라우드", 2, 1],
  [10, "사물인터넷", 2, 1], [11, "게임", 2, 1], [12, "네트워크", 2, 1],
  [13, "보안", 2, 1], [14, "기타", 2, 1],
  [15, "UI/UX", 2, 2], [16, "그래픽디자인", 2, 2], [17, "건축디자인", 2, 2],
  [18, "공간디자인", 2, 2], [19, "기타", 2, 2],
  [20, "예체능", 2, 3], [21, "공학", 2, 3], [22, "의학", 2, 3],
  [23, "법학", 2, 3], [24, "인문학", 2, 3], [25, "사회과학", 2, 3],
  [26, "자연과학", 2, 3], [27, "기타", 2, 3],
  [28, "주식투자", 2, 4], [29, "가상화폐", 2, 4], [30, "부동산", 2, 4],
  [31, "재테크", 2, 4], [32, "기타", 2, 4],
  [33, "여행", 2, 5], [34, "스포츠/액티비티", 2, 5], [35, "예술/공예", 2, 5],
  [36, "독서/글쓰기", 2, 5], [37, "요리/음식", 2, 5],
  [38, "음악", 2, 5], [39, "게임", 2, 5], [40, "자연/힐링", 2, 5],
];

async function insertCategoryData() {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("데이터베이스에 연결되었습니다.");

    const insertQuery = `
      INSERT INTO category (category_id, category_name, depth, category_id_fk) 
      VALUES ?
    `;
    const [result] = await connection.query(insertQuery, [categoryData]);

    console.log(
      `성공적으로 ${result.affectedRows}개의 카테고리 데이터가 삽입되었습니다.`
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log(" 중복된 카테고리 데이터가 있습니다.");
    } else {
      console.error(" 카테고리 삽입 오류:", error.message);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log("데이터베이스 연결이 종료되었습니다.");
    }
  }
}

// 테이블 생성 후 초기화 실행
sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("시퀄라이즈 연결 성공");
    await datainit();
    await insertCategoryData();
  })
  .catch(console.log);

module.exports = db;
