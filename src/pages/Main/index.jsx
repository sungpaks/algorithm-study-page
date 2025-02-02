import React from 'react';
import { isEmpty } from 'lodash';
import {
  BannerCard,
  MessageContent,
  Writer,
  NoticeCard,
  ContentTitle,
  UtilWrapper,
  Util,
  UtilIcon,
  BannerInfo,
} from './style';
import moment from 'moment';
import useFetch from 'hooks/useFetch';
import { getLastComment } from 'api/item';
import { useDispatch } from 'react-redux';
import { setShowRecommendModal, setShowStoreModal } from 'redux/modal';

/**
 * 메인 화면
 */
function Main() {
  const dispatch = useDispatch();
  // 유틸 기능 목록
  const utils = [
    {
      id: 1,
      name: '문제 추천',
      iconUrl: `${process.env.PUBLIC_URL}/recommend_icon.svg`,
      clickListener: () => {
        dispatch(setShowRecommendModal(true));
      },
    },
    {
      id: 2,
      name: '상점',
      iconUrl: `${process.env.PUBLIC_URL}/store_icon.svg`,
      clickListener: () => {
        dispatch(setShowStoreModal(true));
      },
    },
  ];
  const [message] = useFetch(getLastComment, '');

  return (
    <div>
      <BannerCard>
        <BannerInfo>
          <b>좋은사람 좋은시간</b>
          <br />
          알고리즘 스터디입니다.
        </BannerInfo>
        {!isEmpty(message.notionId) && (
          <div>
            <MessageContent>"{message.message}"</MessageContent>
            <Writer>
              {message.notionId} {message.emoji},{' '}
              {moment(message.writtenDate).format('YYYY-MM-DD')}
            </Writer>
          </div>
        )}
      </BannerCard>
      <UtilWrapper>
        {utils.map((util) => (
          <Util key={util.id} onClick={util.clickListener}>
            <UtilIcon url={util.iconUrl}></UtilIcon>
            <div> {util.name} </div>
          </Util>
        ))}
      </UtilWrapper>
      <ContentTitle>공지 사항</ContentTitle>
      <NoticeCard>
        <MessageContent>
          📣 레이아웃을 변경하여 패치하였습니다. (2023-09-06)
        </MessageContent>
      </NoticeCard>
    </div>
  );
}

export default Main;
