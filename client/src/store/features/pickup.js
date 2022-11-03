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
};

export const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {},
});

export default pickupSlice.reducer;
