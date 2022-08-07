import React from 'react';
import moment from 'moment';
import { Props } from './types';

FormatDate.defaultProps = {
    mask: "dd.MM.yyyy hh:mm:ss"
}

function FormatDate({ value, mask }: Props) {
    return (
        <>
          {moment(value).utcOffset(0).format(mask)}
        </>
    );
}

export default React.memo(FormatDate)
