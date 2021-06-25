import React, { useState, useRef } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import CSSModules from 'react-css-modules';
import styles from './header.less';

function Header({ rootStore }) {
    const [price, getPrice] = useState();
    const inputEl = useRef(null);
    const updateProperty = () => {
        rootStore.formStore.updateProperty(price);
    };

    const resetProperty = () => {
        rootStore.formStore.resetProperty();
        inputEl.current.value = '';
    };
    return (
        <>
            <div styleName="header">
                <label styleName="priceLabel" htmlFor="price">
                    Price:
                </label>
                <input
                    ref={inputEl}
                    id="price"
                    type="text"
                    name="priceInput"
                    data-testid="test"
                    onChange={e => getPrice(e.target.value)}
                />
                <button data-testid="choose" styleName="headerBtn" onClick={updateProperty}>
                    Price Choose
                </button>
                <button data-testid="reset" styleName="headerBtn" onClick={resetProperty}>
                    Reset
                </button>
            </div>
        </>
    );
}
export default inject('rootStore')(observer(CSSModules(Header, styles)));
