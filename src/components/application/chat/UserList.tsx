import { useEffect, useState, Fragment } from 'react';

// material-ui
import { Chip, Divider, Grid, List, ListItemButton, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import UserAvatar from './UserAvatar';
import { ProfileTypeData } from '@/api/profile/profile.types';
import useProfile from '@/store/hooks/useProfile';


// ==============================|| CHAT USER LIST ||============================== //

interface UserListProps {
  setUser: (u: ProfileTypeData) => void;
}

const UserList = ({ setUser }: UserListProps) => {

  const { state: { profiles } } = useProfile()


  return (
    <List component="nav">
      {profiles && profiles.map((user) => (
        <Fragment key={user.id}>
          <ListItemButton
            onClick={() => {
              setUser(user);
            }}
          >
            <ListItemAvatar>
              <UserAvatar user={user} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Grid container alignItems="center" spacing={1} component="span">
                  <Grid item xs zeroMinWidth component="span">
                    <Typography
                      variant="h5"
                      color="inherit"
                      component="span"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block'
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Grid>
                  <Grid item component="span">
                    <Typography component="span" variant="subtitle2">
                      {user.lastMessage}
                    </Typography>
                  </Grid>
                </Grid>
              }
              secondary={
                <Grid container alignItems="center" spacing={1} component="span">
                  <Grid item xs zeroMinWidth component="span">
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block'
                      }}
                    >
                      {user.status}
                    </Typography>
                  </Grid>
                  <Grid item component="span">
                    {user.unReadChatCount !== 0 && (
                      <Chip
                        label={user.unReadChatCount}
                        component="span"
                        color="secondary"
                        sx={{
                          width: 20,
                          height: 20,
                          '& .MuiChip-label': {
                            px: 0.5
                          }
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              }
            />
          </ListItemButton>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default UserList;
