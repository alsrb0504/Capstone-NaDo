import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/atoms/headers/header/header";
import StateBox from "../../../components/atoms/stateBox/state_box";

const OrderDetail = () => {
    const navigate = useNavigate();

    const MoveBack = () => navigate('/order/waitings');

    return (
        <div className="col-sm-4 order-detail">
            <Header title="주문 상세" handleClick={MoveBack} />
            {/* 헤더 "결제 확인"보다는, "주문 상세"가 더 어울려서 수정함 */}
            <StateBox text="수락 대기 중..."/>
            <StateBox text="배달 완료 요청" color="blue"/>
        </div>
    );
};
export default OrderDetail;