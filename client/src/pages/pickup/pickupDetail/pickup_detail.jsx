import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../../components/atoms/buttons/btn/btn";
import OrderCompleteCard from "../../../components/atoms/cards/orderCompleteCard/order_complete_card";
import FormTitle from "../../../components/atoms/formTitle/form_title";
import Header from "../../../components/atoms/headers/header/header";
import FillLineInput from "../../../components/atoms/inputs/fillLineInput/fill_line_input";
import PriceBox from "../../../components/atoms/priceBox/price_box";
import StateBox from "../../../components/atoms/stateBox/state_box";
import StoreMapSection from "../../../components/molecules/storeMapSection/store_map_section";

const PickupDetail = () => {
    const navigate = useNavigate();

    const MoveBack = () => navigate('/order/waitings');

    const location = {
        lat: 37.3227651,
        long: 127.125166,
      };

    const data = {
        address: '경기 용인시 수지구 죽전로144번길 15-14',
        request_time: '14:30 까지',
        request_content: '조심히 배달해주세요',
        list: [
            {
            name: '아메리카노',
            options: ['샷 추가(+500원)'],
            cnt: 1,
            price: '3500',
            },
            {
            name: '녹차라떼',
            options: ['샷 추가(+500원)'],
            cnt: 1,
            price: '4900',
            },
        ],
        price_info: {
            order_price: 16000,
            delivery_fee: 1000,
            total_price: 17000,
        },
    };


    return (
        <div className="col-sm-4 pickup-detail">
            <Header title="픽업 주문 상세" handleClick={MoveBack} />
            <StateBox text="주문을 수락했습니다." color='blue'/>
            <div className="info">
                <section className="info-map-section">
                    <FormTitle title="배달 위치" />
                    <StoreMapSection locationLatLong={location}/>
                </section>

                <section>
                    {/* <FormTitle title="주소" /> */}
                    <FillLineInput val={data.address} />
                </section>

                <section>
                    <FormTitle title="요청 사항" />
                    <FillLineInput val={data.request_time} />

                    <FillLineInput val={data.request_content} />
                </section>

                <section className="info-list-section">
                    <FormTitle title="주문 목록" />
                    {data.list.map((coffee) => (
                    <OrderCompleteCard info={coffee} />
                    ))}
                </section>

                <PriceBox text="주문금액" price={data.price_info.total_price}/>
                
                <PriceBox text="배달팁" price={data.price_info.delivery_fee}/>
                
            </div>
            <Btn text="취소하기" color="red"/>
            <Btn text="배달 완료"/>
        </div>
    );
};
export default PickupDetail;