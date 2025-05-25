import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Spin } from 'antd';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();

    // Fetch users from API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(API + '/api/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openModal = (user = null) => {
        setEditingUser(user);
        setModalVisible(true);
        if (user) {
            form.setFieldsValue(user);
        } else {
            form.resetFields();
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingUser(null);
        form.resetFields();
    };

    // Add or update user via API
    const onFinish = async (values) => {
        try {
            let res;
            if (editingUser) {
                res = await fetch(API +  `/api/users/${editingUser._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
            } else {
                res = await fetch( API + '/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
            }

            if (!res.ok) throw new Error('Operation failed');

            message.success(editingUser ? 'User updated!' : 'User added!');
            closeModal();
            fetchUsers();
        } catch (error) {
            message.error(error.message);
        }
    };

    // Delete user via API
    const deleteUser = async (id) => {
        try {
            const res = await fetch( API + `/api/users/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            message.success('User deleted!');
            fetchUsers();
        } catch (error) {
            message.error(error.message);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => openModal(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure delete this user?"
                        onConfirm={() => deleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
                Add User
            </Button>

            {loading ? (
                <Spin />
            ) : (
                <Table dataSource={users} columns={columns} rowKey="id" />
            )}

            <Modal
                title={editingUser ? 'Edit User' : 'Add User'}
                visible={modalVisible}
                onCancel={closeModal}
                onOk={() => form.submit()}
                okText={editingUser ? 'Update' : 'Add'}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ name: '', email: '' }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please input user name!' }]}
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Users;
