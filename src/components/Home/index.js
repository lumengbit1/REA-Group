import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './home.less';
import PropertyList from '../PropertyList';
import Header from '../Header';

function Home() {
    return (
        <div>
            <div styleName="header">
                <Header />
            </div>
            <div styleName="homePage">
                <div styleName="resultsArea">
                    <div styleName="title">Results</div>
                    <div styleName="block">
                        <PropertyList area="results" btnText="Add Property" btnClass="btnresults" />
                    </div>
                </div>
                <div styleName="savedPropertiesArea">
                    <div styleName="title">Saved Properties</div>
                    <div styleName="block">
                        <PropertyList area="saved" btnText="Remove Property" btnClass="btnsaved" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CSSModules(Home, styles);
