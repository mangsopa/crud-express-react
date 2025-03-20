import { Table, Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

function DepartmentList() {
    const [department, setDepartment] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await axios.get("http://localhost:5000/api/departments");
        setDepartment(response.data);
    };

    const handleAdd = () => {
        setEditingDepartment(null);
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleEdit = (department) => {
        setEditingDepartment(department);
        setIsModalOpen(true);
        form.setFieldsValue(department);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/departments/${id}`);
        fetchDepartments();
    };

    const handleSubmit = async (values) => {
        if (editingDepartment) {
            await axios.put(`http://localhost:5000/api/departments/${editingDepartment.id}`, values);
        } else {
            await axios.post("http://localhost:5000/api/departments", values);
        }
        fetchDepartments();
        setIsModalOpen(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Nama", dataIndex: "name", key: "name" },
        { title: "Description", dataIndex: "description", key: "description" },
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
                Tambah Department
            </Button>
            <Table dataSource={department} columns={columns} rowKey="id" />

            <Modal
                title={editingDepartment ? "Edit Department" : "Tambah Department"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item name="name" label="Nama" rules={[{ required: true, message: "Harap isi nama" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="description" rules={[{ required: true, message: "Harap isi description" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default DepartmentList;
