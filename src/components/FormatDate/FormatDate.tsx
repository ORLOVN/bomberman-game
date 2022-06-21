import React from 'react';
import dateFormat from "dateformat";

import { Props } from './types';

FormatDate.defaultProps = {
    mask: "dddd, mmmm dS, yyyy"
}

function FormatDate({ value, mask }: Props) {
    return (
        <>
            { dateFormat(value, mask) }
        </>
    );
}

export default React.memo(FormatDate)
