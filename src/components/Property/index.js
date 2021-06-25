import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './property.less';

function Property(props) {
    const { color, logo, id, mainImage, price } = props;
    return (
        <>
            <div styleName="results-header" style={{ backgroundColor: color }}>
                <span styleName="logo">
                    <img styleName="logo-img" src={logo} alt="logo" />
                </span>
                <span styleName="id">ID:{id}</span>
            </div>
            <div styleName="results-content">
                <img styleName="content-img" src={mainImage} alt="image" />
            </div>
            <div styleName="results-footer">
                <span>{price}</span>
            </div>
        </>
    );
}
export default CSSModules(Property, styles);
