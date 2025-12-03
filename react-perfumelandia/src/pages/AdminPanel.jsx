import { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Badge, ProgressBar, Image, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState('resumen'); 
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]); // NUEVO ESTADO PARA MENSAJES
    const [stats, setStats] = useState({ sales: 0, count: 0, lowStock: 0, messageCount: 0 });
    
    const [showSidebar, setShowSidebar] = useState(false);

    const fetchData = async () => {
        try {
            // 1. Productos
            const resProd = await fetch('http://localhost:8080/perfume');
            const dataProd = await resProd.json();
            const prodList = Array.isArray(dataProd) ? dataProd : dataProd.data || [];
            setProducts(prodList);

            // 2. Órdenes
            const resOrd = await fetch('http://localhost:8080/ordenes/todas', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            let dataOrd = [];
            if(resOrd.ok){
                dataOrd = await resOrd.json();
                setOrders(dataOrd);
            }

            // 3. Mensajes (NUEVO)
            const resMsg = await fetch('http://localhost:8080/mensajes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            let dataMsg = [];
            if(resMsg.ok){
                dataMsg = await resMsg.json();
                setMessages(dataMsg);
            }
            
            // Estadísticas
            const totalSales = dataOrd.reduce((acc, order) => acc + order.total, 0);
            const lowStockCount = prodList.filter(p => (p.stock || 0) < 5).length;
            setStats({ 
                sales: totalSales, 
                count: dataOrd.length, 
                lowStock: lowStockCount,
                messageCount: dataMsg.length // Nueva métrica
            });

        } catch (error) {
            console.error("Error fetching admin data", error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id, type) => {
        const url = type === 'product' ? `http://localhost:8080/perfume/${id}` : `http://localhost:8080/mensajes/${id}`;
        if(!window.confirm(`¿Eliminar este ${type === 'product' ? 'producto' : 'mensaje'}?`)) return;
        
        await fetch(url, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
    };

    const goldColor = '#d4af37';
    const cardStyle = { backgroundColor: '#252525', border: '1px solid #333', color: 'white' };

    const SidebarContent = () => (
        <div className="d-flex flex-column h-100 text-white">
            <h5 style={{ color: goldColor, letterSpacing: '2px' }} className="mb-4 text-center fw-bold">
                PANEL CONTROL
            </h5>
            <div className="d-grid gap-2 mb-auto">
                {['resumen', 'productos', 'pedidos', 'mensajes'].map(tab => (
                    <Button 
                        key={tab}
                        variant={activeTab === tab ? 'light' : 'outline-secondary'} 
                        onClick={() => { setActiveTab(tab); setShowSidebar(false); }} 
                        className="text-start border-0 text-capitalize"
                    >
                        {tab === 'resumen' ? '📊 Resumen' : 
                         tab === 'productos' ? '🧴 Productos' : 
                         tab === 'pedidos' ? '📦 Pedidos' : '✉️ Mensajes'}
                    </Button>
                ))}
            </div>
            <hr className="border-secondary" />
            <Link to="/" className="btn btn-outline-light btn-sm">
                ← Volver a la Tienda
            </Link>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a0a', color: 'white', paddingTop: '80px' }}>
            
            {/* Barra Móvil */}
            <div className="d-md-none p-3 border-bottom border-secondary d-flex justify-content-between align-items-center bg-dark">
                <span className="fw-bold" style={{ color: goldColor }}>ADMIN PANEL</span>
                <Button variant="outline-light" size="sm" onClick={() => setShowSidebar(true)}>☰ Menú</Button>
            </div>

            {/* Sidebar Desktop */}
            <div className="d-none d-md-block" style={{ width: '250px', borderRight: '1px solid #333', padding: '20px', position: 'fixed', bottom: 0, top: '80px', backgroundColor: '#0a0a0a', overflowY: 'auto' }}>
                <SidebarContent />
            </div>

            {/* Offcanvas Mobile */}
            <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} className="bg-dark text-white w-75">
                <Offcanvas.Header closeButton closeVariant="white"><Offcanvas.Title style={{ color: goldColor }}>Menú Admin</Offcanvas.Title></Offcanvas.Header>
                <Offcanvas.Body><SidebarContent /></Offcanvas.Body>
            </Offcanvas>

            {/* Contenido Principal */}
            <div className="flex-grow-1 p-3 p-md-4" style={{ marginLeft: '0', paddingLeft: '0' }}>
                <div className="d-none d-md-block" style={{ width: '250px', float: 'left', height: '1px' }}></div>
                
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    {/* VISTA RESUMEN */}
                    {activeTab === 'resumen' && (
                        <div className="animate-fade">
                            <h2 className="mb-4">Visión General</h2>
                            <Row className="g-3 mb-4">
                                <Col xs={12} md={3}>
                                    <Card style={{...cardStyle, borderLeft: `4px solid ${goldColor}`}}>
                                        <Card.Body>
                                            <h3 style={{color: goldColor}}>${stats.sales.toLocaleString('es-CL')}</h3>
                                            <div className="text-muted">Ventas Totales</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3}>
                                    <Card style={{...cardStyle, borderLeft: '4px solid #0d6efd'}}>
                                        <Card.Body><h3>{stats.count}</h3><div className="text-muted">Pedidos</div></Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3}>
                                    <Card style={{...cardStyle, borderLeft: '4px solid #dc3545'}}>
                                        <Card.Body><h3>{stats.lowStock}</h3><div className="text-muted">Stock Bajo</div></Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={6} md={3}>
                                    <Card style={{...cardStyle, borderLeft: '4px solid #ffc107'}}>
                                        <Card.Body><h3>{stats.messageCount}</h3><div className="text-muted">Mensajes</div></Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* VISTA PRODUCTOS */}
                    {activeTab === 'productos' && (
                        <div className="animate-fade">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                                <h2>Inventario</h2>
                                <Link to="/agregar" className="w-100 w-md-auto"><Button className="w-100" style={{backgroundColor: goldColor, border: 'none', color: 'black', fontWeight: 'bold'}}>+ Nuevo Perfume</Button></Link>
                            </div>
                            <div className="table-responsive">
                                <Table hover variant="dark" className="align-middle mb-0" style={{ minWidth: '600px' }}>
                                    <thead><tr style={{color: goldColor}}><th>Producto</th><th>Precio</th><th>Stock</th><th className="text-end">Acciones</th></tr></thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id}>
                                                <td><div className="d-flex align-items-center"><Image src={p.imagen} rounded style={{width: '40px', height:'40px', objectFit:'cover', marginRight:'10px'}} /><div style={{ maxWidth: '150px' }} className="text-truncate"><div className="fw-bold">{p.nombre}</div><small className="text-muted">{p.marca}</small></div></div></td>
                                                <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                                                <td style={{width: '120px'}}><div className="d-flex justify-content-between small"><span>{p.stock || 0} u.</span></div><ProgressBar now={(p.stock||0)*5} variant={(p.stock||0) < 5 ? 'danger' : 'success'} style={{height: '6px'}} /></td>
                                                <td className="text-end"><Link to={`/editar/${p.id}`}><Button size="sm" variant="outline-light" className="me-2">✏️</Button></Link><Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id, 'product')}>🗑</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {/* VISTA PEDIDOS */}
                    {activeTab === 'pedidos' && (
                        <div className="animate-fade">
                            <h2 className="mb-4">Historial de Ventas</h2>
                            <div className="table-responsive">
                                <Table hover variant="dark" style={{ minWidth: '600px' }}>
                                    <thead><tr style={{color: goldColor}}><th>ID</th><th>Fecha</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead>
                                    <tbody>
                                        {orders.map(o => (
                                            <tr key={o.id}><td>#{o.id}</td><td>{new Date(o.fecha).toLocaleDateString()}</td><td>{o.usuarioEmail}</td><td style={{color: '#28a745', fontWeight: 'bold'}}>${o.total.toLocaleString('es-CL')}</td><td><Badge bg="success">Pagado</Badge></td></tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {/* VISTA MENSAJES (NUEVO) */}
                    {activeTab === 'mensajes' && (
                        <div className="animate-fade">
                            <h2 className="mb-4">Bandeja de Entrada</h2>
                            {messages.length === 0 ? <p className="text-muted">No hay mensajes nuevos.</p> : (
                                <div className="d-flex flex-column gap-3">
                                    {messages.map(m => (
                                        <Card key={m.id} style={{...cardStyle, backgroundColor: '#222'}}>
                                            <Card.Header className="d-flex justify-content-between align-items-center" style={{borderBottom: '1px solid #444'}}>
                                                <div>
                                                    <span className="fw-bold" style={{color: goldColor}}>{m.asunto || 'Sin Asunto'}</span>
                                                    <span className="text-muted ms-3 small">De: {m.nombre} ({m.email})</span>
                                                </div>
                                                <small className="text-muted">{new Date(m.fecha).toLocaleDateString()}</small>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>{m.mensaje}</Card.Text>
                                                <div className="d-flex justify-content-end gap-2 mt-3">
                                                    <Button variant="outline-light" size="sm" href={`mailto:${m.email}`}>Responder</Button>
                                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(m.id, 'message')}>Eliminar</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}