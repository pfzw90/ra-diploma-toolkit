import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  changeSearch, toggleSearchOpacity, initSearch, resetQuery,
} from '../../actions/actionCreators';

function Search(props) {
  const searchInput = React.createRef();
  const history = useHistory();
  const inCatalog = (history.location.pathname.endsWith('catalog'));

  useEffect(() => {
    if (!props.hidden && props.header) searchInput.current.focus();
  }, [props]);

  const handleChange = (ev) => {
    const { value } = ev.target;
    props.onChange(value);
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    const { value, hidden } = props;
    props.onClick(hidden, value, inCatalog, history);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit(props.value, inCatalog, history);
  };

  const onLeave = () => {
    props.onLeave(props.value, props.header);
  };

  return (
    <React.Fragment>
    {props.header ? (<div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleClick}></div>) : null}
    <form data-id="search-form" className={`${props.prefix}-search-form form-inline ${(props.hidden && props.header) ? 'invisible' : ''}`}
          onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Поиск" value={props.value} onChange={handleChange} name="search" onBlur={onLeave} ref={(input) => { (searchInput.current = input); }}/>
    </form>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { value, hidden } = state.search;
  return { value, hidden };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(changeSearch(value)),
  onClick: (hidden, value, inCatalog, history) => {
    if (hidden || !value.length) dispatch(toggleSearchOpacity());
    else {
      if (!inCatalog) history.push('/catalog');
      dispatch(initSearch(value));
    }
  },
  onSubmit: (value, inCatalog, history) => {
    if (!value.length) dispatch(resetQuery());
    else {
      if (!inCatalog) history.push('/catalog');
      dispatch(initSearch(value));
    }
  },
  onLeave: (value, header) => {
    if (!value && header) dispatch(toggleSearchOpacity());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
