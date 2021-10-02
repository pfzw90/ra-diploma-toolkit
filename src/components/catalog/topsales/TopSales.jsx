import { useDispatch, useSelector, connect } from 'react-redux';
import React from 'react';
import Grid from '@react-css/grid';
import { nanoid } from '@reduxjs/toolkit';
import {
  getTopSales,
} from '../../../actions/actionCreators';
import Loader from '../../loader/Loader.jsx';
import Item from '../items/Item.jsx';
import LoadButton from '../../loadbutton/loadButton.jsx';

function TopSales() {
  const { topsalesList, topsalesState } = useSelector((state) => state.topsales);
  const dispatch = useDispatch();

  const firstLoad = () => {
    dispatch(getTopSales());
  };

  React.useEffect(() => {
    firstLoad();
  }, [dispatch]);

  return (
    <React.Fragment>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
          {(topsalesState === 'idle')
            ? (
                <React.Fragment>
                        <Grid className="row" columns="repeat(3,1fr)" autoRows="1fr" columnGap="15px">
                        { topsalesList.map((i) => (
                        <Item key={nanoid()}
                        id={i.id}/>)) }
                        </Grid>

                </React.Fragment>
            )
            : (null) }

          {(topsalesState === 'loading') ? (<Loader/>) : (null) }
          {(topsalesState.startsWith('error')) ? (<LoadButton currentState={topsalesState} fn={firstLoad}/>) : (null) }
    </section>
  </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { topsalesList, topsalesState } = state.topsales;
  return {
    topsalesList,
    topsalesState,
  };
};

export default connect(mapStateToProps)(TopSales);
