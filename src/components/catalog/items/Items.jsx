import { useSelector, connect } from 'react-redux';
import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import Grid from '@react-css/grid';
import {
  resetOffset, getItems, resetItems,
} from '../../../actions/actionCreators';
import Item from './Item.jsx';
import LoadButton from '../../loadbutton/loadButton.jsx';
import Loader from '../../loader/Loader.jsx';

function Items(props) {
  const { itemsList, itemsState, lastFetched } = useSelector((state) => state.items);
  const { q, categoryId, offset } = useSelector((state) => state.filter);
  const params = {};
  if (q) params.q = q;
  if (categoryId) params.categoryId = categoryId;
  const loadMore = (offset > 0 && offset % 6 === 0 && lastFetched);

  const firstLoad = () => {
    props.getItems(params);
  };

  React.useEffect(() => {
    firstLoad();
    return () => {
      props.resetOffset();
      props.resetItems();
    };
  }, [categoryId, q]);

  const nextLoad = () => {
    props.getItems({ ...params, offset });
  };

  return (
  <React.Fragment>
    { (itemsList.length > 0) ? (
                <Grid className="row" columns="repeat(3,1fr)" autoRows="1fr" columnGap="15px">
                {itemsList.map((i) => (
                <Item key={nanoid()} id={i.id}/>))}
                </Grid>
    ) : null }

    {(itemsList.length === 0 && itemsState === 'idle')
      ? (<div className="alert alert-light" role="alert">По Вашему запросу{(q) ? ` "${q}" ` : ''} ничего не найдено.</div>) : null
    }

    {!lastFetched && itemsState === 'loading' ? <Loader/> : null}

    <LoadButton fn={(loadMore ? nextLoad : firstLoad)}
                  currentState={itemsState}
                  fetched={lastFetched} more={loadMore} key={nanoid()}/>
  </React.Fragment>

  );
}

const mapStateToProps = (state) => {
  const { itemsList, itemsState, lastFetched } = state.items;
  return {
    itemsList, itemsState, lastFetched,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getItems: (params) => dispatch(getItems(params)),
  resetOffset() { dispatch(resetOffset()); },
  resetItems() { dispatch(resetItems()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
