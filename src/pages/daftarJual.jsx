import React from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { NavbarLogin } from "../components/navbar";
import Profile from '../assets/images/profile.png'

export default function DaftarJual() {
  return (<>
    <NavbarLogin></NavbarLogin>;
    <Container style={{ padding: "0px 110px" }}>
      <p className="fw-bold fs-3">Daftar Jual Saya</p>
      <div className="border radius-primary box-shadow p-2">
        <Stack direction="horizontal" gap={3}>
          <img src={Profile} alt="" />
          <Stack>
            <p className="m-0 fw-bold">Nama Penjual</p>
            <p className="m-0 text-black-50">Kota</p>
          </Stack>
          <Button className="ms-auto radius-secondary bg-white text-black border-purple">Edit</Button>
        </Stack>
      </div>
    </Container>
  </>)
}