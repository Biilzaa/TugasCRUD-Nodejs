"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Tambah() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    tempatlahir: "",
    tanggallahir: "",
    agama: "",
    alamat: "",
    telepon: "",
    jk: "",
    hobi: "",
    foto: "",
    idkabko: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/peserta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    router.push("/");
  };

  return (
    <div className="container">
      <h1>Tambah Peserta</h1>

      <form onSubmit={handleSubmit}>
        <input name="nama" onChange={handleChange} placeholder="Nama" />
        <input name="tempatlahir" onChange={handleChange} placeholder="Tempat Lahir" />
        <input type="date" name="tanggallahir" onChange={handleChange} />
        <input name="agama" onChange={handleChange} placeholder="Agama" />
        <input name="alamat" onChange={handleChange} placeholder="Alamat" />
        <input name="telepon" onChange={handleChange} placeholder="Telepon" />
        <input name="jk" onChange={handleChange} placeholder="JK" />
        <input name="hobi" onChange={handleChange} placeholder="Hobi" />
        <input name="foto" onChange={handleChange} placeholder="Foto" />
        <input name="idkabko" type="number" onChange={handleChange} placeholder="ID Kabko" />

        <button className="btn-tambah">Simpan</button>
      </form>
    </div>
  );
}