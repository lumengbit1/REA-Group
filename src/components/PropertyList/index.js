import React, { useEffect } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import CSSModules from 'react-css-modules';
import styles from './propertyList.less';
import Loadable from 'react-loadable';

function PropertyList({ rootStore, area, btnText, btnClass }) {
    const propertyData = area === 'results' ? rootStore.formStore.resultsData : rootStore.formStore.savedData;
    const LoadableProperty = Loadable({
        loader: () => import('./../Property'),
        loading() {
            return <>Loading...</>;
        }
    });

    useEffect(() => {
        rootStore.formStore.getData();
    }, []);

    function onClick(id) {
        area === 'results' ? rootStore.formStore.addProperty(id) : rootStore.formStore.removeProperty(id);
    }

    return (
        <>
            {propertyData.map(item => {
                return (
                    <div styleName="property">
                        <LoadableProperty
                            price={item.price}
                            color={item.agency.brandingColors.primary}
                            logo={item.agency.logo}
                            id={item.id}
                            mainImage={item.mainImage}
                        />
                        <button
                            data-testid="test"
                            styleName={btnClass}
                            onClick={() => {
                                onClick(item.id);
                            }}
                        >
                            {btnText}
                        </button>
                    </div>
                );
            })}
        </>
    );
}
export default inject('rootStore')(observer(CSSModules(PropertyList, styles)));
