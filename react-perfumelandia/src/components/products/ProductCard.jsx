// En: src/components/products/ProductCard.jsx
import { Card, Button, Badge } from 'react-bootstrap';
import styles from './ProductCard.module.css'; // Importa el CSS Module

// Función simple para mostrar estrellas
const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export default function ProductCard({ product, onAdd }) {
    const { 
        name, 
        price, 
        category, 
        imageUrl,
        oldPrice,
        discount,
        rating,
        ratingCount,
        isOnlineOffer
    } = product;

    return (
        <Card className={`h-100 ${styles.productCard}`}>
            <div className={styles.imageContainer}>
                {imageUrl && (
                    <Card.Img
                        variant="top"
                        src={imageUrl}
                        alt={`Imagen de ${name}`}
                        loading="lazy"
                        className={styles.productImage} // Aplica la clase de la imagen
                    />
                )}
                {discount && (
                    <div className={styles.discountBadge}>
                        Ahorra {discount}%
                    </div>
                )}
            </div>
            
            <Card.Body className="d-flex flex-column p-3">
                {isOnlineOffer && (
                    <span className={styles.onlineOffer}>Oferta Exclusiva Online</span>
                )}
                
                <Card.Title className={styles.productName}>
                    {name}
                </Card.Title>

                {rating && (
                    <div className="d-flex align-items-center mb-2">
                        <span className={styles.rating}>{renderStars(rating)}</span>
                        <span className={styles.ratingCount}>({ratingCount})</span>
                    </div>
                )}

                <div className={styles.priceContainer}>
                    <span className={styles.currentPrice}>
                        ${Number(price).toLocaleString('es-CL')}
                    </span>
                    {oldPrice && (
                        <span className={styles.oldPrice}>
                            ${Number(oldPrice).toLocaleString('es-CL')}
                        </span>
                    )}
                </div>

                <Button
                    onClick={() => onAdd(product)}
                    className={`mt-auto ${styles.addButton}`}
                    aria-label={`Agregar ${name} al carrito`}
                >
                    Añadir al carrito
                </Button>
            </Card.Body>
        </Card>
    );
}