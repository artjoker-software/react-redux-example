import * as styles from './Tooltip.scss';
import * as mobileStyles from './TooltipMobile.scss';
import cx from 'classnames';
import React from 'react';

const OMTooltip = properties => (
  <div
    className={cx(
        styles.tooltip,
        styles[properties.className],
        mobileStyles[properties.className]
      )}
  >
    <span className={cx('icon icon-close', styles.closeBtn)} onClick={properties.onClose} />
    {properties.msg}
  </div>
  );

export default OMTooltip;
