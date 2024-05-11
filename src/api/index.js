import axios from 'axios';

/**
 * 결제 요청을 생성하는 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {Object} requestData - 요청 데이터
 * @param {string} requestData.amount - 결제 금액
 * @param {string} requestData.description - 결제 설명
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function createPaymentRequest(paymentMethodId, requestData, kioskToken) {
  try {
    const response = await axios.post(`/payment/${paymentMethodId}/request/`, requestData, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 요청 생성 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제 정보를 조회하는 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function getPaymentInfo(paymentMethodId, paymentId, kioskToken) {
  try {
    const response = await axios.get(`/payment/${paymentMethodId}/${paymentId}/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제를 승인하는 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {Object} approvalData - 승인 데이터
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function approvePayment(paymentMethodId, paymentId, approvalData, kioskToken) {
  try {
    const response = await axios.post(`/payment/${paymentMethodId}/${paymentId}/approve/`, approvalData, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 승인 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제를 취소하는 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function cancelPayment(paymentMethodId, paymentId, kioskToken) {
  try {
    const response = await axios.post(`/payment/${paymentMethodId}/${paymentId}/cancel/`, null, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 취소 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 대형생활폐기물 접수 API
 * @param {string} serGovId - 서비스 지자체 ID
 * @param {Object} requestData - 요청 데이터
 * @param {string} requestData.name - 고객명
 * @param {string} requestData.cellphone - 고객 휴대전화번호
 * @param {string} requestData.detailAddress - 상세주소
 * @param {Object} requestData.postcodeJson - 주소 검색 API 반환 데이터
 * @param {number} requestData.disposeLocationId - 배출동 ID
 * @param {number} requestData.registeredLocationId - 공동주택 ID
 * @param {string} requestData.paymentMethod - 결제수단
 * @param {string} requestData.paymentId - 결제원장 ID
 * @param {string} requestData.disposeMemo - 배출메모
 * @param {string} requestData.disposeDate - 배출일자
 * @param {Array<Object>} requestData.itemList - 품목리스트
 * @param {string} requestData.channel - 접수채널
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function createDisposalRequest(serGovId, requestData, kioskToken) {
  try {
    const response = await axios.post(`/zguhada/kiosk/blw/request/${serGovId}/create/`, requestData, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('대형생활폐기물 접수 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 서비스 지자체 정보 조회 API
 * @param {string} guCode - 구 코드
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function getServiceGovernmentInfo(guCode, kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/blw/service-gov/${guCode}/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('서비스 지자체 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 주소를 바탕으로 등록장소와 처리장소를 조회하는 API
 * @param {string} serGovId - 서비스 지자체 ID
 * @param {string} bCode - 법정동 코드
 * @param {string} bonbun - 본번
 * @param {string} bubun - 부번
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function getDisposeLocationByAddress(serGovId, bCode, bonbun, bubun, kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/blw/${serGovId}/disposelocation/basegeo/`, {
      params: { b_code: bCode, bonbun, bubun },
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('주소를 바탕으로 등록장소와 처리장소 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 서비스 지역에 해당하는 접수 리스트 조회 API
 * @param {string} serGovId - 서비스 지자체 ID
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function getRequestListByServiceGovernment(serGovId, kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/blw/${serGovId}/list/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('서비스 지역에 해당하는 접수 리스트 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 키오스크 정보 조회 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function getKioskInfo(kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/info/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('키오스크 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 키오스크 로그인 API
 * @param {string} username - 사용자명
 * @param {string} password - 비밀번호
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function kioskLogin(username, password) {
  try {
    const response = await axios.post(`/zguhada/kiosk/login/`, { username, password });
    return response.data;
  } catch (error) {
    console.error('키오스크 로그인 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 주소 검색 API
 * @param {string} query - 주소 검색명
 * @param {number} page - 페이지 번호
 * @param {number} size - 페이지 사이즈
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function searchAddress(query, page = 1, size = 10, kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/postcode/search/`, {
      params: { query, page, size },
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('주소 검색 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 기기에 맞는 품목 전체를 조회하는 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Array<Object>>} - 품목 전체 목록
 */
export async function getKioskProducts(kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/products/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('키오스크 제품 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 키오스크 설정 정보를 조회하는 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 설정 정보
 */
export async function getKioskServiceStatus(kioskToken) {
  try {
    const response = await axios.get(`/zguhada/kiosk/service-status/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('키오스크 설정 정보 조회 중 오류 발생:', error);
    throw error;
  }
}
