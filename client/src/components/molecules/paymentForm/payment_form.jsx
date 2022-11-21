/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState} from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Btn from '../../atoms/buttons/btn/btn';
import FormTitle from '../../atoms/formTitle/form_title';
import order_address from '../../../data/order_address';
import LineInputContainer from '../lineInputContainer/line_input_container';
import PaymentReceipt from '../../atoms/paymentReceipt/payment_receipt';
import { PrintPrice } from '../../../utils/text';
import { GetCurrentTime } from '../../../utils/time';
import { SwalSuccess } from '../../../utils/swal';

const PaymentForm = ({ SubmitPayment }) => {
  const { totalPrice } = useSelector((state) => state.cart);

  const [cardNumber, setCardNumber] = useState("");
  const [, setCardVali] = useState("");
  const [, setCardCve] = useState("");
  const [, setCardPasswd] = useState("");
  const [cardCheck, setCardCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: '도서관',
      order_detail: '',
      order_request: '조심히 와주세요.',
      order_time: GetCurrentTime(),
    },
  });

  const OnSubmit = (data) => {
    SubmitPayment(data);
  };

  const AddCredit = () => {
    Swal.fire({
      title: '카드 등록하기 1/4',
      text: '카드 번호 16자리를 입력해주세요.',
      input:'text',
      inputPlaceholder: ' - 없이 숫자만 입력해주세요',
      inputAttributes: {
        maxlength: 16,
      },
      showCancelButton: true,
      cancelButtonText: '취소하기',
      confirmButtonText: '다음',
      allowOutsideClick: false,
    }).then((cardnumber) => {
      if(cardnumber.isDismissed){
        return;
      }
      setCardNumber(cardnumber.value);

      Swal.fire({
        title: '카드 등록하기 2/4',
        text: '카드 유효 기간을 입력해주세요.',
        input:'text',
        inputPlaceholder: 'MMYY',
        inputAttributes: {
          maxlength: 4,
        },
        showCancelButton: true,
        cancelButtonText: '취소하기',
        confirmButtonText: '다음',
        allowOutsideClick: false,
      }).then((cardvali) => {
        if(cardvali.isDismissed){
          setCardNumber("");
          setCardCheck(false);
          return;
        }
        setCardVali(cardvali.value);

        Swal.fire({
          title: '카드 등록하기 3/4',
          text: '카드 CVE번호를 입력해주세요.',
          input:'text',
          inputPlaceholder: 'CVE 3자리를 입력해주세요.',
          inputAttributes: {
            maxlength: 3,
          },
          showCancelButton: true,
          cancelButtonText: '취소하기',
          confirmButtonText: '다음',
          allowOutsideClick: false,
        }).then((cardcve) => {
          if(cardcve.isDismissed){
            setCardNumber("");
            setCardVali("");
            setCardCheck(false);
            return;
          }
          setCardCve(cardcve.value);

          Swal.fire({
            title: '카드 등록하기 4/4',
            text: '비밀번호 앞 2자리를 입력해주세요.',
            input:'text',
            inputPlaceholder: '비밀번호 앞 2자리를 입력해주세요.',
            inputAttributes: {
              maxlength: 2,
            },
            showCancelButton: true,
            cancelButtonText: '취소하기',
            confirmButtonText: '다음',
            allowOutsideClick: false,
          }).then((cardpasswd) => {
            if(cardpasswd.isDismissed){
              setCardNumber("");
              setCardVali("");
              setCardCve("");
              setCardCheck(false);
              return;
            }
            setCardPasswd(cardpasswd.value);
            SwalSuccess('카드 등록 완료!', 1200);
            setCardCheck(true);
          })
        })
      })
    });
  };

  const deliveryFee = 1200;
  const amountOfPayment = totalPrice + deliveryFee;

  return (
    <form className="payment-form" onSubmit={handleSubmit(OnSubmit)}>
      <section className="payment-form-section payment-address-section">
        <FormTitle title="주소" />

        <label id="address" className="payment-form-label">
          배달 주소
        </label>

        <select className="payment-form-select" {...register('address')}>
          {order_address.map((address) => (
            <option key={address.id} value={address.name}>
              {address.name}
            </option>
          ))}
        </select>

        {/* 조건 추가해줄 것 */}
        <LineInputContainer
          desc="상세주소"
          id="order_detail"
          register={register}
          errors={errors}
        />
      </section>

      <section className="payment-form-section payment-request-section">
        <FormTitle title="요청 사항" />

        <label id="order-time" className="payment-form-label">
          주문 시간
        </label>
        <input
          className="order-time-input"
          {...register('order_time')}
          type="time"
          disabled
        />

        <label id="order-request" className="payment-form-label">
          요청 사항
        </label>
        {/* 조건 추가해줄 것 */}
        <LineInputContainer
          desc="요청사항"
          id="order_request"
          register={register}
          errors={errors}
        />
      </section>

      <section className="payment-form-section payment-pay-section">
        <FormTitle title="결제 정보" />
        {/* cardCheck를 통해, 카드 정보가 입력되었을 경우, 카드 정보를 담은 컴포넌트 출력 */}
        {cardCheck && 
        <div className='card-box'>
          <div className='image-box'>
            <img src='/images/credit_card.svg' alt=''/>
          </div>
          <div className='card-info'>
            <p className='number'>카드번호</p>
            <p>{cardNumber.substr(0,5)}******{cardNumber.substr(11,14)}*</p>
          </div>
        </div>
        }

        {/* type을 button으로 설정하면, 폼이 제출되는 오류를 막음 */}
        {/* cardCheck를 통해, false면 결제 카드 최초 등록이 필요, 등록을 완료하면 true로 변경됨 */}
        {!cardCheck && <Btn type='button' text='결제 카드 등록하기' handleClick={AddCredit} color='red'/>}
        {cardCheck && <Btn type='button' text='카드 재등록하기' handleClick={AddCredit} color='blue'/>}

        <PaymentReceipt
          price_info={{
            menuPrice: totalPrice,
            deliveryFee,
            amountOfPayment,
          }}
        />
      </section>

      <Btn type="submit" text={`${PrintPrice(amountOfPayment)}원 결제하기`} />
    </form>
  );
};

export default PaymentForm;
