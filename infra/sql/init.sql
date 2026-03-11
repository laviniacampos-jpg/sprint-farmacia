-- Criação da tabela 'cliente'
    CREATE TABLE Cliente (
    cliente_id INTEGER UNIQUE NOT NULL PRIMARY KEY,
    nome VARCHAR(50),
    cpf VARCHAR(11),
    telefone VARCHAR(50)
);

INSERT INTO Cliente (cliente_id, nome, cpf, telefone) VALUES
('6','FERNANDA COSTA', '67890123456', '11987654321'),
('7','RICARDO ALMEIDA', '78901234567', '21987654321'),
('8','JULIANA FERREIRA', '89012345678', '31987654321'),
('9','ROBERTO PEREIRA', '90123456789', '41987654321'),
('10','PATRICIA GOMES', '01234567890', '51987654321'),
('11','ANDRE MARTINS', '11234567890', '11955554444'),
('12','BRUNA BARBOSA', '12234567890', '21955554444'),
('13','DANIEL RIBEIRO', '13234567890', '31955554444'),
('14','CARLA ROCHA', '14234567890', '41955554444'),
('15','EDUARDO DIAS', '15234567890', '51955554444'),
('16','LUCAS TEIXEIRA', '16234567890', '11933332222'),
('17','MARIANA MOREIRA', '17234567890', '21933332222'),
('18','GUSTAVO CARDOSO', '18234567890', '31933332222'),
('19','RENATA ARAUJO', '19234567890', '41933332222'),
('20','LEONARDO BATISTA', '20234567890', '51933332222'),
('21','RAFAELA FREITAS', '21234567890', '11977776666'),
('22','TIAGO NOGUEIRA', '22234567890', '21977776666'),
('23','CAMILA MENDES', '23234567890', '31977776666'),
('24','FELIPE DUARTE', '24234567890', '41977776666'),
('25','LARISSA PINTO', '25234567890', '51977776666');


-- Criação da tabela 'produto'
CREATE TABLE produtos  (
    produtos_id INTEGER UNIQUE NOT NULL PRIMARY KEY,
    nome  VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL
);


INSERT INTO Produtos (produtos_id, nome, marca , preco)
VALUES ('9','Paracetamol 750mg', 'Tylenol', 15.90),
       ('10','Ibuprofeno 600mg', 'Advil', 19.90),
       ('11','Álcool Gel 70%', 'Asseptgel', 8.50),
       ('12','Sabonete Antisséptico', 'Protex', 6.90),
       ('13','Creme Dental', 'Colgate', 4.50),
       ('14','Enxaguante Bucal', 'Listerine', 21.90),
       ('15','Termômetro Digital', 'G-Tech', 32.00),
       ('16','Curativo Bandagem', 'Band-Aid', 9.90),
       ('17','Soro Fisiológico 500ml', 'Farmax', 7.80),
       ('18','Pomada para Assadura', 'Hipoglós', 14.70),
       ('19','Antialérgico Loratadina', 'Claritin', 17.90),
       ('20','Protetor Solar FPS 50', 'Nivea', 39.90),
       ('21','Desodorante Aerosol', 'Rexona', 16.50),
       ('22','Creme Hidratante Corporal', 'Nivea', 22.90),
       ('23','Máscara Descartável', 'Medix', 12.00),
       ('24','Gaze Estéril', 'Cremer', 5.50),
       ('25','Água Oxigenada 10 Vol', 'Farmax', 6.30),
       ('26','Bicarbonato de Sódio', 'Dr. Oetker', 3.90),
       ('27','Melatonina 5mg', 'Nature Bounty', 45.00),
       ('28','Multivitamínico A-Z', 'Centrum', 59.90);
 
CREATE TABLE  pedidos (
    pedidos_id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    produtos_id INT NOT NULL,
    data_pedido DATE NOT NULL,
    valor_pedido DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(cliente_id),
    FOREIGN KEY (produtos_id) REFERENCES produtos(produtos_id)
);
INSERT INTO pedidos (cliente_id, produtos_id, data_pedido, valor_pedido) VALUES
(1, 6, '2023-09-10', 75000.00),
(2, 7, '2023-08-15', 68000.00),
(3, 8, '2023-07-20', 45000.00)
(4, 9, '2023-09-12', 120.50),
(5, 10, '2023-09-13', 89.90),
(6, 11, '2023-09-14', 45.00),
(7, 12, '2023-09-15', 67.80),
(8, 13, '2023-09-16', 34.50),
(9, 14, '2023-09-17', 150.90),
(10, 15, '2023-09-18', 210.00),
(11, 16, '2023-09-19', 56.70),
(12, 17, '2023-09-20', 44.30),
(13, 18, '2023-09-21', 73.25),
(14, 19, '2023-09-22', 92.40),
(15, 20, '2023-09-23', 135.60),
(16, 21, '2023-09-24', 67.90),
(17, 22, '2023-09-25', 188.00),
(18, 23, '2023-09-26', 54.75),
(19, 24, '2023-09-27', 39.90),
(20, 25, '2023-09-28', 99.99),
(21, 26, '2023-09-29', 140.20),
(22, 27, '2023-09-30', 230.00),
(23, 28, '2023-10-01', 310.50);