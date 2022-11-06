import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: [
    {
      sequence: 0,
      name: '1319',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210206_8%2F1612608733761KSgIs_JPEG%2F94UFLn_jq-3FzBnYnzRbGV8U.jpeg.jpg',
      orderCnt: 10,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
    {
      sequence: 1,
      name: '스타벅스 죽전단국대점',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png',
      orderCnt: 7,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
    {
      sequence: 1,
      name: '스타벅스 죽전단국대점',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png',
      orderCnt: 7,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
    {
      sequence: 1,
      name: '스타벅스 죽전단국대점',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png',
      orderCnt: 7,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
    {
      sequence: 1,
      name: '스타벅스 죽전단국대점',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png',
      orderCnt: 7,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
    {
      sequence: 1,
      name: '스타벅스 죽전단국대점',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png',
      orderCnt: 7,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
    {
      sequence: 1,
      name: '스타벅스 죽전단국대점',
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190828_93%2F1566953601239OT9MQ_PNG%2FxX7Wv642gXMoTI0DAv0hRymS.png',
      orderCnt: 7,
      businessTimes: [
        {
          dayOfWeek: '매일',
          startTime: '10:00',
          endTime: '20:00',
        },
      ],
    },
  ],
  selectedStore: {
    shopName: '1319',
    shopImg:
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f184_184&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210206_8%2F1612608733761KSgIs_JPEG%2F94UFLn_jq-3FzBnYnzRbGV8U.jpeg.jpg',
    shopAddress: '경기 용인시 수지구 죽전로144번길 15-14',
    locationLatLong: { lat: 37.3227651, long: 127.125166 },
    shopContactNumber: '031-889-1319',
    shopOpenTime_: {
      수: { open: '10:00', deadline: '22:00' },
      목: { open: '10:00', deadline: '22:00' },
      금: { open: '10:00', deadline: '22:00' },
      토: { open: '11:00', deadline: '21:00' },
      일: { open: '11:00', deadline: '22:00' },
      월: { open: '10:00', deadline: '22:00' },
      화: { open: '10:00', deadline: '22:00' },
    },
    menuLists: {
      아메리카노: {
        coffeeName: '아메리카노',
        coffeePrice: '3500',
        coffeeImgUrl:
          'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210206_161%2F1612608869392i55gh_JPEG%2FMynHWT3QhNsf7-SgHt9e9VcP.jpeg.jpg',
      },
      딸기라떼: {
        coffeeName: '딸기라떼',
        coffeePrice: '4800',
        coffeeImgUrl:
          'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220824_140%2F1661317408833vTmnb_JPEG%2Fimage.jpg',
      },
    },
    imgMenu: [
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220824_273%2F1661317300997JWLKL_JPEG%2Fimage.jpg',
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220824_169%2F1661317280716B6hsK_JPEG%2Fimage.jpg',
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220824_261%2F1661317262568MLNKg_JPEG%2Fimage.jpg',
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210206_63%2F1612608825561ADc4V_JPEG%2F7XQASyO5j1PIMFPgL7kYJIh0.jpeg.jpg',
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210206_254%2F1612609419970FhF1C_JPEG%2FggAGjq9jIClfxOnYEWxuNEwl.jpeg.jpg',
    ],
  },
  pickupList: [
    {
      pickupId: 321,
      pickupAddress: '소프트웨어관 313호',
      pickupPrice: 8900,
      pickupTime: '13:35',
    },

    {
      pickupId: 322,
      pickupAddress: '소프트웨어관 313호',
      pickupPrice: 8900,
      pickupTime: '13:35',
    },

    {
      pickupId: 323,
      pickupAddress: '소프트웨어관 313호',
      pickupPrice: 8900,
      pickupTime: '13:35',
    },
  ],
  myPickupList: [
    {
      pickupId: 321,
      pickupAddress: '소프트웨어관 313호',
      pickupPrice: 8900,
      pickupTime: '13:35',
      orderer: '주문한 사람1',
    },
    {
      pickupId: 322,
      pickupAddress: '상경관 201호',
      pickupPrice: 18900,
      pickupTime: '15:00',
      orderer: '주문한 사람2',
    },
  ],
};

export const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {},
});

export default pickupSlice.reducer;
