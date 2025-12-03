

import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; 
import { CATEGORIES } from '../data/gaming.mock'; 

function Home() {
    return (
        <main>
            {/* 3. El Hero Banner */}
            <Container className="my-4">
                <div className={styles.heroBanner}>
                    
                    {/* 4. La superposición de color */}
                    <div className={styles.heroOverlay}></div>

                    {/* 5. El contenido (texto y botón) */}
                    <div className={styles.heroContent}>
                        <p className={styles.heroSubtitle}>Nuevos Ingresos</p>
                        <h1 className={styles.heroTitle}>Parfum ZONE</h1>
                        <p className="lead mb-4">
                            perfumes, colonias, esencias.
                        </p>
                        
                        {/* 6. El Botón (usando 'as' para que sea un Link de router) */}
                        <Button
                            as={Link}
                            to="/productos"
                            variant="primary" 
                            size="lg"
                            className={styles.heroButton}
                        >
                            ¡Ver Productos!
                        </Button>
                    </div>
                </div>
            </Container>

            {/* 7. Barra de categorías (imitando la barra de marcas de la foto) */}
            <div className={styles.categoryBar}>
                <Container>
                    
                    {CATEGORIES.map(cat => (
                        <span key={cat}>{cat}</span>
                    ))}
                </Container>
            </div>
        </main>
    );
}

export default Home;