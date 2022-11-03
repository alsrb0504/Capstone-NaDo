import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/atoms/headers/header/header";

const OrderReport = () => {
    const navigate = useNavigate();

    const MoveBack = () => navigate('/order/detail');

    return (
        <div className="col-sm-4 order-report">
            <Header title="신고하기" handleClick={MoveBack}/>
        </div>
    );
};
export default OrderReport;