import { ButtonGroup, Button, Badge } from 'react-bootstrap';

export default function Filters({ current, onChange, options, total }) {
    const allActive = current === 'all';
    return (
        <div className="d-flex align-items-center justify-content-between mb-3">
        <ButtonGroup>
           <Button
            variant={allActive ? 'dark' : 'outline-secondary'} // <-- Cambiado
            style={{ // <-- Añadido
                backgroundColor: allActive ? '#3E2092' : 'transparent',
                borderColor: '#3E2092', 
                color: allActive ? 'white' : '#3E2092',
                fontWeight: 'bold'
            }}
            onClick={() => onChange('all')}
            >
            Todos <Badge bg="light" text={allActive ? 'dark' : 'light'} className="ms-1">{total}</Badge> 
            {/* También ajustamos el Badge para que combine */}
            </Button>
            {options.map(opt => {
            const isActive = current === opt;
          return (
                <Button
                key={opt}
                variant={isActive ? 'dark' : 'outline-secondary'} // <-- Cambiado
                style={{ // <-- Añadido
                    backgroundColor: isActive ? '#3E2092' : 'transparent',
                    borderColor: '#3E2092', 
                    color: isActive ? 'white' : '#3E2092',
                    fontWeight: 'bold'
                }}
                onClick={() => onChange(opt)}
                >
                {opt}
                </Button>
            );
            })}
        </ButtonGroup>
        </div>
    );
}
