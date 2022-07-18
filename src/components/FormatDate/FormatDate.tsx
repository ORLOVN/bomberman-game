import React from 'react';
import dateFormat from "date-format";

import { Props } from './types';

FormatDate.defaultProps = {
    mask: "dd.MM.yyyy hh:mm:ss"
}

function FormatDate({ value, mask }: Props) {
    return (
        <>
            { dateFormat(mask, new Date(value)) }
        </>
    );
}

export default React.memo(FormatDate)
