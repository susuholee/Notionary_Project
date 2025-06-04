// src/components/Atoms/susu/HeartUserList.jsx
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { GetHeartUser } from "../../../API/HeartAPI"; // ← 경로 확인

const HeartUserListBlock = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f3f5;
  padding: 6px 10px;
  border-radius: 16px;
  font-size: 13px;
`;

const ProfileImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

function HeartUserList({ post_id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["heartUsers", post_id],
    queryFn: () => GetHeartUser(post_id),
  });

  if (isLoading) return <div>좋아요한 유저 불러오는 중...</div>;
  if (isError) return <div>좋아요 유저 불러오기 실패</div>;

  return (
    <HeartUserListBlock>
      {data.data.map((user) => (
        <UserItem key={user.uid}>
          <ProfileImg src={user.User.profImg || "/images/default_profile.png"} />
          <span>{user.User.nick || "익명"}</span>
        </UserItem>
      ))}
    </HeartUserListBlock>
  );
}

export default HeartUserList;
