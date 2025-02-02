import {
  FiPlay,
  FiPlus,
  FiSettings,
  FiTrash2,
  FiX,
  FiZap,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useAppState from '../hooks/useAppState';
import AddNew from '../components/common/AddNew';
import { Fragment, useState } from 'react';

export default function Initiate() {
  return (
    <div className="flex flex-col items-center h-screen w-screen pt-2 text-xs">
      <TitleBar />
      <ServerList />
    </div>
  );
}

function TitleBar() {
  const [showAddNewServerModal, setShowAddNewServerModal] = useState(false);

  return (
    <div className="flex items-center w-full justify-center">
      <div className="flex items-center gap-2 font-bold border-b w-full pb-2 pl-20">
        {showAddNewServerModal ? (
          <p>Add New Server</p>
        ) : (
          <Fragment>
            Initiate <FiZap size={15} />
          </Fragment>
        )}
      </div>

      <button
        className="absolute right-3 top-[10px]"
        onClick={() => setShowAddNewServerModal((prev) => !prev)}
      >
        {showAddNewServerModal ? <FiX size={15} /> : <FiPlus size={15} />}
      </button>

      {showAddNewServerModal && (
        <AddNew
          type="server"
          callback={() => setShowAddNewServerModal(false)}
        />
      )}
    </div>
  );
}

function ServerList() {
  const { servers, deleteServer } = useAppState();
  const navigate = useNavigate();

  function handleDeleteServer(id: number, name: string) {
    const confirmed = confirm(`You sure want to delete server ${name}?`);
    if (confirmed) {
      deleteServer(id);
    }
  }

  return (
    <div className="self-start mt-5 w-full px-5">
      <b>Servers</b>

      <div className="mt-2 w-full flex flex-col gap-2">
        {servers.map((server) => {
          return (
            <div
              className="flex items-center gap-2 flex items-center bg-gray-200 w-full py-[12px] px-2"
              key={server.id}
            >
              <FiZap size={15} /> <b>{server.name}</b>
              <div className="ml-auto flex items-center gap-5">
                <button>
                  <FiPlay size={15} />
                </button>
                <button onClick={() => navigate(`/server/${server.id}`)}>
                  <FiSettings size={15} />
                </button>
                <button
                  onClick={() => handleDeleteServer(server.id, server.name)}
                >
                  <FiTrash2 size={15} color="red" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
