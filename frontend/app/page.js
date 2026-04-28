"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await fetch("http://localhost:3000/peserta");
    const result = await res.json();
    setData(result);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/peserta/${id}`, {
      method: "DELETE",
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h1>Data Peserta</h1>

      <Link href="/tambah">
        <button className="btn-tambah">+ Tambah Data</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Tanggal</th>
            <th>Agama</th>
            <th>Alamat</th>
            <th>Telepon</th>
            <th>JK</th>
            <th>Hobi</th>
            <th>Foto</th>
            <th>Kab/Kota</th>
            <th>Provinsi</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>{item.tempatlahir}</td>
              <td>{item.tanggallahir}</td>
              <td>{item.agama}</td>
              <td>{item.alamat}</td>
              <td>{item.telepon}</td>
              <td>{item.jk}</td>
              <td>{item.hobi}</td>
              <td>{item.foto}</td>
              <td>{item.nama_kabko}</td>
              <td>{item.nama_provinsi}</td>
              <td>
                <Link href={`/edit/${item.id}`}>
                  <button className="btn-edit">Edit</button>
                </Link>
                <button
                  className="btn-hapus"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}