// *
// GET : 픽업 가게 목록 불러오기
// 보내는 정보는 없고, 받는 데이터만 존재하는데,
// 주문하기와 동일한 형식(Array)에서 주문 개수만 추가.
// *
const pickup_list = [
  {
    sequence: 0,
    name: 'string',
    image: 'string',
    businessTimes: [
      {
        dayOfWeek: 'string',
        startTime: 'string',
        endTime: 'string',
      },
    ],
    pickupCnt: Number, // 주문 현황 개수
  },
];

// *
// GET : 픽업 가게 상세 정보 불러오기
// 주문하기에서처럼 쿼리로 가게 sequence 같이 보낼 것.
// ex. localhost:3001/pickup/store/detail?seqeunce={33}
// 메뉴 제거 => 주문현황 추가
// *
const pickup_store_detail = {
  name: 'string',
  telephone: 'string',
  storeSequence: 0,
  storeImage: 'string',
  businessTimes: [
    {
      dayOfWeek: 'string',
      startTime: 'string',
      endTime: 'string',
    },
  ],
  locationLating: {
    lat: 'string',
    long: 'string',
  },
  pickupList: [
    {
      req_sequence: Number, // sequence
      req_dest: 'string', // 소프트웨어관 303호
      req_time: 'string', // 시간 형식 편한데로 보내면 맞춤.
      req_price: Number, // 8900
    },
  ],
};

// *
// GET : 픽업 가게 -> 픽업 주문 상세 정보 불러오기
// 가게 상세정보처럼 쿼리로 주문의 sequence 같이 보낼 것.
// ex. localhost:3001/pickup/store/detail/order_detail?seqeunce={33}
// *
const pickup_order_detail = {
  locationLating: {
    lat: 'string',
    long: 'string',
  },
  reqSequence: Number, // sequence
  reqDest: 'string', // 소프트웨어관 303호
  reqTime: 'string', // 시간 형식 편한데로 보내면 맞춤.
  reqPrice: Number, // 8900
  reqDetail: 'string', // 배달 안전하게 오세요 등

  priceInfo: {
    menuPrice: Number, // 16900
    deliveryFee: Number, // 1200
  },
  menus: [
    {
      menuId: 0,
      menuName: 'string',
      menuOptions: {
        icehot: 'string',
        cnt: 0,
        shots: 0,
      },
      menuPrice: 0, // 개수까지 계산된 최종 가격
    },
  ],
};

// *
// POST : 픽업 주문 수락하기
// *
// 보내는 데이터
const request_body = {
  pickup_id: Number, // 앞서 받아온 reqSequence 봰ㄹ 것.
};
// 받는 데이터 message 정도?
// 200번 받으면 주문 수락
// 나머지는 주문 수락 실패로 처리
const response_data = {
  message: 'success',
};

// *
// GET : 내가 픽업한 주문,
// 동일 가게 최대 2개, 내가 주문한 목록에서 이름만 바꿔쓰면 될 듯.
// *
const my_pickup_list = [
  {
    reqAddress: {
      address: 'string',
      detail: 'string',
    },
    reqTimeout: '19 : 20',
    totalPrice: 0,
    reqSequence: 'string',
  },
];

// *
// POST : 픽업 수락 취소
// 음.. 이거 원래 주문 수락 5분 안에만 가능한건데
// 시간 정보도 필요하면 카톡으로 알려줘
// *
// 보내는 데이터
const req_body = {
  pickupSeq: Number,
};
// 받는 데이터
// 200번 받으면 주문 수락 취소
// 나머지 주문 수락 취소 실패, 사유
const res_data = {
  message: 'success', // or "주문 수락 후 5분 지났다 등"
};

// *
// GET : 주문 상태 확인,
// 쿼리로 reqSequence 같이 보낼 것임.
// 앞에 구현했던 픽업 주문 상세 정보 + 현재 픽업 현황 추가
// *
const pickup_order_detail_state = {
  pickupState: 'delivery', // 배달중, 배달완료 확인중(pending), 배달 완료(fulfilled)
  locationLating: {
    lat: 'string',
    long: 'string',
  },
  reqSequence: Number, // sequence
  reqDest: 'string', // 소프트웨어관 303호
  reqTime: 'string', // 시간 형식 편한데로 보내면 맞춤.
  reqPrice: Number, // 8900
  reqDetail: 'string', // 배달 안전하게 오세요 등

  priceInfo: {
    menuPrice: Number, // 16900
    deliveryFee: Number, // 1200
  },
  menus: [
    {
      menuId: 0,
      menuName: 'string',
      menuOptions: {
        icehot: 'string',
        cnt: 0,
        shots: 0,
      },
      menuPrice: 0, // 개수까지 계산된 최종 가격
    },
  ],
};

// *
// POST : 주문 완료하기
// 내가 진행중인 픽업 -> 주문 상세 -> 배달 완료 요청
// *
const req = {
  reqSequence: 'string',
};
const res = {
  pickupState: 'delivery', // 배달중, 배달완료 확인중(pending), 배달 완료(fulfilled)
};
