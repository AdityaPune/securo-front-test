import {
  Button,
  TextField,
  Card,
  Switch,
  Grid,
  InputAdornment,
  Divider,
} from '@mui/material';
import MainCard from '../../components/SecuroLayouts/MainCard';
import CustomModal from '../../components/Modal';
import SecuroTextButton from '../../components/SecuroButtons/SecuroTextButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Edit from '@mui/icons-material/Edit';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import SecuroButtonWithLoader from '../../components/SecuroButtons/SecuroButtonWithLoader';
import TrashIcon from '../../assets/images/icons/trash.svg';
import LinkIcon from '../../assets/images/icons/link.svg';
import EditIcon from '../../assets/images/icons/edit.svg';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';

import { useEffect, useState } from 'react';

import './styles.scss';

import {
  getApiKey,
  getApiKeys,
  createApiKey,
  deleteApiKey,
  updateApi,
} from '../../services/axios/apiKeys';

interface ApiKeyProps {
  isSandbox?: boolean;
}

function ApiKey(props: ApiKeyProps) {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdApiKey, setCreatedApiKey] = useState<any>({});
  const [errorText, setErrorText] = useState('');
  const [apiToEdit, setApiToEdit] = useState<any>({});
  const [ips, setIps] = useState<string[]>([]);

  const isSandbox = props.isSandbox;

  const defaultPermissions = [
    {
      id: 1,
      label: 'Wallet Deposit',
      code: 'wallet_deposit',
      checked: false,
    },
    {
      id: 2,
      label: 'Wallet Withdrawal',
      code: 'wallet_withdraw',
      checked: false,
    },
    {
      id: 3,
      label: 'Get Account Balance',
      code: 'account_read',
      checked: false,
    },
    {
      id: 4,
      label: 'Profile Update',
      code: 'profile_update',
      checked: false,
    },
    {
      id: 5,
      label: 'Invest Strategy',
      code: 'strategy_invest',
      checked: false,
    },
    {
      id: 6,
      label: 'Withdraw from Strategy',
      code: 'strategy_withdraw',
      checked: false,
    },
    {
      id: 7,
      label: 'Get Portfolio Details',
      code: 'portfolio_read',
      checked: false,
    },
    {
      id: 8,
      label: 'KYC Verification',
      code: 'kyc_verify',
      checked: false,
    },
    {
      id: 9,
      label: 'Get Transaction History',
      code: 'transaction_read',
      checked: false,
    },
  ];
  const [permissions, setPermissions] = useState<any>(defaultPermissions);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      async function getKeys() {
        const res = await getApiKeys(isSandbox);
        const data = res.data;
        return data;
      }

      const data = await getKeys();
      const dataForRender = formatApiKeysForRender(data);

      setApiKeys(dataForRender);
      setLoading(false);
      return;
    };

    fetchData();

    return () => {};
  }, []);

  function formatApiKeysForRender(data: any) {
    const dataForRender = data.map((obj: any) => {
      obj.createdDate = moment(obj.createdDate).format('D MMM, YYYY hh:mm A');
      return {
        ...obj,
        actions: () => {
          return RevokeButton(obj);
        },
      };
    });
    return dataForRender;
  }

  async function refreshApiKeys() {
    setLoading(true);
    const res = await getApiKeys(isSandbox);
    const dataForRender = formatApiKeysForRender(res.data);
    setApiKeys(dataForRender);
    setLoading(false);
  }

  async function createKey() {
    setLoading(true);
    const res = await createApiKey(isSandbox);
    await refreshApiKeys();
    setLoading(false);
    setCreatedApiKey(res.data);
    setIsCreateNew((current) => !current);
  }

  function ApiPermissions() {
    const checkboxChange = (event: any, index: number) => {
      const newPerms = [...permissions];
      newPerms[index].checked = event.target.checked;
      setPermissions(newPerms);
    };

    return (
      <Grid
        container
        spacing={2}
        columnSpacing={4}
        style={{ maxWidth: '50vw' }}
      >
        {permissions.map((perm: any, index: number) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between ',
                  alignItems: 'center',
                }}
              >
                <div>{perm.label}</div>
                <Switch
                  checked={perm.checked}
                  onChange={(e) => checkboxChange(e, index)}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  function RevokeButton(apiKey: any) {
    const [revokeModal, setRevokeModal] = useState(false);
    const [revoking, setRevoking] = useState(false);
    const [repeatKey, setRepeatKey] = useState('');

    async function deleteKey(key: string) {
      setRevoking(true);
      try {
        await deleteApiKey(key, isSandbox);
      } catch (e) {
        console.error(e);
      } finally {
        const updatedKeys = apiKeys.filter((obj) => obj.key !== key);
        setApiKeys([...updatedKeys]);
        setRevoking(false);
        setRevokeModal(false);
        await refreshApiKeys();
      }
    }

    function confirmRevoke(e: any) {
      setRevokeModal(true);
    }

    function closeRevokeModal() {
      setRevokeModal(false);
      setRepeatKey('');
    }

    function ModalContent() {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div />
            <img src={TrashIcon}></img>
            <div style={{ color: '#667085' }}>
              <CloseIcon
                fontSize="large"
                onClick={closeRevokeModal}
              />
            </div>
          </div>
          <h3 style={{ color: '#101828', fontSize: '18px', fontWeight: '600' }}>
            Delete {apiKey.key}
          </h3>
          <div style={{ color: '#667085', fontSize: '14px' }}>
            Permanently delete access key{' '}
            <span style={{ color: '#d92d20', fontWeight: 'bold' }}>
              {apiKey.key}
            </span>
            ? Any Securo Finance API call made using this key will fail. Before
            you revoke an access key, make sure that it's no longer in use. You
            cannot recover an access key after you delete.
          </div>

          <h3 style={{ color: '#344054', textAlign: 'left', fontSize: '14px' }}>
            To confirm deletion, enter access key ID in the text input field.
          </h3>

          <TextField
            id="outlined-basic"
            placeholder="Enter access key ID"
            variant="outlined"
            type="text"
            style={{ marginBottom: '16px', color: '#D0D5DD' }}
            fullWidth
            value={repeatKey}
            onChange={(e) => setRepeatKey(e.target.value)}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '3rem',
            }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={6}
              >
                <Button
                  variant="outlined"
                  style={{ width: '100%', color: '#d0d5dd' }}
                  fullWidth
                  onClick={() => closeRevokeModal()}
                >
                  <span style={{ color: '#344054' }}>Cancel</span>
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  disabled={repeatKey !== apiKey.key}
                  onClick={() => deleteKey(apiKey.key)}
                >
                  Confirm Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }

    return (
      <div>
        <SecuroTextButton
          clickHandler={confirmRevoke}
          title="Revoke"
        />

        <CustomModal
          open={revokeModal}
          content={ModalContent()}
          titleMain="Confirm revoke API"
          handleOpen={(bool) => setRevokeModal(bool)}
        />
      </div>
    );
  }

  function ApiIPs() {
    const [editModal, setEditModal] = useState(false);
    const [isCreateNew, setIsCreateNew] = useState(false);
    const [ipEdit, setIpEdit] = useState('');
    const [ipEditIndex, setIpEditIndex] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [ipIndexToDelete, setIpIndexToDelete] = useState(0);

    const editIP = (index: number) => {
      if (ips) {
        setIpEditIndex(index);
        setIpEdit(ips[index]);
        setEditModal(true);
      }
    };

    const updateIp = (ip: string, index: number) => {
      ips[index] = ip;
      setIps([...ips]);
    };

    const saveIp = () => {
      updateIp(ipEdit, ipEditIndex);
      closeModal();
    };

    const addIP = () => {
      ips.push(ipEdit);
      setIps([...ips]);
      setIpEditIndex(ips.length - 1);
      setIpEdit(ips[ips.length - 1]);
      closeModal();
    };

    function deleteIP() {
      let tempIps = [...ips];
      tempIps.splice(ipIndexToDelete, 1);
      setIps(tempIps);
      setDeleteModal(false);
      setIpIndexToDelete(0);
    }

    function openDeleteModal(index: number) {
      setDeleteModal(true);
      setIpIndexToDelete(index);
    }

    const closeModal = () => {
      setEditModal(false);
      setIpEdit('');
      setIpEditIndex(0);
      setIsCreateNew(false);
    };

    function ModalContent() {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div />
            <img src={isCreateNew ? LinkIcon : EditIcon}></img>
            <div style={{ color: '#667085' }}>
              <CloseIcon
                fontSize="large"
                onClick={closeModal}
              />
            </div>
          </div>
          <h3
            style={{
              color: '#101828',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
          >
            {isCreateNew ? 'Add ' : 'Edit '} Whitelist IP Address
          </h3>
          <div
            style={{ color: '#667085', fontSize: '14px', marginBottom: '2rem' }}
          >
            Only whitelisted IP Address is able to use this API.
          </div>

          <TextField
            autoFocus
            id="outlined-basic"
            variant="outlined"
            value={ipEdit}
            fullWidth
            placeholder="Enter IP Address"
            onChange={(e) => setIpEdit(e.target.value)}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '3rem',
            }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={6}
              >
                <Button
                  variant="outlined"
                  style={{ width: '100%', color: '#d0d5dd' }}
                  fullWidth
                  onClick={() => setEditModal(false)}
                >
                  <span style={{ color: '#344054' }}>Cancel</span>
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={isCreateNew ? addIP : saveIp}
                  disabled={!ipEdit}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }

    function DeleteModalContent() {
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div />
            <img src={TrashIcon}></img>
            <div style={{ color: '#667085' }}>
              <CloseIcon
                fontSize="large"
                onClick={() => setDeleteModal(false)}
              />
            </div>
          </div>
          <h3
            style={{
              color: '#101828',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '1rem',
            }}
          >
            Delete IP Address
          </h3>

          <div style={{ color: '#667085', fontSize: '14px' }}>
            Are you sure you want to delete{' '}
            <span style={{ color: '#d92d20', fontWeight: 'bold' }}>
              {ips[ipIndexToDelete]}
            </span>
            ?
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '3rem',
            }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={6}
              >
                <Button
                  variant="outlined"
                  style={{ width: '100%', color: '#d0d5dd' }}
                  fullWidth
                  onClick={() => setDeleteModal(false)}
                >
                  <span style={{ color: '#344054' }}>Cancel</span>
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => deleteIP()}
                  color="error"
                >
                  Confirm Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }

    function openCreateNewModal() {
      setIsCreateNew(true);
      setEditModal(true);
      setIpEdit('');
    }
    return (
      <>
        <Divider
          light
          style={{ marginTop: '2rem' }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1rem',
          }}
        >
          <h3>Whitelist IP Addresses</h3>
          <Button
            variant="contained"
            color="primary"
            className="button-action"
            onClick={openCreateNewModal}
            disableRipple
          >
            + Add IP Address
          </Button>
        </div>

        {ips.length ? (
          <>
            <div className="ip-table">
              <Grid
                container
                spacing={2}
                style={{
                  border: '1px solid #EAECF0',
                  marginTop: '2rem',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
              >
                <Grid
                  item
                  xs={11}
                  style={{ padding: '1rem', color: '#667085' }}
                >
                  <div>IP Address</div>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{
                    padding: '1rem',
                    color: '#667085',
                    textAlign: 'center',
                  }}
                >
                  <div>Actions</div>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                style={{
                  marginTop: '0.2rem',
                }}
              >
                {(ips || []).map((ip: any, index: number) => {
                  return (
                    <>
                      <Grid
                        item
                        xs={11}
                        style={{
                          padding: '1rem 1.5rem',
                          color: '#101828',
                          borderBottom: '1px solid #EAECF0',
                        }}
                      >
                        <div
                          className="ip-input"
                          key={`ip-${index + 1}`}
                          style={{ fontWeight: 400 }}
                        >
                          {ip || '-'}
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        style={{
                          padding: '1rem 1.5rem',
                          color: '#667085',
                          borderBottom: '1px solid #EAECF0',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Edit
                            onClick={() => editIP(index)}
                            style={{ color: '#98A2B3' }}
                          />
                          <DeleteOutline
                            onClick={() => openDeleteModal(index)}
                            style={{ color: '#98A2B3' }}
                          />
                        </div>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </div>
          </>
        ) : (
          <>
            <div
              className="card"
              style={{ marginTop: '1rem' }}
            >
              <h3>No Whitelist IP Address</h3>
              <div>You haven’t add any whitelist IP address yet.</div>

              <Button
                variant="contained"
                color="primary"
                className="button-action"
                onClick={openCreateNewModal}
                disableRipple
              >
                + Add IP Address
              </Button>
            </div>
          </>
        )}
        <CustomModal
          open={editModal}
          content={ModalContent()}
        />
        <CustomModal
          open={deleteModal}
          content={DeleteModalContent()}
        />
      </>
    );
  }

  function ApiList() {
    const [loadingApiDetails, setLoadingApiDetails] = useState(false);
    const [updatingApi, setUpdatingApi] = useState(false);
    const [saved, setSaved] = useState(false);

    const headers = [
      {
        title: isSandbox ? 'Sandbox Keys' : 'API Keys',
        key: 'key',
        width: 6,
        rowStyle: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      {
        title: 'Created Date',
        key: 'createdDate',
        width: 3,
        rowStyle: {
          color: '#7c7c7c',
        },
      },
      {
        title: '',
        key: 'actions',
        width: 1,
      },
      {
        title: '',
        key: 'arrow',
        width: 2,
        rowStyle: {
          alignSelf: 'normal',
        },
      },
    ];

    async function editApi(key: string) {
      setPermissions(defaultPermissions);

      if (apiToEdit.key === key) {
        setApiToEdit({});
        return;
      }
      setLoadingApiDetails(true);
      const res = await getApiKey(key, isSandbox);
      const data = res.data;
      setApiToEdit(data);
      setApiPermissions(data.permissions);
      setIps(data.ips.map((obj: any) => obj.ip));
      setLoadingApiDetails(false);
    }

    function setApiPermissions(apiPermissions: any[]) {
      const permissionsCopy = [...defaultPermissions];
      apiPermissions.map((permObj) => {
        const index = permissionsCopy.findIndex((obj) => obj.id === permObj.id);
        if (index > -1) {
          permissionsCopy[index].checked = true;
        }
      });
      setPermissions(permissionsCopy);
    }

    async function saveAPI(apiKey: string) {
      setUpdatingApi(true);
      try {
        const checkedPermissions = permissions.reduce(
          (accum: number[], obj: any) => {
            if (obj.checked) accum.push(obj.id);
            return accum;
          },
          []
        );
        await updateApi(apiKey, checkedPermissions, ips, isSandbox);

        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 1500);
      } catch (e) {
        setErrorText('Error in updating permissions');
      } finally {
        setUpdatingApi(false);
      }
    }

    function getValue(obj: any, headerKey: string) {
      const value = obj[headerKey] || '';
      return typeof value === 'function' ? value() : value;
    }

    return (
      <>
        {loading ? (
          <div>Loading API keys...</div>
        ) : (
          <div>
            <div style={{ color: 'red', marginBottom: '2rem' }}>
              *Max. 3 keys can be generated
            </div>

            {apiKeys.length ? (
              <Card>
                <Grid
                  container
                  className="pill-table-row"
                >
                  {headers.length &&
                    headers.map((header: any) => {
                      return (
                        <Grid
                          item
                          xs={header.width}
                          className={header.class}
                          key={header.key}
                          style={{
                            color: '#667085',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          <div className="pill-table-header--text">
                            {header.title}
                          </div>
                        </Grid>
                      );
                    })}
                </Grid>

                {apiKeys.map((obj, index: number) => {
                  return (
                    <Grid
                      container
                      className="pill-table-row"
                      key={`apiKey-${index}`}
                    >
                      {headers.map((header: any, headerIndex: number) => {
                        return (
                          <Grid
                            item
                            xs={header.width}
                            key={`${index}-${headerIndex}`}
                            style={header.rowStyle}
                          >
                            {header.key === 'arrow' && (
                              <>
                                {loadingApiDetails ? (
                                  <div>Loading...</div>
                                ) : (
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'right',
                                      width: '100%',
                                    }}
                                  >
                                    {apiToEdit.key === obj.key ? (
                                      <RemoveCircleOutlineIcon
                                        onClick={() => editApi(obj.key)}
                                        style={{
                                          height: '100%',
                                          color: '#98A2B3',
                                        }}
                                      />
                                    ) : (
                                      <AddCircleOutlineIcon
                                        onClick={() => editApi(obj.key)}
                                        style={{
                                          height: '100%',
                                          color: '#98A2B3',
                                        }}
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            <div>{getValue(obj, header.key)}</div>
                          </Grid>
                        );
                      })}

                      {apiToEdit.key === obj.key && (
                        <div style={{ width: '100%' }}>
                          <div>
                            <Divider
                              light
                              style={{ marginTop: '2rem' }}
                            />
                            <h3>{isSandbox ? 'Sandbox' : 'API'} Permissions</h3>
                          </div>
                          <div style={{ marginTop: '2rem' }}>
                            <ApiPermissions />
                          </div>
                          <ApiIPs />
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'end',
                              justifyContent: 'end',
                              gap: '2rem',
                              marginTop: '1rem',
                            }}
                          >
                            <Button
                              disableRipple
                              disableFocusRipple
                              variant="outlined"
                              style={{
                                color: '#d0d5dd',
                                backgroundColor: '#fff',
                              }}
                              className="btn-outline"
                              onClick={() => editApi('')}
                            >
                              <span style={{ color: '#344054' }}>Cancel</span>
                            </Button>
                            <div onClick={() => saveAPI(obj.key)}>
                              <SecuroButtonWithLoader
                                text={saved ? 'Saved' : 'Save'}
                                loadingText="Saving"
                                loading={updatingApi}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Grid>
                  );
                })}
              </Card>
            ) : (
              <div
                className="card"
                style={{ marginTop: '1rem' }}
              >
                <h3>No {isSandbox ? 'Sandbox' : 'API'} Key</h3>
                <div>
                  You haven’t made any {isSandbox ? 'Sandbox' : 'API'} Key yet
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  className="button-action"
                  disableRipple
                  onClick={createKey}
                >
                  + Create New {isSandbox ? 'Sandbox' : 'API'} Key
                </Button>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  function ApiCreateButton() {
    const reachedMaxApiKeys = apiKeys.length >= 3;

    return (
      <Button
        variant="contained"
        color="primary"
        disabled={reachedMaxApiKeys}
        className="button-action"
        onClick={createKey}
      >
        {reachedMaxApiKeys
          ? 'You have max of 3 API keys'
          : isSandbox
          ? '+ Create New Sandbox Key'
          : '+ Create New API Key'}
      </Button>
    );
  }

  function ApiUpdateButton() {
    const [saved, setSaved] = useState(false);
    async function updatePermissions(apiKey: string) {
      setLoading(true);
      try {
        const checkedPermissions = permissions.reduce(
          (accum: number[], obj: any) => {
            if (obj.checked) accum.push(obj.id);
            return accum;
          },
          []
        );
        await updateApi(apiKey, checkedPermissions, ips, isSandbox);

        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 1500);
      } catch (e) {
        setErrorText('Error in updating permissions');
      } finally {
        setLoading(false);
      }
    }

    function close() {
      setPermissions(defaultPermissions);
      setIsCreateNew(false);
    }

    async function save(apiKey: string) {
      await updatePermissions(apiKey);
      close();
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div onClick={() => save(createdApiKey.key)}>
          <SecuroButtonWithLoader
            text={saved ? 'Saved' : 'Save'}
            loadingText="Saving"
            loading={loading}
          />
        </div>
      </div>
    );
  }

  function ApiContent() {
    return <div>{isCreateNew ? <ApiCreateNew /> : <ApiList />}</div>;
  }

  function ApiCreateNew() {
    const copyToClipboard = (e: any, txt: string) => {
      e.target.textContent = 'Copied';
      setTimeout(() => {
        navigator.clipboard.writeText(txt);
        e.target.textContent = 'Copy';
      }, 1000);
    };

    const fieldsToShow = [
      {
        key: 'key',
        title: isSandbox ? 'Sandbox Key' : 'API Key',
      },
      {
        key: 'secret',
        title: 'Client Secret',
      },
    ];

    return (
      <div>
        {fieldsToShow.map((field) => {
          return (
            <div style={{ marginBottom: '2rem' }}>
              <div className="text-label">{field.title}</div>
              <div style={{ display: 'flex' }}>
                <TextField
                  key={field.key}
                  id="outlined-basic"
                  defaultValue={createdApiKey[field.key]}
                  variant="outlined"
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={(e) => copyToClipboard(e, createdApiKey[field.key])}
                  style={{ borderRadius: '5px' }}
                >
                  Copy
                </Button>
              </div>
            </div>
          );
        })}
        <p style={{ color: 'red' }}>
          Please keep this client secret on your risk. It'll not display anymore
          after leaving this page.
        </p>

        <section
          id="api-permissions"
          style={{ marginTop: '2rem' }}
        >
          <Divider light />

          <h3>{isSandbox ? 'Sandbox' : 'API'} Permissions</h3>

          <div>
            <ApiPermissions />
          </div>

          <ApiIPs />
        </section>
      </div>
    );
  }

  return (
    <MainCard
      title={
        isCreateNew
          ? isSandbox
            ? 'Create New Sandbox Key'
            : 'Create New API Key'
          : isSandbox
          ? 'Sandbox Setup'
          : 'API Setup'
      }
      subtitle={
        isCreateNew
          ? isSandbox
            ? 'Generate new sandbox key here.'
            : 'Generate new API key here.'
          : ''
      }
      titleRightContent={
        isCreateNew ? <ApiUpdateButton /> : <ApiCreateButton />
      }
      content={<ApiContent />}
    />
  );
}

export default ApiKey;
