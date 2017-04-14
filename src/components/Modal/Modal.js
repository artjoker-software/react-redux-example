import React from 'react';
import Modal from 'react-modal';
import styles from './Modal.scss';
import cx from 'classnames';

const DecoratedModal = (properties) => {
  if (properties.isOpen) {
    let messageModal;
    const closeBtn = (
      <span className={styles.closeButton} onClick={properties.onRequestClose}>
        <span className={cx('icon', properties.className === 'propertyDetailsModal' && properties.isMobile ? 'icon-next' : 'icon-close')} />
      </span>);

    const regularModal = (
      <Modal
        {...properties}
        className={cx(styles.customStyles, styles[properties.className], { [styles.propertyModal]: properties.className === 'propertyDetailsModal' })}
        overlayClassName={styles.customOverlay}
        contentLabel="Modal"
      >
        { properties.isMobile
          ? <a eventKey="1" href="/">
            <img className={styles.logoSmall} src={'/images/logo-blue.svg'} alt="Logo" />
          </a>
          : null }

        { !properties.isCloseButtonInvisible ? closeBtn : null }

        { (properties.className === 'advancedFiltersModal')
            ? (<div className={styles.header}>
              {closeBtn}
              <span className={styles.headerTitle}>{properties.translate('advancedFilters', 'title')}</span>
            </div>)
            : null }

        { properties.children }
      </Modal>
    );

    if (properties.className === 'messageModal') {
      const childProps = properties.children.props.children.props;
      const isButtonNeeded = childProps && childProps.className && childProps.className.indexOf('successMessage') !== -1;
      messageModal = isButtonNeeded ? (
        <Modal
          {...properties}
          className={`${styles.customStyles} ${styles[properties.className]}`} overlayClassName={styles.customOverlay}
          contentLabel="Modal"
        >
          { properties.children }
          <a className="btn btn-primary ok-button" onClick={properties.onRequestClose}>{properties.translate('publishProperty', 'ok')}</a>
        </Modal>
      ) : regularModal;
    }

    return (
      <div>
        {properties.className === 'messageModal' ? messageModal : regularModal}
      </div>
    );
  }

  return (<div />);
};

export default DecoratedModal;
