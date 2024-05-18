import React, { useEffect, useRef } from 'react';
import { Tooltip as BsTooltip, OverlayTrigger } from 'react-bootstrap';

export const TooltipWrapper = ({ children, text, placement = 'right' }) => {
    return (
        <OverlayTrigger
            placement={placement}
            overlay={<BsTooltip>{text}</BsTooltip>}
        >
            {children}
        </OverlayTrigger>
    );
};