import React, { useEffect, useState } from 'react';

export default function LoadButton(props) {
  const { fetched, more, currentState } = props;
  const err = currentState.startsWith('error');
  const buttonText = (!err) ? 'Загрузить еще' : 'Повторить попытку';
  const [count, setCount] = useState(5);
  let timer = null;

  const reload = () => {
    clearInterval(timer);
    props.fn();
  };

  useEffect(() => {
    if (err) {
      timer = setInterval(() => {
        if (count === 1) reload();
        else setCount((c) => c - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    (err || (fetched && more))
      ? (
          <div className="text-center">
          { (err) ? <div className="alert alert-warning" role="alert">Ошибка загрузки</div> : (null)}
          <button className="btn btn-outline-primary" onClick={() => reload()} disabled={(currentState === 'loading')}>
          {currentState === 'loading' ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : buttonText}
          </button>
          { err
            ? <div className="alert alert-light" role="alert">Автоматическая перезагрузка через {count} секунд</div> : null}
        </div>
      ) : (null)
  );
}
