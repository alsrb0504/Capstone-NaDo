/* eslint-disable import/prefer-default-export */
const pos = {
  1319: {
    lat: 37.3228,
    lng: 127.1252,
  },
  새날: {
    lat: 37.323,
    lng: 127.1279,
  },
  오르스커피: {
    lat: 37.3195,
    lng: 127.1301,
  },
  '드롭탑 용인단국대점': {
    lat: 37.3212,
    lng: 127.1274,
  },
  '르호봇 죽전단국대점': {
    lat: 37.3212,
    lng: 127.1254,
  },
  '아름다운커피 단국대점': {
    lat: 37.3222,
    lng: 127.1293,
  },
  토이노리: {
    lat: 37.3228,
    lng: 127.1275,
  },
  빈투빈: {
    lat: 37.3219,
    lng: 127.1249,
  },
  아지트커피: {
    lat: 37.3227,
    lng: 127.125,
  },
};

export function GetPos(storeName) {
  const find = pos[storeName];

  if (!find) {
    return {
      lat: 37.3216,
      lng: 127.1267,
    };
  }

  return find;
}
