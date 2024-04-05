import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { handleInviteCode } from '../api/invite';

function Invite() {
  let { inviteCode, projectId } = useParams();

  useEffect(() => {
    const handleInvite = async () => {
        try {
            await handleInviteCode(inviteCode, projectId);
            window.location.href = '/';
        } catch (error) {
            console.error('Error fetching :', error);
        }
    };

    handleInvite();
}, []);

  return (
    <div>
      <span>Redirecting...</span>
    </div>
  );
}

export default Invite;
