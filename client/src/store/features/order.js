import { createSlice } from '@reduxjs/toolkit';

import storeData from './crawling';

const initialState = {
  stores: storeData,
};

// eslint-disable-next-line import/prefer-default-export
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export default orderSlice.reducer;

/*
stores: {
    1319: {
      shopName: '1319',
      shopAddress: '경기 용인시 수지구 죽전로144번길 15-14',
      shopContactNumber: '031-889-1319',
      shopOpenTime_: {
        화: '10:00 - 22:00',
        수: '10:00 - 22:00',
        목: '10:00 - 22:00',
        금: '10:00 - 22:00',
        토: '11:00 - 21:00',
        일: '11:00 - 22:00',
        월: '10:00 - 22:00',
      },
      menuLists: {
        아메리카노: {
          coffeeName: '아메리카노',
          coffeePrice: '3,500원',
          coffeeImgUrl:
            'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210206_161%2F1612608869392i55gh_JPEG%2FMynHWT3QhNsf7-SgHt9e9VcP.jpeg.jpg',
        },
        딸기라떼: {
          coffeeName: '딸기라떼',
          coffeePrice: '4,800원',
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
    오르스커피: {
      shopName: '오르스커피',
      shopAddress: '경기 용인시 수지구 죽전로 152 (죽 전동, 단국대학교) 역사관',
      shopContactNumber: '031-262-9168',
      shopOpenTime_: { no: 'data' },
      menuLists: {},
      imgMenu: [],
    },
    새날: {
      shopName: '새날',
      shopAddress: '경기 용인시 수지구 죽전로 152',
      shopContactNumber: '031-262-9168',
      shopOpenTime_: { no: 'data' },
      menuLists: {},
      imgMenu: [],
    },
  },


*/
