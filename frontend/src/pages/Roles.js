import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Role = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRole, setEditingRole] = useState(null);

    const [form] = Form.useForm();

    // Fetch roles from API
    const fetchRoles = async () => {
        setLoading(true);
        try {
            const res = await fetch( API +'/api/roles');
            const data = await res.json();
            setRoles(data);
        } catch (error) {
            message.error('Failed to load roles');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    // Open modal for add or edit
    const openModal = (role = null) => {
        setEditingRole(role);
        if (role) {
            form.setFieldsValue(role);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    // Handle modal submit
    const onFinish = async (values) => {
        try {
            if (editingRole) {
                // Update role
                await fetch(API +`/api/roles/${editingRole._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
                message.success('Role updated');
            } else {
                // Create new role
                await fetch(API +'/api/roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
                message.success('Role created');
            }
            setIsModalVisible(false);
            fetchRoles();
        } catch (error) {
            message.error('Failed to save role');
        }
    };

    // Delete role
    const deleteRole = async (id) => {
        try {
            await fetch(API +   `/api/roles/${id}`, { method: 'DELETE' });
            message.success('Role deleted');
            fetchRoles();
        } catch (error) {
            message.error('Failed to delete role');
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => openModal(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this role?"
                        onConfirm={() => deleteRole(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" style={{ marginBottom: 16 }} onClick={() => openModal()}>
                Add Role
            </Button>

            <Table
                dataSource={roles}
                columns={columns}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingRole ? 'Edit Role' : 'Add Role'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                okText="Save"
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter role name' }]}
                    >
                        <Input placeholder="Role Name" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Role Description" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Role;
