import { Button } from '@mui/material'
import { NextPage } from 'next';
import React from 'react'

type Props={
    handleOnClick:any;
}

const VehicleAutoButton:NextPage<Props> = ({handleOnClick}) => {
  return (
    <Button
    variant="contained"
    color="primary"
    sx={{ mr: 1 }}
    onClick={handleOnClick}
  >
    AutoFill
  </Button>
  )
}

export default VehicleAutoButton