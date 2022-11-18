import React, { useEffect, useRef } from 'react';

const StoreMapSection = ({ locationLatLong, isTitle }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const location = new naver.maps.LatLng(
      locationLatLong.lat || '37.3229512',
      locationLatLong.long || '127.1279079',
    );
    const mapOptions = {
      center: location,
      zoom: 17,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // DOM 요소에 지도 삽입 (지도를 삽입할 HTML 요소의 id, 지도의 옵션 객체)
    // eslint-disable-next-line no-unused-vars
    const marker = new naver.maps.Marker({
      map,
      position: location,
    });
  }, [locationLatLong]);

  return (
    <section className="store-map-section">
      {isTitle && <h3>가게 위치</h3>}
      <div className="store-maps" ref={mapElement} />
    </section>
  );
};

export default StoreMapSection;
