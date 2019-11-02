import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, Icon, Input, Menu, message, Modal } from 'antd';

import {
  compareMasterPasswords,
  decryptPassword,
  encryptMasterPassword
} from '../../utils/hashPassword';
import './styles.less';

const ViewPasswords = () => {
  let [passwordsData, setPasswordsData] = useState([]);
  const [hashedPass, setHashedPass] = useState('');
  const [plainMasterPassword, setPlainMasterPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const currentUser = useSelector(state => state.user.currentUser);
  const encryptedMasterPassword = useSelector(
    state => state.masterPassword.masterPassword
  );

  const verifyMasterPassword = () => {
    const returnedEncryptedMasterPassword = encryptMasterPassword(
      plainMasterPassword,
      currentUser.id
    );
    const result = compareMasterPasswords(
      returnedEncryptedMasterPassword,
      encryptedMasterPassword,
      plainMasterPassword,
      currentUser.id
    );

    if (result) {
      message.success('Passwords verified');
      setVisible(false);
      setIsValid(true);
    } else {
      message.error('Incorrect master password');
      setVisible(true);
    }
  };

  const getPass = async () => {
    let res = await decryptPassword(currentUser.id);
    setPasswordsData([...res]);
  };

  const displayPassword = e => {
    let val = passwordsData.filter(data => data.websiteName === e.key);
    setHashedPass(val[0].hashedPassword);
  };

  const menu = (
    <Menu onClick={e => displayPassword(e)}>
      {passwordsData.length !== 0 ? (
        passwordsData.map(passwordData => (
          <Menu.Item key={passwordData.websiteName}>
            <p>{passwordData.originalWebsiteName}</p>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No Password</Menu.Item>
      )}
    </Menu>
  );

  if (isValid) {
    return (
      <div className="buttons">
        <Dropdown overlay={menu} trigger={['click']} onClick={() => getPass()}>
          <Button>
            View Passwords <Icon type="down" />
          </Button>
        </Dropdown>
        <Input.Password
          value={hashedPass}
          placeholder="Fetched password"
          style={{ width: 243 }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={() => setVisible(true)}>View Passwords</Button>
        <Modal
          title="Master Password"
          visible={visible}
          onOk={() => verifyMasterPassword()}
          onCancel={() => setVisible(false)}
        >
          <div>
            <p>Enter master password for additional security</p>
            <Input.Password
              value={plainMasterPassword}
              onChange={e => setPlainMasterPassword(e.target.value)}
            />
          </div>
        </Modal>
      </div>
    );
  }
};

export default ViewPasswords;
