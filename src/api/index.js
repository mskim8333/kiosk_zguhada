import axios from 'axios';

const apiUrl = 'https://backend-dev.soogobot.com/api';

/**
 * 결제 요청 생성 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {Object} data - 요청 데이터
 * @param {string} data.order_id - 주문 ID
 * @param {number} data.amount - 결제 금액
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} PaymentRequestResponse
 * @property {string} id - 결제 요청 ID
 * @property {string} order_id - 주문 ID
 * @property {number} amount - 결제 금액
 */
export async function createPaymentRequest(paymentMethodId, accId, accSec, data) {
  try {
    const response = await axios.post(`${apiUrl}/payment/${paymentMethodId}/request/`, data, {
      headers: { 'X-Chunil-Payment-Id': accId, 'X-Chunil-Payment-Secret': accSec }
    });
    return response.data;
  } catch (error) {
    console.error('결제 요청 생성 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제 정보 조회 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} PaymentInfoResponse
 * @property {string} id - 결제 ID
 * @property {string} status - 결제 상태
 * @property {number} amount - 결제 금액
 * @property {string} created_at - 결제 생성일시
 */
export async function getPaymentInfo(paymentMethodId, paymentId, kioskToken) {
  try {
    const response = await axios.get(`${apiUrl}/payment/${paymentMethodId}/${paymentId}/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제 승인 정보 저장 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {Object} data - 요청 데이터
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function createPaymentApprove(paymentMethodId, paymentId, accId, accSec, data) {
  try {
    const response = await axios.post(`${apiUrl}/payment/${paymentMethodId}/${paymentId}/approve/`, data, {
      headers: { 'X-Chunil-Payment-Id': accId, 'X-Chunil-Payment-Secret': accSec }
    });
    return response.data;
  } catch (error) {
    console.error('결제 승인 정보 저장 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제 취소 목록 조회 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function getPaymentCancelList(paymentMethodId, paymentId, kioskToken) {
  try {
    const response = await axios.get(`${apiUrl}/payment/${paymentMethodId}/${paymentId}/cancel/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 취소 목록 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 결제 취소 요청 API
 * @param {string} paymentMethodId - 결제 수단 ID
 * @param {string} paymentId - 결제 ID
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function createPaymentCancel(paymentMethodId, paymentId, kioskToken) {
  try {
    const response = await axios.post(`${apiUrl}/payment/${paymentMethodId}/${paymentId}/cancel/`, null, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('결제 취소 요청 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 대형생활폐기물 접수 요청 API
 * @param {number} serGovId - 서비스 지자체 ID
 * @param {Object} data - 요청 데이터
 * @param {string} data.name - 고객명
 * @param {string} data.cellphone - 고객 휴대폰번호
 * @param {string} data.detail_address - 상세주소
 * @param {Object} data.postcode_json - 주소 검색 API 반환 데이터
 * @param {number} data.dispose_location_id - 배출동 ID
 * @param {number} data.registered_location_id - 공동주택 ID
 * @param {string} data.payment_method - 결제수단
 * @param {string} data.payment_id - 결제원장 ID
 * @param {string} data.dispose_memo - 배출메모
 * @param {string} data.dispose_date - 배출일자
 * @param {Array<Object>} data.item_list - 품목리스트
 * @param {Array<string>} data.upload_images - 이미지 리스트
 * @param {string} data.channel - 접수채널
 * @param {string} data.complain_type - 민원타입
 * @param {string} data.complain_memo - 민원사유
 * @param {string} data.complain_before_image_id - 민원전 이미지 ID
 * @param {string} data.complain_after_image_id - 민원후 이미지 ID
 * @param {number} data.cash_receipt_type - 현금영수증 타입
 * @param {string} data.cash_receipt_number - 현금영수증 번호
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} LargeWasteRequestResponse
 * @property {string} id - 요청 ID
 * @property {string} dispose_no - 배출번호
 * @property {string} deposit_deadline - 입금마감일시
 * @property {string} dispose_date - 배출일자
 * @property {string} kiosk_place - 키오스크 설치 장소
 * @property {string} payment_success_at - 결제일시
 * @property {string} name - 이름
 * @property {string} cellphone - 전화번호
 * @property {number} total_price - 총 가격
 * @property {Array<string>} dispose_item_list - 배출 아이템 리스트
 */
export async function createLargeWasteRequest(serGovId, data, kioskToken) {
  try {
    const response = await axios.post(`${apiUrl}/zguhada/kiosk/blw/request/${serGovId}/create/`, data, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('대형생활폐기물 접수 요청 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 서비스 지자체 정보 조회 API
 * @param {number} guCode - 구 코드
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} ServiceGovernmentInfo
 * @property {number} id - ID
 * @property {string} name - 지자체명
 * @property {string} payment_account_id - 결제 계정 ID
 * @property {string} pg_payment_method_id - PG 결제 수단 ID
 * @property {string} payment_secret_key - 결제 시크릿 키
 * @property {Object} bank_account - 은행 계좌 정보
 * @property {number} bank_account.id - 계좌 ID
 * @property {string} bank_account.name - 계좌별칭
 * @property {string} bank_account.bank - 은행명
 * @property {string} bank_account.account_number - 계좌번호
 * @property {string} bank_account.account_holder - 예금주
 * @property {string} kiosk_payment_method_id - 키오스크 결제 수단 ID
 */
export async function getServiceGovernmentInfo(guCode, kioskToken) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/blw/service-gov/${guCode}/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('서비스 지자체 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 주소로 등록 장소와 처리 장소 조회 API
 * @param {number} serGovId - 서비스 지자체 ID
 * @param {string} bCode - 법정동 코드
 * @param {string} bonbun - 본번
 * @param {string} bubun - 부번
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} GeoToDisposeLocationResponse
 * @property {Object} registered_location - 공동주택 정보
 * @property {number} registered_location.id - ID
 * @property {string} registered_location.name - 건물명
 * @property {string} registered_location.dispose_location - 배출장소
 * @property {boolean} registered_location.week_0 - 월요일 운영 여부
 * @property {boolean} registered_location.week_1 - 화요일 운영 여부
 * @property {boolean} registered_location.week_2 - 수요일 운영 여부
 * @property {boolean} registered_location.week_3 - 목요일 운영 여부
 * @property {boolean} registered_location.week_4 - 금요일 운영 여부
 * @property {boolean} registered_location.week_5 - 토요일 운영 여부
 * @property {string} registered_location.memo - 업무 메모
 * @property {Object} dispose_location - 배출 동 정보
 * @property {number} dispose_location.id - ID
 * @property {string} dispose_location.name - 배출동 명
 */
export async function getAddressToDisposeLocation(serGovId, bCode, bonbun, bubun, kioskToken) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/blw/${serGovId}/disposelocation/basegeo/`, {
      headers: { 'kiosk-token': kioskToken },
      params: { b_code: bCode, bonbun, bubun }
    });
    return response.data;
  } catch (error) {
    console.error('주소로 등록 장소와 처리 장소 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 관리자 접수 리스트 조회 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @param {string} authorization - 인증 토큰
 * @param {number} serGovId - 서비스 지자체 ID
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} UserRequestListResponse
 * @property {string} dispose_no - 배출번호
 * @property {string} name - 신청자명
 * @property {string} cellphone - 신청자 휴대폰번호
 * @property {string} dispose_date - 배출 일자
 * @property {string} payment_success_at - 결제 완료처리 일시
 * @property {Object} request_items - 접수 상세 정보
 * @property {number} request_items.product_standard_id - 제품 표준 ID
 * @property {string} request_items.product_standard__name - 제품 표준 이름
 * @property {string} request_items.product_standard__product__name - 제품 표준 제품 이름
 * @property {number} request_items.unit_price - 단가
 * @property {number} request_items.quantity - 수량
 * @property {string} request_items.simple_status - 상태
 * @property {string} request_items.finish_at - 완료일
 * @property {string} bulk_cancelable - 대량 취소 가능 여부
 */
export async function getAdminRequestList(kioskToken, authorization, serGovId) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/blw/${serGovId}/list/`, {
      headers: { 'kiosk-token': kioskToken, 'Authorization': authorization }
    });
    return response.data;
  } catch (error) {
    console.error('관리자 접수 리스트 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 키오스크 정보 조회 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @param {string} authorization - 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} KioskInformation
 * @property {string} kiosk_place_name - 키오스크 설치 장소명
 * @property {string} kiosk_place_address - 키오스크 설치 주소
 */
export async function getKioskInformation(kioskToken, authorization) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/info/`, {
      headers: { 'kiosk-token': kioskToken, 'Authorization': authorization }
    });
    return response.data;
  } catch (error) {
    console.error('키오스크 정보 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 관리자용 주소 검색 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @param {string} query - 검색어
 * @param {number} page - 페이지 번호
 * @param {number} size - 페이지 사이즈
 * @returns {Promise<Object>} - 응답 데이터
 */
export async function searchAddress(kioskToken, query, page = 1, size = 10) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/postcode/search/`, {
      headers: { 'kiosk-token': kioskToken },
      params: { query, page, size }
    });
    return response.data;
  } catch (error) {
    console.error('관리자용 주소 검색 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 키오스크에 맞는 품목 전체 조회 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @param {string} search - 검색어
 * @param {string} ordering - 정렬 필드
 * @param {number} page - 페이지 번호
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} KioskProduct
 * @property {string} service_government_name - 서비스 지자체 이름
 * @property {number} service_government_id - 서비스 지자체 ID
 * @property {Array<Object>} categories - 카테고리 리스트
 */
export async function getKioskProducts(kioskToken, search, ordering, page) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/products/`, {
      headers: { 'kiosk-token': kioskToken },
      params: { search, ordering, page }
    });
    return response.data;
  } catch (error) {
    console.error('키오스크에 맞는 품목 전체 조회 중 오류 발생:', error);
    throw error;
  }
}

export async function getKioskProducts2(kioskToken, search, ordering, page, gid) { // eslint-disable-line no-unused-vars
  try {
    //console.log(gid);
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/products/`, {
      headers: { 'kiosk-token': kioskToken },
      params: { search, ordering, page }
    });
    const filteredData = (response.data).filter(item => item.service_government_id == gid);
    //console.log(filteredData);
    //console.log(response.data);
    //return response.data;
    return filteredData[0].categories;
  } catch (error) {
    console.error('키오스크에 맞는 품목 전체 조회 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 키오스크 설정 정보 조회 API
 * @param {string} kioskToken - 키오스크 인증 토큰
 * @returns {Promise<Object>} - 응답 데이터
 * @typedef {Object} KioskConfig
 * @property {boolean} service_on - 서비스 가능 여부
 */

export async function getKioskServiceStatus(kioskToken) {
  try {
    const response = await axios.get(`${apiUrl}/zguhada/kiosk/service-status/`, {
      headers: { 'kiosk-token': kioskToken }
    });
    return response.data;
  } catch (error) {
    console.error('키오스크 설정 정보 조회 중 오류 발생:', error);
    throw error;
  }
}


/**
 * 관리자 로그인 API
 * @param {string} username - 사용자명
 * @param {string} password - 비밀번호
 * @returns {Promise<string>} - access token
 */
export async function adminLogin(username, password, kioskToken) {
  try {
    const response = await axios.post(`${apiUrl}/zguhada/kiosk/login/`, {
      username: username,
      password: password
    }, {
      headers: {
        'kiosk-token': kioskToken,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200 && response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error('로그인에 실패하였습니다.');
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    throw error;
  }
}