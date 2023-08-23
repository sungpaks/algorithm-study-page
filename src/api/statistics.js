import axios from 'axios';

const PREFIX_URL = '/api/v1/stat';

/**
 * 모든 유저의 난이도 별 문제 풀이 현황을 조회한다.
 */
export function getUserSolvedStat() {
  return axios.get(`${PREFIX_URL}/graph/solved`);
}

/**
 * 모든 유저의 포인트 현황을 조회한다.
 */
export function getUserPointStat() {
  return axios.get(`${PREFIX_URL}/graph/point`);
}