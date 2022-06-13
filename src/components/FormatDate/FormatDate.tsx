import React from 'react';
import dateFormat from "dateformat";

interface Props {
    value: number;
    mask?: string;
}

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
