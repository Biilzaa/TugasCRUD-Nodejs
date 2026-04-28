"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  const params = useParams();

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

  useEffect(() => {
    if (!params?.id) return;

    fetch(`http://localhost:3000/peserta/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          nama: data.nama || "",
          tempatlahir: data.tempatlahir || "",
          tanggallahir: data.tanggallahir?.substring(0,10) || "",
          agama: data.agama || "",
          alamat: data.alamat || "",
          telepon: data.telepon || "",
          jk: data.jk || "",
          hobi: data.hobi || "",
          foto: data.foto || "",
          idkabko: data.idkabko || ""
        });
      });
  }, [params]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/peserta/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    router.push("/");
  };

  return (
    <div className="container">
      <h1>Edit Peserta</h1>

      <form onSubmit={handleSubmit}>
        <input name="nama" value={form.nama} onChange={handleChange} />
        <input name="tempatlahir" value={form.tempatlahir} onChange={handleChange} />
        <input type="date" name="tanggallahir" value={form.tanggallahir} onChange={handleChange} />
        <input name="agama" value={form.agama} onChange={handleChange} />
        <input name="alamat" value={form.alamat} onChange={handleChange} />
        <input name="telepon" value={form.telepon} onChange={handleChange} />
        <input name="jk" value={form.jk} onChange={handleChange} />
        <input name="hobi" value={form.hobi} onChange={handleChange} />
        <input name="foto" value={form.foto} onChange={handleChange} />
        <input name="idkabko" type="number" value={form.idkabko} onChange={handleChange} />

        <button className="btn-edit">Update</button>
      </form>
    </div>
  );
}