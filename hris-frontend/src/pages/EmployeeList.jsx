import React from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
    };

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
        form.setFieldsValue(employee);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
    };

    const handleSubmit = async (values) => {
        if (editingEmployee) {
            await axios.put(`http://localhost:5000/api/employees/${editingEmployee.id}`, values);
        } else {
            await axios.post("http://localhost:5000/api/employees", values);
        }
        fetchEmployees();
        setIsModalOpen(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Nama", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Aksi",
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 10 }}>
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(record.id)} danger>
                        Hapus
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Daftar Karyawan</h2>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 20 }}>
                Tambah Karyawan
            </Button>
            <Table dataSource={employees} columns={columns} rowKey="id" />

            <Modal
                title={editingEmployee ? "Edit Karyawan" : "Tambah Karyawan"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Harap isi nama" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: "Harap isi email" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EmployeeList;
