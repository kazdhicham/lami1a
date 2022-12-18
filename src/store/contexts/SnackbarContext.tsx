import React, { createContext, useReducer } from 'react'
import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '@/store/constants/'
import { SnackbarProps } from '@/types/snackbar';

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: true,
  actionButton: false
};

// ==============================|| SLICE - SNACKBAR ||============================== //
const initialContext = {
  state: initialState,
  openSnackbar: (arg: unknown) => {
    arg ? arg : false
  },
  closeSnackbar: () => {
    true
  }
}
const snackbarReducer = (state: any = initialState, { type, payload }: { type: string, payload: any }) => {
  switch (type) {
    case OPEN_SNACKBAR: {
      const { open, message, anchorOrigin, variant, alert, transition,
        close, actionButton } = payload.snackbarFeatures;
      return {
        ...state, action: !state.action,
        open: open || initialState.open,
        message: message || initialState.message,
        anchorOrigin: anchorOrigin || initialState.anchorOrigin,
        variant: variant || initialState.variant,
        alert: {
          color: alert?.color || initialState.alert.color,
          variant: alert?.variant || initialState.alert.variant
        },
        transition: transition || initialState.transition,
        close: close === false ? close : initialState.close,
        actionButton: actionButton || initialState.actionButton
      }
    }
    case CLOSE_SNACKBAR: {
      return {
        ...state, open: false
      }
    }
    default: return state
  }
}

export const SnackbarContext = createContext(initialContext);

export function SnackbarProvider({ children }:
  { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(snackbarReducer, initialState)

  const openSnackbar = (snackbarFeatures: any) => {
    dispatch({ type: OPEN_SNACKBAR, payload: { snackbarFeatures } })
  }
  const closeSnackbar = () => {
    dispatch({ type: CLOSE_SNACKBAR, payload: null })
  }
  return <SnackbarContext.Provider value={{ state, openSnackbar, closeSnackbar }}>
    {children}
  </SnackbarContext.Provider>
}