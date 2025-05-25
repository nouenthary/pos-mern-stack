import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;

const MasterLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedKey = location.pathname.replace('/', '') || 'users';

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => setCollapsed(!collapsed);

    // Example user data (you can replace this with data from API or context)
    const user = {
        name: 'John Doe',
        avatarUrl: null, // or set a custom URL
    };

    const menuItems = [
        { key: 'users', icon: <UserOutlined />, label: 'Users' },
        { key: 'roles', icon: <TeamOutlined />, label: 'Roles' },
    ];

    const profileMenu = (
        <Menu
            items={[
                {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: () => {
                        // handle logout
                        console.log('Logging out...');
                    },
                },
            ]}
        />
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} trigger={null}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.3)',
                        color: '#fff',
                        textAlign: 'center',
                        lineHeight: '32px',
                        fontWeight: 'bold',
                    }}
                >
                    {!collapsed ? 'MyApp' : 'M'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={(e) => navigate(`/${e.key}`)}
                    items={menuItems}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button type="text" onClick={toggleCollapsed}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span>{user.name}</span>
                        <Dropdown overlay={profileMenu} placement="bottomRight">
                            <Avatar
                                style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                                icon={!user.avatarUrl && <UserOutlined />}
                                src={user.avatarUrl}
                            />
                        </Dropdown>
                    </div>
                </Header>

                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, background: '#fff' }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MasterLayout;
