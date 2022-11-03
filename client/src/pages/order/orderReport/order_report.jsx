import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Btn from "../../../components/atoms/buttons/btn/btn";
import RecordCard from "../../../components/atoms/cards/recordCard/record_card";
import FormTitle from "../../../components/atoms/formTitle/form_title";
import Header from "../../../components/atoms/headers/header/header";
import LineInputContainer from "../../../components/molecules/lineInputContainer/line_input_container";

const OrderReport = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const OnSubmit = (info) => {
        console.log(info);
    };


    const navigate = useNavigate();

    const MoveBack = () => navigate('/order/detail');
    const MoveOrder = () => navigate('/order/detail')

    const data = {
        place: '소프트웨어관 313호',
        date: '21.09.08 13 : 35',
        price: '8,900',
        isOrder: true,
    };

    return (
        <div className="col-sm-4 order-report">
            <Header title="신고하기" handleClick={MoveBack}/>
            <div className="order-report-body">
                <section className="order-section">
                    <FormTitle title="신고 주문"/>
                    <RecordCard 
                    info={data}
                    handleClick={MoveOrder}
                    />
                </section>

                <form className="report-form" onSubmit={handleSubmit(OnSubmit)}>
                    <FormTitle title="신고내용"/>
                    <LineInputContainer
                        desc="신고내용을 작성해주세요"
                        id="report-info"
                        register={register}
                        errors={errors}
                    />
                    <div className="btn-complete">
                        <Btn type="submit" text="신고하기" color="red"/>
                    </div>    
                </form>
            </div>
        </div>
    );
};
export default OrderReport;