import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  changeOrderForm,
  checkPhone,
  checkAddress,
  sendOrderRequest,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import LoadButton from '../../loadbutton/loadButton.jsx';

function OrderForm(props) {
  const {
    orderFormState, phone, address, agreement,
  } = useSelector((state) => state.orderform);
  const cartitems = useSelector((state) => state.cartitems);

  const blocked = (cartitems.filter((i) => (!i.deleted)).length === 0
  || !agreement.value
  || phone.error || address.error);

  useEffect(() => {
  }, []);

  const handleChange = (ev) => {
    const { type, value, id } = ev.target;
    const resValue = (type === 'checkbox') ? ev.target.checked : value;
    props.onChange({ id, value: resValue });
  };

  const handleCheckPhone = (ev) => {
    props.onCheckPhone(ev.target.value);
  };

  const handleCheckAddress = (ev) => {
    props.onCheckAddress(ev.target.value);
  };

  const handleSubmit = (ev) => {
    if (ev) ev.preventDefault();
    props.onSendOrder({
      owner: {
        phone: phone.value,
        address: address.value,
      },
      items: cartitems.map((i) => ({
        id: i.id, price: i.newPrice, count: i.quantity,
      })),
    });
  };

  if (orderFormState === 'idle') {
    return (
    <section className="order">
    <h2 className="text-center">Оформить заказ</h2>
    <div className="card" style={{ maxWidth: `${30}rem`, margin: '0 auto' }}>
        <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input className="form-control" id="phone" type="tel" placeholder="Ваш телефон" value={phone.value} onChange={handleChange} onBlur={handleCheckPhone} required/>
                {phone.error ? <div className="alert alert-danger">Введите корректный номер телефона </div> : null}
            </div>
            <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input className="form-control" id="address" placeholder="Адрес доставки" value={address.value} onChange={handleChange} onBlur={handleCheckAddress} required/>
                {address.error ? <div className="alert alert-danger">Введите корректный адрес </div> : null}
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" onChange={handleChange} checked={agreement.value}/>
                <label className="form-check-label" htmlFor="agreement" required>Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary" onClick={handleSubmit} disabled={blocked}>Оформить</button>
        </form>

        </div>
    </section>
    );
  }

  if (orderFormState === 'loading') return <Loader/>;
  if (orderFormState === 'success') return <div className="alert alert-success">Заказ успешно отправлен!</div>;
  return <LoadButton fn={handleSubmit} currentState={orderFormState}/>;
}

const mapStateToProps = (state) => {
  const {
    orderFormState, phone, address, agreement,
  } = state.orderform;
  const { cartitems } = state;
  return {
    orderFormState, phone, address, agreement, cartitems,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (data) => dispatch(changeOrderForm(data)),
  onSubmit: () => {
  },
  onCheckPhone: (value) => dispatch(checkPhone(value)),
  onCheckAddress: (value) => dispatch(checkAddress(value)),
  onSendOrder: (order) => dispatch(sendOrderRequest(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
