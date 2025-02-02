import React, { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import { CardWrapper, UserInfoWrapper, UserProblemInfo } from './style';
import { getAllUsers } from 'api/user';
import UserCard from './UserCard';
import RandomProblemCard from './RandomProblemCard';
import ProblemCard from './ProblemCard';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Layout from 'layouts/Layout';
import LeftTime from 'components/LeftTime';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';

/**
 * 사용자 탭 내용 컴포넌트
 */
function Users() {
  // 모든 사용자 정보 조회
  const [users] = useFetch(getAllUsers, []);
  const [sortedUsers, setSortedUsers] = useState([]);
  // 하단 문제 정보 펼칠지 여부
  const [showProblemsId, setShowProblemsId] = useState({});
  const loginUser = useSelector((state) => state.user);

  const toggleShowProblemsId = (key) => {
    setShowProblemsId((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const tmpUsers = [...users].sort(
      (a, b) =>
        parseInt(b.todaySolvedProblemCount) -
        parseInt(a.todaySolvedProblemCount),
    );
    // 배열 맨 앞에 로그인한 사용자가 오도록 수정
    const loginUserIdx = tmpUsers.findIndex(
      (user) => user.bojHandle == loginUser.bojHandle,
    );
    const tmpLoginUser = { ...tmpUsers[loginUserIdx] };
    tmpUsers.splice(loginUserIdx, 1);
    tmpUsers.unshift(tmpLoginUser);
    setSortedUsers(tmpUsers);
  }, [users]);

  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>스터디원</CommonTitle>
        <LeftTime />
      </CommonFlexWrapper>
      <UserInfoWrapper>
        {sortedUsers &&
          sortedUsers.map((user) => {
            if (!isEmpty(user)) {
              return (
                <CardWrapper key={user.notionId}>
                  <UserProblemInfo>
                    <UserCard
                      user={user}
                      toggleShowProblemsId={toggleShowProblemsId}
                      showProblemsId={showProblemsId}
                    />
                    {showProblemsId[user.notionId] && (
                      <>
                        <RandomProblemCard user={user} />
                        <ProblemCard user={user} />
                      </>
                    )}
                  </UserProblemInfo>
                </CardWrapper>
              );
            }
          })}
      </UserInfoWrapper>
    </div>
  );
}

export default Users;
