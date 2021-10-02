import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import {
  toggleDeleteCartItem, removeDeleted, fetchPrices,
} from '../../actions/actionCreators';
import Loader from '../loader/Loader.jsx';
import LoadButton from '../loadbutton/loadButton.jsx';
import OrderForm from './orderform/OrderForm.jsx';

function Cart(props) {
  const { cartState } = useSelector((state) => state.cart);
  const cartitems = useSelector((state) => state.cartitems);
  const sum = cartitems.filter(
    (i) => (i.delete !== true),
  ).reduce((s, i) => s + i.newPrice * i.quantity, 0);

  const firstLoad = () => {
    if (cartitems.length > 0) props.priceCheck(cartitems);
  };

  const handleToggleDelete = (id) => {
    props.onToggleDelete(id);
  };

  useEffect(() => {
    const clear = () => props.removeDeleted();
    window.addEventListener('beforeunload', clear);
    firstLoad();
    return () => {
      window.removeEventListener('beforeunload', clear);
      clear();
    };
  }, []);

  if (cartState === 'idle') {
    return (
        <React.Fragment>
          <section className="cart">
                    <h2 className="text-center">Корзина</h2>
                    {(cartitems.length > 0)
                      ? <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Размер</th>
                                <th scope="col">Кол-во</th>
                                <th scope="col">Стоимость</th>
                                <th scope="col">Итого</th>
                                <th scope="col">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cartitems.map((i, index) => (<tr className={
                        i.delete ? 'bg-light' : null
                        } key={i.cartItemId}>
                                <th scope="row">{index + 1}</th>
                                <td>{i.delete ? <b className="text-warning">Удалено: </b> : null }<a href={`/catalog/${i.id}`}>{i.title}</a></td>
                                <td>{i.size}</td>
                                <td>{i.quantity}</td>
                                <td>{(i.price !== i.newPrice)
                                  ? <>
                                  <s>{`${i.price}р.`}</s>
                                  {(i.newPrice > i.price)
                                    ? <b className="text-danger"> ↑ {i.newPrice}р.</b>
                                    : <b className="text-success"> ↓ {i.newPrice}р.</b>}
                                  </>
                                  : `${i.price}р.` }</td>
                                <td>{(i.price !== i.newPrice)
                                  ? <>
                                  <s>{`${i.price * i.quantity}р.`}</s>
                                  {(i.newPrice > i.price)
                                    ? <b className="text-danger"> ↑ {i.newPrice * i.quantity}р.</b>
                                    : <b className="text-success"> ↓ {i.newPrice * i.quantity}р.</b>}
                                  </>
                                  : `${i.newPrice * i.quantity}р.` }
                                </td>
                                <td>
                                <button className={`btn ${i.delete ? 'btn-primary' : 'btn-outline-danger'} btn-sm`} onClick={() => handleToggleDelete(i.id)}>
                                  {i.delete ? 'Отменить удаление' : 'Удалить'}
                                </button></td>
                            </tr>))}

                            <tr>
                                <td colSpan="5" className="text-right">Общая стоимость</td>
                                <td>{sum}р.</td>
                            </tr>
                        </tbody>
                    </table>
                      : <div> Пусто... </div>}
                </section>
                {(cartitems.filter((i) => (!i.delete)).length > 0) ? <OrderForm /> : null }
        </React.Fragment>
    );
  }

  if (cartState === 'loading') return <Loader/>;
  return <LoadButton fn={firstLoad} currentState={cartState}/>;
}

const mapStateToProps = (state) => {
  const { cartState, cartSum } = state.cart;
  const { cartitems } = state;
  return { cartState, cartitems, cartSum };
};

const mapDispatchToProps = (dispatch) => ({
  priceCheck: (items) => dispatch(fetchPrices(items)),
  onToggleDelete: (id) => {
    dispatch(toggleDeleteCartItem(id));
  },
  removeDeleted: () => dispatch(removeDeleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
